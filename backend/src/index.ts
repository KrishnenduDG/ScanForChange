import { app } from "./app";
import { PORT } from "./config";
import { initServer } from "./configurations/bootstrap";

app.listen(PORT, () => {
  initServer();
  console.log(`Server running at http://localhost:${PORT}`);
});
