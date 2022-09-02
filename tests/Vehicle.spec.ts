import assert from "assert";
import { Vehicle } from "../domain/entities/Vehicle";
import { VehicleFieldIsntValid } from "../domain/errors/VehicleFieldIsntValid";

const INITIAL_VEHICLE = {
  id: "1",
  placa: "XXX9999",
  chassi: "XXXXXXXXXXXXXXXXX",
  renavam: "99999999999",
  modelo: "any",
  marca: "any",
  ano: 2022,
};

it("should create a new instance of vehicle", () => {
  const vehicle = new Vehicle(INITIAL_VEHICLE);

  const data = vehicle.toData();

  assert.deepEqual(data, INITIAL_VEHICLE);
});

it("should throw an exception if the field placa is not valid", () => {
  assert.throws(() => {
    new Vehicle({
      id: "1",
      placa: "XXX999",
      chassi: "XXXXXXXXXXXXXXXXX",
      renavam: "99999999999",
      modelo: "any",
      marca: "any",
      ano: 2022,
    });
  }, new VehicleFieldIsntValid("placa"));
});

it("should throw an exception if the field chassi is not valid", () => {
  assert.throws(() => {
    new Vehicle({
      id: "1",
      placa: "XXX9999",
      chassi: "XXXXXXXXXXXXXXXX",
      renavam: "99999999999",
      modelo: "any",
      marca: "any",
      ano: 2022,
    });
  }, new VehicleFieldIsntValid("chassi"));
});

it("should throw an exception if the field renavam is not valid", () => {
  assert.throws(() => {
    new Vehicle({
      id: "1",
      placa: "XXX9999",
      chassi: "XXXXXXXXXXXXXXXXX",
      renavam: "9999999999",
      modelo: "any",
      marca: "any",
      ano: 2022,
    });
  }, new VehicleFieldIsntValid("renavam"));
});
