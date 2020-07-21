## demands-csv

"demands-csv" é um _script_ que exporta um arquivo CSV contendo todos os pedidos pagos (após o fechamento das vendas).

## 🤔 Como Rodar

- Na pasta _demands-csv_, renomeie o arquivo _`.env.example`_ para _`.env`_;
- Em seguida, preencha todas as variáveis de ambiente no arquivo _`.env`_;
- Após preencher as variáveis de ambiente, instale as dependências com o comando `yarn install` ou com seu gerenciador de pacotes de preferência;
- Inicie o _script_ com o comando `yarn start`;
- Após executado, dois arquivos CSV serão gerados na pasta _demands-csv/output_:
  -  **_demands.csv_**: contém todos os pedidos pagos;
  - **_dataset.csv_**: contém todas as peças individuais de pedidos pagos (para criar tabela dinâmica em planilhas).

---

Feito por _[Dominick Brasileiro](https://www.linkedin.com/in/dominickbrasileiro/)_ 💎
