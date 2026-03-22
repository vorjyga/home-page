from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import os
from telegram_bot import send_telegram, handle_webhook

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
        

def increment_visit():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS visits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                visited_at TEXT NOT NULL DEFAULT (datetime('now'))
            )
        """)
        conn.execute("INSERT INTO visits (visited_at) VALUES (datetime('now'))")

def get_visit_count():
    with get_db() as conn:
        count = conn.execute("SELECT COUNT(*) FROM visits").fetchone()[0]
    return count


@app.route("/api/visits")
def visits():
    return jsonify({"count": get_visit_count()})

@app.route("/")
def index():
    increment_visit()
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
    
    send_telegram(name, email, message)

    return jsonify({"ok": True})

@app.route("/api/telegram/webhook", methods=["POST"])
def telegram_webhook():
    handle_webhook(request.get_json())
    return jsonify({"ok": True})


if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=False)
