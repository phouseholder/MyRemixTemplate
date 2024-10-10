FROM --platform=linux/amd64 node:21

# Create a non-root user and set the ownership
RUN groupadd -r nodeuser && useradd -r -g nodeuser nodeuser

# Set the working directory and permissions
WORKDIR /MyRemixTemplate

# Ensure the directory and all subdirectories have the correct permissions
RUN chown -R nodeuser:nodeuser /MyRemixTemplate

# Copy package.json and package-lock.json
COPY --chown=nodeuser:nodeuser package*.json ./


# Install dependencies
RUN npm install

# Copy the application files
COPY --chown=nodeuser:nodeuser . /MyRemixTemplate

# Copy the correct .env file
# COPY --chown=nodeuser:nodeuser .env /app/.env

# Switch to non-root user
USER nodeuser

# Build the Application
RUN npm run build

# Run the application
CMD ["npm", "run", "start"]

