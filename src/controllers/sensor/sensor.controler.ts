import { Request, Response } from 'express';

import asyncFunction from '../../middlewares/asyncMiddleware';
// import { IRequest } from '../../middlewares/authMiddleware';
import {
  findSensorByGroupName,
  findAllSensor,
  createSensor,
  findDistinctGroupName,
  // createMany,
} from '../../services/sensor.service';
import { validateAddSensor } from '../../validators/sensor';

export const getSensorByGroup = asyncFunction(
  async (req: Request, res: Response): Promise<Response> => {
    const group = req.params.group;
    if (!group)
      return res.status(400).send({ status: 400, msg: 'invalid group' });

    const sensors = await findSensorByGroupName(group);

    if (sensors.length <= 0)
      return res.status(404).send({ status: 404, msg: 'sensors not found' });

    return res.status(200).send({ status: 200, msg: 'success', data: sensors });
  }
);
export const getAllSensors = asyncFunction(
  async (req: Request, res: Response): Promise<Response> => {
    const sensors = await findAllSensor();

    if (sensors.length <= 0)
      return res.status(404).send({ status: 404, msg: 'sensors not found' });

    return res.status(200).send({ status: 200, msg: 'success', data: sensors });
  }
);
export const addSensor = asyncFunction(
  async (req: Request, res: Response): Promise<Response> => {
    const { data, error } = validateAddSensor(req.body);
    if (error)
      return res
        .status(400)
        .send({ status: 400, msg: error.formErrors.fieldErrors });

    if (!data)
      return res
        .status(400)
        .send({ status: 400, msg: 'body can not be empty' });

    const sensors = await createSensor(data);

    return res.status(201).send({ status: 201, msg: 'success', data: sensors });
  }
);
export const getDistinctGroupName = asyncFunction(
  async (req: Request, res: Response): Promise<Response> => {
    const group = await findDistinctGroupName();

    if (group.length <= 0)
      return res.status(404).send({ status: 404, msg: 'group not found' });

    return res.status(200).send({ status: 200, msg: 'success', data: group });
  }
);
// for development only
// export const insertMany = asyncFunction(
//   async (req: Request, res: Response): Promise<Response> => {
//     console.log('body', req.body);
//     const sensors = await createMany(req.body);

//     return res.status(201).send({ status: 201, msg: 'success', data: sensors });
//   }
// );
