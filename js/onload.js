function onload() {
    data = new Date();
    
    //Pegar informaçoes dos componetes
    if(recuperarVlr() == false){
        console.error("Erro ao tentar recuperar as informaçoes dos componetes.");
        setTimeout(function(){ location.reload(); }, 1000);
    }
   
    //Funções por segundo
    setInterval(function(){ 
        porsegundo();
    }, 1000);
    
    //Mudar Cor de Fundo
    cmd_MudarCor();
    setInterval(function(){ 
        cmd_MudarCor();
    }, 5000);
}

