import { launch } from "puppeteer";
import { extractChapterData } from "./extractChapterData";
import type { TGetLatestResourceDataParams } from "../types";
import { CHROMIUM_PATH, launchArgs } from "../constants";

/**
 * Launches a new browser page and navigates to the specified URL.
 * @param url The URL to navigate to.
 * @returns An object containing the browser and page instances.
 */
const launchNewBrowserPage = async (url: string) => {
  const browser = await launch({
    executablePath: CHROMIUM_PATH,
    headless: true,
    args: launchArgs,
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
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
  const { browser, page } = await launchNewBrowserPage(url);

  try {
    if (!chapterClassName || !titleClassName || !dateClassName) {
      return null;
    }

    // Mangabuff keeps chapters behind a tab.
    if (tabSelector) {
      await page.waitForSelector(tabSelector);
      await page.click(tabSelector);
    }

    const chapters = await extractChapterData(
      page,
      chapterClassName,
      titleClassName,
      dateClassName,
    );

    chapters.postId = postId;
    chapters.lastVisited = lastVisited;
    return chapters;
  } finally {
    await browser.close();
  }
};
