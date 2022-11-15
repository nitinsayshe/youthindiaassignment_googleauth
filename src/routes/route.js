const express = require("express")
const { googleAuth } = require("../controllers/google-api-auth")
const router = express.Router()

router.get("/getevent",googleAuth)

module.exports=router