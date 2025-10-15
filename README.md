# CI/CD Pipeline Demo Application

This is a sample web application with a GitLab CI/CD pipeline setup. The application is a simple Express.js server that demonstrates a complete CI/CD workflow with build and test stages using Docker.

## Application Overview

The sample application is a simple Express.js web server with the following endpoints:
- `GET /` - Returns a welcome message with timestamp
- `GET /health` - Returns a health check status
- `GET /api/users` - Returns a sample list of users

## CI/CD Pipeline

The pipeline is configured with the following stages:

1. **Build Stage**
   - Builds a Docker image of the application
   - Uses Docker-in-Docker (DinD) for building images
   - Saves the Docker image as an artifact for use in subsequent stages

2. **Test Stage**
   - Runs unit tests using Jest inside the same Docker container that will be deployed
   - Tests API endpoints using Supertest
   - Ensures tests run in an environment identical to production

## Prerequisites

To use this pipeline, you'll need:

1. A GitLab account
2. A GitLab project
3. GitLab Runner with Docker-in-Docker support (or use GitLab's shared runners)

## Setup Instructions

1. Clone this repository to your GitLab project
2. Ensure GitLab CI/CD is enabled for your project
3. The pipeline will automatically trigger on push events to any branch
4. View pipeline status in your GitLab project's CI/CD > Pipelines section

## Pipeline Configuration

The pipeline is configured in `.gitlab-ci.yml` with:

- Docker-in-Docker (DinD) service for building Docker images
- Build stage that creates a Docker image artifact of the application
- Containerized test stage that runs tests inside the Docker container
- Environment variables for Docker configuration

## Assumptions

1. **Runner Configuration**: The pipeline assumes you're using a GitLab Runner with Docker-in-Docker support, or GitLab's shared runners which have this capability.

2. **Docker Images**: The pipeline uses the official `docker:20.10.16` image for Docker operations.

3. **Node.js Version**: The application uses Node.js 18 as specified in the Dockerfile.

4. **Port Configuration**: The application runs on port 3000 by default, which can be overridden with the `PORT` environment variable.

5. **Artifact Storage**: Docker images are saved as artifacts and passed between stages to ensure consistency.

## Running Locally

To run the application locally:

```bash
# Install dependencies
npm install

# Start the server
npm start

# Run tests
npm test
```

To run with Docker:

```bash
# Build the Docker image
docker build -t sample-cicd-app .

# Run the container
docker run -p 3000:3000 sample-cicd-app
```

To run tests in Docker (same as CI):

```bash
# Build the test Docker image
docker build -t sample-cicd-app-test -f Dockerfile.test .

# Run tests in container
docker run --rm sample-cicd-app-test npm test
```

## Pipeline Execution

The pipeline will automatically execute on every push to any branch. You can manually trigger pipelines from the GitLab UI.

## Key Features

1. **Containerized Testing**: Tests run inside the same Docker container that will be deployed, ensuring environment consistency.

2. **Docker Artifacts**: The built Docker image is saved as an artifact and reused in the test stage, preventing inconsistencies.

3. **Docker-in-Docker**: Uses GitLab's Docker-in-Docker service for building Docker images within the pipeline.

## Customization

To customize this pipeline for your own use:

1. Modify the `.gitlab-ci.yml` file to add deployment stages
2. Update the Dockerfile if you need different base images or build steps
3. Add additional test stages or quality gates as needed
4. Configure environment variables in GitLab for sensitive data

## Troubleshooting

If the pipeline fails:

1. Check the job logs in the GitLab CI/CD interface
2. Ensure your GitLab Runner has Docker-in-Docker capabilities
3. Verify that all required dependencies are specified in package.json
4. Check that Dockerfile paths are correct
5. Ensure sufficient disk space for Docker image artifacts

For issues with the application itself, ensure all dependencies are properly installed and the server starts without errors.
