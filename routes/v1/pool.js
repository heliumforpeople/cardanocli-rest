"use strict";

const express = require("express");
const router = express.Router();
const { cardanoCli } = require("./../../src/helper");

/**
 * Generate Pool KES keys pair
 */
router.get("/:poolName/nodeKeyGenKES", function (req, res, next) {
  res.json(cardanoCli.nodeKeyGenKES(req.params.poolName));
});

/**
 * Generate Pool Cold keys pair
 */
router.get("/:poolName/nodeKeyGen", function (req, res, next) {
  res.json(cardanoCli.nodeKeyGen(req.params.poolName));
});

/**
 * Generate Pool Operation Certificate
 */
router.get("/:poolName/nodeIssueOpCert", function (req, res, next) {
  res.setHeader('content-type', 'text/plain');
  res.send(cardanoCli.nodeIssueOpCert(req.params.poolName));
});

/**
 * Generate Pool VRF Keys Pair
 */
router.get("/:poolName/nodeKeyGenVRF", function (req, res, next) {
  res.json(cardanoCli.nodeKeyGenVRF(req.params.poolName));
});

/**
 * Return Stake Pool Id
 */
router.get("/:poolName/stakePoolId", function (req, res, next) {
  res.setHeader('content-type', 'text/plain');
  res.send(cardanoCli.stakePoolId(req.params.poolName));
});

/**
 * Return Hash from input metadata json
 */
router.post("/stakePoolMetadataHash", function (req, res, next) {
  res.setHeader('content-type', 'text/plain');
  res.send(cardanoCli.stakePoolMetadataHash(req.body));
});

/**
 * Generate Stake Pool Registration Certificate
 */
router.post(
  "/:poolName/stakePoolRegistrationCertificate",
  function (req, res, next) {
    res.setHeader('content-type', 'text/plain');
    res.send(
      cardanoCli.stakePoolRegistrationCertificate(req.params.poolName, req.body)
    );
  }
);

/**
 * Return Pool Deregistration Certificate Path
 */
router.get(
  "/:poolName/stakePoolDeregistrationCertificate/:epoch",
  function (req, res, next) {
    res.setHeader('content-type', 'text/plain');
    res.send(
      cardanoCli.stakePoolDeregistrationCertificate(
        req.params.poolName,
        req.params.epoch
      )
    );
  }
);

/**
 * Return Pool Information
 */
router.get("/:poolName/pool", function (req, res, next) {
  res.json(cardanoCli.pool(req.params.poolName));
});

module.exports = router;
