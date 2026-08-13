import { Router } from 'express'
import loanController from '../controller/loan.controller.js'
import { validate, validateLoanId } from '../middlewares/validation.middlewares.js'
import { loanSchema } from '../schema/loan.schema.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.post("/loans", authMiddleware, validate(loanSchema), loanController.createLoanController);
router.get("/loans", authMiddleware, loanController.findAllLoansController);
router.get("/loans/:id", validateLoanId, loanController.findLoanByIdController);
router.delete("/loans/:id", authMiddleware, validateLoanId, loanController.deleteLoanController);

export default router
