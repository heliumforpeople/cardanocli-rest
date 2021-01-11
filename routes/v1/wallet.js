"use strict";

const express = require("express");
const router = express.Router();
const { cardanoCli } = require("./../../src/helper");

/**
 * Generate Address Keys and return files path json object
 */
router.get("/:account/addressKeyGen", function (req, res, next) {
  res.json(cardanoCli.addressKeyGen(req.params.account));
});

/**
 * Generate Stake Address Keys and return files path json object
 */
router.get("/:account/stakeAddressKeyGen", function (req, res, next) {
  res.json(cardanoCli.stakeAddressKeyGen(req.params.account));
});

/**
 * Generate Payment Address and return file path
 */
router.get("/:account/addressBuild", function (req, res, next) {
  res.send(cardanoCli.addressBuild(req.params.account));
});

/**
 * Generate Account Stake Address and return file path
 */
router.get("/:account/stakeAddressBuild", function (req, res, next) {
  res.send(cardanoCli.stakeAddressKeyGen(req.params.account));
});

/**
 * Generate Script Address from json script and return file path
 */
router.post("/addressBuildScript", function (req, res, next) {
  res.send(cardanoCli.addressBuildScript(req.body));
});

/**
 * Return Stake Address Information array
 */
router.get("/queryStakeAddressInfo/:address", function (req, res, next) {
  res.json(cardanoCli.queryStakeAddressInfo(req.params.address));
});

/**
 * Return Account Payment Address UTXO array
 */
router.get("/queryUtxo/:address", function (req, res, next) {
  res.json(cardanoCli.queryUtxo(req.params.address));
});

/**
 * Return Payment Address Technical Information
 */
router.get("/addressInfo/:address", function (req, res, next) {
  res.json(cardanoCli.addressInfo(req.params.address));
});

/**
 * Generate Stake Address Resgistration Certificate and return file path
 */
router.get(
  "/:account/stakeAddressRegistrationCertificate",
  function (req, res, next) {
    res.send(
      cardanoCli.stakeAddressRegistrationCertificate(req.params.account)
    );
  }
);

/**
 * Generate Stake Address Deresgistration Certificate and return file path
 */
router.get(
  "/:account/stakeAddressDeregistrationCertificate",
  function (req, res, next) {
    res.send(
      cardanoCli.stakeAddressDeregistrationCertificate(req.params.account)
    );
  }
);

/**
 * Generate Stake Address Delegation Certificate and return file path
 */
router.get(
  "/:account/stakeAddressDelegationCertificate",
  function (req, res, next) {
    res.send(
      cardanoCli.stakeAddressDelegationCertificate(
        req.params.account,
        req.params.poolId
      )
    );
  }
);

/**
 * Return Account Stake Address Key Hash
 */
router.get("/:account/stakeAddressKeyHash", function (req, res, next) {
  res.send(cardanoCli.stakeAddressKeyHash(req.params.account));
});

/**
 * Return Account Payment Address Key Hash
 */
router.get("/:account/addressKeyHash", function (req, res, next) {
  res.send(cardanoCli.addressKeyHash(req.params.account));
});

/**
 * Return account wallet information
 */
router.get("/:account/wallet", function (req, res, next) {
  let result = cardanoCli.wallet(req.params.account);

  result["balance"] = result.balance();
  result["reward"] = result.reward();

  res.json(result);
});

module.exports = router;
