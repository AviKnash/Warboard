FROM node:20-alpine

WORKDIR /backend

COPY package.json ./

# Install dependencies and ts-node globally
RUN npm install && npm install -g ts-node typescript

# Add node_modules/.bin to PATH
ENV PATH /backend/node_modules/.bin:$PATH

COPY . .

EXPOSE 3001

CMD ["npm", "start"]