-- CREATE TABLE API (
--     apiID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     name VARCHAR(30) NOT NULL,
--     baseUrl VARCHAR(2048) NOT NULL,
--     description VARCHAR(280) NOT NULL,
--     category VARCHAR(30) NOT NULL,
--     status BIT NOT NULL, --BOOL = BIT
--     sla INT, --SERVICE LEVEL 
--     latency INT,
--     isFavorite BIT NOT NULL
-- );

-- CREATE TABLE APICategory (
--   apiCategoryID INT NOT NULL PRIMARY KEY IDENTITY,
--   name VARCHAR(64) NOT NULL
-- )

-- CREATE TABLE Tag ( --AGRUPACIONES DE ENDPOINTS
--     tagID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     name VARCHAR(30) NOT NULL
-- )

-- CREATE TABLE Endpoint (
--     endpointID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     methodType VARCHAR(6) NOT NULL,
--     path VARCHAR(64) NOT NULL, 
--     endpointDescription VARCHAR(280) NOT NULL,
--     lastResp INT,
--     status BIT NOT NULL
-- );

-- CREATE TABLE ResponseCode (
--   respCodeID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--   respDescription VARCHAR(50),
--   number INT NOT NULL   
-- );

-- CREATE TABLE Parameter (
--   paramID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--   dataType VARCHAR(32) NOT NULL,
--   paramName VARCHAR(32) NOT NULL,
--   isRequired BIT NOT NULL,
--   paramDescription VARCHAR(32) NOT NULL 
-- );

-- CREATE TABLE Users (
--   userID INT NOT NULL PRIMARY KEY IDENTITY(1,1)
-- );

-- --AGREGAR VALORES ANTES DE FKs
-- -- ALTER TABLE dbo.Endpoint
-- --     ADD CONSTRAINT FK_Tag 
-- --     FOREIGN KEY (tagID) REFERENCES dbo.Tag (tagID);

-- INSERT INTO API (name, baseUrl, description, category, status, isFavorite) VALUES('Jokes One API', 'https://api.jokes.one', 'Access joke of the day service. Use this to get the joke of the day in various categories. This is a free API that is available to public. You must credit Jokes One if you are using the free version.', 'Entertainment', 1, 0)

-- INSERT INTO APICategory (name) 
--   VALUES
--   ('All'),
--   ('Data'),
--   ('Entertainment'),
--   ('Sports'),
--   ('Other')

-- -- DROP TABLE API;
-- -- DROP TABLE Tag;
-- -- DROP TABLE Endpoint;
-- -- DROP TABLE ResponseCode;
-- -- DROP TABLE Parameter;
-- -- DROP TABLE Users;
-- -- DROP TABLE APICategory;



-- -- SELECT * FROM dbo.API
