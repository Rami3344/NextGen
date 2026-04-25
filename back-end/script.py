import requests
import random
import string

URL = "http://127.0.0.1:3001/client"

def random_name():
    return "User_" + ''.join(random.choices(string.ascii_letters, k=5))

def random_email(i):
    return f"user{i}@test.com"

def random_phone(i):
    return f"{50000000 + i}" 
for i in range(20):
    payload = {
        "name": random_name(),
        "email": random_email(i),
        "phone": random_phone(i)
    }

    r = requests.post(URL, json=payload)

    if r.headers.get("Content-Type", "").startswith("application/json"):
        print(i+1, r.status_code, r.json())
    else:
        print(i+1, r.status_code, r.text)