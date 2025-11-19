
let date = new Date();

function renderCalendar(functionSelected) {
    date.setDate(1);

    const monthDays = document.getElementById('calendar-body');
    const month = document.getElementById('month');
    const daysElement = document.getElementById('days');

    let mesAtual = date.getMonth() + 1
    let anoAtual = date.getFullYear()
    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    let days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    var telaMedia = window.matchMedia("(max-width: 800px)");
    var telaPequena = window.matchMedia("(max-width: 350px)");

    if (telaPequena.matches) {
        days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    } else if (telaMedia.matches) {
        days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    }

    month.innerText = `${months[date.getMonth()]} ${date.getFullYear()}`;
    daysElement.innerHTML = days.map(day => `<div class="day">${day}</div>`).join('');

    let dates = '';
    let classDay = (d) => {
        return date.getMonth() + d
    }

    function disabled(codintion) {
        if (codintion) {
            return 'disabled'
        }
        return ''
    }

    // Mostra os dias finais do mes anterior
    for (let x = firstDayIndex; x > 0; x--) {
        let d = prevLastDay - x + 1
        dates += `<div class="daySelect ${disabled(true)}">${d}</div>`;
    }

    let hj = 99
    for (let i = 1; i <= lastDay; i++) {
        let nameDiaDaSemana = getDiaSemanaName(i, mesAtual, anoAtual)
        // console.log('nameDiaDaSemana: ', nameDiaDaSemana)
        // console.log('diasDisponiveisDaSemana[nameDiaDaSemana]: ', diasDisponiveisDaSemana[nameDiaDaSemana])
        const isHoje = i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()
        // obter a hora atual no formato hh:mm
        const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        let fechado = false;
        if (isHoje) {
            // console.log('isHoje: ', isHoje, 'nomeDiaDaSemana: ', nameDiaDaSemana)
            const horaFechamento = horariosDeFechamento[nameDiaDaSemana] // hh:mm
            // console.log('horaFechamento: ', horaFechamento, 'horaAtual: ', horaAtual)
            if (horaAtual > horaFechamento) {
                fechado = true
            }
        }
        // console.log('fechado: ', fechado)
        if (i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear()) {
            hj = i
            dates += `<div onclick="selectedDay(event, ${i}, ${mesAtual}, ${anoAtual}, ${functionSelected})" class='daySelect today ${disabled(diasDisponiveisDaSemana[nameDiaDaSemana] === false || fechado)}'>${i}</div>`;
        } else {
            if (i >= hj) {
                dates += `<div onclick="selectedDay(event, ${i}, ${mesAtual}, ${anoAtual}, ${functionSelected})" class="daySelect ${disabled(diasDisponiveisDaSemana[nameDiaDaSemana] === false || fechado)}">${i}</div>`;
            } else if (i < hj) {

                let desabilitar = new Date().getMonth() >= date.getMonth() && new Date().getFullYear() === date.getFullYear()
                dates += `<div onclick="selectedDay(event, ${i}, ${mesAtual}, ${anoAtual}, ${functionSelected})" class="daySelect ${disabled(desabilitar || diasDisponiveisDaSemana[nameDiaDaSemana] === false || fechado)}">${i}</div>`;

            }
        }
    }

    // Mostra os dias  iniciais do proximo mes
    for (let j = 1; j <= nextDays; j++) {
        dates += `<div class='daySelect ${disabled(true)}'>${j}</div>`;
    }
    monthDays.innerHTML = dates;

    if (new Date().getMonth() >= date.getMonth() && new Date().getFullYear() === date.getFullYear()) {
        document.getElementById('month-prev').style.visibility = 'hidden'
    } else {
        document.getElementById('month-prev').style.visibility = 'visible'
    }
}

function selectedDay(event, dia, mes, ano, functionSelected) {
    var nomeDiaSemana = obterNomeDiaSemana(dia, mes, ano);//getDiaSemanaName(dia, mes, ano);
    // console.log('nomeDiaSemana: ', nomeDiaSemana); // Saída: Quarta-feira
    // console.log(dia, ' ', mes, ' ', ano)
    functionSelected(dia, mes, ano, nomeDiaSemana)

    // Seleciona todos os elementos com a classe desejada
    var elementos = document.querySelectorAll('.daySelect');

    // Itera sobre os elementos usando um loop
    for (var i = 0; i < elementos.length; i++) {
        var elemento = elementos[i];
        // Faça o que você deseja com cada elemento, por exemplo:
        elemento.classList.remove('select');
    }

    event.target.classList.add('select')

}

function obterNomeDiaSemana(dia, mes, ano) {
    var data = new Date(ano, mes-1, dia);
    // Obtenha o número do dia da semana (domingo = 0, segunda-feira = 1, ..., sábado = 6)
    var numeroDiaSemana = data.getDay();
    // Mapeie o número do dia da semana para o nome correspondente
    var nomesDiasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    var nomeDiaSemana = nomesDiasSemana[numeroDiaSemana];

    return nomeDiaSemana;
}



document.getElementById('month-prev').addEventListener('click', () => {
    document.getElementById('calendar-body').classList.add('fade-out');
    setTimeout(() => {

        date.setMonth(date.getMonth() - 1);
        renderCalendar(selectedDate);
        document.getElementById('calendar-body').classList.remove('fade-out');
    }, 500);
});

document.getElementById('month-next').addEventListener('click', () => {

    document.getElementById('calendar-body').classList.add('fade-out');
    setTimeout(() => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar(selectedDate);
        document.getElementById('calendar-body').classList.remove('fade-out');
    }, 500);
});


function getDiaSemanaName(dia, mes, ano) {
    // console.log('getDiaSemanaName, mes: ', mes)
    // Criar um objeto de data
    var data = new Date(ano, mes - 1, dia);

    // Array com os nomes dos dias da semana
    var diasDaSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

    // Obter o dia da semana (0 = domingo, 1 = segunda-feira, ..., 6 = sábado)
    var numeroDoDiaDaSemana = data.getDay();

    // Obter o nome do dia da semana usando o array
    var nomeDoDiaDaSemana = diasDaSemana[numeroDoDiaDaSemana];

    // console.log(nomeDoDiaDaSemana); // Output dependendo do dia em que o código é executado
    return nomeDoDiaDaSemana;

}
// renderCalendar();