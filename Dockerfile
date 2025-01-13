# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install --omit=dev

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación
FROM node:18-alpine AS runner

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios desde la etapa de construcción
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exponer el puerto en el contenedor
EXPOSE 8080
EXPOSE 8050

# Iniciar la aplicación en modo producción
CMD ["npm", "start"]
