const express = require("express");
const bodyParser = require("body-parser");
const expressHbs=require("express-handlebars");
const path=require("path");
const teachersRouter = require("./routers/teachersRouter");
const teacherRouter = require("./routers/teacherRouter");
const teachers=require("./models/teachers");
const formatIndex=require("./views/helpers/formatIndex");
const app = express();
const hbs=expressHbs.create({
  extname:".hbs",
  layoutsDir: path.join(__dirname,"./views/layouts"),
  partialsDir:path.join(__dirname,"./views/partials"),
  helpers:{
    formatIndex
  }
});
app.engine(".hbs",hbs.engine);
app.set("view engine",".hbs");
app.set("views",path.join(__dirname,"./views"));
app.use(bodyParser.json());
app.get("/",(request,response)=>{
  response.render("home",{
    layout:"hero",
    pageTitle:"Home",
  });
});
app.get("/web/teachers",(request,response)=>{
  response.render("teachers",{
    layout:"navigation",
    pageTitle:"Teachers",
    teachers
  })
})
app.use("/teachers", teachersRouter);
app.use("/teacher", teacherRouter);
const server=app.listen(8080, (request, response) => {
  console.log(`Server running on port ${server.address().port}.`)
});