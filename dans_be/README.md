# NodeJS-MySQL API

### Description

This project demonstrates an application built with NodeJS and the official MySQL driver. It allows you to access url of recruitment positions with jwt auth, including their details, links, and start/end dates.


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

#### Authentication
- `POST /auth/register`: Create user account using username and password.
- `POST /auth/login`: Login to get an access token.

#### Recruitment
- `GET /recruitment/positions`: Retrieves all recruitment positions.
- `GET /recruitment/positions/{id}`: Retrieves a specific recruitment position by ID.
- `GET /articles/?params={params}`: Filter articles by params `description`, `location`, and/or `full_time`.