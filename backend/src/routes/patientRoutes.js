const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getAvailableSlots,
  bookToken,
  cancelToken
} = require("../controllers/patientController");

router.use(auth, role(["PATIENT"]));

router.get("/slots", getAvailableSlots);
router.post("/book", bookToken);
router.delete("/cancel/:tokenId", cancelToken);

module.exports = router;
