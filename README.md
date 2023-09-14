A monorepo project with two applications - frontend and backend - managed using Nx and Docker Compose.

## Getting Started

To run the project, you can use Docker Compose. This will start both the frontend and backend applications in separate containers.

```bash
docker-compose up
```

If you prefer to run the applications separately, you can use the following npm scripts:

Frontend:

```
npm run client:dev:docker
```

Backend:

```
npm run proxy:dev:docker
```

These scripts will start the applications using Nx, with the frontend accessible at http://localhost:4200 and the backend running on a specified port.

## Technologies Used
Nx Monorepo: This project is organized as a monorepo using Nx, which allows you to manage multiple applications and libraries within a single codebase.

Docker Compose: Docker Compose is used to manage the containerized applications and their dependencies.

## Directory Structure
apps/client: The frontend application.
apps/proxy: The backend application.