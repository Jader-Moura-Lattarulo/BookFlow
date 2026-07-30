import userService from "../service/user.service.js";

async function createUserController(req, res) { 
    const newUser = req.body;
    try {
        const user = await userService.createUserService(newUser);
        res.status(201).send({message: "User created successfully", user});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

export default {
    createUserController
}