CREATE OR REPLACE FUNCTION calculate_total_amount () RETURNS TRIGGER AS $$ 
BEGIN
    SELECT Tenants.monthly_rate INTO NEW.total_amount
    FROM Tenants
    WHERE Tenants.id = NEW.tenant_id;

    UPDATE Tenants
    SET balance = balance + NEW.total_amount
    WHERE Tenants.id = NEW.tenant_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_total_amount_trigger BEFORE INSERT ON Invoices FOR EACH ROW
EXECUTE FUNCTION calculate_total_amount ();