import { VehicleFieldIsntValid } from "../errors/VehicleFieldIsntValid";

export class Vehicle {
  public readonly id!: string;
  public placa!: string;
  public chassi!: string;
  public renavam!: string;
  public modelo!: string;
  public marca!: string;
  public ano!: number;

  constructor(props: Omit<Vehicle, "toData">) {
    const placaRegex = /^\w{3}\d{4}|^\w{3}\d{1}\w{1}\d{2}/i;
    const chassiRegex = /^\w{17}/i;
    const renavamRegex = /^\w{11}/i;

    if (!placaRegex.test(props.placa)) {
      throw new VehicleFieldIsntValid("placa");
    }

    if (!chassiRegex.test(props.chassi)) {
      throw new VehicleFieldIsntValid("chassi");
    }

    if (!renavamRegex.test(props.renavam)) {
      throw new VehicleFieldIsntValid("renavam");
    }

    Object.assign(this, props);
  }

  toData() {
    const { toData, ...vehicle } = this;
    return vehicle;
  }
}