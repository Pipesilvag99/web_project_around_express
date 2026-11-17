import type { Request, Response } from "express";
import { readJsonFile } from "../utils/readJsonFile.js";
import {
  NOT_FOUND_STATUS,
  SERVER_ERROR_STATUS,
  serverErrorMessage,
  userNotFoundMessage,
} from "../utils/errorMessages.js";

interface User {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await readJsonFile<User[]>("users.json");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR_STATUS).json({ message: serverErrorMessage });
  }
}

export async function getUserById(req: Request<{ id: string }>, res: Response) {
  try {
    const users = await readJsonFile<User[]>("users.json");
    const foundUser = users.find((user) => user._id === req.params.id);

    if (!foundUser) {
      res.status(NOT_FOUND_STATUS).json({ message: userNotFoundMessage });
      return;
    }

    res.json(foundUser);
  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR_STATUS).json({ message: serverErrorMessage });
  }
}
