const decoder = new TextDecoder('windows-1255');
const cp1255ToByte = new Map();
for (let b = 0; b <= 255; b++) {
  const s = decoder.decode(new Uint8Array([b]));
  cp1255ToByte.set(s, b);
}

function recover(s) {
  const bytes = [];
  for (const ch of s) {
    if (cp1255ToByte.has(ch)) {
      bytes.push(cp1255ToByte.get(ch));
    } else {
      // char not in cp1255, return original
      return s;
    }
  }
  const recovered = new TextDecoder('utf-8').decode(new Uint8Array(bytes));
  // if recovered contains replacement char, return original
  if (recovered.includes('\uFFFD')) return s;
  return recovered;
}

const samples = [
  '׳§׳™׳“׳” ׳©׳¢׳™׳¨׳”',
  '׳—׳¨׳“׳ ׳׳‘׳',
  'ספירת ימים',
  'חשוד?',
];

for (const s of samples) {
  console.log('orig:', s);
  console.log('recv:', recover(s));
  console.log('---');
}
