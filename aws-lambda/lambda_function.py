import json

KEYWORDS = {
    "python": 15,
    "aws": 20,
    "docker": 10,
    "kubernetes": 15,
    "react": 10,
    "node": 10,
    "sql": 10,
    "azure": 20,
    "gcp": 20,
    "terraform": 15
}


def lambda_handler(event, context):
    body = json.loads(event['body'])

    resume_text = body.get('resume_text', '').lower()

    score = 0
    found_keywords = []

    for keyword, points in KEYWORDS.items():
        if keyword in resume_text:
            score += points
            found_keywords.append(keyword)

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'score': score,
            'keywords_found': found_keywords
        })
    }