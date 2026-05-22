import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Gamepad2, 
  BookOpen, 
  HelpCircle, 
  Activity, 
  Sparkles, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Info,
  Laptop,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { AIHelper } from './components/AIHelper';
import { DesktopApp } from './components/DesktopApp';
import { GameDetailsModal } from './components/GameDetailsModal';
import { generateFullCatalog, GameTranslation } from './gamesData';
import { downloadPackagingKit } from './utils/desktopPackager';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('browse');
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>(null);
  
  // PWA Support state
  const [pwaPrompt, setPwaPrompt] = useState<any>(null);
  const [pwaInstallable, setPwaInstallable] = useState<boolean>(false);
  const [showPwaInstallGuide, setShowPwaInstallGuide] = useState<boolean>(false);
  const [isInIframe, setIsInIframe] = useState<boolean>(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setPwaPrompt(e);
      setPwaInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already running as standalone (installed)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setPwaInstallable(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handlePwaInstall = async () => {
    const isInIframe = window.self !== window.top;
    
    if (isInIframe) {
      // Browsing inside iframe sandbox blocks standard install, show beautiful local guidance modal
      setShowPwaInstallGuide(true);
      return;
    }

    if (pwaPrompt) {
      pwaPrompt.prompt();
      const { outcome } = await pwaPrompt.userChoice;
      if (outcome === 'accepted') {
        setPwaPrompt(null);
        setPwaInstallable(false);
      }
    } else {
      // In a regular tab but prompt hasn't fully registered or needs manual click guidance
      setShowPwaInstallGuide(true);
    }
  };
  
  // Desktop quick downloader states
  const [isDownloadingDesktop, setIsDownloadingDesktop] = useState<boolean>(false);
  const [downloadDesktopSuccess, setDownloadDesktopSuccess] = useState<boolean>(false);

  const handleDownloadDesktopQuick = async () => {
    await downloadPackagingKit(
      window.location.origin,
      () => {
        setIsDownloadingDesktop(true);
        setDownloadDesktopSuccess(false);
      },
      () => {
        setIsDownloadingDesktop(false);
        setDownloadDesktopSuccess(true);
      }
    );
  };
  
  // Catalog Search Controls
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('الكل');
  const [selectedType, setSelectedType] = useState<string>('الكل');
  const [selectedGenre, setSelectedGenre] = useState<string>('الكل');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 24; // 24 items per grid page for optimal layout density and performance
  
  // Game Selector for modal
  const [selectedGame, setSelectedGame] = useState<GameTranslation | null>(null);

  // Instantiates the 1850+ game database stably on the client
  const allGames = useMemo(() => generateFullCatalog(), []);

  // Filter lists derived dynamically
  const genres = useMemo(() => {
    const list = new Set<string>();
    allGames.forEach(g => list.add(g.genre));
    return ['الكل', ...Array.from(list)];
  }, [allGames]);

  const platforms = ['الكل', 'Steam', 'Epic Games', 'GOG', 'PlayStation', 'Xbox', 'Nintendo Switch'];
  const translationTypes = ['الكل', 'كامل', 'قوائم ونصوص', 'دبلجة فقط', 'قوائم فقط', 'دبلجة وقوائم'];

  // Pure filtering logic
  const filteredGames = useMemo(() => {
    setCurrentPage(1); // Reset page on filter change
    return allGames.filter(game => {
      const matchesSearch = 
        game.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.titleAr.includes(searchQuery) ||
        game.author.includes(searchQuery);
      
      const matchesPlatform = 
        selectedPlatform === 'الكل' || 
        game.platform.some(p => p.toLowerCase().includes(selectedPlatform.toLowerCase()));

      const matchesType = 
        selectedType === 'الكل' || 
        game.type === selectedType;

      const matchesGenre = 
        selectedGenre === 'الكل' || 
        game.genre === selectedGenre;

      return matchesSearch && matchesPlatform && matchesType && matchesGenre;
    });
  }, [allGames, searchQuery, selectedPlatform, selectedType, selectedGenre]);

  // Featured game helper
  const featured = useMemo(() => {
    return allGames.filter(g => g.isFeatured);
  }, [allGames]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const paginatedGames = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredGames.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredGames, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col font-sans" id="app-root-container">
      
      {/* Top Warning Banner for Sandbox Iframe */}
      {isInIframe && (
        <div className="bg-gradient-to-r from-red-650 via-indigo-650 to-blue-650 text-white text-center py-3 px-4 text-xs font-bold flex flex-col md:flex-row items-center justify-center gap-3 border-b border-indigo-500/30 shadow-lg relative z-50 animate-fade-in">
          <span className="flex items-center gap-2 justify-end flex-row-reverse" dir="rtl">
            <span className="animate-ping inline-block h-2 w-2 rounded-full bg-red-400"></span>
            <span>تنبيه أمني: أنت داخل نافذة تجريبية ضيقة (iFrame) تمنع التثبيت المباشر للبرامج.</span>
          </span>
          <button
            onClick={() => window.open(window.location.origin, "_blank")}
            className="rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-3.5 py-1.5 text-xs shadow-md border border-emerald-400/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 select-none"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>اضغط هنا لفتح التطبيق بصفحة مباشرة (كاملة ومستقلة) ↗</span>
          </button>
        </div>
      )}

      {/* Top Banner Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} totalGames={allGames.length} />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {activeTab === 'browse' && (
          <div className="space-y-8 animate-fade-in" id="tab-browse-panel">
            
            {/* Interactive Hero Stats Banner */}
            <div className="relative text-right overflow-hidden rounded-2xl border border-slate-800 bg-[#11151F] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-950/40">
              <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-600/10 rounded-full blur-[100px] pulse-glow"></div>
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-blue-500/10 rounded-full blur-[100px]"></div>

              <div className="relative space-y-3 max-w-2xl z-10">
                <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
                  ⚡ تحديثات تعريب الألعاب الفورية ومجانية بالكامل
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                  حمّل تعريب ألعابك المفضلة <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-400 to-indigo-300">بضغطة زر واحدة</span>!
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  تصفح أكبر مكتبة توطين ومودات عربية للألعاب الرقمية. قمنا بجمع وفهرسة أكثر من 900 تعريب من كبار المطورين والمترجمين في الوطن العربي مع روابط تحميل مباشرة ومثبت تلقائي آمن داخل اللعبة.
                </p>
              </div>

              {/* Mega Stats box */}
              <div className="relative grid grid-cols-2 md:grid-cols-2 gap-4 w-full md:w-auto shrink-0 z-10 font-mono">
                <div className="bg-[#161B22] border border-slate-800 p-4 rounded-xl text-center">
                  <span className="block text-2xl font-bold text-white font-sans">{allGames.length}</span>
                  <span className="text-xs text-slate-400">ألعاب معرّبة</span>
                </div>
                <div className="bg-[#161B22] border border-slate-800 p-4 rounded-xl text-center">
                  <span className="block text-2xl font-bold text-indigo-400 font-sans">900,000+</span>
                  <span className="text-xs text-slate-400">تحميل مباشر</span>
                </div>
                <div className="bg-[#161B22] border border-slate-800 p-4 rounded-xl text-center">
                  <span className="block text-2xl font-bold text-white font-sans">100%</span>
                  <span className="text-xs text-slate-400">مجاني وآمن</span>
                </div>
                <div className="bg-[#161B22] border border-slate-800 p-4 rounded-xl text-center">
                  <span className="block text-2xl font-bold text-indigo-400 font-sans">24h</span>
                  <span className="text-xs text-slate-400">تحديثات مستمرة</span>
                </div>
              </div>
            </div>

            {/* 1-Click Instant App Installer (No-Hassle Direct Setup) */}
            <div className="relative overflow-hidden rounded-2xl border border-indigo-500 bg-gradient-to-l from-[#131926] to-[#0d1117] p-6 md:p-8 shadow-xl shadow-indigo-950/30 text-right">
              <div className="absolute top-0 right-0 h-48 w-48 bg-indigo-600/15 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 h-32 w-32 bg-emerald-500/5 rounded-full blur-[60px]"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap md:flex-nowrap justify-end md:justify-start">
                    <span className="rounded-full bg-indigo-500/15 px-3 py-0.5 text-[11px] font-bold text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
                      تثبيت مباشر فوري: كبرنامج مستقل للكمبيوتر (PWA)
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                      تنزيل فوري بنقرة واحدة
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug">
                    تثبيت تطبيق "بوابة معرّب الألعاب" كبرنامج للكمبيوتر (PWA) 💻
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed md:max-w-3xl">
                    قم بتثبيت التطبيق مباشرة على جهاز الكمبيوتر الخاص بك بنقرة زر واحدة! سيتكامل التطبيق تلقائياً مع نظام التشغيل ويصنع لك أيقونة تشغيل مباشرة على سطح المكتب وقائمة ابدأ للوصول السريع لجميع معربات الألعاب دون أي تعقيد أو حاجة لبرامج خارجية.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3 w-full">
                  {isInIframe ? (
                    <button
                      onClick={() => window.open(window.location.origin, "_blank")}
                      className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-extrabold py-4 px-6 text-sm shadow-lg shadow-indigo-600/15 border border-indigo-500/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>فتح في صفحة مستقلة لتفعيل التثبيت ↗</span>
                    </button>
                  ) : (
                    <button
                      onClick={async () => {
                        if (pwaPrompt) {
                          pwaPrompt.prompt();
                          const { outcome } = await pwaPrompt.userChoice;
                          if (outcome === 'accepted') {
                            setPwaPrompt(null);
                            setPwaInstallable(false);
                          }
                        } else {
                          // Standard instructions overlay / browser prompt fallback
                          handlePwaInstall();
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-extrabold py-4 px-6 text-sm shadow-lg shadow-indigo-600/15 border border-indigo-500/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Laptop className="h-5 w-5 animate-pulse text-indigo-200" />
                      <span>اضغط هنا للتثبيت الفوري للبرنامج</span>
                    </button>
                  )}
                  
                  {/* Info notice about install icons */}
                  <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                    {isInIframe 
                      ? "يتطلب فتح التطبيق في علامة تبويب كاملة ومستقلة لتفعيل التثبيت المباشر." 
                      : "أو انقر على أيقونة التنزيل (➕ / 🗳️) بجانب شريط رابط المتصفح بالأعلى لتأكيد التثبيت!"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Blockbusters Horizontal list */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-r-4 border-indigo-500 pr-2.5">تعريبات مميزة وباتشات كبرى</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featured.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => setSelectedGame(game)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-[#161B22] p-4 transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 block"
                  >
                    <div className="absolute top-2 left-2 rounded bg-indigo-600 text-white px-2 py-0.5 text-[10px]">
                      إصدار متميز
                    </div>
                    
                    <div className="mt-2 space-y-2 text-right">
                      <span className="font-mono text-slate-500 text-[11px] block">{game.genre}</span>
                      <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{game.titleAr}</h4>
                      <p className="text-xs text-slate-400 font-mono line-clamp-1">{game.titleEn}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs flex-wrap gap-2">
                      <span className="text-slate-400">حجم الملف: <strong className="text-slate-200 font-normal font-mono">{game.size}</strong></span>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedGuideId(expandedGuideId === game.id ? null : game.id);
                          }}
                          className="text-[10px] bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <HelpCircle className="h-3 w-3" /> التثبيت
                        </button>
                        <span className="flex items-center gap-1 text-indigo-400 font-semibold group-hover:underline">
                          تفاصيل <ChevronLeft className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Expandable Guide in Featured Card */}
                    {expandedGuideId === game.id && (
                      <div 
                        className="mt-3 p-3 rounded-lg bg-[#11151F] border border-slate-850 text-right animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-[10px] font-bold text-indigo-400 block mb-1">خطوات التركيب:</span>
                        <ul className="space-y-1 text-[10px] text-slate-300 list-decimal list-inside leading-relaxed pr-1">
                          {game.guide && game.guide.map((step, sIdx) => (
                            <li key={sIdx} className="line-clamp-2">{step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Interactive Catalog & Search Grid */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white">فهرس وكافة التعريبات</h3>
                <div className="text-xs text-slate-400 font-mono">
                  تم العثور على: <span className="text-indigo-400 font-bold">{filteredGames.length}</span> تعريب متاح
                </div>
              </div>

              {/* Dynamic Filter Controls Panel */}
              <div className="bg-[#11151F] rounded-2xl border border-slate-850 p-6 space-y-4">
                
                {/* Search Bar Input */}
                <div className="relative">
                  <Search className="absolute right-4 top-3.5 h-5 w-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="ابحث عن تعريب لعبة (مثلاً: Elden Ring)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#161B22] border border-slate-700 rounded-xl py-2.5 pr-12 pl-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-sans"
                    id="search-input-field"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-3 top-3.5 rounded px-2.5 py-0.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      مسح
                    </button>
                  )}
                </div>

                {/* Filter Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  
                  {/* Platforms filter */}
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">المنصة المتوافقة:</label>
                    <div className="flex flex-wrap gap-1">
                      {platforms.map((p) => (
                        <button
                          key={p}
                          onClick={() => setSelectedPlatform(p)}
                          className={`rounded px-2.5 py-1 text-xs transition-colors ${
                            selectedPlatform === p 
                              ? 'bg-indigo-600 text-white font-semibold shadow-sm' 
                              : 'bg-slate-800 text-slate-300 hover:bg-[#161B22]'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text types filter */}
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">نوع ومستوى التعريب:</label>
                    <div className="flex flex-wrap gap-1">
                      {translationTypes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedType(t)}
                          className={`rounded px-2.5 py-1 text-xs transition-colors ${
                            selectedType === t 
                              ? 'bg-indigo-600 text-white font-semibold shadow-sm' 
                              : 'bg-slate-800 text-slate-300 hover:bg-[#161B22]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Genre Category select */}
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">تصنيف اللعبة:</label>
                    <select
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      className="w-full bg-[#161B22] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {genres.map((g, idx) => (
                        <option value={g} key={idx}>{g}</option>
                      ))}
                    </select>
                  </div>

                </div>

              </div>

              {/* Master Game Cards grid */}
              {paginatedGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="games-results-grid">
                  {paginatedGames.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#161B22] p-5 hover:border-indigo-500/50 hover:bg-[#1b222d] hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="space-y-2 text-right">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] text-slate-500">{game.genre}</span>
                          <span className="font-mono text-[10px] text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                            {game.type}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{game.titleAr}</h4>
                        <p className="text-xs text-slate-400 font-mono line-clamp-1">{game.titleEn}</p>
                        
                        {/* Rating & Authors */}
                        <div className="flex items-center justify-between gap-2 pt-1.5 flex-wrap">
                          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 text-slate-400 rounded">المعرب: {game.author}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedGuideId(expandedGuideId === game.id ? null : game.id);
                            }}
                            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-sans flex items-center gap-1 cursor-pointer bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-0.5 rounded transition-all"
                          >
                            <HelpCircle className="h-3.5 w-3.5" /> طريقة التثبيت
                          </button>
                        </div>
                      </div>

                      {/* Expanded Guide section */}
                      {expandedGuideId === game.id && (
                        <div 
                          className="mt-3 p-3.5 rounded-xl bg-[#11151F] border border-slate-800 text-right animate-slide-up"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="text-xs font-bold text-indigo-400 block mb-1.5 flex items-center gap-1">
                            <HelpCircle className="h-3.5 w-3.5" /> طريقة التثبيت خطوة بخطوة:
                          </span>
                          <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside leading-relaxed pr-1">
                            {game.guide && game.guide.map((step, sIdx) => (
                              <li key={sIdx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono">{game.size}</span>
                        <span className="flex items-center gap-1 text-slate-300 group-hover:text-indigo-400 font-medium font-sans">
                          تحميل وتفاصيل <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-900/20 rounded-xl border border-dashed border-slate-800 p-8">
                  <Gamepad2 className="h-10 w-10 text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">عذرًا، لم نعثر على أي نتائج مطابقة لبحثك.</p>
                  <p className="text-xs text-slate-500 mt-1">تأكد من تجربة كلمات بديلة أو استخدم (المعرب الذكي) في الأعلى لصنع دليل مخصص.</p>
                </div>
              )}

              {/* Dynamic pagination bar */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-800 pt-5 mt-4" id="pagination-panel">
                  <div className="text-slate-400 text-xs">
                    الصفحة <strong className="text-white font-medium">{currentPage}</strong> من <strong className="text-white font-medium">{totalPages}</strong>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-1 px-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 rounded-lg text-xs text-slate-300 flex items-center gap-1 transition-all"
                    >
                      التالي <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-1 px-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 rounded-lg text-xs text-slate-300 flex items-center gap-1 transition-all"
                    >
                      <ChevronRight className="h-4 w-4" /> السابق
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* AI helper tab */}
        {activeTab === 'ai-helper' && <AIHelper />}

        {/* General Developer Manual Tab */}
        {activeTab === 'guides' && (
          <div className="space-y-6 animate-fade-in" id="tab-guides-panel">
            <div className="rounded-2xl border border-slate-800 bg-[#11151F] p-6 md:p-8 text-right space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-indigo-400" /> دليل المطورين والتركيب العام للتعريبات
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                مرحباً بك في مستندات التمكين الفني لبوابة تعريب الألعاب. إذا كنت تواجه صعوبات في معرفة مكان فك ملفات التعريبات المستخرجة، فإليك تفاصيل الهياكل والمسارات الرقمية المعتمدة في أشهر المنصات العالمية للكمبيوتر الشخصي.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="rounded-xl border border-slate-800 bg-[#161B22] p-5 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-850 pb-2.5">
                  <Gamepad2 className="h-5 w-5" /> مسارات Steam المعهودة
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تُثبت ألعاب منصة Steam تلقائياً في مكتبة البرامج التابعة لها. المسار الافتراضي لمعظم الألعاب هو:
                </p>
                <code className="block bg-slate-950 text-[10px] text-teal-300 p-2.5 rounded font-mono break-all text-left select-all">
                  C:\Program Files (x86)\Steam\steamapps\common\[Game_Name]
                </code>
                <p className="text-xs text-slate-400">
                  يرجى استخراج محتويات الباتش ووضع دليل الريدمي والمجلدات الفرعية هناك مباشرة.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#161B22] p-5 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold border-b border-slate-850 pb-2.5">
                  <Gamepad2 className="h-5 w-5" /> مسارات Epic Games
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تقوم منصة Epic Games بصنع فهارس منفصلة في مسار التثبيت الرئيسي المختار مسبقاً. المسار الافتراضي للحفظ هو:
                </p>
                <code className="block bg-slate-950 text-[10px] text-teal-300 p-2.5 rounded font-mono break-all text-left select-all">
                  C:\Program Files\Epic Games\[Game_Name]
                </code>
                <p className="text-xs text-slate-400">
                  تتميز نسخ إبيك بكونها خالية من شيفرات الـ DRM في بعض الحالات مما يسهل فكها وتعديلها.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#161B22] p-5 space-y-3">
                <div className="flex items-center gap-2 text-orange-400 font-bold border-b border-slate-850 pb-2.5">
                  <Gamepad2 className="h-5 w-5" /> ألعاب GOG الخالية من الحماية
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تتيح منصة GOG حزمة برمجية وتوطينية خالية تماماً من قيود الحقن وإدارة الحقوق الرقمية. المسار الافتراضي:
                </p>
                <code className="block bg-slate-950 text-[10px] text-teal-300 p-2.5 rounded font-mono break-all text-left select-all">
                  C:\GOG Games\[Game_Name]
                </code>
                <p className="text-xs text-slate-400">
                  يمكن التعديل بيسر، واستخدام مدراء المودات الكلاسيكية دون القلق من سحابة الحظر.
                </p>
              </div>

            </div>

            {/* General FAQs */}
            <div className="rounded-xl border border-slate-800 bg-[#161B22] p-6 space-y-4">
              <h3 className="font-bold text-white text-md">الأسئلة الشائعة حول تثبيت وإعداد التعريبات</h3>
              
              <div className="space-y-4 text-sm divide-y divide-slate-800 pr-2">
                <div className="pt-3 space-y-1">
                  <h4 className="font-bold text-indigo-400">هل تثبيت التعريبات آمن من البان في ألعاب الأونلاين؟</h4>
                  <p className="text-xs text-slate-300">
                    نعم، كافة التعريبات آمنة تماماً في أطوار اللعب الفردي (Single Player). لكن نوصي بشدة بعدم ربط الشبكة أو تشغيل اللعب الجماعي (Multiplayer) أثناء تمكين المودات المستحدثة لاجتناب البان التلقائي.
                  </p>
                </div>

                <div className="pt-3 space-y-1">
                  <h4 className="font-bold text-indigo-400">ماذا أفعل في حال عدم توافق التعريب مع النسخة الجديدة؟</h4>
                  <p className="text-xs text-slate-300">
                    يمكنك التوجه لـ (المعرّب الذكي) في المنصة ورفع ملفات التكوين واللغة المحدثة وإعادة كتابة الترجمة بنقرة زر واحدة عبر خادم الذكاء الاصطناعي لحقنها في دقة فائقة.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Desktop Wrapper Generator Tab */}
        {activeTab === 'desktop-app' && (
          <DesktopApp />
        )}

      </main>

      {/* Expanded detailed modal drawer for downloading and installing */}
      <GameDetailsModal game={selectedGame} onClose={() => setSelectedGame(null)} />

      {/* Modern PWA Quick-Install Instructions Overlay Modal */}
      {showPwaInstallGuide && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" id="pwa-install-guide-modal">
          <div className="bg-[#161B22] border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-6 text-right relative shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-start gap-4 flex-row-reverse border-b border-slate-800 pb-4">
              <button 
                onClick={() => setShowPwaInstallGuide(false)}
                className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 h-8 w-8 rounded-full flex items-center justify-center font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2 justify-end">
                  <Laptop className="h-5 w-5 text-indigo-400" />
                  برنامج بوابة مُعرب الألعاب للكمبيوتر الشخصي
                </h3>
                <p className="text-xs text-slate-400">تثبيت فوري بضغطة زر واحدة وآمن 100%</p>
              </div>
            </div>

            {/* Explainer for Iframe block */}
            <div className="space-y-4">
              {isInIframe ? (
                <>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-xs text-amber-300 leading-relaxed">
                    ⚠️ <strong>تنبيه للمنصة الاستعراضية:</strong> أنت تستعرض التطبيق حالياً من داخل نافذة مدمجة (iFrame Sandbox) لـ Google AI Studio، والمنصات الأمنية للمتصفح تمنع أي عمليات تثبيت مباشر داخل هذه النوافذ الضيقة.
                  </div>

                  <div className="space-y-3.5 pt-2">
                    <p className="text-sm text-slate-200 font-bold">خطوتين بسيطتين لبدء التثبيت:</p>
                    
                    <div className="space-y-3 pr-2 text-xs text-slate-300">
                      <div className="flex gap-2.5 items-start">
                        <span className="bg-indigo-600/20 text-indigo-400 font-bold h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[10px]">١</span>
                        <p className="leading-relaxed">
                          اضغط على الزر الزهري بالأسفل لفتح <strong>"نسخة الرابط المباشر"</strong> للتطبيق في علامة تبويب جديدة كلياً في متصفحك.
                        </p>
                      </div>
                      
                      <div className="flex gap-2.5 items-start">
                        <span className="bg-indigo-600/20 text-indigo-400 font-bold h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[10px]">٢</span>
                        <p className="leading-relaxed">
                          بمجرد فتح الصفحة الجديدة، ستتمكن من تثبيت التطبيق بنقرة زر واحدة لتشغيله كبرنامج مستقل على سطح المكتب!
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-xs text-emerald-300 leading-relaxed">
                    ✓ <strong>رائع جداً!</strong> يمكنك الآن تثبيت برنامج بوابة معرّب الألعاب على حاسوبك الشخصي مباشرة كبرنامج مستقل دون الحاجة لأي ملفات بناء أو تعقيد!
                  </div>

                  {/* Direct Native PWA trigger button */}
                  <div className="p-5 bg-indigo-950/20 border border-indigo-550/25 rounded-2xl space-y-4 text-center">
                    <div className="space-y-1.5 text-right">
                      <h4 className="text-sm font-extrabold text-white flex items-center gap-2 justify-end">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span>تثبيت فوري كبرنامج كمبيوتر مستقل 💻</span>
                      </h4>
                      <p className="text-[11px] text-slate-350 leading-relaxed max-w-md ml-auto">
                        سيتكامل التطبيق تلقائياً مع نظام ويندوز ويصنع لك أيقونة تشغيل مباشرة على سطح المكتب وقائمة ابدأ!
                      </p>
                    </div>

                    {pwaPrompt ? (
                      <button
                        onClick={async () => {
                          if (pwaPrompt) {
                            pwaPrompt.prompt();
                            const { outcome } = await pwaPrompt.userChoice;
                            if (outcome === 'accepted') {
                              setPwaPrompt(null);
                              setPwaInstallable(false);
                              setShowPwaInstallGuide(false);
                            }
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-extrabold py-3.5 px-6 text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-indigo-600/10"
                      >
                        <Laptop className="h-5 w-5 animate-bounce text-indigo-200" />
                        <span>اضغط هنا لبدء التثبيت التلقائي السريع</span>
                      </button>
                    ) : (
                      <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl text-xs text-amber-300 text-right leading-relaxed font-semibold">
                        ⚠️ المتصفح لم يرسل إشارة التثبيت التلقائي السريع حتى الآن. يرجى اتباع الطريقة اليدوية المضمونة 100% بالأسفل!
                      </div>
                    )}

                    {/* How to solve with absolute clarity */}
                    <div className="pt-4 border-t border-slate-800/60 leading-relaxed text-right space-y-4">
                      <h4 className="text-xs font-extrabold text-indigo-300 flex items-center gap-1.5 justify-end">
                        <span>🛠️ الطريقة اليدوية المضمونة للتثبيت بضغطة زر:</span>
                      </h4>
                      
                      {/* Browser Tabs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-right">
                        {/* Chrome card */}
                        <div className="bg-[#12161c] p-4 rounded-xl border border-slate-800 space-y-2.5">
                          <p className="text-xs font-bold text-white flex items-center gap-1.5 justify-end">
                            <span className="text-[10px] bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded font-mono">Chrome / Edge</span>
                            <span>خيار "حفظ ومشاركة" السريع:</span>
                          </p>
                          <ul className="space-y-1.5 text-[11px] text-slate-350 list-none">
                            <li className="flex items-start gap-1.5 justify-end">
                              <span className="text-slate-200 font-medium">1. اضغط على خيارات المتصفح (أيقونة <strong>الثلاث نقاط ⁝</strong> بالأعلى).</span>
                              <span className="text-indigo-400 font-bold shrink-0">✦</span>
                            </li>
                            <li className="flex items-start gap-1.5 justify-end">
                              <span className="text-slate-200 font-medium">2. قف بالماوس على خيار <strong>حفظ ومشاركة (Save and share)</strong>.</span>
                              <span className="text-indigo-400 font-bold shrink-0">✦</span>
                            </li>
                            <li className="flex items-start gap-1.5 justify-end">
                              <span className="text-slate-200 font-medium font-bold">3. اضغط على <strong>تثبيت الصفحة... (Install page)</strong>.</span>
                              <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            </li>
                          </ul>
                        </div>

                        {/* Direct app installer edge card */}
                        <div className="bg-[#12161c] p-4 rounded-xl border border-slate-800 space-y-2.5">
                          <p className="text-xs font-bold text-white flex items-center gap-1.5 justify-end">
                            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-mono">الخيار المباشر الثاني</span>
                            <span>خيار "التطبيقات / التثبيت":</span>
                          </p>
                          <ul className="space-y-1.5 text-[11px] text-slate-350 list-none">
                            <li className="flex items-start gap-1.5 justify-end">
                              <span className="text-slate-200 font-medium">1. اضغط على أيقونة <strong>الثلاث نقاط ⁝</strong> في أعلى يمين المتصفح.</span>
                              <span className="text-indigo-400 font-bold shrink-0">✦</span>
                            </li>
                            <li className="flex items-start gap-1.5 justify-end">
                              <span className="text-slate-200 font-medium">2. ابحث عن خيار <strong>تثبيت التطبيق... (Install application...)</strong> أو <strong>التطبيقات (Apps)</strong>.</span>
                              <span className="text-indigo-400 font-bold shrink-0">✦</span>
                            </li>
                            <li className="flex items-start gap-1.5 justify-end">
                              <span className="text-slate-200 font-medium font-bold">3. أكد التثبيت لصنع أيقونة سريعة فورية على سطح المكتب!</span>
                              <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 p-3 rounded-xl text-[10px] text-slate-400 text-center leading-relaxed">
                        بمجرد تفعيل أي من هذه الخيارات اليدوية بالمتصفح، سيتحول الموقع لبرنامج مستقل بالكامل على حاسوبك، وسيتم تحميل وإضافة التوطينات لجميع ألعابك بسرعة وأمان.
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Modern Action buttons / close layout */}
            </div>

            {/* Links and CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowPwaInstallGuide(false)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-350 hover:text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                حسناً، فهمت
              </button>
              
              {isInIframe ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPwaInstallGuide(false);
                    window.open(window.location.origin, "_blank");
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>فتح التطبيق بصفحة مباشرة للتنزيل ↗</span>
                </a>
              ) : (
                <div className="w-full flex items-center justify-center gap-2 bg-[#12161c] text-indigo-400 border border-indigo-500/10 font-bold py-3 px-4 rounded-xl text-xs">
                  <span>✓ تتصفح بشكل مباشر</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer credits */}
      <footer className="border-t border-slate-900 bg-slate-950/40 py-6 mt-12 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 flex flex-col md:flex-row items-center justify-between">
          <p className="font-sans">© 2026 بوابة تعريب الألعاب العربية - صنع بكل حب لدعم مجتمع اللاعبين العرب</p>
          <div className="flex gap-4">
            <span className="font-sans text-[10px] text-slate-600">قاعدة البيانات: نشطة وتفاعلية</span>
            <span className="font-sans text-[10px] text-slate-600">الداعم التقني: Gemini AI</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
