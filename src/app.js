require("dotenv").config();
const express = require("express");
const cors = require("cors");

const driverRoutes= require("./routes/driver.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Working");
});
app.use("/api/drivers",driverRoutes);


const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT${PORT}`);
})