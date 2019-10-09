// const http = require("http");
 
// http.createServer(function(request, response){
     
//     response.setHeader("UserId", 12);
//     response.setHeader("Content-Type", "text/html; charset=utf-8;");
//     response.write("<h2>Привет, Андрей!</h2>");
//     response.write("<img src=" + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6yDwN9MsSX7_ZJvb4sopKU_QfZRzvsd9-dGgaGZZcNKkV6R48Jg" +"></img>");
//     response.end();
// }).listen(process.env.PORT || 3000);


/*eslint no-console: ["error", { allow: ["warn", "error"] }] */


let axios = require('axios');
let firebase = require('firebase');

let config = {
    apiKey: "AIzaSyCkP_ANgC8UAUFTsxrWH-_pfOOwR4XLGOk",
    authDomain: "testdb-bf7b5.firebaseapp.com",
    projectId: "testdb-bf7b5",
    databaseURL: "https://testdb-bf7b5.firebaseio.com",
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
    console.warn("firebase");
}
this.database = firebase.database();

// function writeUserData(name, email, imageUrl) {
//     firebase.database().ref('users/').push({
//       username: name,
//       email: email,
//       profile_picture : imageUrl
//     });
//   }

function writeUserData(obj) {
         firebase.database().ref('users/').push(obj);
       }


    //    function delUserData() {
    //     firebase.database().ref('users/').set({});
    //   }

function getJson(){
    axios
        .get(
            `https://opensky-network.org/api/states/all?lamin=55.900&lomin=36.440&lamax=56.020&lomax=37.550`
        )
        .then(response => {
            writeUserData(response.data);
            //writeUserData('a', '1', 'zzzzzzz');
            //console.warn(response.data);                             
        })
        .catch(e => {
          console.warn(e);
        });
  }

  setInterval(() => getJson(), 2100);

//   getJson()

//   delUserData();