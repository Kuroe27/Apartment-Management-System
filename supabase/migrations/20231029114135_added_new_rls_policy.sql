create policy "Enable insert for authenticated users only"
on "public"."admin"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."apartment"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."invoices"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."payments"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."rooms"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."tenants"
as permissive
for all
to authenticated
using (true)
with check (true);



