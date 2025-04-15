import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Sample career data for demonstration
const CAREER_DATA = {
  "software_engineer": {
    "title": "Software Engineer",
    "description": "Develops applications and systems using programming languages and software development principles.",
    "education": [
      "Bachelor's degree in Computer Science, Software Engineering, or related field",
      "Coding bootcamp (alternative path)",
      "Self-taught with strong portfolio (alternative path)"
    ],
    "skills": [
      "Programming languages (JavaScript, Python, Java, etc.)",
      "Data structures and algorithms",
      "Software design patterns",
      "Version control (Git)",
      "Problem-solving",
      "Debugging",
      "Testing methodologies"
    ],
    "salary": "$70,000 - $150,000 (varies by location, experience, and specialization)",
    "outlook": "Excellent growth potential with 22% projected increase by 2030",
    "entry_paths": [
      "Internships during college",
      "Entry-level developer positions",
      "Open source contributions",
      "Hackathons and coding competitions"
    ],
    "specializations": [
      "Front-end development",
      "Back-end development",
      "Full-stack development",
      "Mobile app development",
      "Game development",
      "DevOps",
      "Machine learning engineering"
    ]
  },
  "data_scientist": {
    "title": "Data Scientist",
    "description": "Analyzes and interprets complex data to help organizations make better decisions.",
    "education": [
      "Master's or PhD in Data Science, Statistics, Computer Science, or related field",
      "Bachelor's degree with specialized certifications (alternative path)"
    ],
    "skills": [
      "Statistical analysis",
      "Machine learning",
      "Programming (Python, R)",
      "Data visualization",
      "SQL and database knowledge",
      "Big data technologies",
      "Communication and storytelling"
    ],
    "salary": "$85,000 - $170,000 (varies by location, experience, and industry)",
    "outlook": "Very strong growth with 31% projected increase by 2030",
    "entry_paths": [
      "Graduate research assistantships",
      "Data analyst roles as stepping stones",
      "Kaggle competitions",
      "Industry internships"
    ],
    "specializations": [
      "Machine learning engineer",
      "AI researcher",
      "Business intelligence analyst",
      "Quantitative analyst",
      "Computational linguist",
      "Computer vision engineer"
    ]
  },
  "ux_designer": {
    "title": "UX Designer",
    "description": "Creates user-friendly interfaces and experiences for digital products.",
    "education": [
      "Bachelor's degree in Design, Human-Computer Interaction, or related field",
      "UX/UI bootcamps or certification programs (alternative path)",
      "Self-taught with strong portfolio (alternative path)"
    ],
    "skills": [
      "User research",
      "Wireframing and prototyping",
      "Usability testing",
      "Information architecture",
      "Visual design principles",
      "Design tools (Figma, Sketch, Adobe XD)",
      "Empathy and user advocacy"
    ],
    "salary": "$65,000 - $130,000 (varies by location, experience, and industry)",
    "outlook": "Strong growth with 23% projected increase by 2030",
    "entry_paths": [
      "Internships",
      "Junior designer positions",
      "Design challenges and competitions",
      "Personal projects and portfolio building"
    ],
    "specializations": [
      "Interaction design",
      "Visual design",
      "User research",
      "Information architecture",
      "Accessibility specialist",
      "Product design"
    ]
  },
  "healthcare_administrator": {
    "title": "Healthcare Administrator",
    "description": "Manages healthcare facilities, services, and staff to ensure efficient operations.",
    "education": [
      "Bachelor's degree in Healthcare Administration, Business, or related field",
      "Master's degree preferred for advancement (MHA, MBA with healthcare focus)"
    ],
    "skills": [
      "Leadership and management",
      "Healthcare regulations knowledge",
      "Financial management",
      "Communication",
      "Strategic planning",
      "Electronic health record systems",
      "Quality improvement methodologies"
    ],
    "salary": "$65,000 - $120,000 (varies by location, facility type, and experience)",
    "outlook": "Strong growth with 32% projected increase by 2030",
    "entry_paths": [
      "Administrative assistant or coordinator roles",
      "Department-specific management",
      "Graduate administrative fellowships",
      "Internships at healthcare facilities"
    ],
    "specializations": [
      "Hospital administration",
      "Clinical practice management",
      "Health information management",
      "Nursing home administration",
      "Health policy administration"
    ]
  },
  "marketing_manager": {
    "title": "Marketing Manager",
    "description": "Plans and oversees marketing campaigns to promote products, services, or brands.",
    "education": [
      "Bachelor's degree in Marketing, Business, Communications, or related field",
      "MBA or Master's in Marketing for advancement"
    ],
    "skills": [
      "Strategic planning",
      "Market research",
      "Brand management",
      "Digital marketing",
      "Content creation",
      "Analytics and data interpretation",
      "Project management"
    ],
    "salary": "$65,000 - $150,000 (varies by industry, company size, and experience)",
    "outlook": "Steady growth with 10% projected increase by 2030",
    "entry_paths": [
      "Marketing assistant or coordinator",
      "Social media specialist",
      "Marketing internships",
      "Sales positions as stepping stones"
    ],
    "specializations": [
      "Digital marketing",
      "Content marketing",
      "Brand management",
      "Product marketing",
      "Social media marketing",
      "Marketing analytics"
    ]
  }
};

// Initialize the Gemini API
const initializeGeminiAI = () => {
  // Get the API key from environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Return a mock if no valid API key is provided
  if (!apiKey) {
    console.log('No Gemini API key found, using mock responses');
    return null;
  }
  
  console.log('Initializing Gemini API with provided key');
  return new GoogleGenerativeAI(apiKey);
};

// Function to generate a response based on career data
const generateCareerResponse = (userMessage: string) => {
  const message = userMessage.toLowerCase();
  
  // Check for career-specific queries
  if (message.includes('software engineer') || message.includes('programming') || message.includes('coding') || message.includes('developer')) {
    return formatCareerResponse(CAREER_DATA.software_engineer);
  } 
  else if (message.includes('data scientist') || message.includes('data science') || message.includes('analytics') || message.includes('machine learning')) {
    return formatCareerResponse(CAREER_DATA.data_scientist);
  }
  else if (message.includes('ux') || message.includes('user experience') || message.includes('ui designer') || message.includes('design')) {
    return formatCareerResponse(CAREER_DATA.ux_designer);
  }
  else if (message.includes('healthcare') || message.includes('hospital') || message.includes('medical administration')) {
    return formatCareerResponse(CAREER_DATA.healthcare_administrator);
  }
  else if (message.includes('marketing') || message.includes('advertising') || message.includes('brand')) {
    return formatCareerResponse(CAREER_DATA.marketing_manager);
  }
  
  // Check for general query types
  if (message.includes('help') || message.includes('what can you do')) {
    return `I can help you with:

1. Exploring career options based on your interests and skills
2. Understanding educational requirements for specific careers
3. Learning about job market trends and salary expectations
4. Finding information about scholarships and financial aid
5. Discovering internship and early career opportunities

Just let me know what you're interested in!`;
  }
  
  if (message.includes('interest') || message.includes('like') || message.includes('enjoy')) {
    return `Based on your interests, I can suggest some career paths to explore. To provide better recommendations, could you tell me more specifically:

- What subjects do you enjoy studying?
- What activities do you find engaging?
- Do you prefer working with people, data, things, or ideas?
- Are there any industries you're particularly curious about?

The more details you share, the better I can match you with suitable career options.`;
  }
  
  if (message.includes('skill') || message.includes('good at') || message.includes('strength')) {
    return `Your skills are key to finding the right career fit. Some common skill categories include:

- Technical skills (programming, design, writing, etc.)
- Analytical skills (problem-solving, research, data analysis)
- People skills (communication, leadership, teamwork)
- Creative skills (innovation, artistic abilities)

Which of these resonate with you? Or do you have specific skills you'd like to leverage in your career?`;
  }
  
  if (message.includes('education') || message.includes('degree') || message.includes('college') || message.includes('university')) {
    return `Educational pathways vary widely depending on your career goals. Some careers require specific degrees, while others value skills and experience more.

Would you like information about:
- Degree programs for specific careers
- Alternative education options (certificates, bootcamps)
- Online learning resources
- Continuing education requirements

Let me know which aspect of education you're interested in exploring.`;
  }
  
  // Default response if no specific pattern is matched
  return `I'd be happy to help you explore career options. To provide better guidance, could you tell me more about:

- Your interests and passions
- Subjects or activities you enjoy
- Skills you have or would like to develop
- Any specific industries you're curious about

This will help me suggest careers that might be a good fit for you.`;
};

// Format career data into a readable response
const formatCareerResponse = (careerData: any) => {
  return `Based on your interest, here's information about becoming a ${careerData.title}:

**Description:** ${careerData.description}

**Education Required:** 
${careerData.education.map((item: string) => `- ${item}`).join('\n')}

**Key Skills:**
${careerData.skills.map((item: string) => `- ${item}`).join('\n')}

**Salary Range:** ${careerData.salary}

**Job Outlook:** ${careerData.outlook}

**Entry Paths:**
${careerData.entry_paths.map((item: string) => `- ${item}`).join('\n')}

**Possible Specializations:**
${careerData.specializations.map((item: string) => `- ${item}`).join('\n')}

Would you like to know more about educational pathways, required skills, or related careers?`;
};

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    
    // Get the latest user message
    const userMessage = messages[messages.length - 1].content;
    
    // Initialize Gemini AI
    const genAI = initializeGeminiAI();
    
    let responseText = '';
    
    // If we have a valid Gemini API instance, use it
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        // Format previous messages for Gemini API
        const history = [];
        
        // Only include previous messages if there are any
        if (messages.length > 1) {
          for (let i = 0; i < messages.length - 1; i++) {
            const msg = messages[i];
            // Gemini only supports user and model roles, not system
            if (msg.role === 'user' || msg.role === 'assistant') {
              history.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
              });
            }
          }
        }
        
        console.log('Chat history prepared for Gemini API:', JSON.stringify(history));
        
        // If we have history, use a chat session
        if (history.length > 0) {
          // Create a chat session
          const chat = model.startChat({
            history,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          });
          
          // Generate a response
          const result = await chat.sendMessage(userMessage);
          responseText = result.response.text();
        } else {
          // For the first message, use a simple prompt
          const result = await model.generateContent(userMessage);
          responseText = result.response.text();
        }
        
        console.log('Received response from Gemini API');
      } catch (error) {
        console.error('Error calling Gemini API:', error);
        // Fall back to mock data if API call fails
        responseText = generateCareerResponse(userMessage);
      }
    } else {
      // Use mock data if no API key is provided
      responseText = generateCareerResponse(userMessage);
    }
    
    return NextResponse.json({ 
      role: 'assistant',
      content: responseText 
    });
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
