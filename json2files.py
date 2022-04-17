from urllib.request import urlopen, urlretrieve
import json
import os
import sys

jsondict = {}

with open('feeds.json') as feedfile:
  data = json.load(feedfile)

for feed in data['feeds']:
   propertylocation = feed['propertyfolder']
   pdflocation = feed['pdffolder']
   #-##print('cont loc: '+propertylocation)
   url = feed['url']
   response = urlopen(feed['url'])  
   jsondict = json.loads(response.read())

   for key in jsondict:
     for lock in key:
        #-## print(key[lock])
        propfilename = propertylocation+key[lock]['ref']+'.md'
        pdffilename = pdflocation+key[lock]['ref']+'.md'
        #-##print('filename: '+filename)
        os.makedirs(os.path.dirname(propfilename), exist_ok=True)
        with open(propfilename, 'w') as f:
          #-##print('prop ref: '+key[lock]['ref'])
          f.write(json.dumps(key[lock], indent = 0))
        os.makedirs(os.path.dirname(pdffilename), exist_ok=True)
        with open(pdffilename, 'w') as f:
          #-##print('prop ref: '+key[lock]['ref'])
          key[lock]["sitemap_exclude"] = True
          key[lock].pop("maisons")
          f.write(json.dumps(key[lock], indent = 0))            

partialsfolder = "/workspace/layouts/partials/"
## fetch and save  alllocations
groupedbytownurl = 'https://mgh-props.appspot.com/getgroupedbytown'
locationsurl = "http://mgh-props.appspot.com/locations"
urlretrieve (groupedbytownurl,partialsfolder+"alllocations.html")

## fetch and save proprefs
proprefsurl = 'https://mgh-props.appspot.com/refs'
urlretrieve (proprefsurl, partialsfolder+"refs.html")
