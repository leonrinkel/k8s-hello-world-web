import { IRoute } from "../route";

const nodeName = process.env.MY_NODE_NAME ?? "unknown";
const podName = process.env.MY_POD_NAME ?? "unknown";

export class Fib32Route implements IRoute {

  fib(n: number): number {
    if (n < 2) return 1;
    return this.fib(n - 2) + this.fib(n - 1);
  }

  handle(): string {
    return `fib(32)=${this.fib(32)}, served by pod ${podName} on node ${nodeName}`;
  }

}
