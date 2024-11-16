import express from 'express';
import dotenv from 'dotenv';
import db from './database/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);

app.get('/test-email', async (req, res) => {
  try {
    const emailResponse = await Sendmail('recipient-email@example.com', 'Test Subject', '<h1>Test Message</h1>');
    res.status(200).send(emailResponse);
  } catch (error) {
    res.status(500).send({ error: 'Error sending test email' });
  }
});

db().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}).catch((err) => {
  console.log('mongodb connection failed!!!', err);
});
