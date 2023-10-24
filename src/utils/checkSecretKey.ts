import jose from 'node-jose';
/**
 *
 */
export async function checkSecretKey(): Promise<void> {
  if (!process.env.JWT_KEY) {
    const keystore = jose.JWK.createKeyStore();
    const key = await keystore.generate('RSA', 2048);

    process.env.JWT_KEY = JSON.stringify(key.toJSON(true));
  }
}
