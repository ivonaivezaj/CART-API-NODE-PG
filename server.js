const express = require("express");
const app = express();
const port = 3000;
const routes = require("./cart-item-routes");


app.use("/api", routes);
 
app.listen(port, () => console.log(`Listening on port: ${port}.`));
