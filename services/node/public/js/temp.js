loadDoc();


function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      }
    };
    xhttp.open("GET", "/data/temp/reload", true);
    xhttp.send();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var arr = JSON.parse(this.responseText);
        temp(arr)
        time(arr)
      }
    };
    xhttp.open("GET", "/data/data_temp.json", true);
    xhttp.send();
}
function time(arr) {
  var time = []
  var maxTime
  arr.forEach((arr, index) => {
    time[index] = arr["timestamp"];
  });
  time.forEach((arr, index) => {
    if(time[index] > time[index-1] && !index == 0){
      maxTime = time[index];
    };
  });
  var date = new Date(maxTime).toLocaleString()
  document.getElementById("time").innerHTML = date;
}
function temp(arr){
  color = ["#0501fa","#0a02f5","#0f03f0","#1404eb","#1905e6","#1e06e1","#2307dc","#2808d7","#2d09d2","#320acd","#370bc8","#3c0cc3","#410dbe","#460eb9","#4b0fb4","#5010af","#5511aa","#5a12a5","#5f13a0","#64149b","#691596","#6e1691","#73178c","#781887","#7d1982","#821a7d","#871b78","#8c1c73","#911d6e","#961e69","#9b1f64","#a0205f","#a5215a","#aa2255","#af2350","#b4244b","#b92546","#be2641","#c3273c","#c82837","#cd2932","#d22a2d","#d72b28","#dc2c23","#e12d1e","#e62e19","#eb2f14","#f0300f","#f5310a","#fa3205"]
  color.length
  var out = '';
  for (let index = 0; index < arr.length; index++) {
    var date = new Date(arr[index]["timestamp"]).toLocaleString()
    out = out+'<div class="boxT"style="background-color:'+color[Math.round(arr[index]["temp"])+10]+';"><div class="TNM"><div class="test"><p>'+date+'</p></div><h2 class="center" id="white">'+JSON.stringify(arr[index]["name"]).replace(/"/g,'')+'</h2><div class="test" id="right"><p>'+JSON.stringify(arr[index]["mac"]).replace(/"/g,'')+'</p></div></div><div class="TNM"><div class="test" id="white"><p>'+JSON.stringify(arr[index]["humidity"]).replace(/"/g,'')+'</p><p>% RH</p></div><div class="center" id="white"><span>'+JSON.stringify(arr[index]["temp"]).replace(/"/g,'')+'</span><h1>°C</h1></div><div class="test" id="right"></div></div></div>'
    //out = out+'<div class="boxT" style="background-color:'+color[Math.round(arr[index]["temp"])+10]+';"><div class="TNM"><div class="test"><p>'+date+'</p></div><h2 id="white">'+JSON.stringify(arr[index]["name"]).replace(/"/g,'')+'</h2><div class="test" id="right"><p>'+JSON.stringify(arr[index]["mac"]).replace(/"/g,'')+'</p></div></div><div id="white"><span>'+JSON.stringify(arr[index]["temp"]).replace(/"/g,'')+'</span><h1>°C</h1></div></div>';
  }
  /*
  var out = '';
  for(var i = 0; i < arr.length; i++){
    if(arr[i]["temp"] >= 20){
      out = out+'<div class="boxT hot">';
    }else if(arr[i]["temp"] < 20){
      out = out+'<div class="boxT cold">';
    }
    out = out+'<div class="TNM"><div class="test"><p>'+JSON.stringify(arr[i]["timestamp"]).replace(/"/g,'').replace(/T/g,' ').replace(/Z/g,'').slice(0, -4)+'</p></div><h2>'+JSON.stringify(arr[i]["name"]).replace(/"/g,'')+'</h2><div class="test" id="right"><p>'+JSON.stringify(arr[i]["mac"]).replace(/"/g,'')+'</p></div></div><div><span>'+JSON.stringify(arr[i]["temp"]).replace(/"/g,'')+'</span><h1>°C</h1></div></div>';
  }
  */
  document.getElementById("boxA").innerHTML = out;
}