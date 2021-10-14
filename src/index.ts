import { PodInfoRoute } from "./routes/pod-info";
import { IServer, Server } from "./server";

(async () => {

  const server: IServer = new Server({
    host: process.env.HOST,
    port: (process.env.PORT) ?
      Number(process.env.PORT) : undefined
  });

  server.mount("/", new PodInfoRoute());

  const url = await server.listen();
  console.debug(`listening at ${url}`);

})();
