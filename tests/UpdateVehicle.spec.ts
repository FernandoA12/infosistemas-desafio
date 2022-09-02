import { VehiclesRepository } from "../domain/repositories/VehiclesRepository";
import { Vehicle } from "../domain/entities/Vehicle";
import assert from "assert";
import { UpdateVehicle } from "../application/UpdateVehicle";
import { VehicleNotFound } from "../domain/errors/VehicleNotFound";

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

const vehiclesRepository: Pick<VehiclesRepository, "update" | "getById"> = {
  async update(id, vehicle) {
    vehicles = vehicles.map((oldVehicle) => {
      if (oldVehicle.id === id) {
        return vehicle;
      }
      return oldVehicle;
    });
  },
  async getById(id) {
    return vehicles.find((vehicle) => vehicle.id === id) || null;
  },
};

const updateVehicle = new UpdateVehicle(vehiclesRepository);

describe("Update vehicle", () => {
  it("should update vehicle by id", async () => {
    const vehicle = await updateVehicle.execute("1", {
      ano: 2021,
    });

    assert.deepEqual(vehicles[0].toData(), vehicle);
  });

  it("should throw an exception if the vehicle is not found", () => {
    assert.rejects(async () => {
      await updateVehicle.execute("2", { marca: "changed" });
    }, new VehicleNotFound());
  });
});
