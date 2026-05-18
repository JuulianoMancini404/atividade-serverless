import logging
import azure.functions as func
import json


def calculate_salary(score):
    if score < 30:
        return 'R$ 2.000 - R$ 3.000'
    elif score < 60:
        return 'R$ 4.000 - R$ 6.000'
    elif score < 90:
        return 'R$ 7.000 - R$ 10.000'
    else:
        return 'R$ 12.000+'



def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        body = req.get_json()
        score = body.get('score', 0)

        salary_range = calculate_salary(score)

        return func.HttpResponse(
            json.dumps({
                'salary_range': salary_range
            }),
            mimetype='application/json',
            status_code=200,
            headers={
                'Access-Control-Allow-Origin': '*'
            }
        )

    except Exception as e:
        return func.HttpResponse(str(e), status_code=500)