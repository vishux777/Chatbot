async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (!message) return;
  
    const chatMessages = document.getElementById('chatMessages');
    
    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user';
    userDiv.innerHTML = `<span>${message}</span>`;
    chatMessages.appendChild(userDiv);
    input.value = '';
  
    // Fetch AI response
    try {
      const response = await fetch('http://localhost:5000/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      const botDiv = document.createElement('div');
      botDiv.className = 'message bot';
      botDiv.innerHTML = `<span>${data.text || data.error}</span>`;
      chatMessages.appendChild(botDiv);
    } catch (error) {
      const botDiv = document.createElement('div');
      botDiv.className = 'message bot';
      botDiv.innerHTML = `<span>Error: Could not connect to server</span>`;
      chatMessages.appendChild(botDiv);
    }
  
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Enter key support
  document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });