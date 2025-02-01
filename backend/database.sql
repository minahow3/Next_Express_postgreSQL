CREATE TABLE greetings (
  id SERIAL PRIMARY KEY,
  message VARCHAR(255) NOT NULL
);

INSERT INTO greetings (message) VALUES ('Hello from the database!');