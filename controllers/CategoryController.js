const categoryServies = require('../service/CategoryService')
const dbconfig = require("../config/dbconfig/dbconfigmain")
const { Category } = dbconfig.models

exports.createNewCategoryController = async (req, res) => {
    const categoryData = req.body

    try {
        const categoryReply = await categoryServies.createNewCategory(categoryData)
        console.log("categoryReply", categoryReply)
        res.status(201).json({ message: "Category Added Successfully", data: categoryReply })
    } catch (error) {
        console.error("Error during question registeration:", error)
        res.sendStatus(500)
    }
}

exports.getAllCategoryController = async (req, res) => {

    try {
        const {
            companyId,
        } = req.body
        const response = categoryServies.getAllCategory(companyId)
        if ((await response).status == 1) {
            res.status(200).json({ data: (await response).data })
        }
        else {
            console.error("Error during get all questions:", (await response).error)
            res.sendStatus(500)
        }
    } catch (error) {
        console.error("Error during question registeration:", error)
        res.sendStatus(500)
    }
}

exports.getCategoryByIdController = async (req, res) => {
    try {
        const categoryId = req.params.id
        const {
            companyId,
        } = req.body
        const response = categoryServies.getCategoryById(categoryId, companyId)
        if ((await response).status == 1) {
            res.status(200).json({ data: (await response).data })
        }
        else if ((await response).status == 400) {
            console.error("Question not found...",)
            res.sendStatus(400)
        }
        else {
            console.error("Error during get questions:", (await response).error)
            res.sendStatus(500)
        }
    } catch (error) {
        console.error('Error during fetching question by ID:', error)
        res.sendStatus(500)
    }
}

exports.editCategoryController = async (req, res) => {

    try {
        const {
            category_name, active, userId, companyId, modified_date
        } = req.body

        const editCategoryObject = {
            category_name, active, userId, companyId, modified_date
        }
        const categoryId = req.params.id
        const response = categoryServies.editCategory(
            editCategoryObject, categoryId
        )
        if ((await response).status == 400) {
            console.error("Category not found...",)
            res.sendStatus(400)
        }
        else if ((await response).status == 1) {
            res.status(201).json({ message: "Category edited successfully" })
        } else {
            res.sendStatus(500)
        }
    } catch (error) {
        console.error("Error during question registeration:", error)
        res.sendStatus(500)
    }
}

exports.deleteCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id
        const existingCategory = await Category.findOne({ where: { id: categoryId } })

        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found' })
        }

        await existingCategory.destroy()

        res.status(200).json({ message: 'Category deleted successfully' })
    } catch (error) {
        console.error('Error during question deletion:', error)
        res.sendStatus(500)
    }
}