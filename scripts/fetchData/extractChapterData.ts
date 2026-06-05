import type { Page } from "puppeteer";
import { resourcePlaceholder } from "../constants";
import type { TChapterData } from "../types";

/**
 * Extracts chapter data from the page.
 * @param page
 * @param chapterClassName
 * @param titleClassName
 * @param dateClassName
 * @return {Promise<{title: string, date: string, postId: number, lastVisited: string | null}>}
 */
export const extractChapterData = async (
  page: Page,
  chapterClassName: string,
  titleClassName: string,
  dateClassName: string,
): Promise<TChapterData> => {
  return await page.evaluate(
    (chapterSelector, titleSelector, dateSelector, placeholder) => {
      const item = document.querySelector(chapterSelector);

      if (!item) {
        return placeholder;
      }

      const titleElement = item.querySelector(titleSelector);
      const dateElement = item.querySelector(dateSelector);

      return {
        title: titleElement?.textContent?.trim() || "",
        date: dateElement?.textContent?.trim() || "",
        postId: 0,
        lastVisited: null,
      };
    },
    chapterClassName,
    titleClassName,
    dateClassName,
    resourcePlaceholder,
  );
};
