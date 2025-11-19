async function requestPost(rota, bodyRequest) {
    // console.log('bodyRequest: ', bodyRequest);
    try {
        let res = await fetch(rota, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyRequest),
        });

        // Verificar o status da resposta HTTP
        if (!res.ok) {
            console.log(`Erro na requisição: ${res.status} - ${res.statusText}`);
        }

        // Tentar analisar a resposta JSON
        const data = await res.json();

        // Verificar se a resposta JSON contém um campo de erro
        if (data.error) {
            console.log(`Erro na resposta JSON: ${data.error}`);
        }

        return data;
    } catch (e) {
        // Capturar e retornar detalhes do erro
        return { status: 'error', message: e.message };
    }
}


function appendInElement(id, textElements) {
    let td = document.createElement('tr');
    td.innerHTML = textElements;

    let tbody = getID(id)
    tbody.append(td)
}


function getID(id) {
    return document.getElementById(id)
}

function openZap(number, msg){
    let encodedString = encodeURIComponent(msg);
    window.open(`https://api.whatsapp.com/send?phone=55${number.replace('-','').replace('(','').replace(')','').replace(' ','')}&text=` + encodedString)
}


function ajustarAlturaTextArea(elemento, limit) {
    // Configura a altura mínima para 1 linha
    elemento.rows = 1;

    // Calcula a altura necessária com base no conteúdo
    var linhasNecessarias = elemento.scrollHeight / 20; // Aproximadamente 20 pixels por linha

    // Define o número de linhas conforme necessário, mas não mais que 10
    elemento.rows = Math.min(Math.ceil(linhasNecessarias), limit);
}



// Função para somar horas
function somarHoras(hora1, hora2) {
    // Função para adicionar zeros à esquerda se necessário
    function pad(num) {
        return (num < 10 ? '0' : '') + num;
    }
    
    console.log(hora1, hora2)
        // Dividir as horas e os minutos
        var [hora1h, hora1m] = hora1.split(':').map(Number);
        var [hora2h, hora2m] = hora2.split(':').map(Number);
        
        // Converter as horas para minutos
        var minutosTotal = (hora1h * 60 + hora1m) + (hora2h * 60 + hora2m);
        
        // Calcular as novas horas e minutos
        var novaHora = Math.floor(minutosTotal / 60);
        var novosMinutos = minutosTotal % 60;
        
        // Formatar a hora de volta ao formato 'HH:MM'
        return pad(novaHora) + ':' + pad(novosMinutos);
    }
    

var telaG = window.matchMedia("(min-width: 1000px)");
var telaM_G = window.matchMedia("(max-width: 800px)");
var telaM = window.matchMedia("(max-width: 600px)");
var telaP = window.matchMedia("(max-width: 350px)");

// Função para remover letras e caracteres especiais de uma string
function clearNumberZap(value) {
    // Regex para encontrar letras e caracteres especiais
    const regex = /\D/g;
    // Substitui todas as ocorrências encontradas pelo regex com uma string vazia
    const result = value.replace(regex, '');
    return result;
}


function formatPhoneNumber(valorAtual) {
    // var valorAtual = $(`#${inputId}`).val();
    // Remove qualquer caractere que não seja um dígito numérico
    var valorNumerico = valorAtual.replace(/\D/g, '');

    // Aplica a formatação de telefone: (11) 90011-2233
    var valorFormatado = '';

    if (valorNumerico.length > 12) {
        valorFormatado = valorNumerico.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '$1 ($2) $3-$4');
      } else if (valorNumerico.length > 11) {
      valorFormatado = valorNumerico.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '$1 ($2) $3-$4');
    } else if (valorNumerico.length > 10) {
      valorFormatado = valorNumerico.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (valorNumerico.length > 5) {
      valorFormatado = valorNumerico.replace(/(\d{2})(\d{4})(\d*)/, '($1) $2-$3');
    } else if (valorNumerico.length > 2) {
      valorFormatado = valorNumerico.replace(/(\d{2})(\d*)/, '($1) $2');
    } else {
      valorFormatado = valorNumerico; // Sem formatação para menos de 3 dígitos
    }

    return valorFormatado;
}
// Formata o valor para o formato brasileiro (Real)
const valorFormat_real = (valor) => valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});