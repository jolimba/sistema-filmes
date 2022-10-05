--set transaction read write;
CREATE TABLE users (
    id_user serial PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    birth_date TIMESTAMP,
    email_user VARCHAR(80) NOT NULL,
    login_user VARCHAR(30) NOT NULL,
    pw_user VARCHAR(50) NOT NULL
);

CREATE TABLE movies (
    id_program serial PRIMARY KEY,
    name_program VARCHAR(150) NOT NULL,
    category VARCHAR(5) NOT NULL,
    rating float NOT NULL
);

CREATE TABLE lists (
    id_list serial PRIMARY KEY,
    id_user_fk INTEGER NOT NULL,
    id_program_fk INTEGER NOT NULL,
    type_list CHAR(1) NOT NULL,
    FOREIGN KEY (id_user_fk) REFERENCES users (id_user),
    FOREIGN KEY (id_program_fk) REFERENCES movies (id_program)
);

-- alters user
ALTER TABLE users 
    ADD CONSTRAINT email_unique UNIQUE (email_user);

ALTER TABLE users 
    ADD CONSTRAINT user_unique UNIQUE (login_user);

-- alters list
-- S = 'seen' e N = 'not seen'
-- ALTER TABLE lists 
--     ADD CONSTRAINT check_list_type CHECK (type_list IN ('S', 'N'));