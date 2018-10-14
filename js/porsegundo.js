var cont = true;

//Função sendo executada a cada segundo
function porsegundo(){
    data = new Date();
    
    //Toda 2:55 da manha, reiniciar o sistema
    if(data.getHours() == 2 && data.getMinutes() == 55 && data.getSeconds() == 0){
        location.reload();
    }
        
    //Aviso hora de almoçar
    if(data.getHours() == 11 && data.getMinutes() == 50 && data.getSeconds() == 0){
        escrever("Está na hora de almoçar!");
        falar("Está na hora de almoçar!");
    }
    
    //Aviso hora de dormir
    if(data.getHours() == 23 && data.getMinutes() == 00 && data.getSeconds() == 0){
        escrever("Está na hora de dormir!");
        falar("Está na hora de dormir!");
    }
    
    //Verificando se tem alarmes
    for (i = 0; i < alarmesArray.length; i++) {
        if(data.getHours() == alarmesArray[i]["hora"] && data.getMinutes() == alarmesArray[i]["minuto"] && data.getSeconds() == 0){
            escrever("Acionando alarme em 5 segundos.");
            falar("Acionando alarme em 5 segundos.");
            setTimeout(function(){ cmd_Alarmar(); }, 5000);
        }	
    }
    
    //Atualizar DADOS
    atualizarDados();
    
    //Verifica se ta alarmando
    //Variavel criada no arquivo COMANDOS.js
    if(databaseArray["alarmando"] == true){
        cmd_Alarmar();
        //Alterar cor de aviso
        if(cont){
            cont = false;
            document.getElementById("interact-box").style.backgroundColor = "#FF0000";
            document.getElementById("interact-box").style.border="solid 1px #FF0000";
            document.getElementById("interact-txt").style.color = "#000";
            document.getElementById("interact-btn").style.backgroundColor = "#000";
            document.getElementById("interact-btn").style.color = "#FF0000";
        } else {
            cont = true;
            document.getElementById("interact-box").style.backgroundColor = "#000";
            document.getElementById("interact-box").style.border="solid 1px #FF0000";
            document.getElementById("interact-txt").style.color = "#FF0000";
            document.getElementById("interact-btn").style.backgroundColor = "#FF0000";
            document.getElementById("interact-btn").style.color = "#000";
        }
    } else {
        cmd_PararAlarme();
    }
    
    return true;
}


