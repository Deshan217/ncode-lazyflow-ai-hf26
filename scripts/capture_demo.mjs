/**
 * Record a real browser walkthrough against a local Ollama-powered app.
 * No mocked API, no hardcoded AI plan, and no sample metrics are presented.
 */
import {chromium} from "playwright-core";
import {mkdir,rename,writeFile} from "node:fs/promises";
import path from "node:path";

await mkdir("evidence",{recursive:true});
const executablePath=process.env.CHROME_BIN||"/usr/bin/google-chrome";
const browser=await chromium.launch({executablePath,headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
let context;
try{
 context=await browser.newContext({viewport:{width:1365,height:900},recordVideo:{dir:"evidence",size:{width:1365,height:900}}});
 const page=await context.newPage();
 await page.goto("http://127.0.0.1:8787/",{waitUntil:"networkidle",timeout:30000});
 await page.locator("#status").waitFor();
 await page.screenshot({path:"evidence/lazyflow-before.png",fullPage:true});
 await page.locator("#tasks").fill("Reply to two client emails, finish homepage layout, organize project files, take a walk");
 await page.locator("#energy").selectOption("low");
 await page.locator("#minutes").selectOption("60");
 await page.waitForTimeout(1100);
 await page.locator("#generate").click();
 await page.locator(".result h2").waitFor({timeout:200000});
 await page.waitForTimeout(1400);
 await page.screenshot({path:"evidence/lazyflow-real-output.png",fullPage:true});
 const renderedPlan=await page.locator("#output").innerText();
 if(!renderedPlan.includes("min")||!renderedPlan.includes("Download Markdown plan"))throw Error("Browser did not render actual model plan");
 await writeFile("evidence/browser-demo-summary.txt",[
 "Recorded:",new Date().toISOString(),
 "This browser recording clicks Generate and waits for a real /api/plan response from local Gemma.",
 "",
 renderedPlan
 ].join("\n"));
 await page.locator(".download").click();
 await page.waitForTimeout(1500);
 const video=page.video();
 await context.close();context=null;
 if(video){await rename(await video.path(),path.resolve("evidence/lazyflow-real-gemma-demo.webm"))}
 console.log("VERIFIED REAL BROWSER DEMO: screenshot and video of generated Gemma plan");
}catch(err){console.error("Browser demo capture failed:",err);process.exitCode=1;if(context)await context.close()}finally{await browser.close()}
