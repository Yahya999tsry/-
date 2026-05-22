export interface GameTranslation {
  id: string;
  titleEn: string;
  titleAr: string;
  platform: string[];
  genre: string;
  author: string;
  type: 'كامل' | 'قوائم ونصوص' | 'دبلجة فقط' | 'قوائم فقط' | 'دبلجة وقوائم';
  size: string;
  downloads: number;
  rating: number;
  difficulty: 'سهل' | 'متوسط' | 'متقدم';
  isFeatured?: boolean;
  notes?: string;
  guide?: string[];
  files?: Array<{ name: string; content: string }>;
}

export const featuredGames: GameTranslation[] = [
  {
    id: "rdr2",
    titleEn: "Red Dead Redemption 2",
    titleAr: "ريد ديد ريدمبشن 2",
    platform: ["Steam", "Epic Games", "Rockstar"],
    genre: "أكشن / مغامرات / عالم مفتوح",
    author: "شبكة تعريب الألعاب المشتركة",
    type: "كامل",
    size: "145 MB",
    downloads: 48920,
    rating: 4.9,
    difficulty: "متوسط",
    isFeatured: true,
    notes: "تعريب احترافي كامل يشمل الواجهات والترجمات النصية والخطوط العربية المتناسقة مع اللعبة.",
    guide: [
      "قم بتحميل ملف التعريب المباشر من الزر أدناه.",
      "استخرج الملفات إلى مجلد اللعبة الرئيسي (حيث يوجد ملف RDR2.exe).",
      "شغل اللعبة واذهب إلى الإعدادات (Settings) واضبط لغة النصوص على الإسبانية أو الإنجليزية حسب الخيار المختار في معالج التثبيت.",
      "استمتع باللعبة باللغة العربية الفصحى!"
    ],
    files: [
      { name: "Readme_Ar.txt", content: "مرحباً بك في تعريب ريد ديد ريدمبشن 2!\nتم إعداد هذا التعريب بواسطة مجتمع اللاعبين العرب.\nاللغة المعوضة: الإنجليزية.\nالنسخة: v2.5 متوافقة مع آخر تحديث للعبة." },
      { name: "rdr2_ar_patch.asi", content: "[ASI PATCH DATA - ARABIC TRANSLATION INTEGRATION]" },
      { name: "update.rpf.patch/arabic.bin", content: "[BINARY LOCALIZATION STRINGS: EXECUTING INJECTOR]" }
    ]
  },
  {
    id: "witcher3",
    titleEn: "The Witcher 3: Wild Hunt",
    titleAr: "ذا ويتشر 3: الصيد البري",
    platform: ["Steam", "GOG", "Epic Games", "PlayStation"],
    genre: "RPG / تقمص أدوار",
    author: "فريق ساندبوكس للتعريب",
    type: "دبلجة وقوائم",
    size: "310 MB",
    downloads: 32410,
    rating: 4.8,
    difficulty: "سهل",
    isFeatured: true,
    notes: "تعريب رسمي مدعوم من المطور للترجمة النصية، هذا الباتش يضيف دبلجة صوتية عربية بالكامل معدة من قبل المعجبين والممثلين الهواة بجودة عالية جداً.",
    guide: [
      "قم بتحميل حزمة الدبلجة العربية مباشرة.",
      "انسخ المجلد 'DLC' والمجلد 'content' إلى مجلد اللعبة الرئيسي، ووافق على الاستبدال.",
      "من داخل إعدادات اللعبة، قم بتغيير لغة الحوارات إلى 'العربية' ولغة النصوص إلى 'العربية'."
    ],
    files: [
      { name: "Witcher3_Arabic_Voice.ini", content: "[AudioLocalization]\nActiveLanguage=Arabic\nVolumeMultiplier=1.0" },
      { name: "sound_ar.w3speech", content: "[ARABIC DIALOGUE AUDIO STREAM PACK]" }
    ]
  },
  {
    id: "cyberpunk",
    titleEn: "Cyberpunk 2077",
    titleAr: "سايبربانك 2077",
    platform: ["Steam", "GOG", "Epic Games"],
    genre: "RPG / أكشن / عالم مفتوح",
    author: "رابطة الألعاب العربية",
    type: "كامل",
    size: "180 MB",
    downloads: 29850,
    rating: 4.7,
    difficulty: "سهل",
    isFeatured: true,
    notes: "يتضمن هذا التعديل تعريباً شاملاً للخطوط واللوحات الإعلانية داخل اللعبة لتصبح باللغة العربية مع نصوص وحوارات كاملة منقحة.",
    guide: [
      "حمل الباتش المباشر واستخرجه.",
      "انقل ملف البديل (.archive) في المسار التالي: Cyberpunk 2077\\archive\\pc\\mod.",
      "افتح اللعبة واختر اللغة العربية من القائمة الرئيسية."
    ],
    files: [
      { name: "ar_fonts_and_ui.archive", content: "[ARCHIVE COMPRESSED ARABIC TEXTURES AND FONTS]" },
      { name: "install_instructions_ar.txt", content: "طريقة تركيب تعريب سايبربانك 2077:\nانقل الملف الخاص بالـ Archive لمجلد mod وسيقوم تلقائياً باستبدال النصوص والخطوط." }
    ]
  },
  {
    id: "gtav",
    titleEn: "Grand Theft Auto V",
    titleAr: "قراند ثفت أوتو 5",
    platform: ["Steam", "Epic Games", "Rockstar"],
    genre: "أكشن / جريمة / عالم مفتوح",
    author: "فريق الحلم العربي للتعريب",
    type: "قوائم ونصوص",
    size: "85 MB",
    downloads: 65120,
    rating: 4.8,
    difficulty: "متوسط",
    isFeatured: true,
    notes: "ترجمة كاملة لقصة اللعبة بالكامل لطور اللعب الفردي مع ترجمة واجهات الجوال والخيارات وتدعم الخطوط العربية العريضة في الشاشة لتسهيل القراءة.",
    guide: [
      "ثبت أداة OpenIV الشهيرة لتعديل ملفات اللعبة.",
      "افتح البرنامج واذهب إلى وضع التعديل (Edit Mode).",
      "قم بتثبيت حزمة التعريب بنقرة واحدة عبر ملف التثبيت التلقائي .oiv المرفق في هذا الملف المضغوط."
    ],
    files: [
      { name: "gta5_arabic_subtitles.oiv", content: "[OPENIV PACKAGE FILE - INTEGRATING ARABIC SUBTITLES]" },
      { name: "GTAV_Language_Fix.reg", content: "Windows Registry Editor Version 5.00\n\n[HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Rockstar Games\\Grand Theft Auto V]\n\"Language\"=\"ar-SA\"" }
    ]
  },
  {
    id: "eldenring",
    titleEn: "Elden Ring",
    titleAr: "إيلدن رينغ",
    platform: ["Steam", "PlayStation", "Xbox"],
    genre: "RPG / نفوس مظلمة",
    author: "المترجم أبو صالح المطيري",
    type: "قوائم ونصوص",
    size: "12 MB",
    downloads: 34150,
    rating: 4.9,
    difficulty: "متوسط",
    isFeatured: true,
    notes: "تعريب ممتاز لجميع أسماء الأسلحة، التعاويذ، والمعدات بالإضافة إلى حوارات الشخصيات الجانبية والخطوط المهيبة المتناسبة مع طابع اللعبة المظلم.",
    guide: [
      "شغل أداة تركيب المودات Mod Engine 2.",
      "ضع ملفات التعريب داخل مجلد mod التابع للبرنامج.",
      "قم ببدء اللعبة عبر برنامج Mod Engine 2 لتشغيل التعريب بأمان وبدون خطر التعرض لـ BAN في طور الأونلاين."
    ],
    files: [
      { name: "menu.msgbnd.dcx", content: "[DCX CONTAINER - TRANSLATED MENUS]" },
      { name: "item.msgbnd.dcx", content: "[DCX CONTAINER - TRANSLATED GAME ITEMS]" },
      { name: "How_To_Run_Safe.txt", content: "تحذير: لا تشغل التعريب مع اللعب الجماعي الرسمي للأونلاين لمنع الحظر. استخدم دائماً Mod Engine 2 في وضع ديسكونكت." }
    ]
  },
  {
    id: "gofw",
    titleEn: "God of War",
    titleAr: "إله الحرب (قود اوف وار)",
    platform: ["Steam", "Epic Games", "PlayStation"],
    genre: "أكشن / مغامرات",
    author: "ساندبوكس للتعريب والمجهود الشخصي",
    type: "كامل",
    size: "62 MB",
    downloads: 21540,
    rating: 4.9,
    difficulty: "سهل",
    isFeatured: true,
    notes: "الباتش يقوم بتفعيل اللغة العربية في النسخ التي لا تتوفر فيها رسمياً على الكمبيوتر مع تعريب كامل الحوارات الجانبية والقوائم الرئيسية والفرعية.",
    guide: [
      "انسخ مجلد 'exec' المستخرج وضعه في دليل اللعبة الرئيسي.",
      "شغل برنامج الباتش المرفق واضغط على 'تطبيق التعريب'.",
      "ادخل للعبة وستجد الواجهة وقصص كراتوس بالكامل تدعم العربية."
    ],
    files: [
      { name: "exec/patch_ar.bin", content: "[PATCH BINARY DATA FOR GOD OF WAR STEAM]" },
      { name: "GOW_Arabic_Patcher.exe.txt", content: "[PSEUDO CODE: PATCh ENGINE VERIFIED]" }
    ]
  },
  {
    id: "re4r",
    titleEn: "Resident Evil 4 Remake",
    titleAr: "ريزيدنت إيفل 4 ريميك",
    platform: ["Steam", "PlayStation", "Xbox"],
    genre: "رعب / أكشن",
    author: "عالم الألعاب العربي",
    type: "دبلجة وقوائم",
    size: "240 MB",
    downloads: 38200,
    rating: 4.8,
    difficulty: "سهل",
    isFeatured: true,
    notes: "إضافة ملفات الدبلجة الأصلية العربية وتعديل الواجهات لتدعم الفصحى بشكل رائع حتى للنسخ الأوروبية والأمريكية.",
    guide: [
      "ثبت برنامج Fluffy Mod Manager لإدارة مودات اللعبة.",
      "ضع الملف المضغوط للتعريب داخل مجلد ModManager\\Games\\RE4R\\Mods.",
      "افتح برنامج Fluffy Mod Manager، وفعل مود التعريب بالضغط على الزر بجانبه.",
      "شغل اللعبة واستمتع بدبلجة ليون كينيدي الرائعة!"
    ],
    files: [
      { name: "RE4R_Arabic_SubAndVoice.rar", content: "[COMPRESSED FLUFFY MOD CONTAINER]" },
      { name: "modinfo.ini", content: "name=Resident Evil 4 Arabic Full Mod\nversion=1.0\ndescription=Arabic UI and Audio Injector" }
    ]
  },
  {
    id: "skyrim",
    titleEn: "The Elder Scrolls V: Skyrim",
    titleAr: "سكايرم: مخطوطات الشيخ",
    platform: ["Steam", "GOG"],
    genre: "RPG / عالم مفتوح",
    author: "شبكة المترجمين المستقلين برئاسة رائد",
    type: "قوائم ونصوص",
    size: "18 MB",
    downloads: 18940,
    rating: 4.6,
    difficulty: "متقدم",
    isFeatured: true,
    notes: "تعريب أسطوري يشمل ترجمة مئات آلاف الكلمات من الحوارات، الكتب التاريخية في اللعبة، وأسماء الأماكن والمهام الشاسعة.",
    guide: [
      "يتطلب هذا المود تثبيت ملحق SKSE64 (Skyrim Script Extender).",
      "انسخ ملفات التعريب (.esp و .bsa) وضعها داخل مجلد Skyrim Special Edition\\Data.",
      "افتح لانشر اللعبة أو الـ Mod Organizer وفعّل الملف 'SkyrimArabic.esp'.",
      "شغل اللعبة عبر SKSE64 ليستمتع به باللغة العربية مع دعم تام للتوجيه من اليمين إلى اليسار (RTL)."
    ],
    files: [
      { name: "SkyrimArabic.esp", content: "[SKYRIM MASTER PLUGIN - ARABIC INJECTOR]" },
      { name: "SkyrimArabic.bsa", content: "[SKYRIM COMPRESSED ASSETS - FONTS, TEXTURES]" },
      { name: "Interface/FontConfig.txt", content: "fontlib \"Interface/fonts_ar.swf\"\nmap \"$SkyrimFont\" = \"ArabicFont\"" }
    ]
  },
  {
    id: "batman_asylum",
    titleEn: "Batman: Arkham Asylum",
    titleAr: "باتمان: أركام آسايلوم (أصول المصحة)",
    platform: ["Steam", "Epic Games", "GOG"],
    genre: "أكشن / مغامرات / غموض",
    author: "رابطة الألعاب العربية وفريق الحلم العربي",
    type: "كامل",
    size: "45 MB",
    downloads: 18200,
    rating: 4.8,
    difficulty: "سهل",
    isFeatured: true,
    notes: "تعريب كامل ومصقول بدقة عالية للعبة الأسطورية Batman: Arkham Asylum تشمل الترجمة القوائم والنصوص والملفات الصوتية والملفات التوجيهية بالكامل.",
    guide: [
      "قم بفك ضغط ملف التعريب المستخرج.",
      "انسخ المجلد 'BmGame' والصقه في مسار تثبيت رئيسي للعبة Batman Arkham Asylum\\BmGame والتحقق من الموافقة على الاستبدال.",
      "شغل اللعبة من Launcher واضغط على خيار تشغيل لتفعيل الترجمة تلقائياً."
    ],
    files: [
      { name: "BmGame/Localization/INT/GFxUI.int", content: "[GFX ARABIC TRANSLATION MAPS AND BUTTONS]" },
      { name: "BmGame/Localization/INT/Subtitles.int", content: "[FULL DIALOGUE SUBTITLES TRANSLATION KEYWORDS]" }
    ]
  },
  {
    id: "batman_city",
    titleEn: "Batman: Arkham City",
    titleAr: "باتمان: أركام سيتي (مدينة أركام)",
    platform: ["Steam", "Epic Games", "GOG"],
    genre: "أكشن / مغامرات / عالم مفتوح",
    author: "شبكة تعريب الألعاب المشتركة",
    type: "قوائم ونصوص",
    size: "68 MB",
    downloads: 24500,
    rating: 4.9,
    difficulty: "سهل",
    isFeatured: true,
    notes: "تعريب أركام سيتي الحائزة على جوائز. يتضمن هذا التعريب ترجمة كافة المهمات الرئيسية والفرعية وتفاصيل حلول الألغاز لريدلر باللغة العربية الفصحى مع تنسيق رائع للخطوط.",
    guide: [
      "تأكد من إغلاق اللعبة تماماً.",
      "انقل ملفات التعريب المستحدثة داخل مجلد 'BmGame' المستخرج إلى مسار اللعبة الرئيسي.",
      "افتح اللعبة وستجد الترجمة محملة مباشرة."
    ],
    files: [
      { name: "BmGame/Localization/INT/Coop.int", content: "[COOP AND MULTIPLAYER STRINGS]" },
      { name: "BmGame/Localization/INT/StorySubtitles.int", content: "[FULL CAMPAIGN DIALOGUE ARABIC STRINGS]" }
    ]
  },
  {
    id: "batman_origins",
    titleEn: "Batman: Arkham Origins",
    titleAr: "باتمان: أركام أوريجنز (أصول أركام)",
    platform: ["Steam", "Xbox", "PlayStation"],
    genre: "أكشن / مغامرات / قتال",
    author: "فريق ساندبوكس للتعريب",
    type: "قوائم ونصوص",
    size: "95 MB",
    downloads: 14700,
    rating: 4.7,
    difficulty: "متوسط",
    isFeatured: true,
    notes: "تعريب كامل لحوارات وقصة اللعبة الحماسية Arkham Origins في ليلة عيد الميلاد المجيد. الترجمة تشمل جميع قوائم التهيئة والمهمات وخفايا القصة.",
    guide: [
      "قم بتحميل الملف المضغوط وفك الضغط عنه.",
      "انسخ الملفات الناتجة وضعتها في المسار: Batman Arkham Origins\\SinglePlayer\\BMGame\\Localization\\INT.",
      "وافق على استبدال جميع الملفات الأصلية ثم ابدأ اللعبة بنجاح."
    ],
    files: [
      { name: "SinglePlayer/BMGame/Localization/INT/PC.int", content: "[ARABIC PC SYSTEM AND GRAPHICS INTERFACE STRINGS]" },
      { name: "SinglePlayer/BMGame/Localization/INT/GameLanguage.int", content: "[STORY MODE MISSION DESCRIPTIONS IN ARABIC]" }
    ]
  },
  {
    id: "batman_knight",
    titleEn: "Batman: Arkham Knight",
    titleAr: "باتمان: أركام نايت (فارس أركام)",
    platform: ["Steam", "Epic Games", "PlayStation"],
    genre: "أكشن / مغامرات / قيادة سيارات / عالم مفتوح",
    author: "رابطة الألعاب العربية",
    type: "كامل",
    size: "128 MB",
    downloads: 32900,
    rating: 4.9,
    difficulty: "متوسط",
    isFeatured: true,
    notes: "التعريب الأضخم والنهائي للجزء الأخير من سلسلة أركام. يشمل تعريب قوائم اللعب وتحليل حاسوب باتمان المتطور والترجمة الكاملة لجميع نهايات اللعبة وحوارات شخصيات مدينة غوثام.",
    guide: [
      "حمل حزمة باتش أركام نايت.",
      "استخرج الملفات وانسخ مجلد 'BMGame' إلى المسار الرئيسي للعبة: (Batman Arkham Knight\\BMGame).",
      "شغل اللعبة وفي حال واجهت مشكلة في الترميز تأكد من تشغيل حزمة الدعم العربي المرفقة بضغطة زر."
    ],
    files: [
      { name: "BMGame/Localization/INT/Subtitles.int", content: "[ARKHAM KNIGHT FINAL SUBTITLES IN ARABIC]" },
      { name: "BMGame/Localization/INT/UI_Menu.int", content: "[BATCOMPUTER INTERFACE COMPLETE ARABIZATION SYSTEM]" }
    ]
  },
  {
    id: "ghost_of_tsushima",
    titleEn: "Ghost of Tsushima Director's Cut",
    titleAr: "شبح تسوشيما (إصدار المخرج)",
    platform: ["Steam", "Epic Games", "PlayStation"],
    genre: "أكشن / ساموراي / عالم مفتوح",
    author: "بوابة العرب وفريق ساندبوكس للتعريب",
    type: "كامل",
    size: "82 MB",
    downloads: 41250,
    rating: 4.9,
    difficulty: "سهل",
    isFeatured: true,
    notes: "تعريب احترافي مميز للتحفة الفنية شبح تسوشيما. يشمل تعريب كامل القوائم، وتراجم حوارات جين ساكاي والساموراي، مع دمج لغة الإشارة والرسائل اليابانية القديمة بشكل متناسق جداً.",
    guide: [
      "قم بتحميل باقة التعريب المخصصة لنسخة الـ PC.",
      "استخرج الملفات المضغوطة وانقل مجلد 'cache' لداخل مجلد اللعبة الرئيسي.",
      "شغل اللعبة وافتح الإعدادات (Settings) -> خيارات الصوت واللغة (Audio & Language) واضبط لغة الواجهة والترجمة للعربية."
    ],
    files: [
      { name: "cache/ar_lang_pack.psarc", content: "[PSARC CONTAINER - HIGH QUALITY ARABIC TRANSLATION MAPS]" },
      { name: "interface_bidi.cfg", content: "direction=rtl\nfont_family=Arabic_Samurai_Regular" }
    ]
  },
  {
    id: "tlou_part1",
    titleEn: "The Last of Us Part I",
    titleAr: "آخرنا: الجزء الأول (ذا لاست أوف أس)",
    platform: ["Steam", "Epic Games", "PlayStation"],
    genre: "رعب / أكشن / دراما شخصية",
    author: "فريق المترجمين العرب المحترفين",
    type: "دبلجة وقوائم",
    size: "192 MB",
    downloads: 36780,
    rating: 4.9,
    difficulty: "سهل",
    isFeatured: true,
    notes: "تعريب رسمي غني يشمل الدبلجة الصوتية العربية الأصلية بنقاوة ستوديو كاملة مع واجهات ونصوص مترجمة، هذا البومة يحل مشكلة الرقع والنسخ غير المعربة.",
    guide: [
      "قم بفك ضغط ملف التعريب المستقر.",
      "انقل كافة مجلدات 'build' و 'speech' لموقع اللعبة الرئيسي.",
      "ادخل للعبة وفعل لغة الحوار السمعي ونصوص الترجمة للعربية من نافذة الصوت واللغة بالداخل."
    ],
    files: [
      { name: "speech/sound_ar_tlou.bank", content: "[AUDIO SOUND BANK FOR JOCELYN AND ELEANOR DUBLAGE]" },
      { name: "build/pc/main/ar_text_table.bin", content: "[BINARY STRING ENTRIES: THE LAST OF US ARABIC TABLE]" }
    ]
  },
  {
    id: "ac_mirage",
    titleEn: "Assassin's Creed Mirage",
    titleAr: "أساسنز كريد سراب (ميراج)",
    platform: ["Ubisoft Connect", "Epic Games"],
    genre: "أكشن / تخفي / تاريخ غني",
    author: "شركة يوبي سوفت والترجمة التعاونية",
    type: "دبلجة وقوائم",
    size: "115 MB",
    downloads: 28910,
    rating: 4.8,
    difficulty: "سهل",
    isFeatured: true,
    notes: "التعريب الرسمي بالدبلجة الفصحى الرائعة للبطل باسم بن إسحاق في بغداد العباسية. مخصص للنسخ التي سقط منها الدعم العربي في بعض المتاجر العالمية بغير قصد.",
    guide: [
      "نزل الباتش الحصري وفك الضغط سريعا.",
      "انقل مجلد 'sounddata' إلى المسار الرئيسي للعبة: (Assassin's Creed Mirage\\sounddata).",
      "شغل اللعبة من يوبيسوفت وفعل الفصحى حواراً وقوائماً."
    ],
    files: [
      { name: "sounddata/pc/ar_voice_mirage.pck", content: "[PC HIGH QUALITY COMPRESSED AUDIO PACK - BASIM AL-HUSSEIN VOICE]" },
      { name: "Localization/ar-EG.lang", content: "[LANG DATABASE STRINGS KEYWORDS AND BI-DIRECTIONAL UI]" }
    ]
  },
  {
    id: "detroit_human",
    titleEn: "Detroit: Become Human",
    titleAr: "ديترويت: نحو الإنسانية",
    platform: ["Steam", "Epic Games"],
    genre: "دراما تفاعلية / خيال علمي",
    author: "رابطة الألعاب العربية",
    type: "كامل",
    size: "148 MB",
    downloads: 31400,
    rating: 4.8,
    difficulty: "متوسط",
    isFeatured: true,
    notes: "نسخة معربة ومحقونة بذكاء تشمل ترجمة الخيارات الفورية والقرارات المصيرية الثلاثة لكل من كونر، كارا، وماركوس لتسهيل فهم الحبكة الدرامية المعقدة.",
    guide: [
      "تأكد من تنزيل حزمة التعريب.",
      "استخرج الملفات المستندة (.bin و .dat) وضعها مباشرة في مجلد 'DetroitBecomeHuman\\Localization'.",
      "افتح اللعبة، وستعمل اللعبة بنصوص عربية وحوارات مهيئة فورا."
    ],
    files: [
      { name: "Localization/ar_dialogue_table.bin", content: "[BINARY DATA FOR COMPACT DETROIT DIALOGUES]" },
      { name: "Localization/arabic_fonts.dat", content: "[CONTAINS THE BEAUTIFUL ARABIC SANS-SERIF FONT USED ON DECISIONS UI]" }
    ]
  },
  {
    id: "re_village",
    titleEn: "Resident Evil Village",
    titleAr: "ريزيدنت إيفل فيلج (القرية)",
    platform: ["Steam", "PlayStation"],
    genre: "رعب / نجاة / منظور الشخص الأول",
    author: "عالم الألعاب العربي ورائد التوطين",
    type: "كامل",
    size: "165 MB",
    downloads: 27800,
    rating: 4.9,
    difficulty: "سهل",
    isFeatured: true,
    notes: "التوطين الأروع للجزء المكمل لقصة إيثان وينترز والأم ليدي ديميتريسكو. يشمل كامل ترجمة الحوارات وقراءة المستندات الطبية والصور السرية في القصر.",
    guide: [
      "شغل مود مانجر Fluffy Mod Manager واستخرج التعريب بداخله.",
      "فعل مود 'Resident Evil Village Arabic UI and Docs' بنقرة زر.",
      "شغل اللعبة من المود مانجر مباشرة."
    ],
    files: [
      { name: "sound/caption_ar.pak", content: "[PAK COMPRESSED CAPTIONS FOR IN-GAME SOUNDS]" },
      { name: "mods/RE8_Village_Arabic.zip", content: "[FLUFFY PACKAGE CONTAINING REAL TIME DIRECT ARABIC INJECTION]" }
    ]
  }
];

// Master lists for procedural generator to reach over 900+ items
const GAME_PLATFORMS = ["Steam", "Epic Games", "GOG", "Ubisoft Connect", "EA App", "Battle.net"];
const GENRES = [
  "أكشن / مغامرات",
  "RPG / تقمص أدوار",
  "منصات / ثنائية الأبعاد",
  "إطلاق نار / سرعة",
  "غموض / رعب وفزع",
  "استراتيجية / بناء ومحاكاة",
  "ألعاب مستقلة / Indie",
  "رياضة / سباق سيارات"
];
const CREATORS = [
  "شبكة تعريب الألعاب المشتركة",
  "فريق الحلم العربي للتعريب",
  "فريق ساندبوكس للتعريب",
  "رابطة الألعاب العربية",
  "بوابة العرب للألعاب والترجمة",
  "عرب المودز والشرق الأوسط",
  "أركيد ترانسليشنز",
  "فريق دبلجة هواة الألعاب",
  "المستقل أبو صالح",
  "المعرب أحمد الغامدي",
  "محبو الترجمة الجماعية",
  "نادي المترجمين المحترفين"
];

const TYPES: ('كامل' | 'قوائم ونصوص' | 'دبلجة فقط' | 'قوائم فقط' | 'دبلجة وقوائم')[] = [
  "قوائم ونصوص",
  "كامل",
  "قوائم فقط",
  "دبلجة وقوائم",
  "قوائم ونصوص"
];

// Helper program for popular games to put in the database (totaling ~920 games)
const POPULAR_GAME_NAMES_TEMPLATES = [
  { en: "Assassin's Creed", ar: "أساسنز كريد" },
  { en: "Borderlands", ar: "بوردرلاندز" },
  { en: "Battlefield", ar: "باتلفيلد" },
  { en: "Call of Duty", ar: "كول أوف دوتي" },
  { en: "Dark Souls", ar: "دارك سولز" },
  { en: "Devil May Cry", ar: "ديفل ماي كراي" },
  { en: "Dragon Age", ar: "دراغون إيج" },
  { en: "Doom", ar: "دوم" },
  { en: "Dying Light", ar: "داينغ لايت" },
  { en: "Far Cry", ar: "فار كراي" },
  { en: "Fallout", ar: "فول أوت" },
  { en: "Final Fantasy", ar: "فاينل فانتسي" },
  { en: "Hitman", ar: "هيتمان" },
  { en: "Halo", ar: "هيلو" },
  { en: "Just Cause", ar: "جست كوز" },
  { en: "Life is Strange", ar: "لايف إز سترينج" },
  { en: "Mass Effect", ar: "ماس إفكت" },
  { en: "Metro", ar: "ميترو" },
  { en: "Monster Hunter", ar: "مونستر هانتر" },
  { en: "Need for Speed", ar: "نيد فور سبيد" },
  { en: "Portal", ar: "بورتال" },
  { en: "Red Faction", ar: "ريد فاكشن" },
  { en: "Saints Row", ar: "سينتس رو" },
  { en: "Sid Meier's Civilization", ar: "سيفيليزيشن" },
  { en: "Sniper Elite", ar: "سنايبر إيليت" },
  { en: "Star Wars", ar: "حرب النجوم" },
  { en: "The Sims", ar: "ذا سيمز" },
  { en: "Tomb Raider", ar: "تومب رايدر" },
  { en: "Total War", ar: "توتال وار" },
  { en: "Watch Dogs", ar: "واتش دوغز" },
  { en: "Wolfenstein", ar: "ولفينشتاين" },
  { en: "XCOM", ar: "إكس كوم" },
  { en: "Yakuza", ar: "ياكوزا" },
  { en: "Dead Space", ar: "ديد سبيس" },
  { en: "Crysis", ar: "كرايسس" },
  { en: "BioShock", ar: "بايوشوك" },
  { en: "Borderlands", ar: "بوردرلاندز" },
  { en: "Alan Wake", ar: "آلان ويك" },
  { en: "Control", ar: "كونترول" },
  { en: "Dishonored", ar: "ديس أونرد" },
  { en: "Starfield", ar: "ستارفيلد" },
  { en: "Deathloop", ar: "دث لوب" },
  { en: "Sekiro: Shadows Die Twice", ar: "سيكيرو: الظلال تموت مرتين" },
  { en: "Hollow Knight", ar: "هولو نايت" },
  { en: "Hades", ar: "هاديس" },
  { en: "Ori and the Blind Forest", ar: "أوري والغابة العمياء" },
  { en: "Dead Cells", ar: "ديد سيلز" },
  { en: "Celeste", ar: "سيليست" },
  { en: "Subnautica", ar: "سبنوتيكا" },
  { en: "Stardew Valley", ar: "ستاردو فالي" },
  { en: "Terraria", ar: "تيراريا" },
  { en: "Cities: Skylines", ar: "سيتيز: سكاي لاينز" },
  { en: "Euro Truck Simulator", ar: "يورو تراك سيموليتر" },
  { en: "RimWorld", ar: "ريم وورلد" },
  { en: "Frostpunk", ar: "فروسبونك" },
  { en: "Phasmophobia", ar: "فازموفوبيا" },
  { en: "Cuphead", ar: "كاب هيد" },
  { en: "Rust", ar: "رست" },
  { en: "The Forest", ar: "ذا فورست" },
  { en: "Sea of Thieves", ar: "بحر اللصوص" },
  { en: "Valheim", ar: "فالهايم" },
  { en: "Slay the Spire", ar: "سلاي ذا سباير" },
  { en: "Outer Wilds", ar: "أوتر وايلدز" },
  { en: "Disco Elysium", ar: "ديسكو إليسيوم" },
  { en: "Detroit: Become Human", ar: "ديترويت: نحو الإنسانية" },
  { en: "Heavy Rain", ar: "هيفي رين" }
];

// Generate exactly 1850 items procedurally to guarantee high density and true search experience
export function generateFullCatalog(): GameTranslation[] {
  const catalog: GameTranslation[] = [...featuredGames];
  
  // Use a pseudo-random seed generator so that the results are stable
  const seedRandom = (s: number) => {
    return () => {
      s = Math.sin(s) * 10000;
      return s - Math.floor(s);
    };
  };

  const rand = seedRandom(12345);
  const existingTitles = new Set(catalog.map(g => g.titleEn.toLowerCase()));

  let indexId = 1;
  const targetCount = 1850;

  while (catalog.length < targetCount) {
    const template = POPULAR_GAME_NAMES_TEMPLATES[Math.floor(rand() * POPULAR_GAME_NAMES_TEMPLATES.length)];
    const suffixNum = Math.floor(rand() * 5) + 1;
    const year = 2012 + Math.floor(rand() * 14); // 2012 to 2026
    
    // Choose dynamic variations to look real
    const suffixEn = suffixNum === 1 ? "" : ` ${suffixNum}`;
    const suffixAr = suffixNum === 1 ? "" : ` ${suffixNum === 2 ? '2' : suffixNum === 3 ? '3' : suffixNum === 4 ? '4' : '5'}`;
    
    // Add subtitle variants
    const subEn = rand() > 0.6 ? ` - Remastered` : rand() > 0.8 ? ` (Edition ${year})` : "";
    const subAr = rand() > 0.6 ? ` - نسخة محسنة` : rand() > 0.8 ? ` (إصدار ${year})` : "";

    const titleEn = `${template.en}${suffixEn}${subEn}`;
    const titleAr = `${template.ar}${suffixAr}${subAr}`;

    if (existingTitles.has(titleEn.toLowerCase())) {
      continue;
    }
    existingTitles.add(titleEn.toLowerCase());

    const platformsCount = Math.floor(rand() * 3) + 1;
    const selectedPlatforms: string[] = [];
    for (let p = 0; p < platformsCount; p++) {
      const plat = GAME_PLATFORMS[Math.floor(rand() * GAME_PLATFORMS.length)];
      if (!selectedPlatforms.includes(plat)) {
        selectedPlatforms.push(plat);
      }
    }

    const type = TYPES[Math.floor(rand() * TYPES.length)];
    const sizeMb = Math.floor(rand() * 120) + 1;
    const size = sizeMb < 10 ? `${(rand() * 9 + 1).toFixed(1)} MB` : sizeMb > 80 ? `${(sizeMb / 10).toFixed(0)} KB` : `${sizeMb} MB`;
    const rating = parseFloat((4.0 + rand() * 1.0).toFixed(1));
    const downloads = Math.floor(rand() * 18000) + 100;
    const difficultyVal = rand() > 0.8 ? "متقدم" : rand() > 0.4 ? "متوسط" : "سهل";

    catalog.push({
      id: `gen_game_${indexId++}`,
      titleEn,
      titleAr,
      platform: selectedPlatforms,
      genre: GENRES[Math.floor(rand() * GENRES.length)],
      author: CREATORS[Math.floor(rand() * CREATORS.length)],
      type,
      size,
      downloads,
      rating,
      difficulty: difficultyVal as 'سهل' | 'متوسط' | 'متقدم',
      isFeatured: false,
      notes: `باتش تعريب متوافق تماماً مع نسخة اللعبة على ${selectedPlatforms[0]}، تم اختباره بدقة وخالٍ من الأخطاء البرمجية.`,
      guide: [
        `تحميل الملف الخاص بتعريب اللعبة مباشرة بالنقر على زر التحميل.`,
        `فك الضغط عن حزمة التعريب للوصول لملفات patch_ar.`,
        `انقل الملفات الناتجة لمسار تثبيت اللعبة الرئيسي لتعويض النصوص الإنجليزية.`,
        `شغل اللعبة واستمتع بتجربتها الكاملة باللغة العربية.`
      ],
      files: [
        { name: "Arabic_Installation_Guide.txt", content: `شرح تركيب تعريب ${titleAr}\n------------------------------\n1. فك ضغط المجلد\n2. انسخ المحتويات داخل مجلد اللعبة الرئيسي\n3. تم التعريب بواسطة: ${CREATORS[Math.floor(rand() * CREATORS.length)]}` },
        { name: "config_localization_ar.ini", content: `[Language]\nLang=ar\nEnableBidi=1\nFontScale=1.1` }
      ]
    });
  }

  return catalog;
}
