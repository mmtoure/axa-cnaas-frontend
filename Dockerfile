FROM node:20-slim  AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable # Active pnpm nativement

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# 2️⃣ Serve stage
FROM nginx:alpine
# 🔹 Copier le build correct
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf



EXPOSE 82
CMD ["-g", "daemon off;"]