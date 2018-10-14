var tempTitulo = true;
var tempLimparTxt;

function escrever(texto){
    var txt = document.getElementById('texto').innerHTML;
    txt = txt.replace("txtnovo", "txtvelho");
    document.getElementById('texto').innerHTML = txt;
    
    document.getElementById('texto').innerHTML += "<p id='txtnovo'><span class='glyphicon glyphicon-comment' aria-hidden='true'></span> &nbsp;" + texto + "</p>";
    console.log(texto);
    
    document.getElementById('texto').scrollTop = document.getElementById('texto').scrollHeight;
    /*setTimeout(function(){ document.getElementById('texto').innerHTML = ""; }, 3000);*/
    mudarTitulo(texto);
}

function falar(texto){
    clearTimeout(tempLimparTxt);
    responsiveVoice.speak(texto, "Brazilian Portuguese Female");
    tempLimparTxt = setTimeout(function(){ 
            cmd_limparChat();
            clearTimeout(tempLimparTxt);
        }, 30000);
}

function mudarTitulo(txt) {
    
    document.title = txt;
    
    if(tempTitulo){
        tempTitulo = setTimeout(function(){ 
            document.title = "Android 39";
            tempTitulo = true;
        }, 5000);
    } else {
        clearTimeout(tempTitulo);
        tempTitulo = true;
        tempTitulo = setTimeout(function(){ 
            document.title = "Android 39";
            tempTitulo = true;
        }, 5000);
    }
    
}

//Comando limpar chat
function cmd_limparChat() {
    //if(document.getElementById("txtvelho") != null){
    //    document.getElementById("txtvelho").parentNode.removeChild( document.getElementById("txtvelho") );
    //    cmd_limparChat();
    //}
    //if(document.getElementById("txtnovo") != null){
    //    document.getElementById("txtnovo").parentNode.removeChild( document.getElementById("txtnovo") );
    //    cmd_limparChat();
    //}
    document.getElementById('texto').innerHTML = "";
}
