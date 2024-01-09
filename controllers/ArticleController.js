const dbconfig = require("../config/dbconfig/dbconfigmain");
const { Article,User } = dbconfig.models;
const {createNewArticle, getAllArticles,getArticleById,getArticleByUserId,editArticle,deleteArticle}=require("../service/ArticlesService");

exports.createNewArticleController = async (req, res) => {
  const response=await createNewArticle(req.body);
  if(response==1){
    res.status(201).json({ message: "Article registered successfully" });
  }else{
    res.sendStatus(500);
  }
   
};
exports.getAllArticlesController = async (req, res) => {
  const {status,data}=await getAllArticles(req.body);
  if(status==200){
    res.status(200).json({ data: data });
  }else{
      res.sendStatus(500);
  }
};
exports.getArticleByIdController = async (req, res) => {
  const articleId = req.params.id;
  const {companyId}=req.body;
  
  const {status,data}=await getArticleById({articleId,companyId});
  if(status==404){
    return res.status(404).json({ error: 'article not found' });
  }
  else if(status==200){
    res.status(200).json({ data:data });
  }
  else{
    res.sendStatus(500);
  }
};
exports.getArticleByUserIdController = async (req, res) => {
  const {status,data}=await getArticleByUserId(req.body);
  if(status==404){
    return res.status(404).json({ error: 'article not found' });
  }
  else if(status==200){
    res.status(200).json({ data:data });
  }
  else{
    res.sendStatus(500);
  }
};
exports.editArticlesController = async (req, res) => {
    const {status,data}=await editArticle(req.body);
    if(status==404){
      return res.status(404).json({ error: 'article not found' });
    }
    else if(status==201){
      res.status(200).json({ message: "Article updated successfully" });
    }
    else{
      res.sendStatus(500);
    }
    
};

exports.deleteArticleController = async (req, res) => {
  const articleId=req.params.id
  const {status,data}=deleteArticle({articleId});
  if(status==200){
    res.status(200).json({ message: 'Article deleted successfully' });
  }
  else{
    res.sendStatus(500);
  }
    
  };