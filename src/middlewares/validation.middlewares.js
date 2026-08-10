import { userIdSchema } from "../schema/user.schema.js";
import { bookIdSchema } from "../schema/book.schema.js";

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({message: "Validation error", errors: error.issues});
    }
};

const validateUserId = (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);

        userIdSchema.parse({ id: userId });

        next();
    } catch (error) {
        res.status(400).json({
            message: "Validation error",
            errors: error.issues
        });
    }
};

const validateBookId = (req, res, next) => {
    try {
        bookIdSchema.parse({ bookId: +req.params.id });
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
};

export {validate, validateUserId, validateBookId};
