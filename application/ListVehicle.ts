import { VehiclesRepository } from "../domain/repositories/VehiclesRepository";

export class ListVehicle {
  constructor(private vehiclesRepository: Pick<VehiclesRepository, "list">) {}

  async execute() {
    const vehicles = await this.vehiclesRepository.list();
    return vehicles.map((vehicle) => vehicle.toData());
  }
}
