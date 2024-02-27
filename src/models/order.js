const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
    },
    orderDate: {
      type: String,
      required: true,
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    handler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        isActionRequired: {
          type: Boolean,
          default: false,
        },
        isActionTaken: {
          type: Boolean,
          default: false,
        },
        issue: {
          actionType: {
            type: String,
            enum: ["purchase", "refund"],
          },
          msg: {
            type: String,
          },
          reason: {
            type: String,
            enum: ["local-delivery-charge", "stock-out", "price-mismatch"],
          },
          amount: {
            type: Number,
          },
          status: {
            type: String,
            enum: ["pending", "resolved"],
          },
        },
      },
    ],
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
