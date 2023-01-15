const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
    const browser = await puppeteer.launch(/*{headless:false}*/);
    const page = await browser.newPage();
    await page.goto('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops');
    
    let links = [];
    const elements = await page.$$('.thumbnail * a');
    for (let i = 0; i < elements.length; i++) {
        links.push(await (await elements[i].getProperty('href')).jsonValue());
    }
    
    let data = []

    for (let j = 0; j < links.length; j++) {
        
    await page.goto(links[j]);
            
    const laptopData = await page.evaluate(() => {
        const title = document.querySelector('.caption >h4:nth-child(2)').innerText;
        const price_homepage = document.querySelector('.caption .price').innerText;
        const description = document.querySelector('.caption p').innerText;
        const ratings = document.querySelector('.ratings p').innerText;

        const price_with_hdd = {
            hdd128: "",
            hdd256: "",
            hdd512: "",
            hdd1024: ""
        }

        document.querySelector('.swatches button:nth-child(1)').click(); 
        price_with_hdd.hdd128 = document.querySelector('.caption .price').innerText; 

        document.querySelector('.swatches button:nth-child(2)').click();
        price_with_hdd.hdd256 = document.querySelector('.caption .price').innerText;

        document.querySelector('.swatches button:nth-child(3)').click();
        price_with_hdd.hdd512 = document.querySelector('.caption .price').innerText;
        
        document.querySelector('.swatches button:nth-child(4)').click();
        price_with_hdd.hdd1024 = document.querySelector('.caption .price').innerText;

        return { title, price_homepage, description, ratings, price_with_hdd };
    });
   
    data.push(laptopData);
    console.log(laptopData);

    await page.goto('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops');
    
    // await new Promise(resolve => setTimeout(resolve, 7000));

    } 
          
    const formattedData = JSON.stringify(data, null, 4);
    fs.writeFileSync('data.json', formattedData);
    console.log("Data is saved in data.json file");

    await browser.close();
})();
