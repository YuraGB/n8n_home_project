FROM node:20-bullseye

# Chromium + залежності
RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    fonts-liberation \
    libgtk-3-0 \
    wget \
    curl \
 && rm -rf /var/lib/apt/lists/*

# Ставимо n8n глобально
RUN npm install -g n8n

# Робоча папка
WORKDIR /usr/src/app

# package.json і залежності
COPY package*.json ./
RUN npm install

# Копіюємо код
COPY . .

# Puppeteer буде використовувати системний Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

EXPOSE 5678
CMD ["n8n", "start"]
