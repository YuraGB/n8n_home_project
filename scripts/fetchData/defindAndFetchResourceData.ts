import { classSelectors } from "../constants";
import type { TChapterData, TPostData } from "../types";
import { getLatestResourceData } from "./getLatestResourceData";

const fetchHelper = (data: TPostData[]) =>
  data
    .map(({ postUrl, postId, lastVisited }) => {
      if (!postUrl || !Number.isInteger(postId)) {
        console.error("Invalid post data:", { postUrl, postId });
        return null;
      }

      if (postUrl.includes("senkuro")) {
        const url = postUrl.includes("chapters")
          ? postUrl
          : `${postUrl}/chapters`;

        return getLatestResourceData({
          url,
          chapterClassName: classSelectors.senkuro.chapterClassName,
          titleClassName: classSelectors.senkuro.titleClassName,
          dateClassName: classSelectors.senkuro.dateClassName,
          postId,
          lastVisited,
        });
      }

      if (postUrl.includes("mangabuff")) {
        return getLatestResourceData({
          url: postUrl,
          chapterClassName: classSelectors.mangabuff.chapterClassName,
          titleClassName: classSelectors.mangabuff.titleClassName,
          dateClassName: classSelectors.mangabuff.dateClassName,
          tabSelector: classSelectors.mangabuff.tabSelector,
          postId,
          lastVisited,
        });
      }

      return null;
    })
    .filter(
      (request): request is Promise<TChapterData | null> => request !== null,
    );

export const defindAndFetchResourceData = async (data: TPostData[]) => {
  const postsWithChaptersToFetch = data.filter((post) =>
    Object.keys(classSelectors).some((key) => post.postUrl.includes(key)),
  );

  if (postsWithChaptersToFetch.length === 0) {
    console.error("No valid posts found to fetch chapters.");
    return null;
  }

  return await Promise.allSettled(fetchHelper(postsWithChaptersToFetch));
};
