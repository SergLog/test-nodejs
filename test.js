const http = require("http");
 
http.createServer(function(request, response){
     
    response.setHeader("UserId", 12);
    response.setHeader("Content-Type", "text/html; charset=utf-8;");
    response.write("<h2>Привет, Андрей!</h2>");
    response.write("<img src=" + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6yDwN9MsSX7_ZJvb4sopKU_QfZRzvsd9-dGgaGZZcNKkV6R48Jg" + "</img>");
    response.end();
}).listen(process.env.PORT || 3000);
