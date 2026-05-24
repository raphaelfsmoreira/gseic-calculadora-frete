const express = require('express');

const {
    calcularPesoCubado,
    calcularPesoFaturado,
    calcularValorBase
} = require('./freteService');

const router = express.Router();

router.post('/cubagem', (req, res) => {

    try {
        
        const { comprimento, largura, altura } = req.body

        const pesoCubado = calcularPesoCubado(comprimento, largura, altura);

        console.log(`Entrada: Comprimento = ${comprimento}
                     Entrada: Largura = ${largura}
                     Entrada: Altura = ${altura}
                     Saída: pesoCubado = ${ pesoCubado }`);
     

        return res.status(200).json({
                success: true,
                data: { pesoCubado }
            }
        );


    } catch(err) {

        console.log(err.message)

        return res.status(400).json({
                success: false,
                error: err.message
            }
        )
    }
});

router.post('/peso-faturado', (req, res) => {

    try {

        const { pesoCubado, pesoReal } = req.body;

        const pesoFaturado = calcularPesoFaturado(pesoCubado, pesoReal);

        console.log(`Entrada: pesoCubado = ${pesoCubado}
                    Entrada: pesoReal = ${pesoReal}
                    Saída: pesoFaturdo = ${pesoFaturado}`);
        
        return res.status(200).json({
                success: true,
                data: { pesoFaturado }
            }
        );

    } catch(err) {

        console.log(err.message);

        return res.status(400).json({
            sucess: false,
            error: err.message
        });
    }
});

router.post('/valor-base', (req, res) => {
    try {

        const { distanciaKm, pesoFaturado, tipoFrete } = req.body;

        const valorBase = calcularValorBase(
            distanciaKm,
            pesoFaturado,
            tipoFrete
        );

        return res.status(200).json({
                success: true,
                data: { valorBase }
            }
        );

    } catch (err) {
        return res.status(400).json({
                success: false,
                error: err.message
            }
        );
    }
});



module.exports = router;