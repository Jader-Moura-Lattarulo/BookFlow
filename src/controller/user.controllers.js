import userService from "../service/user.service.js";
import { loginService } from "../service/auth.service.js";

async function createUserController(req, res) { 
    const newUser = req.body;
    try {
        const token = await userService.createUserService(newUser);
        res.status(201).send({message: "User created successfully", token});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function loginController(req, res) {
    const { email, password } = req.body;
    try {
        const token = await loginService(email, password);
        res.status(200).send({message: "Login successful", token});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function findAllUsersController(req, res) {
    try {
        const users = await userService.findAllUsersService();
        res.status(200).send({message: "Users found successfully", users});
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

async function findUserByIdController(req, res) {
    const { id } = req.params;

    try {
        const user = await userService.findUserByIdService(id);
        res.status(200).send({message: "User found successfully", user});
    }  catch (error) {  
        res.status(404).send({ error: error.message });
    }
}

async function updateUserController(req, res) {
    const { id } = req.params;
    const newUser = req.body;

    try {
        const user = await userService.updateUserService(newUser, id);
        res.status(200).send({message: "User updated successfully", user});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function deleteUserController(req, res) {
    const { id } = req.params;
    try {
        const message = await userService.deleteUserService(id);
        res.status(200).send({message});
    } catch (error) {
        res.status(404).send({ error: error.message });
    }       
}

export default {
    createUserController,
    findAllUsersController,
    findUserByIdController,
    updateUserController,
    deleteUserController,
    loginController
}