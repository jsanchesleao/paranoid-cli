const crypto = require('crypto');
const fs = require('fs');

const IV_SIZE_IN_BYTES = 16;
const SALT_SIZE_IN_BYTES = 16;
const CIPHER_ALGORITHM = 'aes-256-cbc';

async function lockFile({file, password}) {
  const origin = fs.createReadStream(file);

  const salt = crypto.randomBytes(SALT_SIZE_IN_BYTES);
  const key = await pbkdf2({password, salt});
  const iv = crypto.randomBytes(IV_SIZE_IN_BYTES);
  const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, key, iv);

  const destination = fs.createWriteStream(`${file}.lock`);
  
  destination.write(iv);
  destination.write(salt);
  origin.pipe(cipher).pipe(destination);

  return new Promise((resolve, reject) => {
    destination.on('close', resolve);
    cipher.on('error', reject);
  });
}

async function unlockFile({file, password}) {
  const iv = await readIvFromFile(file);
  const salt = await readSaltFromFile(file);
  const origin = fs.createReadStream(file, {start: IV_SIZE_IN_BYTES + SALT_SIZE_IN_BYTES});
  const key = await pbkdf2({password, salt});
  const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, key, iv);
  const destination = fs.createWriteStream(file.replace(/\.lock$/, ''));

  origin.pipe(decipher).pipe(destination);
  return new Promise((resolve, reject) => {
    destination.on('close', resolve);
    decipher.on('error', reject);
  });
}

function readIvFromFile(file) {
  return readByteRangeFromFile({
    file: file, 
    start: 0, 
    end: IV_SIZE_IN_BYTES
  });
}

function readSaltFromFile(file) {
  return readByteRangeFromFile({
    file: file, 
    start: IV_SIZE_IN_BYTES,
    end: IV_SIZE_IN_BYTES + SALT_SIZE_IN_BYTES
  });
}

function readByteRangeFromFile({file, start, end}) {
  return new Promise(function(resolve, reject) {
    fs.open(file, 'r', function(status, fd) {
      const result = Buffer.alloc((end - start));
      fs.read(fd, result, 0, (end - start), start, function(err, num) {
        if (err) {
          reject(err)
        }
        fs.close(fd, function(err) {
          resolve(result);
        });
      });
    });
  });
}

function pbkdf2({password, salt}) {
  return new Promise(function(resolve, reject) {
    crypto.pbkdf2(String(password), salt, 100000, 32, 'sha256', function(err, derivedKey) {
      if (err) {
        reject(err);
      }
      else {
        resolve(derivedKey);
      }
    });
  });
}

module.exports = {lockFile, unlockFile}