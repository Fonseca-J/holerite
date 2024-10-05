/**
 * Aplicativo de calculo de Holerite
 * @author Joao Fonseca
 * @link https://github.com/Fonseca-J/holerite.git
 * @author Andrew Dantas
 * @link https://github.com/andrewdantas/holerite.git
 * @version 1.0
 */



const vale_transporte = 0.06; // 6% desconto Vale Transporte
const adia_pagto = 0.40; // 40% Adiantamento salarial

function calcular() {
    let salarioCalculado = parseFloat(document.getElementById('inputsalarioBase').value) || 0;
    let diasTrabalhados = parseInt(document.getElementById('inputDiasTrabalhados').value) || 0;
    let extra100 = parseFloat(document.getElementById('inputExtra100').value) || 0;
    let extra60 = parseFloat(document.getElementById('inputExtra60').value) || 0;

    let salarioDia = salarioCalculado / 30; // Cálculo do salário diário
    let totalProventos = salarioDia * diasTrabalhados + extra100 * (salarioDia / 220) * 2 + extra60 * (salarioDia / 220) * 1.6;

    // Cálculo do desconto de Vale Transporte
    let descontoValeTransporte = 0;
    if (document.getElementById('valeTransporteCheck').checked) {
        // Desconto proporcional ao salário e aos dias trabalhados
        let salarioProporcional = salarioDia * diasTrabalhados; // Salário proporcional aos dias trabalhados
        descontoValeTransporte = salarioProporcional * vale_transporte; // Cálculo do desconto
    }
    document.getElementById('campoDescontoValeTransporte').innerHTML = descontoValeTransporte.toFixed(2);

    // Cálculo do INSS
    let descontoInss = 0;
    switch (true) {
        case (salarioCalculado <= 1412.01):
            descontoInss = salarioCalculado * 0.075;
            break;
        case (salarioCalculado <= 2666.69):
            descontoInss = salarioCalculado * 0.09;
            break;
        case (salarioCalculado <= 4000.04):
            descontoInss = salarioCalculado * 0.12;
            break;
        case (salarioCalculado > 7786.03):
            descontoInss = salarioCalculado * 0.14;
            break;
        default:
            descontoInss = 0; // Para salários acima do teto
    }
    document.getElementById('campoDescontoInss').innerHTML = descontoInss.toFixed(2);

    // Cálculo do IRRF
    let descontoIrrf = 0;
    switch (true) {
        case (salarioCalculado <= 2259.20):
            descontoIrrf = 0;
            break;
        case (salarioCalculado <= 2826.65):
            descontoIrrf = (salarioCalculado * 0.075) - 169.44;
            break;
        case (salarioCalculado <= 3751.05):
            descontoIrrf = (salarioCalculado * 0.15) - 354.80;
            break;
        case (salarioCalculado <= 4664.68):
            descontoIrrf = (salarioCalculado * 0.225) - 636.13;
            break;
        default:
            descontoIrrf = (salarioCalculado * 0.275) - 869.36;
            break;
    }
    document.getElementById('campoDescontoIrrf').innerHTML = descontoIrrf.toFixed(2);

    let descontoAdiantamento = salarioCalculado * adia_pagto;
    document.getElementById('campoDescontoAdiantamento').innerHTML = descontoAdiantamento.toFixed(2);

    // Total de descontos
    let totalDescontos = descontoInss + descontoIrrf + descontoValeTransporte;
    document.getElementById('total-descontos').innerText = totalDescontos.toFixed(2);

    // Salário líquido
    let salarioLiquido = totalProventos - totalDescontos;
    document.getElementById('liquido-receber').innerText = salarioLiquido.toFixed(2);
    document.getElementById('footer-liquido').innerText = salarioLiquido.toFixed(2);

    // Atualizar os proventos
    document.getElementById('total-proventos').innerText = totalProventos.toFixed(2);
}
