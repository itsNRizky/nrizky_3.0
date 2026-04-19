import { createHash } from "crypto";

export function hashIP(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "";
  return createHash("sha256")
    .update(salt + ip)
    .digest("hex");
}
