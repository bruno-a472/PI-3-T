// Conectar ao broker MQTT
const client = mqtt.connect('wss://test.mosquitto.org:8081');

// Tópicos para se inscrever
const topics = ['rvrfrcrvtb7rcudufufudftvt', 'jasiixisababaiixiabxjaob', 'jxicisjsiaoaoaoaoao']; // Substitua pelos seus tópicos MQTT

// Elementos HTML dos indicadores
const indicators = [
    document.getElementById('indicator1'),
    document.getElementById('indicator2'),
    document.getElementById('indicator3')
    // Adicione mais indicadores conforme necessário
];

// Verifique se os indicadores foram carregados corretamente
indicators.forEach((indicator, index) => {
    if (!indicator) {
        console.error(`Indicador ${index + 1} não foi encontrado no DOM.`);
    }
});

// Função para alterar a cor do indicador de status
function setStatusColor(indicator, isOn) {
    if (isOn) {
        indicator.style.backgroundColor = 'green'; // Cor quando disponível
    } else {
        indicator.style.backgroundColor = 'red'; // Cor quando não disponível
    }
}

// Evento de conexão
client.on('connect', () => {
    console.log('Conectado ao broker MQTT');
    
    // Inscrever-se nos tópicos MQTT
    topics.forEach((topic, index) => {
        client.subscribe(topic, (err) => {
            if (err) {
                console.error('Falha ao se inscrever no tópico', err);
            } else {
                console.log(`Inscrito no tópico ${topic}`);
            }
        });
    });
});

// Evento de mensagem
client.on('message', (topic, message) => {
    console.log(`Mensagem recebida no tópico ${topic}:`, message.toString());
    
    // Determinar qual indicador está relacionado ao tópico recebido
    let indicatorIndex = topics.indexOf(topic);
    
    // Verifica o estado recebido
    const isOn = (message.toString() === 'ligado'); // Ajuste conforme mensagem recebida
    
    // Atualiza o indicador de status correspondente
    if (indicatorIndex !== -1 && indicators[indicatorIndex]) {
        setStatusColor(indicators[indicatorIndex], isOn);
    } else {
        console.error(`Indicador para o tópico ${topic} não encontrado ou index inválido.`);
    }
});
