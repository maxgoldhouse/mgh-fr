const fs      = require('fs');
const fetch   = require('node-fetch');

module.exports = {
  async onPreBuild({ inputs, utils }) {
    // Gather the data from all the specified feeds
    for (const feed of inputs.feeds) {
      // folder to store the md files
      let dataFilePath = `${inputs.contentdirectory}/${feed.name}/`;
        var data = await fetch(feed.url)
          .then(async function(res) {
              return res.json();
            }
          );
      // NOW we have to cycle through the returned json and write each item from the json array to it's own md file
      for (var key in data) {
        var value = data[key];
        for (var lock in value){
             var innervalue = value[lock]
             fs.writeFile(dataFilePath+innervalue.slug+'.md', JSON.stringify(innervalue)+'\n', err => {
                if (err) {
                  console.error(err)
                  return
                }
              //console.log('(file'+ innervalue.ref+'.md written successfully');
             })
          }
        }
      }
      // fetch the locations and store them in layouts/partials/locations.html
         let partialsFilePath = `${inputs.partialsdirectory}/`;
         fetch('https://mgh-props.appspot.com/getgroupedbytown').then(function(response) {
          return response.text();
           }).then(function(string) {
           console.log(string);
          fs.writeFile(partialsFilePath+'alllocations.html', string, err => {
            if (err) {
              console.error(err)
              return
            }
          console.log('alllocations.html written successfully');
          })
      }).catch(function(err) {  
          console.log('Fetch Error', err);  
      });
    }
}

          