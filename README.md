<p align="center">
  <img src="./.github/logo.png" alt="poster">
</p>

# Testes de performance com K6 (Log in e Listagem de produtos - API dummyJSON)

## Preparação 📍
1. Primeiramente, clone este projeto com opção HTTPS ou SSH.
2. A automação foi desenvolvida em cima da última versão estável da ferramenta, logo, certifique-se de estar com esta versão em seu SO ou instale-a pelo diretório 'bin' (caso utilize Windows). Para linux, consulte o respectivo procedimento de acordo com a distribuição utilizada.

## Configuração 🏁
3. Considerando ambiente Windows, após instalado, abra o projeto no CMD e execute: _python -m venv .venv_, seguido de: _.venv\Scripts\activate_

 E depois de ativado o ambiente virtual: _pip install -r requirementes.txt_ (para baixar o playwright pra python) 
                                         seguido de _playwright install_ (para configurar as dependências do playwright).

## Execução ⚡
4. Confira a massa de teste que deseja ser utilizada (dados do cliente), no arquivo 'data/users.json'.

   Para executar de forma assistida: _pytest --browser=nome-browser-suportado_
   
   Para executar em modo headless: _pytest -o "addopts=" --browser=nome-browser-suportado_

5. Na pasta 'reports' temos os relatórios dos testes executados.
OBS: Toda a codificação do projeto foi comentada para fácil compreensão e documentação (exceto arquivos gerados automaticamente).


Enjoy it!