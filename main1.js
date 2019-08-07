const puppeteer = require('puppeteer');

void (async()=>{

  try{
    const browser= await puppeteer.launch({headless:true});
    const page= await browser.newPage();
    await page.goto('http://results.eci.gov.in/pc/en/constituencywise/ConstituencywiseU011.htm');
    await page.waitForSelector('table.table-party');
    const selector1 = 'select#ddlState';
    const row1 = await page.$$eval(selector1, trs => trs.map(tr => {
      const tds1 = [...tr.getElementsByTagName('option')];
      return tds1.map(td =>td.value);
  }));
  for(var i=1;i<row1[0].length;i++){
    await page.waitFor(3000);
    await page.select('select[id="ddlState"]', row1[0][i]);
    var selector2 = 'select#ddlAC';
    var row2 = await page.$$eval(selector2, trs => trs.map(tr => {
      var tds2 = [...tr.getElementsByTagName('option')];
      return tds2.map(td =>td.value);
  }));
  await page.waitFor(3000);
for(var j=1;j<row2[0].length;j++){
  await page.waitFor(1000);
    await page.select('select[id="ddlAC"]', row2[0][j]);
    await page.waitFor(1000);
  const selector = 'table.table-party > tbody > tr';
    const row = await page.$$eval(selector, trs => trs.map(tr => {
      const tds = [...tr.getElementsByTagName('td')];
      return tds.map(td => td.textContent);
  }));
  console.log(row);
}
    
  }
    
  
    
  }
  catch(err){
    console.log('this is the err '+err);
  }
})()
