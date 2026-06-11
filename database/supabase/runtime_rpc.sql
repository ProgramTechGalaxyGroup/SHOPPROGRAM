-- Runtime SQL bridge used only by Cloudflare Pages Functions with the
-- Supabase service role key. Do not expose these functions to browser clients.

create or replace function public.shopflow_query(sql text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  query_text text;
  lowered text;
  result jsonb;
begin
  query_text := regexp_replace(trim(sql), ';\s*$', '');
  lowered := lower(ltrim(query_text));

  if lowered ~ '^(insert|update|delete).*\sreturning\s' then
    execute 'with q as (' || query_text || ') select coalesce(jsonb_agg(to_jsonb(q)), ''[]''::jsonb) from q'
      into result;
  else
    execute 'select coalesce(jsonb_agg(to_jsonb(q)), ''[]''::jsonb) from (' || query_text || ') q'
      into result;
  end if;

  return coalesce(result, '[]'::jsonb);
end;
$$;

create or replace function public.shopflow_exec(sql text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  query_text text;
begin
  query_text := regexp_replace(trim(sql), ';\s*$', '');
  if query_text <> '' then
    execute query_text;
  end if;
  return '{"ok": true}'::jsonb;
end;
$$;

create or replace function public.shopflow_exec_batch(statements jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  statement text;
begin
  for statement in
    select value from jsonb_array_elements_text(statements)
  loop
    statement := regexp_replace(trim(statement), ';\s*$', '');
    if statement <> '' then
      execute statement;
    end if;
  end loop;
  return jsonb_build_object('ok', true, 'count', jsonb_array_length(statements));
end;
$$;

revoke all on function public.shopflow_query(text) from public, anon, authenticated;
revoke all on function public.shopflow_exec(text) from public, anon, authenticated;
revoke all on function public.shopflow_exec_batch(jsonb) from public, anon, authenticated;

grant execute on function public.shopflow_query(text) to service_role;
grant execute on function public.shopflow_exec(text) to service_role;
grant execute on function public.shopflow_exec_batch(jsonb) to service_role;

