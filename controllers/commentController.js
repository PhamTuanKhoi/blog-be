const userModel = require("../models/userModel");
const blogModel = require("../models/blogModel");
const commentModel = require("../models/commentModel");

class CommentController {
   async create(req, res) {
      let { content, blog, owner } = req.body;
      let created_at = Date.now();

      try {
         const user = await userModel.findById(owner);
         if (!user) return res.status(404).json({ message: "User doesn't exist" });

         const bloged = await blogModel.findById(blog);
         if (!bloged) return res.status(404).json({ message: "Blog doesn't exist" });

         const comment = await commentModel.create({
            content,
            owner,
            blog,
            created_at,
         });
         res.status(200).json(comment);
      } catch (error) {
         console.log(error);
      }
   }
}

module.exports = new CommentController();
