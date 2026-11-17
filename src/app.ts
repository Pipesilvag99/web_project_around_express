import express, { type NextFunction, type Request, type Response } from "express";
import usersRouter from "./routes/users.js";
import cardsRouter from "./routes/cards.js";
import {
  NOT_FOUND_STATUS,
  SERVER_ERROR_STATUS,
  resourceNotFoundMessage,
  serverErrorMessage,
} from "./utils/errorMessages.js";

const PORT = 3000;
const app = express();

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Cualquier ruta que no coincida con las anteriores (incluida "/")
app.use((req: Request, res: Response) => {
  res.status(NOT_FOUND_STATUS).json({ message: resourceNotFoundMessage });
});

// Manejador central de errores: si algo falla y llega aquí, el servidor no se cae
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(SERVER_ERROR_STATUS).json({ message: serverErrorMessage });
});

app.listen(PORT, () => {
  console.warn(`Servidor ejecutándose en http://localhost:${PORT}`);
});
