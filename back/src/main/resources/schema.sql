-- schema.sql
CREATE TABLE IF NOT EXISTS product (
    id       BIGINT  PRIMARY KEY AUTO_INCREMENT,
    code     VARCHAR      NOT NULL,
    name     VARCHAR,
    description VARCHAR,
    image    VARCHAR,
    category VARCHAR,
    price    INTEGER,
    quantity  INTEGER,
    internal_reference   VARCHAR,
    shell_id     INTEGER,
    inventory_status VARCHAR,
    rating INTEGER,
    created_at BIGINT,
    updated_at BIGINT

);
