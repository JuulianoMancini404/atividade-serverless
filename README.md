# SaaS de RH - Gestão de Talentos

Sistema distribuído de **Gestão de Talentos** baseado em arquitetura **Serverless Multi-Cloud**, utilizando serviços da **AWS**, **Microsoft Azure** e **Google Cloud Platform**.

O projeto integra três funções independentes hospedadas em diferentes provedores de nuvem e conectadas por um frontend único hospedado em serviço de **Static Web Hosting**.

---

# Objetivo do Projeto

Desenvolver uma solução SaaS de RH capaz de:

- Validar currículos automaticamente
- Analisar palavras-chave técnicas
- Calcular pontuação profissional
- Estimar faixa salarial
- Sugerir treinamentos personalizados
- Demonstrar integração entre múltiplas clouds
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
| Validador CV   |   | Estimativa     |   | Sugestão de Cursos   |
| Pontuação      |   | Salarial       |   | Baseado em Skills    |
+----------------+   +----------------+   +----------------------+
```

---

# Funcionalidades

## 1. AWS Lambda - Validador de Currículo

Analisa palavras-chave presentes no currículo do candidato e gera uma pontuação baseada em aderência técnica.

### Entrada

```json
{
  "resume_text": "Python AWS Docker React Terraform Kubernetes"
}
```

### Saída

```json
{
  "score": 80,
  "keywords_found": [
    "python",
    "aws",
    "docker",
    "react",
    "terraform",
    "kubernetes"
  ]
}
```

### Tecnologias

- AWS Lambda
- API Gateway
- Python 3.11
- REST API

### Palavras-chave Avaliadas

| Skill | Pontuação |
|---|---|
| Python | 15 |
| AWS | 20 |
| Azure | 20 |
| GCP | 20 |
| Docker | 10 |
| Kubernetes | 15 |
| Terraform | 15 |
| React | 10 |
| Node.js | 10 |
| SQL | 10 |

---

## 2. Azure Function - Estimativa Salarial

Recebe a pontuação do currículo e retorna uma estimativa de faixa salarial.

### Entrada

```json
{
  "score": 80
}
```

### Saída

```json
{
  "salary_range": "R$ 7.000 - R$ 10.000"
}
```

### Tecnologias

- Azure Functions
- HTTP Trigger
- Python
- REST API

### Regras de Faixa Salarial

| Pontuação | Faixa |
|---|---|
| 0 - 29 | R$ 2.000 - R$ 3.000 |
| 30 - 59 | R$ 4.000 - R$ 6.000 |
| 60 - 89 | R$ 7.000 - R$ 10.000 |
| 90+ | R$ 12.000+ |

---

## 3. Google Cloud Function - Sugestão de Treinamentos

Com base nas palavras-chave ausentes e na pontuação, o sistema sugere cursos específicos para evolução profissional.

### Entrada

```json
{
  "keywords_found": [
    "python",
    "docker"
  ],
  "score": 40
}
```

### Saída

```json
{
  "courses": [
    "AWS Cloud Practitioner",
    "Terraform Infrastructure as Code",
    "Kubernetes Fundamentals",
    "React Avançado"
  ]
}
```

### Tecnologias

- Google Cloud Functions
- Flask
- Python 3.11
- REST API

### Cursos Disponíveis

| Skill Ausente | Curso Recomendado |
|---|---|
| AWS | AWS Cloud Practitioner |
| Azure | Microsoft Azure Fundamentals |
| GCP | Google Cloud Associate |
| Docker | Docker Essentials |
| Kubernetes | Kubernetes Fundamentals |
| Terraform | Terraform Infrastructure as Code |
| React | React Avançado |
| Node.js | Node.js Completo |
| SQL | SQL e Banco de Dados |

---

# Frontend Integrado

O frontend funciona como painel principal do sistema.

## Responsabilidades

- Upload do currículo (.txt)
- Leitura do conteúdo do arquivo
- Comunicação com múltiplas clouds
- Exibição de pontuação
- Exibição da faixa salarial
- Exibição dos cursos recomendados
- Tratamento de erros individuais

---

# Estrutura do Projeto

```text
project-root/
│
├── aws-lambda/
│   ├── lambda_function.py
│   ├── requirements.txt
│   └── deploy.sh
│
├── azure-functions/
│   ├── SalaryFunction/
│   │   ├── __init__.py
│   │   ├── function.json
│   │   └── requirements.txt
│   │
│   └── host.json
│
├── google-functions/
│   ├── main.py
│   ├── requirements.txt
│   └── deploy.sh
│
├── frontend-app/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

# Fluxo da Aplicação

1. Usuário realiza upload do currículo
2. Frontend lê o conteúdo do arquivo `.txt`
3. Frontend envia o currículo para AWS Lambda
4. AWS Lambda:
   - Analisa palavras-chave
   - Calcula pontuação
   - Retorna skills encontradas
5. Frontend envia a pontuação para Azure Function
6. Azure Function retorna faixa salarial
7. Frontend envia score + skills para Google Cloud Function
8. Google retorna cursos recomendados
9. Dashboard exibe todos os resultados

---

# Frontend

## Tecnologias

- HTML5
- CSS3
- JavaScript Vanilla

## Interface

O frontend possui:

- Upload de currículo
- Dashboard de análise
- Exibição dinâmica de resultados
- Interface responsiva
- Comunicação assíncrona via Fetch API

---

# Configuração de Endpoints

No arquivo:

```text
/frontend-app/script.js
```

Substituir os endpoints:

```javascript
https://SEU-ENDPOINT-AWS.amazonaws.com/default/resume-score

https://SEU-ENDPOINT-AZURE/api/salary

https://SEU-ENDPOINT-GOOGLE
```

Pelos endpoints reais publicados.

---

# Deploy Multi-Cloud

## AWS Lambda

### Requisitos

- AWS CLI
- Conta AWS

### Configuração

```bash
aws configure
```

### Deploy

```bash
cd aws-lambda

chmod +x deploy.sh

./deploy.sh
```

---

## Azure Functions

### Requisitos

```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

### Login

```bash
az login
```

### Deploy

```bash
cd azure-functions

func azure functionapp publish NOME_DA_APP
```

---

## Google Cloud Functions

### Requisitos

- Google Cloud SDK

### Login

```bash
gcloud auth login
```

### Selecionar Projeto

```bash
gcloud config set project ID_DO_PROJETO
```

### Deploy

```bash
cd google-functions

chmod +x deploy.sh

./deploy.sh
```

---

# Configuração de CORS

Todos os endpoints devem permitir:

```http
Access-Control-Allow-Origin: *
```

Exemplo:

```python
headers = {
    "Access-Control-Allow-Origin": "*"
}
```

---

# Hospedagem do Frontend

O frontend pode ser hospedado em:

- AWS S3 Static Website Hosting
- Azure Static Web Apps
- Google Firebase Hosting
- Netlify
- Vercel

---

# Tecnologias Utilizadas

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Python 3.11
- Flask
- APIs REST

## Cloud Computing

- AWS Lambda
- API Gateway
- Azure Functions
- Google Cloud Functions

---

# Objetivos Acadêmicos

Este projeto demonstra:

- Arquitetura Multi-Cloud
- Computação Serverless
- APIs REST
- Integração distribuída
- Frontend desacoplado
- Comunicação entre provedores cloud
- SaaS distribuído
- Deploy em nuvem
- Escalabilidade serverless

---

# Melhorias Futuras

- Upload de PDF
- Upload DOCX
- OCR para imagens
- Inteligência Artificial para análise semântica
- Banco de dados de candidatos
- Login JWT
- Dashboard administrativo
- Integração LinkedIn
- CI/CD automatizado
- Monitoramento centralizado
- Logs distribuídos
- Dockerização completa

---

# Autores

Projeto acadêmico desenvolvido para prática de:

- Cloud Computing
- Arquitetura Distribuída
- Serverless Computing
- Integração Multi-Cloud
- SaaS Architecture

---
# Link 
http://frontend-saas-daniel.s3-website-sa-east-1.amazonaws.com/

# Licença

Este projeto é apenas para fins educacionais.
