const Order = require("../models/order");

exports.placeOrderForUser = (req, res) => {
  const date = new Date();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const { handler, orderItems, address } = req.body;
  const _order = new Order({
    user: req.user._id,
    orderNumber: `${months[date.getMonth()]}${Math.floor(
      10000000 + Math.random() * 90000000
    )}`,
    orderDate: date.toDateString(),
    invoice: req.invoice._id,
    handler: req.user._id,
    orderItems,
    address: req.user._id,
  });

  _order.save((error, order) => {
    if (error) {
      return res
        .status(400)
        .json({ msg: "Something Went Wrong in Order", error });
    }
    if (order) {
      return res
        .status(200)
        .json({ msg: "Your Order Has Been Placed!", order: order });
    } else {
      return res.status.status(404).json({ msg: "Bad Request" });
    }
  });
};

exports.getUserOrder = (req, res) => {
  Order.find({ user: req.user._id })
    .populate("invoice handler orderItems.product")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({ msg: "Something Went Wrong", error });
      }
      if (orders) {
        return res.status(200).json({ msg: "success", orders });
      } else {
        return res.status.status(404).json({ msg: "Bad Request" });
      }
    });
};
