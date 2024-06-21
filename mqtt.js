// Conectar ao broker MQTT
const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');

// Tópico para se inscrever
const topic = 'BananaOmastar';


// Daniel
// // Elementos HTML dos indicadores
// const indicators = [
//     document.getElementById('indicator1'),
//     document.getElementById('indicator2'),
//     document.getElementById('indicator3')
//     // Adicione mais indicadores conforme necessário
// ];

// Daniel
// // Verifique se os indicadores foram carregados corretamente
// indicators.forEach((indicator, index) => {
//     if (!indicator) {
//         console.error(`Indicador ${index + 1} não foi encontrado no DOM.`);
//     }
// });

//Daniel
// Função para alterar a cor do indicador de status
// function setStatusColor(indicator, isOn) {
//     if (isOn) {
//         indicator.style.backgroundColor = 'green'; // Cor quando disponível
//     } else {
//         indicator.style.backgroundColor = 'red'; // Cor quando não disponível
//     }
// }

// Evento de conexão
client.on('connect', () => {
    console.log('Conectado ao broker MQTT');
    
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Falha ao se inscrever no tópico', err);
        } else {
            console.log(`Inscrito no tópico ${topic}`);
        }
    });

// Daniel 
    // Inscrever-se nos tópicos MQTT
    // topics.forEach((topic, index) => {
    //     client.subscribe(topic, (err) => {
    //         if (err) {
    //             console.error('Falha ao se inscrever no tópico', err);
    //         } else {
    //             console.log(`Inscrito no tópico ${topic}`);
    //         }
    //     });
    // });
});

// Evento de mensagem
client.on('message', (topic, message) => {
    console.log(`Mensagem recebida no tópico ${topic}:`, message.toString());
 
// Daniel 
    // // Determinar qual indicador está relacionado ao tópico recebido
    // let indicatorIndex = topics.indexOf(topic);
    const texto = message.toString();
    console.log(typeof(texto));
    const vacancies = texto.split('v').filter(Boolean); //[v10, v21]
    vacancies.forEach(vacancy => {
        var vacancyNumber = vacancy.substr(0, 1); // Número da vaga
        var vacancyStatus = vacancy.substr(1, 2); // Status da vaga (0 ou 1)
        console.log(vacancyNumber+typeof(vacancyNumber));
        console.log(vacancyStatus+typeof(vacancyStatus));
        const spotElement = document.getElementById(`indicator${vacancyNumber}`);
        console.log(spotElement);
        
        if (vacancyStatus === '0') {
            spotElement.style.backgroundColor = 'red'; // Vaga ocupada
            // spotElement.textContent = 'Ocupada';
            console.log("vaga" + vacancyNumber + "está sendo trocada para vermelho");
        } else if (vacancyStatus === '1') {
            spotElement.style.backgroundColor = 'green'; // Vaga disponível
            // spotElement.textContent = 'Disponível';
            console.log("vaga" + vacancyNumber + "está sendo trocada para verde");
        } else if(vacancyStatus != vacancyStatus) {
            console.log("VacancyStatus != VacancyStatus");
        } else if(vacancyStatus === vacancyStatus) {
            console.log("VacancyStatus === VacancyStatus");
        }else {
            console.log('Não foi passado nenhum if');
        }  /* 
            console.log("Status: " + vacancyStatus);
            const vacancyStatusB = vacancy.substr(1, 2);
            console.log("Após alteração: "+vacancyStatusB);
            if (vacancyStatusB === '0') {
                spotElement.style.backgroundColor = 'red'; // Vaga ocupada
                // spotElement.textContent = 'Ocupada';
                console.log("vaga" + vacancyNumber + "está sendo trocada para vermelho");
            } else if (vacancyStatusB === '1') {
                spotElement.style.backgroundColor = 'green'; // Vaga disponível
                // spotElement.textContent = 'Disponível';
                console.log("vaga" + vacancyNumber + "está sendo trocada para verde");
            } */
        
        
    });

// Daniel
    // Verifica o estado recebido
    
    // const isOn = (message.toString() === '0'); // Ajuste conforme mensagem recebida
    
    // // Atualiza o indicador de status correspondente
    // if (indicatorIndex !== -1 && indicators[indicatorIndex]) {
    //     setStatusColor(indicators[indicatorIndex], isOn);
    // } else {
    //     console.error(`Indicador para o tópico ${topic} não encontrado ou index inválido.`);
    // }
});
