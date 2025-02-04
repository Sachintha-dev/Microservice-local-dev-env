# Node.js Backend Core </> <a href="https://nodejs.org"><img height=48 src="https://raw.githubusercontent.com/caiogondim/javascript-server-side-logos/master/node.js/standard/454x128.png"></a>

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)

![Version](https://img.shields.io/badge/version-1.0.0-blue)

## Overview

### Description

The Node.js Backend Core is a robust and scalable backend service developed in TypeScript. It provides essential backend functionalities such as authentication, API request handling, database management using Prisma ORM and more.

### Purpose

This backend service is designed to serve as a foundation for scalable web applications, managing authentication, session handling, data storage, and API endpoint management. It connects with a Postgress database and utilizes Redis for session caching and AWS S3 Bucket for file storage.

### Key Features

- API request handling with Express
- Database management with Prisma ORM
- Dockerized for easy deployment
- Configuration management using environment variables

## Table of Contents

- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Authors and Acknowledgments](#authors-and-acknowledgments)
- [Contact Information](#contact-information)

## Folder Structure

The folder structure of this project is as follows:

```plaintext
Node js Peo core/
│
├── .env                        # Environment variable configuration file
├── .gitignore                  # Files and directories to be ignored by Git
├── app.ts                      # Main application file
├── config/                     # Configuration files (e.g., database, API keys)
│   ├── custom-environment-variables.ts
│   ├── default.ts
│   └── index.ts                # Configuration management files
├── Dockerfile                  # Docker configuration file for containerization
├── index.ts                    # Main entry point of the application
├── nginx/                      # Nginx configuration files for reverse proxy (if used)
├── nodemon.json                # Configuration file for nodemon (used in development)
├── package-lock.json           # Auto-generated file for npm dependencies
├── package.json                # Project metadata and dependency list
├── prisma/                     # Prisma ORM-related files
│   ├── schema.prisma           # Prisma schema definition for database models
│   └── migrations/             # Migration files for database schema
├── src/                        # Main source code directory
│   ├── api/                    # API related files
│   ├── index.ts/               # Main file to initialize the app
│   ├── module_name/            # Modules representing different features
│   │  ├── routes.ts            # Route definitions for the module
│   │  ├── controllers.ts       # Controllers for handling requests
│   │  └── service.ts           # Services for business logic
│   ├── config/                 # Configuration-related files
│   ├── utils/                  # Utility functions and helpers
│   └── schemas                 # Schema definitions for validation
├── tsconfig.json               # TypeScript configuration file
├── tslint.json                 # TSLint configuration file for linting TypeScript code
└── README.md                   # Documentation file (you're reading this)
```

## Key Directories

- config/: Contains configuration files for different environments (e.g., custom environment variables, default settings).
- prisma/: Used for database management with Prisma ORM, containing schema definitions and migrations.
- src/: The primary source code directory that includes all the core application logic, API routes, module-specific files, configuration, utilities, and schema definitions.
- module_name/: Represents individual modules/features of the application, containing their respective routes.ts, controllers.ts, and service.ts files.

## Prerequisites

### System Requirements

- OS: Windows, macOS, or Linux
- Node.js: v14 or higher
- NPM: v6 or higher
- Postgress Database
- Redis Server (for session handling)
- AWS S3 Bucket (for file handling)

### Dependencies

- Node.js packages and tools (e.g., Express, Prisma, Redis, etc.)
- Docker (if deploying in a containerized environment)

## Installation

### Step-by-Step Guide

1.Clone the repository:

```
git clone <repository-url>
cd nodejs-backend-core
```

2.Install dependencies:

```
npm install
```

3.Generate Prisma Client:

```
npm run generate-prisma-client
```

4.Set up the database: Ensure your database is running and configured correctly.

## Configuration

### Environment Variables

Copy .env.example to .env and configure the following variables:

```
JWT_SECRET='your-jwt-secret'
JWT_ALGO='JWT_ALGO'
DATABASE_URL='postgresql://username:password@host:5432/nodejs_backend_core'
NODE_ENV='development'
COOKIE_SECRET='your-cookie-secret'
REDIS_URL='redis://:password@hostname:port'
PORT=PORT_NO
```

### Configuration Files

- .env: Contains all the necessary environment variables.
- config/: This folder contains different configuration settings.

## Usage

### Running the Application

- Development

```
npm run dev
```

## API Endpoints

Refer to the detailed API documentation in the docs in postman collection.

#### Example Request

Example API request for login:

```
POST /api/v1/auth/login
{
    "username": "user@example.com",
    "password": "password123"
}
```

## Testing

### Running Tests

To execute tests, run:

```
npm test
```

### Test Coverage

Test coverage reports can be generated using the following command:

```
npm run coverage
```

## Deployment

#### Deployment Steps

1. Build the project:

```
npm run build
```

2. Start the application:

```
npm start
```

### Docker Deployment

- Build Docker Image:

```
docker build -t nodejs-backend-core .
```

- Run Docker Container:

```
docker run -p 3000:3000 nodejs-backend-core
```

## Contributing

### Contribution Guidelines (Using Git Flow)

We follow the Git Flow branching strategy. Please adhere to the following guidelines:

Main Branches:

- main: This branch contains the production-ready code. It should always be stable.
- develop: This branch contains the latest development changes. It is the default branch where features are merged.
- Supporting Branches:
- Feature Branches: For developing new features.
  - Naming convention: feature/feature-name
  - Branch off from develop and merge back into develop.
- Hotfix Branches: For quick fixes in production.
  - Naming convention: hotfix/hotfix-name
  - Branch off from main and merge back into both main and develop.
- Release Branches: For preparing the code for a production release. - Naming convention: release/version-number - Branch off from develop and merge into main once ready.
  Workflow:
- Fork the repository.
- Create a new branch based on the type of work (feature/, hotfix/, or release/).
- Commit your changes to the new branch (git commit -m 'Add feature or fix').
- Push to your fork (git push origin feature/your-branch).
- Open a Pull Request (PR) to develop or main as appropriate.

### Code Review

Ensure your code is reviewed and approved before merging.

### Code of Conduct

Please follow the Code of Conduct.

## License

This project is licensed under the MIT License.

## Authors and Acknowledgments

- Main Author: Sudesh Sachintha

## Contact Information

For support or inquiries, please reach out via;

- sudeshsachintha2016@gmail.com.
