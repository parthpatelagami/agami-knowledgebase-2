const dbconfig = require("../config/dbconfig/dbconfigmain")
const { Category } = dbconfig.models

exports.createNewCategoryController = async (req, res) => {
    const { category_name, active, created_by, company_id, modified_by } = req.body

    try {
        const newCategory = await Category.create({
            category_name: category_name,
            active: active,
            created_by: created_by,
            company_id: company_id,
            modified_by: modified_by
        })

        res.status(201).json({ message: "Category Added Successfully" })
    } catch (error) {
        console.error("Error during question registeration:", error)
        res.sendStatus(500)
    }
}

exports.getAllCategoryController = async (req, res) => {

    try {

        const category = await Category.findAll()
        res.status(201).json({ data: category })
    } catch (error) {
        console.error("Error during get all questions:", error)
        res.sendStatus(500)
    }
}

exports.getCategoryByIdController = async (req, res) => {
    try {
        const categoryId = req.params.id
        const category = await Category.findOne({ where: { id: categoryId } })

        if (!category) {
            return res.status(404).json({ error: 'Question not found' })
        }

        res.status(200).json({ data: category })
    } catch (error) {
        console.error('Error during fetching question by ID:', error)
        res.sendStatus(500)
    }
}

exports.editCategoryController = async (req, res) => {

    try {

        const { category_name, active, modified_by } = req.body
        const Id = req.params.id
        const existingCategory = await Category.findOne({ where: { id: Id } });;
        console.log("existingCategory", existingCategory)

        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found' })
        }

        existingCategory.category_name = category_name
        existingCategory.active = active
        existingCategory.modified_by = modified_by

        await existingCategory.save()

        res.status(201).json({ message: "Category Updated Successfully" })
    } catch (error) {
        console.error("Error during category update:", error)
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