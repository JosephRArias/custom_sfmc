define(["postmonger"], function (Postmonger) {
    "use strict";
  
    var connection = new Postmonger.Session();
    var payload = {};
  
    $(window).ready(onRender);
  
    connection.on('initActivity', function(data){
        document.getElementById('configuration').value = JSON.stringify(data, null, 2);
        retrieveToken();
    });
  

    function onRender(){
        connection.trigger('ready');
    }
    
    function retrieveToken () {
        axios.post(tokenURL, { // Retrieving of token
    
            username: 'emilys',
            password: 'emilyspass'
    
        })
        .then(function (response) {
            console.log('Auth');
            console.log(response);
            return response.data['access_token'];
        }).catch(function (error) {
            return error;
        });
    }
  });

/*let postmonger = require('postmonger');
let axios = require('axios');

var connection = new postmonger.Session();

document.addEventListener('DOMContentLoaded', function(){
    connection.trigger('ready');
})

connection.on('initActivity', function(data){
    document.getElementById('configuration').value = JSON.stringify(data, null, 2);
    retrieveToken();
});
function retrieveToken () {
    axios.post(tokenURL, { // Retrieving of token

        username: 'emilys',
        password: 'emilyspass'

    })
    .then(function (response) {
        console.log('Auth');
        console.log(response);
        return response.data['access_token'];
    }).catch(function (error) {
        return error;
    });
}

function onRender(){
    connection.trigger('ready');
}*/