//Variaveis de alarme
var alarmesArray = [];



//Função para recuperar o estado atual do componetes
function recuperarVlr() {
    //Função para recuperar os alarmes
    $.ajax({
        url: "php/alarmes.php",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            //Pega o array vindo do json
            alarmesArray = data;
            console.group("Alarmes");
            //Verificando se tem alarmes
            for (i = 0; i < alarmesArray.length; i++) {
                var n = i + 1;
                var h = alarmesArray[i]["hora"];
                var m = alarmesArray[i]["minuto"];
                if (n < 10) {
                    n = "0" + n;
                }
                if (h < 10) {
                    h = "0" + h;
                }
                if (m < 10) {
                    m = "0" + m;
                }
                console.info("Alarme " + n + " - " + h + ":" + m);
            }
            console.groupEnd("Alarmes");
        },
        error: function () {
            console.log("Erro AJAX - Alarmes");
            return false;
        }
    });

    return true;
}

//Comando para reinciar o sistema
function cmd_Atualizar() {
    escrever("Atualizando sistema em 5 segundos...");
    falar("Atualizando sistema em 5 segundos...");
    setTimeout(function () {
        location.reload();
    }, 5000);
    return true;
}

//Gerar Uma cor
function cmd_MudarCor() {
    if (databaseArray["alarmando"] == true) {
        document.getElementById("logo").style.backgroundColor = "#FF0000";
        document.getElementById("txtnovo").style.color = "#FF0000";
        return true;
    } else {
        var hexadecimais = '0123456789ABCDEF';
        var cor = '#';

        // Pega um número aleatório no array acima
        for (var i = 0; i < 6; i++) {
            //E concatena à variável cor
            cor += hexadecimais[Math.floor(Math.random() * 16)];
        }

        document.getElementById("logo").style.backgroundColor = cor;
        document.getElementById("txtnovo").style.color = cor;
    }

}

function cmd_Ola() {

    var vlr = Math.floor(Math.random() * 5);

    switch (vlr) {
        case 0:
            escrever("Oi, tudo bem?");
            falar("Oi, tudo bem?");
            break;

        case 1:
            escrever("Olá");
            falar("Olá");
            break;

        case 2:
            escrever("Estou ouvindo");
            falar("Estou ouvindo");
            break;

        case 3:
            escrever("Em que posso ajudar?");
            falar("Em que posso ajudar?");
            break;

        case 4:
            escrever("Precisa de algo?");
            falar("Precisa de algo?");
            break;
    }

}

//Controles de Musica
function cmd_LigarMusica() {
    document.getElementById('webvideo').style.opacity = "1.0";
    document.getElementById('webvideo').src = "https://www.youtube.com/embed/fw3UYy02lSI?autoplay=1";
}

function cmd_DesLigarMusica() {
    document.getElementById('webvideo').style.opacity = "0.0";
    setTimeout(function () {
        document.getElementById('webvideo').src = "";
    }, 1000);
}

function cmd_RelatorioGeral() {
    escrever("Tudo dentro do esperado...");
    falar("Tudo dentro do esperado...");
    return true;
}

//Controles de LUZ
function cmd_LigarLuz() {
    if (databaseArray["luz"] == true) {
        //Se estiver ligada
        escrever("Luz já está ligada...");
        falar("Luz já está ligada...");
        return false;
    } else {
        //Se estiver desligada
        alterarDados(true, "");
        escrever("Ok, ligando a luz...");
        falar("Ok, ligando a luz...");

        return true;
    }
}
function cmd_DesligarLuz() {
    if (databaseArray["luz"] == true) {
        //Se estiver ligada
        alterarDados(false, "");
        escrever("Ok, apagando a luz...");
        falar("Ok, apagando a luz...");

        return true;
    } else {
        //Se estiver desligada
        escrever("Luz já está apagada...");
        falar("Luz já está apagada...");
        return false;
    }
}
function cmd_LigarLuzes() {
    escrever("Ok, ligando as luzes...");
    falar("Ok, ligando as luzes...");
    return true;
}
function cmd_DesligarLuzes() {
    escrever("Ok, apagando as luzes...");
    falar("Ok, apagando as luzes...");
    return true;
}

//Comandos de Alarme
function cmd_Alarmar() {

    //window.open("https://youtu.be/yFeh1dN9K1s", "_blank");
    if (databaseArray["alarmando"] == false) {
        //Atualizar banco
        alterarDados("", true);
    }

    //Janela de POP UP
    document.getElementById("interact-box").style.display = "block";
    document.getElementById("mp3").volume = 1.0;
    document.getElementById("mp3").play();

    cmd_MudarCor();

    return true;
}

function cmd_PararAlarme() {
    if (databaseArray["alarmando"] == true) {
        clearInterval(temp);
        alterarDados("", false);
        document.getElementById("interact-box").style.display = "none";
        document.getElementById("mp3").pause();
    } else {
        document.getElementById("interact-box").style.display = "none";
        document.getElementById("mp3").pause();
    }
    return true;
}

//Pesquisar no google
function cmd_Pesquisar(array) {
    var txt = "";
    var url = "https://www.google.com.br/search?q=";

    var cntAndrd = 0;

    for (i = 0; i < array.length; i++) {
        if (array[i] == "Android") {
            if (cntAndrd >= 1) {
                if (array[i] != "" && array[i] != " " && array[i] != "pesquisar" && array[i] != "Pesquisar") {
                    url += array[i] + "%20";
                    txt += array[i] + " ";
                }
            } else {
                cntAndrd = cntAndrd + 1;
            }

        } else {
            if (array[i] != "" && array[i] != " " && array[i] != "pesquisar" && array[i] != "Pesquisar") {
                url += array[i] + "%20";
                txt += array[i] + " ";
            }
        }

    }

    escrever("Pesquisando : " + txt);
    falar("Pesquisando " + txt);

    setTimeout(function () {
        window.open(url, "_blank");
    }, 1000);

    return true;
}

//Comandos de Data e Hora
function cmd_Data() {
    now = new Date();

    var sem = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado"
    ];

    var mes = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outobro",
        "Novembro",
        "Dezembro"
    ];

    var dian = now.getDate();
    if (dian < 9) {
        dian = "0" + dian;
    }

    var mesn = now.getMonth() + 1;
    if (mesn < 9) {
        mesn = "0" + mesn;
    }

    escrever("Data - " + dian + "/" + mesn + "/" + now.getFullYear());
    falar("Hoje é " + sem[now.getDay()] + ", dia " + now.getDate() + " do mês de " + mes[now.getMonth()] + " no ano de " + now.getFullYear());
    return true;
}
function cmd_Hora() {
    now = new Date();
    var min = now.getMinutes();
    if (min < 9) {
        min = "0" + min;
    }
    escrever("Hora - " + now.getHours() + ":" + min);
    falar("São " + now.getHours() + " horas e " + now.getMinutes() + " minutos.");
    return true;
}