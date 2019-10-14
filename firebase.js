let firebase = require('firebase');

let config = {
    apiKey: "AIzaSyCkP_ANgC8UAUFTsxrWH-_pfOOwR4XLGOk",
    authDomain: "testdb-bf7b5.firebaseapp.com",
    projectId: "testdb-bf7b5",
    databaseURL: "https://testdb-bf7b5.firebaseio.com",
};

if (!firebase.apps.length) {    
        firebase.initializeApp(config);    
}

let db = firebase.database();
if (db.ref().repo.repoInfo_.namespace == "testdb-bf7b5"){
    console.log('Firebase initialized')
}

module.exports = db;