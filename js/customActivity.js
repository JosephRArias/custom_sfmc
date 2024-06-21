/*const Postmonger = require('postmonger');

const connection = new Postmonger.Session();

document.addEventListener('DOMContentLoaded', () => {
    connection.on('initActivity', onInitActivity);
    connection.on(
        'requestedTriggerEventDefinition',
        function (eventDefinitionModel) {
          var eventKey = eventDefinitionModel['eventDefinitionKey'];
          save(eventKey);
        }
      );
    connection.trigger('ready');
    connection.trigger('requestedTriggerEventDefinition');

})



  
  function save(eventKey) {
    // subscriberKey fetched directly from Contact model
    // columnName is populated from the Journey Data model
    console.log('EventKey: ' + eventKey)
    var params = {
      subscriberKey: '{{Contact.key}}',
      columnName: '{{Event.' + eventKey + '.columnName}}',
    };
    payload['arguments'].execute.inArguments = [params];
  }
*/
