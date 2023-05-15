const db = require("../models");
const Posts = db.posts;
const jwt = require('jsonwebtoken');
const { post } = require("../routes/auth");
const secretKey = 'yout-secret-key';



const postController = {
    Create: async (req, res) => {
        try {
            //add post
            const { caption, created_date} = req.body;
            res.setHeader('Content-Type', 'application/json');
            console.log(req.body);

            const token = req.headers.authorization;
            if (!token) return res.status(404).json('Not logged in!')

            jwt.verify(token, 'authentication', (err, user_id) => {
                if (err) return res.status(403).json('Token is not valid')
            })


            const decoded = jwt.verify(token, 'authentication');
            // req.user = decoded;
            console.log(decoded);

            const user_id = decoded.user_id;

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
            //add post
            const { caption, created_date} = req.body;
            res.setHeader('Content-Type', 'application/json');
            console.log(req.body);

            const id = req.params.id;

            const token = req.headers.authorization;
            if (!token) return res.status(404).json('Not logged in!')

            jwt.verify(token, 'authentication', (err, user_id) => {
                if (err) return res.status(403).json('Token is not valid')
            })


            const decoded = jwt.verify(token, 'authentication');
            // req.user = decoded;
            console.log(decoded);

            const user_id = decoded.user_id;

            const postEdit = await Posts.findByPk(id);
            console.log(postEdit);
            if(postEdit.user_id !== user_id) {
                return res.status(403).json('Post gagal diedit karena beda user')
            }

            await Posts.update({
                caption:caption},
                {where:{id:id}
            })
            // await Posts.update( where:{ media, created_date, caption, user_id });

            // const newPost = new post({


            // });

            // //save to database
            // await newPost.save();

            return res.status(200).json({
                message: ` post ${caption}, berhasil diubah`
            })



        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            });
        }
    },
    get: async (req, res) => {
        try {
            const posts = await Posts.findAll()

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
    getById: async (req, res) => {
        try {
            const id = req.params.id
            const posts = await Posts.findByPk(id)
            if(!post){
                return res.status(404).json('Post tidak ditemukan')
            }

            return res.status(200).json({
                message: `Post berdasarkan id berhasil ditampilkan`,
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

            const token = req.headers.authorization;
            if (!token) return res.status(404).json('Not logged in!')

            jwt.verify(token, 'authentication', (err, user_id) => {
                if (err) return res.status(403).json('Token is not valid')
            })


            const decoded = jwt.verify(token, 'authentication');
            // req.user = decoded;
            console.log(decoded);

            const user_id = decoded.user_id;

            const postDelete = await Posts.findByPk(id);
            console.log(postDelete);
            if(!postDelete){
                return res.status(404).json('Post tidak ditemukan')
            }
             if(postDelete.user_id !== user_id) {
                 return res.status(403).json('Post gagal dihapus karena beda user')
             }


            const posts = await Posts.destroy({
                where: {
                    id: id
                }
            })
            console.log(id);
            return res.status(200).json({
                message: `Post berdasarkan id berhasil dihapus`,
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