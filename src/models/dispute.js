const mongoose = require("mongoose");

const disputeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productNumber: {
      type: String,
      required: true,
    },
    disputeNumber: {
      type: String,
      required: true,
    },
    disputeReason: {
      type: String,
      enum: [
        "product-mismatch",
        "stock-out",
        "quantity-mismatch",
        "damaged-product",
      ],
      required: true,
    },
    disputeMsg: {
      type: String,
      required: true,
    },
    disputeStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "rejected"],
      default: "pending",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dispute", disputeSchema);
