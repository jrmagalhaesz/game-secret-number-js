let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1;


function textoTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    textoTela('h1', 'Jogo do número secreto');
    textoTela('p', 'Escolha um número entre 1 e 100');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        textoTela('h1', 'Parabéns!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa} :)`;
        textoTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('button').setAttribute('disabled', 'disabled');
    } else {
        if (chute > numeroSecreto) {
            textoTela('p', 'O número secreto é menor');
        } else {
            textoTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroSecreto() {
    let NumeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaDeNumerosSorteados.length;

    if (quantidadeElementosLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(NumeroEscolhido)) {
        return gerarNumeroSecreto();
    } else {
        listaDeNumerosSorteados.push(NumeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return NumeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroSecreto();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', 'disabled');
    document.querySelector('button').removeAttribute('disabled');
    verificarCampoVazio();
}


function verificarCampoVazio() {
    const chute = document.querySelector('.container__input').value.trim(); 

    const botaoChutar = document.querySelector('.container__botao');
    const botaoReiniciar = document.getElementById('reiniciar');

    if (chute === '') {
        botaoChutar.setAttribute('disabled', 'disabled'); 
    } else {
        botaoChutar.removeAttribute('disabled'); 
    }

    if (chute === '' && botaoReiniciar.hasAttribute('disabled')) {
        botaoChutar.setAttribute('disabled', 'disabled'); 
    }
}


document.querySelector('.container__input').addEventListener('input', verificarCampoVazio);

verificarCampoVazio();
