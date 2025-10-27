# Base stage
FROM node:20-slim AS base

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build stage untuk production
FROM base AS build
RUN npm run build

# Production stage
FROM node:20-slim AS production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

# Copy hasil build
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
