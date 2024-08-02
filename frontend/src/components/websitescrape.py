import requests
from bs4 import BeautifulSoup

url = "https://terrasetclimate-old.webflow.io/"
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, "html.parser")
    print(soup.prettify())  # This prints the HTML content in a readable format
else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
