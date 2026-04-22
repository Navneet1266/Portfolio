export const PROFILE = {
  name: 'Navneet Kumar',
  title: 'Full Stack Developer',
  location: 'Bengaluru, Karnataka',
  email: 'Navneetkumar1266@gmail.com',
  phone: '8340398051',
  github: 'https://github.com/Navneet1266',
  linkedin: 'https://linkedin.com/in/navneetkumar1266',
  summary: `Full Stack Developer with 1+ year of professional experience designing, developing, and deploying scalable web applications, RESTful APIs, and microservices architectures. Expertise in JavaScript, TypeScript, React.js, Node.js, Express.js, Next.js, MongoDB, MySQL, and PostgreSQL. Successfully optimized application performance by 40%, implemented CI/CD pipelines with Jenkins and GitLab, built real-time systems using Socket.io, and created AI-powered solutions with LLMs, RAG architecture, and NLP.`
}

export const SKILLS = {
  frontend: ['React.js', 'Next.js', 'Vue.js', 'JavaScript (ES6+)', 'TypeScript', 'Redux Toolkit', 'Redux', 'D3.js', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'],
  backend: ['Node.js', 'Express.js', 'MySQL', 'MongoDB', 'PostgreSQL', 'Socket.io', 'REST APIs', 'GraphQL', 'Microservices', 'JWT', 'Cron Jobs'],
  languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'],
  data: ['NumPy', 'Pandas', 'Matplotlib', 'TensorFlow', 'Keras', 'Scikit-learn', 'SentenceTransformers', 'ChromaDB', 'NLP', 'LLMs', 'RAG'],
  devops: ['Git', 'GitHub', 'Docker', 'Jenkins', 'CI/CD', 'GitLab', 'Postman', 'VS Code', 'Linux', 'Figma', 'JIRA', 'Agile', 'AWS', 'GCP', 'OAuth 2.0']
}

export const EXPERIENCE = [
  {
    company: 'Globiva Services Pvt. Ltd.',
    role: 'Full Stack Developer',
    period: 'Feb 2025 – Present',
    location: 'Bengaluru, Karnataka',
    current: true,
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'MySQL', 'Jenkins', 'GitLab'],
    bullets: [
      'Led migration of 9-module monolithic platform to containerized microservices using Docker, eliminating single points of failure and enabling independent per-module deployments — platform resilience improved from 0% fault isolation to full service independence.',
      'Architected scalable web framework using React.js, Node.js, Express.js, MongoDB, Redux enabling 15+ feature deployments per quarter, increasing user engagement by 30%.',
      'Engineered Incident Reporting, Asset Management, Task Tracker modules with React.js, Redux Toolkit, MySQL, enhancing workflow automation by 35%.',
      'Optimized database layer across microservices by separating query logic from controllers, implementing indexing strategies and Redis caching, reducing average DB response time by ~45%.',
      'Deployed CI/CD pipelines using Jenkins and GitLab, automating build and deployment workflows, reducing manual release errors by 30%.'
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
      'Built production-grade Node.js/Express.js RESTful APIs handling 1000+ concurrent requests with 99.9% uptime.',
      'Integrated Socket.io for real-time communication and JWT authentication with OAuth 2.0 for secure session management.',
      'Enhanced MySQL database performance through SQL query optimization, indexing, and Redis implementation, reducing response time by 30%.',
      'Configured Jenkins CI/CD pipelines integrated with GitLab for automated testing, building, and deployment, accelerating delivery speed by 3x.'
    ]
  }
]

export const PROJECTS = [
  {
    name: 'Microservices Architecture Migration',
    subtitle: 'Monolith to 9-Module Dockerized System @ Globiva',
    year: '2025',
    stack: ['Docker', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'Redis', 'Nginx', 'JWT'],
    description: 'Led the end-to-end architectural migration of a monolithic web application (9 tightly-coupled modules) to a fully containerized microservices system. Previously, a single module failure brought down the entire platform. Each module was Dockerized onto its own isolated server, auth data was centralized in a dedicated auth DB while module-specific data lived in its own DB, query logic was decoupled from controllers into a dedicated query layer, and queries were optimized with indexing and Redis caching — resulting in independent deployability, fault isolation, and a dramatic performance uplift.',
    highlights: [
      '9 modules containerized with Docker — each on its own isolated server',
      'Eliminated single point of failure: 1 module down no longer takes the platform down',
      '~45% faster DB response via query indexing + Redis caching layer',
      'Auth DB centralized; module-specific DBs decoupled for clean data isolation',
      'Query layer extracted from controllers — cleaner code, easier optimization'
    ],
    link: null,
    github: null,
    color: 'from-emerald-600/30 via-green-500/20 to-teal-500/10',
    accent: '#10b981',
    icon: 'server'
  },
  {
    name: 'Email Management System',
    subtitle: 'Enterprise Automation for Tata Motors',
    year: '2025',
    stack: ['Node.js', 'Express.js', 'Microsoft Graph API', 'OAuth 2.0', 'Socket.io', 'Cron Jobs', 'RBAC'],
    description: 'Developed enterprise-grade email management system for Tata Motors that automates email processing, inbox management, and customer reply workflows using Microsoft Graph API with role-based access control.',
    highlights: [
      '500+ emails processed daily',
      '60% reduction in processing time',
      '45% increase in agent productivity'
    ],
    link: null,
    github: null,
    color: 'from-blue-600/30 via-cyan-500/20 to-teal-500/10',
    accent: '#06b6d4',
    icon: 'email'
  },
  {
    name: 'LLM-Powered Q&A Chatbot',
    subtitle: 'RAG Architecture with Vector Search',
    year: '2025',
    stack: ['Python', 'Flask', 'LLMs', 'SentenceTransformers', 'ChromaDB', 'RAG', 'NLP'],
    description: 'Architected a context-aware chatbot using Retrieval-Augmented Generation (RAG) with ChromaDB vector database for precise semantic document queries, analytics dashboard, and NLP preprocessing pipelines.',
    highlights: [
      '28% improvement in semantic accuracy',
      'Cosine similarity + fuzzy logic matching',
      'Analytics dashboard for query optimization'
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
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    meta: 'CGPA: 8.02/10',
    location: 'Bhubaneswar, Odisha',
    period: 'Aug 2021 – May 2025',
    tech: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Machine Learning', 'Computer Networks', 'Software Engineering']
  }
]

export const CERTIFICATIONS = [
  { name: 'Problem Solving (Basic & Intermediate)', issuer: 'HackerRank', date: 'Aug 2023' }
]

export const ACHIEVEMENTS = [
  { value: '9', label: 'Microservices', desc: 'Modules migrated from monolith to Docker containers' },
  { value: '45%', label: 'Faster DB', desc: 'Query indexing + Redis caching across all services' },
  { value: '3x', label: 'Deploy Speed', desc: 'Jenkins + GitLab CI/CD automation' },
  { value: '28%', label: 'AI Accuracy', desc: 'RAG semantic search improvement' }
]
