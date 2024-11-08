import CryptoJS from "crypto-js";

export function encrypt(text: string, password: string): string {
  return CryptoJS.AES.encrypt(text, password).toString();
}

export function decrypt(encryptedText: string, password: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return null;
  }
}
