import type { Page } from "puppeteer";
import { resourcePlaceholder } from "../constants";

/** * Extracts chapter data from the page.
 * @param page
 * @param chapterClassName
 * @param titleClassName
 * @param dateClassName
 * @return {Promise<Array<{title: string, date: string, postId: number, lastVisited: string}>> }
 */
export const extractChapterData = async (page: Page, chapterClassName: string, titleClassName: string, dateClassName: string,) => {  
    // Wait for the chapter elements to be present
    return await page.evaluate((chapterSelector, titleSelector, dateSelector) => {
      const item = document.querySelector(chapterSelector);

      if (!item) {
        console.error("No items found with the provided selector:", chapterSelector);
        return resourcePlaceholder
      }

      const titleElement = item.querySelector(titleSelector);      
      const dateElement = item.querySelector(dateSelector);
          
      return {
          title : titleElement?.textContent?.trim() || "",          
          date : dateElement?.textContent?.trim() || ""  ,
          postId: 0, // Placeholder for postId, will be set later        
          lastVisited: '' // Placeholder for lastVisited, will be set later
      };
      
  }, chapterClassName, titleClassName, dateClassName); // ← передаємо значення
}
