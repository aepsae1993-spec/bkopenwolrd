create table if not exists public.game_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'Arin',
  home_city text check (home_city in ('north', 'south', 'east', 'west')),
  x integer not null default 15 check (x between 0 and 30),
  y integer not null default 2 check (y between 0 and 30),
  hp integer not null default 820 check (hp >= 0),
  mp integer not null default 440 check (mp >= 0),
  energy integer not null default 12 check (energy >= 0),
  max_energy integer not null default 12 check (max_energy > 0),
  energy_updated_at timestamptz not null default now(),
  gold integer not null default 1280 check (gold >= 0),
  blood integer not null default 0 check (blood >= 0),
  mount_index integer not null default 1 check (mount_index between 0 and 3),
  gather_level integer not null default 1 check (gather_level between 1 and 5),
  inventory jsonb not null default '{"wood":0,"herb":0,"stone":0,"hardwood":0,"iron":0,"crystal":0}'::jsonb,
  offline_guard boolean not null default true,
  combat_lock_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.game_world_tiles (
  x integer not null check (x between 0 and 30),
  y integer not null check (y between 0 and 30),
  terrain text not null check (terrain in ('grass', 'forest', 'desert', 'mountain', 'water', 'snow')),
  zone text not null check (zone in ('Safe City', 'PvP', 'Center War')),
  owner text check (owner in ('north', 'south', 'east', 'west')),
  city text check (city in ('north', 'south', 'east', 'west')),
  resource_id text check (resource_id in ('wood', 'herb', 'stone', 'hardwood', 'iron', 'crystal')),
  resource_tier integer check (resource_tier between 1 and 3),
  resource_quantity integer check (resource_quantity >= 0),
  resource_max_quantity integer check (resource_max_quantity >= 0),
  respawn_at timestamptz,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  primary key (x, y)
);

with coords as (
  select x, y
  from generate_series(0, 30) as x
  cross join generate_series(0, 30) as y
), base as (
  select
    x,
    y,
    (array['grass','forest','desert','grass','mountain','water','snow'])[mod(x * 3 + y * 5, 7) + 1] as terrain,
    case
      when abs(x - 15) <= 2 and abs(y - 2) <= 2 then 'north'
      when abs(x - 15) <= 2 and abs(y - 28) <= 2 then 'south'
      when abs(x - 28) <= 2 and abs(y - 15) <= 2 then 'east'
      when abs(x - 2) <= 2 and abs(y - 15) <= 2 then 'west'
    end as safe_city,
    case
      when x = 15 and y = 2 then 'north'
      when x = 15 and y = 28 then 'south'
      when x = 28 and y = 15 then 'east'
      when x = 2 and y = 15 then 'west'
    end as city,
    case
      when abs(x - 15) <= 2 and abs(y - 2) <= 2 then 15
      when abs(x - 15) <= 2 and abs(y - 28) <= 2 then 15
      when abs(x - 28) <= 2 and abs(y - 15) <= 2 then 28
      when abs(x - 2) <= 2 and abs(y - 15) <= 2 then 2
    end as city_x,
    case
      when abs(x - 15) <= 2 and abs(y - 2) <= 2 then 2
      when abs(x - 15) <= 2 and abs(y - 28) <= 2 then 28
      when abs(x - 28) <= 2 and abs(y - 15) <= 2 then 15
      when abs(x - 2) <= 2 and abs(y - 15) <= 2 then 15
    end as city_y
  from coords
), classified as (
  select
    *,
    case when safe_city is not null then 'Safe City'
         when abs(x - 15) + abs(y - 15) <= 2 then 'Center War'
         else 'PvP' end as zone,
    (
      (safe_city is not null and city is null and abs(x - city_x) = 2 and abs(y - city_y) = 2)
      or
      (safe_city is null and abs(x - 15) + abs(y - 15) > 2 and mod(x * 17 + y * 31, 23) = 0)
    ) as has_resource
  from base
), resource_roll as (
  select
    *,
    case when has_resource then
      case
        when terrain in ('grass', 'forest') and mod(x + y, 5) = 0 then 'hardwood'
        when terrain in ('grass', 'forest') and mod(x + y, 2) = 0 then 'wood'
        when terrain in ('grass', 'forest') then 'herb'
        when terrain in ('mountain', 'desert') and mod(x + y, 2) = 0 then 'stone'
        when terrain in ('mountain', 'desert') then 'iron'
        else 'crystal'
      end
    end as resource_id,
    case when has_resource then
      case when mod(x * 17 + y * 31, 29) >= 27 then 3
           when mod(x * 17 + y * 31, 29) >= 21 then 2
           else 1 end
    end as resource_tier
  from classified
), resource_values as (
  select
    *,
    case resource_id
      when 'wood' then 120
      when 'herb' then 100
      when 'stone' then 110
      when 'hardwood' then 90
      when 'iron' then 80
      when 'crystal' then 60
    end as base_quantity
  from resource_roll
)
insert into public.game_world_tiles (
  x, y, terrain, zone, owner, city, resource_id, resource_tier,
  resource_quantity, resource_max_quantity
)
select
  x,
  y,
  terrain,
  zone,
  safe_city,
  city,
  resource_id,
  resource_tier,
  case when base_quantity is null then null else round(base_quantity * (1 + (resource_tier - 1) * 0.25))::integer end,
  case when base_quantity is null then null else round(base_quantity * (1 + (resource_tier - 1) * 0.25))::integer end
from resource_values
on conflict (x, y) do nothing;

alter table public.game_profiles enable row level security;
alter table public.game_world_tiles enable row level security;
alter table public.game_world_tiles replica identity full;

drop policy if exists "Players read own profile" on public.game_profiles;
create policy "Players read own profile"
on public.game_profiles for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Players read world" on public.game_world_tiles;
create policy "Players read world"
on public.game_world_tiles for select to authenticated
using (true);

grant select on public.game_profiles to authenticated;
grant select on public.game_world_tiles to authenticated;

create or replace function public.game_refresh_resources()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_tiles jsonb;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  with rolled as (
    select
      x,
      y,
      case
        when terrain in ('grass', 'forest') then case when random() < 0.5 then 'wood' else 'herb' end
        when terrain in ('mountain', 'desert') then case when random() < 0.55 then 'stone' else 'iron' end
        else 'crystal'
      end as resource_id,
      (1 + floor(random() * 3))::integer as resource_tier
    from public.game_world_tiles
    where respawn_at is not null and respawn_at <= now()
    for update
  ), valued as (
    select
      *,
      case resource_id
        when 'wood' then 120 when 'herb' then 100 when 'stone' then 110
        when 'iron' then 80 else 60
      end as base_quantity
    from rolled
  ), updated as (
    update public.game_world_tiles as tile
    set
      resource_id = valued.resource_id,
      resource_tier = valued.resource_tier,
      resource_quantity = round(valued.base_quantity * (1 + (valued.resource_tier - 1) * 0.25))::integer,
      resource_max_quantity = round(valued.base_quantity * (1 + (valued.resource_tier - 1) * 0.25))::integer,
      respawn_at = null,
      updated_at = now()
    from valued
    where tile.x = valued.x and tile.y = valued.y
    returning tile.*
  )
  select coalesce(jsonb_agg(to_jsonb(updated)), '[]'::jsonb) into v_tiles from updated;

  return v_tiles;
end;
$$;

create or replace function public.game_bootstrap(p_name text default 'Arin')
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile public.game_profiles;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  insert into public.game_profiles (user_id, name)
  values (auth.uid(), left(coalesce(nullif(trim(p_name), ''), 'Arin'), 24))
  on conflict (user_id) do nothing;

  update public.game_profiles
  set
    energy = least(max_energy, energy + greatest(0, floor(extract(epoch from (now() - energy_updated_at)) / 300))::integer),
    energy_updated_at = energy_updated_at
      + greatest(0, floor(extract(epoch from (now() - energy_updated_at)) / 300))::integer * interval '5 minutes',
    updated_at = now()
  where user_id = auth.uid();

  perform public.game_refresh_resources();

  select * into v_profile from public.game_profiles where user_id = auth.uid();
  return jsonb_build_object(
    'profile', to_jsonb(v_profile),
    'tiles', (select coalesce(jsonb_agg(to_jsonb(tile) order by tile.y, tile.x), '[]'::jsonb) from public.game_world_tiles as tile)
  );
end;
$$;

create or replace function public.game_choose_city(p_city text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile public.game_profiles;
  v_x integer;
  v_y integer;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if p_city not in ('north', 'south', 'east', 'west') then raise exception 'Invalid city'; end if;

  v_x := case p_city when 'east' then 28 when 'west' then 2 else 15 end;
  v_y := case p_city when 'north' then 2 when 'south' then 28 else 15 end;

  update public.game_profiles
  set home_city = p_city, x = v_x, y = v_y, energy = max_energy,
      energy_updated_at = now(), updated_at = now()
  where user_id = auth.uid()
  returning * into v_profile;

  if not found then raise exception 'Profile not found'; end if;
  return to_jsonb(v_profile);
end;
$$;

create or replace function public.game_move(p_x integer, p_y integer)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile public.game_profiles;
  v_tile public.game_world_tiles;
  v_range integer;
  v_distance integer;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;

  select * into v_profile from public.game_profiles where user_id = auth.uid() for update;
  select * into v_tile from public.game_world_tiles where x = p_x and y = p_y;
  if not found then raise exception 'Tile not found'; end if;
  if v_profile.home_city is null then raise exception 'Choose a spawn city first'; end if;

  v_range := (array[1,2,3,5])[v_profile.mount_index + 1];
  v_distance := abs(v_profile.x - p_x) + abs(v_profile.y - p_y);
  if v_distance < 1 or v_distance > v_range then raise exception 'Tile is out of movement range'; end if;
  if v_profile.energy < 1 then raise exception 'Not enough energy'; end if;
  if v_tile.terrain = 'water' then raise exception 'Cannot walk onto water'; end if;

  update public.game_profiles
  set x = p_x, y = p_y, energy = energy - 1, energy_updated_at = now(), updated_at = now()
  where user_id = auth.uid()
  returning * into v_profile;

  return to_jsonb(v_profile);
end;
$$;

create or replace function public.game_gather()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile public.game_profiles;
  v_tile public.game_world_tiles;
  v_amount integer;
  v_base integer;
  v_multiplier numeric;
  v_inventory jsonb;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  perform public.game_refresh_resources();

  select * into v_profile from public.game_profiles where user_id = auth.uid() for update;
  select * into v_tile from public.game_world_tiles where x = v_profile.x and y = v_profile.y for update;
  if v_tile.resource_id is null or coalesce(v_tile.resource_quantity, 0) <= 0 then raise exception 'No resource on this tile'; end if;

  v_base := (array[10,12,15,18,21])[v_profile.gather_level];
  v_multiplier := case v_tile.resource_id
    when 'wood' then 1.0 when 'herb' then 0.9 when 'stone' then 0.85
    when 'hardwood' then 0.7 when 'iron' then 0.65 else 0.5 end;
  v_amount := least(v_tile.resource_quantity, greatest(1, round(v_base * v_multiplier)::integer));
  v_inventory := jsonb_set(
    v_profile.inventory,
    array[v_tile.resource_id],
    to_jsonb(coalesce((v_profile.inventory ->> v_tile.resource_id)::integer, 0) + v_amount),
    true
  );

  update public.game_profiles set inventory = v_inventory, updated_at = now()
  where user_id = auth.uid() returning * into v_profile;

  if v_tile.resource_quantity <= v_amount then
    update public.game_world_tiles
    set resource_id = null, resource_tier = null, resource_quantity = null,
        resource_max_quantity = null, respawn_at = now() + interval '30 minutes',
        updated_by = auth.uid(), updated_at = now()
    where x = v_tile.x and y = v_tile.y returning * into v_tile;
  else
    update public.game_world_tiles
    set resource_quantity = resource_quantity - v_amount, updated_by = auth.uid(), updated_at = now()
    where x = v_tile.x and y = v_tile.y returning * into v_tile;
  end if;

  return jsonb_build_object('profile', to_jsonb(v_profile), 'tile', to_jsonb(v_tile), 'amount', v_amount);
end;
$$;

create or replace function public.game_claim()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile public.game_profiles;
  v_tile public.game_world_tiles;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into v_profile from public.game_profiles where user_id = auth.uid() for update;
  select * into v_tile from public.game_world_tiles where x = v_profile.x and y = v_profile.y for update;

  if v_profile.home_city is null then raise exception 'Choose a city first'; end if;
  if v_tile.zone = 'Safe City' or v_tile.city is not null then raise exception 'Cannot claim a city tile'; end if;
  if v_tile.owner is not null then raise exception 'Tile already has an owner'; end if;
  if v_tile.resource_id is not null then raise exception 'Deplete the resource before claiming'; end if;

  update public.game_world_tiles
  set owner = v_profile.home_city, updated_by = auth.uid(), updated_at = now()
  where x = v_tile.x and y = v_tile.y returning * into v_tile;
  update public.game_profiles set gold = gold + 50, updated_at = now()
  where user_id = auth.uid() returning * into v_profile;

  return jsonb_build_object('profile', to_jsonb(v_profile), 'tile', to_jsonb(v_tile));
end;
$$;

create or replace function public.game_save_preferences(p_offline_guard boolean, p_mount_index integer)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile public.game_profiles;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if p_mount_index < 0 or p_mount_index > 3 then raise exception 'Invalid mount'; end if;
  update public.game_profiles
  set offline_guard = p_offline_guard, mount_index = p_mount_index, updated_at = now()
  where user_id = auth.uid() returning * into v_profile;
  return to_jsonb(v_profile);
end;
$$;

revoke all on function public.game_refresh_resources() from public, anon;
revoke all on function public.game_bootstrap(text) from public, anon;
revoke all on function public.game_choose_city(text) from public, anon;
revoke all on function public.game_move(integer, integer) from public, anon;
revoke all on function public.game_gather() from public, anon;
revoke all on function public.game_claim() from public, anon;
revoke all on function public.game_save_preferences(boolean, integer) from public, anon;

grant execute on function public.game_refresh_resources() to authenticated;
grant execute on function public.game_bootstrap(text) to authenticated;
grant execute on function public.game_choose_city(text) to authenticated;
grant execute on function public.game_move(integer, integer) to authenticated;
grant execute on function public.game_gather() to authenticated;
grant execute on function public.game_claim() to authenticated;
grant execute on function public.game_save_preferences(boolean, integer) to authenticated;

do $$
begin
  alter publication supabase_realtime add table public.game_world_tiles;
exception
  when duplicate_object then null;
end $$;
