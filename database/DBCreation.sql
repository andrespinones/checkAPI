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

--AGREGAR VALORES ANTES DE FKs
-- ALTER TABLE dbo.Endpoint
--     ADD CONSTRAINT FK_Tag 
--     FOREIGN KEY (tagID) REFERENCES dbo.Tag (tagID);



-- DROP TABLE API;
-- DROP TABLE Tag;
-- DROP TABLE Endpoint;
-- DROP TABLE ResponseCode;
-- DROP TABLE Parameter;
-- DROP TABLE Users;



-- SELECT * FROM dbo.API


