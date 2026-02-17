# Stage 1 - Build
FROM node:18-alpine as build
WORKDIR /app


# Copie des fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# Installation stricte (équivalent de npm ci)
RUN pnpm install --frozen-lockfile

# Copie du reste du code
COPY . .

# Stage 2 - Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 82
CMD ["nginx", "-g", "daemon off;"]