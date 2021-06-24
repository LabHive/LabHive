import express from 'express';
import { UserRoles } from '../../../lib/userRoles';
import { TestCapacity, UserCommon, UserLabDiag } from '../../lib/database/models';
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
        _id: 1
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

  public async getTestCapacity(req: express.Request, resp: express.Response, next: express.NextFunction) {

    let page = 0
    try {
        if (typeof req.query.page !== "string") throw new Error()
        page = parseInt(req.query.page ?? '1') - 1
    }
    catch {
        page = 0
    }
    page = Math.max(page, 0)


    const token = utils.getUnverifiedDecodedJWT(req)

    let count = await TestCapacity
    .find({user: token.sub}).lean().countDocuments().exec()

    let filters = {
      createdAt: 1,          //include creation date
      totalCapacity: 1,      //include "Capacity"
      usedCapacity: 1,       //include "Tests"
      positiveRate: 1,       //include "Positive Rate"
      sampleBackup: 1,       //include "Backlog"
      _id: 0                 //exclude id
    }

    const capacities = await TestCapacity
    .find({user: token.sub}) //Filter user
    .sort({createdAt: -1})   //Sort by date, newest first.
    .select(filters) //Filter
    .lean() //Returns plain JavaScript object instead of MongooseDocuments 
    .skip(20 * page).limit(20) //Pagination
    .exec() //Execute all that above

    resp.send({success: true, data: capacities, totalResults: count})
  }

  public async getResources(req: express.Request, resp: express.Response, next: express.NextFunction) {

    const token = utils.getUnverifiedDecodedJWT(req)

    let filters = {
      lookingFor: 1,
      offers: 1,
      role: 1,
      details: 1,
      _id: 1                 
    }
    const capacities = await UserCommon
    .find({_id: token.sub}) //Filter user
    .select(filters) //Filter
    .lean() //Returns plain JavaScript object instead of MongooseDocuments 
    .exec() //Execute all that above

    resp.send({success: true, data: capacities})
  }

}



export default new TestCapacityEndpoint();
