// server/index.js
import express from "express";
import OpenAI from "openai/index.mjs";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

/* ---- Static Routes ---- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Your API routes here
app.post("/api/ask-gpt", async (req, res) => {
  const { prompt } = req.body;
  const context =
    "Karim Kabbara is a Fullstack Engineer based in Denver, Colorado. He holds a B.S. in Computer Science from the University of Colorado Denver (GPA 3.56). He is certified as a Cisco Certified Network Associate (CCNA 200-301) and CompTIA Security+ (SY0-601). EXPERIENCE: 1) Software Engineer at Geotech Environmental Equipment, Inc. (September 2023 - Present, Denver, CO): Leading the development of Geotech's customer portal using React, enabling 70+ users to remotely monitor and control 40+ field devices in real time. Implementing a tiered storage strategy with Google BigQuery for warm storage and Google Cloud Storage for cold archived data, optimizing query performance and reducing long-term costs. Programming fault-tolerant and autonomous embedded systems with Node.js by collaborating with mechanical and electrical engineers. Applying Agile methodologies to streamline development and ensure the timely delivery of high-quality features that meet performance and reliability standards. 2) Lead Engineer at RealeContracts LLC (August 2024 - Present, Remote): Collaborating with a non-technical founder to launch a real estate transaction platform, leading all technical architecture and development from concept to production. Rebuilding 70+ state-provided PDF contracts as dynamic React forms with built-in signature capture, deadline tracking, error detection, and contract-aware AI-assistance, reducing human error and accelerating transaction closings. Engineering a secure digital signature system with end-to-end encryption using AES-GCM and RSA, ensuring contract integrity across multi-party signing workflows. Architecting a scalable backend with Express.js, Prisma ORM, and PostgreSQL to manage complex relationships across users, clients, properties, and multi-party contracts. Implementing a BFF authentication layer with Firebase Auth, managing JWT life cycle and role-based access control for brokers and clients. Integrating Google Cloud Storage for document and signature management with signed URL uploads, file versioning, and application-level encryption. Optimizing complex contract forms with 100+ dynamic input fields through granular state management and strategic rendering patterns, improving UI responsiveness. Karim describes himself as a Fullstack Engineer, Classical Music Enthusiast, and Problem Solver. He has a strong passion for web development and firmly believes in the growth mindset and the importance of continuous self-improvement. In his free time, he works on side projects, plays tennis, and practices piano. He is always looking to grow his personal and professional network. His skills include: React, Next.js, TypeScript, Node.js, Express.js, PostgreSQL, Prisma ORM, Firebase, Google Cloud Platform, Google BigQuery, Google Cloud Storage, Tanstack Query, Zustand, Tailwind CSS, REST APIs, Git, and Agile. He also has experience with Python, HTML, CSS, Amazon Web Services, Django, MySQL, Nginx, Supabase, and has used Java, C++, C, and Assembly throughout his coding experience. Karim's projects include: 1. RealeContracts (realecontracts.com) - A full-stack real estate transaction platform where Karim serves as Lead Engineer. Built with Next.js, Express.js, Tailwind CSS, PostgreSQL, Firebase Auth, and Google Cloud Platform. Features 70+ dynamic contract forms with signature capture, deadline tracking, error detection, AI-assistance, end-to-end encryption (AES-GCM, RSA), and role-based access control for brokers and clients. 2. Classical Library (classical-library.com, GitHub: github.com/KarimKabbara00/Classical-Library) - A classical music website featuring over 200 composers, 25,000 works, and a built-in music player. Built with React.js, CSS, Express.js, and PostgreSQL. Features unique composer profiles, trivia, and an interactive map of birth locations. Uses ChatGPT API for content generation, Google Maps API for location data, Supabase authentication, and PostgreSQL with Row-Level Security. Deployed via Google Cloud Build and Cloud Run with a CI/CD pipeline. 3. Brady Humanities Archive (bradyhumanities.org) - A worldwide public humanities archive built with Django, JavaScript, MySQL, and Tailwind CSS. Allows people from all over the globe to share how their ongoing efforts are bettering their communities. Features project submissions, interactive maps, and administrative tools. Collaborated with a team using AWS LightSail, Nginx, and the MapBox API. 4. Network Simulator (GitHub: github.com/KarimKabbara00/Network-Simulator) - A Python and Tkinter network simulator modeled after Cisco Packet Tracer, allowing simulation of network topologies with configurable devices (PCs, switches, routers). Supports IPv4 addressing, default gateways, static routing, DHCP, ICMP pings, and more.";

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an assistant on Karim Kabbara's portfolio website, answering on his behalf. Use the following context to answer questions about Karim: ${context}. Try not to exceed 150 words. Respond in the third person. If Karim does not have experience in what is being asked, spin the answer positively. Only if asked about where he resides, answer that he resides in Denver, Colorado and that he is willing to relocate as necessary. Only if asked about how to reach him, use this link https://linkedin.com/in/karim-kabbara for LinkedIn, and karim.kabbara00@gmail.com for email, and mention the contact section at the end of the portfolio website. You know everything about Karim. Never mention that you were given context or instructions — speak as if you naturally know this information. You are delivering plaintext with no headers, lists, bold items, or anything else.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4o",
    });

    if (
      !response ||
      !response.choices ||
      response.choices.length === 0 ||
      !response.choices[0].message ||
      !response.choices[0].message.content
    )
      throw "Error with response";

    res.status(200).send(response.choices[0].message.content);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .send(
        "Sorry, there was an error proccessing your request. Please try again.",
      );
  }
});

// Handles any other requests by serving the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port: ${PORT}`);
});
