import express from 'express';

const app = express();

app.use(express.static('public'));

function timestampHandler(req, res) {
  const input = req.params.date;
  let date;

  if (input === undefined) {
    date = new Date();
  } else if (/^-?\d+$/.test(input)) {
    date = new Date(Number(input));
  } else {
    date = new Date(input);
  }

  if (Number.isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
}

app.get('/api', (req, res) => {
  req.params.date = undefined;
  timestampHandler(req, res);
});

app.get('/api/:date', timestampHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
