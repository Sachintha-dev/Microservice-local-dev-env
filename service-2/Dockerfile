FROM node:20-alpine

# Install dependencies
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
RUN npm install -g ts-node typescript

# Create app directory
RUN mkdir /app
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN apk add --update --no-cache openssl openssl-dev
RUN npm install

# Copy app source code
COPY . .

# Expose port
EXPOSE 3000

# Run Prisma generate and build
RUN npx prisma generate
RUN npm run build

# Start the application
CMD ["npm", "run", "start"]
