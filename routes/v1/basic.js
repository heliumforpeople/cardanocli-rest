"use strict";

const express = require("express");
const router = express.Router();
const { cardanoCli } = require("./../../src/helper");
const path = require("path");
const { generateUrl, createSymlink } = require("./../../src/helper");

const PUBLIC_TMP = "/tmp";

/**
 * Return Shelley Genesis object
 */
router.get("/shelleyGenesis", function (req, res, next) {
  res.json(cardanoCli.shelleyGenesis);
});

/**
 * Return Protocole Parameters Json Object
 */
router.get("/queryProtocolParameters", function (req, res, next) {
  res.json(cardanoCli.queryProtocolParameters());
});

/**
 * Return Blockchain Tip Info Json Object
 */
router.get("/queryTip", function (req, res, next) {
  res.json(cardanoCli.queryTip());
});

/**
 * Return KES Period number
 */
router.get("/KESPeriod", function (req, res, next) {
  res.send("" + cardanoCli.KESPeriod());
});

/**
 * Convert ADA to Lovelace
 */
router.get("/toLovelace/:ada", function (req, res, next) {
  res.send("" + cardanoCli.toLovelace(req.params.ada));
});

/**
 * Convert Lovelace to ADA
 */
router.get("/toAda/:lovelace", function (req, res, next) {
  res.send("" + cardanoCli.toAda(req.params.lovelace));
});

/**
 * Return download URL of requested file
 *
 * @param {Request} req - ExpressJs Request object
 * @returns {object} - Download url to file symlink
 */
const initDownload = (req) => {
  let filePath = req.query.filePath;
  let fileName = Date.now() + "_" + path.basename(filePath);
  let url = generateUrl(req, PUBLIC_TMP, fileName);

  createSymlink(filePath, fileName);

  return url;
};

/**
 * Return download URL of requested file
 */
router.get("/getDownloadUrl", function (req, res, next) {
  res.send(initDownload(req));
});

/**
 * Redirect to requested file URL for direct download
 */
router.get("/download", function (req, res, next) {
  res.redirect(initDownload(req));
});

module.exports = router;
