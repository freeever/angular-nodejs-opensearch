module.exports = Object.freeze({
  OPENSEARCH_HOST: process.env.OPENSEARCH_HOST || 'search-lrc-poc-public-3hvhhuoswijfyaz5agur6yustq.ca-central-1.es.amazonaws.com',
  OPENSEARCH_PROTOCOL: process.env.OPENSEARCH_PROTOCOL || 'https',
  OPENSEARCH_PORT: process.env.OPENSEARCH_PORT || '443',
  OPENSEARCH_AUTH: process.env.OPENSEARCH_AUTH || 'lrcadmin:LrcPoc999!'
})
