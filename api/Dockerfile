FROM node:20-alpine
WORKDIR /app 

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy app source
COPY . .

ENV NODE_ENV=production
EXPOSE 3000
USER node

#run the server 
CMD ["node", "index.js"]
