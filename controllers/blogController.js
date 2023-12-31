const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((error) => {
      console.log("Oops something went wrong while fetching All Blogs", error);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((error) => {
      res.render("404", { title: "Blog not found" });
    });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create New Blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((error) => {
      console.log(error, "An error occurred while Submitting Form");
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((error) => {
      console.log(error, "Error while Deleting.");
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
