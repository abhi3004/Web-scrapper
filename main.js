module.exports.scrap = function(){
const puppeteer = require('puppeteer');

(async function main(){

  try{
    const browser= await puppeteer.launch({headless:true});
    const page= await browser.newPage();
    await page.goto('https://www.socialbakers.com/statistics/youtube/channels/india');
    await page.waitForSelector('table.brand-table-list');
    await page.click('a.btn-nw.btn-nw--lg.btn-nw--invisible.notlogged.gaevent');
    await page.waitForSelector('input#frm-showShowMoreMarketoForm-mktoForm-mktoForm-FullName');
    await page.type('input#frm-showShowMoreMarketoForm-mktoForm-mktoForm-FullName','Abhijeet Pareek');
    await page.type('input#frm-showShowMoreMarketoForm-mktoForm-mktoForm-Email','15ucc001@lnmiit.ac.in');
    await page.type('input#frm-showShowMoreMarketoForm-mktoForm-mktoForm-Company','LNMIIT');
    await page.click('input.btn-nw.btn-nw--primary.btn-nw--lg.btn-nw--wide');
   

    await page.waitFor(20000);
    
    while (await page.$('a.show-more-button.btn-nw.btn-nw--lg.btn-nw--invisible') !== null){
      await page.waitFor(3500);
      if(await page.$('a.show-more-button.btn-nw.btn-nw--lg.btn-nw--invisible') !== null){
      await page.click('a.show-more-button.btn-nw.btn-nw--lg.btn-nw--invisible');
      }
      }
      var names=[];
      const lis =await page.$$('tbody>tr>td.name>div>a')
      for(const li of lis){
        const name = await li.$eval('h2',h2=>h2.innerText);
        names.push(name)
      }
  


 
const selector = 'table.brand-table-list > tbody > tr';

const row = await page.$$eval(selector, trs => trs.map(tr => {
    const tds = [...tr.getElementsByTagName('td')];
    return tds.map(td => td.textContent);
}));

var arr=[]
for(var i=0;i<1000;i++){
  var obj={
    name:null,
    views:null,
    subs:null
  };
  obj.name=names[i];
  obj.views=parseInt(row[i][3].toString().replace(/\s/g, '').replace(/\D/g,''));
  obj.subs=parseInt(row[i][2].toString().replace(/\s/g, '').replace(/\D/g,''));
  arr.push(obj)
}


const Channel = require('./Channel');
for(var i=0;i<arr.length;i++){
var x={
  _id:'name',
  subscribers:0,
  video_views:0

}
x._id=arr[i].name
  x.subscribers=arr[i].subs
  x.video_views=arr[i].views

Channel.create(x)
          .then(data => res.json(data))
          .catch(err=>err)
   
  }}
  catch(err){
    console.log('this is the err '+err);
  }
})();
}
