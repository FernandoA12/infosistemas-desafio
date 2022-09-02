import debug from "debug";
import { Logger } from "./Logger";

export class DebugAdapter implements Logger {
  private debug: debug.Debugger;

  constructor(id: string) {
    if (!id) {
      throw new Error("O id não pode ser vazio");
    }
    this.debug = debug(`app:${id}`);
  }

  log(message: string): void {
    console.clear();
    this.debug(message);
  }
}
