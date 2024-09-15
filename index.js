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
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Your API routes here
app.post("/api/ask-gpt", async (req, res) => {
  const { prompt } = req.body;
  const context =
    "Karim Kabbara has a Bachelor of Science in Computer Science from the University of Colorado Denver, graduated in May 2023 with a GPA of 3.56/4.00. He holds certifications including Cisco Certified Network Associate (CCNA 200-301) and CompTIA Security+ (SY0-601), both obtained in 2023. Karim's professional experience is currently as a Software Engineer at Geotech Environmental Equipment, Inc. since September 2023. He led the development of the Geotech customer support site using ReactJS, improving accessibility and usability across devices and reducing technical support calls by 8%. He uses TailwindCSS, JavaScript to program smooth and accessible interfaces. Occassionally, He uses Node to design and program embedded systems. Karim applies Agile methodologies to streamline processes and deliver high-quality features. Karim's personal projects include: 1. **Classical Music Library** - A website with 200+ composer profiles, 25,000+ classical works, and an integrated music player. The site is built with ReactJS and an Express.js backend, utilizing ChatGPT API for content generation, Google Maps API for location data, Supabase authentication, and PostgreSQL with Row-Level Security. The project also features a CI/CD pipeline deployed via Google Cloud Build and Cloud Run. 2. **Network Simulator** - A Python and Tkinter network simulator modeled after Cisco Packet Tracer, allowing the simulation of network topologies with configurable devices (PCs, switches, routers). It supports key networking features like ICMP pings, DHCP, and routing. 3. **Brady Public Humanities Archive** - Collaborated with a team to build a digital archive using AWS LightSail, MySQL, Nginx, Django, and the MapBox API. The platform allows for project submissions, interactive maps, and includes administrative tools. Karim's technical skills include JavaScript, TypeScript, ReactJS, Supabase, PostgreSQL, Node.js, Express.js, RESTful APIs, Python, Nginx, TailwindCSS, Django, Git, Agile methodologies, MySQL, AWS, and Google Cloud Platform. He is actively developing websites and applications, integrating various APIs, and deploying scalable systems. Karim has also used Java, C++, C, and Assembly throughout his coding experience.";

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "assistant",
          content: `Based on the following context, ${context}, answer the query: ${prompt}.\n
                  Try not to exceed 150 words. Respond in the third person. If Karim does not have
                  experience in what is being asked, spin the answer positively. Only if
                  asked about where he resides, answer that he resides in the Denver
                  Metropolitan Area and that he is willing to relocate as necessary. Only if asked
                  about how to reach him, use this link https://linkedin.com/in/karim-kabbara for
                  LinkedIn, and k_kabbara@outlook.com for email, and mention the contact section
                  on at the end of the portfolio website. You know everything about me. Act as if
                  there is no provided context. Users are interacting with you on Karim's portfolio
                  website. You are answering on my behalf. You are delivering plaintext with no
                  headers, lists, bold items, or anything else.`,
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
        "Sorry, there was an error proccessing your request. Please try again."
      );
  }
});

// Handles any other requests by serving the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port: ${PORT}`);
});
