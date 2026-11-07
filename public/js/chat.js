const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const chatClose = document.getElementById('chat-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

const history = [];

chatToggle?.addEventListener('click', () => chatBox.classList.toggle('hidden'));
chatClose?.addEventListener('click', () => chatBox.classList.add('hidden'));

chatForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  // Renderiza mensagem do usuário
  appendMessage(text, 'user');
  chatInput.value = '';

  // Indicador de carregamento
  const loadingDiv = appendMessage('Léo está pensando...', 'bot loading');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history })
    });

    const data = await res.json();
    loadingDiv.remove();

    if (data.response) {
      appendMessage(data.response, 'bot');
      history.push({ role: 'user', content: text });
      history.push({ role: 'model', content: data.response });
    } else {
      appendMessage('Desculpe, tive um problema ao responder. Tente novamente.', 'bot');
    }
  } catch (err) {
    loadingDiv.remove();
    appendMessage('Erro de conexão com o servidor.', 'bot');
  }
});

function appendMessage(msg, type) {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.innerText = msg;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}