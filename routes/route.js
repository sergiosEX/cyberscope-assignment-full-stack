const express = require("express");
const router = express.Router();

const {
  fetchCryptoData,
  searchCryptoById,
} = require("../controllers/controller.js");

let count = 0;
router.get("/markets", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const data = await fetchCryptoData(page);
    res.status(200).json(data);
    count++;
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occured while fetching the data!");
  }
  console.log(`Request number ${count}`);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await searchCryptoById(id);
    if (!data) {
      return res
        .status(404)
        .json({ message: `Coin with id=${id} does not exist` });
    }
    res.status(200).json(data);
  } catch (error) {
    const errorMessage = `Request failed with status ${error.response.status}`;
    console.error(errorMessage);
    res.status(error.response.status).send(errorMessage);
  }
});

module.exports = router;