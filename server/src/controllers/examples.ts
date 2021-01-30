import { Request, Response } from "express";
import { Example, ExampleDoc } from "../models/example";

const getById = async (req: Request, res: Response): Promise<void> => {
  const id = req?.params?.id;
  console.log(`HTTP GET /examples/${id}`);

  try {
    const example = await Example.findById(id);
    res.send(example);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const get = async (req: Request, res: Response): Promise<void> => {
  console.log(`HTTP GET /examples`);

  try {
    const examples = await Example.find();
    res.send(examples);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  console.log(`HTTP POST /examples`);

  const foo = req.body.foo;
  const bar = req.body.bar;

  const example = new Example({ foo, bar });

  try {
    const result = await example.save();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const id = req?.params?.id;
  console.log(`HTTP PUT examples/${id}`);

  const update: Partial<ExampleDoc> = {};

  if ("foo" in req.body) {
    update["foo"] = req.body.foo;
  }

  if ("bar" in req.body) {
    update["bar"] = req.body.bar;
  }

  if (Object.keys(update).length === 0) {
    res.sendStatus(400);
    return;
  }

  const options = { new: true };

  try {
    const example = await Example.findByIdAndUpdate(id, update, options);
    res.status(200).send(example);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  const id = req?.params?.id;
  console.log(`HTTP DELETE /examples/${id}`);

  try {
    await Example.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const ExamplesController = {
  getById,
  get,
  create,
  update,
  remove,
};
