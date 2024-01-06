
const dbconfig = require("../config/dbconfig/dbconfigmain")
const { Category } = dbconfig.models

exports.createNewCategory = async (req) => {

    const { category_name, active, companyId, userId } = req

    try {
        const Response = await Category.create({
            category_name: category_name,
            active: active,
            created_by: userId,
            company_id: companyId,
            modified_by: userId
        })
        console.log("Response: ", Response)
        return 1
    } catch (error) {
        console.error("Error during added Reply: ", error)
        return 0
    }
}

exports.getAllCategory = async (companyId) => {
    try {
        const questions = await Category.findAll({
            where: { company_id: companyId },
        })
        return { status: 1, data: questions }
    } catch (error) {
        console.error("Error during get all questions:", error)
        return { status: 0, error: error.message || "Unknown error" }
    }
}

exports.getCategoryById = async (categoryId, companyId) => {
    try {
        const category = await Category.findOne({
            where: { id: categoryId, company_id: companyId },
        })

        if (!category) {
            return { status: 404, error: "Category not found" }
        }
        return { status: 1, data: category }
    } catch (error) {
        console.error("Error during get category:", error)
        return { status: 0, error: error.message || "Unknown error" }
    }
}

exports.editCategory = async (editCategoryObject, categoryId) => {
    try {
        const existingCategory = await Category.findOne({
            where: { id: categoryId, company_id: editCategoryObject.companyId },
        })

        if (!existingCategory) {
            return { status: 404, error: "Category not found" }
        }

        existingCategory.category_name = editCategoryObject.category_name
        existingCategory.active = editCategoryObject.active
        existingCategory.company_id = editCategoryObject.companyId
        existingCategory.modified_date = editCategoryObject.modified_date
        existingCategory.modified_by = editCategoryObject.userId

        await existingCategory.save()
        return { status: 1, data: existingCategory }
    } catch (error) {
        console.error("Error during question edit:", error)
        return { status: 0, error: error.message || "Unknown error" }
    }
}
