const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    shipping_mark: {
      type: String,
      default: null,
    },
    wallet: {
      balance_available: {
        type: Number,
        default: 0,
      },
      balance_onhold: {
        type: Number,
        default: true,
      },
    },
    others: {
      gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"],
      },
      country: {
        type: String,
        default: "Bangladesh",
      },
      avatar: {
        type: String,
        default: null,
      },
      company_name: {
        type: String,
        default: null,
      },
      company_address: {
        type: String,
        default: null,
      },
      company_phone: {
        type: String,
        default: null,
      },
      company_website: {
        type: String,
        default: null,
      },
    },
    role: {
      enum: ["user", "admin"],
    },
    type: {
      type: String,
      enum: [
        "customer",
        "handler",
        "super-admin",
        "customer-care",
        "accounts",
        "shipping-agent",
      ],
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function (fullName) {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
