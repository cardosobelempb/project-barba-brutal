import * as fs from 'fs';
import * as path from 'path';

export const getJwtKeys = () => ({
  privateKey: fs.readFileSync(path.resolve(process.cwd(), 'keys/private.key')),
  publicKey: fs.readFileSync(path.resolve(process.cwd(), 'keys/public.key')),
});

console.log("jwtConstants =>", getJwtKeys().privateKey)
