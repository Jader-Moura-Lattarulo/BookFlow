import userRepository from "../repositories/user.repositories.js";
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
    return user;
}

export default {
    createUserService
};
