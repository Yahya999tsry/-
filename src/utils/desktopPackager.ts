import JSZip from 'jszip';

export const downloadPackagingKit = async (appUrl: string, onStart?: () => void, onComplete?: () => void) => {
  if (onStart) onStart();

  try {
    const zip = new JSZip();

    // 1. package.json for Electron
    const packageJson = {
      name: "muarrib-al-alab",
      version: "1.0.0",
      description: "بوابة مُعرب الألعاب - تطبيق سطح المكتب للكمبيوتر",
      main: "main.js",
      author: "Arab Games Association",
      scripts: {
        "start": "electron .",
        "dist": "electron-builder --win"
      },
      dependencies: {
        "electron-squirrel-startup": "^1.0.1"
      },
      devDependencies: {
        "electron": "^28.2.0",
        "electron-builder": "^24.9.1"
      },
      build: {
        appId: "com.muarrib.app",
        productName: "MuarribAlAlab",
        directories: {
          output: "dist_desktop"
        },
        win: {
          target: "nsis",
          icon: "icon.ico"
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: "مُعرب الألعاب"
        }
      }
    };

    zip.file("package.json", JSON.stringify(packageJson, null, 2));

    // 2. main.js (Electron entry point)
    const mainJs = `const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "مُعرب الألعاب - بوابة توطين الألعاب",
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // Load the production app or external host directly
  win.loadURL('${appUrl || 'https://ais-pre-irsk2ydwf3dn7ysyh6edkc-822033966667.europe-west2.run.app'}');

  // Hide the default electron menus for a sleek modern app look
  Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});`;

    zip.file("main.js", mainJs);

    // 3. build_windows.bat (The single double-click script of packaging into exe)
    const buildBat = `@echo off
chcp 65001 > nul
title معالج تغليف تطبيق مُعرب الألعاب إلى EXE
echo =======================================================
echo          معالج بناء تطبيق مُعرب الألعاب للكمبيوتر       
echo =======================================================
echo.
echo [1/4] جاري التحقق من وجود Node.js في نظام التشغيل...
node -v >raw-node-v.txt 2>&1
if %errorlevel% neq 0 (
    echo.
    echo =======================================================
    echo           ⚠️  تنبيه هام جداً: برنامج Node.js غير مثبت!  
    echo =======================================================
    echo.
    echo لتشغيل عملية التجميع التلقائي وبناء ملف الـ EXE، يجب أولاً تثبيت
    echo برنامج بيئة العمل Node.js المجاني على جهاز الكمبيوتر الخاص بك.
    echo.
    echo [سيقوم المعالج الآن بفتح موقع التحميل الرسمي لك تلقائياً]
    echo.
    echo بعد فتح المتصفح وتنزيل وتثبيت Node.js، يرجى إعادة تشغيل هذا الملف مجدداً!
    echo =======================================================
    echo.
    start https://nodejs.org/
    if exist raw-node-v.txt del raw-node-v.txt
    pause
    exit
)
if exist raw-node-v.txt del raw-node-v.txt

echo [2/4] جاري تثبيت حزم وباني تطبيقات الـ Electron...
echo قد تستغرق هذه العملية دقيقة أو اثنتين اعتماداً على سرعة الإنترنت لديك. يرجى الانتظار...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [خطأ] فشل تثبيت الحزم المطلوبة عبر npm! تأكد من اتصالك بالإنترنت والتشغيل كمسؤول.
    pause
    exit
)

echo.
echo [3/4] جاري حزم وتجميع التطبيق كملف تنفيذي EXE مستقل ومثبّت متكامل...
call npm run dist
if %errorlevel% neq 0 (
    echo.
    echo [خطأ] فشلت عملية البناء والضغط الإلكتروني! يرجى مراجعة رسائل الخطأ أعلاه.
    pause
    exit
)

echo.
echo =======================================================
echo   تمت عملية بناء تطبيق مُعرب الألعاب للكمبيوتر بنجاح!   
echo   المخرجات متواجدة داخل المجلد الجديد: [dist_desktop]   
echo =======================================================
echo.
echo ستجد ملف التثبيت باسم: MuarribAlAlab-Setup-1.0.0.exe
echo في مجلد [dist_desktop]. قم بتشغيله لتنصيبه مباشرة على حاسوبك.
echo.
pause`;

    zip.file("build_windows.bat", buildBat);

    // 4. README_WINDOWS_EXE.txt
    const readmeText = `===================================================================
                مرحباً بك في معالج بناء وتغليف تطبيق "مُعرب الألعاب" للكمبيوتر (EXE)
===================================================================

يحتوي هذا الأرشيف على كافة الملفات الهيكلية المتكاملة لبناء وتصدير ملف تنفيذي (.EXE) 
بصيغة مستقلة يعمل على نظام التشغيل Windows مباشرة وبدون الحاجة لفتح المتصفح.

-------------------------------------------------------------------
خطوات البناء والتشغيل بنقرة زر واحدة (Windows):
-------------------------------------------------------------------
1. تأكد من تثبيت بيئة العمل Node.js على جهازك الشخصي من الرابط: https://nodejs.org
2. قم بفك الضغط عن هذا المجلد على جهازك.
3. انقر نقراً مزدوجاً على الملف التنفيذي المساعد: [build_windows.bat]
4. سيقوم السكربت تلقائياً بتهيئة الحزم وتصدير التطبيق.
5. بمجرد الانتهاء، ستجد ملف التنصيب النهائي:
   MuarribAlAlab-Setup-1.0.0.exe متواجد داخل المجلد المنشأ حديثاً [dist_desktop].

-------------------------------------------------------------------
معلومات الهيكلية التقنية المضمنة:
- محرك الواجهات: Electron Framework
- المصدر المحقون: النسخة الرسمية الحية لبوابة تعريب الألعاب
- دعم البناء ونظام التنصيب: Electron-Builder (صانع حزم NSIS)
- التوافقية: ويندوز 10 / 11 (64 بت)`;

    zip.file("README_WINDOWS_EXE.txt", readmeText);

    // Save the Zip file
    const content = await zip.generateAsync({ type: "blob" });
    const url = window.URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Muarrib_AlAlab_Desktop_Wrapper_Kit.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (e) {
    console.error(e);
  } finally {
    if (onComplete) onComplete();
  }
};
