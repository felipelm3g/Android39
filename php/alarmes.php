<?php

    $alarmes = [];
    
    $array = ["hora" => 5, "minuto" => 50];
    $alarmes[] = $array;
    
    $array = ["hora" => 23, "minuto" => 00];
    $alarmes[] = $array;
    
    $json = json_encode($alarmes, JSON_UNESCAPED_UNICODE);
        
    echo($json);
?>
