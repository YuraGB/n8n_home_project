import dotenv from 'dotenv';
// Importing dotenv to load environment variables
// quiet: true prevents dotenv from throwing errors if .env file is not found or console logs
dotenv.config({ quiet: true });

export const classSelectors = {
  senkuro: {
    chapterClassName: ".card-chapter",
    titleClassName: ".card-chapter__link",
    dateClassNane: ".v-popper.v-popper--theme-tooltip > span",
  },
  mangabuff: {
    chapterClassName: ".chapters__item",
    titleClassName: ".chapters__value",
    dateClassNane: ".chapters__add-date",
    tabSelector: 'button[data-page="chapters"]',
  },
}

export const resourcePlaceholder = {
          title: "",
          postId: 0,
          date: "",
          lastVisited: ''
};

// Визначаємо URL на основі середовища
export const POSTS_API_URL = (() => {
  if (process.env.IS_DOCKER === "true") {
    // Виконання всередині Docker
    return process.env.POSTS_API_URL_DOCKER || "http://host.docker.internal:3000/api/posts";
  } else {
    // Локальне виконання
    return process.env.POSTS_API_URL_LOCAL || "http://localhost:3000/api/posts";
  }
})();

// console.log("Using API URL:", POSTS_API_URL);

export const SOURCE_TOKEN = process.env.SOURCE_TOKEN;

export const lunchArgs = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-accelerated-2d-canvas",
  "--disable-background-networking",
  "--no-zygote",
  "--disable-breakpad",
  "--disable-gpu",
  "--disable-software-rasterizer",
  "--single-process"
];

export const CHROMIUM_PATH = process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium-browser";