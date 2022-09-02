import { VehiclesRepository } from "../domain/repositories/VehiclesRepository";
import { Identifier } from "../infra/security/Identifier";
import { Vehicle } from "../domain/entities/Vehicle";

export class CreateVehicle {
  constructor(
    private vehiclesRepository: Pick<VehiclesRepository, "save">,
    private identifier: Identifier
  ) {}

  async execute(props: Omit<Vehicle, "toData" | "id">) {
    const vehicle = new Vehicle({
      id: this.identifier.createId(),
      ...props,
    });

    await this.vehiclesRepository.save(vehicle);

    return vehicle;
  }
}
