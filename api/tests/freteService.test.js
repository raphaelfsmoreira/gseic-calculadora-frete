// Testes unitários para as funções de api

const {
    calcularPesoCubado,
    calcuarPesoFaturado,
    calcularValorBase,
    calcularPesoFaturado
} = require('../src/freteService.js');


const {
    TIPOS_FRETE
} = require('../src/freteService.js');

describe('Teste da função calcularPesoCubado e validação de entrada dos valores', () => {

    test('Calcular peso cubado corretamente', () => {
        const resultado = calcularPesoCubado(40, 30, 20);

        // pesoCubado = (comprimento * largura * altura) / 6000;

        // Lembrando que a saída é um number com dois pontos decimais...
        expect(resultado).toBe(4.00);
    });

    test('Deve lancar erro se houver um valor nulo', () => {
        expect(() => calcularPesoCubado(0, 30, 20)).toThrow(
            'Comprimento deve ser um valor positivo!'
        );
    });

    test('Deve lancar erro se houver um valor negativo', () => {
        expect(() => calcularPesoCubado(10, -30, 20)).toThrow(
            'Largura deve ser um valor positivo!'
        );  
    });

    test("Lançar erro se um dos argumentos não for number", () => {
        
        expect(() => calcularPesoCubado(10, 30, 'a')).toThrow(
            'Altura deve ser um valor positivo!'
        )
    });
});


describe('Teste da funçao calcularPesoFaturado', () => {

    test('Calcular valor maior corretamente', () => {
        
        const resultado = calcularPesoFaturado(30, 50);

        expect(resultado).toBe(50);
    
    });

});

describe('Teste da funçao calcularValorBase', () => {

    // function calcularValorBase(distanciaKm, pesoFaturado, tipoFrete)

    // const valorBase = distanciaKm * pesoFaturado * aliquotaFrete

    /*
        const ALIQUOTA_TIPOS_FRETE = {
        [TIPOS_FRETE.ECONOMICO]: 0.015,
        [TIPOS_FRETE.NORMAL]: 0.025,
        [TIPOS_FRETE.EXPRESSO]: 0.04,
        [TIPOS_FRETE.URGENTE]: 0.06
    
    */

    test('Cálculo para frete tipo economico', () => {

        // Aliquota = 1.5%
        const resultado = calcularValorBase(100, 50, TIPOS_FRETE.ECONOMICO);

        expect(resultado).toBe(75.00)

    });

    
    test('Cálculo para frete tipo normal', () => {

        // Aliquota = 2.5%
        const resultado = calcularValorBase(100, 50, TIPOS_FRETE.NORMAL);

        expect(resultado).toBe(125.00);
    });

    test('Cálculo para frete tipo expresso', () => {

        // Aliquota = 4%
        const resultado = calcularValorBase(100, 50, TIPOS_FRETE.EXPRESSO);

        expect(resultado).toBe(200.00);
    });

    test('Cálculo para frete tipo urgente', () => {

        // Aliquota = 6%
        const resultado = calcularValorBase(100, 50, TIPOS_FRETE.URGENTE);

        expect(resultado).toBe(300.00);
    });

    test('Calculo para frete de tipo não existente', () => {

        expect(() => calcularValorBase(100, 50, TIPOS_FRETE.TESTE)).toThrow(
            'Tipo de frete inválido!'
        )
    });
});