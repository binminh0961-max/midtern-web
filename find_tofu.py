import urllib.request
import json

url = "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=tofu+tomato&format=json"
req = urllib.request.Request(url, headers={"User-Agent": "CookAndShareBot/1.0 (contact@example.com)"})
try:
    with urllib.request.urlopen(req, timeout=5) as resp:
        data = json.loads(resp.read().decode())
        for item in data['query']['search']:
            print(item['title'])
except Exception as e:
    print("Error:", e)
