import http from "http";
import express, { Express } from "express";
import { Handler } from "./Http";
import { Server } from "./Server";

export class ExpressServer implements Server {
  private app: Express = express();

  constructor() {
    this.app.use(express.json());
  }
  getServer() {
    return http.createServer(this.app);
  }

  use(handler: Handler): void {
    this.app.use(handler);
  }
  listen(port: number, callback: () => void): void {
    this.app.listen(port, callback);
  }
  get(route: string, ...handler: Handler[]): void {
    this.app.get(route, ...handler);
  }
  post(route: string, ...handler: Handler[]): void {
    this.app.post(route, ...handler);
  }
  put(route: string, ...handler: Handler[]): void {
    this.app.put(route, ...handler);
  }
  delete(route: string, ...handler: Handler[]): void {
    this.app.delete(route, ...handler);
  }
}
