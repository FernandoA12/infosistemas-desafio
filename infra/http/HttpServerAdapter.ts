import { HttpServer, Handler, Method } from "./Http";
import { Server } from "./Server";

export class HttpServerAdapter implements HttpServer {
  constructor(private app: Server) {}

  getApp() {
    return this.app.getServer();
  }

  registerMiddleware(handler: Handler): void {
    this.app.use(handler);
  }

  on(method: Method, route: string, ...handlers: Handler[]): void {
    this.app[method](route, ...handlers);
  }

  listen(port: number, cb: () => void): void {
    this.app.listen(port, cb);
  }
}
