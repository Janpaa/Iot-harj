var os = require('os-utils');
var request = require('request')

var cpuUsage;
var freeMem;
var sysTime;

//Läheettää POST requestin kerran sekunnissa, bodyssä cpuUsage, freeMem, sysTime
var requestLoop = setInterval(function(){
    os.cpuUsage(function(v){
        cpuUsage=Math.round(v*100);
    });
    freeMem = 100- Math.round(os.freememPercentage()*100);
    sysTime = secondsToDhms(os.sysUptime());

    var options = { 
    method: 'POST',
    url: 'http://localhost:4001/data/',
    headers: 
        { 'Postman-Token': '36598e2e-b538-4e6c-969b-caa3799dc7d9',
        'cache-control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded' },
     form: 
        { cpuUsage: cpuUsage,
        freeMem: freeMem,
        sysTime: sysTime} };

request(options, function (error, response, body) {
  if (error) console.log(error);

  console.log(body);
});
  }, 1000);

// Muuttaa sekunnit dd-hh-mm-ss formaattiin
function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
    }