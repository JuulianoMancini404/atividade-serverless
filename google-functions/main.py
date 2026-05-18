from flask import jsonify
import json

COURSES = {
    "python": "Python para Backend e APIs",
    "aws": "AWS Cloud Practitioner",
    "docker": "Docker Essentials",
    "kubernetes": "Kubernetes Fundamentals",
    "react": "React Avançado",
    "node": "Node.js Completo",
    "sql": "SQL e Banco de Dados",
    "azure": "Microsoft Azure Fundamentals",
    "gcp": "Google Cloud Associate",
    "terraform": "Terraform Infrastructure as Code"
}



def suggest_courses(request):
    request_json = request.get_json()

    keywords_found = request_json.get('keywords_found', [])
    score = request_json.get('score', 0)

    suggested_courses = []

    for keyword, course in COURSES.items():
        if keyword not in keywords_found:
            suggested_courses.append(course)

    if score > 80:
        suggested_courses.append(
            'Arquitetura Multi-Cloud Avançada'
        )

    return jsonify({
        'courses': suggested_courses[:5]
    })