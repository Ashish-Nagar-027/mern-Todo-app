const notFound = (req, res) => {
  return res.status(404).send("route is not available");
};

module.exports = notFound;
