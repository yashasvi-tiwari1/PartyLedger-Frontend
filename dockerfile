# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code to the container
COPY . .

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "dev"]
