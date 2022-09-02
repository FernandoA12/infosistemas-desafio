import { VehiclesRepository } from "../domain/repositories/VehiclesRepository";
import { Vehicle } from "../domain/entities/Vehicle";
import assert from "assert";
import { GetVehicleById } from "../application/GetVehicleById";
import { VehicleNotFound } from "../domain/errors/VehicleNotFound";

const vehicles: Vehicle[] = [
  new Vehicle({
    id: "1",
    placa: "XXX9999",
    ano: 2022,
    chassi: "xxxxxxxxxxxxxxxxx",
    marca: "any",
    modelo: "any",
    renavam: "xxxxxxxxxxx",
  }),
];

const vehiclesRepository: Pick<VehiclesRepository, "getById"> = {
  async getById(id: string) {
    return vehicles.find((vehicle) => vehicle.id === id) || null;
  },
};
const getVehicleById = new GetVehicleById(vehiclesRepository);

describe("Get Vehicle by id", () => {
  it("should return the vehicle by id", async () => {
    const vehicle = await getVehicleById.execute("1");
    assert.deepEqual(vehicle, vehicles[0].toData());
  });

  it("should throw an exception if the vehicle is not found", async () => {
    assert.rejects(async () => {
      await getVehicleById.execute("2");
    }, new VehicleNotFound());
  });
});
