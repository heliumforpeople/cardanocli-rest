"use strict";

const express = require("express");
const router = express.Router();
const { cardanoCli } = require("./../../src/helper");

/**
 * Build and return Raw Transaction File Path
 */
router.post("/transactionBuildRaw", function (req, res, next) {
  res.setHeader("content-type", "text/plain");
  res.send(cardanoCli.transactionBuildRaw(req.body));
});

/**
 * Calculate and return Transaction Minimum Fees
 */
router.post("/transactionCalculateMinFee", function (req, res, next) {
  res.setHeader("content-type", "text/plain");
  res.send(cardanoCli.transactionCalculateMinFee(req.body).toString());
});

/**
 * Sign and return Signed Transaction File Path
 */
router.post("/transactionSign", function (req, res, next) {
  res.setHeader("content-type", "text/plain");
  res.send(cardanoCli.transactionSign(req.body));
});

/**
 * Witness and return Witnessed Transaction File Path
 */
router.post("/transactionWitness", function (req, res, next) {
  res.setHeader("content-type", "text/plain");
  res.send(cardanoCli.transactionWitness(req.body));
});

/**
 * Assemble Witnessed Transaction File and return file Path
 */
router.post("/transactionAssemble", function (req, res, next) {
  res.setHeader("content-type", "text/plain");
  res.send(cardanoCli.transactionAssemble(req.body));
});

/**
 * Receive Transaction file and return Tx ID
 */
router.post("/transactionTxid", function (req, res, next) {
  res.setHeader("content-type", "text/plain");
  res.send(cardanoCli.transactionTxid(req.body));
});

/**
 * Submit a transaction file on the network and return Tx ID
 */
router.get("/transactionSubmit", function (req, res, next) {
  res.setHeader("content-type", "text/plain");
  res.send(cardanoCli.transactionSubmit(req.query.filePath));
});

/**
 * Submit a transaction file on the network and return Tx ID
 */
router.post("/transactionSubmit", function (req, res, next) {
  res.setHeader("content-type", "text/plain");
  res.send(cardanoCli.transactionSubmit(req.body));
});

/**
 * Calculate Policy Id and return it
 */
router.post("/transactionPolicyid", function (req, res, next) {
  res.setHeader("content-type", "text/plain");
  console.log("🚀 ~", cardanoCli.transactionPolicyid(req.body))
  
  res.send(cardanoCli.transactionPolicyid(req.body));
});

module.exports = router;
