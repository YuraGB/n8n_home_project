import type { ApiPost, TPostData } from "../types";

export const mapData = (data: ApiPost[]) =>
  data
    .map((post: ApiPost): TPostData | null => {
      if (typeof post.url !== "string") {
        return null;
      }

      const postId =
        typeof post.id === "number"
          ? post.id
          : Number.parseInt(String(post.id), 10);

      if (!Number.isInteger(postId)) {
        return null;
      }

      return {
        postUrl: post.url,
        postId,
        lastVisited:
          typeof post.lastVisited === "string" ? post.lastVisited : null,
      };
    })
    .filter((post): post is TPostData => post !== null);
