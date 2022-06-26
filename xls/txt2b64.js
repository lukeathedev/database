// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
TSH = (s) => {
  for (var i = 0, h = 9; i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return h ^ (h >>> 9);
};

const mkts = [
  "Carre",
  "Sumuf",
  "Canção",
  "Condo",
  "Musa",
  "Visca",
  "Tonhão",
  "Golff",
  "Me88",
  "Sant",
  "Alme",
  "Walm",
].map((e) =>
  e
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
);

const prds = [
  "Açúcar pc 5 kg",
  "Arroz pc 5 kg",
  "Banana 1 kg",
  "Batata  1 kg",
  "Café 500 g",
  "Carne 1 kg",
  "Farinha de trigo 1 kg",
  "Feijão  1 kg",
  "Leite 1 l",
  "Margarina 500 g",
  "Óleo  900 ml",
  "Pão francês 50 g",
  "Tomate 1 kg",
].map((e) =>
  e
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
);

console.log("UID Mercados");
mkts.forEach(
  (mkt) =>
    console.log(
      `'${mkt}': ${(TSH(mkt) >>> 0)
        .toString(16)
        .padStart(8, "0")
        .toUpperCase()}`
    )
  // console.log(`${(TSH(mkt) >>> 0).toString(16).padStart(8, "0").toUpperCase()}`)
);
console.log("----------------------");

console.log("UID Produtos");
prds.forEach(
  (prd) =>
    console.log(
      `'${prd}': ${(TSH(prd) >>> 0)
        .toString(16)
        .padStart(8, "0")
        .toUpperCase()}`
    )
  // console.log(`${(TSH(prd) >>> 0).toString(16).padStart(8, "0").toUpperCase()}`)
);
console.log("----------------------");
