const express = require("express")
const {
    createNewCategoryController,
    getAllCategoryController,
    editCategoryController,
    deleteCategoryController,
    getCategoryByIdController
} = require("../controllers/CategoryController")

//router object
const router = express.Router()

router.post("/category", createNewCategoryController)
router.get("/category", getAllCategoryController)
router.put("/category/:id", editCategoryController)
router.delete("/category/:id", deleteCategoryController)
router.get("/category/:id", getCategoryByIdController)

module.exports = router
