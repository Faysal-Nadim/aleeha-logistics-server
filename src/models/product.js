const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    pid: {
      type: String,
      required: true,
    },
    variations: [
      {
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        payable: {
          type: Number,
          required: true,
        },
        metaKey: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        thumb: {
          type: String,
          required: true,
        },
      },
    ],
    shippingRate: {
      type: Number,
      required: true,
    },
    shippingCategory: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      default: 0,
    },
    ddc: {
      type: Number,
      default: 0,
    },
    repackingCharge: {
      type: Number,
      default: 0,
    },
    trackingNumber: {
      type: String,
      default: null,
    },
    dispute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dispute",
      default: null,
    },
    type: {
      type: String,
      enum: ["cart", "order"],
      default: "cart",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
