# ===============================
# 1. Builder Stage
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build Next.js (standalone output)
RUN npm run build


# ===============================
# 2. Runner Stage (Minimal Image)
# ===============================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# Copy standalone server
COPY --from=builder /app/.next/standalone ./

# Copy static files
COPY --from=builder /app/.next/static ./.next/static

# Copy public folder
COPY --from=builder /app/public ./public

# Copy Drizzle migration files (needed for auto-migration at startup)
COPY --from=builder /app/drizzle ./drizzle

# Copy MDX content (needed for article rendering)
COPY --from=builder /app/content ./content

# Expose Next.js port
EXPOSE 3000

# Start standalone server
CMD ["node", "server.js"]
