'use strict';

const express = require('express');
const router = express.Router();
const CardanoCli = require('cardanocli-js');
const config = require('./../../src/helper').config;

const cardanoCli = new CardanoCli({
    network: config.cli.network,
    era: config.cli.era,
    dir: config.cli.dir,
    shelleyGenesisPath: config.cli.shelleyGenesisPath
});

/**
 * Build and return Raw Transaction File Path
 */
router.post('/transactionBuildRaw', function(req, res, next) {
    res.send(cardanoCli.transactionBuildRaw(req.body));
});

/**
 * Calculate and return Transaction Minimum Fees
 */
router.post('/transactionCalculateMinFee', function(req, res, next) {
    res.send(cardanoCli.transactionCalculateMinFee(req.body));
});

/**
 * Sign and return Signed Transaction File Path
 */
router.post('/transactionSign', function(req, res, next) {
    res.send(cardanoCli.transactionSign(req.body));
});

/**
 * Witness and return Witnessed Transaction File Path
 */
router.post('/transactionWitness', function(req, res, next) {
    res.send(cardanoCli.transactionWitness(req.body));
});

/**
 * Assemble Witnessed Transaction File and return file Path
 */
router.post('/transactionAssemble', function(req, res, next) {
    res.send(cardanoCli.transactionAssemble(req.body));
});

/**
 * Receive Transaction file and return Tx ID
 */
router.post('/transactionTxid', function(req, res, next) {
    res.send(cardanoCli.transactionTxid(req.body));
});

/**
 * Submit a transaction file on the network and return Tx ID
 */
router.get('/transactionSubmit', function(req, res, next) {
    res.send(cardanoCli.transactionSubmit(req.query.filePath));
});

module.exports = router;
