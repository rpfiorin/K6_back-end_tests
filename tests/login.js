// Importações necessárias.
import { BASE_URL, ENDPOINTS } from './utils/urls.js'
import { BULK, LIMITS } from './utils/options.js'
import http from 'k6/http'
import execution from 'k6/execution'
import { SharedArray } from 'k6/data'
import { check, sleep } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
  return {
    'reports/post_login.html': htmlReport(data),
  };
}

// Define corpo da requisição, convertendo o objeto JavaScript para uma string JSON
const users = new SharedArray('usuários', () => {
  return JSON.parse(open('./data/payload_login.json'))
})

export const options = {
  iterations: users.length,
  vus: BULK.vu,
  duration: BULK.time,
  thresholds: {
    http_req_duration: LIMITS.req_duration,
    http_req_failed: LIMITS.req_failed
  }
}

// Código do teste (função principal)
export default () => {
  const index = execution.scenario.iterationInTest
  const currentUser = users[index]

  const url = `${BASE_URL}${ENDPOINTS.login}`

  const payload = JSON.stringify({
    username: currentUser.username,
    password: currentUser.password,
    expiresInMins: 1,
  })

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  console.log(`[Iteração ${index}] - Autenticando com o usuário: ${currentUser.username}`)
  const res = http.post(url, payload, params)

  check(res, {
    'status da requisição é 200 (OK)': (r) => r.status === 200,
    'resposta contém token de acesso': (r) => r.body.includes('accessToken'),
    'nomes de usuário na resposta estão corretos': (r) => r.json('username') === currentUser.username,
  })

  console.log('Token recebido:', res.json('accessToken'))

  // Think time
  sleep(1)
}