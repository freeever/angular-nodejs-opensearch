module.exports = app => {
  const geoDocuments = require("../controller/geo.controller.js");
  const router = require("express").Router();

  // Find all documents by the given index name
  router.get("/:indexName", geoDocuments.findAllByIndexName);

  // Full text search by given text on the given index 
  router.post("/", geoDocuments.findByText);

  app.use('/api/geo/documents', router);
};
