const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
app.set("view engine", "ejs");

const mongoURI =
  "mongodb+srv://nickbenz007:nodetraining007@nodetraining.hbuxzst.mongodb.net/node_training?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => {
    app.listen(3000);
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error, "Error occurred while connecting to MongoDB");
  });

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//  Blog Routes
app.use("/blogs", blogRoutes);

//  404 Not found route
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
