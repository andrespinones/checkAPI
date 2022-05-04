-- CREATE DATABASE checkAPI

-- CREATE TABLE Category (
--   categoryID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--   name VARCHAR(64) NOT NULL
-- );

-- CREATE TABLE API (
--     apiID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     name VARCHAR(30) NOT NULL,
--     baseUrl VARCHAR(2048) NOT NULL,
--     description VARCHAR(280) NOT NULL,
--     status BIT NOT NULL, --BOOL = BIT
--     sla INT, --SERVICE LEVEL 
--     latency INT,
--     isFavorite BIT NOT NULL,
--     isEnabled BIT NOT NULL
-- );

-- CREATE TABLE CategoryAPI (
--     categoryapiID INT PRIMARY KEY IDENTITY (1,1),
--     apiID INT,
--     categoryID INT
-- );

-- CREATE TABLE Endpoint (
--     endpointID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     respCodeID INT,
--     apiID INT,
--     paramID INT,
--     groupID INT,
--     methodType VARCHAR(6) NOT NULL,
--     path VARCHAR(64) NOT NULL, 
--     endpointDescription VARCHAR(280) NOT NULL,
--     lastResp INT,
--     status BIT NOT NULL
-- );

-- CREATE TABLE Groups (
--     groupID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     name VARCHAR(30) NOT NULL
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
--   userID INT NOT NULL PRIMARY KEY IDENTITY,
--   email VARCHAR(64) NOT NULL,
--   firstName VARCHAR(64),
--   lastNme VARCHAR (64),
--   role VARCHAR(32)
-- );

-- -- FOREIGN KEYS ADDITION
-- ALTER TABLE dbo.CategoryAPI
--     ADD CONSTRAINT FK_cat_CategoryAPI FOREIGN KEY (categoryID)
--         REFERENCES dbo.Category (categoryID)
-- ;

-- ALTER TABLE dbo.CategoryAPI
--     ADD CONSTRAINT FK_api_CategoryAPI FOREIGN KEY (apiID)
--         REFERENCES dbo.API (apiID)
-- ;

-- ALTER TABLE dbo.Endpoint
--     ADD CONSTRAINT FK_api_endpoint FOREIGN KEY (apiID)
--         REFERENCES dbo.API (apiID)
-- ;
-- ALTER TABLE dbo.Endpoint
--     ADD CONSTRAINT FK_parameter_endpoint FOREIGN KEY (paramID)
--         REFERENCES dbo.Parameter (paramID)
-- ;

-- ALTER TABLE dbo.Endpoint
--     ADD CONSTRAINT FK_group_endpoint FOREIGN KEY (groupID)
--         REFERENCES dbo.Groups (groupID)
-- ;


-- INSERT INTO Category (name) 
--   VALUES
--   ('All'),
--   ('Data'),
--   ('Entertainment'),
--   ('Sports'),
--   ('Pets'),
--   ('Economics'),
--   ('Analytics'),
--   ('Weather'),
--   ('Traffic');


-- INSERT INTO API (name, baseUrl, description, status, isFavorite, isEnabled) 
--     VALUES('Jokes One API', 'https://api.jokes.one', 
--     'Access joke of the day service. Use this to get the joke of the day in various categories. This is a free API that is available to public. You must credit Jokes One if you are using the free version.', 
--     1, 0, 1),
--     ('Petstore', 'https://petstore.swagger.io/v2', 
--     'Sample server Petstore server from Swagger where you can manage data abot pets.', 
--     1, 1, 1),
--     ('The Movie Database API', 'https://developers.themoviedb.org/3', 
--     'The API service is for those of you interested in using our movie, TV show or actor images and/or data in your application. Our API is a system we provide for you and your team to programmatically fetch and use our data and/or images.', 
--     1, 1, 1);

-- INSERT INTO CategoryAPI (apiID, categoryID)
--   VALUES
--   (3, 1),
--   (5, 2),
--   (3, 3)

-- -- FIRST ENDPOINT 
-- INSERT INTO Parameter (dataType, paramName, isRequired, paramDescription)
--     VALUES
--     ('integer', 'movie_id', 1, 'Pass an identifier for the movie');
--     --('string', 'language', 0, 'Value to display translated data for the fields that support it.'),

-- INSERT INTO ResponseCode(respDescription, number)
--     VALUES
--     ('Success', 200),
--     ('Invalid API key: You must be granted a valid key.', 401),
--     ('The resource you requested could not be found.', 404);

-- INSERT INTO Endpoint(respCodeID, apiID, methodType, path, endpointDescription, status)
--     VALUES
--     (1, 3, 'GET', '/movie/{movie_id}', 'Get the primary information about a movie.', 1);
-- INSERT INTO Endpoint(respCodeID, apiID, methodType, path, endpointDescription, status)
--     VALUES (1, 3, 'GET', '/movie/top_rated', 'Get the top rated movies on TMDB.', 1);


-- DROP TABLE Users;
-- DROP TABLE APICategory;
-- DROP TABLE ResponseCode;
-- DROP TABLE Parameter;
-- DROP TABLE Tag;
-- DROP TABLE Endpoint;
-- DROP TABLE API;

-- -- SELECT * FROM dbo.API

-- -- SELECT Endpoint.[path], Parameter.paramName, Parameter.dataType, ResponseCode.number, ResponseCode.respDescription 
-- -- FROM dbo.Endpoint
-- -- JOIN Parameter ON Endpoint.paramID = Parameter.paramID 
-- -- JOIN ResponseCode ON Endpoint.respCodeID = ResponseCode.respCodeID;

-- -- SELECT API.name, API.baseUrl, Endpoint.path, Endpoint.endpointDescription
-- -- FROM dbo.API
-- -- INNER JOIN Endpoint ON API.apiID = Endpoint.apiID;

-- -- SELECT API.name, API.baseUrl, Endpoint.path, Endpoint.endpointDescription
-- -- FROM dbo.API
-- -- LEFT JOIN Endpoint ON API.apiID = Endpoint.apiID;

-- -- SELECT API.name, API.baseUrl, Category.name
-- -- FROM dbo.API
-- -- FULL JOIN Category ON API.categoryID = Category.categoryID;

-- -- SELECT COUNT (api.name) as 'Total de APIs'
-- -- FROM dbo.API
-- -- INNER JOIN Category ON API.categoryID = Category.categoryID 
-- -- WHERE Category.name = 'Entertainment';

-- -- SELECT Category.name, API.name
-- -- FROM dbo.Category
-- -- LEFT JOIN API ON Category.categoryID = API.categoryID
-- -- WHERE API.name is null;

-- -- SELECT Endpoint.[path], ResponseCode.number, ResponseCode.respDescription 
-- -- FROM dbo.Endpoint
-- -- LEFT JOIN ResponseCode ON Endpoint.respCodeID = ResponseCode.respCodeID
-- -- WHERE Endpoint.endpointID = 3;