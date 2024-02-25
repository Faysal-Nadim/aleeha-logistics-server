const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid", "partially-paid", "cancelled "],
      default: "unpaid",
    },
    refundedAmount: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        amount: {
          type: Number,
        },
        date: {
          type: String,
        },
        trxID: {
          type: String,
        },
        gateway: {
          type: String,
          enum: ["bkash", "wallet", "ssl-commerz", "aamar-pay", "port-pos"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
