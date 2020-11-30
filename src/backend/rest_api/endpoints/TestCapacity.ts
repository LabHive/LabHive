import express from 'express';
import { UserRoles } from '../../../lib/userRoles';
import { TestCapacity, UserLabDiag } from '../../lib/database/models';
import { ITestCapacity } from '../../lib/database/schemas/ITestCapacity';
import JsonSchema, { schemas } from '../jsonSchemas/JsonSchema';
import { OPT } from '../config/options';
import utils from '../utils';
import { Optional } from 'lib/optional'
import { getFilterForPublicUsers } from 'backend/lib';

interface UpdatePayload {
  totalCapacity: number,
  usedCapacity: number,
  positiveRate: Optional<number>,
  sampleBackup: Optional<number>,
  createdAt: string
}

class TestCapacityEndpoint {
  public async update(req: express.Request, resp: express.Response, next: express.NextFunction) {
    const token = utils.getUnverifiedDecodedJWT(req)
    if (token.role !== UserRoles.LAB_DIAG) {
      return utils.badRequest(resp);
    }

    const capacity: UpdatePayload = req.body;
    if (!JsonSchema.validate(capacity, schemas.testCapacity)) {
      return utils.badRequest(resp)
    }

    const capacities = await TestCapacity.find({user: token.sub}).sort({created: -1}).exec()
    const target = new Date(capacity.createdAt)
    target.setHours(0)
    target.setMinutes(0)
    target.setSeconds(0)

    const later = new Date(target)
    later.setDate(target.getDate() + 1)

    const targetList = capacities.filter(i => {
      i.createdAt < later && i.createdAt > target
    })

    let toSave : ITestCapacity
    if (targetList.length == 0) {
      toSave = new TestCapacity({
        ...capacity,
        user: token.sub
      })
    } else {
      toSave = targetList[0]
      toSave.totalCapacity = capacity.totalCapacity
      toSave.usedCapacity = capacity.usedCapacity
      toSave.positiveRate = capacity.positiveRate
      toSave.sampleBackup = capacity.sampleBackup
    }

    toSave.save().then(() => {
      return utils.successResponse(resp);
    }).catch(() => {
      return utils.internalError(resp);
    })
  }


  public async get(req: express.Request, resp: express.Response, next: express.NextFunction) {
    const token = utils.getUnverifiedDecodedJWT(req)
    
    const capacities = await TestCapacity
      .find({user: token.sub})
      .sort({createdAt: -1})
      .select({
        createdAt: 1,
        updatedAt: 1,
        totalCapacity: 1,
        usedCapacity: 1,
        positiveRate: 1,
        sampleBackup: 1,
        _id: 0
      }).lean().exec()
    resp.send({success: true, data: capacities})
  }


  public async query(req: express.Request, resp: express.Response, next: express.NextFunction) {
    const token = utils.getUnverifiedDecodedJWT(req)
    if (token.role != UserRoles.LAB_DIAG) {
      return utils.badRequest(resp)
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filter: any = {createdAt: {$gte: today}}

    if (OPT.STAGING) {
      filter = {
        staging: true
      }
    }

    const entries = (await TestCapacity.find(filter).populate('user', {
      location: 1,
      organization: 1,
      slug: 1,
      contact: 1,
      _id: 0,
      __t: 0
    }, UserLabDiag, getFilterForPublicUsers())
      .select({_id: 0}).lean().exec()).filter(i => i.user != null)

    resp.send({
      success: true,
      data: entries
    })
  }
}



export default new TestCapacityEndpoint();
