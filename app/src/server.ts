import app from "./app.js";
import { initDb } from "./db/db.js";
("./db/db.js");

async function bootstrap() {
  await initDb();
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap();
