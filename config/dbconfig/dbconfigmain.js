const dotenv = require("dotenv")
const Sequelize = require("sequelize")
const UserModel = require("../../models/UserModel")
const TokenModel = require("../../models/TokenModel")
const TagModel = require("../../models/TagModel")
const ProductModel = require("../../models/ProductModel")
const QuestionModel = require("../../models/QuestionModel")
const ArticleModel = require("../../models/ArticleModel")
const VerifyModel = require("../../models/VerifyModel")
const CompanyModel = require("../../models/CompanyModel")
const CategoryModel = require("../../models/CategoryModel")
const QuestionReplyModel = require("../../models/QuestionReplyModel")
const ForgotPasswordModel = require("../../models/ForgotPasswordModel")
const QuestionUpvotesModel = require("../../models/QuestionUpvotesModel")
const PopularQuestionModel = require("../../models/PopularQuestionsModel")
const LanguageModel = require("../../models/LanguageModel")
const TimeZoneModel = require("../../models/TimeZoneModel")
const logger = require("../../config/logger/logger.config")

dotenv.config() // Load environment variables from .env file

// Create a new Sequelize with your MySQL connection details
const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_DBPORT,
  dialect: process.env.MYSQL_DIALECT,
  timezone: process.env.SERVER_TIMEZONE,
  logging: msg => logger.info("Query : " + msg),
  logQueryParameters: true,
})

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.")
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error)
  })

// Import and include the User model
const User = UserModel(sequelize, Sequelize)
const Token = TokenModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)
const Question = QuestionModel(sequelize, Sequelize)
const Product = ProductModel(sequelize, Sequelize)
const Article = ArticleModel(sequelize, Sequelize)
const OTP = VerifyModel(sequelize, Sequelize)
const Company = CompanyModel(sequelize, Sequelize)
const Category = CategoryModel(sequelize, Sequelize)
const QuestionReply = QuestionReplyModel(sequelize, Sequelize)
const ForgotPassword = ForgotPasswordModel(sequelize, Sequelize)
const QuestionUpvotes = QuestionUpvotesModel(sequelize, Sequelize)
const PopularQuestion = PopularQuestionModel(sequelize, Sequelize)
const Language = LanguageModel(sequelize, Sequelize)
const TimeZone = TimeZoneModel(sequelize, Sequelize)

// Export Sequelize and the models
const dbconfig = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    User: User,
    Token: Token,
    Article: Article,
    OTP: OTP,
    Product: Product,
    Question: Question,
    Company: Company,
    Category: Category,
    QuestionReply: QuestionReply,
    ForgotPassword: ForgotPassword,
    QuestionUpvotes: QuestionUpvotes,
    PopularQuestion: PopularQuestion,
    Language: Language,
    TimeZone: TimeZone,
    sequelize: sequelize
  },
}

module.exports = dbconfig
