const express = require('express');
const cors = require('cors');

const TICKER_REQUEST_BASE = "https://query1.finance.yahoo.com/v7/finance/chart/";

const app = express();
// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

app.get('/stock/:stockname', async (req, res) => {
  const stock = req.params.stockname;
  let queryString = TICKER_REQUEST_BASE + stock;

  const p1 = req.query.period1;
  const p2 = req.query.period2;

  if (p1 !== undefined && p2 !== undefined) {
    queryString +=`?period1=${p1}&period2=${p2}&interval=1mo&events=div`;
  }

  try {
    const response = await fetch(queryString);

    if (!response.ok) {
      res.status(400).send("Failed to find ticker: " + stock);
    } else {
      res.status(200).json(await response.json());
    }

  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});