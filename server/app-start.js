require("dotenv").config({ path: "variables.env" });
const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

// import all models
require("./models/ShortUrlModel");
require("./user/user.model");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

mongoose.connection.on("error", (err) => {
  console.error(`🚫  → ${err.message}`);
});

const app = require("./app");

app.set("port", process.env.PORT || 5050);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT http://localhost:${server.address().port}/api/hi`);
});
