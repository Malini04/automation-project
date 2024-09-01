const puppeteer = require("puppeteer");
// const coverLetter = require("./coverLetter"); // Assuming coverLetter.js is in the same directory

const loginLink = "https://internshala.com/registration/student";
const email = "wpbackup4251@gmail.com";
const pass = "password";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(loginLink);

  // Perform login
  await page.click("span[data-toggle='modal']", { delay: 50 });
  await page.type("input[id='modal_email']", email, { delay: 50 });
  await page.type("input[id='modal_password']", pass, { delay: 50 });
  await page.click("button[tabindex='3']", { delay: 50 });
  await page.waitForNavigation({ waitUntil: "networkidle0" }); // Wait for navigation after login

  // Navigate to internships page 

  await waitAndClick("a[id='internships_new_superscript']", page);
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  // Search for Front End Development internships
  await waitAndClick("input[tabindex='4']", page);
  await page.type("input[tabindex='4']", "Front End Development", {
    delay: 50,
  });
  await page.keyboard.press("Enter");
  await delay(4000);

  console.log("Front end submitted. Now waiting for array......");

  // Get internship items
  const internArr = await page.$$(
    // ".container-fluid.individual_internship.view_detail_button.visibilityTrackerItem"
    ".container-fluid.individual_internship"
  );

  // console.log("Got the div....");

  //empty array
  // console.log(internArr);


  let cnt = 0;
  for (const intern of internArr) {
    let title = "Null";
    try {
      title = await page.evaluate(
        (el) => el.querySelector("h3").textContent,
        intern
      );
    } catch (error) {
      console.error("Error extracting title:", error);
    }
    if (title.includes("Front End Development")) {
      cnt++;
      if (cnt <= 4) {
        await delay(1000);
        let newPagePromise = getNewPageWhenLoaded(browser);

        await intern.click();
        await delay(1000); // Delay to ensure the new tab opens properly

        let newPage = await newPagePromise;
        await delay(1000);
        await newPage.bringToFront();
        //await newPage.waitForNavigation({ waitUntil: 'networkidle0' }); // Wait for navigation after new tab opens

        let pages = await browser.pages();
        if (pages.length >= 4) {
          await pages[3].close(); // Close the fourth tab if there are 4 or more tabs
        }

        await delay(1000); // Delay to ensure the new page is fully loaded

        await waitAndClick(
          ".buttons_container button[id='apply_now_button']",
          newPage
        );
        await delay(2000); // Delay to wait for any navigation or loading after clicking the button

        await waitAndClick(
          "button[class='btn btn-large education_incomplete proceed-btn']",
          newPage
        );

        await newPage.waitForSelector(".ql-editor.ql-blank");
        await delay(1000); // Delay to ensure the text editor is ready
        await newPage.type(".ql-editor.ql-blank", coverLetter);
        await delay(1000); // Delay to ensure typing is complete

        await newPage.click("input[id='submit']");
        await delay(2000); // Delay to wait for the form submission

        await newPage.close();
        await delay(1000); // Delay before processing the next internship

        let pages1 = await browser.pages();
        if (pages1[2]) {
          await pages1[2].close();
        }
      }
    }
  }

  await browser.close(); // Close the browser after processing all internships
})();

// Helper function to wait and click
function waitAndClick(selector, cPage) {
  return new Promise((resolve, reject) => {
    cPage
      .waitForSelector(selector)
      .then(() => cPage.click(selector))
      .then(resolve)
      .catch((err) => reject(err));
  });
}

// Helper function for delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to get the new page when a new tab is opened
function getNewPageWhenLoaded(browser) {
  return new Promise((resolve) => {
    browser.on("targetcreated", async (target) => {
      if (target.type() === "page") {
        const newPage = await target.page();
        await newPage.once("domcontentloaded", () => resolve(newPage));
      }
    });
  });
}
