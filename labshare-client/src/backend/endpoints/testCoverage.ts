import express from 'express';
import { getTestCoverage } from '../database/database';

export async function testCoverage(
  req: express.Request,
  res: express.Response
) {
  res.send({
    success: true,
    data: await getTestCoverage()
  });
}
