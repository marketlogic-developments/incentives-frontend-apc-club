# Usa una imagen base oficial de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración necesarios
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos al contenedor
COPY . .

# Expone el puerto que usa el script de inicio (8050)
EXPOSE 8050

# Comando para ejecutar Next.js en producción
CMD ["npm", "run", "start"]
