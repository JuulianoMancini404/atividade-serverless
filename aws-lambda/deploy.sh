zip function.zip lambda_function.py

aws lambda update-function-code \
  --function-name resume-score \
  --zip-file fileb://function.zip