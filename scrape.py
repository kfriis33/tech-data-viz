from bs4 import BeautifulSoup
import requests
import csv

def scrape(filepath):
    file =  open(filepath, 'r')
    rows = csv.reader(file)

    descriptions = []

    for row in rows:
        url = row[1]
        if url != 'Name_URL':
            r = requests.get(url)
            soup = BeautifulSoup(r.content, 'html.parser')
            print(soup.prettify())
            desc = soup.find('div', class_='styles_description__34Ra7')
            print(desc)

            descriptions.append(desc.text)

    with open('data/allmarkets.txt', "w") as txt_file:   
        for line in descriptions:
            txt_file.write(line + "\n")

scrape('data/scraping_data/angel-allmarkets.csv')