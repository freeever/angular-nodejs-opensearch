const express = require("express");
const route = express.Router();
const res = require("express/lib/response");
const { Client } = require('@opensearch-project/opensearch');

var opensearchConfig = require('../config/opensearch.config');

const client = new Client({
  node: opensearchConfig.OPENSEARCH_PROTOCOL + '://' + opensearchConfig.OPENSEARCH_AUTH
      + '@' + opensearchConfig.OPENSEARCH_HOST + ':' + opensearchConfig.OPENSEARCH_PORT
  // ssl: {
  //     ca: fs.readFileSync(ca_certs_path),
      // You can turn off certificate verification (rejectUnauthorized: false) if you're using self-signed certificates with a hostname mismatch.
      // cert: fs.readFileSync(client_cert_path),
      // key: fs.readFileSync(client_key_path)
  // }
})

const Geo = function(geo) {
  this.oriId = geo.oriId;
  this.id = geo.id;
  this.isNew = geo.isNew;
  this.isUpdate = geo.isUpdate;
  this.title = geo.title;
  this.description = geo.description;
  this.abandonedMineIdentifier = geo.abandonedMineIdentifier;
  this.officialName = geo.officialName;
}

Geo.findAllByIndexName = (indexName, result) => {
  console.log("Find all documents of index " + indexName);
  const query = {
    index: indexName,
    body: {
      query: {
        match_all: {},
      },
    }
  };

  Geo.search(query, result);
};

Geo.findByText = (data, result) => {
  let terms = data.terms.replace(/\s+/g, " ").trim();
  terms = '*' + terms.replaceAll(' ', '* *') + '*';
  console.log("Search documents of index " + data.indexNames + " by text '" + terms + "' on " + opensearchConfig.OPENSEARCH_HOST);
  const query = {
    index: data.indexNames,
    body: {
      query: {
        query_string: {
          query: terms
        }
      }
    }
  };

  Geo.search(query, result);
};

Geo.search = (query, result) => {
  client.search(query)
    .then((response) => {
      result(null, response.body.hits);
    })
    .catch((err) => {
      result(err, null)
    });
};

module.exports = Geo;
