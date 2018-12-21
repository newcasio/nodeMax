//create a server using node


//only import what is needed
const http =  require('http');
const fs = require('fs');


//createServer, first argument is a function which is run whenever a request is recd
const server = http.createServer((req,res)=>{

  //requested url; returns path, eg localhost:3000 returns /; 3000/new returns /new
  const url= req.url;
  //returns type of request
  const method= req.method;

  if (url==='/'){
    //This code below creating standard html form
    res.write('<html>');
    res.write('<head><title>User enter info</title></head>');
    res.write('<body><form action="/message" method="POST"><input name="message" type="text"><button type="submit">Send</button></form></body>')  //submit sends a POST request to /message,  sends user to localhost:3000/message becuase of form action
    res.write('</html>');
    return res.end(); //res.end tells node you are finished with the res object.  return used here so rest of code within createServer does not run
  }

  if (url==='/message' && method==='POST'){

    const body= [];
    //listen event, function run when data is recd, chunk is the data. data continuously streamed in smaller packets so you don't have to wait until the end to start using.
    req.on('data', (chunk)=>{
      console.log(chunk);
      body.push(chunk);
    });
    //listen when all the chunks have been recd and pushed onto body array
    return req.on('end', ()=>{
      //creates a string from form input resulting in key value pair of message = (inputed text).  key is message because input name is message in form.
      const parsedBody = Buffer.concat(body).toString();
       //split parsedBody on "=" and save content which is now element(1) in new array
      const message = parsedBody.split('=')[1];
      //use fs module to write to a new file (message.txt), with 'message' content.  If no error in writing file, then continue with redirect and end.
      fs.writeFile('message.text', message, (err)=>{
        res.statusCode = 302; //set status code to 302 which is redirect
        res.setHeader('Location', '/');  //define where to redirect to
        return res.end();
      });
    });
  };

  //setting the response to the request
  res.setHeader('Content-Type', 'text/html');   //set the content type in the header to html
  res.write('<html>');
  res.write('<head><title>First page</title></head>');
  res.write('<body><p>THis is where the text should go.</p></body>')
  res.write('</html>');
  res.end();  //tell node finished with res.
});



//listen to new server on port 3000
server.listen(3000);
