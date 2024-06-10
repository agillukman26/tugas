const { chromium } = require('playwright');

(async () => {
  // Luncurkan browser
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Buka situs berita terpercaya (misalnya Kompas)
  await page.goto('https://www.kompas.com/', { waitUntil: 'networkidle' });

  // Cari elemen input pencarian dan ketikkan "polisi wanita membakar suaminya"
  await page.fill('input[type="search"]', 'polisi wanita membakar suaminya');
  await page.keyboard.press('Enter');

  // Tunggu sampai halaman pencarian dimuat
  await page.waitForSelector('div[class*="search-result"]');

  // Pilih hasil pencarian pertama
  const firstArticle = await page.$('div[class*="search-result"] a');
  if (firstArticle) {
    await firstArticle.click();

    // Tunggu hingga artikel dimuat
    await page.waitForSelector('article');

    // Ambil screenshot artikel
    await page.screenshot({ path: 'news_article.png', fullPage: true, quality: 100 });

    console.log('Screenshot berhasil diambil: news_article.png');
  } else {
    console.log('Berita tidak ditemukan.');
  }

  // Tutup browser
  await browser.close();
})();
