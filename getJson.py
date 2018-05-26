import json
import requests

f = open('data.txt','r')

data = {};
url = "https://maps.googleapis.com/maps/api/geocode/json?address="
key = "&key=AIzaSyBLJhQHcguQ-zG98Ai_J4HmSBIgzKse2vI"

i = 0
for line in f.readlines():
    ls = line.split(' ')
    #print(ls)
    if ls[2] == "NONE\n":
        continue

    ls[2] = ls[2][:-1]

    """
    r = requests.get(url + ls[0] + key)
    x = json.load(r.text)
    #print(r.text["results"][0]["geometry"]["location"])
    print(type(r.text))
    """
    data[i] = {"country": ls[0], "year": int(ls[1]), "loc":ls[2]}
    i += 1
    

#print(data)
json_data = json.dumps(data)

f.close()

f = open('data.json','w')
f.write(json_data)
f.close()
