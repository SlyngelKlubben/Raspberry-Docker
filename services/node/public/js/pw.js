loadDoc();


function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      }
    };
    xhttp.open("GET", "/data/pw/reload", true);
    xhttp.send();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var arr = JSON.parse(this.responseText);
        pw(arr)
      }
    };
    xhttp.open("GET", "/data/data_PW.json", true);
    xhttp.send();
}
function pw(arr) {
  console.table(arr)
  document.getElementById("power").innerHTML = arr[0]['power'];
  document.getElementById("water").innerHTML = arr[0]['water'];
}