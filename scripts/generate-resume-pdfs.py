"""Print both CV pages to PDF using their real browser layout."""

import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import time
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "public" / "pdf"
HOST = "127.0.0.1"
PORT = 4322
BASE_URL = f"http://{HOST}:{PORT}"
PDF_FILENAMES = {
    "frontend": "cv-Pavel-Novaikin-senior-frontend.pdf",
    "fullstack": "cv-Pavel-Novaikin-senior-fullstack.pdf",
}


def find_chrome():
    candidates = [
        os.environ.get("CHROME_BIN"),
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        shutil.which("google-chrome"),
        shutil.which("google-chrome-stable"),
        shutil.which("chromium"),
        shutil.which("chromium-browser"),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).is_file():
            return candidate
    raise RuntimeError(
        "Chrome or Chromium was not found. Install it or set CHROME_BIN to its executable."
    )


def wait_for_server(process):
    deadline = time.monotonic() + 30
    while time.monotonic() < deadline:
        if process.poll() is not None:
            raise RuntimeError("Astro stopped before the development server was ready.")
        try:
            with urlopen(f"{BASE_URL}/frontend/", timeout=1) as response:
                if response.status == 200:
                    return
        except Exception:
            time.sleep(0.15)
    raise RuntimeError("Timed out waiting for the Astro development server.")


def print_pdf(chrome, profile, user_data_dir, temporary_output):
    target = temporary_output / PDF_FILENAMES[profile]
    process = subprocess.Popen(
        [
            chrome,
            "--headless=new",
            "--disable-gpu",
            "--disable-extensions",
            "--disable-background-networking",
            "--hide-scrollbars",
            "--no-first-run",
            "--no-pdf-header-footer",
            f"--user-data-dir={user_data_dir / profile}",
            f"--print-to-pdf={target}",
            f"{BASE_URL}/{profile}/",
        ],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        deadline = time.monotonic() + 30
        previous_size = -1
        stable_since = None
        while time.monotonic() < deadline:
            size = target.stat().st_size if target.exists() else 0
            if size > 0 and size == previous_size:
                stable_since = stable_since or time.monotonic()
                if time.monotonic() - stable_since >= 0.5:
                    break
            else:
                stable_since = None
            previous_size = size
            if process.poll() is not None and size == 0:
                raise RuntimeError(f"Chrome did not create {target.name}.")
            time.sleep(0.1)
        else:
            raise RuntimeError(f"Timed out printing {target.name}.")
    finally:
        if process.poll() is None:
            process.terminate()
            try:
                process.wait(timeout=3)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait()

    destination = OUTPUT / target.name
    target.replace(destination)
    print(destination.relative_to(ROOT))


def main():
    chrome = find_chrome()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    server = subprocess.Popen(
        [
            str(ROOT / "node_modules" / ".bin" / "astro"),
            "dev",
            "--host",
            HOST,
            "--port",
            str(PORT),
        ],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.STDOUT,
    )
    try:
        wait_for_server(server)
        with tempfile.TemporaryDirectory(prefix="resume-pdf-") as temp_dir:
            temp = Path(temp_dir)
            user_data = temp / "chrome-profile"
            pdf_output = temp / "output"
            pdf_output.mkdir()
            print_pdf(chrome, "frontend", user_data, pdf_output)
            print_pdf(chrome, "fullstack", user_data, pdf_output)
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()
            server.wait()


if __name__ == "__main__":
    main()
