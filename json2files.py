from urllib.request import urlopen
import json
import os
import sys

jsondict = {}

with open('feeds.json') as feedfile:
  data = json.load(feedfile)

for feed in data['feeds']:
   contentlocation = feed['folder']
   print('cont loc: '+contentlocation)
   url = feed['url']
   response = urlopen(feed['url'])  
   jsondict = json.loads(response.read())

   for key in jsondict:
     for lock in key:
        #-## print(key[lock])
        filename = contentlocation+key[lock]['ref']+'.md'
        print('filename: '+filename)
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        with open(filename, 'w') as f:
          print('prop ref: '+key[lock]['ref'])
          f.write(json.dumps(key[lock], indent = 0)) 
