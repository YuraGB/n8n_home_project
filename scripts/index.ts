// import { getPostsData } from "./fetchData/getPostsData";
import fs from 'fs';
import { defindAndFetchResourceData } from './fetchData/defindAndFetchResourceData';

/**
 * This script is designed to fetch the latest resource data based on provided posts data.
 * It can read from a JSON file or parse a JSON string passed as an argument.
 * 
 * Usage:
 *  1. Pass a JSON string or a path to a JSON file as an argument when running the script.
 *  2. The script will fetch the latest resource data for each post URL.
 *  3. !!!IMPORTANT -> The output will be printed as JSON, which can be consumed by n8n or other systems.
 *    ---> It meens NO CONSOLE LOGS except for errors and JSON output. <---
 */
(async () => {
  let postsData: any;

  const arg = process.argv[2];
  // ------------------ //
  // console.log("Starting script with argument:", arg);
  // ------------------ //  
  if (!arg) {
    console.error("Please provide a JSON string or a path to a JSON file as an argument.");
    process.exit(1);
  }

  try {
    if (arg.endsWith('.json') && fs.existsSync(arg)) {
      // Читаємо з файлу
      postsData = JSON.parse(fs.readFileSync(arg, 'utf8'));
    } else {
      // Парсимо як JSON рядок
      postsData = JSON.parse(arg);
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }


  if (!postsData || postsData.length === 0) {
    console.error("No posts data found.");
    process.exit(1);
  }

  const formattedPostsData = postsData.map((post: {url: string, id: string, lastVisited: string}) => {
    if (!post.url || !post.id) {
      return null;
    }
      return {
        postUrl: post.url,
        postId: parseInt(post.id, 10), // Перетворюємо id на число
        lastVisited: post.lastVisited
      };
    }
  ).filter((post: any) => post !== null);

  // ------------------ //
  // console.log("Formatted posts data:", formattedPostsData);
  // ------------------ //
  const latestResourceDataPromiseSettled = await defindAndFetchResourceData(formattedPostsData);  

  // ------------------ //
  // console.log("Latest resource data promise settled:", latestResourceDataPromiseSettled);
  // ------------------ //
  if (!latestResourceDataPromiseSettled) {
    console.error("No latest resource data found.");
    process.exit(1);
  }

    const parsedSettledData = latestResourceDataPromiseSettled.map(
      (item: PromiseSettledResult<{ title: string; postId: number; date: string; lastVisited: string; } | null>) => {
        if(item.status === "fulfilled") {
          return item.value;
        }
        return null;
    }).filter(i => !!i);

  // // Виводимо як JSON, щоб n8n міг зчитати
  console.log(JSON.stringify(parsedSettledData));
  process.exit(0);
})();
