const TIPOS_FRETE = {
    ECONOMICO: 'economico',
    NORMAL: 'normal',
    EXPRESSO: 'expresso',
    URGENTE: 'urgente'
};

const ALIQUOTA_TIPOS_FRETE = {
    [TIPOS_FRETE.ECONOMICO]: 0.015,
    [TIPOS_FRETE.NORMAL]: 0.025,
    [TIPOS_FRETE.EXPRESSO]: 0.04,
    [TIPOS_FRETE.URGENTE]: 0.06
};

function validarNumeroPositivo(valor, nomeCampo) {
    const numero = Number(valor);

    if (Number.isNaN(numero) || numero <= 0) {
        throw new Error(`${nomeCampo} deve ser um valor positivo!`);
    }

    return numero;
}

// O peso cubado calcula o quão volumoso é uma encomenda.
// Uma encomenda pode ser muito volumosa, apesar de leve, o que acaba ocupando muito espaço nos veículos de entrega.
// Por outro lado, uma encomenda pode ser muito pesada (densa) o que acaba impactando também o custo do frete.

function calcularPesoCubado(comprimento, largura, altura){

    // Passar as entradas por validacao:

    validarNumeroPositivo(comprimento, 'Comprimento');
    validarNumeroPositivo(largura, 'Largura');
    validarNumeroPositivo(altura, 'Altura');


    const pesoCubado = (comprimento * largura * altura) / 6000;

    // Tipar para Number!
    return Number(pesoCubado.toFixed(2));

}


// O peso faturado decidirá qual métrica será usada para o cálculo do frete.
// Se a carga é muito volumosa comparada ao seu peso real (pesoCubado > pesoReal), então este (pesoCubado) parâmetro guiará o custo.
// Se a carga é muito massiva comparada ao seu volume (pesoReal > pesoCubado), este parâmetro (pesoReal) será a métrica de custo.
// O maior valor entre os dois será utilizado no cálculo do custo do frete.

function calcularPesoFaturado(pesoReal, pesoCubado){

    validarNumeroPositivo(pesoCubado, 'Peso Cubado');
    validarNumeroPositivo(pesoReal, 'Peso Real');

    return Math.max(pesoReal, pesoCubado);
}


// Decidido o Peso Faturado, adiciona-se a métrica de distância ao cálculo do frete.

function calcularValorBase(distanciaKm, pesoFaturado, tipoFrete){
    
    validarNumeroPositivo(distanciaKm, 'Distancia KM');
    validarNumeroPositivo(pesoFaturado, 'Peso Faturado');

    const aliquotaFrete = ALIQUOTA_TIPOS_FRETE[tipoFrete];

    if(!aliquotaFrete){
        throw new Error('Tipo de frete inválido!')
    }


    const valorBase = distanciaKm * pesoFaturado * aliquotaFrete

    return Number(valorBase.toFixed(2));

}



module.exports = {
  calcularPesoCubado,
  calcularPesoFaturado,
  calcularValorBase,
  TIPOS_FRETE,
  ALIQUOTA_TIPOS_FRETE
};

