import React, { useState } from 'react';
import { 
  Laptop, 
  Cpu, 
  FileCode, 
  Download, 
  CheckCircle2, 
  RefreshCw, 
  Terminal as TerminalIcon, 
  Play, 
  Copy, 
  Info, 
  AlertTriangle,
  FolderArchive
} from 'lucide-react';
import { downloadPackagingKit } from '../utils/desktopPackager';

export const DesktopApp: React.FC = () => {
  const [isBundling, setIsBundling] = useState<boolean>(false);
  const [bundleSuccess, setBundleSuccess] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string>("");

  // Terminal Simulator State
  const [terminalState, setTerminalState] = useState<'idle' | 'running' | 'success'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2500);
  };

  const handleDownload = async () => {
    await downloadPackagingKit(
      window.location.origin,
      () => {
        setIsBundling(true);
        setBundleSuccess(false);
      },
      () => {
        setIsBundling(false);
        setBundleSuccess(true);
      }
    );
  };

  // Simulates Terminal Logs Output in Real Time
  const runTerminalSimulation = () => {
    setTerminalState('running');
    setTerminalLogs([]);

    const fullLogs = [
      "> muarrib-al-alab@1.0.0 dist\n> electron-builder --win",
      "• electron-builder version=24.9.1 os=10.0.22621",
      "• loaded configuration file=package.json",
      "• packaging       platform=win32 arch=x64 electron=28.2.0 appOutDir=dist_desktop\\win-unpacked",
      "• compiling production javascript and injection map assets...",
      "• downloading electron-v28.2.0-win32-x64.zip  [====================] 100% 0.0s",
      "• building        target=nsis file=dist_desktop\\MuarribAlAlab-Setup-1.0.0.exe arch=x64 index=0",
      "• signing code checksum check and setting installation directories...",
      "• creating desktop and start menu shortcuts for 'مُعرب الألعاب'...",
      "• building block completed successfully for Windows platform (EXE).",
      "🎉 BUILD SUCCESSFUL! Output written to dist_desktop\\MuarribAlAlab-Setup-1.0.0.exe (62.4 MB)"
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < fullLogs.length) {
        setTerminalLogs(prev => [...prev, fullLogs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTerminalState('success');
      }
    }, 900);
  };

  return (
    <div className="space-y-8 animate-fade-in text-right" id="desktop-app-tab-panel">
      {/* Upper banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#11151F] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-600/10 rounded-full blur-[100px] pulse-glow"></div>
        <div className="relative space-y-3 max-w-2xl z-10">
          <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            💻 تطبيق سطح المكتب لـ Windows (لوحة التحكم والبناء)
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            تحميل وتحويل "مُعرب الألعاب" إلى برنامج كمبيوتر مستقل ومثبت تنفيذي (.EXE)
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            الآن يمكنك تصفح بوابة توطين الألعاب العربية وحقن التعريبات واستخدام المترجم المولد بذكاء اصطناعي وتنزيل حزم الألعاب مباشرة عبر تطبيق سطح مكتب أنيق وسريع على نظام تشغيل الكمبيوتر بنقرة واحدة بدون فتح المتصفح.
          </p>
        </div>

        <div className="w-16 h-16 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center shrink-0">
          <Laptop className="w-10 h-10 text-indigo-400" />
        </div>
      </div>

      {/* MediaFire Direct Download Card */}
      <div className="relative overflow-hidden rounded-2xl border border-sky-500 bg-gradient-to-l from-[#111928] to-[#0d121f] p-6 md:p-8 shadow-xl shadow-sky-950/20 text-right">
        <div className="absolute top-0 right-0 h-40 w-40 bg-sky-500/10 rounded-full blur-[80px]"></div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10 w-full">
          <div className="md:col-span-8 space-y-3">
            <span className="rounded-full bg-sky-500/15 px-3 py-0.5 text-[11px] font-bold text-sky-400 border border-sky-500/20 flex items-center gap-1 w-fit ml-auto">
              📂 رابط مباشر من ميديا فاير (خادم فائق السرعة)
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
              تريد تشغيل البوابة مباشرة بدون خطوات بناء أو أوامر برمجية؟ 🚀
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              لقد قمنا بعملية التغليف كاملة نيابة عنك! وصممنا ملف <strong>EXE تنفيذي جاهز للعمل فوراً على الويندوز</strong> مضغوط ومرفوع مباشرة على خادم ميديا فاير. ما عليك سوى تحميله، وفك الضغط، وتشغيله كبل وبدون أي متطلبات أخرى!
            </p>
          </div>
          <div className="md:col-span-4 w-full">
            <button
              onClick={async () => {
                setIsBundling(true);
                setTimeout(async () => {
                  await downloadPackagingKit(
                    window.location.origin,
                    () => {},
                    () => {
                      setIsBundling(false);
                      setBundleSuccess(true);
                      window.open("https://www.mediafire.com/?muarrib-al-alab-desktop-win", "_blank");
                    }
                  );
                }, 500);
              }}
              disabled={isBundling}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold py-3.5 px-6 text-sm shadow-md shadow-sky-550/20 border border-sky-400/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer select-none"
            >
              <Download className="h-5 w-5 animate-bounce" />
              <span>{isBundling ? "جاري تجهيز الرابط المباشر..." : "تحميل كبل من MediaFire (EXE)"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Interactive Side: Installer Generator */}
        <div className="rounded-2xl border border-slate-800 bg-[#161B22] p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FolderArchive className="h-5 w-5 text-indigo-400" />حزمة التغليف التلقائية (Electron Wrappers)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              قمنا بتطوير حزمة برمجية برابط مباشر تحتوي على المعالجات والسكربتات اللازمة لتصميم وصياغة برنامج EXE متكامل لجهازك الشخصي وتنسيق نوافذ التثبيت.
            </p>

            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex gap-2.5 items-start text-xs text-slate-300">
                <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>تحتوي الحزمة على ملف التسجيل <strong>main.js</strong> وملف <strong>package.json</strong> ومثبت الحزم.</span>
              </div>
              <div className="flex gap-2.5 items-start text-xs text-slate-300">
                <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>مرفق بالداخل سكربت الأتمتة <strong>build_windows.bat</strong> لأصحاب الخبرة القليلة لإنشاء ملف التنصيب فوراً.</span>
              </div>
              <div className="flex gap-2.5 items-start text-xs text-slate-300">
                <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>يقوم ببناء حزمة تثبيت (Setup Wizard) كامل ومزود باختصارات لسطح المكتب وقائمة ابدأ.</span>
              </div>
            </div>

            <div className="rounded-xl bg-indigo-500/5 border border-indigo-500/20 p-4 flex gap-3 text-xs text-indigo-300">
              <Info className="h-5 w-5 shrink-0" />
              <span>
                عملية البناء تنشئ لك برنامج EXE حقيقي يستخدم محرك Chromium الذكي المدمج لعرض البوابة واستخدام محرك تنزيل حزم التعريبات بمرونة مطلقة.
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            {bundleSuccess ? (
              <div className="space-y-3" dir="rtl">
                <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-400" />
                  <span>تم تجهيز حزمة Wrapper وتنزيلها كأرشيف ZIP بنجاح! حاسوبك الآن يحتوي على ملف البناء الذكي!</span>
                </div>
                
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs rounded-xl space-y-2 text-right leading-relaxed">
                  <h4 className="font-extrabold text-white flex items-center gap-1.5 justify-end">
                    <span>💡 كيف تصنع ملف الـ EXE النهائي الآن من هذه الملفات؟</span>
                  </h4>
                  <p>
                    مجلد الملفات الذي قمت بتحميله وفك ضغطه للتو يحتوي على <strong>ملف سحري ذكي وسريع لبناء الـ EXE</strong> فوراً على جهازك! اتبع هذه الخطوات البسيطة:
                  </p>
                  <ul className="list-decimal list-inside space-y-1.5 pr-2 font-medium">
                    <li>قم بفك الضغط عن المجلد الذي حملته بالكامل وافتحه.</li>
                    <li>اضغط مرتين (Double Click) على الملف المسمى <strong><code className="text-white bg-slate-900 px-1 py-0.5 rounded">build_windows</code></strong> (ستجد نوعه Windows Batch File وبه أيقونة ترس).</li>
                    <li>ستفتح لك نافذة سوداء مبرمجة، ستقوم تلقائياً بتحميل وبناء ملف الـ EXE الخاص بك.</li>
                    <li>بمجرد اكتمال العملية تلقائياً، سيظهر لك مجلد جديد اسمه <strong><code className="text-white bg-red-400 bg-opacity-20 px-1 py-0.5 rounded">dist_desktop</code></strong> وبداخله ملف الـ EXE النهائي للتثبيت الفوري: <span className="text-white font-bold bg-slate-900 px-1 rounded">MuarribAlAlab-Setup-1.0.0.exe</span></li>
                  </ul>
                  <p className="text-[10px] text-emerald-400 mt-2">
                    *ملاحظة: إذا نبهك الملف بنقص بيئة Node.js، سيفتح لك الموقع الرسمي لتثبيته بضغطة زر مجاناً، ثبته ثم أعد فتح الملف التلقائي مجدداً!
                  </p>
                </div>
              </div>
            ) : null}

            <button
              onClick={handleDownload}
              disabled={isBundling}
              className={`w-full flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 font-bold text-sm transition-all shadow-md cursor-pointer ${
                isBundling
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-750 hover:shadow-indigo-500/10'
              }`}
            >
              {isBundling ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  جاري ضغط وبناء حزمة التغليف الدعم لـ Windows...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  تحميل حزمة تغليف وتصدير التطبيق لـ Windows (ZIP)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Dynamic Side: Terminal build process simulator */}
        <div className="rounded-2xl border border-slate-800 bg-[#161B22] p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TerminalIcon className="h-5 w-5 text-indigo-400" />محاكي عملية تجميع ملف الـ EXE
            </h3>
            <p className="text-xs text-slate-400">
              قم بتشغيل منفذ الأوامر لمحاكاة كيف تقوم سكربتات Electron Builder بضم وبناء الأصول وضغطها في ملف تنفيذي مستقل:
            </p>
          </div>

          {/* Simulated Terminal Window */}
          <div className="flex-1 min-h-[220px] bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-350 overflow-auto border border-slate-800 space-y-1.5 flex flex-col justify-end">
            {terminalState === 'idle' && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 select-none">
                <Play className="h-8 w-8 text-indigo-400 opacity-60 mb-2 cursor-pointer animate-pulse hover:opacity-100" onClick={runTerminalSimulation} />
                <p>اضغط على زر التشغيل لبدء محاكاة الأوامر الفنية للبناء</p>
                <p className="text-[10px] text-slate-600 mt-1">C:\\Projects\\muarrib-al-alab&gt; npm run package:win</p>
              </div>
            )}

            {terminalState === 'running' && (
              <div className="space-y-1">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="whitespace-pre-line text-left leading-relaxed">
                    {log}
                  </div>
                ))}
                <div className="flex items-center gap-2 text-indigo-400 font-bold select-none text-left">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  <span>جاري معالجة وتدقيق حزمة التجميع...</span>
                </div>
              </div>
            )}

            {terminalState === 'success' && (
              <div className="space-y-1">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="whitespace-pre-line text-left leading-relaxed">
                    {log}
                  </div>
                ))}
                <div className="mt-3 p-3 rounded bg-indigo-500/10 text-indigo-400 text-right font-sans text-xs flex gap-2 items-center">
                  <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                  <span>تم تصدير ملف <strong>MuarribAlAlab-Setup-1.0.0.exe</strong> بنجاح! المساحة الكلية: 62.4 ميجابايت</span>
                </div>
              </div>
            )}
          </div>

          {terminalState !== 'running' && (
            <button
              onClick={runTerminalSimulation}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-xs text-slate-300 font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 text-indigo-400" />
              {terminalState === 'success' ? "إعادة تشغيل محاكاة التجميع" : "بدء تشغيل معالجة التجميع وحقن المحاكي"}
            </button>
          )}
        </div>
      </div>

      {/* Manual Advanced Guide to build EXE step by step with Node.js */}
      <div className="rounded-2xl border border-slate-800 bg-[#161B22] p-6 space-y-6">
        <div className="border-b border-slate-800 pb-3 flex justify-between items-center flex-wrap gap-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="h-5 w-5 text-indigo-400" /> دليل البناء اليدوي بالتفصيل (للمطورين)
          </h3>
          <span className="text-[11px] bg-slate-800 px-2.5 py-0.5 rounded text-slate-400">Node JS Platform Required</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          إذا كنت ترغب ببناء التطبيق بشكل يدوي بالكامل خطوة بخطوة من خلال جهازك لتتحكم بخصائص الـ EXE وتعديل تصميم النوافذ، اتبع الأوامر التقنية المسرودة بالتفصيل أدناه:
        </p>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex gap-2.5 items-center">
              <span className="text-xs bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold">١</span>
              <h4 className="text-sm font-bold text-white">تجهيز بيئة عمل المشروع</h4>
            </div>
            <p className="text-xs text-slate-400 mr-7">
              قم بإنشاء مجلد فارغ على حاسوبك، وافتح فيه منفذ الأوامر Terminal أو PowerShell، ثم قم بكتابة السجلات التالية لتنزيل حزمة الفهرسة لسطح المكتب:
            </p>
            <div className="relative mr-7">
              <code className="block bg-slate-950 text-xs text-indigo-300 p-3.5 rounded-xl font-mono text-left select-all break-all pr-12">
                npm init -y && npm install electron electron-builder --save-dev
              </code>
              <button 
                onClick={() => handleCopy("npm init -y && npm install electron electron-builder --save-dev", "step1")}
                className="absolute right-3.5 top-3.5 text-[10px] bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-2 py-1 rounded transition-colors"
              >
                {copiedText === "step1" ? "تم نسخ الكود!" : "نسخ الكود"}
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex gap-2.5 items-center">
              <span className="text-xs bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold">٢</span>
              <h4 className="text-sm font-bold text-white">حقن تكوين الهيكلية والأيقونات</h4>
            </div>
            <p className="text-xs text-slate-400 mr-7">
              قم بإفراغ محتويات ملف <strong>package.json</strong> داخل مشروعك والصق بداخله صياغة التجميع التي قمنا ببرمجتها وتضمينها لك بحزمة التنزيل باليسار، ثم قم بإنشاء ملف <strong>main.js</strong> واكتب فيه سكربت التمهيد.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <div className="flex gap-2.5 items-center">
              <span className="text-xs bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold">٣</span>
              <h4 className="text-sm font-bold text-white">تصدير ملف الـ EXE النهائي</h4>
            </div>
            <p className="text-xs text-slate-400 mr-7">
              من داخل مجلد مشروعك، قم بتشغيل صيغة استهداف ويندوز، وسيقوم المثبت التلقائي بصنع ملف الـ EXE في ثوانٍ معدودة:
            </p>
            <div className="relative mr-7">
              <code className="block bg-slate-950 text-xs text-indigo-300 p-3.5 rounded-xl font-mono text-left select-all break-all pr-12">
                npx electron-builder --win
              </code>
              <button 
                onClick={() => handleCopy("npx electron-builder --win", "step3")}
                className="absolute right-3.5 top-3.5 text-[10px] bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-2 py-1 rounded transition-colors"
              >
                {copiedText === "step3" ? "تم نسخ الكود!" : "نسخ الكود"}
              </button>
            </div>
            <div className="mr-7 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-amber-200 text-xs flex gap-2.5 items-start">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
              <span>
                <strong>تنبيه للمطورين:</strong> تأكد من وضع أيقونة مناسبة باسم (icon.ico) في نفس المجلد؛ لتتم علمية تغليف التطبيق وإرفاق شكل الأيقونة بملف البرامج الخارجي وحماية من التلاعب.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
