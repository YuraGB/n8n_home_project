import { launch } from "puppeteer";
import { extractChapterData } from "./extractChapterData";
import type { TGetLatestResourceDataParams } from "../types";
import { CHROMIUM_PATH, lunchArgs } from "../constants";

/**
 * Launches a new browser page and navigates to the specified URL.
 * @param url The URL to navigate to.
 * @returns An object containing the browser and page instances.
 */
const lunchNewBrowserPage = async (url: string) => {
  const browser = await launch({
    headless: true,
    args: lunchArgs,
    executablePath: CHROMIUM_PATH, // /usr/bin/chromium
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 160000, // Increased timeout for slow loading pages for Docker environments
  });

  return { browser, page };
};

/**
 * Fetches the latest resource data from a given URL.
 * @param url
 * @param chapterClassName
 * @param titleClassName
 * @param dateClassNane
 */
export const getLatestResourceData = async ({
  url,
  chapterClassName,
  titleClassName,
  dateClassName,
  tabSelector,
  postId,
  lastVisited,
}: TGetLatestResourceDataParams) => {
  const { browser, page } = await lunchNewBrowserPage(url);

  // If chapters are loaded in a specific tab, click on it
  // This is useful for sites like Mangabuff where chapters are not loaded by default
  if (tabSelector) {
    await page.waitForSelector(tabSelector);
    await page.click(tabSelector);
  }

  if (!chapterClassName || !titleClassName || !dateClassName) {
    await browser.close();
    return null;
  }

  // Extract chapter data from the page
  const chapters = await extractChapterData(
    page,
    chapterClassName,
    titleClassName,
    dateClassName
  );

  // Remove placeholders
  chapters.postId = postId;
  chapters.lastVisited = lastVisited;

  await browser.close();
  return chapters;
};
