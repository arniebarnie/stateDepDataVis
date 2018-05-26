import json
#from itertools import izip

def removeStuff(string):
    s= string.split(".")
    del s[0]
    return ".".join(s)
f = open("DiplomaticInfo.JSON", encoding='utf-8')
data = json.load(f)
for i in data:
    data[i] = removeStuff(data[i])
newd = sorted(data.items())
b = {}
for i in newd:
    b[i[0]] = i[1]
filer = open("NewDipInf.JSON","w",encoding='utf-8')
json.dump(b, filer)
