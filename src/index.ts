import { Fib32Route } from "./routes/fib-32";
import { PodInfoRoute } from "./routes/pod-info";
import { SecretRoute } from "./routes/secret";
import { IServer, Server } from "./server";

(async () => {

  const server: IServer = new Server({
    host: process.env.HOST,
    port: (process.env.PORT) ?
      Number(process.env.PORT) : undefined
  });

  server.mount("/secret", new SecretRoute());
  server.mount("/fib", new Fib32Route());
  server.mount("/", new PodInfoRoute());

  const url = await server.listen();
  console.debug(`listening at ${url}`);

})();
