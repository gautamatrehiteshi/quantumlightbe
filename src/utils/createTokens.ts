import jose from 'node-jose';

interface TokenPayload {
  sub: string;
  exp: number;
}
/**
 *
 * @param id
 */
export async function createTokens(id: string, time?: number): Promise<object> {
  const payload: TokenPayload = {
    sub: id,
    exp: time || Math.floor(Date.now() / 1000) + 36000,
  };
  if (!process.env.JWT_KEY) throw new Error('secret key not defined');
  const key = JSON.parse(process.env.JWT_KEY);
  const jwt = await jose.JWS.createSign({ format: 'compact' }, key)
    .update(JSON.stringify(payload))
    .final();
  return jwt;
}
