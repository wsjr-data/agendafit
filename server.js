import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from './persona.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Inicializa a SDK do Gemini com a chave do .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.json());
app.use(express.static('public'));

// Endpoint proxy para o chat da IA
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensagem não fornecida.' });
    }

    const contents = [];

    if (history && Array.isArray(history)) {
      history.forEach((msg) => {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error('Erro na integração com o Gemini:', error);
    res.status(500).json({ error: 'Erro ao processar a resposta do assistente.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor do AgendaFit rodando em http://localhost:${port}`);
});