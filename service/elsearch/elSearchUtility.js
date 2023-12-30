const elClientConfig = require('../../config/dbconfig/searchdbconfig/elconfig');

async function checkElasticSearchClusterHealth() {
    try {
      const health = await elClientConfig.cluster.health({});
      console.log("EL Cluster Health:", health);
    } catch (error) {
      console.error("EL - Error Checking EL Health:", error);
    }
  }

  module.exports ={
    checkElasticSearchClusterHealth
  };