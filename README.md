# LAB40 – Laboratório de Funcionalidades Web

Projeto-base para avaliação prática de Integração e Entrega Contínua (CI/CD).

## Sobre a entrega

Esta entrega implementa a **Feature 21 – Soma de elementos** (`src/features/feature21.js`), atribuída individualmente.

## Requisitos
- Node.js 20 ou superior.
- npm.
- Git e Docker Desktop (apenas para a etapa de Docker).

## Executar localmente
```bash
npm install
npm start
```
Acesse http://localhost:3000. Para desenvolvimento com reinicialização automática: `npm run dev`.

## Endpoints
- `GET /health`: verificação de disponibilidade.
- `GET /api/features`: lista as 40 funcionalidades e seus estados.
- `POST /api/features/:id`: executa uma funcionalidade, recebendo JSON no corpo.

Exemplo (Feature 21):
```bash
curl -X POST http://localhost:3000/api/features/21 -H "Content-Type: application/json" -d '{"valores":[2,3,5]}'
```

Resposta esperada: objeto com `result.soma` igual a `10`.

## Estrutura
```text
lab40/
├── .github/workflows/ci.yml
├── public/
├── scripts/
│   └── smoke.js
├── src/
│   ├── app.js
│   ├── server.js
│   └── features/
├── test/
│   └── feature21.test.js
├── Dockerfile
├── .dockerignore
├── eslint.config.js
├── package.json
└── package-lock.json
```

## Contrato de cada módulo
Cada arquivo `src/features/featureNN.js` exporta `id`, `name`, `description`, `implemented` e `execute(input)`.

1. Implemente `execute(input)`.
2. Valide os dados recebidos.
3. Retorne um objeto serializável em JSON.
4. Trate entradas inválidas lançando `Error` com mensagem clara.
5. Depois de implementar e validar, altere `implemented` para `true`.
6. Não altere o contrato dos outros módulos nem a API central sem autorização.

Enquanto `implemented` for `false`, a API retorna HTTP 501 para aquele módulo.

## Testes e qualidade

```bash
npm test                          # testes automatizados (node:test)
npm run lint                      # ESLint
npm run test:smoke                # sobe o servidor e consulta /api/features/21
npm audit --audit-level=high      # auditoria de dependências
```

Resultados observados na entrega:
- `npm test`: 7 testes passando (caso típico, fronteiras, decimais e negativos, não modificação da entrada, entradas inválidas).
- `npm run lint`: sem erros.
- `npm run test:smoke`: "Smoke test OK".
- `npm audit --audit-level=high`: 0 vulnerabilidades.

## Decisões técnicas

- **Contrato:** `id`, `name` e `description` foram mantidos; `implemented` passou a `true` somente após os testes passarem.
- **Validação:** a entrada precisa ser objeto; `valores` precisa ser array; todos os elementos precisam ser números finitos. Entradas inválidas lançam `Error` com mensagem clara.
- **Array vazio:** retorna `soma: 0`.
- **Imutabilidade:** a entrada não é modificada (uso de `reduce`).
- **Decimais:** a soma segue a aritmética de ponto flutuante do JavaScript (por exemplo, `0.1 + 0.2`), sem arredondamento.
- **ESLint:** única dependência de desenvolvimento adicionada. A configuração declara os globais do Node.js (`__dirname`, `URL`, etc.) porque `src/app.js` é código do projeto-base, que não foi alterado.
- **Smoke test:** `scripts/smoke.js` sobe o servidor real em uma porta dedicada e consulta a API.
- **Sem dependências de runtime extras:** a aplicação usa apenas recursos nativos do Node.js.

## Integração contínua (CI)

O workflow `.github/workflows/ci.yml` roda em `push` e `pull_request` e executa: `npm ci`, lint, testes, smoke test e auditoria de dependências.

## Docker

```bash
docker build --pull -t lab40:feature21 .
docker run -d --name lab40-container -p 3000:3000 lab40:feature21
curl http://localhost:3000/health
docker stop lab40-container && docker rm lab40-container
```

Para gerar o arquivo de entrega (não versionado no Git):

```bash
docker save lab40:feature21 -o lab40-feature21.tar
```

## Divergência registrada

O roteiro de Docker pede o teste da Feature 40 (`POST /api/features/40`). A funcionalidade atribuída a esta entrega é a 21. A Feature 40 pertence a outro módulo e responde HTTP 501 no repositório. Os testes de evidência foram feitos na Feature 21, e o `src/features/feature40.js` não foi alterado.

## Importante
Este repositório foi entregue sem testes automatizados, análise estática, workflow de CI, build ou configuração de deploy. Os elementos acima foram criados e justificados pelo estudante durante a avaliação.

O servidor escuta `process.env.PORT` e `0.0.0.0`, e a aplicação não persiste dados em disco.