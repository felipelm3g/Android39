<!DOCTYPE html>
<?php
$titlesite = "Android 39";
$descricaosite = "Android 39 a controladora residencial.";
$keywordssite = "bot,felipe,lopes,felipelm3g,iot";
$authorsite = "FelipeLm3g";
$robotssite = "noindex,nofollow";

$sitename = "FelipeLopes";
$dominiosite = "www.felipelopes.eti.br";
$imgsite = "https://i.imgur.com/QIl3Riw.jpg";
$imgtype = "image/jpeg";
$imgwidth = "800";
$imgheight = "600";

$locale = "pt_BR";
$localealternate = "pt_BR";

/* TWITTER */
/* FACEBOOK */
$page_id = "100013484824797";
?>
<html lang="pt-br">
    <head>
        <title>
            <?php echo $titlesite; ?>
        </title>
        <meta charset="utf-8">
        <meta http-equiv="Content-Language" content="pt-br">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- SEO -->
        <meta name="description" content="<?php echo $descricaosite; ?>">
        <meta name="keywords" content="">
        <meta name="author" content="<?php echo $authorsite; ?> ">
        <meta name="robots" content="<?php echo $robotssite; ?> ">

        <meta property="og:type" content="website">
        <meta property="og:site_name" content="<?php echo $sitename; ?>">
        <meta property="og:title" content="<?php echo $titlesite; ?>">
        <meta property="og:description" content="<?php echo $descricaosite; ?>">
        <meta property="og:url" content="<?php echo $dominiosite; ?>">
        <meta property="og:image" content="<?php echo $imgdosite; ?>">
        <meta property="og:image:type" content="<?php echo $imgtype; ?>">
        <meta property="og:image:width" content="<?php echo $imgwidth; ?>">
        <meta property="og:image:height" content="<?php echo $imgheigth; ?>">

        <meta property="og:locale" content="<?php echo $locale; ?>">
        <meta property="og:locale:alternate" content="<?php echo $localealternate; ?>">

        <meta property="fb:page_id" content="<?php echo $imgdosite; ?>">
        
        <!-- Required meta tags -->
        <meta charset="utf-8">
        
        
        <link rel="icon" type="image/ico" href="img/favicon.ico" />

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
        <link href="css/bootstrap.min.css" type="text/css" rel="stylesheet" />
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/background.css">
        <link rel="stylesheet" href="css/logo.css">
        <link rel="stylesheet" href="css/texto.css">
        <link rel="stylesheet" href="css/interact.css">
        <link rel="stylesheet" href="css/iframes.css">
        
        <!-- Scripts FIREBASE -->
        <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase-auth.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase-database.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase-firestore.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase-messaging.js"></script>
        <script type="text/javascript" src="js/firebase.js"></script>
        
<!-- Scripts JS -->
        <script src="https://code.responsivevoice.org/responsivevoice.js"></script>
        <script type="text/javascript" src="js/textoevoz.js"></script>
        <script type="text/javascript" src="js/load.js"></script>
        <script type="text/javascript" src="js/interpretador.js"></script>
        <script type="text/javascript" src="js/comandos.js"></script>
        <script type="text/javascript" src="js/porsegundo.js"></script>
        <script type="text/javascript" src="js/onload.js"></script>
        
        <script type="text/javascript" src="js/teste.js"></script>
        
    </head>
    
    <body onload="onload();">
        <div class="texto" id="texto">
            <p id="txtvelho"></p>
            <p id="txtnovo"></p>
        </div>
        
        <iframe id="webvideo" class="webvideo" name="webvideo"></iframe>
        
        <audio id="mp3" title="AudioIA" webkit-playsinline="true" playsinline="true">
            <source src="audio/alarm.mp3" type="audio/mp3">
        </audio>
        
        <a id="btn_gravar_audio" name="btn_gravar_audio"><img class="logo" id="logo" src="img/ia2.png" width="500" height="500"></a>
        <img class="load" id="load" src="img/load.png" width="50" height="50">
        
        <div id="interact-box" class="interact-box">
            <p id="interact-txt">[ ! ]&nbsp; ATENÇÃO &nbsp;[ ! ]</p>
            <button  id="interact-btn" onclick="cmd_PararAlarme();">Parar</button>
        </div>

        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    </body>
</html>
