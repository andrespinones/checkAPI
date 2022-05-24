
-- -- CREATE DATABASE checkAPI;

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
--     -- apiID INT,
--     -- -- paramID INT NOT NULL DEFAULT 1,
--     groupID INT,
--     methodType VARCHAR(6) NOT NULL,
--     path VARCHAR(64) NOT NULL,
--     endpointDescription VARCHAR(280) NOT NULL,
--     lastResp INT,
--     status BIT NOT NULL
-- );

-- CREATE TABLE Groups (
--     groupID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     name VARCHAR(30) NOT NULL,
--     apiID INT
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
--   lastName VARCHAR (64),
--   role VARCHAR(32)
-- );

-- CREATE TABLE Favorites (
--     favoriteID INT NOT NULL PRIMARY KEY IDENTITY,
--     apiID INT,
--     userID INT
-- );

-- CREATE TABLE ParametersEndpoints (
--     paramsEndsID INT NOT NULL PRIMARY KEY IDENTITY,
--     paramID INT,
--     endpointID INT
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

-- -- ALTER TABLE dbo.Endpoint
-- --     ADD CONSTRAINT FK_api_endpoint FOREIGN KEY (apiID)
-- --         REFERENCES dbo.API (apiID)
-- -- ;

-- ALTER TABLE dbo.Endpoint
--     ADD CONSTRAINT FK_group_endpoint FOREIGN KEY (groupID)
--         REFERENCES dbo.Groups (groupID)
-- ;

-- ALTER TABLE dbo.Groups
--     ADD CONSTRAINT FK_api_groups FOREIGN KEY (apiID)
--         REFERENCES dbo.API (apiID)
-- ;

-- ALTER TABLE dbo.Favorites
--     ADD CONSTRAINT FK_api_Favorites FOREIGN KEY (apiID)
--         REFERENCES dbo.API (apiID)
-- ALTER TABLE dbo.Favorites
--     ADD CONSTRAINT FK_user_Favorites FOREIGN KEY (userID)
--         REFERENCES dbo.Users (userID)


-- ALTER TABLE dbo.ParametersEndpoints
--     ADD CONSTRAINT FK_parameter_paramsEnds FOREIGN KEY (paramID)
--         REFERENCES dbo.Parameter (paramID)
-- ;

-- ALTER TABLE dbo.ParametersEndpoints
--     ADD CONSTRAINT FK_endpoint_paramsEnds FOREIGN KEY (endpointID)
--         REFERENCES dbo.Endpoint (endpointID)
-- ;

-- INSERT INTO Category (name)
--   VALUES
--   ('Data'),
--   ('Entertainment'),
--   ('Sports'),
--   ('Pets'),
--   ('Economics'),
--   ('Analytics'),
--   ('Weather'),
--   ('Traffic');


-- INSERT INTO API (name, baseUrl, description, status, isEnabled)
--     VALUES('Jokes One API', 'https://api.jokes.one',
--     'Access joke of the day service. Use this to get the joke of the day in various categories. This is a free API that is available to public. You must credit Jokes One if you are using the free version.',
--     1, 1),
--     ('Petstore', 'https://petstore.swagger.io/v2',
--     'Sample server Petstore server from Swagger where you can manage data abot pets.',
--     1, 1),
--     ('The Movie Database API', 'https://developers.themoviedb.org/3',
--     'The API service is for those of you interested in using our movie, TV show or actor images and/or data in your application. Our API is a system we provide for you and your team to programmatically fetch and use our data and/or images.',
--     1, 1),
-- 	('Food API', 'https://foodApi/api/v1',
--     'Api service for those interested in cooking',
--     1, 1),
-- 	('Forecast API', 'https://forecastApi/api/v3',
--     'Api service for those interested in weather',
--     1, 1),
-- 	('School API', 'https://SchoolApi/api/v3',
--     'Api service for those who love going to school, no one',
--     1, 1),
-- 	('Poke API', 'https://pokeapi.co/api/v2',
--     'All the Pokémon data youll ever need in one place,
-- easily accessible through a modern RESTful API.',
--     1, 1);


--  INSERT INTO CategoryAPI (categoryID, apiID)
--    VALUES
--    (2, 1),
--    (2, 3),
--    (2, 7),
--    (2, 4),
--    (7, 5),
--    (1,5),
--    (4,2)

--  INSERT INTO Groups (name, apiID)
--  VALUES ('movies', 3),
-- 		('genres', 3),
-- 		('berries', 7),
-- 		('contests', 7),
-- 		('encounters', 7)


-- -- FIRST ENDPOINT
-- INSERT INTO Parameter (dataType, paramName, isRequired, paramDescription)
--     VALUES
--     ('integer', 'movie_id', 1, 'Pass an identifier for the movie'),
--     ('integer', 'id', 1, 'Identifier for this resource'),
--     ('integer', 'appeal', 1, 'The base number of hearts'),
--     ('integer', 'jam', 1, 'The base number of oponents'),
--     ('integer', 'order', 1, 'A good value for sorting');


-- INSERT INTO ResponseCode(respDescription, number)
--     VALUES
--     ('Success', 200),
--     ('Invalid API key: You must be granted a valid key.', 401),
--     ('The resource you requested could not be found.', 404);

-- INSERT INTO Endpoint(respCodeID, groupID, methodType, path, endpointDescription, status)
--     VALUES
--     (1, 1, 'GET', '/movie/{movie_id}', 'Get the primary information about a movie.', 1);
-- INSERT INTO Endpoint(respCodeID, groupID, methodType, path, endpointDescription, status)
--     VALUES (1, 1, 'GET', '/movie/top_rated', 'Get the top rated movies on TMDB.', 1);

-- INSERT INTO Endpoint (respCodeID, groupID, methodType, path, endpointDescription, status)
--     VALUES
--         (1, 1, 'GET', '/movie/{popular}', 'Get a list of the current popular movies on TMDB.', 1),
--         (1, 1, 'GET', '/movie/{movie_id}/similar', 'Get a list of similar movies.', 1),
-- 		(1, 1, 'POST', '/movie/{movie_id}/rating', 'Rate a movie.', 1),
-- 		(1, 1, 'GET', '/movie/latest', 'Get the most newly created movie.', 1),
-- 		(1, 1, 'GET', '/movie/{movie_id}/release_dates', 'Get the release date along with the certification for a movie.', 1),
-- 		(1, 2, 'GET', '/genre/movie/list', 'Get the list of official genres for movies.', 1),
-- 		(1, 3, 'GET', '/berry/{id or name}/', 'Berries are small fruits that can provide HP and status condition', 1),
-- 		(1, 4, 'GET', '/contest-type/{id or name}/', 'Contest types are categories judges used to weigh a Pokémon condition in Pokémon contests. ', 1);

-- INSERT INTO ParametersEndpoints (endpointID, paramID)
--     VALUES
--     (1, 1),
--     (2, 1),
--     (3, 1),
--     (4, 1),
--     (5, 1),
--     (6, 1),
--     (7, 1),
--     (8, 1),
--     (9, 2),
--     (10, 2);

-- -- Insertar usuarios 
-- INSERT INTO [dbo].[Users] (email, firstName, lastName, role)
--     VALUES
--         ('A01570150@tec.mx', 'Andres', 'Piñones', 'Admin'),
--         ('A01138740@tec.mx', 'Jose', 'Pablo', 'Admin'),
--         ('A01197468@tec.mx', 'Daniela', 'Tamez', 'User'),
--         ('A00828633@tec.mx', 'Jorge', 'Ayala', 'Admin'),
--         ('A00827751@tec.mx', 'Lucas', 'Idigoras', 'User');

-- INSERT INTO [dbo].[Favorites] (apiID,userID)
-- VALUES
-- (1,1),
-- (1,2),
-- (4,2),
-- (2,3),
-- (3,3),
-- (4,4),
-- (4,5),
-- (5,5),
-- (6,5);


-- -- DROP TABLE Users;
-- -- DROP TABLE Category;
-- -- DROP TABLE ResponseCode;
-- -- DROP TABLE Parameter;
-- -- DROP TABLE Tag;
-- -- DROP TABLE Endpoint;
-- -- DROP TABLE API;
-- -- DROP TABLE Groups;
-- -- DROP TABLE CategoryAPI;

-- -- SELECT * FROM dbo.API

