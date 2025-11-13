const express = require("express");
const {
  createBooking,
  getUserBookings,
  getBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);
router.get("/user/:userId", getUserBookings);
router.get("/:id", getBooking);

module.exports = router;
