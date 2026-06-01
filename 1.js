import puppeteer from "puppeteer";

const run = async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://google.com");

  console.log("OK");

  await browser.close();
};

run();
