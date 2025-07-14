import requests
import time
import os

os.makedirs("data/fake", exist_ok=True)

def download_face(i):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
        }
        response = requests.get("https://thispersondoesnotexist.com", headers=headers, timeout=10)
        if response.status_code == 200:
            with open(f"data/fake/fake_{i}.jpg", "wb") as f:
                f.write(response.content)
            print(f"✅ saved fake face #{i}")
        else:
            print(f"⚠️ failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ error on image #{i}: {e}")

# download 200 fake faces
for i in range(200):
    path = f"data/fake/fake_{i}.jpg"
    if os.path.exists(path):
        continue  # skip if already downloaded
    download_face(i)
    time.sleep(3.0)  # conservative delay
