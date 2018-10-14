var tempoload;
var iniciado = false;
function iniciandoLoad() {
    if(iniciado == false) {
        iniciado = true;
        
        document.querySelector('link[rel="icon"]').setAttribute('type', 'image/gif');
        document.querySelector('link[rel="icon"]').setAttribute('href', 'img/loader.gif');
        
        document.getElementById("load").style.opacity = "1.0";
	
	var n = 0;
	var txt;
	
	tempoload = setInterval(function(){
		n = n + 36;
		if(n >= 360) {
			n = 0;
		}
		
		txt = "rotate(" + n + "deg)";
		
		document.getElementById("load").style.transform = txt;
		
        }, 100);
    }
}

function parandoLoad() {
    if(iniciado == true) {
        iniciado = false;
        
        document.querySelector('link[rel="icon"]').setAttribute('type', 'image/ico');
        document.querySelector('link[rel="icon"]').setAttribute('href', 'img/favicon.ico');
        
	document.getElementById("load").style.opacity = "0.0";
	clearInterval(tempoload);
	document.getElementById("load").style.transform = "rotate(0deg)";
    }
}

