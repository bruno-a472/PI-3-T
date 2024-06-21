// MQTT2.js

// URL do broker MQTT e tópico a serem utilizados
const brokerUrl = 'wss://broker.emqx.io';
const porta = '8084'
const topic = 'BananaOmastar';


// Gerar um ID de cliente único

const a = 1;
const clientID = 'clientId_' + Math.random().toString(16).substr(2, 8);

// Criar um cliente MQTT
const client = new Paho.Client(brokerUrl, Number(porta), "clientId");

// Definir callbacks
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Conectar ao broker MQTT
client.connect({
    onSuccess: onConnect,
    useSSL: true
});

// Callback chamada quando conectado ao broker MQTT
function onConnect() {
    console.log('Conectado ao broker MQTT');
    client.subscribe(topic);  // Subscrever ao tópico de interesse
}

// Callback chamada quando a conexão com o broker MQTT é perdida
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log('Conexão perdida: ' + responseObject.errorMessage);
    }
}

// Callback chamada quando uma mensagem é recebida do broker MQTT
function onMessageArrived(message) {
    console.log('Mensagem recebida: ' + message.payloadString);
    // Implementar lógica para processar a mensagem recebida aqui
}