const Record = require("../models/Record");

// CREATE RECORD
exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const record = new Record({
      amount,
      type,
      category,
      date,
      notes,
    //createdBy: "67f123abc123abc123abc123" //from token
      createdBy: req.user.id
    });

    await record.save();

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET ALL RECORDS
exports.getRecords = async (req, res) => {
  try {
    const { type, category } = req.query;

    let filter = { createdBy: req.user.id };

    if (type) filter.type = type;
    if (category) filter.category = category;

    const records = await Record.find(filter).sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE RECORD
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // only owner can update
    if (record.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE RECORD
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await record.deleteOne();

    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find({ createdBy: req.user.id });

    let income = 0;
    let expense = 0;

    records.forEach(r => {
      if (r.type === "income") income += r.amount;
      else expense += r.amount;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};