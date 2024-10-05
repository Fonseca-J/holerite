/**
 * Aplicativo de calculo de Holerite
 * @author Joao Fonseca
 * @link https://github.com/Fonseca-J/holerite.git
 * @author Andrew Dantas
 * @link https://github.com/andrewdantas/holerite.git
 * @version 1.0
 */



const adia_pagto = 0.40 // 40% Adiantamento vale
const vale_transporte = 0.06; // 6% desconto Vale Transporte
const valor_hora_extra_100 = 50; // Exemplo de valor por hora extra 100%
const valor_hora_extra_60 = 30; // Exemplo de valor por hora extra 60%

function calcular() {
    // Coletar valores dos inputs
    let salarioBase = parseFloat(document.getElementById('inputsalarioBase').value) || 0;
    let diasTrabalhados = parseFloat(document.getElementById('inputDiasTrabalhados').value) || 0;
    let horasExtra100 = parseFloat(document.getElementById('inputExtra100').value) || 0;
    let horasExtra60 = parseFloat(document.getElementById('inputExtra60').value) || 0;

    // Proventos: salário proporcional + horas extras
    let salarioCalculado = (salarioBase / 30) * diasTrabalhados; // Proporcional ao número de dias trabalhados
    let totalHorasExtras = (horasExtra100 * valor_hora_extra_100) + (horasExtra60 * valor_hora_extra_60);
    let totalProventos = salarioCalculado + totalHorasExtras;

    // Desconto Vale Transporte
    let descontoValeTransporte = salarioCalculado * vale_transporte;
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
        case (salarioCalculado <= 7786.03):
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
