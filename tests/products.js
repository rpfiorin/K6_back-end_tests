// Importações necessárias.
import { BASE_URL, ENDPOINTS } from './utils/urls.js'
import { BULK } from './utils/load_config.js'
import execution from 'k6/execution'
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    vus: BULK.vu,
    duration: BULK.time,
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
        console.log('RETORNO DAS REQUISIÇÕES:', '\n'+res.body)
    }

    check(res, {
        'status da requisição é 200 (OK)': (r) => r.status === 200,
        'resposta contém produtos': (r) => r.body.includes('products')
    })

    // Tempo de espera (Think Time)
    sleep(1)
}