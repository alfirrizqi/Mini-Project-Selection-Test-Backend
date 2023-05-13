const db = require("../models");
const Posts = db.posts;


const postController = {
    Create: async (req, res) => {
        try {
            //add post
            const { caption, created_date, user_id } = req.body;
            res.setHeader('Content-Type', 'application/json');
            console.log(req.body);

            //menyimpan image
            let media = ' '

            // membuat kondisi di mana untuk membaca filename foto yang akan dikirim ke database
            if (!req.file) {
                console.log("No file upload");
            } else {
                console.log(req.file.filename)
                media = 'public/' + req.file.filename
            }


            await Posts.create({ media, created_date, caption, user_id });
          
            // const newPost = new post({
                
               
            // });

            // //save to database
            // await newPost.save();

            return res.status(200).json({
                message: ` post ${media}, berhasil ditambahkan`
            })



        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            });
        }
    },
    update: async (req, res) => {
        try {

            const { caption, created_date, user_id } = req.body

            const id = req.params.id

          

            let media = ' '

            // membuat kondisi di mana untuk membaca filename foto yang akan dikirim ke database
            if (!req.file) {
                console.log("No file upload");
            } else {
                console.log(req.file.filename)
                media = 'public/' + req.file.filename
            }

            await Posts.update({ media, created_date, caption, user_id },
                {
                    where: {
                        user_id: user_id

                    }
                });

                
            return res.status(200).json({
                message: ` Post ${media}, berhasil diubah`
            })
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.messge
            });
        }
    },
    get: async (req, res) => {
        try {
            const data = req.query.data;
            const userId = req.query.userId;

            const queryPosts = {
            }
            if (data) {
                queryPosts.data =
                    [
                        ['name', data]
                    ]
            }
            if (userId) {
                queryPosts.where = {
                    user_id: userId
                }
            }

            const posts = await Posts.findAll(queryPosts)

            return res.status(200).json({
                message: `Post berhasil ditampilkan`,
                data: posts

            });
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id
            const posts = await Posts.findByPk(id)


            return res.status(200).json({
                message: `Posts berhasil ditampilkan`,
                data: posts

            });
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    },
    deleteById: async (req, res) => {
        try {
            const id = req.params.id
            const posts = await Posts.destroy ({
                where: {
                    user_id: id
                }
            })


            return res.status(200).json({
                message: `Post berhasil dihapus`, 
                data: posts
                
            });
            
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    }
}

module.exports = postController;