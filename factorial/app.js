import express from 'express';
import { handleFactorial } from './handler.js';

const app = express();

app.use(express.json());

app.get('/api/v1/factorial', handleFactorial);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

export default app;
