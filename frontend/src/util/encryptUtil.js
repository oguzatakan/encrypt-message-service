const letters = "abcçdefgğhıijklmnoöprsştuüvwxyzq0123456789!?*%&/"


export function playfairDecrypt(ciphertext) {
    const matrix = buildMatrix(letters);
  
    const pairs = createPairs(ciphertext);
    console.log(pairs)
    const decryptedPairs = pairs.map(pair => decryptPair(pair, matrix));
    return decryptedPairs.join("").replaceAll("w"," ").replaceAll("q","").replaceAll("x","");
  }
  
  function decryptPair(pair, matrix) {
    let x1, y1, x2, y2;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 8; j++) {
        if (matrix[i][j] === pair[0]) {
          x1 = i;
          y1 = j;
        } else if (matrix[i][j] === pair[1]) {
          x2 = i;
          y2 = j;
        }
      }
    }
  
    if (x1 === x2) {
      y1 = (y1 + 7) % 8;
      y2 = (y2 + 7) % 8;
    } else if (y1 === y2) {
      x1 = (x1 + 5) % 6;
      x2 = (x2 + 5) % 6;
    } else {
      const temp = y1;
      y1 = y2;
      y2 = temp;
    }
  
    return matrix[x1][y1] + matrix[x2][y2];
  }

  
export function playfairEncrypt(plaintext) {
    const matrix = buildMatrix();
  
    plaintext = prepareText(plaintext);
    const pairs = createPairs(plaintext);

    const encryptedPairs = pairs.map(pair => encryptPair(pair, matrix));
    console.log(pairs);
    return encryptedPairs.join("");
  }
  
  function buildMatrix() {
    const matrix = [];
  
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        row.push(letters[i * 8 + j]);
      }
      matrix.push(row);
    }
  
    return matrix;
  }
  
  function prepareText(plaintext) {
    plaintext = plaintext.toLowerCase();
    plaintext = plaintext.replace(" ","w")
    plaintext = plaintext.replace(/[^abcçdefgğhıijklmnoöprsştuüvwxyzq0123456789!?*%&/]/g, "");
    plaintext = plaintext.replace(/([a-zçğıöşü])\1+/g, "$1x$1");
    if (plaintext.length % 2 === 1) {
      plaintext += "q";
    }
    return plaintext;
  }
  
  function createPairs(plaintext) {
    const pairs = [];
  
    for (let i = 0; i < plaintext.length; i += 2) {
      pairs.push(plaintext.slice(i, i + 2));
    }
  
    return pairs;
  }
  
  function encryptPair(pair, matrix) {
    let x1, y1, x2, y2;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 8; j++) {
      if (matrix[i][j] === pair[0]) {
        x1 = i;
        y1 = j;
      } else if (matrix[i][j] === pair[1]) {
        x2 = i;
        y2 = j;
      }
    }
  }

  if (x1 === x2) {
    y1 = (y1 + 1) % 8;
    y2 = (y2 + 1) % 8;
  } else if (y1 === y2) {
    x1 = (x1 + 1) % 6;
    x2 = (x2 + 1) % 6;
  } else {
    const temp = y1;
    y1 = y2;
    y2 = temp;
  }

  return matrix[x1][y1] + matrix[x2][y2];
  }
  