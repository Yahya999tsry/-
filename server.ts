import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for Gemini to prevent startup crashes if GEMINI_API_KEY is missing
let aiClient: GoogleGenAI | null = null;
function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// Ensure proper headers for Arabic and JSON responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API endpoint 1: Translate a game configuration content (INI, JSON, plain text)
app.post("/api/gemini/translate", async (req: express.Request, res: express.Response) => {
  try {
    const { content, format, gameName } = req.body;
    if (!content) {
      res.status(400).json({ error: "محتوى الترجمة فارغ." });
      return;
    }

    const ai = getAiClient();
    if (!ai) {
      res.status(503).json({ 
        error: "مفتاح الذكاء الاصطناعي (GEMINI_API_KEY) غير مبرمج في لوحة التحكم Secrets. يرجى تفعيله لتشغيل خدمة المترجم الذكي المباشر.",
        isDemoFallback: true,
        mockTranslation: `// تعريب تجريبي تلقائي لـ: ${gameName || "ملف اللعبة"}\n// يرجى تفعيل مفتاح Gemini للحصول على ترجمة كاملة\n\n${content.toString().split('\n').map((line: string) => {
          if (line.includes('=')) {
            const [k, v] = line.split('=');
            return `${k}= [مترجم: ${v.trim()}]`;
          }
          return line;
        }).join('\n')}`
      });
      return;
    }

    const systemInstruction = 
      "أنت معرب ومترجم ألعاب محترف وخبير في توطين الألعاب (Game Localization). " +
      "مهمتك هي ترجمة ملفات تهيئة الألعاب (مثل ملفات INI أو JSON أو CSV أو نصوص حوارات ألعاب مستقلة) إلى اللغة العربية الفصحى المتناسقة والممتعة للاعبين العرب. " +
      "الالتزامات الكلية:\n" +
      "1. حافظ على بنية وأسماء المفاتيح والمتغيرات والرموز البرمجية تماماً كما هي بدون تغيير (مثل {player}، %s، \\n).\n" +
      "2. ترجم القيم فقط إلى لغة عربية فنية حماسية تليق بأجواء اللعبة.\n" +
      "3. أرجع النتيجة بالصيغة المطلوبة ونوع التنسيق نفسه مباشرة بدون أي مقدمات أو شروحات إضافية خارج الملف الموطن.\n" +
      "4. تجنب ترجمة أسماء العلم أو الاختصارات المعقدة لملفات النظام إلا إذا كانت تُعرض للاعب في الواجهات.";

    const prompt = `الرجاء تعريب النص التالي الخاص بـ تهيئة اللعبة "${gameName || "غير محدد"}"، التنسيق المطلوب هو: ${format || "تلقائي"}.
المحتوى المراد تعريبه:
\`\`\`
${content}
\`\`\`
أرجع النتيجة المترجمة مباشرة داخل الصيغة بنفس التنسيق.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3
      }
    });

    res.json({ translated: response.text });
  } catch (error: any) {
    console.error("Gemini Translation Error:", error);
    res.status(500).json({ error: error.message || "حدث خطأ غير متوقع أثناء معالجة الترجمة بذكاء اصطناعي." });
  }
});

// API endpoint 2: Generate custom Arabic translation guides for unlisted games
app.post("/api/gemini/guide", async (req: express.Request, res: express.Response) => {
  try {
    const { gameName, platform } = req.body;
    if (!gameName) {
      res.status(400).json({ error: "اسم اللعبة مطلوب لتوليد الدليل." });
      return;
    }

    const ai = getAiClient();
    if (!ai) {
      // Return a beautiful dynamic fallback manual so that the experience is always excellent and works!
      res.json({ 
        guide: `### دليل تثبيت تعريب افتراضي لـ ${gameName}
تم توليد هذا الدليل تلقائياً لعدم وجود مفتاح Gemini نشط. يمكنك اتباع الخطوات العامة لـ ${platform || "منصات الألعاب"}:

1. **البحث عن الملفات**: ابحث في مسار تثبيت اللعبة عن ملفات اللغات بأحد التنسيقات التالية: \`.ini\`, \`.json\`, \`.bin\`, أو مجلدات تسمى \`localization\` أو \`lang\`.
2. **النسخ الاحتياطي**: أنشئ نسخة احتياطية من الملفات الإنجليزية بمسار اللعبة.
3. **تطبيق كود الترقيع**: استخدم واجهة المترجم الذكي في التطبيق لترجمة واجهة اللعبة، ثم احقن الملفات المترجمة في مجلد اللعبة.
4. **التشغيل والتمكين**: من داخل إعدادات اللعبة، قم بتمكين العرض باللغة الإنجليزية كبديل نشط للغات المستهدفة.

*تنبيه: لتوليد شروحات احترافية وحصرياً لهذه اللعبة بواسطة الذكاء الاصطناعي، يرجى ملء مفتاح GEMINI_API_KEY.*`
      });
      return;
    }

    const systemInstruction = 
      "أنت خبير تقني في فك وتعديل ملفات الألعاب وتوطينها (Game Modding and Subtitling Explorer). " +
      "قدم دليلاً مفصلاً ومنظماً باللغة العربية الفصحى الفنية حول كيفية تعريب اللعبة المذكورة، " +
      "شاملاً اسم الأداة المتوقعة المستخدمة لفك حزم اللعبة (مثل الألعاب المطورة بنظام Unreal Engine أو Unity أو RE Engine)، " +
      "وكيفية تعريبها وتطبيق الملفات مع التحذيرات لتفادي الحظر (BAN) ومسارات تعديل اللعبة المعهودة.";

    const prompt = `اكتب دليلاً تفصيلياً مميزاً لتعريب لعبة "${gameName}" على منصة "${platform || "جميع المنصات"}". أريد خطوات واضحة، أنيقة، ومعلومات تقنية حقيقية لمطوري الترجمة واللاعبين معاً.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    res.json({ guide: response.text });
  } catch (error: any) {
    console.error("Gemini Guide Error:", error);
    res.status(500).json({ error: error.message || "حدث خطأ غير متوقع أثناء توليد دليل التعريب." });
  }
});

// Configure Vite or Static Assets serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static files serving...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
