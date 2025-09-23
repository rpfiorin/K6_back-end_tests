<p align="center">
  <img src="./.github/logo.png" alt="poster">
</p>

# Testes de performance com K6 (Log in e Listagem de produtos - API dummyJSON)

## Preparação 📍
1. Primeiramente, clone este projeto com opção HTTPS ou SSH.
2. A automação foi desenvolvida em cima da última versão estável da ferramenta, logo, certifique-se de estar com ela presente seu SO ou instale-a pelo diretório 'bin' (caso utilize Windows). Para linux, consulte o respectivo procedimento de acordo com a distribuição utilizada.

## Configuração 🏁
3. Considerando ambiente Windows, após instalado, abra o arquivo 'utils/options.js' para escolher a volumetria desejada/tempo de execução e limites.

## Execução ⚡
4. Com o CMD aberto no diretório raíz do projeto, dispare o comando _k6 run tests/login.js_ ou _k6 run tests/products.js_ 

5. Na pasta 'reports' temos os relatórios dos testes executados previamente com valores de 'options.js' já testados.

OBS: Toda a codificação do projeto foi comentada para fácil compreensão e documentação.


Enjoy it!