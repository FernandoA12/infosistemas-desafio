import { VehiclesRepository } from "../domain/repositories/VehiclesRepository";
import { Identifier } from "../infra/security/Identifier";
import { Vehicle, VehicleProps } from "../domain/entities/Vehicle";

export class CreateVehicle {
  constructor(
    private vehiclesRepository: Pick<VehiclesRepository, "save">,
    private identifier: Identifier
  ) {}

  async execute(props: Omit<VehicleProps, "id">) {
    const vehicle = new Vehicle({
      id: this.identifier.createId(),
      ...props,
    });

    await this.vehiclesRepository.save(vehicle);

    return vehicle;
  }
}
