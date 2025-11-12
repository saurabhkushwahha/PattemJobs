export interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  ai_match_score: number
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "InnovateTech",
    location: "Remote",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building the client-side of our web applications. Must have 3+ years of experience with React and modern web technologies.",
    ai_match_score: 95,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "DataSolutions",
    location: "New York, NY",
    description:
      "Seeking a Full Stack Engineer to design, develop, and maintain our platform. Experience with Node.js and React is a must. You will work on scalable backend systems and responsive frontends.",
    ai_match_score: 88,
  },
  {
    id: 3,
    title: "React Native Developer",
    company: "MobileFirst",
    location: "San Francisco, CA",
    description:
      "Join our mobile team to build cross-platform applications using React Native. You will work on new features and improve existing ones. Strong JavaScript/TypeScript skills required.",
    ai_match_score: 91,
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "CloudSys",
    location: "Austin, TX",
    description:
      "We are looking for a Backend Engineer to develop robust server-side solutions using Python and AWS. You will design database schemas and build RESTful APIs for millions of users.",
    ai_match_score: 85,
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "CreativeHub",
    location: "Los Angeles, CA",
    description:
      "Design beautiful and intuitive user interfaces for our suite of web and mobile applications. Figma and prototyping experience required. Collaborate with product and engineering teams.",
    ai_match_score: 80,
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "InfraTech",
    location: "Remote",
    description:
      "Help us build and maintain our cloud infrastructure on AWS and Kubernetes. You will automate deployments, manage CI/CD pipelines, and ensure system reliability at scale.",
    ai_match_score: 87,
  },
]
