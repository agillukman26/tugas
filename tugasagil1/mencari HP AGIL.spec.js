const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Mencari akun Instagram dan mengambil screenshot postingan pertama', async ({ page }) => {
  // Nama folder untuk menyimpan screenshot
  const screenshotDir = path.join('d', 'screenshots');

  // Buat folder jika belum ada
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

   // Set viewport dan skala agar sesuai dengan zoom 100%
   await page.setViewportSize({ width: 1920, height: 1080 });
   await page.evaluate(() => {
     document.body.style.zoom = "250%";
   });

  // Buka situs Tokopedia
  await page.goto('https://www.tokopedia.com/');

  // Cari elemen input pencarian dan ketikkan "Samsung Galaxy A55"
  await page.getByPlaceholder('Cari di Tokopedia').click();
  await page.getByPlaceholder('Cari di Tokopedia').fill('samsung');
  await page.getByRole('link', { name: 'item-icon samsung a55' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Samsung Galaxy A55 5G 12/256GB Ad' }).click();
  await page.waitForTimeout(3000);

// Ambil screenshot dari postingan pertama
const screenshotPath = path.join(screenshotDir, 'hape agil.png');
await page.screenshot({ path: screenshotPath});

console.log(`Screenshot berhasil diambil: ${screenshotPath}`);
});