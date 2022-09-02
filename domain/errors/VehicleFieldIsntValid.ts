export class VehicleFieldIsntValid extends Error {
  constructor(field: string) {
    super(`${field} is not a valid vehicle field`);
    this.name = "VehicleFieldIsntValid";
  }
}
