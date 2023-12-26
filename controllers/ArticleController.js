const dbconfig = require("../config/dbconfig/dbconfigmain");
const { Article } = dbconfig.models;

exports.createNewArticleController = async (req, res) => {
    const { title, description, product_id, tag_id, visibility, company_id, modified_date, created_by, modified_by } = req.body;
  
    try {
      const newArticle = await Article.create({
        title: title,
        description: description,
        product_id: product_id,
        tag_id: tag_id,
        visibility: visibility,
        company_id: company_id,
        modified_date: modified_date,
        created_by: created_by,
        modified_by: modified_by
      });
  
      res.status(201).json({ message: "Article registered successfully" });
    } catch (error) {
      console.error("Error during Article registeration:", error);
      res.sendStatus(500);
    }
  };
  exports.getAllArticlesController = async (req, res) => {

    try {

      const articles = await Article.findAll();
      res.status(201).json({ data: articles });
    } catch (error) {
      console.error("Error during get all articles:", error);
      res.sendStatus(500);
    }
  };
  exports.getArticleByIdController = async (req, res) => {
    try {
      const articleId = req.params.id;
      const article = await Article.findOne({ where: { id: articleId } });
  
      if (!article) {
        return res.status(404).json({ error: 'article not found' });
      }
  
      res.status(200).json({ data:article });
    } catch (error) {
      console.error('Error during fetching article by ID:', error);
      res.sendStatus(500);
    }
  };
  exports.editArticlesController = async (req, res) => {
   
    try {

      const { title, description, product_id, tag_id, visibility, company_id, modified_date, created_by, modified_by } = req.body;
      const articleId = req.params.id;
      const existingArticle = await Article.findOne({ where: { id: articleId } });;

      if (!existingArticle) {
        return res.status(404).json({ error: 'Article not found' });
      }

      existingArticle.title = title;
      existingArticle.description = description;
      existingArticle.product_id = product_id;
      existingArticle.tag_id = tag_id;
      existingArticle.visibility = visibility;
      existingArticle.company_id = company_id;
      existingArticle.modified_date = modified_date;
      existingArticle.modified_by = modified_by;

      await existingArticle.save();
  
      res.status(201).json({ message: "Article updated successfully" });
    } catch (error) {
      console.error("Error during article update:", error);
      res.sendStatus(500);
    }
  };

  exports.deleteArticleController = async (req, res) => {
    try {
      const articleId = req.params.id;
      const existingArticle = await Article.findOne({ where: { id: articleId } });
  
      if (!existingArticle) {
        return res.status(404).json({ error: 'Article not found' });
      }
  
      await existingArticle.destroy();
  
      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
      console.error('Error during Article deletion:', error);
      res.sendStatus(500);
    }
  };