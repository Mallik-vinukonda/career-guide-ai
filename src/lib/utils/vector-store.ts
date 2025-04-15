/**
 * This file provides a simplified implementation of a vector database for the career guidance RAG system.
 * In a production environment, this would be replaced with a proper vector database like Pinecone,
 * Weaviate, or a similar solution.
 */

// Types for our career data
export interface CareerData {
  id: string;
  title: string;
  description: string;
  education: string[];
  skills: string[];
  salary: string;
  outlook: string;
  entryPaths: string[];
  specializations: string[];
  industries: string[];
  keywords: string[];
}

// Types for our education data
export interface EducationData {
  id: string;
  type: string;
  name: string;
  description: string;
  duration: string;
  cost: string;
  requirements: string;
  careers: string[];
  institutions: string[];
  keywords: string[];
}

// Types for our scholarship data
export interface ScholarshipData {
  id: string;
  name: string;
  description: string;
  amount: string;
  deadline: string;
  eligibility: string;
  applicationProcess: string;
  website: string;
  fieldOfStudy: string[];
  keywords: string[];
}

// Sample career data
const CAREERS: CareerData[] = [
  {
    id: "software_engineer",
    title: "Software Engineer",
    description: "Develops applications and systems using programming languages and software development principles.",
    education: [
      "Bachelor's degree in Computer Science, Software Engineering, or related field",
      "Coding bootcamp (alternative path)",
      "Self-taught with strong portfolio (alternative path)"
    ],
    skills: [
      "Programming languages (JavaScript, Python, Java, etc.)",
      "Data structures and algorithms",
      "Software design patterns",
      "Version control (Git)",
      "Problem-solving",
      "Debugging",
      "Testing methodologies"
    ],
    salary: "$70,000 - $150,000 (varies by location, experience, and specialization)",
    outlook: "Excellent growth potential with 22% projected increase by 2030",
    entryPaths: [
      "Internships during college",
      "Entry-level developer positions",
      "Open source contributions",
      "Hackathons and coding competitions"
    ],
    specializations: [
      "Front-end development",
      "Back-end development",
      "Full-stack development",
      "Mobile app development",
      "Game development",
      "DevOps",
      "Machine learning engineering"
    ],
    industries: [
      "Technology",
      "Finance",
      "Healthcare",
      "Education",
      "Entertainment",
      "E-commerce"
    ],
    keywords: [
      "coding",
      "programming",
      "developer",
      "software",
      "applications",
      "web development",
      "mobile development",
      "tech",
      "computer science"
    ]
  },
  {
    id: "data_scientist",
    title: "Data Scientist",
    description: "Analyzes and interprets complex data to help organizations make better decisions.",
    education: [
      "Master's or PhD in Data Science, Statistics, Computer Science, or related field",
      "Bachelor's degree with specialized certifications (alternative path)"
    ],
    skills: [
      "Statistical analysis",
      "Machine learning",
      "Programming (Python, R)",
      "Data visualization",
      "SQL and database knowledge",
      "Big data technologies",
      "Communication and storytelling"
    ],
    salary: "$85,000 - $170,000 (varies by location, experience, and industry)",
    outlook: "Very strong growth with 31% projected increase by 2030",
    entryPaths: [
      "Graduate research assistantships",
      "Data analyst roles as stepping stones",
      "Kaggle competitions",
      "Industry internships"
    ],
    specializations: [
      "Machine learning engineer",
      "AI researcher",
      "Business intelligence analyst",
      "Quantitative analyst",
      "Computational linguist",
      "Computer vision engineer"
    ],
    industries: [
      "Technology",
      "Finance",
      "Healthcare",
      "E-commerce",
      "Marketing",
      "Research"
    ],
    keywords: [
      "data",
      "analytics",
      "statistics",
      "machine learning",
      "artificial intelligence",
      "AI",
      "big data",
      "analysis",
      "research",
      "math"
    ]
  },
  {
    id: "ux_designer",
    title: "UX Designer",
    description: "Creates user-friendly interfaces and experiences for digital products.",
    education: [
      "Bachelor's degree in Design, Human-Computer Interaction, or related field",
      "UX/UI bootcamps or certification programs (alternative path)",
      "Self-taught with strong portfolio (alternative path)"
    ],
    skills: [
      "User research",
      "Wireframing and prototyping",
      "Usability testing",
      "Information architecture",
      "Visual design principles",
      "Design tools (Figma, Sketch, Adobe XD)",
      "Empathy and user advocacy"
    ],
    salary: "$65,000 - $130,000 (varies by location, experience, and industry)",
    outlook: "Strong growth with 23% projected increase by 2030",
    entryPaths: [
      "Internships",
      "Junior designer positions",
      "Design challenges and competitions",
      "Personal projects and portfolio building"
    ],
    specializations: [
      "Interaction design",
      "Visual design",
      "User research",
      "Information architecture",
      "Accessibility specialist",
      "Product design"
    ],
    industries: [
      "Technology",
      "E-commerce",
      "Entertainment",
      "Healthcare",
      "Education",
      "Finance"
    ],
    keywords: [
      "design",
      "user experience",
      "UX",
      "UI",
      "interface",
      "usability",
      "wireframing",
      "prototyping",
      "creative",
      "visual design"
    ]
  },
  {
    id: "healthcare_administrator",
    title: "Healthcare Administrator",
    description: "Manages healthcare facilities, services, and staff to ensure efficient operations.",
    education: [
      "Bachelor's degree in Healthcare Administration, Business, or related field",
      "Master's degree preferred for advancement (MHA, MBA with healthcare focus)"
    ],
    skills: [
      "Leadership and management",
      "Healthcare regulations knowledge",
      "Financial management",
      "Communication",
      "Strategic planning",
      "Electronic health record systems",
      "Quality improvement methodologies"
    ],
    salary: "$65,000 - $120,000 (varies by location, facility type, and experience)",
    outlook: "Strong growth with 32% projected increase by 2030",
    entryPaths: [
      "Administrative assistant or coordinator roles",
      "Department-specific management",
      "Graduate administrative fellowships",
      "Internships at healthcare facilities"
    ],
    specializations: [
      "Hospital administration",
      "Clinical practice management",
      "Health information management",
      "Nursing home administration",
      "Health policy administration"
    ],
    industries: [
      "Healthcare",
      "Insurance",
      "Government",
      "Non-profit",
      "Consulting"
    ],
    keywords: [
      "healthcare",
      "hospital",
      "medical",
      "administration",
      "management",
      "health services",
      "clinical",
      "patient care",
      "health policy"
    ]
  },
  {
    id: "marketing_manager",
    title: "Marketing Manager",
    description: "Plans and oversees marketing campaigns to promote products, services, or brands.",
    education: [
      "Bachelor's degree in Marketing, Business, Communications, or related field",
      "MBA or Master's in Marketing for advancement"
    ],
    skills: [
      "Strategic planning",
      "Market research",
      "Brand management",
      "Digital marketing",
      "Content creation",
      "Analytics and data interpretation",
      "Project management"
    ],
    salary: "$65,000 - $150,000 (varies by industry, company size, and experience)",
    outlook: "Steady growth with 10% projected increase by 2030",
    entryPaths: [
      "Marketing assistant or coordinator",
      "Social media specialist",
      "Marketing internships",
      "Sales positions as stepping stones"
    ],
    specializations: [
      "Digital marketing",
      "Content marketing",
      "Brand management",
      "Product marketing",
      "Social media marketing",
      "Marketing analytics"
    ],
    industries: [
      "Retail",
      "Technology",
      "Entertainment",
      "Consumer goods",
      "Healthcare",
      "Financial services"
    ],
    keywords: [
      "marketing",
      "advertising",
      "branding",
      "communications",
      "social media",
      "digital marketing",
      "content",
      "promotion",
      "public relations",
      "market research"
    ]
  }
];

// Sample education data
const EDUCATION: EducationData[] = [
  {
    id: "cs_bachelors",
    type: "Bachelor's Degree",
    name: "Computer Science",
    description: "A four-year undergraduate degree that covers programming, algorithms, data structures, computer systems, and software development.",
    duration: "4 years",
    cost: "$20,000 - $200,000 (varies by institution and residency status)",
    requirements: "High school diploma or equivalent, SAT/ACT scores, application essays",
    careers: [
      "Software Engineer",
      "Web Developer",
      "Mobile App Developer",
      "Systems Analyst",
      "Database Administrator"
    ],
    institutions: [
      "Massachusetts Institute of Technology",
      "Stanford University",
      "Carnegie Mellon University",
      "University of California, Berkeley",
      "Georgia Institute of Technology"
    ],
    keywords: [
      "computer science",
      "CS",
      "programming",
      "software engineering",
      "coding",
      "bachelor's",
      "undergraduate",
      "college",
      "university"
    ]
  },
  {
    id: "data_science_masters",
    type: "Master's Degree",
    name: "Data Science",
    description: "A graduate program focusing on statistical analysis, machine learning, data mining, and big data technologies.",
    duration: "1-2 years",
    cost: "$30,000 - $100,000 (varies by institution and residency status)",
    requirements: "Bachelor's degree (preferably in a quantitative field), GRE scores, programming experience",
    careers: [
      "Data Scientist",
      "Machine Learning Engineer",
      "Data Analyst",
      "Business Intelligence Analyst",
      "Research Scientist"
    ],
    institutions: [
      "Stanford University",
      "Massachusetts Institute of Technology",
      "University of California, Berkeley",
      "Harvard University",
      "University of Washington"
    ],
    keywords: [
      "data science",
      "analytics",
      "machine learning",
      "statistics",
      "big data",
      "master's",
      "graduate",
      "MS",
      "advanced degree"
    ]
  },
  {
    id: "coding_bootcamp",
    type: "Bootcamp",
    name: "Full-Stack Web Development Bootcamp",
    description: "An intensive, short-term training program that teaches practical web development skills including front-end and back-end technologies.",
    duration: "12-24 weeks",
    cost: "$10,000 - $20,000",
    requirements: "Basic computer literacy, pre-work assignments, interview or assessment",
    careers: [
      "Web Developer",
      "Front-End Developer",
      "Back-End Developer",
      "Full-Stack Developer",
      "Junior Software Engineer"
    ],
    institutions: [
      "App Academy",
      "Hack Reactor",
      "General Assembly",
      "Flatiron School",
      "Lambda School"
    ],
    keywords: [
      "bootcamp",
      "coding bootcamp",
      "web development",
      "programming",
      "full-stack",
      "front-end",
      "back-end",
      "short-term",
      "intensive training"
    ]
  }
];

// Sample scholarship data
const SCHOLARSHIPS: ScholarshipData[] = [
  {
    id: "tech_leaders",
    name: "Technology Leaders Scholarship",
    description: "Provides financial support to students pursuing degrees in computer science, engineering, or related technology fields.",
    amount: "$5,000",
    deadline: "2025-06-15",
    eligibility: "Undergraduate or graduate students majoring in computer science, engineering, or related fields. Minimum GPA of 3.5.",
    applicationProcess: "Online application, transcript, two letters of recommendation, personal statement.",
    website: "https://example.com/tech-leaders-scholarship",
    fieldOfStudy: [
      "Computer Science",
      "Software Engineering",
      "Information Technology",
      "Computer Engineering",
      "Data Science"
    ],
    keywords: [
      "technology",
      "computer science",
      "engineering",
      "STEM",
      "tech",
      "programming",
      "software",
      "undergraduate",
      "graduate"
    ]
  },
  {
    id: "women_in_stem",
    name: "Women in STEM Scholarship",
    description: "Supports women pursuing education and careers in science, technology, engineering, and mathematics fields.",
    amount: "$7,500",
    deadline: "2025-05-30",
    eligibility: "Female students pursuing undergraduate or graduate degrees in STEM fields. Minimum GPA of 3.2.",
    applicationProcess: "Online application, transcript, resume, essay on career goals in STEM.",
    website: "https://example.com/women-in-stem-scholarship",
    fieldOfStudy: [
      "Science",
      "Technology",
      "Engineering",
      "Mathematics",
      "Computer Science",
      "Physics",
      "Chemistry",
      "Biology"
    ],
    keywords: [
      "women",
      "STEM",
      "science",
      "technology",
      "engineering",
      "mathematics",
      "female",
      "gender diversity",
      "underrepresented"
    ]
  },
  {
    id: "future_innovators",
    name: "Future Innovators Grant",
    description: "Provides funding to students who demonstrate innovative thinking and entrepreneurial potential.",
    amount: "$3,000",
    deadline: "2025-07-10",
    eligibility: "Undergraduate or graduate students in any field with demonstrated interest in innovation and entrepreneurship.",
    applicationProcess: "Online application, business plan or innovation proposal, letter of recommendation.",
    website: "https://example.com/future-innovators-grant",
    fieldOfStudy: [
      "Business",
      "Entrepreneurship",
      "Engineering",
      "Computer Science",
      "Design",
      "Any field with innovation focus"
    ],
    keywords: [
      "innovation",
      "entrepreneurship",
      "startup",
      "business",
      "creative",
      "invention",
      "technology",
      "ideas",
      "venture"
    ]
  }
];

/**
 * Simplified search function that mimics vector similarity search
 * In a real implementation, this would use embeddings and vector similarity
 */
export function searchCareers(query: string, limit: number = 3): CareerData[] {
  const queryTerms = query.toLowerCase().split(/\s+/);
  
  // Calculate a simple relevance score based on keyword matches
  const scoredCareers = CAREERS.map(career => {
    let score = 0;
    
    // Check title and description
    if (career.title.toLowerCase().split(/\s+/).some(word => queryTerms.includes(word))) {
      score += 5;
    }
    if (queryTerms.some(term => career.description.toLowerCase().includes(term))) {
      score += 3;
    }
    
    // Check keywords
    career.keywords.forEach(keyword => {
      if (queryTerms.some(term => keyword.includes(term) || term.includes(keyword))) {
        score += 2;
      }
    });
    
    // Check skills
    career.skills.forEach(skill => {
      if (queryTerms.some(term => skill.toLowerCase().includes(term))) {
        score += 1;
      }
    });
    
    return { career, score };
  });
  
  // Sort by score and return top results
  return scoredCareers
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.career);
}

/**
 * Search for education options
 */
export function searchEducation(query: string, limit: number = 3): EducationData[] {
  const queryTerms = query.toLowerCase().split(/\s+/);
  
  const scoredEducation = EDUCATION.map(education => {
    let score = 0;
    
    // Check name and type
    if (education.name.toLowerCase().split(/\s+/).some(word => queryTerms.includes(word))) {
      score += 5;
    }
    if (education.type.toLowerCase().split(/\s+/).some(word => queryTerms.includes(word))) {
      score += 4;
    }
    
    // Check description
    if (queryTerms.some(term => education.description.toLowerCase().includes(term))) {
      score += 3;
    }
    
    // Check keywords
    education.keywords.forEach(keyword => {
      if (queryTerms.some(term => keyword.includes(term) || term.includes(keyword))) {
        score += 2;
      }
    });
    
    // Check careers
    education.careers.forEach(career => {
      if (queryTerms.some(term => career.toLowerCase().includes(term))) {
        score += 1;
      }
    });
    
    return { education, score };
  });
  
  return scoredEducation
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.education);
}

/**
 * Search for scholarships
 */
export function searchScholarships(query: string, limit: number = 3): ScholarshipData[] {
  const queryTerms = query.toLowerCase().split(/\s+/);
  
  const scoredScholarships = SCHOLARSHIPS.map(scholarship => {
    let score = 0;
    
    // Check name
    if (scholarship.name.toLowerCase().split(/\s+/).some(word => queryTerms.includes(word))) {
      score += 5;
    }
    
    // Check description and eligibility
    if (queryTerms.some(term => scholarship.description.toLowerCase().includes(term))) {
      score += 3;
    }
    if (queryTerms.some(term => scholarship.eligibility.toLowerCase().includes(term))) {
      score += 3;
    }
    
    // Check field of study
    scholarship.fieldOfStudy.forEach(field => {
      if (queryTerms.some(term => field.toLowerCase().includes(term))) {
        score += 2;
      }
    });
    
    // Check keywords
    scholarship.keywords.forEach(keyword => {
      if (queryTerms.some(term => keyword.includes(term) || term.includes(keyword))) {
        score += 2;
      }
    });
    
    return { scholarship, score };
  });
  
  return scoredScholarships
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.scholarship);
}

/**
 * Get career by ID
 */
export function getCareerById(id: string): CareerData | undefined {
  return CAREERS.find(career => career.id === id);
}

/**
 * Get education by ID
 */
export function getEducationById(id: string): EducationData | undefined {
  return EDUCATION.find(education => education.id === id);
}

/**
 * Get scholarship by ID
 */
export function getScholarshipById(id: string): ScholarshipData | undefined {
  return SCHOLARSHIPS.find(scholarship => scholarship.id === id);
}

/**
 * Generate career recommendations based on interests and skills
 */
export function generateCareerRecommendations(
  interests: string[],
  skills: string[],
  limit: number = 5
): CareerData[] {
  const query = [...interests, ...skills].join(' ');
  return searchCareers(query, limit);
}

/**
 * Find related careers
 */
export function findRelatedCareers(careerId: string, limit: number = 3): CareerData[] {
  const career = getCareerById(careerId);
  
  if (!career) {
    return [];
  }
  
  // Use keywords and skills to find related careers
  const query = [...career.keywords, ...career.skills].join(' ');
  
  // Exclude the original career from results
  return searchCareers(query, limit + 1)
    .filter(result => result.id !== careerId)
    .slice(0, limit);
}

/**
 * Find education paths for a career
 */
export function findEducationForCareer(careerId: string): EducationData[] {
  const career = getCareerById(careerId);
  
  if (!career) {
    return [];
  }
  
  // Search for education options related to this career
  return EDUCATION.filter(education => 
    education.careers.some(careerTitle => 
      careerTitle.toLowerCase() === career.title.toLowerCase() ||
      career.title.toLowerCase().includes(careerTitle.toLowerCase()) ||
      careerTitle.toLowerCase().includes(career.title.toLowerCase())
    )
  );
}

/**
 * Find scholarships for a field of study
 */
export function findScholarshipsForField(field: string): ScholarshipData[] {
  return SCHOLARSHIPS.filter(scholarship => 
    scholarship.fieldOfStudy.some(studyField => 
      studyField.toLowerCase() === field.toLowerCase() ||
      studyField.toLowerCase().includes(field.toLowerCase()) ||
      field.toLowerCase().includes(studyField.toLowerCase())
    )
  );
}
