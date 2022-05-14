const Geo = require("../model/geo.model.js");

exports.findAllByIndexName = (req, res) => {
  Geo.findAllByIndexName(req.params.indexName, (err, data) => {
    if (err) {
      const message = err.meta?.body?.error?.reason;
      const statusCode = (err.kind === "not_found" ? 404 : 500);
      res.status(statusCode).send({message});
    } else {
      res.send(data);
    }
  });
}

exports.findByText = (req, res) => {
  Geo.findByText(req.body, (err, data) => {
    if (err) {
      const message = err.meta?.body?.error?.reason;
      const statusCode = (err.kind === "not_found" ? 404 : 500);
      res.status(statusCode).send({message});
    } else {
      res.send(data);
    }
  });
}
