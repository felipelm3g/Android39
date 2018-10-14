// Initialize Firebase
var config = {
    apiKey: "AIzaSyAbLa_lx76k8DgH4mY-O75ZRoVtLclkRas",
    authDomain: "project-arduino-b8baa.firebaseapp.com",
    databaseURL: "https://project-arduino-b8baa.firebaseio.com",
    projectId: "project-arduino-b8baa",
    storageBucket: "project-arduino-b8baa.appspot.com",
    messagingSenderId: "757811618975"
};
firebase.initializeApp(config);

var database = firebase.firestore();

//
//database.collection("componentes").get().then((querySnapshot) => {
//    querySnapshot.forEach((doc) => {
//        console.log(doc.data());
//    });
//});
//

// Funções criada por mim

//Array FIREBASE
var databaseArray = {
    luz: false,
    alarmando: false,
};

function atualizarDados(){
    database.collection("componentes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //Atualizar dados JS
            var arraytest = doc.data();

            databaseArray["luz"] = arraytest["luz"];
            databaseArray["alarmando"] = arraytest["alarmando"];       
            
        });
    });

}

function alterarDados(luz,alarmando){
    
    var luzzz = databaseArray["luz"];
    var alarmmm = databaseArray["alarmando"];
    
    //Verifica se a função foi chamada sem dados para luz
    if(luz != databaseArray["luz"]){
        luzzz = luz;
    }
    
    //Verifica se a função foi chamada sem dados para luz
    if(alarmando != databaseArray["alarmando"]){
        alarmmm = alarmando;
    }
    
    //Se estiver desligada
    var docData = {
        luz: luzzz,
        alarmando: alarmmm,
    };
    database.collection("componentes").doc("LyGFMARoOlOUjKwFiiXp").set(docData).then(function() {
        setTimeout(function(){ 
            console.group("FireBase - Atualizado");
            console.info(databaseArray);
            console.groupEnd("FireBase - Atualizado"); 
        }, 1000);
        
    });
}
