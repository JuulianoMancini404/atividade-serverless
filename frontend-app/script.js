const analyzeBtn = document.getElementById('analyzeBtn');
const resultDiv = document.getElementById('result');
const scoreElement = document.getElementById('score');
const salaryElement = document.getElementById('salary');
const coursesList = document.getElementById('coursesList');

analyzeBtn.addEventListener('click', async () => {
    const fileInput = document.getElementById('resumeFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Selecione um currículo.');
        return;
    }

    const text = await file.text();

    try {
        // 1. AWS Lambda
        const scoreResponse = await fetch('https://xzrf4xu7tfj6uibsshfforlgi40ckxvh.lambda-url.sa-east-1.on.aws/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resume_text: text })
        });
        const scoreData = await scoreResponse.json();
        scoreElement.innerText = scoreData.score;

        // 2. Azure Function (CORRIGIDO)
        const salaryResponse = await fetch('https://rh-calc-func1.azurewebsites.net/api/HttpTrigger?name=Candidato', {
            method: 'GET'
        });
        const salaryText = await salaryResponse.text();
        salaryElement.innerText = salaryText;

        // 3. GCP Function
        const coursesResponse = await fetch('https://us-central1-meu-rh-gcp.cloudfunctions.net/main', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                keywords_found: scoreData.keywords_found,
                score: scoreData.score
            })
        });
        const coursesData = await coursesResponse.json();
        
        coursesList.innerHTML = '';
        coursesData.courses.forEach(course => {
            const li = document.createElement('li');
            li.innerText = course;
            coursesList.appendChild(li);
        });

        resultDiv.classList.remove('d-none');
        resultDiv.classList.add('fade-in');
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao comunicar com os serviços cloud: ' + error.message);
    }
});