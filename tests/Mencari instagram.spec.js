const { test, expect } = require('@playwright/test');

test('Mencari akun Instagram dan mengambil screenshot postingan pertama', async ({ page }) => {
  // Buka situs Instagram
  await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle' });

  // Tunggu hingga input login muncul
  await page.waitForSelector('input[name="username"]');

  // Masukkan username dan password Instagram Anda
  await page.fill('input[name="username"]', 'agilajahdah');
  await page.fill('input[name="password"]', 'Agilajah01');
  await page.click('button[type="submit"]');

  // Tunggu hingga halaman utama muncul
  await page.waitForNavigation({ waitUntil: 'networkidle' });

  // Buka halaman profil pengguna
  await page.goto('https://www.instagram.com/alwiassegaf03/', { waitUntil: 'networkidle' });

  // Tunggu hingga postingan pertama muncul
  /*await page.waitForSelector('article > div img');*/

  // Pilih postingan pertama
  const firstPost = await page.$('article > div img');
  await firstPost.click();

  // Tunggu hingga postingan dimuat
  await page.waitForSelector('div[role="dialog"] img');

  // Ambil screenshot dari postingan pertama
  await page.screenshot({ path: 'first_post.png', fullPage: true });

  // Verifikasi screenshot diambil dengan benar
  expect(await page.screenshot({ path: 'first_post.png', fullPage: true })).toBeTruthy();
});
