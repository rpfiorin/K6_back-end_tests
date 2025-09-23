// Importações necessárias.
import { BASE_URL, ENDPOINTS } from './utils/urls.js'
import { BULK, LIMITS } from './utils/options.js'
import execution from 'k6/execution'
import http from 'k6/http'
import { check, sleep } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
  return {
    'reports/get_products.html': htmlReport(data),
  };
}

export const options = {
    vus: BULK.vu,
    duration: BULK.time,
    thresholds: {
        http_req_duration: LIMITS.req_duration,
        http_req_failed: LIMITS.req_failed
    }
}

// Código do teste (função principal)
export default () => {
    const url = `${BASE_URL}${ENDPOINTS.products}`

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const res = http.get(url, params)
    if (execution.scenario.iterationInTest === 0) {
        console.log('RETORNO DAS REQUISIÇÕES:', '\n' + res.body)
    }

    check(res, {
        'status da requisição é 200 (OK)': (r) => r.status === 200,
        'resposta contém produtos': (r) => r.body.includes('products')
    })

    // Think time
    sleep(1)
}