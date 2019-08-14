/*
* Use this file for functional testing of your smart contract.
* Fill out the arguments and return values for a function and
* use the CodeLens links above the transaction blocks to
* invoke/submit transactions.
* All transactions defined in your smart contract are used here
* to generate tests, including those functions that would
* normally only be used on instantiate and upgrade operations.
* This basic test file can also be used as the basis for building
* further functional tests to run as part of a continuous
* integration pipeline, or for debugging locally deployed smart
* contracts by invoking/submitting individual transactions.
*/
/*
* Generating this test file will also trigger an npm install
* in the smart contract project directory. This installs any
* package dependencies, including fabric-network, which are
* required for this test file to be run locally.
*/

'use strict';

const assert = require('assert');
const fabricNetwork = require('fabric-network');
const SmartContractUtil = require('./js-smart-contract-util');
const os = require('os');
const path = require('path');

describe('MsecondyAssetContract-mysecondasset@0.0.1' , () => {

    const homedir = os.homedir();
    const walletPath = path.join(homedir, '.fabric-vscode', 'wallets', 'local_fabric_wallet');
    const gateway = new fabricNetwork.Gateway();
    const wallet = new fabricNetwork.FileSystemWallet(walletPath);
    const identityName = 'admin';
    let connectionProfile;

    before(async () => {
        connectionProfile = await SmartContractUtil.getConnectionProfile();
    });

    beforeEach(async () => {

        const discoveryAsLocalhost = SmartContractUtil.hasLocalhostURLs(connectionProfile);
        const discoveryEnabled = true;

        const options = {
            wallet: wallet,
            identity: identityName,
            discovery: {
                asLocalhost: discoveryAsLocalhost,
                enabled: discoveryEnabled
            }
        };

        await gateway.connect(connectionProfile, options);
    });

    afterEach(async () => {
        gateway.disconnect();
    });

    describe('msecondyAssetExists', () =>{
        it('should submit msecondyAssetExists transaction', async () => {
            // TODO: populate transaction parameters
            const msecondyAssetId = 'EXAMPLE';
            const args = [ msecondyAssetId];

            const response = await SmartContractUtil.submitTransaction('MsecondyAssetContract', 'msecondyAssetExists', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('createMsecondyAsset', () =>{
        it('should submit createMsecondyAsset transaction', async () => {
            // TODO: populate transaction parameters
            const msecondyAssetId = 'EXAMPLE';
            const value = 'EXAMPLE';
            const args = [ msecondyAssetId, value];

            const response = await SmartContractUtil.submitTransaction('MsecondyAssetContract', 'createMsecondyAsset', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readMsecondyAsset', () =>{
        it('should submit readMsecondyAsset transaction', async () => {
            // TODO: populate transaction parameters
            const msecondyAssetId = 'EXAMPLE';
            const args = [ msecondyAssetId];

            const response = await SmartContractUtil.submitTransaction('MsecondyAssetContract', 'readMsecondyAsset', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('updateMsecondyAsset', () =>{
        it('should submit updateMsecondyAsset transaction', async () => {
            // TODO: populate transaction parameters
            const msecondyAssetId = 'EXAMPLE';
            const newValue = 'EXAMPLE';
            const args = [ msecondyAssetId, newValue];

            const response = await SmartContractUtil.submitTransaction('MsecondyAssetContract', 'updateMsecondyAsset', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('deleteMsecondyAsset', () =>{
        it('should submit deleteMsecondyAsset transaction', async () => {
            // TODO: populate transaction parameters
            const msecondyAssetId = 'EXAMPLE';
            const args = [ msecondyAssetId];

            const response = await SmartContractUtil.submitTransaction('MsecondyAssetContract', 'deleteMsecondyAsset', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

});
