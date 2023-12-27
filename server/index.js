const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const userSchema = require("./models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const app = express()

mongoose.connect("mongodb://localhost:27017/mern-user-auth")

app.use(cors())
app.use(express.json())

app.get("/hello", (req, res) => {
    res.send("Hello world!!!")
})

app.post("/api/register", async(req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await userSchema.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.json({status: "ok"})
    } catch (err) {
        console.log(err);
        res.json({status: "error", error: "Duplicate email"})
    }
})

app.post("/api/login", async(req, res) => {
    try {
        const user = await userSchema.findOne({
            email: req.body.email
        })
        if (!user) {
            return res.json({ status: "error", error: "Invalid user"})
        }
        
        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (isValidPassword) {
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email
                }, 'siva123')
            return res.json({status: "ok", user: token})
        }else {
            return res.json({status: "fail", user: false})
        }
    } catch (err) {
        console.log(err);
        res.json({status: "error", error: "User name or password not match"})
    }
})

app.get("/api/quote", async(req, res) => {
    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token, 'siva123')
        const email = decoded.email
        const user = await userSchema.findOne({email: email})

        return res.json({ status: 'ok', quote: user.quote })
    } catch (err) {
        console.log(err);
        res.json({status: "error", error: "invalid token"})
    }
})

app.post("/api/quote", async(req, res) => {
    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token, 'siva123')
        const email = decoded.email
        const user = await userSchema.updateOne(
            {email: email},
            { $set: { quote: req.body.quote }}
        )

        return res.json({ status: 'ok'})
    } catch (err) {
        console.log(err);
        res.json({status: "error", error: "invalid token"})
    }
})

app.listen(1337, () => {
    console.log("Server started on 1337");
})