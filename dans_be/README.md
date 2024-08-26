# NodeJS-MySQL API

### Description

This project demonstrates a simple CRUD (Create, Read, Update, Delete) application built with NodeJS and the official MySQL driver. It allows you to access url of recruitment positions with jwt auth, including their details, links, and start/end dates.


### Prerequisites:
- NodeJS
- Local or Cloud MySQL server

### Installation:
- Clone this repository.
- Install dependencies using `yarn`.
- Add file `.env` with these variables

```javascript
PORT=8080

DB_DATABASE=...
DB_USER=...
DB_PASSWORD=...
DB_HOST=...
DB_PORT=3306

SECRET_KEY=...
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30m

URL_API='https://dev6.dansmultipro.com/api/recruitment/positions.json'
```

### Running the Application:
- Compile and run the application: `node app.js`

### API Endpoints:

- `GET /articles`: Retrieves all article.
- `GET /articles/{id}`: Retrieves a specific article by ID.
- `GET /articles/?limit={limit}&offset={offset}`: Retrieves articles by limit and offset.
- `GET /articles/?status={status}`: Filter articles by status.
- `POST /articles`: Creates a new article. (Payload should be a JSON object representing the Post struct)
- `PUT /articles/{id}`: Updates an existing article. (Payload should be a JSON object with updated Post information)
- `DELETE /articles/{id}`: Deletes an existing article.