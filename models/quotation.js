import Joi from "joi";
import mongoose from "mongoose";

const BidSchema = new mongoose.Schema({
  company: { type: String, required: true },
  product: { type: String, required: true, ref: "Product" },
  price: { type: Number },
});
const MyBidSchema = new mongoose.Schema({
  product: { type: String, required: true, ref: "Product" },
  price: { type: Number },
});
const ProductSchema = new mongoose.Schema({
  product: { type: String, required: true, ref: "Product" },
  quantity: { type: Number, required: true },
});

const Quotation = mongoose.model(
  "Quotation",
  new mongoose.Schema(
    {
      companies: {
        type: Array,
        required: true,
        trim: true,
        ref: "Company",
      },
      products: {
        type: [ProductSchema],
        required: true,
        trim: true,
      },
      bids: {
        type: [BidSchema],
        required: true,
        trim: true,
      },
      lastDate: { type: Date },
      qtype: {
        type: String,
        trim: true,
      },
      refNo: {
        type: String,
        trim: true,
        // required: true,
      },
      from: {
        type: String,
        required: true,
        trim: true,
      },
      demandDate: Date,
      demandNumber: String,
      myBids: {
        type: [MyBidSchema],
        trim: true,
      },
      forPTV: { type: Boolean, default: true },
    },
    { timestamps: true }
  )
);

function validateQuotation(product) {
  const schema = {
    companies: Joi.array().required(),
    products: Joi.array().required(),
    bids: Joi.array().required(),
    lastDate: Joi.date().required(),
    qtype: Joi.string(),
    refNo: Joi.string(),
    from: Joi.string(),
    demandDate: Joi.string(),
    demandNumber: Joi.string(),
    myBids: Joi.array(),
    forPTV: Joi.boolean(),
  };

  return Joi.validate(product, schema);
}

export { Quotation, validateQuotation };
