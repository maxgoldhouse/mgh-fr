const https = require('https');

exports.handler = async (event) => {
  const data = decodeURIComponent(event.queryStringParameters.data);
  //const data = event.queryStringParameters.data
  const url = `https://script.google.com/macros/s/AKfycbyoYRKHQDEUF7JMb23bRtFdZzCJtyVW8YIsFyQ1_bdP29bos0LAPmSBRtTNISucnEHJuw/exec?data=${data}`;

  https.get(url, (res) => {
    // Handle response if needed
    console.log(`statusCode: ${res.statusCode}`);
  }).on('error', (error) => {
    console.error(error);
  });
};