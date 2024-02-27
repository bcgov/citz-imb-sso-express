// Encodes a string to a Base64-encoded string.
export const encodeJWT = (jwt: string) => Buffer.from(jwt).toString('base64');

// Decodes a Base64-encoded string to a JSON object.
export const decodeJWT = (jwt: string) => {
  try {
    return JSON.parse(Buffer.from(jwt, 'base64').toString('ascii'));
  } catch {
    throw new Error('Invalid input in decodeJWT()');
  }
};

// Parses a JWT and returns an object with decoded header and payload.
export const parseJWT = (jwt: string) => {
  if (!jwt) return null;
  const [header, payload] = jwt.split('.');
  if (!header || !payload) return null;

  return {
    header: decodeJWT(header),
    payload: decodeJWT(payload),
  };
};
