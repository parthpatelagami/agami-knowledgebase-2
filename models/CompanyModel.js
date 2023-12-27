const CompanyModel = (sequelize, Sequelize) => {
    const Company = sequelize.define(
      "company_mst",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        company_name: {
          type: Sequelize.TEXT,
        },
      },
      {
        tableName: "company_mst",
        timestamps: false,
      }
    );
  
    Company.createCompany = async (companyData) => {
      return Company.create(companyData);
    };
  
    return Company;
  };
  
  module.exports = CompanyModel;
  