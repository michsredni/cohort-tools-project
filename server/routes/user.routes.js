const tokenValidation = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

const router = require("express").Router();

// GET "/api/users/:id" => usuario puede ver su propio perfil
router.get("/:id", tokenValidation, async (req, res ,next) => {

    try {
        const response = await User.findById(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: "Error while getting data from user" });
        console.error(error); 
    }
})

module.exports = router;