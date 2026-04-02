const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  getSummary
} = require("../controllers/recordController");

// Summary (Analyst + Admin)
router.get("/summary", authMiddleware, roleMiddleware("analyst", "admin"), getSummary);

// GET (Viewer + above)
router.get("/", authMiddleware, roleMiddleware("viewer", "analyst", "admin"), getRecords);

// CREATE (Admin only)
router.post("/", authMiddleware, roleMiddleware("admin"), createRecord);

// UPDATE (Admin only)
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateRecord);

// DELETE (Admin only)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteRecord);

module.exports = router;













// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const { getSummary } = require("../controllers/recordController");

// const {
//   createRecord,
//   getRecords,
//   updateRecord,
//   deleteRecord
// } = require("../controllers/recordController");

// // Protected routes
// router.post("/", authMiddleware, createRecord);
// router.get("/summary", authMiddleware, getSummary);
// router.get("/", authMiddleware, getRecords);
// router.put("/:id", authMiddleware, updateRecord);
// router.delete("/:id", authMiddleware, deleteRecord);


// module.exports = router;