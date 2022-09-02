import { Identifier } from "./Identifier";
import crypto from "crypto";

export class CryptoRandomIdentifier implements Identifier {
  createId(): string {
    return crypto.randomUUID();
  }
}
