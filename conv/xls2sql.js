// Autor:      Lucas Alvarenga (lb.am.alvarenga@uel.br)
// Descrição:  Converte planilhas que seguem o padrão
//             estabelecido por '../template.xlsx' em
//             statements SQL compatíveis com as tabe
//             las definidas em '../../tables.sql' pa
//             ra facilitar o carregamento de dados.
// Criação:    2022-06-26

const ExcelJS = require("exceljs");

const log = require("simple-node-logger").createSimpleLogger();
log.setLevel("debug");

// SQL query should be
// INSERT INTO public.timeseries
// ("Date", "supermarket_uid", "product_uid", "Price")
// VALUES ('2022-06-26', 'AAAAAAAA', 'AAAAAAAA', 0.00);

// TODO: consider building a single big query

const fn = __dirname + "/../template.xlsx";

const wk = new ExcelJS.Workbook();
wk.xlsx.readFile(fn).then(() => {
  log.debug(`Successfully opened '${fn}'`);
  const ws = wk.worksheets[0];

  const cols = ws.columns;
  const pr_ids = cols.shift().values;
  const date = pr_ids.splice(0, 2)[1].toISOString().split("T")[0];

  log.info(`Successfully retrieved columns for date '${date}'`);

  // For each  supermarket
  cols.forEach((col) => {
    const queryValues = [];
    log.debug(`Building query for supermarket '${col.values[1]}'...`);

    // Build query for each product
    pr_ids.forEach((pr_id, i) => {
      // Contruct a query
      // "Date"      , "supermarket_uid", "product_uid", "Price"
      // '2022-06-26', 'XXXXXXXX'       , 'XXXXXXXX'   , '0.00'
      const values = `('${date}','${col.values[1]}','${pr_id}','${col.values[
        i + 2
      ].toFixed(2)}')`;

      queryValues.push(values);
    });

    const query = `INSERT INTO public.timeseries ("Date", "supermarket_uid", "product_uid", "Price") VALUES ${queryValues};`;
    log.debug(query);
  });
});
