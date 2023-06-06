//const letters = "r1zolkaştvgjfçn7wudbhqmö%isycéxğpeıü"
//anahtarımız beydaatakanalper
const letters = "beydatknlprcçfgğhıijmoösşuüvwxzqé%17"
//const letters = "abcçdefgğhıijklmnoöprsştuüvwxyzq0123456789!?*%&/"
// playfair için anahtar oluşturduk

export function playfairDecrypt(ciphertext) {
    const matrix = buildMatrix(letters);
  
    const pairs = createPairs(ciphertext);
    console.log(pairs)   //şifreli metni çiftlere böler ve bu çiftleri bir diziye yerleştirir
    const decryptedPairs = pairs.map(pair => decryptPair(pair, matrix));
    return decryptedPairs.join("").replaceAll("w"," ").replaceAll("q","").replaceAll("x","");
  }
  
  function decryptPair(pair, matrix) {
    let x1, y1, x2, y2;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
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
      y1 = (y1 + 5) % 6;
      y2 = (y2 + 5) % 6;
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
    console.log(pairs);

    const encryptedPairs = pairs.map(pair => encryptPair(pair, matrix));
    console.log(pairs);
    return encryptedPairs.join("");
  }
  
  function buildMatrix() {
    const matrix = [];
  
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 6; j++) {
        row.push(letters[i * 6 + j]);
      }
      matrix.push(row);
    }
  
    return matrix;
  }
  
  function prepareText(plaintext) {
    plaintext = plaintext.toLowerCase();
    plaintext = plaintext.replaceAll(" ","w")
    plaintext = plaintext.replace(/[^r1zolkaştvgjfçn7wudbhqmö%isycéxğpeıü]/g, "");
    //metindeki özel karakterleri, boşlukları veya diğer istenmeyen karakterleri temizler
    plaintext = plaintext.replace(/([a-zçğıöşü])\1+/g, "$1x$1");
    //ardışık tekrar eden küçük harfleri "x" karakteri ile değiştirir ve metindeki tekrarları ayırır
    if (plaintext.length % 2 === 1) {
      plaintext += "q";
    }
    //cümle tek karakterden oluşuyorsa onu çift karaketere tamamlar q koyarak
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
    for (let j = 0; j < 6; j++) {
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
    y1 = (y1 + 1) % 6;
    y2 = (y2 + 1) % 6;
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
  