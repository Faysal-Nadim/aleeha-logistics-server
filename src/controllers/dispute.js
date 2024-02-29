const Dispute = require("../models/dispute");

exports.createDispute = (req, res) => {
  const { productNumber, disputeReason, amount, disputeMsg, user } = req.body;

  const _dispute = new Dispute({
    user,
    productNumber,
    disputeNumber: `DP${Math.floor(10000000 + Math.random() * 90000000)}`,
    disputeReason,
    disputeMsg,
    amount,
  });

  _dispute.save((error, dispute) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong", error });
    }
    if (dispute) {
      return res
        .status(201)
        .json({ msg: "Dispute Has Been Submitted", dispute });
    } else {
      return res.status(400).json({ msg: "Bad Request" });
    }
  });
};
