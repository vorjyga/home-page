from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import requests
import os

app = Flask(__name__, static_folder="static")

DB_PATH = os.environ.get("DB_PATH", "data/submissions.db")


def get_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS submissions (
                id        INTEGER PRIMARY KEY AUTOINCREMENT,
                name      TEXT    NOT NULL,
                email     TEXT    NOT NULL,
                message   TEXT    NOT NULL,
                created_at TEXT   NOT NULL DEFAULT (datetime('now'))
            )
        """)

TELEGRAM_TOKEN = "8728891897:AAESpAV1qoPZWh2kvxu1XaA8iugiC1rmUAI"
TELEGRAM_CHAT_ID = "1466409"
def send_telegram(name, email, message):
    text = f"📩 Новое сообщение!\n\n👤 {name}\n📧 {email}\n\n💬 {message}"
    requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
        json={"chat_id": TELEGRAM_CHAT_ID, "text": text})


@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.route("/api/submit", methods=["POST"])
def submit():
    data = request.get_json()

    name    = data.get("name", "").strip()
    email   = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"ok": False, "error": "Заполните все поля"}), 400

    with get_db() as conn:
        conn.execute(
            "INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)",
            (name, email, message)
        )

    return jsonify({"ok": True})


if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=False)
