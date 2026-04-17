from flask import request, jsonify
from . import chatbot_bp
from groq import Groq
from db import Client

client = Groq(api_key="GROQ_API_KEY")

def get_customers_context():
    customers = Client.query.all()
    text = "Current customers in SmartCRM:\n"
    for c in customers:
        text += f"- {c.name} | {c.email} | {c.phone}\n"
    return text

@chatbot_bp.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")

    messages = [
        {"role": "system", "content": f"You are a helpful assistant for a CRM application called smartCRM. Here is the current data:\n{get_customers_context()}"},
        {"role": "user", "content": user_input}
    ]

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=messages
    )

    bot_response = response.choices[0].message.content

    return jsonify({"response": bot_response})

