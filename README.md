# 📦 Deel Node-Express Microservice

A lightweight Node.js microservice built with Express.js.

## 🚀 Features

- Fast and minimal Express server
- RESTful API structure
- Environment-based configuration
- Dockerized for easy deployment

## 📁 Project Structure

```
.
├── src/                # Source code (or use 'app/' or directly place JS files here)
│   └── index.js        # Entry point
├── package.json        # Project metadata and scripts
├── .env                # Environment variables
├── Dockerfile          # Docker setup
└── README.md           # You're here
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
```

The server will run on `http://localhost:3000` by default.

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
| `npm run build` | Compile TypeScript (if any) |
| `npm test`      | Run tests (if configured)   |

## 🛡️ Environment Variables

You can configure the app via a `.env` file:

```
PORT=3000
NODE_ENV=development
```

## 📄 License

MIT License
