const Invoice = require("../models/invoice");

exports.generateInvoice = (req, res, next) => {
  const date = new Date();
  const months = [
    "JN",
    "FB",
    "MR",
    "AP",
    "MY",
    "JU",
    "JL",
    "AG",
    "SP",
    "OC",
    "NV",
    "DC",
  ];

  const _invoice = new Invoice({
    invoiceNumber: `INV-${months[date.getMonth()]}${Math.floor(
      100000 + Math.random() * 900000
    )}`,
    totalAmount: req.body.totalAmount,
  });

  _invoice.save((error, invoice) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong in Invoice" });
    }
    if (invoice) {
      req.invoice = invoice;
      next();
    } else {
      return res.status.status(404).json({ msg: "Bad Request" });
    }
  });
};
