require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname,"./frontend/build")));

app.get('*',(req,res)=>{
   res.sendFile(path.join(__dirname,"./frontend/build/index.html"), function(err){
     res.status(500).send(err);
   });
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api",require("./routes/OrderData"));
app.use("/api",require("./routes/GetLocation"));


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
    // console.log(global.foodItems);
  });
});
