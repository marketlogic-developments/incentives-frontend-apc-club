# Usa una imagen base oficial de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package.json package-lock.json ./

# Instala las dependencias de producción
RUN npm install --omit=dev

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto en el que se ejecutará la aplicación (Railway detectará automáticamente este puerto)
EXPOSE 8050

# Comando para ejecutar la aplicación en modo producción
CMD ["npm", "run", "start"]
