const express = require("express");
var user = require("./user.json")

const app = express();
app.use(express.json());


app.listen(3000, function () {
    console.log("hello");
})

app.get("/", function (req,res) {
    res.send("Welcome to Home page")
})

app.get("/user", function (req,res) {
    res.json(user)
})

app.post("/user", function (req, res) {
    let data = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        ip_address: req.body.ip_address,
        age: req.body.age
    };
    user.push(data);
    res.json(user)
})

app.patch("/user/:id", function (req,res) {
    let id = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;

    let index = user.findIndex(function (data) {
        return (data.id == Number.parseInt(id))
    })

    if (index >= 0) {
        let std = user[index];
        std.last_name = last_name;
        std.first_name = first_name;
        std.email = email;
        res.json(std)
    } else {
        res.status(404)
        res.end()
    }

})

app.delete("/user/:id", function (req,res) {
    let id = req.params.id;

    let index = user.findIndex(function (data) {
        return (data.id == Number.parseInt(id))
    })

    if (index >= 0) {
        let std = user[index]
        user.splice(index, 1);
        res.json(std);
    } else {
        res.status(404)
        res.end();
    }

})