const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");

const runFreteTests = require("./Time_14(Frete)/frete-all-screens.test.js");

const BASE_URL = process.env.APP_URL || "http://localhost:3000";
const SCREENSHOTS_DIR = path.join(__dirname, "..", "screenshots");

// Garante que o diretório de screenshots existe
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

let driver;

async function tiraFoto(name) {
  try {
    const img = await driver.takeScreenshot();
    const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`);

    fs.writeFileSync(filePath, img, "base64");

    console.log(`Foto tirada ${name}.png`);
  } catch (e) {
    console.warn("Erro ao tirar a foto");
  }
}

async function main() {
  try {
    const opts = new chrome.Options();

    opts.addArguments(
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--window-size=800,640",
      "--disable-gpu"
    );

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(opts)
      .build();

    await driver.manage().setTimeouts({
      implicit: 5000,
      pageLoad: 15000,
    });

    console.log(BASE_URL);

    /*
      Bloco de teste geral mantido por compatibilidade com o base.test.js
      original do projeto principal.

      Se quiser testar alguma tela global antes dos testes das equipes,
      dá para usar este driver aqui.
    */

    console.log("\n--- Iniciando testes do Time_14(Frete) ---");
    await runFreteTests();

  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

main().catch((err) => {
  console.error("Erro fatal", err);
  process.exit(1);
});