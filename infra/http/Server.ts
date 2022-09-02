import { Handler } from "./Http";

export interface Server {
  getServer(): any;
  use(handler: Handler): void;
  listen(port: number, callback: () => void): void;
  get(route: string, ...handler: Handler[]): void;
  post(route: string, ...handler: Handler[]): void;
  put(route: string, ...handler: Handler[]): void;
  delete(route: string, ...handler: Handler[]): void;
}
