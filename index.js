const express = require('express');
const app = express();

// Rota para a calculadora
app.get('/calculadora', (req, res) => {
  const { operacao, n1, n2 } = req.query;

  // Verificação dos parâmetros obrigatórios
  if (!operacao) {
    return res.status(400).json({ error: 'Parâmetro "operacao" é obrigatório' });
  }
  if (!n1 || isNaN(n1)) {
    return res.status(400).json({ error: 'Parâmetro "n1" é obrigatório e deve ser numérico' });
  }
  if (!n2 || isNaN(n2)) {
    return res.status(400).json({ error: 'Parâmetro "n2" é obrigatório e deve ser numérico' });
  }

  // Conversão dos parâmetros n1 e n2 para números
  const num1 = parseFloat(n1);
  const num2 = parseFloat(n2);
  let resultado;

  // Execução da operação com base no parâmetro "operacao"
  switch (operacao) {
    case 'soma':
      resultado = num1 + num2;
      break;
    case 'subtracao':
      resultado = num1 - num2;
      break;
    case 'multiplicacao':
      resultado = num1 * num2;
      break;
    case 'divisao':
      if (num2 === 0) {
        return res.status(400).json({ error: 'Divisão por zero não é permitida' });
      }
      resultado = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Operação inválida. Use "soma", "subtracao", "multiplicacao" ou "divisao".' });
  }

  // Retorno do resultado da operação
  return res.json({ resultado });
});

// Configuração da porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
