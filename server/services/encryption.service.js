
const CryptoJS = require('crypto-js')

class EncryptionService {
    encrypt(sensitiveData, password) {
        const encryptedData = CryptoJS.AES.encrypt(String(sensitiveData), password).toString();
        //console.log(encryptedData);
        return encryptedData
    }

    decrypt(cipherText, password) {
        const bytes = CryptoJS.AES.decrypt(cipherText, password);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log(originalText)
        return originalText;
    }
}

module.exports = new EncryptionService();