# 📦 Deel Node-Express Microservice

A lightweight Node.js microservice built with Express.js and Sequelize ORM.

## 🚀 Features

- Fast and minimal Express server
- RESTful API structure
- Environment-based configuration
- SQLite database with Sequelize ORM
- Dockerized for easy deployment

## 📁 Project Structure

```
.
├── src/                    # Source code
│   ├── config/            # Configuration files
│   │   └── database.js    # Database configuration
│   ├── models/            # Sequelize models
│   ├── seeders/          # Database seeders
│   │   ├── data/         # Seed data
│   │   └── seed.js       # Seeding script
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── services/         # Business logic
│   └── server.js         # Application entry point
├── package.json          # Project metadata and scripts
├── .env                  # Environment variables
├── database.sqlite3      # SQLite database file
├── Dockerfile           # Docker setup
└── README.md            # You're here
```

## 🛠️ Installation

```bash
# Install dependencies
npm install
```

## 🧪 Running Locally

```bash
# Start the server
npm start

# Run in development mode with hot reload
npm run dev

# Seed the database with initial data
npm run seed
```

The server will run on `http://localhost:3000` by default.

## 📦 Database

The application uses SQLite with Sequelize ORM:

- **Development**: Uses `database.sqlite3` file
- **Production**: Uses `database.sqlite3` file
- **Logging**: SQL queries are logged in development mode only

### Available Models

#### Profile
- Fields: firstName, lastName, profession, balance, type
- Types: client, contractor
- Relationships:
  - Has many Contracts as Contractor
  - Has many Contracts as Client

#### Contract
- Fields: terms, status
- Status: new, in_progress, terminated
- Relationships:
  - Belongs to Profile (as Contractor)
  - Belongs to Profile (as Client)
  - Has many Jobs

#### Job
- Fields: description, price, paid, paymentDate
- Relationships:
  - Belongs to Contract

### API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/profiles` - Get all profiles
- `GET /api/profiles/:id` - Get a specific profile

## 🐳 Running with Docker

```bash
# Build the Docker image
docker build -t deel-node-express-app .

# Run the container
docker run -p 3000:3000 deel-node-express-app
```

## 🧾 Scripts

| Command         | Description                 |
| --------------- | --------------------------- |
| `npm start`     | Start the server            |
| `npm run dev`   | Start with hot reload       |
| `npm run seed`  | Seed the database           |

## 🛡️ Environment Variables

You can configure the app via a `.env` file:

```
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

## 📄 License

MIT License
