import userRepository from "../repositories/user.repositories.js";
import { generateJWT } from "./auth.service.js";
import bcrypt from "bcrypt";

async function createUserService(newUser) {
    const foundUser = await userRepository.findUserByEmailRepository(newUser.email);
    const foundUserName = await userRepository.findUserByUserNameRepository(newUser.username);
    
    if (foundUser && foundUserName) {
        throw new Error("User with this email and username already exists");
    } else if (foundUser) {
        throw new Error("User with this email already exists");
    } else if (foundUserName) {
        throw new Error("User with this username already exists");
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const user = await userRepository.createUserRepository({
        ...newUser,
        password: hashedPassword
    });
    if (!user) {
        throw new Error("Failed to create user");
    }
    
    const token = generateJWT(user.id);
    return token;
}

async function findAllUsersService() {
    const users = await userRepository.findAllUsersRepository();
    return users;
}

async function findUserByIdService(id) {
    const user = await userRepository.findUserByIdRepository(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

async function updateUserService(newUser, userId) {

    const user = await userRepository.findUserByIdRepository(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const foundUser = await userRepository.findUserByEmailRepository(newUser.email);
    const foundUserName = await userRepository.findUserByUserNameRepository(newUser.username);
    
    const emailConflict = foundUser && foundUser.id !== Number(userId);
    const usernameConflict = foundUserName && foundUserName.id !== Number(userId);

    if (emailConflict && usernameConflict) {
        throw new Error("User with this email and username already exists");
    } else if (emailConflict) {
        throw new Error("User with this email already exists");
    } else if (usernameConflict) {
        throw new Error("User with this username already exists");
    }

    if(newUser.password) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    
    const userUpdated = await userRepository.updateUserRepository(userId, newUser);
    if (!userUpdated) {
        throw new Error("Failed to update user");
    }
    
    return userUpdated;
}

async function deleteUserService(userId) {
    const user = await userRepository.findUserByIdRepository(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const {message} = await userRepository.deleteUserRepository(userId);
    return message;
}

export default {
    createUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService,
    deleteUserService
};
