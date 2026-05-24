// Testes unitários para as funções de api

const {
    calcularPesoCubado,
    calcuarPesoFaturado,
    calcularValorBase
} = require('../src/freteService.js');


describe('Teste da função calcularPesoCubado', () => {

    test('Calcular peso cubado corretamente', () => {
        const resultado = calcularPesoCubado(40, 30, 20);

        // pesoCubado = (comprimento * largura * altura) / 6000;

        expect(resultado).toBe(4);
    });

    test('Deve lancar erro se houver um valor nulo', () => {
        expect(() => calcularPesoCubado(0, 30, 20)).toThrow(
            'Comprimento deve ser um valor positivo!'
        );
    });

});