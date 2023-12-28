const express = require("express");
const {
    createNewArticleController,getAllArticlesController, editArticlesController, deleteArticleController,getArticleByIdController,getArticleByUserIdController
} = require("../controllers/ArticleController");

//router object
const router = express.Router();

router.post("/articles", createNewArticleController);
router.get("/articles",getAllArticlesController);
router.put("/articles/:id",editArticlesController);
router.delete("/articles/:id",deleteArticleController);
router.get("/articles/:id",getArticleByIdController);
router.get("/articles/user/:id",getArticleByUserIdController);

module.exports = router;
