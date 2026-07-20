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
  
  // Determine if we are running in production (Cloud Run)
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.env.K_SERVICE !== undefined ||
    (typeof __filename !== "undefined" && __filename.includes("server.cjs"));

  // In production (Cloud Run), we must listen on the port provided by the environment variable.
  // In development, we must strictly listen on port 3000 (required for the workspace proxy).
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Support large base64 image transfers (for custom uploaded local files)
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Dynamic ASCII to Chinese filename mapping middleware
  app.use((req, res, next) => {
    try {
      const decodedPath = decodeURIComponent(req.path).trim();
      const lowerPath = decodedPath.toLowerCase();

      // Define standard mappings from lowercased ASCII paths (with or without leading /) to actual files in /public
      const ASCII_MAPPING: Record<string, string> = {
        // 3d rendering (ASCII paths)
        "/3d_rendering/xiazhui.jpg": "3d_rendering/下坠.jpg",
        "3d_rendering/xiazhui.jpg": "3d_rendering/下坠.jpg",
        "/3d_rendering/nanjiangjiu.jpg": "3d_rendering/南匠酒.jpg",
        "3d_rendering/nanjiangjiu.jpg": "3d_rendering/南匠酒.jpg",
        "/3d_rendering/chufangxidiji.jpg": "3d_rendering/厨房洗地机.jpg",
        "3d_rendering/chufangxidiji.jpg": "3d_rendering/厨房洗地机.jpg",
        "/3d_rendering/naiping.jpg": "3d_rendering/奶瓶.jpg",
        "3d_rendering/naiping.jpg": "3d_rendering/奶瓶.jpg",
        "/3d_rendering/saodiji.jpg": "3d_rendering/扫地机.jpg",
        "3d_rendering/saodiji.jpg": "3d_rendering/扫地机.jpg",
        "/3d_rendering/hufataozhuang.jpg": "3d_rendering/护发套装.jpg",
        "3d_rendering/hufataozhuang.jpg": "3d_rendering/护发套装.jpg",
        "/3d_rendering/hufutaozhuang1.jpg": "3d_rendering/护肤套装1.jpg",
        "3d_rendering/hufutaozhuang1.jpg": "3d_rendering/护肤套装1.jpg",
        "/3d_rendering/hufutaozhuang2.jpg": "3d_rendering/护肤套装2.jpg",
        "3d_rendering/hufutaozhuang2.jpg": "3d_rendering/护肤套装2.jpg",
        "/3d_rendering/huoguobaozhuang.jpg": "3d_rendering/火锅包装.jpg",
        "3d_rendering/huoguobaozhuang.jpg": "3d_rendering/火锅包装.jpg",
        "/3d_rendering/yashua.jpg": "3d_rendering/牙刷.jpg",
        "3d_rendering/yashua.jpg": "3d_rendering/牙刷.jpg",
        "/3d_rendering/kongqijinghuaqi.jpg": "3d_rendering/空气净化器.jpg",
        "3d_rendering/kongqijinghuaqi.jpg": "3d_rendering/空气净化器.jpg",
        "/3d_rendering/jinghuaye2.jpg": "3d_rendering/精华液2.jpg",
        "3d_rendering/jinghuaye2.jpg": "3d_rendering/精华液2.jpg",
        "/3d_rendering/jinghuaye.jpg": "3d_rendering/精华液.jpg",
        "3d_rendering/jinghuaye.jpg": "3d_rendering/精华液.jpg",
        "/3d_rendering/zhijin.jpg": "3d_rendering/纸巾.jpg",
        "3d_rendering/zhijin.jpg": "3d_rendering/纸巾.jpg",
        "/3d_rendering/zhijin2.jpg": "3d_rendering/纸巾 (2).jpg",
        "3d_rendering/zhijin2.jpg": "3d_rendering/纸巾 (2).jpg",
        "/3d_rendering/jiangjiu.jpg": "3d_rendering/酱酒.jpg",
        "3d_rendering/jiangjiu.jpg": "3d_rendering/酱酒.jpg",
        "/3d_rendering/chushiqi.jpg": "3d_rendering/除湿器.jpg",
        "3d_rendering/chushiqi.jpg": "3d_rendering/除湿器.jpg",
        "/3d_rendering/xiangtilu.jpg": "3d_rendering/香体露.jpg",
        "3d_rendering/xiangtilu.jpg": "3d_rendering/香体露.jpg",

        // 3d rendering (Chinese paths)
        "/3d_rendering/下坠.jpg": "3d_rendering/下坠.jpg",
        "3d_rendering/下坠.jpg": "3d_rendering/下坠.jpg",
        "/3d_rendering/南匠酒.jpg": "3d_rendering/南匠酒.jpg",
        "3d_rendering/南匠酒.jpg": "3d_rendering/南匠酒.jpg",
        "/3d_rendering/厨房洗地机.jpg": "3d_rendering/厨房洗地机.jpg",
        "3d_rendering/厨房洗地机.jpg": "3d_rendering/厨房洗地机.jpg",
        "/3d_rendering/奶瓶.jpg": "3d_rendering/奶瓶.jpg",
        "3d_rendering/奶瓶.jpg": "3d_rendering/奶瓶.jpg",
        "/3d_rendering/扫地机.jpg": "3d_rendering/扫地机.jpg",
        "3d_rendering/扫地机.jpg": "3d_rendering/扫地机.jpg",
        "/3d_rendering/护发套装.jpg": "3d_rendering/护发套装.jpg",
        "3d_rendering/护发套装.jpg": "3d_rendering/护发套装.jpg",
        "/3d_rendering/护肤套装1.jpg": "3d_rendering/护肤套装1.jpg",
        "3d_rendering/护肤套装1.jpg": "3d_rendering/护肤套装1.jpg",
        "/3d_rendering/护肤套装2.jpg": "3d_rendering/护肤套装2.jpg",
        "3d_rendering/护肤套装2.jpg": "3d_rendering/护肤套装2.jpg",
        "/3d_rendering/火锅包装.jpg": "3d_rendering/火锅包装.jpg",
        "3d_rendering/火锅包装.jpg": "3d_rendering/火锅包装.jpg",
        "/3d_rendering/牙刷.jpg": "3d_rendering/牙刷.jpg",
        "3d_rendering/牙刷.jpg": "3d_rendering/牙刷.jpg",
        "/3d_rendering/空气净化器.jpg": "3d_rendering/空气净化器.jpg",
        "3d_rendering/空气净化器.jpg": "3d_rendering/空气净化器.jpg",
        "/3d_rendering/精华液2.jpg": "3d_rendering/精华液2.jpg",
        "3d_rendering/精华液2.jpg": "3d_rendering/精华液2.jpg",
        "/3d_rendering/精华液.jpg": "3d_rendering/精华液.jpg",
        "3d_rendering/精华液.jpg": "3d_rendering/精华液.jpg",
        "/3d_rendering/纸巾.jpg": "3d_rendering/纸巾.jpg",
        "3d_rendering/纸巾.jpg": "3d_rendering/纸巾.jpg",
        "/3d_rendering/纸巾 (2).jpg": "3d_rendering/纸巾 (2).jpg",
        "3d_rendering/纸巾 (2).jpg": "3d_rendering/纸巾 (2).jpg",
        "/3d_rendering/酱酒.jpg": "3d_rendering/酱酒.jpg",
        "3d_rendering/酱酒.jpg": "3d_rendering/酱酒.jpg",
        "/3d_rendering/除湿器.jpg": "3d_rendering/除湿器.jpg",
        "3d_rendering/除湿器.jpg": "3d_rendering/除湿器.jpg",
        "/3d_rendering/香体露.jpg": "3d_rendering/香体露.jpg",
        "3d_rendering/香体露.jpg": "3d_rendering/香体露.jpg",

        // Details Page (ASCII paths)
        "/details_page/gelishuang.jpg": "Details page/隔离霜.jpg",
        "details_page/gelishuang.jpg": "Details page/隔离霜.jpg",
        "/details_page/kouhong.jpg": "Details page/口红.jpg",
        "details_page/kouhong.jpg": "Details page/口红.jpg",
        "/details_page/huanfuye.jpg": "Details page/焕肤液.jpg",
        "details_page/huanfuye.jpg": "Details page/焕肤液.jpg",
        "/details_page/xifamuyu.jpg": "Details page/洗发沐浴.jpg",
        "details_page/xifamuyu.jpg": "Details page/洗发沐浴.jpg",
        "/details_page/xiaodugui.jpg": "Details page/消毒柜.jpg",
        "details_page/xiaodugui.jpg": "Details page/消毒柜.jpg",
        "/details_page/jiaju.jpg": "Details page/家居.jpg",
        "details_page/jiaju.jpg": "Details page/家居.jpg",
        "/details_page/tangrantuiche.jpg": "Details page/烫染推车.jpg",
        "details_page/tangrantuiche.jpg": "Details page/烫染推车.jpg",
        "/details_page/nuanzhuo.jpg": "Details page/暖桌.jpg",
        "details_page/nuanzhuo.jpg": "Details page/暖桌.jpg",
        "/details_page/wangzhan2.jpg": "Details page/网站2.jpg",
        "details_page/wangzhan2.jpg": "Details page/网站2.jpg",

        // Details Page (Chinese & spaced paths)
        "/details page/隔离霜.jpg": "Details page/隔离霜.jpg",
        "details page/隔离霜.jpg": "Details page/隔离霜.jpg",
        "/details page/口红.jpg": "Details page/口红.jpg",
        "details page/口红.jpg": "Details page/口红.jpg",
        "/details page/焕肤液.jpg": "Details page/焕肤液.jpg",
        "details page/焕肤液.jpg": "Details page/焕肤液.jpg",
        "/details page/洗发沐浴.jpg": "Details page/洗发沐浴.jpg",
        "details page/洗发沐浴.jpg": "Details page/洗发沐浴.jpg",
        "/details page/消毒柜.jpg": "Details page/消毒柜.jpg",
        "details page/消毒柜.jpg": "Details page/消毒柜.jpg",
        "/details page/家居.jpg": "Details page/家居.jpg",
        "details page/家居.jpg": "Details page/家居.jpg",
        "/details page/烫染推车.jpg": "Details page/烫染推车.jpg",
        "details page/烫染推车.jpg": "Details page/烫染推车.jpg",
        "/details page/暖桌.jpg": "Details page/暖桌.jpg",
        "details page/暖桌.jpg": "Details page/暖桌.jpg",
        "/details page/网站2.jpg": "Details page/网站2.jpg",
        "details page/网站2.jpg": "Details page/网站2.jpg",

        // Illustration (ASCII paths)
        "/illustration/chahua1.jpg": "Illustration/插画1.jpg",
        "illustration/chahua1.jpg": "Illustration/插画1.jpg",
        "/illustration/chahua2.jpg": "Illustration/插画2.jpg",
        "illustration/chahua2.jpg": "Illustration/插画2.jpg",
        "/illustration/chahua3.jpg": "Illustration/插画3.jpg",
        "illustration/chahua3.jpg": "Illustration/插画3.jpg",
        "/illustration/chahua4.jpg": "Illustration/插画4.jpg",
        "illustration/chahua4.jpg": "Illustration/插画4.jpg",
        "/illustration/chahua5.jpg": "Illustration/插画5.jpg",
        "illustration/chahua5.jpg": "Illustration/插画5.jpg",
        "/illustration/chahua6.jpg": "Illustration/插画6.jpg",
        "illustration/chahua6.jpg": "Illustration/插画6.jpg",

        // Illustration (Chinese paths)
        "/illustration/插画1.jpg": "Illustration/插画1.jpg",
        "illustration/插画1.jpg": "Illustration/插画1.jpg",
        "/illustration/插画2.jpg": "Illustration/插画2.jpg",
        "illustration/插画2.jpg": "Illustration/插画2.jpg",
        "/illustration/插画3.jpg": "Illustration/插画3.jpg",
        "illustration/插画3.jpg": "Illustration/插画3.jpg",
        "/illustration/插画4.jpg": "Illustration/插画4.jpg",
        "illustration/插画4.jpg": "Illustration/插画4.jpg",
        "/illustration/插画5.jpg": "Illustration/插画5.jpg",
        "illustration/插画5.jpg": "Illustration/插画5.jpg",
        "/illustration/插画6.jpg": "Illustration/插画6.jpg",
        "illustration/插画6.jpg": "Illustration/插画6.jpg",

        // New Media (ASCII paths)
        "/new_media/banner1.jpg": "New media/banner1.jpg",
        "new_media/banner1.jpg": "New media/banner1.jpg",
        "/new_media/banner2.jpg": "New media/banner2.jpg",
        "new_media/banner2.jpg": "New media/banner2.jpg",
        "/new_media/banner3.jpg": "New media/banner3.jpg",
        "new_media/banner3.jpg": "New media/banner3.jpg",
        "/new_media/banner4.jpg": "New media/banner4.jpg",
        "new_media/banner4.jpg": "New media/banner4.jpg",
        "/new_media/beijing1.jpg": "New media/背景1.jpg",
        "new_media/beijing1.jpg": "New media/背景1.jpg",
        "/new_media/beijing2.jpg": "New media/背景2.jpg",
        "new_media/beijing2.jpg": "New media/背景2.jpg",
        "/new_media/tiepian1.jpg": "New media/贴片1.jpg",
        "new_media/tiepian1.jpg": "New media/贴片1.jpg",
        "/new_media/tiepian2.jpg": "New media/贴片2.jpg",
        "new_media/tiepian2.jpg": "New media/贴片2.jpg",
        "/new_media/tiepian3.jpg": "New media/贴片3.jpg",
        "new_media/tiepian3.jpg": "New media/贴片3.jpg",
        "/new_media/tiepian4.jpg": "New media/贴片4.jpg",
        "new_media/tiepian4.jpg": "New media/贴片4.jpg",
        "/new_media/tiepian5.jpg": "New media/贴片5.jpg",
        "new_media/tiepian5.jpg": "New media/贴片5.jpg",

        // New Media (Chinese & spaced paths)
        "/new media/banner1.jpg": "New media/banner1.jpg",
        "new media/banner1.jpg": "New media/banner1.jpg",
        "/new media/banner2.jpg": "New media/banner2.jpg",
        "new media/banner2.jpg": "New media/banner2.jpg",
        "/new media/banner3.jpg": "New media/banner3.jpg",
        "new media/banner3.jpg": "New media/banner3.jpg",
        "/new media/banner4.jpg": "New media/banner4.jpg",
        "new media/banner4.jpg": "New media/banner4.jpg",
        "/new media/背景1.jpg": "New media/背景1.jpg",
        "new media/背景1.jpg": "New media/背景1.jpg",
        "/new media/背景2.jpg": "New media/背景2.jpg",
        "new media/背景2.jpg": "New media/背景2.jpg",
        "/new media/贴片1.jpg": "New media/贴片1.jpg",
        "new media/贴片1.jpg": "New media/贴片1.jpg",
        "/new media/贴片2.jpg": "New media/贴片2.jpg",
        "new media/贴片2.jpg": "New media/贴片2.jpg",
        "/new media/贴片3.jpg": "New media/贴片3.jpg",
        "new media/贴片3.jpg": "New media/贴片3.jpg",
        "/new media/贴片4.jpg": "New media/贴片4.jpg",
        "new media/贴片4.jpg": "New media/贴片4.jpg",
        "/new media/贴片5.jpg": "New media/贴片5.jpg",
        "new media/贴片5.jpg": "New media/贴片5.jpg",
      };

      // Helper to safely locate the physical asset in either 'public' or 'dist' directory
      const getAssetPath = (relativePath: string): string | null => {
        const pathsToTry = [
          path.join(process.cwd(), 'public', relativePath),
          path.join(process.cwd(), 'dist', relativePath)
        ];
        for (const p of pathsToTry) {
          if (fs.existsSync(p)) {
            return p;
          }
        }
        return null;
      };

      // Direct exact match
      if (ASCII_MAPPING[lowerPath]) {
        const physicalFile = getAssetPath(ASCII_MAPPING[lowerPath]);
        if (physicalFile) {
          return res.sendFile(physicalFile);
        }
      }

      // Fallback matching logic based on filename only
      const filename = decodedPath.split('/').pop() || '';
      const lowerFilename = filename.toLowerCase();

      const FILENAME_MAPPING: Record<string, string> = {
        "xiazhui.jpg": "3d_rendering/下坠.jpg",
        "nanjiangjiu.jpg": "3d_rendering/南匠酒.jpg",
        "chufangxidiji.jpg": "3d_rendering/厨房洗地机.jpg",
        "naiping.jpg": "3d_rendering/奶瓶.jpg",
        "saodiji.jpg": "3d_rendering/扫地机.jpg",
        "hufataozhuang.jpg": "3d_rendering/护发套装.jpg",
        "hufutaozhuang1.jpg": "3d_rendering/护肤套装1.jpg",
        "hufutaozhuang2.jpg": "3d_rendering/护肤套装2.jpg",
        "huoguobaozhuang.jpg": "3d_rendering/火锅包装.jpg",
        "yashua.jpg": "3d_rendering/牙刷.jpg",
        "kongqijinghuaqi.jpg": "3d_rendering/空气净化器.jpg",
        "jinghuaye2.jpg": "3d_rendering/精华液2.jpg",
        "jinghuaye.jpg": "3d_rendering/精华液.jpg",
        "zhijin.jpg": "3d_rendering/纸巾.jpg",
        "zhijin2.jpg": "3d_rendering/纸巾 (2).jpg",
        "jiangjiu.jpg": "3d_rendering/酱酒.jpg",
        "chushiqi.jpg": "3d_rendering/除湿器.jpg",
        "xiangtilu.jpg": "3d_rendering/香体露.jpg",

        "下坠.jpg": "3d_rendering/下坠.jpg",
        "南匠酒.jpg": "3d_rendering/南匠酒.jpg",
        "厨房洗地机.jpg": "3d_rendering/厨房洗地机.jpg",
        "奶瓶.jpg": "3d_rendering/奶瓶.jpg",
        "扫地机.jpg": "3d_rendering/扫地机.jpg",
        "护发套装.jpg": "3d_rendering/护发套装.jpg",
        "护肤套装1.jpg": "3d_rendering/护肤套装1.jpg",
        "护肤套装2.jpg": "3d_rendering/护肤套装2.jpg",
        "火锅包装.jpg": "3d_rendering/火锅包装.jpg",
        "牙刷.jpg": "3d_rendering/牙刷.jpg",
        "空气净化器.jpg": "3d_rendering/空气净化器.jpg",
        "精华液2.jpg": "3d_rendering/精华液2.jpg",
        "精华液.jpg": "3d_rendering/精华液.jpg",
        "纸巾.jpg": "3d_rendering/纸巾.jpg",
        "纸巾 (2).jpg": "3d_rendering/纸巾 (2).jpg",
        "酱酒.jpg": "3d_rendering/酱酒.jpg",
        "除湿器.jpg": "3d_rendering/除湿器.jpg",
        "香体露.jpg": "3d_rendering/香体露.jpg",

        "gelishuang.jpg": "Details page/隔离霜.jpg",
        "kouhong.jpg": "Details page/口红.jpg",
        "huanfuye.jpg": "Details page/焕肤液.jpg",
        "xifamuyu.jpg": "Details page/洗发沐浴.jpg",
        "xiaodugui.jpg": "Details page/消毒柜.jpg",
        "jiaju.jpg": "Details page/家居.jpg",
        "tangrantuiche.jpg": "Details page/烫染推车.jpg",
        "nuanzhuo.jpg": "Details page/暖桌.jpg",
        "wangzhan2.jpg": "Details page/网站2.jpg",

        "隔离霜.jpg": "Details page/隔离霜.jpg",
        "口红.jpg": "Details page/口红.jpg",
        "焕肤液.jpg": "Details page/焕肤液.jpg",
        "洗发沐浴.jpg": "Details page/洗发沐浴.jpg",
        "消毒柜.jpg": "Details page/消毒柜.jpg",
        "家居.jpg": "Details page/家居.jpg",
        "烫染推车.jpg": "Details page/烫染推车.jpg",
        "暖桌.jpg": "Details page/暖桌.jpg",
        "网站2.jpg": "Details page/网站2.jpg",

        "chahua1.jpg": "Illustration/插画1.jpg",
        "chahua2.jpg": "Illustration/插画2.jpg",
        "chahua3.jpg": "Illustration/插画3.jpg",
        "chahua4.jpg": "Illustration/插画4.jpg",
        "chahua5.jpg": "Illustration/插画5.jpg",
        "chahua6.jpg": "Illustration/插画6.jpg",

        "插画1.jpg": "Illustration/插画1.jpg",
        "插画2.jpg": "Illustration/插画2.jpg",
        "插画3.jpg": "Illustration/插画3.jpg",
        "插画4.jpg": "Illustration/插画4.jpg",
        "插画5.jpg": "Illustration/插画5.jpg",
        "插画6.jpg": "Illustration/插画6.jpg",

        "banner1.jpg": "New media/banner1.jpg",
        "banner2.jpg": "New media/banner2.jpg",
        "banner3.jpg": "New media/banner3.jpg",
        "banner4.jpg": "New media/banner4.jpg",
        "beijing1.jpg": "New media/背景1.jpg",
        "beijing2.jpg": "New media/背景2.jpg",
        "tiepian1.jpg": "New media/贴片1.jpg",
        "tiepian2.jpg": "New media/贴片2.jpg",
        "tiepian3.jpg": "New media/贴片3.jpg",
        "tiepian4.jpg": "New media/贴片4.jpg",
        "tiepian5.jpg": "New media/贴片5.jpg",

        "背景1.jpg": "New media/背景1.jpg",
        "背景2.jpg": "New media/背景2.jpg",
        "贴片1.jpg": "New media/贴片1.jpg",
        "贴片2.jpg": "New media/贴片2.jpg",
        "贴片3.jpg": "New media/贴片3.jpg",
        "贴片4.jpg": "New media/贴片4.jpg",
        "贴片5.jpg": "New media/贴片5.jpg",
      };

      if (FILENAME_MAPPING[lowerFilename]) {
        const physicalFile = getAssetPath(FILENAME_MAPPING[lowerFilename]);
        if (physicalFile) {
          return res.sendFile(physicalFile);
        }
      }
    } catch (e) {
      console.error("Error in static mapping middleware:", e);
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
