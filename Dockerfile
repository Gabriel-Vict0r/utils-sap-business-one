# imagem base
FROM node:20-alpine

# diretório dentro do container
WORKDIR /app

# copia package.json primeiro (melhor cache)
COPY package*.json ./

# instala dependências
RUN npm install

# copia resto do projeto
COPY . .

# build do projeto (se usar TS)
#RUN npm run build

# expõe a porta (ajusta se necessário)
EXPOSE 3000

# comando para rodar
#CMD ["node", "dist/server.js"]
CMD ["npm", "run", "dev"]