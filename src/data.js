export const PROFILE = {
  name: 'Navneet Kumar',
  title: 'Full Stack Developer',
  location: 'Bengaluru, Karnataka',
  email: 'Navneetkumar1266@gmail.com',
  phone: '8340398051',
  github: 'https://github.com/Navneet1266',
  linkedin: 'https://linkedin.com/in/navneetkumar1266',
  summary: `I build systems that scale, interfaces people actually enjoy using, and AI features that work in production — not just in demos. Currently at Globiva, shipping enterprise-grade software used by real teams every day.`
}

export const SKILLS = {
  frontend: ['React.js', 'Next.js', 'Vue.js', 'JavaScript (ES6+)', 'TypeScript', 'Redux Toolkit', 'Redux', 'D3.js', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3', 'Framer Motion'],
  backend: ['Node.js', 'Express.js', 'MySQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Socket.io', 'REST APIs', 'GraphQL', 'Microservices', 'JWT', 'OAuth 2.0', 'Cron Jobs'],
  languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'],
  data: ['NumPy', 'Pandas', 'Matplotlib', 'TensorFlow', 'Keras', 'Scikit-learn', 'SentenceTransformers', 'ChromaDB', 'NLP', 'LLMs', 'RAG', 'Vector Search'],
  devops: ['Git', 'GitHub', 'Docker', 'Jenkins', 'CI/CD', 'GitLab', 'Nginx', 'Linux', 'AWS', 'GCP', 'Postman', 'Figma', 'JIRA', 'Agile', 'VS Code']
}

export const EXPERIENCE = [
  {
    company: 'Globiva Services Pvt. Ltd.',
    role: 'Full Stack Developer',
    period: 'Feb 2025 – Present',
    location: 'Bengaluru, Karnataka',
    current: true,
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'MySQL', 'Docker', 'Jenkins', 'GitLab'],
    bullets: [
      'Broke apart a crashing monolith — migrated 9 tightly-coupled modules to independent Docker containers, ending platform-wide outages and enabling zero-downtime per-module deployments for the first time.',
      'Designed the core React + Node.js + MongoDB architecture powering 15+ feature releases per quarter; user engagement climbed 30% in the first two months post-launch.',
      'Built Incident Reporting, Asset Management, and Task Tracker from scratch — enterprise modules now used by teams daily, replacing manual processes and cutting workflow time by 35%.',
      'Slashed DB response time by ~45% by separating query logic into a dedicated layer, adding targeted indexing across all services, and introducing Redis caching for hot-path queries.',
      'Eliminated "works on my machine" — wired up Jenkins + GitLab CI/CD with automated test gates, dropping production release errors by 30% in under a month.'
    ]
  },
  {
    company: 'Celebal Technologies',
    role: 'Backend Developer Intern',
    period: 'Jun 2024 – Aug 2024',
    location: 'Remote',
    current: false,
    tech: ['Node.js', 'Express.js', 'Socket.io', 'JWT', 'OAuth 2.0', 'MySQL', 'Redis', 'Jenkins', 'GitLab'],
    bullets: [
      'Shipped production-grade Node.js/Express.js REST APIs that handled 1,000+ concurrent requests at 99.9% uptime — ran live throughout the internship.',
      'Added real-time messaging with Socket.io and secured it with JWT + OAuth 2.0, matching the auth stack expected in the production environment.',
      'Cut MySQL query latency by 30% through slow-query analysis, strategic indexing, and Redis caching on read-heavy endpoints.',
      'Automated the entire test → build → deploy lifecycle with Jenkins and GitLab, making releases 3× faster with zero manual steps.'
    ]
  }
]

export const PROJECTS = [
  {
    name: 'Microservices Architecture Migration',
    subtitle: 'Monolith → 9 Dockerized modules @ Globiva',
    year: '2025',
    stack: ['Docker', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'Redis', 'Nginx', 'JWT'],
    description: 'The platform had one fatal flaw: any module crashing took everything down with it. I redesigned the entire architecture — containerized each of 9 modules onto isolated servers, centralized auth in a dedicated DB, pulled query logic out of controllers into its own layer, and layered Redis caching on hot queries. The result: independent deploys, true fault isolation, and a measurably faster database.',
    highlights: [
      '9 modules → independent Docker containers, each on its own server',
      'First-ever zero-downtime deployment — one module down no longer kills the platform',
      '~45% DB response improvement via query indexing + Redis caching',
      'Auth centralized; module DBs decoupled — clean data boundaries',
      'Query layer extracted from controllers — faster to debug, easier to optimize'
    ],
    link: null,
    github: null,
    color: 'from-emerald-600/30 via-green-500/20 to-teal-500/10',
    accent: '#10b981',
    icon: 'server'
  },
  {
    name: 'Email Management System',
    subtitle: 'Enterprise automation built for Tata Motors',
    year: '2025',
    stack: ['Node.js', 'Express.js', 'Microsoft Graph API', 'OAuth 2.0', 'Socket.io', 'MySQL', 'RBAC'],
    description: "Built for Tata Motors' operations team — an enterprise system that automatically ingests, classifies, and routes 500+ inbound customer emails every day via Microsoft Graph API. Agents work through a role-based dashboard instead of raw inboxes. Real-time updates via Socket.io so the team always sees the latest queue without refreshing.",
    highlights: [
      '500+ emails auto-processed every day without manual triage',
      '60% reduction in end-to-end processing time per email',
      '45% jump in agent productivity post-launch',
      'RBAC with role-gated views — ops, agents, and admins each see only what they need'
    ],
    link: null,
    github: null,
    color: 'from-blue-600/30 via-cyan-500/20 to-teal-500/10',
    accent: '#06b6d4',
    icon: 'email'
  },
  {
    name: 'LLM-Powered Q&A Chatbot',
    subtitle: 'RAG architecture that actually doesn\'t hallucinate',
    year: '2025',
    stack: ['Python', 'Flask', 'LLMs', 'SentenceTransformers', 'ChromaDB', 'RAG', 'NLP'],
    description: "Most LLM chatbots confabulate. This one grounds every answer in real documents first — a RAG pipeline fetches relevant chunks from a ChromaDB vector store before the model generates a response. Combined cosine similarity with fuzzy logic to handle messy real-world queries. Analytics dashboard tracks which questions the model still gets wrong so the pipeline can be improved iteratively.",
    highlights: [
      '28% improvement in semantic accuracy over baseline LLM-only approach',
      'Cosine similarity + fuzzy logic — handles typos and paraphrases gracefully',
      'Analytics dashboard for continuous pipeline improvement',
      'NLP preprocessing: tokenization, stopword removal, lemmatization'
    ],
    link: 'https://github.com/Navneet1266',
    github: 'https://github.com/Navneet1266',
    color: 'from-purple-600/30 via-violet-500/20 to-pink-500/10',
    accent: '#a855f7',
    icon: 'bot'
  }
]

export const EDUCATION = [
  {
    school: 'Kalinga Institute of Industrial Technology (KIIT)',
    degree: 'B.Tech — Computer Science & Engineering',
    meta: 'CGPA: 8.02 / 10',
    location: 'Bhubaneswar, Odisha',
    period: 'Aug 2021 – May 2025',
    tech: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Machine Learning', 'Computer Networks', 'Software Engineering']
  }
]

export const CERTIFICATIONS = [
  { name: 'Problem Solving (Basic & Intermediate)', issuer: 'HackerRank', date: 'Aug 2023' }
]

export const ACHIEVEMENTS = [
  { value: '9',   label: 'Modules Shipped',  desc: 'Migrated from a crashing monolith to isolated Docker containers' },
  { value: '45%', label: 'Faster DB',         desc: 'Indexing + Redis caching slashed latency across all services' },
  { value: '3x',  label: 'Release Speed',     desc: 'Jenkins + GitLab CI/CD eliminated all manual deployment steps' },
  { value: '28%', label: 'AI Accuracy Gain',  desc: 'RAG pipeline outperformed vanilla LLM on semantic search' }
]
