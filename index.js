import express from "express";
const app = express();

app.use(express.json());

const users = [];

app.post("/users", (req, res) => {
    console.log(req);
    const body = req.body;
    users.push(body);
    res.status(201).send({message: "User created successfully", user: body});
});

app.get("/users", (req, res) => {
    res.send({message: "Esses são os users", users});
})

app.listen(3000, () => {
    console.log("Server is running on port 3k");
});