import { VehiclesRepository } from "../../domain/repositories/VehiclesRepository";
import { HttpServer } from "../http/Http";
import { ListVehicles } from "../../application/ListVehicles";
import { GetVehicleById } from "../../application/GetVehicleById";
import { CreateVehicle } from "../../application/CreateVehicle";
import { CryptoRandomIdentifier } from "../security/CryptoRandomIdentifier";
import { VehicleProps } from "../../domain/entities/Vehicle";
import { UpdateVehicle } from "../../application/UpdateVehicle";
import { RemoveVehicle } from "../../application/RemoveVehicle";

export class VehicleController {
  constructor(
    readonly server: HttpServer,
    readonly vehiclesRepository: VehiclesRepository
  ) {
    server.on("get", "/vehicles", async (req, res) => {
      try {
        const listVehicles = new ListVehicles(vehiclesRepository);
        const vehicles = await listVehicles.execute();
        res.status(200).send(vehicles);
      } catch (err: any) {
        res.status(400).json({ err: err.message });
      }
    });

    server.on("get", "/vehicles/:id", async (req, res) => {
      try {
        const getVehicleById = new GetVehicleById(vehiclesRepository);
        const vehicle = await getVehicleById.execute(req.params.id);
        res.status(200).send(vehicle);
      } catch (err: any) {
        res.status(400).json({ err: err.message });
      }
    });

    server.on("post", "/vehicles", async (req, res) => {
      try {
        const cryptoRandomIdentifier = new CryptoRandomIdentifier();
        const createVehicle = new CreateVehicle(
          vehiclesRepository,
          cryptoRandomIdentifier
        );
        const vehicle = await createVehicle.execute(
          req.body as Omit<VehicleProps, "id">
        );
        res.status(200).send(vehicle);
      } catch (err: any) {
        res.status(400).json({ err: err.message });
      }
    });

    server.on("put", "/vehicles/:id", async (req, res) => {
      try {
        const updateVehicle = new UpdateVehicle(vehiclesRepository);
        await updateVehicle.execute(
          req.params.id,
          req.body as Omit<VehicleProps, "id">
        );
        res.status(200).end();
      } catch (err: any) {
        res.status(400).json({ err: err.message });
      }
    });

    server.on("delete", "/vehicles/:id", async (req, res) => {
      try {
        const removeVehicle = new RemoveVehicle(vehiclesRepository);
        await removeVehicle.execute(req.params.id);
        res.status(200).end();
      } catch (err: any) {
        res.status(400).json({ err: err.message });
      }
    });
  }
}
