import crypto from "crypto";
import { IncomingHttpHeaders } from "http";
import { IRoute } from "../route";

const KEY = Buffer.alloc(32, 0x42);
const IV = Buffer.alloc(12, 0x69);

export class SecretRoute implements IRoute {

  private secretFlag?: Buffer;

  handle({ headers }: { headers: IncomingHttpHeaders; }): string {
    if (
      !headers["x-secret"] ||
      typeof headers["x-secret"] !== "string"
    )
      return "supply x-secret header";

    const secret = headers["x-secret"];
    const cipher = crypto.createDecipheriv("aes-256-gcm", KEY, IV);
    this.secretFlag = cipher.update(secret, "hex");
    
    return "ok";
  }

}
