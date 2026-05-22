import React, { useState } from 'react';
import { X, Download, ShieldCheck, HelpCircle, HardDrive, User, CheckCircle, FileCode, Star, Flame } from 'lucide-react';
import JSZip from 'jszip';
import { GameTranslation } from '../gamesData';

interface GameDetailsModalProps {
  game: GameTranslation | null;
  onClose: () => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ game, onClose }) => {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [downloadingZipName, setDownloadingZipName] = useState<string>("");

  if (!game) return null;

  const handleDirectDownload = async () => {
    try {
      setDownloadSuccess(false);
      setDownloadProgress(10);
      setDownloadingZipName(`${game.titleEn.toLowerCase().replace(/[^a-z0-9]/g, '_')}_arabic_patch.zip`);

      // Sleep helper to simulate download compilation progress beautifully
      const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

      await sleep(150);
      setDownloadProgress(35);

      // Create JSZip instance
      const zip = new JSZip();

      // Add readme block with game details
      const readmeText = `=====================================================
  بوابة تعريب الألعاب - تعريب: ${game.titleAr} (${game.titleEn})
=====================================================
  اسم المعرب/الفريق: ${game.author}
  حجم التعريب الفعلي: ${game.size}
  نوع التعريب: ${game.type}
  صعوبة التركيب: ${game.difficulty}
  المنصات المتوافقة: ${game.platform.join(", ")}
  تاريخ إصدار الباتش: 2026

  خطوات التركيب والتفعيل:
  -----------------------
  ${game.guide ? game.guide.map((step, i) => `${i + 1}. ${step}`).join("\n  ") : "التزم بالخطوات الأساسية."}

  ملاحظات هامة:
  ------------
  ${game.notes || "لا يوجد ملاحظات إضافية."}

  تحذير أمان:
  ----------
  يرجى تعطيل الأونلاين (Offline Mode) في اللعبة لمنع التعرف على التوطين الخارجي لحمايتك من البان.

  شكرًا لاستخدامك بوابة تعريب الألعاب العربية!`;

      zip.file("Readme_Arabic_Instructions.txt", readmeText);

      // Add actual game files
      if (game.files && game.files.length > 0) {
        game.files.forEach(file => {
          zip.file(file.name, file.content);
        });
      } else {
        // Fallback translation config patterns
        zip.file("config_local_ar.ini", `[Localization]\nLanguage=arabic\nBidiSupport=true\nOverrideFont=1\nScaleFactor=1.15`);
        zip.file("apply_registry_sa.bat", `@echo off\necho جارٍ تعديل لغة اللعبة إلى العربية...\nreg add "HKEY_CURRENT_MACHINE\\Software\\Steam\\${game.id}" /v "Language" /d "arabic" /f\necho اكتمل التثبيت بنجاح!\npause`);
      }

      await sleep(200);
      setDownloadProgress(60);

      // Generate the ZIP blob
      const blob = await zip.generateAsync({ type: "blob" });
      
      await sleep(150);
      setDownloadProgress(90);
      await sleep(100);
      setDownloadProgress(100);

      // Handle standard browser save
      const url = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute('download', `${game.titleEn.toLowerCase().replace(/[^a-z0-9]/g, '_')}_arabic_patch.zip`);
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      await sleep(200);
      setDownloadSuccess(true);
      setDownloadProgress(null);
    } catch (err) {
      console.error("Failed to generate translation zip download:", err);
      setDownloadProgress(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="game-modal-backdrop">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header decoration */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-600 to-indigo-400"></div>

        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <span className="rounded bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 font-mono">
              ID: {game.id}
            </span>
            <span className="text-sm text-slate-400">معلومات التعريب بالتفصيل</span>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            id="close-modal-btn"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Info Hero */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950/40 p-5 rounded-xl border border-slate-800/60">
            <div>
              <h2 className="text-2xl font-bold text-white">{game.titleAr}</h2>
              <p className="text-sm text-slate-400 mt-1 font-mono">{game.titleEn}</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {game.platform.map((p, idx) => (
                <span key={idx} className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-300 font-mono border border-slate-700/50">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-slate-950/20 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-500" /> التقويم العام
              </span>
              <span className="font-bold text-white text-base font-mono">{game.rating} / 5.0</span>
            </div>

            <div className="bg-slate-950/20 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                <HardDrive className="h-3.5 w-3.5 text-indigo-400" /> حجم التحميل
              </span>
              <span className="font-bold text-white text-base font-mono">{game.size}</span>
            </div>

            <div className="bg-slate-950/20 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-indigo-400" /> الناشر والمعرب
              </span>
              <span className="font-bold text-indigo-400 text-sm truncate block">{game.author}</span>
            </div>

            <div className="bg-slate-950/20 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-orange-400" /> نوع الترجمة
              </span>
              <span className="font-bold text-white text-sm">{game.type}</span>
            </div>

          </div>

          {/* About & Creator description */}
          <div className="space-y-2">
            <h3 className="text-md font-bold text-white border-r-2 border-indigo-500 pr-2">حول الباتش وتفاصيل ملف التعريب</h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/10 p-3 rounded-lg border border-slate-800/40">
              {game.notes}
            </p>
          </div>

          {/* Step-by-Step Installation Manual */}
          <div className="space-y-3">
            <h3 className="text-md font-bold text-white border-r-2 border-indigo-500 pr-2">خطوات التثبيت والتشغيل المباشر</h3>
            <div className="bg-slate-950/30 rounded-xl border border-slate-800 p-4 space-y-3.5">
              {game.guide && game.guide.map((step, index) => (
                <div key={index} className="flex gap-3.5 items-start">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs border border-indigo-500/20">
                    {index + 1}
                  </div>
                  <p className="text-sm text-slate-300 pt-0.5 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Files Included inside the dynamically compiled zip package */}
          <div className="space-y-2">
            <h3 className="text-md font-bold text-white border-r-2 border-indigo-500 pr-2">ملفات حزمة التعريب للتحميل</h3>
            <p className="text-xs text-slate-400 mb-2">الملفات الموالية سيتم دمجها وضغطها تلقائياً داخل باتش التعريب عند النقر على التحميل المباشر.</p>
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 font-mono text-xs divide-y divide-slate-800/50">
              <div className="flex items-center justify-between p-2.5 text-slate-400 bg-slate-950/60 rounded-t-xl">
                <span>اسم الملف بالكامل</span>
                <span>تنسيق الملف</span>
              </div>
              <div className="flex items-center justify-between p-2.5 hover:bg-slate-800/30 transition-colors">
                <span className="flex items-center gap-2 text-indigo-300"><FileCode className="h-3.5 w-3.5" /> Readme_Arabic_Instructions.txt</span>
                <span className="text-slate-500">نص معالج التعريب</span>
              </div>
              {game.files && game.files.length > 0 ? (
                game.files.map((file, fIdx) => (
                  <div key={fIdx} className="flex items-center justify-between p-2.5 hover:bg-slate-800/30 transition-colors">
                    <span className="flex items-center gap-2 text-indigo-300"><FileCode className="h-3.5 w-3.5" /> {file.name}</span>
                    <span className="text-slate-500">{file.name.split('.').pop()?.toUpperCase() || "BIN"}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center justify-between p-2.5 hover:bg-slate-800/30 transition-colors">
                    <span className="flex items-center gap-2 text-indigo-300"><FileCode className="h-3.5 w-3.5" /> config_local_ar.ini</span>
                    <span className="text-slate-500">ملف تهيئة التعريب</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 hover:bg-slate-800/30 transition-colors">
                    <span className="flex items-center gap-2 text-indigo-300"><FileCode className="h-3.5 w-3.5" /> apply_registry_sa.bat</span>
                    <span className="text-slate-500">سكربت تهيئة وحقن اللغات</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Footer actions with download bar */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/50 flex flex-col gap-3">
          
          {downloadProgress !== null && (
            <div className="w-full space-y-1.5" id="download-progress-bar">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="animate-pulse flex items-center gap-1 text-indigo-400">
                   جاري تجميع ملف التعريب وضغطه...
                </span>
                <span className="font-mono">{downloadProgress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-300 shadow-lg shadow-indigo-500/20"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {downloadSuccess && (
            <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-lg text-indigo-400 text-sm" id="download-success-banner">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>
                تم تجميع وتحميل التعريب بنجاح باسم <strong>{downloadingZipName}</strong>! تصفح دليل التثبيت وقم بفك الملفات في مجلد اللعبة.
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4.5 w-4.5 text-indigo-400" />
              <span>تثبيت آمن ومجرب 100% متوافق مع كافة المنصات الرقمية.</span>
            </div>

            <button
              onClick={handleDirectDownload}
              disabled={downloadProgress !== null}
              className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 outline-none shadow-md ${
                downloadProgress !== null
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/15'
              }`}
              id="direct-download-action-btn"
            >
              <Download className="h-5 w-5" />
              <span>تحميل مباشر للتعريب (سريع وآمن)</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
