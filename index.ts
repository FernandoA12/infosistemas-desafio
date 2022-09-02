import { VehicleController } from "./infra/controllers/VehiclesController";
import { HttpServerAdapter } from "./infra/http/HttpServerAdapter";
import { ExpressServer } from "./infra/http/ExpressServer";
import { JSONDB } from "./infra/database/JSONDB";
import { VehiclesRepositoryJSONDB } from "./infra/repositories/VehiclesRepositoryJSONDB";
import { DebugAdapter } from "./infra/utils/DebugAdapter";

const PORT = Number(process.env.PORT) || 3333;
const logger = new DebugAdapter("server");
const expressServer = new ExpressServer();
const server = new HttpServerAdapter(expressServer);

const connection = new JSONDB();
const vehiclesRepository = new VehiclesRepositoryJSONDB(connection);

new VehicleController(server, vehiclesRepository);

server.listen(PORT, () => {
  logger.log("🔥 Server listening on port " + PORT);
});
