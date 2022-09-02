import { Vehicle } from "../../domain/entities/Vehicle";
import { VehiclesRepository } from "../../domain/repositories/VehiclesRepository";
import { Connection } from "../database/Connection";

export class VehiclesRepositoryJSONDB implements VehiclesRepository {
  constructor(private connection: Connection) {
    this.connection.setCollection("vehicles");
  }

  async save(vehicle: Vehicle): Promise<void> {
    await this.connection.create(vehicle.toData());
  }

  async getById(id: string): Promise<Vehicle | null> {
    const vehicles = await this.connection.get({ id });
    if (vehicles.length <= 0) {
      return null;
    }

    return new Vehicle(vehicles[0]);
  }

  async list(): Promise<Vehicle[]> {
    const vehicles = (await this.connection.get({})) as Vehicle[];

    return vehicles.map((vehicle) => new Vehicle(vehicle));
  }

  async update(id: string, vehicle: Vehicle): Promise<void> {
    await this.connection.update({ id }, vehicle.toData());
  }

  async remove(id: string): Promise<void> {
    await this.connection.delete({ id });
  }
}
