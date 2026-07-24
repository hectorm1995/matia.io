// Animated WhatsApp-style conversation inside the hero phone mockup
const conversation = [
  { from: 'user', text: 'Hola, ¿tienen turno para mañana?' },
  { from: 'bot',  text: 'Sí, tengo espacio a las 10:00 o 16:30. ¿Cuál prefieres?' },
  { from: 'user', text: 'A las 16:30 estaría bien' },
  { from: 'bot',  text: 'Perfecto, quedaste agendado para mañana 16:30 ✅' },
];

const chatEl = document.getElementById('phoneChat');
let cycleRunning = false;

function clearChat(){
  chatEl.innerHTML = '';
}

function addBubble(from, text){
  const b = document.createElement('div');
  b.className = `bubble ${from}`;
  b.textContent = text;
  chatEl.appendChild(b);
}

function addTyping(){
  const b = document.createElement('div');
  b.className = 'bubble bot typing';
  b.innerHTML = '<span></span><span></span><span></span>';
  chatEl.appendChild(b);
  return b;
}

async function runCycle(){
  if (cycleRunning) return;
  cycleRunning = true;
  clearChat();

  for (const msg of conversation){
    await wait(650);
    if (msg.from === 'bot'){
      const typingEl = addTyping();
      await wait(900);
      typingEl.remove();
    }
    addBubble(msg.from, msg.text);
  }

  await wait(3200);
  cycleRunning = false;
  runCycle();
}

function wait(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

if (chatEl){
  runCycle();
}
