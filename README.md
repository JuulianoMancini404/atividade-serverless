# SaaS de RH - Gestão de Talentos

Sistema distribuído de **Gestão de Talentos** baseado em arquitetura **Serverless Multi-Cloud**, utilizando serviços da **AWS**, **Microsoft Azure** e **Google Cloud Platform**.

O projeto integra três funções independentes hospedadas em diferentes provedores de nuvem e conectadas por um frontend único hospedado em serviço de **Static Web Hosting**.

---

# Objetivo do Projeto

Desenvolver uma solução SaaS de RH capaz de:

- Validar currículos automaticamente
- Calcular salário líquido
- Sugerir treinamentos para candidatos
- Demonstrar integração entre múltiplas clouds
- Implementar tolerância a falhas (fallback)
- Aplicar conceitos de computação distribuída e serverless

---

# Arquitetura da Solução

```text
                +----------------------+
                |   Frontend Web App   |
                | (HTML + JavaScript)  |
                +----------+-----------+
                           |
        -------------------------------------------------
        |                     |                        |
        v                     v                        v

+----------------+   +----------------+   +----------------------+
| AWS Lambda     |   | Azure Function |   | Google Cloud Function|
| Validador CV   |   | Salário Líquido|   | Sugestão Treinamento |
+----------------+   +----------------+   +----------------------+
```

---

# Funcionalidades

## 1. AWS Lambda - Validador de Currículo

Analisa palavras-chave presentes no currículo do candidato e gera uma pontuação baseada em aderência à vaga.

### Entrada

```json
{
  "curriculo": "JavaScript AWS Docker React Node.js"
}
```

### Saída

```json
{
  "pontuacao": 85
}
```

### Tecnologias

- AWS Lambda
- API Gateway
- Node.js

---

## 2. Azure Function - Calculadora de Salário Líquido

Recebe um salário bruto e retorna o valor líquido após descontos simulados.

### Entrada

```json
{
  "salarioBruto": 5000
}
```

### Saída

```json
{
  "salarioLiquido": 4120,
  "descontos": 880
}
```

### Tecnologias

- Azure Functions
- HTTP Trigger
- JavaScript / C#

---

## 3. Google Cloud Function - Sugestão de Treinamento

Com base na pontuação do currículo, retorna cursos recomendados para desenvolvimento profissional.

### Entrada

```json
{
  "pontuacao": 60
}
```

### Saída

```json
{
  "cursos": [
    "Docker Fundamentals",
    "AWS Cloud Practitioner",
    "Node.js Avançado"
  ]
}
```

### Tecnologias

- Google Cloud Functions
- HTTP Functions
- Node.js

---

# Frontend Integrado

O frontend funciona como painel principal do sistema.

## Responsabilidades

- Enviar dados para as 3 funções simultaneamente
- Exibir os resultados em uma interface única
- Tratar erros individualmente
- Implementar fallback de serviços

---

# Resiliência (Fallback)

Caso um dos provedores fique indisponível:

- O frontend continua funcionando
- Apenas o módulo afetado exibe:

```text
Serviço Indisponível
```

Isso garante maior tolerância a falhas e melhor experiência para o usuário.

---

# Deploy Multi-Cloud

## AWS

- AWS Lambda
- API Gateway
- CORS habilitado

## Azure

- Azure Functions
- HTTP Trigger
- CORS habilitado

## Google Cloud

- Google Cloud Functions
- HTTP Public Invocation
- CORS habilitado

---

# Hospedagem do Frontend

O frontend pode ser hospedado em:

- AWS S3 Static Website Hosting
- Azure Static Web Apps
- Google Firebase Hosting

---

# Estrutura do Projeto

```text
project/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── aws-lambda/
│   └── index.js
│
├── azure-function/
│   └── index.js
│
├── gcp-function/
│   └── index.js
│
└── README.md
```

---

# Fluxo da Aplicação

1. Usuário envia currículo e salário bruto
2. Frontend chama:
   - AWS Lambda → pontuação do currículo
   - Azure Function → salário líquido
3. Resultado da pontuação é enviado para:
   - Google Cloud Function → cursos recomendados
4. Dados são exibidos no dashboard

---

# Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- AWS Lambda
- API Gateway
- Azure Functions
- Google Cloud Functions
- Firebase Hosting / S3 / Azure Static Web Apps

---

# Configuração de CORS

Todos os endpoints devem permitir:

```http
Access-Control-Allow-Origin: *
```

Exemplo:

```javascript
headers: {
  "Access-Control-Allow-Origin": "*"
}
```

---

# Objetivos Acadêmicos

Este projeto demonstra:

- Arquitetura Multi-Cloud
- Computação Serverless
- APIs HTTP
- Integração distribuída
- Resiliência de sistemas
- Frontend desacoplado
- Deploy em nuvem

---

# Melhorias Futuras

- Banco de dados para candidatos
- Autenticação JWT
- Dashboard administrativo
- IA para análise de currículo
- Integração com LinkedIn
- Deploy automatizado com CI/CD

---

# Autores

Projeto acadêmico desenvolvido para prática de:

- Cloud Computing
- Arquitetura Distribuída
- Serverless Computing
- Integração Multi-Cloud

---

# Licença

Este projeto é apenas para fins educacionais.
