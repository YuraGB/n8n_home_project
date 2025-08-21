import { classSelectors } from "../constants";
import type { TPostData } from "../types";
import { getLatestResourceData } from "./getLatestResourceData";


//**  Helper function to fetch the latest resource data based on the post URL.
// * @param data
// * @return {Promise<Array<{title: string, date: string}>> | null}
// * This function processes an array of post URLs, fetching the latest resource data for each.
// */
const fetchHelper = (data: TPostData[]) =>  data.map(({postUrl, postId, lastVisited}) => {
    
    if(!postUrl || !postId) {
        console.error("Invalid post data:", { postUrl, postId });
        return null;
    }
    
    if(postUrl.includes("senkuro")) {
      // Ensure the URL ends with "/chapters" for consistency
      if(!postUrl.includes("chapters")) {
        postUrl += "/chapters";
      }

      return getLatestResourceData({
        url:postUrl,
        chapterClassName: classSelectors.senkuro.chapterClassName,
        titleClassName: classSelectors.senkuro.titleClassName,
        dateClassName: classSelectors.senkuro.dateClassNane,
        postId: postId,
        lastVisited
      })
    }

    if(postUrl.includes("mangabuff")) {

      return getLatestResourceData({
        url:postUrl,
        chapterClassName: classSelectors.mangabuff.chapterClassName,
        titleClassName: classSelectors.mangabuff.titleClassName,
        dateClassName: classSelectors.mangabuff.dateClassNane,
        tabSelector: classSelectors.mangabuff.tabSelector,
        postId: postId,
        lastVisited
      });
    }

    return null;
})

/** * Defines and fetches the latest resource data based on the provided posts data.
 * @param data
 * @return {Promise<Array<{title: string, date: string}>> | null}
 * This function processes an array of post URLs, fetching the latest resource data for each.
 */
export const defindAndFetchResourceData = async (data: Array<TPostData>) => {
  const postsWithChaptersToFetch = data.filter((post) => Object.keys(classSelectors).some((key) => post.postUrl.includes(key)));

  if (postsWithChaptersToFetch.length === 0) {
    console.error("No valid posts found to fetch chapters.");
    return null;
  }

  return await Promise.allSettled(fetchHelper(postsWithChaptersToFetch))
}
  