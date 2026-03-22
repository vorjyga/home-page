import requests

TELEGRAM_TOKEN = "8728891897:AAESpAV1qoPZWh2kvxu1XaA8iugiC1rmUAI"
TELEGRAM_CHAT_ID = "1466409"


def send_telegram(name, email, message):
    text = f"📩 Новое сообщение!\n\n👤 {name}\n📧 {email}\n\n💬 {message}"
    requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
        json={"chat_id": TELEGRAM_CHAT_ID, "text": text})


def handle_webhook(data):
    message = data.get("message", {})
    text = message.get("text", "")
    from_user = message.get("from", {})

    username = from_user.get("username", "")
    first_name = from_user.get("first_name", "")
    user_id = from_user.get("id", "")

    if text:
        forward_text = f"📨 Сообщение боту\n\n👤 {first_name} (@{username}, id: {user_id})\n\n💬 {text}"
        requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": forward_text})