import * as http from "http";
import app from "./src/app";

const server = http.createServer(app);

const PORT = 3001;
server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
