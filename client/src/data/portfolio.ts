// Signal Architecture style reminder: keep content factual, modular, and led by engineering outcomes.

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string[];
  technologies: string[];
  github?: string;
  image?: string;
  visual: "pill" | "noc" | "traffic" | "bridge" | "sentinel" | "synopsys";
};

export const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];

export const experiences = [
  {
    role: "Intern – Embedded Systems",
    company: "Enarxi Innovations Pvt. Ltd.",
    period: "May 2025 – June 2025",
    location: "Chennai, India",
    description:
      "Completed a 6-week Embedded Systems and IoT internship with hands-on exposure to PCB assembly, soldering, circuit testing, firmware development, and embedded system design using ESP32.",
    detail:
      "Contributed to the Smart Pill Dispenser project by integrating hardware and software components.",
    technologies: ["ESP32", "Embedded C/C++", "IoT", "PCB", "Firmware"],
  },
  {
    role: "Embedded Systems Intern",
    company: "NSIC",
    period: "October 2025 – November 2025",
    location: "Chennai, India",
    description:
      "Gained practical experience in embedded systems, PCB assembly, circuit testing, hardware debugging, firmware development, and hardware validation using microcontroller-based systems.",
    technologies: [
      "Embedded Systems",
      "Microcontrollers",
      "PCB",
      "Firmware",
      "Hardware Debugging",
    ],
  },
  {
    role: "VLSI Design Intern",
    company: "Maven Silicon Pvt. Ltd.",
    period: "2026",
    location: "Bangalore, India",
    description:
      "Completed a 6-week VLSI Design internship with hands-on experience in RTL Design, Verilog HDL, ASIC Design Flow, and Functional Verification.",
    detail:
      "Worked on an AMBA AHB-to-APB Bridge and performed functional simulation, waveform analysis, RTL verification, debugging, and technical documentation.",
    technologies: [
      "Verilog HDL",
      "RTL Design",
      "ASIC Flow",
      "Functional Verification",
      "Xilinx Vivado",
      "AMBA",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "pill-dispenser",
    number: "01",
    title: "Smart Pill Dispenser using ESP32",
    category: "Embedded Systems · IoT",
    description: [
      "Developed an IoT-based Smart Pill Dispenser using ESP32, RTC DS3231, servo motor, and LCD for automated medication dispensing.",
      "Integrated Bluetooth-based mobile control for configuring pill schedules and implemented real-time alerts using a buzzer and LED.",
    ],
    technologies: ["ESP32", "RTC DS3231", "Servo Motor", "LCD", "Bluetooth", "IoT"],
    github: "https://github.com/Yogavelan2007/Smart-Pill-Dispenser",
    image: "/images/yogavelan-pill-dispenser.jpg",
    visual: "pill",
  },
  {
    id: "thermal-noc",
    number: "02",
    title: "Thermal-Aware 3D NoC Router on FPGA",
    category: "VLSI · FPGA · Digital Design",
    description: [
      "Designed and implemented a Thermal-Aware 3D Network-on-Chip Router on the Arty S7 FPGA using Verilog and Xilinx Vivado.",
      "Implemented routing logic with dynamic path selection and thermal monitoring for efficient packet transmission. Verified the design through simulation and waveform analysis.",
    ],
    technologies: ["Verilog HDL", "FPGA", "Arty S7", "Xilinx Vivado", "3D NoC", "Digital Design"],
    image: "/images/yogavelan-fpga-noc.jpg",
    visual: "noc",
  },
  {
    id: "traffic-controller",
    number: "03",
    title: "AI-Driven Traffic Congestion Prediction & FPGA-Based Signal Controller",
    category: "AI · FPGA · Computer Vision",
    description: [
      "Designed an AI-driven traffic congestion prediction system integrated with an FPGA-based adaptive traffic signal controller.",
      "Used YOLOv8 Nano for vehicle detection and congestion classification, and implemented an FSM-based traffic light controller for dynamic signal timing.",
    ],
    technologies: ["YOLOv8 Nano", "Python", "Verilog", "FPGA", "Xilinx Vivado", "Computer Vision"],
    image: "/images/yogavelan-ai-traffic.jpg",
    visual: "traffic",
  },
  {
    id: "ahb-apb-bridge",
    number: "04",
    title: "AHB to APB Bridge Design",
    category: "VLSI · RTL · AMBA",
    description: [
      "Designed and verified an AHB to APB Bridge using Verilog HDL based on the ARM AMBA protocol.",
      "Implemented an FSM-based APB controller and AHB slave interface to support reliable read/write transactions, then performed functional simulation, waveform analysis, and RTL verification using Xilinx Vivado.",
    ],
    technologies: ["Verilog HDL", "AMBA", "AHB", "APB", "RTL Design", "Xilinx Vivado", "Functional Verification"],
    github: "https://github.com/Yogavelan2007/AMBA-AHB2APB-Bridge",
    image: "/images/yogavelan-ahb-apb-bridge.jpg",
    visual: "bridge",
  },
  {
    id: "sentinel-ai",
    number: "05",
    title: "SentinelAI — Real-Time Image Manipulation Detection",
    category: "AI · Computer Vision · Deep Learning",
    description: [
      "Developed SentinelAI, a real-time image manipulation detection system using Deep Learning and Computer Vision to classify facial images as REAL or FAKE.",
      "Implemented an EfficientNet-based deep learning model with MTCNN-based face detection and OpenCV for real-time webcam processing, displaying the predicted class with its confidence percentage.",
    ],
    technologies: ["Python", "PyTorch", "EfficientNet", "MTCNN", "OpenCV", "Computer Vision", "Deep Learning"],
    github: "https://github.com/Yogavelan2007/SentinelAI",
    image: "/images/yogavelan-sentinel-ai.jpg",
    visual: "sentinel",
  },
  {
    id: "synopsys-digital-design",
    number: "06",
    title: "Digital Design & Simulation using Synopsys",
    category: "VLSI · CMOS Digital Design · EDA",
    description: [
      "Designed and simulated CMOS-based digital logic circuits using Synopsys Custom Compiler and PrimeWave.",
      "Implemented and verified fundamental logic gates alongside Half Adder and Full Adder circuits through schematic design, testbench configuration, simulation, and waveform analysis.",
    ],
    technologies: ["Synopsys Custom Compiler", "Synopsys PrimeWave", "CMOS", "Digital Logic Design", "Circuit Simulation", "Waveform Analysis"],
    github: "https://github.com/Yogavelan2007/DIGITAL-DESIGN-USING-SYNOPSYS",
    image: "/images/yogavelan-synopsys-design.jpg",
    visual: "synopsys",
  },
];

export const skillGroups = [
  {
    title: "VLSI & Digital Design",
    items: ["Verilog HDL", "RTL Design", "Digital Logic Design", "ASIC Design Flow", "Functional Verification", "AMBA Protocols", "AHB", "APB"],
  },
  {
    title: "Embedded Systems",
    items: ["ESP32", "Microcontrollers", "Embedded C/C++", "Firmware Development", "IoT", "Hardware Debugging", "PCB Assembly", "Circuit Testing"],
  },
  {
    title: "FPGA & EDA",
    items: ["Xilinx Vivado", "Arty S7", "FPGA Design", "Simulation", "Waveform Analysis"],
  },
  {
    title: "Programming",
    items: ["C/C++", "Python", "Verilog HDL"],
  },
  {
    title: "AI, ML & Computer Vision",
    items: ["Machine Learning", "Deep Learning", "PyTorch", "EfficientNet", "YOLOv8", "MTCNN", "OpenCV", "Computer Vision", "AI-based System Development", "Model Training", "Image Classification"],
  },
  {
    title: "Frontend Development",
    items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend Development",
    items: ["Node.js", "Express.js", "REST APIs", "API Integration", "JSON"],
  },
];

export const certifications = [
  { title: "Programming Essentials in Python", issuer: "Cisco" },
  { title: "Embedded for Beginners", issuer: "National Institute of Electronics and Information Technology, Calicut" },
  { title: "Introduction to Modern AI", issuer: "Cisco" },
  { title: "Introduction to Industry 4.0 & Industrial IoT", issuer: "Certification listed in resume" },
  { title: "Course on Java", issuer: "Livewire" },
  { title: "CCNA: Introduction to Networks", issuer: "Cisco" },
  { title: "VLSI for Beginners", issuer: "National Institute of Electronics and Information Technology, Calicut" },
  { title: "Sensors and Actuators", issuer: "NPTEL" },
  { title: "VLSI System On Chip Design — Overview", issuer: "Maven Silicon" },
];
