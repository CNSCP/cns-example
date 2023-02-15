//
//

//
const cns = require('cns-sdk');
const readline = require('readline');

//
var interface;

//
interface = new cns.Interface({
  transport: cns.Socket
})
.on('open', () => {
//  console.log('> interface.open()');

})
.on('close', () => {
//  console.log('> interface.close()');
})
.on('error', (error) => {
  console.log('error: ' + error.message);
})
.open({
//  uri: 'ws://localhost:8080'
});

// Create interface
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
//  completer: completer,
  prompt: '> ',
  terminal: true
})
// Input line
.on('line', (line) => {
  // Parse line
  try {
    switch (line) {
      case '':
        break;
      case '.help':
        break;
      case '.exit':
        break;
      default:
        const result = eval(line).toString();
        console.log(result);
        break;
    }
  } catch(error) {
    console.error(error.message);
  }
  terminal.prompt();
})
// Ctrl+C
.on('SIGINT', () => {
  // Terminate program
  console.log('\r');

  if (interface) interface.close();
  if (terminal) terminal.close();
});


//
cns.Interface.prototype.toString = function() {
  return className(this) + ' {\n' +
    '  transport: ' + className(this.transport) + ',\n' +
    '  resources: [' + this.resources.length + ']\n' +
  '}';
}

cns.Resources.prototype.toString = function() {
  return className(this) + ' {\n' +
    '  interface: ' + className(this.interface) + '\n' +
  '}';
}

cns.Resource.prototype.toString = function() {
  return className(this) + ' {\n' +
    '  resources: ' + className(this.resources) + ',\n' +
    '  identifier: ' + className(this.identifier) + ',\n' +
    '  status: ' + this.status + ',\n' +
    '  properties: [' + this.properties.length + '],\n' +
    '  connections: [' + this.connections.length + ']\n' +
  '}';
}

cns.Properties.prototype.toString = function() {
  return className(this) + ' {\n' +
    '  parent: ' + className(this.parent) + '\n' +
  '}';
}

cns.Property.prototype.toString = function() {
  return className(this) + ' {\n' +
    '  properties: ' + className(this.properties) + ',\n' +
    '  name: "' + this.name + '",\n' +
    '  value: "' + this.value + '"\n' +
  '}';
}

cns.Transport.prototype.toString = function() {
  return className(this) + ' {\n' +
    '  interface: ' + className(this.interface) + ',\n' +
    '  status: ' + this.status + '\n' +
  '}';
}

cns.Socket.prototype.toString = function() {
  return className(this) + ' {\n' +
    '  interface: ' + className(this.interface) + ',\n' +
    '  status: ' + this.status + ',\n' +
    '  uri: "' + this.uri + '",\n' +
    '  protocol: "' + this.protocol + '",\n' +
    '  client: ' + className(this.client) + '\n' +
  '}';
}

cns.Padi.prototype.toString = function() {
  return className(this) + ' {\n' +
    '  interface: ' + className(this.interface) + ',\n' +
    '  status: ' + this.status + ',\n' +
    '  api: "' + this.api + '",\n' +
    '  broker: "' + this.broker + '",\n' +
    '  client: ' + className(this.client) + '\n' +
  '}';
}

//
function className(obj) {
  return (obj === undefined)?'undefined':obj.constructor.name;
}

// Output initial prompt
terminal.prompt();

const argv = process.argv.slice(2).join(' ');
if (argv !== '') terminal.write(argv + '\n');
