import { Vehicle } from "../entities/Vehicle";

export interface VehiclesRepository {
  save(vehicle: Vehicle): Promise<void>;
  getById(id: string): Promise<Vehicle>;
  list(): Promise<Vehicle[]>;
  update(id: string, vehicle: Vehicle): Promise<void>;
  remove(id: string): Promise<void>;
}
