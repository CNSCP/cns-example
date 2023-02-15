//
//

//

const cns = require('cns-sdk');
const padi = require('cns-padi');

//

const Application = cns.Application;
const Resource = cns.Resource;
const Transport = padi.Transport;

//

const broker = 'ws://localhost:1881';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJwYWRpLWFwcCIsImlzcyI6Ikk0V0FzNGEzaGtKZktzYmUxWDVYIiwic3ViIjoiM2NRUm5xOGJXbFRqaXNRTDhLYXEiLCJpYXQiOjE2NzU5NTM2NTV9.ynoSd1I-0PRqoX14mGYdsrUS5mr6r2qkroug6S95cvA';

const identifier = {
  id: '3cQRnq8bWlTjisQL8Kaq'
};

//
const resource = new Resource({
  identifier: identifier
})
.on('change', () => {
  console.log('change');
  for (var property of resource.properties)
    console.log('  ' + property.name + ' = ' + JSON.stringify(property.value));
  update();
})
.on('connect', (connection) => {
  console.log('connect ' + connection.role + ' for ' + connection.profile);
  for (var property of connection.properties)
    console.log('  ' + property.name + ' = ' + JSON.stringify(property.value));
});//.subscribe();

//
const application = new Application({
  transport: Transport,
  resources: resource
//  {
//    id: '12345'
//  }]
})
.on('open', () => {
  console.log('open');
})
//.on('create', (resource) => {
//})
//.on('change', (resource) => {
//  console.log('change');
//})
.on('close', () => {
  console.log('close');
})
.on('error', (error) => {
  console.log('error: ' + error.message);
})
.open({
  broker: broker,
  token: token
});

//
var count = 0;

const timer = setInterval(() => {
  count++;
  update();
}, 10000);

function update() {
  if (resource.status === cns.Resource.SUBSCRIBED) {
//    resource.properties.set('padiHtml', '<p>Count ' + count + '</p>');
//    resource.publish();
  }
}

// Catch ctrl+c
var terminating = false;

process.on('SIGINT', () => {
  if (!terminating) {
    console.log('\r');

    clearInterval(timer);
    application.close();

    terminating = true;
  }
});
