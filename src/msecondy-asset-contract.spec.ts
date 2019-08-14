/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import { MsecondyAssetContract } from '.';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import winston = require('winston');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext implements Context {
    public stub: sinon.SinonStubbedInstance<ChaincodeStub> = sinon.createStubInstance(ChaincodeStub);
    public clientIdentity: sinon.SinonStubbedInstance<ClientIdentity> = sinon.createStubInstance(ClientIdentity);
    public logging = {
        getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
        setLevel: sinon.stub(),
     };
}

describe('MsecondyAssetContract', () => {

    let contract: MsecondyAssetContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new MsecondyAssetContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"msecondy asset 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"msecondy asset 1002 value"}'));
    });

    describe('#msecondyAssetExists', () => {

        it('should return true for a msecondy asset', async () => {
            await contract.msecondyAssetExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a msecondy asset that does not exist', async () => {
            await contract.msecondyAssetExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createMsecondyAsset', () => {

        it('should create a msecondy asset', async () => {
            await contract.createMsecondyAsset(ctx, '1003', 'msecondy asset 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"msecondy asset 1003 value"}'));
        });

        it('should throw an error for a msecondy asset that already exists', async () => {
            await contract.createMsecondyAsset(ctx, '1001', 'myvalue').should.be.rejectedWith(/The msecondy asset 1001 already exists/);
        });

    });

    describe('#readMsecondyAsset', () => {

        it('should return a msecondy asset', async () => {
            await contract.readMsecondyAsset(ctx, '1001').should.eventually.deep.equal({ value: 'msecondy asset 1001 value' });
        });

        it('should throw an error for a msecondy asset that does not exist', async () => {
            await contract.readMsecondyAsset(ctx, '1003').should.be.rejectedWith(/The msecondy asset 1003 does not exist/);
        });

    });

    describe('#updateMsecondyAsset', () => {

        it('should update a msecondy asset', async () => {
            await contract.updateMsecondyAsset(ctx, '1001', 'msecondy asset 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"msecondy asset 1001 new value"}'));
        });

        it('should throw an error for a msecondy asset that does not exist', async () => {
            await contract.updateMsecondyAsset(ctx, '1003', 'msecondy asset 1003 new value').should.be.rejectedWith(/The msecondy asset 1003 does not exist/);
        });

    });

    describe('#deleteMsecondyAsset', () => {

        it('should delete a msecondy asset', async () => {
            await contract.deleteMsecondyAsset(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a msecondy asset that does not exist', async () => {
            await contract.deleteMsecondyAsset(ctx, '1003').should.be.rejectedWith(/The msecondy asset 1003 does not exist/);
        });

    });

});
