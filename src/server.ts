import express from "express";
import { URL } from "url";
import { IRoute } from "./route";

export interface IServer {
  mount(path: string, route: IRoute): void;
  listen(): Promise<URL>;
}

type ServerOptions = {
  host?: string;
  port?: number;
};

const DEFAULT_HOST = "0.0.0.0";
const DEFAULT_PORT = 5000;

export class Server implements IServer {

  private host: string;
  private port: number;

  private app: express.Express = express();

  constructor(options?: ServerOptions) {
    this.host = options?.host ?? DEFAULT_HOST;
    this.port = options?.port ?? DEFAULT_PORT;
  }

  mount(path: string, route: IRoute): void {
    this.app.use(path, (_, res) => res.end(route.handle()));
  }

  listen(): Promise<URL> {
    return new Promise<URL>((resolve) =>
      this.app.listen(
        this.port, this.host,
        () => resolve(new URL(`http://${this.host}:${this.port}`))
      )
    );
  }

}
