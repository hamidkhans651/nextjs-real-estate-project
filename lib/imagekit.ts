// lib/imagekit.ts
import ImageKit from "imagekit";

export const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!, // Add your ImageKit public key
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!, // Add your private key
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!, // Add your URL endpoint
});
