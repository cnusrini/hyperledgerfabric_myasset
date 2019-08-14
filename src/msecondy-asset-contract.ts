/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { MsecondyAsset } from './msecondy-asset';

@Info({title: 'MsecondyAssetContract', description: 'My Smart Contract' })
export class MsecondyAssetContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async msecondyAssetExists(ctx: Context, msecondyAssetId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(msecondyAssetId);
        return (!!buffer && buffer.length > 0);
    }

    @Transaction()
    public async createMsecondyAsset(ctx: Context, msecondyAssetId: string, value: string): Promise<void> {
        const exists = await this.msecondyAssetExists(ctx, msecondyAssetId);
        if (exists) {
            throw new Error(`The msecondy asset ${msecondyAssetId} already exists`);
        }
        const msecondyAsset = new MsecondyAsset();
        msecondyAsset.value = value;
        const buffer = Buffer.from(JSON.stringify(msecondyAsset));
        await ctx.stub.putState(msecondyAssetId, buffer);
    }

    @Transaction(false)
    @Returns('MsecondyAsset')
    public async readMsecondyAsset(ctx: Context, msecondyAssetId: string): Promise<MsecondyAsset> {
        const exists = await this.msecondyAssetExists(ctx, msecondyAssetId);
        if (!exists) {
            throw new Error(`The msecondy asset ${msecondyAssetId} does not exist`);
        }
        const buffer = await ctx.stub.getState(msecondyAssetId);
        const msecondyAsset = JSON.parse(buffer.toString()) as MsecondyAsset;
        return msecondyAsset;
    }

    @Transaction()
    public async updateMsecondyAsset(ctx: Context, msecondyAssetId: string, newValue: string): Promise<void> {
        const exists = await this.msecondyAssetExists(ctx, msecondyAssetId);
        if (!exists) {
            throw new Error(`The msecondy asset ${msecondyAssetId} does not exist`);
        }
        const msecondyAsset = new MsecondyAsset();
        msecondyAsset.value = newValue;
        const buffer = Buffer.from(JSON.stringify(msecondyAsset));
        await ctx.stub.putState(msecondyAssetId, buffer);
    }

    @Transaction()
    public async deleteMsecondyAsset(ctx: Context, msecondyAssetId: string): Promise<void> {
        const exists = await this.msecondyAssetExists(ctx, msecondyAssetId);
        if (!exists) {
            throw new Error(`The msecondy asset ${msecondyAssetId} does not exist`);
        }
        await ctx.stub.deleteState(msecondyAssetId);
    }

}
