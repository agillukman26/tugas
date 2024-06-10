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

  // Buka situs Instagram
  await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle' });

  // Tunggu hingga input login muncul
  await page.waitForSelector('input[name="username"]');

  // Masukkan username dan password Instagram Anda
  await page.fill('input[name="username"]', 'yogayunand4');
  await page.fill('input[name="password"]', 'bakwanrebus01!');
  await page.click('button[type="submit"]');

  // Tunggu hingga halaman utama muncul
  await page.waitForNavigation({ waitUntil: 'networkidle' });

  // Beri jeda untuk memastikan halaman sepenuhnya dimuat
  await page.waitForTimeout(3000);

  // Buka halaman profil pengguna
  await page.goto('https://www.instagram.com/alwiassegaf03/');
  /*// Tunggu hingga postingan pertama muncul
  await page.waitForSelector('article > div img');*/

  // Pilih postingan pertama
  await page.goto('https://www.instagram.com/p/C78Xn_wvcIt/');
  await page.waitForTimeout(3000);


  // Ambil screenshot dari postingan pertama
  const screenshotPath = path.join(screenshotDir, 'first_post.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`Screenshot berhasil diambil: ${screenshotPath}`);
});