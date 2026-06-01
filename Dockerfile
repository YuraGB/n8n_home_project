FROM node:20-bullseye

RUN apt-get update && apt-get install -y \
    wget curl gnupg ca-certificates \
    fonts-liberation \
    libnss3 libatk-bridge2.0-0 libxss1 \
    libasound2 libgbm1 libgtk-3-0 \
    libxshmfence1 xdg-utils \
 && rm -rf /var/lib/apt/lists/*

# Google Chrome ONLY
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb

# Puppeteer config
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# n8n
RUN npm install -g n8n

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENV N8N_RUNNERS_ENABLED=true
ENV N8N_EXECUTE_COMMAND_ENABLED=true
ENV N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true

EXPOSE 5678

CMD ["n8n", "start"]