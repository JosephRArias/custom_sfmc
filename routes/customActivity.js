let postmonger = require('postmonger');
let axios = require('axios');

var connection = new postmonger.Session();

//window.ready(onRender);
connection.trigger('ready');
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
}