import React, { useState } from 'react';
import { Sparkles, FileText, Send, Download, Copy, RefreshCw, Layers, CheckCircle2, Terminal, Info, HelpCircle } from 'lucide-react';

export const AIHelper: React.FC = () => {
  // Localization State
  const [sourceCode, setSourceCode] = useState<string>(
    `[Localization_EN]\nTitle=The Elder Forest Chronicles\nWelcomeMsg=Welcome back traveler!\nMenu_NewGame=Begin New Quest\nMenu_LoadGame=Load Chapter\nScore_Text=Enemy defeated! Experience gained: +%d points.\nCredits=Developed by Indie Forge Studio`
  );
  const [translatedCode, setTranslatedCode] = useState<string>("");
  const [format, setFormat] = useState<string>("INI Config");
  const [gameName, setGameName] = useState<string>("إندي لاند (Indie Land)");
  const [translating, setTranslating] = useState<boolean>(false);
  const [translateSuccess, setTranslateSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copyToast, setCopyToast] = useState<string>("");

  // Guide Generator State
  const [targetGameName, setTargetGameName] = useState<string>("");
  const [targetPlatform, setTargetPlatform] = useState<string>("Steam");
  const [generatingGuide, setGeneratingGuide] = useState<boolean>(false);
  const [generatedGuideText, setGeneratedGuideText] = useState<string>("");

  // Demo file presets
  const loadPreset = (type: string) => {
    switch (type) {
      case 'INI':
        setFormat("INI Config");
        setSourceCode(`[Localization_EN]\nTitle=The Elder Forest Chronicles\nWelcomeMsg=Welcome back traveler!\nMenu_NewGame=Begin New Quest\nMenu_LoadGame=Load Chapter\nScore_Text=Enemy defeated! Experience gained: +%d points.\nCredits=Developed by Indie Forge Studio`);
        break;
      case 'JSON':
        setFormat("JSON Objects");
        setSourceCode(`{\n  "game_header": {\n    "title": "Cosmic Drift 2026",\n    "speed_gauge": "KM/H"\n  },\n  "dialogue_system": {\n    "intro_hero": "I've been waiting for this race for ages, {player}!",\n    "system_error": "Disconnected from solar server. Retrying..."\n  }\n}`);
        break;
      case 'Text':
        setFormat("Subtitles / Text");
        setSourceCode(`1\n00:01:22,000 --> 00:01:25,000\n[Commander]: Secure the gateway at once! The portal is collapsing.\n\n2\n00:01:26,500 --> 00:01:30,000\n[Pilot]: Copy that, firing thrusters. Hold on tight, %s!`);
        break;
    }
    setTranslatedCode("");
    setTranslateSuccess(false);
  };

  const handleTranslate = async () => {
    if (!sourceCode.trim()) {
      setErrorMessage("الرجاء كتابة أو لصق أسطر أو ملف التهيئة المراد تعريبه.");
      return;
    }

    setTranslating(true);
    setErrorMessage("");
    setTranslateSuccess(false);

    try {
      const response = await fetch("/api/gemini/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: sourceCode,
          format: format,
          gameName: gameName
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "خطأ أثناء محاولة الاتصال بالخادم الرئيسي.");
      }

      setTranslatedCode(data.translated || data.mockTranslation || "");
      setTranslateSuccess(true);
      if (data.isDemoFallback) {
        setErrorMessage("ملاحظة: هذا الباتش معرّب تجريبياً محلياً نظراً لعدم إدخال مفتاح Gemini API في Secrets.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "فشلت عملية الاتصال بخادم الذكاء الاصطناعي.");
    } finally {
      setTranslating(false);
    }
  };

  const handleGenerateGuide = async () => {
    if (!targetGameName.trim()) {
      return;
    }

    setGeneratingGuide(true);
    setGeneratedGuideText("");

    try {
      const response = await fetch("/api/gemini/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameName: targetGameName,
          platform: targetPlatform
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "فشل توليد الشرح.");
      }

      setGeneratedGuideText(data.guide || "");
    } catch (err: any) {
      console.error(err);
      setGeneratedGuideText(`### فشل توليد دليل مخصص\n${err.message || 'حدث خطأ في الشبكة.'}`);
    } finally {
      setGeneratingGuide(false);
    }
  };

  const downloadTranslatedFile = () => {
    if (!translatedCode) return;
    const extension = format === 'JSON Objects' ? 'json' : format === 'INI Config' ? 'ini' : 'txt';
    const blob = new Blob([translatedCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arabic_localization_patch.${extension}`;
    a.click();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyToast("تم نسخ النص إلى الحافظة بنجاح!");
    setTimeout(() => {
      setCopyToast("");
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="ai-helper-tab-view">
      
      {/* Toast Notice */}
      {copyToast && (
        <div className="fixed bottom-6 left-6 z-50 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="h-4 w-4" />
          <span>{copyToast}</span>
        </div>
      )}

      {/* Intro Banner */}
      <div className="rounded-2xl border border-slate-800 bg-[#11151F] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            <Sparkles className="h-4 w-4 animate-spin text-indigo-400" />
            توطين ذكي معزز بنموذج Gemini 3.5 Flash
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white">المعرّب والمترجم الذكي للألعاب المستقلة</h2>
          <p className="text-slate-400 text-sm max-w-xl">
            هل تلعب لعبة مستقلة جديدة لا تحتوي على تعريب رسمي؟ الصق ملف إعدادات اللعبة (INI/JSON) أو حواراتها هنا، وسيقوم الذكاء الاصطناعي بتوليد ملف تعريب فوري ومجهّز لك متوافق مع متغيرات الكود!
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={() => loadPreset('INI')} 
            className="rounded-lg border border-slate-700 bg-slate-800/50 px-3.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            مثال INI
          </button>
          <button 
            type="button" 
            onClick={() => loadPreset('JSON')} 
            className="rounded-lg border border-slate-700 bg-slate-800/50 px-3.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            مثال JSON
          </button>
          <button 
            type="button" 
            onClick={() => loadPreset('Text')} 
            className="rounded-lg border border-slate-700 bg-slate-800/50 px-3.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            مثال حوارات
          </button>
        </div>
      </div>

      {/* Main Interactive Translation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Source Text / Code Input */}
        <div className="rounded-xl border border-slate-800 bg-[#161B22] overflow-hidden flex flex-col h-[520px]">
          
          <div className="p-4 border-b border-slate-800 bg-slate-950/40 justify-between items-center flex flex-wrap gap-3">
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <FileText className="h-4 w-4 text-indigo-400" /> ملف اللعبة الأصلي (مفتاح وقيمة)
            </span>
            
            <div className="flex gap-2 items-center">
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-md px-2 py-1 focus:outline-none"
              >
                <option value="INI Config">كود تهيئة INI</option>
                <option value="JSON Objects">ملف جيسون JSON</option>
                <option value="Subtitles / Text">ملف ترجمة حوارات</option>
                <option value="Plain Text">نص عام / مسودات</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-slate-950/20 border-b border-slate-850 flex gap-2">
            <input 
              type="text" 
              placeholder="اسم اللعبة (مثال: Hades 2)"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="bg-slate-800 text-xs rounded-md px-3 py-1.5 text-slate-200 border border-slate-700 flex-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <textarea
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            className="flex-1 bg-slate-950/40 p-4 font-mono text-xs text-slate-300 focus:outline-none resize-none leading-relaxed"
            placeholder="لصق البيانات هنا..."
          />

          <div className="p-4 border-t border-slate-800/80 bg-slate-950/30 flex justify-between items-center">
            <span className="text-[10px] text-slate-500 font-mono">
              ترميز الملف الموصى به: UTF-8
            </span>
            
            <button
              onClick={handleTranslate}
              disabled={translating}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs transition-all ${
                translating 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-550'
              }`}
            >
              {translating ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>برمجة التوليد...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>احقن وعرّب بالذكاء الاصطناعي</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Localized / Translated Result Box */}
        <div className="rounded-xl border border-slate-800 bg-[#161B22] overflow-hidden flex flex-col h-[520px]">
          
          <div className="p-4 border-b border-slate-800 bg-slate-950/40 justify-between items-center flex">
            <span className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
              <Terminal className="h-4 w-4 text-indigo-400" /> الباتش المعرّب الجاهز للتثبيت
            </span>

            {translatedCode && (
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(translatedCode)}
                  className="p-1 px-2.5 bg-slate-800 hover:bg-slate-700 rounded-md text-[11px] text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Copy className="h-3 w-3" /> نسخ
                </button>
                <button
                  onClick={downloadTranslatedFile}
                  className="p-1 px-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-md text-[11px] text-white font-bold flex items-center gap-1 transition-colors"
                >
                  <Download className="h-3 w-3" /> تنزيل الملف
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-auto bg-slate-950/60 p-4 font-mono text-xs text-slate-200">
            {translating ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 animate-pulse">
                <Terminal className="h-10 w-10 text-indigo-400 animate-bounce" />
                <div className="text-center">
                  <p className="text-indigo-400 font-bold">جاري مراجعة وتحليل هيكلية الكود...</p>
                  <p className="text-slate-500 text-[10px] mt-1 font-sans">توطين مفردات اللعبة مع حماية متطابقة للمتغيرات</p>
                </div>
              </div>
            ) : translatedCode ? (
              <pre className="whitespace-pre-wrap leading-relaxed">{translatedCode}</pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                <Sparkles className="h-10 w-10 text-slate-700 mb-3" />
                <p className="font-bold">المعالج جاهز للعمل</p>
                <p className="text-xs text-slate-650 max-w-xs mt-1 font-sans">
                  اضغط على زر (أحقن وعرّب) لمشاهدة ناتج ترجمة الكود وتوليد الملف العربي تلقائياً.
                </p>
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-amber-500/10 border-t border-amber-500/20 text-amber-400 text-xs flex gap-2">
              <Info className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
              <span className="font-sans leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {translateSuccess && (
            <div className="p-3.5 bg-indigo-500/10 border-t border-indigo-500/20 text-indigo-400 text-xs flex gap-2 items-center">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-sans font-medium">اكتمل التوطين بنجاح! تم الحفاظ التام على متغيرات الروابط والصيغ البرمجية.</span>
            </div>
          )}

        </div>

      </div>

      {/* Guide Generator for Unlisted/Any Game */}
      <div className="rounded-xl border border-slate-800 bg-[#161B22] p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-400" /> محرك شرح تعديل وتعريب أي لعبة غير مدرجة
          </h2>
          <p className="text-xs text-slate-400">
            إذا لم تعثر على الباتش الخاص بلعبتك المفضلة في قاعدة البيانات المكونة من 900+ تعريب، اسكب اسمها هنا ليقوم الذكاء الاصطناعي بنحت دليل فني تقني يعلمك كيف تعثر وتترجم ملفاتها بنفسك كالمحترفين!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="ادخل اسم اللعبة باللغة الإنجليزية أو العربية (مثال: Hades 2)"
            value={targetGameName}
            onChange={(e) => setTargetGameName(e.target.value)}
            className="bg-[#11151F] border border-slate-750 rounded-xl px-4 py-3 text-sm flex-1 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          
          <select
            value={targetPlatform}
            onChange={(e) => setTargetPlatform(e.target.value)}
            className="bg-[#11151F] border border-slate-755 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none"
          >
            <option value="Steam">Steam</option>
            <option value="Epic Games">Epic Games</option>
            <option value="GOG">GOG</option>
            <option value="PlayStation">PlayStation / Console</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
          </select>

          <button
            onClick={handleGenerateGuide}
            disabled={generatingGuide || !targetGameName.trim()}
            className={`rounded-xl px-6 py-3 font-semibold text-sm transition-all focus:outline-none flex items-center justify-center gap-2 ${
              generatingGuide || !targetGameName.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {generatingGuide ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>برمجة التقرير...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>توليد دليل فك اللعبة وتعريبها</span>
              </>
            )}
          </button>
        </div>

        {/* Display Generated Guide */}
        {generatingGuide || generatedGuideText ? (
          <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-5 min-h-[160px] relative">
            {generatingGuide ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-slate-400">
                <RefreshCw className="h-8 w-8 animate-spin text-indigo-400" />
                <span className="text-xs animate-pulse">جاري البحث في الأرشيف وتوليد الباتش المعرفي للعبة...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-850">
                  <span className="text-xs text-indigo-400 font-bold">دليل فك الحزم والتعريب المولد بذكاء اصطناعي:</span>
                  <button
                    onClick={() => copyToClipboard(generatedGuideText)}
                    className="p-1 px-2.5 bg-slate-800 hover:bg-slate-705 rounded-md text-xs text-slate-300 flex items-center gap-1 transition-colors"
                  >
                    <Copy className="h-3 w-3" /> نسخ الدليل بالكامل
                  </button>
                </div>
                <div className="prose prose-invert prose-emerald max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {generatedGuideText}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800/60 bg-slate-950/20 p-4 flex gap-3 text-xs text-slate-400">
            <Info className="h-5 w-5 text-indigo-500 shrink-0" />
            <span>
              نظام محاكاة الفك يعتمد على التعرف الذكي لمحركات الألعاب السائدة (انريل، يونيتي، إلخ) لحصد الشروحات بدقة متناهية.
            </span>
          </div>
        )}

      </div>

    </div>
  );
};
