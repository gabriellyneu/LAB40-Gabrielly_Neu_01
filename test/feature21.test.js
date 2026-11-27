const test = require('node:test');
const assert = require('node:assert/strict');
const feature = require('../src/features/feature21');

test('caso típico: soma [2, 3, 5] = 10', () => {
  assert.deepEqual(feature.execute({ valores: [2, 3, 5] }), { soma: 10 });
});

test('fronteira: array vazio retorna 0 e um elemento retorna ele mesmo', () => {
  assert.deepEqual(feature.execute({ valores: [] }), { soma: 0 });
  assert.deepEqual(feature.execute({ valores: [9] }), { soma: 9 });
});

test('aceita negativos e decimais', () => {
  assert.equal(feature.execute({ valores: [-2, 3] }).soma, 1);
  assert.equal(feature.execute({ valores: [1.5, 2.5] }).soma, 4);
});

test('não modifica o array de entrada', () => {
  const valores = [1, 2];
  feature.execute({ valores });
  assert.deepEqual(valores, [1, 2]);
});

test('rejeita entrada que não é objeto', () => {
  for (const input of [undefined, null, 'x', 42]) {
    assert.throws(() => feature.execute(input), { name: 'Error' });
  }
});

test('rejeita valores que não são array', () => {
  for (const valores of [undefined, '1,2', 5, { a: 1 }]) {
    assert.throws(() => feature.execute({ valores }), { name: 'Error' });
  }
});

test('rejeita elementos não numéricos ou não finitos', () => {
  for (const valores of [[1, '2'], [1, null], [1, NaN], [1, Infinity], [1, -Infinity]]) {
    assert.throws(() => feature.execute({ valores }), { name: 'Error' });
  }
});