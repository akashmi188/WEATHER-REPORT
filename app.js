const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");

    })
    app.post("/",function(req,res){
      const query=req.body.cityname;
      const apikey="b4637e33b5573b4659238e086d97ee4a";
      const units="metric";
      const url="https://api.openweathermap.org/data/2.5/weather?q= " + query +"&appid="+ apikey + "&units=" + units;
      https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
          const weatherdata=JSON.parse(data)
          const temp=weatherdata.main.temp
          const weatherdescription=weatherdata.weather[0].description
          const icon=weatherdata.weather[0].icon
          const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
          res.write("<p>the sky is "+ weatherdescription +"<p>");
          res.write("<h1>The Temperature in "+query+" is "+temp+" degrees</h1>");
          res.write("<img src="+ imageURL +">");
          res.send();
    })
  })
});
app.listen(3000,function(){
  console.log("server is running on port 3000.");
});
