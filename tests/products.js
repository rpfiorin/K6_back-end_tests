// Importações necessárias para reprodução.
import { BASE_URL, ENDPOINTS } from './utils/urls.js'
import { BULK, LIMITS } from './utils/options.js'
import execution from 'k6/execution'
import http from 'k6/http'
import { check, sleep } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
  return {
    // Cria o arquivo de relatório na pasta 'reports' após execução.
    'reports/get_products.html': htmlReport(data),
  };
}

// Exporta um objeto que define como o teste de carga será executado.
export const options = {
  vus: BULK.vu,
  duration: BULK.time,
  // Define as condições de sucesso ou falha
  thresholds: {
    http_req_duration: LIMITS.req_duration,
    http_req_failed: LIMITS.req_failed
  }
}

export default () => {
  // Monta a URL completa da requisição interpolando a URL base com o endpoint de produtos.
  const url = `${BASE_URL}${ENDPOINTS.products}`

  const params = {
    headers: {
      // Cria um objeto de parâmetros para a requisição, incluindo os cabeçalhos.
      'Content-Type': 'application/json',
    },
  }

  // Executa uma requisição GET para a URL e armazena a resposta em 'res'.
  const res = http.get(url, params)
  if (execution.scenario.iterationInTest === 0) {
    // Imprime o corpo da resposta no console.
    console.log('RETORNO DAS REQUISIÇÕES:', '\n' + res.body)
  }

  check(res, {
    // Verifica se a resposta HTTP é de sucesso.
    'status da requisição é 200 (OK)': (r) => r.status === 200,
    // Verifica se o corpo da resposta contém a palavra 'products'.
    'resposta contém produtos': (r) => r.body.includes('products')
  })

  // Think time
  sleep(1)
}