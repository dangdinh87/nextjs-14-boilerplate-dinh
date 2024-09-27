# Get env
FROM node:18-alpine as env

# Add Maintainer Info
LABEL maintainer="account"

# Agrs
ARG INFISICAL_API_URL
ARG INFISICAL_CLIENT_ID
ARG INFISICAL_CLIENT_SECRET
ARG INFISICAL_PROJECT_ID
ARG INFISICAL_ENV

WORKDIR /app

RUN apk add --no-cache bash curl && curl -1sLf \
    'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.alpine.sh' | bash \
    && apk add infisical

# Check version
RUN infisical -v

# Get ENV
RUN export INFISICAL_API_URL=${INFISICAL_API_URL} \
    && export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id=${INFISICAL_CLIENT_ID} --client-secret=${INFISICAL_CLIENT_SECRET} --silent --plain) \
    && infisical export --projectId=${INFISICAL_PROJECT_ID} --env=${INFISICAL_ENV} --format=dotenv --path=/client > .env


# Builder
FROM node:18-alpine as builder

# Add Maintainer Info
LABEL maintainer="account"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn --ignore-optional

# Copy the entire application to the working directory
COPY . .

COPY --from=env /app/.env ./.env

# Build the Next.js application for production
RUN yarn run build

# Build Application
FROM node:18-alpine
LABEL maintainer="account"

WORKDIR /app

# Copy source code
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/server ./.next/server

# Expose
EXPOSE 3000

# Run
CMD ["node", "server.js"]