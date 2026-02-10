export const PROFILE = {
  name: 'Navneet Kumar',
  title: 'Full Stack Developer',
  location: 'Bengaluru, Karnataka',
  email: 'Navneetkumar1266@gmail.com',
  phone: '8340398051',
  github: 'https://github.com/Navneet1266',
  linkedin: 'https://linkedin.com/in/navneetkumar1266',
  summary: `Results-driven Full Stack Developer with hands-on experience in designing, developing, and deploying scalable web applications and RESTful APIs. Proficient in building high-performance backend architectures, intuitive frontends, and integrating cloud-native services. Passionate about LLMs, AI, and cloud computing to develop data-driven, innovative, and maintainable digital solutions.`
}

export const SKILLS = {
  frontend: ['React.js', 'Next.js', 'Vue.js', 'JavaScript (ES6+)', 'TypeScript', 'Redux Toolkit', 'D3.js', 'Tailwind CSS', 'Bootstrap'],
  backend: ['Node.js', 'Express.js', 'MySQL', 'MongoDB', 'Socket.io', 'REST APIs', 'GraphQL', 'Microservices', 'Cron Jobs'],
  languages: ['JavaScript', 'Python', 'Java', 'SQL', 'TypeScript'],
  data: ['NumPy', 'Pandas', 'Matplotlib', 'TensorFlow', 'Keras', 'Scikit-learn', 'SentenceTransformers', 'ChromaDB'],
  devops: ['Git', 'GitHub', 'Docker', 'Jenkins', 'Postman', 'VS Code', 'Linux', 'Figma', 'JIRA', 'CI/CD', 'AWS', 'GCP']
}

export const EXPERIENCE = [
  {
    company: 'Globiva Services Pvt. Ltd.',
    role: 'Full Stack Developer',
    period: 'Feb 2025 – Present',
    location: 'Bengaluru, Karnataka',
    bullets: [
      'Architected and implemented a scalable web framework enabling 15+ new feature deployments per quarter, increasing user engagement by 30%.',
      'Engineered and maintained key modules including Incident Reporting, Asset Management, and Task Tracker, enhancing workflow automation by 35%.',
      'Optimized backend performance by refactoring RESTful APIs, improving response time by 40%.',
      'Automated build and deployment workflows through CI/CD pipelines, reducing manual release errors by 30%.'
    ]
  },
  {
    company: 'Celebal Technologies',
    role: 'Backend Developer Intern',
    period: 'Jun 2024 – Aug 2024',
    location: 'Remote',
    bullets: [
      'Engineered and deployed Node.js/Express.js APIs handling thousands of concurrent requests with high availability.',
      'Integrated Socket.io for real-time synchronization and JWT authentication for secure session management.',
      'Optimized SQL query performance and caching, cutting average response time by 30%.',
      'Configured Jenkins + GitLab CI/CD pipelines, accelerating deployment speed by 3x.'
    ]
  }
]

export const PROJECTS = [
  {
    name: 'Email Management System',
    year: '2025',
    stack: ['Node.js', 'Microsoft Graph API', 'OAuth 2.0', 'Socket.io', 'Cron Jobs'],
    description: 'Developed an email management system for Tata Motors using Microsoft Graph APIs to automate email processing, inbox management, and customer replies. Implemented secure OAuth 2.0 authentication and real-time email updates using Cron Jobs and Socket.io.',
    link: '#',
    image: '/images/email-system.svg'
  },
  {
    name: 'LLM-Powered Q&A Chatbot',
    year: '2025',
    stack: ['Python', 'Flask', 'SentenceTransformers', 'ChromaDB', 'RAG'],
    description: 'Architected a document-aware chatbot using Retrieval-Augmented Generation (RAG) pipelines for structured data queries. Improved semantic accuracy by 28% through SentenceTransformers and fuzzy logic matching.',
    link: 'https://github.com/Navneet1266',
    image: '/images/chatbot-v3.svg'
  }
]

export const EDUCATION = [
  {
    school: 'Kalinga Institute of Industrial Technology (KIIT)',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    meta: 'CGPA: 8.02/10',
    location: 'Bhubaneswar, Odisha',
    period: 'Aug 2021 – May 2025'
  }
]

export const CERTIFICATIONS = [
  { name: 'HackerRank (Basic & Intermediate)', issuer: 'HackerRank', date: 'Aug 2023', location: 'Online' }
]
