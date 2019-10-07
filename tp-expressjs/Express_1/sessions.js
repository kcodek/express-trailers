/**
 * HTTP is stateless; in order to associate a request to any other request, you need a way to store user data between HTTP requests. 
 * Cookies and URL parameters are both suitable ways to transport data between the client and the server. 
 * But they are both readable and on the client side. Sessions solve exactly this problem. 
 * You assign the client an ID and it makes all further requests using that ID. 
 * Information associated with the client is stored on the server linked to this ID.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(cookieParser());

app.use(session({
    secret: "Shh, its a secret!",
    resave: true,
    saveUninitialized:true

}));

app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});
app.listen(3000);