const db = require("../models");
const User = db.user;
const ejs = require('ejs');

//user registration
const verifyController = {
    verify: async (req, res) => {
        //simpan token
        const tokenId = req.params.token

        //untuk dapat tanggal dan hari untuk verify at
        const currentDate = new Date();
        console.log(currentDate);

        const timestamp = Date.now();
        console.log(timestamp);


        await User.update({
            verify_at: currentDate
        },
            {
                where: { verify_token: tokenId }
            })

        res.render('pages/email')


    }
}





module.exports = verifyController;