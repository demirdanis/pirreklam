FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
COPY . .

ARG GITHUB_TOKEN
ARG DIRECTUS_URL
ARG DIRECTUS_STATIC_TOKEN
ARG BASE_URL

ENV DIRECTUS_URL=$DIRECTUS_URL \
    DIRECTUS_STATIC_TOKEN=$DIRECTUS_STATIC_TOKEN \
    BASE_URL=$BASE_URL \
    NODE_ENV=production

RUN npm install --frozen-lockfile
RUN npm run build:web

FROM node:20-alpine AS runner

WORKDIR /app

ENV PORT=3000 \
    HOSTNAME="0.0.0.0" \
    NODE_ENV=production    

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]