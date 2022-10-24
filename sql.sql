--set transaction read write;
CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    birth_date TIMESTAMP,
    email_user VARCHAR(80) NOT NULL,
    login_user VARCHAR(30) NOT NULL,
    pw_user VARCHAR(50) NOT NULL
);

CREATE TABLE movies (
    id_program serial PRIMARY KEY,
    Poster_Link TEXT,
    Series_Title VARCHAR(200) NOT NULL,
    Released_Year INTEGER NOT NULL,
	Certificate TEXT,
	Runtime TEXT,
	Genre TEXT,
	IMDB_Rating NUMERIC NOT NULL,
	Overview TEXT NOT NULL,
	Meta_score NUMERIC,
	Director VARCHAR(150),
	Star1 VARCHAR(80),
	Star2 VARCHAR(80),
	Star3 VARCHAR(80),
	Star4 VARCHAR(80),
	No_of_Votes INTEGER NOT NULL,
	Gross NUMERIC NOT NULL
);

CREATE TABLE lists (
    id_list serial PRIMARY KEY,
    "usersId" INTEGER,
    "moviesIdProgram" INTEGER,
    FOREIGN KEY ("usersId") REFERENCES users (id),
    FOREIGN KEY ("moviesIdProgram") REFERENCES movies (id_program)
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
