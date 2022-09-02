export class VehicleNotFound extends Error {
  constructor() {
    super("Vehicle not found");
    this.name = "VehicleNotFound";
  }
}
