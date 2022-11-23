const userModel = require("../models/userModel");
const blogModel = require("../models/blogModel");

class BlogController {
   async create(req, res) {
      const { title, tags, content, owner } = req.body;
      let created_at = Date.now();

      try {
         const oldUser = await userModel.findById(owner);
         if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

         const blog = await blogModel.create({
            title,
            tags,
            content,
            owner,
            created_at,
         });
         res.status(200).json(blog);
      } catch (error) {
         console.log(error);
      }
   }

   async list(req, res) {
      try {
         const blog = await blogModel.aggregate([
            {
               $lookup: {
                  from: "user",
                  localField: "owner",
                  foreignField: "_id",
                  as: "user",
               },
            },
            {
               $unwind: "$user",
            },
            {
               $lookup: {
                  from: "comment",
                  localField: "_id",
                  foreignField: "blog",
                  pipeline: [
                     {
                        $lookup: {
                           from: "user",
                           localField: "owner",
                           foreignField: "_id",
                           as: "user",
                        },
                     },
                     {
                        $unwind: "$user",
                     },
                  ],
                  as: "cmt",
               },
            },
         ]);
         res.status(200).json(blog);
      } catch (error) {
         console.log(error);
      }
   }
}

module.exports = new BlogController();
