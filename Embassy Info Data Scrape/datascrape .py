from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import re
import json
arrOfNames = []
f = open("DiplomaticInfo.JSON","w")
fils = open("countryList","r")
s = fils.readline()
mydict = {}
while s is not "" and s is not "none":
    arrOfNames.append(s)
    s = fils.readline()

for i in arrOfNames:
    myurl = 'https://history.state.gov/'.strip() + i.strip()
    #creating a connection with the site and grabbing the page
    uClient = uReq(myurl)
    pageHTML = uClient.read()
    uClient.close()
    page_soup = soup(pageHTML, "html.parser")
    #containers = page_soup.findAll("div",{"id":"diplomatic_relations"})
    containers = page_soup.findAll("div",{"class":"tei-div3"})
    comparaes = page_soup.findAll("div",{"id" : re.compile('diplomatic.*relations')})
    TAG_RE = re.compile(r'<[^>]+>')

    def remove_tags(text):
        return TAG_RE.sub('', text)
    try:
        if len(comparaes)>0:
            child = comparaes[0].children
            next(child)
            next(child)
            next(child)
            res = i.replace("/countries/","")
            mydict[res]=remove_tags(str(next(child)))
        else:
            print(i)
    except:
        print(i)

mydict = json.dump(mydict,f)
f.close()
fils.close()
