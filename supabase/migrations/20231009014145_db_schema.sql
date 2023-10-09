-- Create the Rooms table
CREATE TABLE Rooms (
    room_id SERIAL PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL,
    rent DECIMAL(10, 2) NOT NULL
);
-- Create the Tenants table
CREATE TABLE Tenants (
    tenant_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    email VARCHAR(100),
    phone_number VARCHAR(15),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(15),
    occupation VARCHAR(100),
    move_in_date DATE,
    move_out_date DATE,
    lease_term_months INT,
    lease_start_date DATE,
    lease_end_date DATE,
    room_id INT REFERENCES Rooms(room_id)
);
-- Create the LeaseContracts table
CREATE TABLE LeaseContracts (
    contract_id SERIAL PRIMARY KEY,
    tenant_id INT REFERENCES Tenants(tenant_id),
    room_id INT REFERENCES Rooms(room_id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);
-- Create the MaintenanceRequests table
CREATE TABLE MaintenanceRequests (
    request_id SERIAL PRIMARY KEY,
    room_id INT REFERENCES Rooms(room_id),
    description TEXT NOT NULL,
    request_date DATE NOT NULL
);
-- Create the Payments table
CREATE TABLE Payments (
    payment_id SERIAL PRIMARY KEY,
    tenant_id INT REFERENCES Tenants(tenant_id),
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL
);
-- Create the Admins table
CREATE TABLE Admins (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    -- It's recommended to hash and salt passwords in a real system
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL
);