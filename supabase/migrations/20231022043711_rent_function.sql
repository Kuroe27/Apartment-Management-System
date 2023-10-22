CREATE OR REPLACE FUNCTION set_monthly_rent() RETURNS TRIGGER AS $$ BEGIN NEW.monthly_rate := (
        SELECT rent
        FROM rooms
        WHERE room_id = NEW.room_id
    );
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER set_monthly_rate_trigger BEFORE
INSERT ON tenants FOR EACH ROW EXECUTE FUNCTION set_monthly_rent();