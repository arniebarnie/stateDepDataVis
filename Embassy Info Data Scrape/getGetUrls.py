from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup
from bs4 import SoupStrainer

#http = urllib.Http()
response = uReq('https://history.state.gov/countries/all')
lost = []
for link in BeautifulSoup(response, parseOnlyThese=SoupStrainer('a')):
    if link.has_attr('href'):
        lost.append(link['href'])
