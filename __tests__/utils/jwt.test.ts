import { encodeJWT, decodeJWT, parseJWT } from '@/utils/jwt';

// Test suite for encodeJWT, decodeJWT, and parseJWT functions
describe('JWT Functions', () => {
  // Test case: Encode a string to Base64
  it('should encode a JSON object to Base64', () => {
    const input = {
      message: 'Hello, World!',
      expires: 1645809834376,
      userId: 1234567890,
      name: 'John Doe',
    };
    const encoded = encodeJWT(JSON.stringify(input));
    expect(encoded).toEqual(
      'eyJtZXNzYWdlIjoiSGVsbG8sIFdvcmxkISIsImV4cGlyZXMiOjE2NDU4MDk4MzQzNzYsInVzZXJJZCI6MTIzNDU2Nzg5MCwibmFtZSI6IkpvaG4gRG9lIn0=',
    );
  });

  // Test case: Decode a Base64-encoded string to JSON object
  it('should decode a Base64-encoded string to JSON object', () => {
    const input =
      'eyJtZXNzYWdlIjoiSGVsbG8sIFdvcmxkISIsImV4cGlyZXMiOjE2NDU4MDk4MzQzNzYsInVzZXJJZCI6MTIzNDU2Nzg5MCwibmFtZSI6IkpvaG4gRG9lIn0=';
    const decoded = decodeJWT(input);
    expect(decoded).toEqual({
      message: 'Hello, World!',
      expires: 1645809834376,
      userId: 1234567890,
      name: 'John Doe',
    });
  });

  // Test case: Parse a JWT and return decoded header and payload
  it('should parse a JWT and return decoded header and payload', () => {
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const parsed = parseJWT(jwt);
    expect(parsed).toEqual({
      header: {
        alg: 'HS256',
        typ: 'JWT',
      },
      payload: {
        sub: '1234567890',
        name: 'John Doe',
        iat: 1516239022,
      },
    });
  });

  // Test case: Handle invalid input in decodeJWT
  it('should throw an error for invalid input in decodeJWT', () => {
    const invalidInput = 'InvalidInput';
    expect(() => decodeJWT(invalidInput)).toThrow('Invalid input in decodeJWT()');
  });
});
