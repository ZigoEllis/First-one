const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

const chatbot = document.querySelector('.chatbot');

if (chatbot) {
  const toggleButton = chatbot.querySelector('.chatbot-toggle');
  const closeButton = chatbot.querySelector('.chatbot-close');
  const chatWindow = chatbot.querySelector('.chatbot-window');
  const messages = chatbot.querySelector('.chatbot-messages');
  const form = chatbot.querySelector('.chatbot-form');
  const input = chatbot.querySelector('#chatbot-input');

  const knowledgeBase = [
    {
      keywords: ['experience', 'work history', 'background', 'technician'],
      response:
        'I currently support UnioTech Solutions as an IT Support Technician (office relocations, cabling, deployments) and provide on-call administrative coverage at UFV. Earlier roles span social media leadership, tutoring, and retail ops.',
    },
    {
      keywords: ['skill', 'strength', 'strengths', 'focus'],
      response:
        'Core strengths include IT relocation, hardware setup, technical troubleshooting, workflow design, analytics, and people-centered collaboration. I love pairing systems thinking with calm stakeholder support.',
    },
    {
      keywords: ['tool', 'software', 'tech stack', 'platform'],
      response:
        'Daily toolkit: Microsoft 365, SharePoint, OneDrive, Google Workspace, Teams, Zoom, Trello, Slack, Connecteam, AnyDesk, TeamViewer, plus AI helpers like ChatGPT and Gemini.',
    },
    {
      keywords: ['education', 'degree', 'school', 'ufv'],
      response:
        'I earned a BBA from the University of the Fraser Valley with a Human Resource Management major (3.51 GPA) and coursework in strategy, analytics, communications, and HR.',
    },
    {
      keywords: ['project', 'certification', 'ai', 'recruiting'],
      response:
        'Recent highlights: a recruitment technology use-case comparing AI vs. manual screening plus the Generative AI for Recruiting certificate from LinkedIn Learning.',
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach'],
      response:
        'You can email me at shaswat.k.prasad@gmail.com, call +1 (778) 551-4494, or connect on LinkedIn (linkedin.com/in/shaswat-k-prasad).',
    },
    {
      keywords: ['location', 'where', 'based', 'city'],
      response: 'I split time between Vancouver and Abbotsford, British Columbia.',
    },
    {
      keywords: ['availability', 'open', 'opportunity', 'role'],
      response:
        'I am open to HR operations, IT coordination, administrative support, and people ops roles where I can blend tech, systems, and communication.',
    },
    {
      keywords: ['hr', 'human resource', 'administrative', 'admin'],
      response:
        'Within HR/admin spaces I manage onboarding, documentation, confidential records, analytics, and front-line communications that keep departments aligned.',
    },
    {
      keywords: ['thank', 'thanks', 'appreciate'],
      response:
        'Thanks for the chat! Let me know if you want links to references, social media work, or more project details.',
    },
  ];

  const getResponse = (message) => {
    const normalized = message.toLowerCase();
    const entry = knowledgeBase.find(({ keywords }) =>
      keywords.some((keyword) => normalized.includes(keyword))
    );

    if (entry) {
      return entry.response;
    }

    return "I'm trained on Shaswat's resume—ask about experience, skills, tools, education, projects, or how to connect, and I'll share a focused answer.";
  };

  const appendMessage = (text, sender = 'bot') => {
    const messageEl = document.createElement('div');
    messageEl.className = `chatbot-message ${sender}`;
    if (sender === 'user') {
      messageEl.textContent = text;
    } else {
      messageEl.textContent = '';
      messageEl.innerHTML = text;
    }
    messages.appendChild(messageEl);
    messages.scrollTop = messages.scrollHeight;
  };

  const openChat = () => {
    chatbot.classList.add('open');
    chatWindow.hidden = false;
    toggleButton.setAttribute('aria-expanded', 'true');
    setTimeout(() => input.focus(), 50);
  };

  const closeChat = () => {
    chatbot.classList.remove('open');
    chatWindow.hidden = true;
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.focus();
  };

  toggleButton.addEventListener('click', () => {
    if (chatbot.classList.contains('open')) {
      closeChat();
    } else {
      openChat();
    }
  });

  closeButton.addEventListener('click', closeChat);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    appendMessage(message, 'user');
    input.value = '';
    setTimeout(() => {
      appendMessage(getResponse(message));
    }, 350);
  });

  appendMessage(
    "Hi! I'm Shaswat's AI co-pilot. Ask me about his experience, tools, education, projects, or how to reach him."
  );
}
