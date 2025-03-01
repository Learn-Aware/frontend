# Stage 1: Builder
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn run build

# Stage 2: Production
FROM node:18-slim AS production

# Set the working directory
WORKDIR /app

# Copy only the built assets and package files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy the .env file
COPY .env .env

# Install only production dependencies
RUN yarn install --production

# Expose the application port
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
