import { VehiclesRepository } from "../domain/repositories/VehiclesRepository";
import { VehicleNotFound } from "../domain/errors/VehicleNotFound";

export class RemoveVehicle {
  constructor(
    private vehiclesRepository: Pick<VehiclesRepository, "remove" | "getById">
  ) {}

  async execute(id: string) {
    const vehicle = await this.vehiclesRepository.getById(id);
    if (!vehicle) {
      throw new VehicleNotFound();
    }
    await this.vehiclesRepository.remove(id);
  }
}
