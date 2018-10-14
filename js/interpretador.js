var temp = setInterval(function(){ }, 2000);

// Fazemos que o código só funcione apos o carregamento completo da pagina
window.addEventListener('DOMContentLoaded', function(){
    
    // Instanciamos o nosso botão
    var btn_gravacao = document.querySelector('#btn_gravar_audio');
    
    // Crio a variavel que amarzenara a transcrição do audio
    var transcricao_audio =  '';
  
    // Seto o valor false para a variavel esta_gravando para fazermos a validação se iniciou a gravação
    var esta_gravando = false;
  
    // Verificamos se o navegador tem suporte ao Speech API
    if(window.SpeechRecognition || window.webkitSpeechRecognition){
         
        // Como não sabemos qual biblioteca usada pelo navegador 
        // Atribuimos a api retornada pelo navegador
        var speech_api = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        // Criamos um novo objeto com a API Speech
        var recebe_audio = new speech_api();
        
        // Defino se a gravação sera continua ou não
        // Caso deixamos ela definida como false a gravação tera um tempo estimado de 4 a 5 segundos
        recebe_audio.continuous = true;
        
        // Especifico se o resultado final pode ser alterado ou não pela compreenção da api
        recebe_audio.interimResults = true;
        
        // Especifico o idioma utilizado pelo usuario
        recebe_audio.lang = "pt-BR";
         
        // Uso o metodo onstart para setar a minha variavel esta_gravando como true
        // e modificar o texto do botão
        recebe_audio.onstart = function(){
            esta_gravando = true;
        };
        
        // Uso o metodo onend para setar a minha variavel esta_gravando como false
        // e modificar o texto do botão
        recebe_audio.onend = function(){
            esta_gravando = false;
        };
        
        // Com o metodo onresult posso capturar a transcrição do resultado 
        recebe_audio.onresult = function(event){
            // Defino a minha variavel interim_transcript como vazia
            var interim_transcript = '';
            
            // Utilizo o for para contatenar os resultados da transcrição 
            for(var i = event.resultIndex; i < event.results.length; i++){
                // verifico se o parametro isFinal esta setado como true com isso identico se é o final captura
                if(event.results[i].isFinal){
                    // Contateno o resultado final da transcrição
                    transcricao_audio = event.results[i][0].transcript;
                }else{
                    // caso ainda não seja o resultado final vou contatenado os resultados obtidos
                    interim_transcript = event.results[i][0].transcript;
                }
                // Verifico qual das variaveis não esta vazia e atribuo ela no variavel resultado
                var resultado = transcricao_audio || interim_transcript;
            }
            // Escrevo o resultado no campo da textarea
            ulttxt(resultado);    
        };
        
        // Capturamos a ação do click no botão e iniciamos a gravação ou a paramos
        // dependendo da variavel de controle esta_gravando
        //btn_gravacao.addEventListener('click', function(e){
        //    // Verifico se esta gravando ou não
        //    if(esta_gravando){
        //        // Se estiver gravando mando parar a gravação
        //        recebe_audio.stop();
        //        // Dou um retun para sair da função
        //        return;
        //    }
        //    // Caso não esteja capturando o audio inicio a transcrição
        //    recebe_audio.start();
        //}, false);
        
        if(esta_gravando){
                
        } else {
            recebe_audio.start();
        }
        setInterval(function(){
            if(esta_gravando == false){
                recebe_audio.start();
            }
        }, 3000);
        
    } else {
        console.error("Navegador não tem suporte ao Speech API!")
    };
}, false);


function ulttxt(txt) {
    
    clearInterval(temp);
    iniciandoLoad();
    
    temp = setInterval(function(){
        compreender(txt);
        clearInterval(temp);
        parandoLoad();
    }, 2000);
    
}

function compreender(txt) {
    //console.log(txt);
    var texto = txt;
    var array = texto.split(" ");
        
    var compreensao = false;
    
    //So executará ação se falarem ANDROID
    if (array.indexOf("android") > -1 || array.indexOf("Android") > -1) {
        
        //Comandos de LUZ
        if (array.indexOf("luz") > -1 || array.indexOf("Luz") > -1) {
            if (array.indexOf("apagar") > -1  || array.indexOf("Apagar") > -1 ||
                array.indexOf("desligar") > -1  || array.indexOf("Desligar") > -1) {
                cmd_DesligarLuz();
                compreensao = true;
                ouvindo = false;
                return true;
            }
            if (array.indexOf("ligar") > -1  || array.indexOf("Ligar") > -1 ||
                array.indexOf("acender") > -1  || array.indexOf("Acender") > -1) {
                cmd_LigarLuz();
                compreensao = true;
                return true;
            }

            if(compreensao == false){
                escrever("O que faço com a luz?");
                compreensao = true;
                return true;
            }
        }
        
        //Comandos de MUSICA
        if (array.indexOf("música") > -1  || array.indexOf("Música") > -1) {
            if (array.indexOf("ouvir") > -1 || array.indexOf("Ouvir") > -1 ||
            array.indexOf("ligar") > -1 || array.indexOf("Ligar") > -1 ) {
                escrever("Ok, ligando a música...");
                falar("Ok, ligando a música...");
                setTimeout(function(){ cmd_LigarMusica(); }, 3000);
                compreensao = true;
                return true;
            }
            if (array.indexOf("parar") > -1 || array.indexOf("Parar") > -1 ||
            array.indexOf("desligar") > -1 || array.indexOf("Desligar") > -1 ) {
                escrever("Ok, desligando a música...");
                falar("Ok, desligando a música...");
                setTimeout(function(){ cmd_DesLigarMusica(); }, 3000);
                compreensao = true;
                return true;
            }
        }
        
        

        //Comandos de LUZes
        if (array.indexOf("luzes") > -1 || array.indexOf("Luzes") > -1 ) {
            if (array.indexOf("apagar") > -1  || array.indexOf("Apagar") > -1 ||
                array.indexOf("desligar") > -1  || array.indexOf("Desligar") > -1) {
                cmd_DesligarLuzes();
                compreensao = true;
                return true;
            }
            if (array.indexOf("ligar") > -1  || array.indexOf("Ligar") > -1 ||
                array.indexOf("acender") > -1  || array.indexOf("Acender") > -1) {
                cmd_LigarLuzes();
                compreensao = true;
                return true;
            }

            if(compreensao == false){
                escrever("O que faço com as luzes?");
                compreensao = true;
                return true;
            }
        }

        //Comandos de Relatorio
        if (array.indexOf("relatório") > -1 || array.indexOf("Relatório") > -1 ) {
            if (array.indexOf("geral") > -1  || array.indexOf("Geral") > -1) {
                cmd_RelatorioGeral();
                compreensao = true;
                return true;
            }
            
            if(compreensao == false){
                escrever("Qual relatório deseja?");
                compreensao = true;
                return true;
            }
        }
        
        //Comandos de atualização
        if (array.indexOf("atualizar") > -1 || array.indexOf("Atualizar") > -1 ||
            array.indexOf("resetar") > -1 || array.indexOf("Resetar") > -1 ||
            array.indexOf("reiniciar") > -1 || array.indexOf("Reiniciar") > -1 ) {
            if (array.indexOf("sistema") > -1  || array.indexOf("Sistema") > -1) {
                cmd_Atualizar();
                compreensao = true;
                return true;
            }
            if (array.indexOf("variáveis") > -1  || array.indexOf("Variáveis") > -1 ||
                array.indexOf("componentes") > -1  || array.indexOf("Componentes") > -1) {
                recuperarVlr();
                escrever("Variáveis e componentes atualizados...");
                falar("Variáveis e componentes atualizados...");
                compreensao = true;
                return true;
            }
        }
        
        //Comandos de pesquisa
        if (array.indexOf("pesquisar") > -1 || array.indexOf("Pesquisar") > -1 ) {
            cmd_Pesquisar(array);
            compreensao = true;
            return true;
        }
       
        //Comandos de Data e hora
        if (array.indexOf("data") > -1 || array.indexOf("Data") > -1 ) {
            if (array.indexOf("hoje") > -1  || array.indexOf("Hoje") > -1) {
                cmd_Data();
                compreensao = true;
                return true;
            }
        }
        if (array.indexOf("hora") > -1 || array.indexOf("Hora") > -1 || array.indexOf("horas") > -1 || array.indexOf("Horas") > -1 ) {
            if (array.indexOf("hoje") > -1  || array.indexOf("Hoje") > -1) {
                cmd_Hora();
                compreensao = true;
                return true;
            }
            if (array.indexOf("agora") > -1  || array.indexOf("Agora") > -1) {
                cmd_Hora();
                compreensao = true;
                return true;
            }
            if (array.indexOf("são") > -1  || array.indexOf("São") > -1) {
                cmd_Hora();
                compreensao = true;
                return true;
            }
            if (array.indexOf("é") > -1  || array.indexOf("É") > -1) {
                cmd_Hora();
                compreensao = true;
                return true;
            }
        }
        
        //Comandos de Zoeira
        if (array.indexOf("baby") > -1 || array.indexOf("Baby") > -1 ) {
            if (array.indexOf("alô") > -1  || array.indexOf("Alô") > -1) {
                escrever("Oi, nego :3");
                falar("Oi, nêgo");
                compreensao = true;
                return true;
            }
        }
        
        //Comandos palavrão
        if (array.indexOf("c*") > -1 || array.indexOf("p****") > -1 ||
            array.indexOf("p******") > -1 || array.indexOf("b******") > -1) {
            escrever("Não fui desenvolvida para entender palavrões.");
            falar("Não fui desenvolvida para entender palavrões.");
            compreensao = true;
            return true;
        }

        //Comando não entendido
        if(compreensao == false){
            escrever("Não entendi. Você me deu algum comando?");
            falar("Não entendi. Você me deu algum comando?");
            compreensao = true;
            return true;
        }
    }
}