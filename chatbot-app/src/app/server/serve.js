import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  res.json({ reply: `You said: ${userMessage}` });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
