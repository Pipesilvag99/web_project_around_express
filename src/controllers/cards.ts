import type { Request, Response } from "express";
import { readJsonFile } from "../utils/readJsonFile.js";
import { SERVER_ERROR_STATUS, serverErrorMessage } from "../utils/errorMessages.js";

interface Card {
  _id: string;
  name: string;
  link: string;
  owner: unknown;
  likes: unknown[];
  createdAt: string;
}

export async function getCards(req: Request, res: Response) {
  try {
    const cards = await readJsonFile<Card[]>("cards.json");
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR_STATUS).json({ message: serverErrorMessage });
  }
}
