import { generateKeyPairSync, publicEncrypt, privateDecrypt } from 'crypto';

describe('RSA 암·복호화 테스트', () => {
    it('공개키로 암호화 → 개인키로 복호화', () => {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
            },
        });


        const plain = 'VITE_GOOGLE_CLIENT_ID=780923997453-3ftob69gfdffi9qinnm7rcj5qmfjqk74.apps.googleusercontent.com';
        const encrypted = publicEncrypt(publicKey, Buffer.from(plain));
        console.log('Encrypted Buffer:', encrypted);
        console.log('Encrypted (base64):', encrypted.toString('base64'));

        const decrypted = privateDecrypt(privateKey, encrypted);
        console.log('Decrypted Text:', decrypted.toString());

        expect(decrypted.toString()).toBe(plain);
    });
});