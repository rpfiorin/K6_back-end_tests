// Importações necessárias para reprodução.
import { BASE_URL, ENDPOINTS } from './utils/urls.js'
import { BULK, LIMITS } from './utils/options.js'
import http from 'k6/http'
import execution from 'k6/execution'
import { SharedArray } from 'k6/data'
import { check, sleep } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
  return {
    // Cria o arquivo de relatório na pasta 'reports' após execução.
    'reports/post_login.html': htmlReport(data),
  };
}

const users = new SharedArray('usuários', () => {
  // Define corpo da requisição, convertendo o objeto JS para uma string JSON
  return JSON.parse(open('./data/payload_login.json'))
})

// Exporta um objeto que define como o teste de carga será executado.
export const options = {
  iterations: users.length,
  vus: BULK.vu,
  duration: BULK.time,
  // Define as condições de sucesso ou falha
  thresholds: {
    http_req_duration: LIMITS.req_duration,
    http_req_failed: LIMITS.req_failed
  }
}

export default () => {
  // atribui cada iteração de execução a um usuário diferente do array
  const index = execution.scenario.iterationInTest
  const currentUser = users[index]
  // Monta a URL completa da requisição interpolando a URL base com o endpoint de produtos.
  const url = `${BASE_URL}${ENDPOINTS.login}`

  const payload = JSON.stringify({
    // Atribui no body os dados do usuário atual da massa de teste percorrida.
    username: currentUser.username,
    password: currentUser.password,
    expiresInMins: 1,
  })

  const params = {
    headers: {
      // Cria um objeto de parâmetros para a requisição, incluindo os cabeçalhos.
      'Content-Type': 'application/json',
    },
  }

  // Executa uma requisição POST para a URL e armazena a resposta em 'res', imprimindo token obtido.
  const res = http.post(url, payload, params)
  console.log(`[Iteração ${index}] - Autenticando com o usuário: ${currentUser.username}`)
  console.log('Token recebido:', res.json('accessToken'))

  check(res, {
    // Verifica se a resposta HTTP é de sucesso.
    'status da requisição é 200 (OK)': (r) => r.status === 200,
    // Verifica se o corpo da resposta contém a palavra 'accessToken'.
    'resposta contém token de acesso': (r) => r.body.includes('accessToken'),
    // Verifica se o conteúdo de username do arquivo JSON corresponde ao retorno da API
    'nomes de usuário na resposta estão corretos': (r) => r.json('username') === currentUser.username,
  })

  // Think time
  sleep(1)
}