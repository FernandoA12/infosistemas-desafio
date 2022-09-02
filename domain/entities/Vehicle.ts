import { VehicleFieldIsntValid } from "../errors/VehicleFieldIsntValid";

export type VehicleProps = Omit<Vehicle, "toData" | "update">;

export class Vehicle {
  public readonly id!: string;
  public placa!: string;
  public chassi!: string;
  public renavam!: string;
  public modelo!: string;
  public marca!: string;
  public ano!: number;

  constructor(props: VehicleProps) {
    this.update(props);

    if (props.id) {
      this.id = props.id;
    }
  }

  update(data: Partial<VehicleProps>) {
    const placaRegex = /^[a-zA-Z]{3}\d{4}|^[a-zA-Z]{3}\d{1}[a-zA-Z]{1}\d{2}/i;
    const chassiRegex = /^\w{17}/i;
    const renavamRegex = /^\d{11}/i;

    const { id, ...props } = data;

    if (props.placa && !placaRegex.test(props.placa)) {
      throw new VehicleFieldIsntValid("placa");
    }

    if (props.chassi && !chassiRegex.test(props.chassi)) {
      throw new VehicleFieldIsntValid("chassi");
    }

    if (props.renavam && !renavamRegex.test(props.renavam)) {
      throw new VehicleFieldIsntValid("renavam");
    }

    Object.assign(this, props);
  }

  toData() {
    const { toData, update, ...vehicle } = this;
    return vehicle;
  }
}
