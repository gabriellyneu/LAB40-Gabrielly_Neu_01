const implemented = true; // mudar para true somente após os testes passarem

function execute(input) {
  if (input === null || typeof input !== 'object') {
    throw new Error('A entrada deve ser um objeto com o campo "valores".');
  }

  const { valores } = input;

  if (!Array.isArray(valores)) {
    throw new Error('O campo "valores" deve ser um array de números.');
  }

  for (let i = 0; i < valores.length; i++) {
    if (!Number.isFinite(valores[i])) {
      throw new Error(`Elemento na posição ${i} não é um número finito.`);
    }
  }

  // reduce não modifica o array original e um array vazio resulta em 0
  const soma = valores.reduce((acc, n) => acc + n, 0);
  return { soma };
}

module.exports = {
  id: 21,
  name: 'Soma de elementos',
  description: 'Soma todos os elementos de uma lista numérica.',
  implemented,
  execute
};