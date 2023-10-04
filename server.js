import express from 'express';
import { checkerStart } from "./index.mjs";

const app = express();

process.on('uncaughtException', (err) => {
	console.log('예기치 못한 에러', err);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
     next();
 });


/* localhost:3000/ 접속시 나올 메시지 */
app.get("/", (request, response) => { 
  response.send(`<h1>코드짜는 문과녀</h1>`);
});

/* localhost:3000/main 접속시 나올 메시지 */
app.get("/main", (request, response) => {  
    
  var url = request.param('url') ;
  var html = 'URL확인';
    if (url!= undefined) {
       html = '';
      console.log(url);
      
      checkerStart(url).then(function (arr){
        
        arr.forEach(obj => {
          html += `<h1>${obj.url}</h1>`;
          html +=`<h2>${obj.status}</h2>`;
          html +=`<h3>${obj.pathname}</h3>`;
          html += '<br/>';
        });
  
        var toJson = JSON.stringify(arr);
  
        //response.send(html);
  
         response.json( JSON.parse(toJson));
      });
  
    } else {
      response.send(html);
    }

    
    
    
    
    
});

/* localhost:3000/ 혹은 localhost:3000/main 외의
get하지 않은 페이지 접속시 나올 메시지. */
app.use((request, response) => {
  response.send(`<h1>Sorry, page not found :(</h1>`);
});

/* 3000포트에서 서버 구동 */
app.listen(3000, () => {
  console.log("localhost:3000 에서 서버가 시작됩니다.");
});


