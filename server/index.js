// server/index.js
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get("/api", (req, res) => {
  res.json({message: "Hello from the server"});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
