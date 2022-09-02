import { VehiclesRepository } from "../domain/repositories/VehiclesRepository";
import { VehicleNotFound } from "../domain/errors/VehicleNotFound";

export class GetVehicleById {
  constructor(
    private vehiclesRepository: Pick<VehiclesRepository, "getById">
  ) {}

  async execute(id: string) {
    const vehicle = await this.vehiclesRepository.getById(id);
    if (!vehicle) {
      throw new VehicleNotFound();
    }
    return vehicle;
  }
}
