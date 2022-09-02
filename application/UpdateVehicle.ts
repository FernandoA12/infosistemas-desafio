import { VehicleProps } from "../domain/entities/Vehicle";
import { VehiclesRepository } from "../domain/repositories/VehiclesRepository";
import { VehicleNotFound } from "../domain/errors/VehicleNotFound";

export class UpdateVehicle {
  constructor(
    private vehiclesRepository: Pick<VehiclesRepository, "update" | "getById">
  ) {}

  async execute(id: string, data: Partial<Omit<VehicleProps, "id">>) {
    const vehicle = await this.vehiclesRepository.getById(id);

    if (!vehicle) {
      throw new VehicleNotFound();
    }

    vehicle.update(data);
    await this.vehiclesRepository.update(id, vehicle);
  }
}
