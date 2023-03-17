const User = require("../models/User");
const bcrypt = require("bcrypt");
const { route } = require("./auth");
const router = require("express").Router();

//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        //IF USER WANNA UPDATE PASSWORD
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }
        //UPDATING ALL THE OTHER THINGS:
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json("Account has been updated.");
        }
        catch (err) {
            res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You can update only your account.")
    }
})
//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted.")
    } else {
        return res.status(403).json("You can delete only your account.")
    }
})
//get a user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt,createdAt,isAdmin,_id,__v, ...others} = user._doc
        res.status(200).json(others);
    }
    catch (err){
        res.status(500).json(err);
    }

})

//get all users

module.exports = router