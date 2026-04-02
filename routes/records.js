const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getSummary } = require("../controllers/recordController");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");

// Protected routes
router.post("/", authMiddleware, createRecord);
router.get("/summary", authMiddleware, getSummary);
router.get("/", authMiddleware, getRecords);
router.put("/:id", authMiddleware, updateRecord);
router.delete("/:id", authMiddleware, deleteRecord);


module.exports = router;