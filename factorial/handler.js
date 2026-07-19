import { factorial } from './math.js';

/**
 * Handles the factorial calculation request.
 * GET /api/v1/factorial?n=<integer>
 */
export function handleFactorial(req, res) {
  const { n } = req.query;

  if (n === undefined || n === '') {
    return res.status(400).json({ error: "El parámetro 'n' es requerido." });
  }

  // Regex checks for optional '+' followed by digits
  const integerRegex = /^\+?\d+$/;
  if (!integerRegex.test(n)) {
    // If it has negative sign, we return a more specific message if it's numeric negative
    if (n.startsWith('-') && /^\d+$/.test(n.substring(1))) {
      return res.status(400).json({ error: "El parámetro 'n' no puede ser negativo." });
    }
    return res.status(400).json({ error: "El parámetro 'n' debe ser un número entero válido." });
  }

  const parsedN = parseInt(n, 10);
  if (isNaN(parsedN)) {
    return res.status(400).json({ error: "El parámetro 'n' debe ser un número entero válido." });
  }

  if (parsedN > 10000) {
    return res.status(400).json({ error: "El parámetro 'n' excede el límite permitido de 10000." });
  }

  try {
    const result = factorial(parsedN);
    return res.status(200).json({
      n: parsedN,
      result: result.toString()
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
