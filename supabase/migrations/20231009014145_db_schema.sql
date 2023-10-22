-- Create the Apartment table
CREATE TABLE Apartment (
    id SERIAL PRIMARY KEY,
    apartment_name VARCHAR(50) NOT NULL,
    apartment_description VARCHAR(255)
);
-- Create the Rooms table
CREATE TABLE Rooms (
    id SERIAL PRIMARY KEY,
    apartment_id INT REFERENCES Apartment(id) NOT NULL,
    rent DECIMAL(10, 2) NOT NULL
);
-- Create the Tenants table
CREATE TABLE Tenants (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    move_in_date DATE NOT NULL,
    balance DECIMAL(10, 2),
    room_id INT REFERENCES Rooms(id) NOT NULL,
    monthly_rate DECIMAL(10, 2)
);
-- Create the Invoices table
CREATE TABLE Invoices (
    id SERIAL PRIMARY KEY,
    tenant_id INT REFERENCES Tenants(id) NOT NULL,
    date_created DATE NOT NULL,
    due_date DATE NOT NULL,
    total_amount DECIMAL(10, 2),
    status VARCHAR(10) NOT NULL
);
-- Create the Payments table
CREATE TABLE Payments (
    id SERIAL PRIMARY KEY,
    tenant_id INT REFERENCES Tenants(id) NOT NULL,
    invoce_id INT REFERENCES Invoices(id) NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL
);
create table public.admin (
    id uuid not null references auth.users on delete cascade,
    first_name text,
    last_name text,
    primary key (id)
);
alter table public.admin enable row level security;
-- inserts a row into public.profiles
create function public.handle_new_user() returns trigger language plpgsql security definer
set search_path = public as $$ begin
insert into public.admin (id)
values (new.id);
return new;
end;
$$;
-- trigger the function every time a user is created
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user();