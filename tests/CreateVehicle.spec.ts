import { VehiclesRepository } from "../domain/repositories/VehiclesRepository";
import { Vehicle } from "../domain/entities/Vehicle";
import { Identifier } from "../infra/security/Identifier";
import assert from "assert";
import { CreateVehicle } from "../application/CreateVehicle";

const vehicles: Vehicle[] = [];

describe("Create vehicle", () => {
  it("should create a new vehicle", async () => {
    const vehiclesRepository: Pick<VehiclesRepository, "save"> = {
      async save(vehicle) {
        vehicles.push(vehicle);
      },
    };

    const identifier: Identifier = {
      createId() {
        return "1";
      },
    };

    const createVehicle = new CreateVehicle(vehiclesRepository, identifier);
    const vehicle = await createVehicle.execute({
      placa: "XXX9999",
      chassi: "XXXXXXXXXXXXXXXXX",
      renavam: "99999999999",
      modelo: "any",
      marca: "any",
      ano: 2022,
    });

    assert.deepEqual(vehicle.id, "1");
    assert.deepEqual(vehicles.length, 1);
  });
});
