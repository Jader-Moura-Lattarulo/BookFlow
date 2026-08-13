import { userIdSchema } from "../schema/user.schema.js";
import { bookIdSchema } from "../schema/book.schema.js";
import { loanIdSchema } from "../schema/loan.schema.js";

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

const validateLoanId = (req, res, next) => {
    try {
        loanIdSchema.parse({ loanId: +req.params.id });
        next();
    } catch (e) {
        res.status(400).json({ error: e.errors });
    }
};

export {validate, validateUserId, validateBookId, validateLoanId};
