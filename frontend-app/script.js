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
        // AWS Lambda
        const scoreResponse = await fetch('https://SEU-ENDPOINT-AWS.amazonaws.com/default/resume-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                resume_text: text
            })
        });

        const scoreData = await scoreResponse.json();

        // Azure Function
        const salaryResponse = await fetch('https://SEU-ENDPOINT-AZURE/api/salary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                score: scoreData.score
            })
        });

        const salaryData = await salaryResponse.json();

        // Google Function
        const coursesResponse = await fetch('https://SEU-ENDPOINT-GOOGLE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keywords_found: scoreData.keywords_found,
                score: scoreData.score
            })
        });

        const coursesData = await coursesResponse.json();

        scoreElement.innerText = scoreData.score;
        salaryElement.innerText = salaryData.salary_range;

        coursesList.innerHTML = '';

        coursesData.courses.forEach(course => {
            const li = document.createElement('li');
            li.innerText = course;
            coursesList.appendChild(li);
        });

        resultDiv.style.display = 'block';

    } catch (error) {
        console.error(error);
        alert('Erro ao comunicar com os serviços cloud.');
    }
});