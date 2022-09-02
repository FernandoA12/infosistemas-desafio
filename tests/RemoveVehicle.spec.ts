import assert from "assert";
import { Vehicle } from "../domain/entities/Vehicle";
import { VehiclesRepository } from "../domain/repositories/VehiclesRepository";
import { VehicleNotFound } from "../domain/errors/VehicleNotFound";
import { RemoveVehicle } from "../application/RemoveVehicle";

let vehicles = [
  new Vehicle({
    id: "1",
    ano: 2022,
    chassi: "xxxxxxxxxxxxxxxxx",
    marca: "any",
    modelo: "any",
    placa: "xxx9999",
    renavam: "00000000000",
  }),
];

const vehiclesRepository: Pick<VehiclesRepository, "remove" | "getById"> = {
  async remove(id) {
    vehicles = vehicles.filter((vehicle) => vehicle.id !== id);
  },
  async getById(id) {
    return vehicles.find((vehicle) => vehicle.id === id) || null;
  },
};

const removeVehicle = new RemoveVehicle(vehiclesRepository);

describe("Remove vehicle", () => {
  it("should remove vehicle", async () => {
    await removeVehicle.execute("1");
    assert.deepEqual(vehicles.length, 0);
  });
  it("should throw an exception if vehicle is not found", async () => {
    assert.rejects(async () => {
      await removeVehicle.execute("2");
    }, new VehicleNotFound());
  });
});
