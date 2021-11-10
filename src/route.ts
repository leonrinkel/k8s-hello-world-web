import { IncomingHttpHeaders } from "http";

export interface IRoute {
  handle({ headers }: { headers: IncomingHttpHeaders }): string;
}
