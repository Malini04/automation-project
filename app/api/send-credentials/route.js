// pages/api/login.js
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { email, password } = req.body;

    // Send the email and password to the server
    const puppeteer = require("puppeteer");
    // const coverLetter = require("../../path_to_your_coverLetter"); // Adjust the path as needed

    const loginLink = "https://internshala.com/registration/student";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(loginLink, { waitUntil: "networkidle2" });
    await page.type("#email", email);
    await page.type("#password", password);
    await page.click("#login");

    await browser.close();

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during Puppeteer operation:", error);
    return res.status(500).json({ message: "Login failed" });
  }
}
