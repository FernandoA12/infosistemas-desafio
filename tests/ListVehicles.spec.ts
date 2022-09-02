import { VehiclesRepository } from "../domain/repositories/VehiclesRepository";
import { Vehicle } from "../domain/entities/Vehicle";
import assert from "assert";
import { ListVehicles } from "../application/ListVehicles";

const vehicles = [
  new Vehicle({
    ano: 2022,
    chassi: "xxxxxxxxxxxxxxxxx",
    id: "1",
    marca: "any",
    modelo: "any",
    placa: "xxx9999",
    renavam: "00000000000",
  }),
];

describe("List vehicle", () => {
  it("should return a list of vehicle registered", async () => {
    const vehiclesRepository: Pick<VehiclesRepository, "list"> = {
      async list() {
        return vehicles;
      },
    };
    const listVehicles = new ListVehicles(vehiclesRepository);
    const list = await listVehicles.execute();

    assert.deepEqual(list, [
      {
        ano: 2022,
        chassi: "xxxxxxxxxxxxxxxxx",
        id: "1",
        marca: "any",
        modelo: "any",
        placa: "xxx9999",
        renavam: "00000000000",
      },
    ]);
  });
});
