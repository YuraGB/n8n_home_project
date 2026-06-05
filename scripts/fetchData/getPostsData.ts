import { POSTS_API_URL, SOURCE_TOKEN } from "../constants";
import { mapData } from "./mapData";

/**
 *
 * @returns {Promise<Array<{postUrl: string}>> | null}
 * Fetches posts data from the API defined in the environment variable POSTS_API_URL.
 */
export const getPostsData = async () => {
  if (!POSTS_API_URL) return null;

  if (!SOURCE_TOKEN) return null;

  try {
    const response = await fetch(POSTS_API_URL, {
      headers: {
        Authorization: `Bearer ${SOURCE_TOKEN}`,
      },
    });
    if (!response.ok) {
      console.error("Failed to fetch posts data:", response.statusText);
      return null;
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      console.error("Posts API returned non-array data.");
      return null;
    }

    return mapData(data);
  } catch (error) {
    console.error("Error fetching posts data:", error);
    return null;
  }
};
