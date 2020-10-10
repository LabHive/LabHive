import express from 'express';
import { getTestCoverage } from '../database/database';
import utils from '../utils';

export async function testCoverage(
  req: express.Request,
  res: express.Response
) {
  try {
    res.send({
      success: true,
      data: await getTestCoverage()
    });
  }
  catch(err) {
    utils.internalError(res)
  }
}
