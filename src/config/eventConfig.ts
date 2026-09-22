import { EventConfig } from '../types';

export const eventConfig: EventConfig = {
  name: "FALLING SUN",
  tagline: "BUILD SOMETHING WORTH REMEMBERING.",
  ageGroup: "UNDER 18",
  format: "12H + 12H // 2 DAYS",
  totalHours: "24 HOURS TOTAL (12H + 12H)",
  edition: "2026 EDITION",
  statusText: "SYSTEM ONLINE // RECRUITMENT OPEN",
  coordinates: "28°32'N 77°14'E",

  // Configurable URLs
  whatsappUrl: "https://chat.whatsapp.com/DBIttoQufGgC6yVIiS30Qz",
  instagramUrl: "https://www.instagram.com/fallingsun.in?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",

  tracks: [
    {
      id: "game-development",
      number: "01",
      title: "GAME DEVELOPMENT",
      tagline: "CREATE WORLDS. BUILD MECHANICS. MAKE SOMETHING PLAYABLE.",
      description:
        "Step beyond consuming games and engineer interactive realities. From 2D procedural roguelikes to 3D atmospheric simulations and physics experiments, build experiences that challenge players and push creative coding boundaries.",
      focusAreas: [
        "Core Gameplay Loops & Mechanics",
        "Procedural Generation & Shaders",
        "Physics Systems & State Machines",
        "Original Audio & Atmospheric Design"
      ],
      tools: ["Godot", "Unity", "Unreal Engine", "Phaser / WebGL", "Raylib / C++"],
      colorAccent: "#FDB813",
    },
    {
      id: "web-development",
      number: "02",
      title: "WEB DEVELOPMENT",
      tagline: "ARCHITECT INTERFACES. SHIP CODE. CRAFT EXPERIENCES.",
      description:
        "Reimagine what digital applications can achieve on the modern web. Build blistering fast client-side applications, collaborative real-time canvases, AI integrations, or experimental editorial interfaces that challenge conventional web paradigms.",
      focusAreas: [
        "Real-Time Collaborative Systems",
        "Creative Digital Experiences & Canvas",
        "Modern Full-Stack Applications",
        "Micro-Interactions & Motion Design"
      ],
      tools: ["React / Next.js", "TypeScript", "Three.js / WebGL", "Node.js / Bun", "Tailwind CSS"],
      colorAccent: "#EDEDED",
    },
    {
      id: "robotics",
      number: "03",
      title: "ROBOTICS",
      tagline: "BRIDGE HARDWARE & SOFTWARE. WIRE SENSORS. BRING CODE TO LIFE.",
      description:
        "Breathe life into physical components. Combine microcontrollers, sensors, actuators, and intelligent algorithms to build robots, automated telemetry systems, drone avionics, or kinetic machines that directly interface with reality.",
      focusAreas: [
        "Autonomous Navigation & Kinematics",
        "Microcontroller Firmware & Embedded C",
        "Sensor Fusion & Telemetry Logs",
        "Computer Vision & Edge Inference"
      ],
      tools: ["Arduino / ESP32", "Raspberry Pi", "ROS / Micro-ROS", "OpenCV", "Python / C++"],
      colorAccent: "#FF5722",
    },
  ],

  schedule: [
    {
      dayNumber: "DAY 01",
      title: "IGNITION & ARCHITECTURE",
      duration: "12 HOURS HACKING",
      dateLabel: "DATE ANNOUNCEMENT PENDING",
      events: [
        {
          time: "TBA",
          title: "Check-in & Badge Verification",
          description: "Participant arrival, credential validation, kit allocation, and workstation setup.",
          stage: "Registration",
          status: "TBA",
        },
        {
          time: "TBA",
          title: "Opening Ceremony & Keynote",
          description: "Event kick-off, track deep dives, rules briefing, and official prompt release.",
          stage: "Opening",
          status: "TBA",
        },
        {
          time: "TBA",
          title: "Hacking Sprint 01 Begins",
          description: "Clock starts for the first 12-hour build window. Repositories initialized.",
          stage: "Build",
          status: "TBA",
        },
        {
          time: "TBA",
          title: "Mentor Check-In & Architecture Review",
          description: "Industry mentors circulate to review system blueprints, hardware pinouts, and tech stacks.",
          stage: "Mentoring",
          status: "TBA",
        },
        {
          time: "TBA",
          title: "Mid-Sprint Refuel & Sync",
          description: "High-energy refuel window, lightning mini-challenges, and hardware debugging.",
          stage: "Break",
          status: "TBA",
        },
        {
          time: "TBA",
          title: "Day 01 Checkpoint & Overnight Pause",
          description: "Code commit snapshot, hardware safety storage, and rest cycle before Day 02.",
          stage: "Break",
          status: "TBA",
        },
      ],
    },
    {
      dayNumber: "DAY 02",
      title: "SYNTHESIS & JUDGING",
      duration: "12 HOURS HACKING",
      dateLabel: "DATE ANNOUNCEMENT PENDING",
      events: [
        {
          time: "TBA",
          title: "Sprint 02 Resume & Re-ignition",
          description: "Hackers return to workstations for the final 12-hour push and feature completion.",
          stage: "Build",
          status: "TBA",
        },
        {
          time: "TBA",
          title: "Final Mentoring & Polish",
          description: "Fine-tuning builds, hardware calibration, and pitch deck preparation.",
          stage: "Mentoring",
          status: "TBA",
        },
        {
          time: "TBA",
          title: "Code Freeze & Final Submissions",
          description: "Hard stop. All repositories locked, videos uploaded, and hardware setups secured.",
          stage: "Submission",
          status: "TBA",
        },
        {
          time: "TBA",
          title: "Live Demos & Stage Presentations",
          description: "Teams present their builds live to the judging panel with live QA.",
          stage: "Judging",
          status: "TBA",
        },
        {
          time: "TBA",
          title: "Awards Ceremony & Closing",
          description: "Celebration, announcement of track champions, prize distribution, and closing remarks.",
          stage: "Results",
          status: "TBA",
        },
      ],
    },
  ],

  prizes: [
    {
      id: "p1",
      rank: "01",
      title: "GRAND CHAMPION",
      category: "OVERALL WINNER",
      description: "Awarded to the most exceptional build across all disciplines, judged on technical complexity, execution polish, originality, and impact.",
      status: "TBA",
    },
    {
      id: "p2",
      rank: "02",
      title: "GAME DEV CHAMPION",
      category: "TRACK PRIZE",
      description: "Best playable game entry exhibiting compelling mechanics, responsive controls, artistic direction, and gameplay depth.",
      status: "TBA",
    },
    {
      id: "p3",
      rank: "03",
      title: "WEB DEV CHAMPION",
      category: "TRACK PRIZE",
      description: "Excellence in web engineering, real-time interactivity, design fidelity, and architectural performance.",
      status: "TBA",
    },
    {
      id: "p4",
      rank: "04",
      title: "ROBOTICS CHAMPION",
      category: "TRACK PRIZE",
      description: "Outstanding physical build demonstrating ingenious hardware-software integration, telemetry, and autonomous functionality.",
      status: "TBA",
    },
    {
      id: "p5",
      rank: "05",
      title: "MOST INNOVATIVE CONCEPT",
      category: "SPECIAL JURY AWARD",
      description: "For the boldest experimental architecture or unorthodox problem-solving approach regardless of final polish.",
      status: "TBA",
    },
    {
      id: "p6",
      rank: "06",
      title: "RISING BUILDER AWARD",
      category: "FIRST-TIME HACKERS",
      description: "Recognizing first-time hackathon entrants who demonstrated extraordinary grit, rapid learning, and creative output.",
      status: "TBA",
    },
  ],

  team: [
    {
      id: "aniket-gaba",
      name: "Aniket Gaba",
      role: "Director",
      bio: "Directing event execution, schedule orchestration, and operational alignment.",
      image: "/team/aniket-gaba.jpeg",
      isPlaceholder: false,
      section: "backbone",
    },
    {
      id: "anshika",
      name: "Anshika",
      role: "Associate Director",
      bio: "Supporting event operations, coordinating teams, and driving strategic execution.",
      image: "/team/anshika.jpeg",
      isPlaceholder: false,
      section: "backbone",
    },
    {
      id: "tanmay-singh",
      name: "Tanmay Singh",
      role: "Lead Organizer",
      bio: "Lead Organizer orchestrating technical architecture, event execution, and track curriculum.",
      image: "/team/tanmay-singh.jpeg",
      isPlaceholder: false,
    },
    {
      id: "ayush-sharma",
      name: "Ayush Sharma",
      role: "Lead Organizer",
      bio: "Lead Organizer heading branding, digital presence, community alliances, and live operations.",
      image: "/team/ayush-sharma.jpeg",
      isPlaceholder: false,
    },
    {
      id: "kartik-patel",
      name: "Kartik Patel",
      role: "Lead Organizer",
      bio: "Lead Organizer steering vision, platform infrastructure, and high-impact hacker experience for Falling Sun.",
      image: "/team/kartik-patel.jpeg",
      isPlaceholder: false,
    },
    {
      id: "anand",
      name: "Anand",
      role: "Organizer",
      bio: "Organizing guest relations, event coordination, and participant hospitality.",
      image: "/team/anand.jpeg",
      isPlaceholder: false,
    },
    {
      id: "dev-priya",
      name: "Dev Priya",
      role: "Organizer",
      bio: "Organizing participant workflows, registration onboarding, and communications.",
      image: "/team/dev-priya.jpeg",
      isPlaceholder: false,
    },
    {
      id: "aditya-kashyap",
      name: "Aditya Kashyap",
      role: "Organizer",
      bio: "Organizing technical troubleshooting, venue systems, and judging schedules.",
      image: "/team/aditya-kashyap.jpeg",
      isPlaceholder: false,
    },
    {
      id: "divyansh",
      name: "Divyansh",
      role: "Event Incharge",
      bio: "Managing on-site hardware testbenches, mentoring support, and logistics.",
      image: "/team/divyansh.jpeg",
      isPlaceholder: false,
    },
    {
      id: "adarsh",
      name: "Adarsh",
      role: "Event Incharge",
      bio: "Managing event operations, participant coordination, and on-ground logistics.",
      image: "/team/adarsh.jpeg",
      isPlaceholder: false,
    },
    {
      id: "mayank",
      name: "Mayank",
      role: "Event Incharge",
      bio: "Managing event execution, scheduling, and participant support.",
      image: "/team/mayank.jpeg",
      isPlaceholder: false,
    },
  ],

  faqs: [
    {
      id: "f1",
      question: "WHAT IS FALLING SUN?",
      answer:
        "FALLING SUN is a premier under-18 hackathon where ambitious young technologists gather for 2 days (12 hours + 12 hours) to build real, working projects in Game Development, Web Development, and Robotics. It is engineered to give builders high-end creative freedom without corporate templates.",
      category: "General",
    },
    {
      id: "f2",
      question: "WHO CAN PARTICIPATE? IS IT STRICTLY UNDER 18?",
      answer:
        "Yes, Falling Sun is strictly an under-18 event. You must be aged 18 or younger on the day the hackathon commences. High school students, self-taught creators, and young builders of all skill levels are welcome.",
      category: "Eligibility",
    },
    {
      id: "f3",
      question: "HOW DOES THE 12H + 12H SCHEDULE WORK?",
      answer:
        "Instead of an exhausting non-stop sleep deprivation marathon, Falling Sun runs across two dedicated 12-hour building blocks over 2 days. Day 01 provides 12 hours of deep architecture and building, followed by rest, and Day 02 provides 12 hours of rapid iteration, polish, and live presentations.",
      category: "Format",
    },
    {
      id: "f4",
      question: "WHAT ARE THE THREE TRACKS?",
      answer:
        "The hackathon is centered around three pillars: (1) Game Development — building original playable titles, procedural systems, and game mechanics; (2) Web Development — engineering modern interactive web applications and digital interfaces; and (3) Robotics — programming microcontrollers, sensors, and physical computing prototypes.",
      category: "Tracks",
    },
    {
      id: "f5",
      question: "CAN I PARTICIPATE SOLO OR AS A TEAM?",
      answer:
        "You may register individually or form a team of up to 4 members. If you don't have a team beforehand, our official WhatsApp community will host dedicated team-formation sessions before the opening ceremony.",
      category: "Participation",
    },
    {
      id: "f6",
      question: "WHEN WILL THE EXACT SCHEDULE & DATES BE ANNOUNCED?",
      answer:
        "All verified dates, hourly milestones, venue specifics, and keynote timings will be published directly through our official WhatsApp announcement channel. Be sure to join the community to receive immediate notifications.",
      category: "Schedule",
    },
    {
      id: "f7",
      question: "WHEN WILL PRIZES BE REVEALED?",
      answer:
        "Prize tiers, sponsor bounties, and category perks are actively being curated and will be unveiled through WhatsApp prior to the competition start.",
      category: "Prizes",
    },
    {
      id: "f8",
      question: "WHAT SHOULD I BRING TO THE HACKATHON?",
      answer:
        "Bring your laptop, charger, testing hardware/peripherals (for Game Dev and Robotics, bring your controllers, dev boards, sensors, and cables), personal identification (student ID or government ID verifying your age), and uninhibited curiosity.",
      category: "Preparation",
    },
    {
      id: "f9",
      question: "HOW DOES REGISTRATION WORK?",
      answer:
        "Registration is completed online. Click the 'REGISTER NOW' button on our website to access the application portal. Once accepted, you will receive an invitation link to the participant WhatsApp group.",
      category: "Registration",
    },
    {
      id: "f10",
      question: "WHAT IF I HAVE NEVER ATTENDED A HACKATHON BEFORE?",
      answer:
        "Falling Sun is built to celebrate curiosity and craft. Mentors with deep technical backgrounds will be present throughout both 12-hour sprints to help you debug code, unblock hardware, and refine your pitch.",
      category: "Mentorship",
    },
  ],
};

