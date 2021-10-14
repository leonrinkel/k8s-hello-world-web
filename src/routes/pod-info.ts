import { IRoute } from "../route";

const nodeName = process.env.MY_NODE_NAME ?? "unknown";
const podName = process.env.MY_POD_NAME ?? "unknown";

export class PodInfoRoute implements IRoute {

  handle(): string {
    return `hello world, served by pod ${podName} on node ${nodeName}`;
  }

}
