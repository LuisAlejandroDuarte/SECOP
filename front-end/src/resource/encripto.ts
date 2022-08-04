import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

export class  Encriptacion {

     static encriptar (texto:string):string {
        return CryptoJS.AES.encrypt(texto,environment.key_security.trim()).toString();
    }

    static decrypter(textToDecrypt:string):string
    {
        return CryptoJS.AES.decrypt(textToDecrypt,environment.key_security.trim()).toString(CryptoJS.enc.Utf8);
    }

}
