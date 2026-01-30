const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getTokenById,
  getMyTokens
} = require("../controllers/tokenController");

const { downloadTokenPDF } = require("../controllers/tokenController");

router.use(auth);

router.get("/:tokenId", getTokenById);
router.get("/my/all", role(["PATIENT"]), getMyTokens);

router.get("/pdf/:tokenId", downloadTokenPDF);

module.exports = router;
