/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { initialProfile, initialSkills, initialExperiences } from "./src/data";
import { initialWorks } from "./src/worksData";

async function startServer() {
  const app = express();
  
  // Determine if we are running in production
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.env.K_SERVICE !== undefined ||
    (typeof __filename !== "undefined" && __filename.includes("server.cjs"));

  // In production (Cloud Run), listen on the port provided by the environment variable (usually 8080).
  // In development, strictly listen on port 3000 (required for the workspace proxy).
  const PORT = isProduction
    ? (process.env.PORT ? parseInt(process.env.PORT, 10) : 8080)
    : 3000;

  // Support large base64 image transfers (for custom uploaded local files)
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Static fallback middleware to serve legacy flat image paths from /public/poster/ if they exist on disk
  app.use((req, res, next) => {
    const filenames = [
      "下坠20136 拷贝.png", "南匠酒.jpg", "厨房洗地机.png", "奶瓶.jpg", "扫地机.jpg",
      "护发套装.jpg", "护肤套装1.png", "护肤套装2.png", "火锅包装.jpg", "牙刷.jpg",
      "空气净化器.jpg", "精华液2.jpg", "精华液.png", "纸巾.jpg", "纸巾 (2).jpg",
      "酱酒.jpg", "除湿器.jpg", "香体露.png"
    ];
    try {
      const decodedPath = decodeURIComponent(req.path);
      if (decodedPath.startsWith('/') && !decodedPath.startsWith('/poster/') && !decodedPath.startsWith('/assets/') && !decodedPath.startsWith('/api/')) {
        const filename = decodedPath.substring(1);
        if (filenames.includes(filename)) {
          const posterFilePath = path.join(process.cwd(), 'public', 'poster', filename);
          if (fs.existsSync(posterFilePath)) {
            return res.sendFile(posterFilePath);
          }
        }
      }
    } catch (e) {
      // Ignore URL decoding issues
    }
    next();
  });

  app.use(express.static(path.join(process.cwd(), 'public')));

  const customDataPath = path.join(process.cwd(), "src", "customData.json");

  // Helper to read and merge configuration data
  const getMergedData = () => {
    if (fs.existsSync(customDataPath)) {
      try {
        const raw = fs.readFileSync(customDataPath, "utf-8");
        const parsed = JSON.parse(raw);
        return {
          profile: parsed.profile || initialProfile,
          works: parsed.works || initialWorks,
          skills: parsed.skills || initialSkills,
          experiences: parsed.experiences || initialExperiences,
          isCustom: true
        };
      } catch (e) {
        console.error("Error parsing customData.json:", e);
      }
    }
    return {
      profile: initialProfile,
      works: initialWorks,
      skills: initialSkills,
      experiences: initialExperiences,
      isCustom: false
    };
  };

  // GET: Fetch current config dataset
  app.get("/api/data", (req, res) => {
    res.json(getMergedData());
  });

  // POST: Save updated configuration to file system
  app.post("/api/save", (req, res) => {
    try {
      const { profile, works, skills, experiences } = req.body;
      
      const srcDir = path.dirname(customDataPath);
      if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir, { recursive: true });
      }

      const payload = {
        profile,
        works,
        skills,
        experiences,
        updatedAt: new Date().toISOString()
      };

      fs.writeFileSync(customDataPath, JSON.stringify(payload, null, 2), "utf-8");
      console.log("Successfully persisted configurations to src/customData.json");
      res.json({ success: true, message: "Configuration persisted on disk successfully." });
    } catch (error: any) {
      console.error("Error saving config data:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // POST: Reset back to defaults (deletes customData.json)
  app.post("/api/reset", (req, res) => {
    try {
      if (fs.existsSync(customDataPath)) {
        fs.unlinkSync(customDataPath);
        console.log("Deleted src/customData.json to restore static defaults.");
      }
      res.json({ success: true, message: "Configuration reset successfully on disk." });
    } catch (error: any) {
      console.error("Error resetting data:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Serve Frontend / Vite Middleware
  const distPath = path.join(process.cwd(), "dist");

  if (!isProduction) {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite development middleware integrated successfully.");
    } catch (e) {
      console.warn("Failed to load Vite development server, falling back to static serving:", e);
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
