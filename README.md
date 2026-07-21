# 🌍 Al EmlaQ Travel - Client Registration System

نظام تسجيل بيانات عملاء شركة Al EmlaQ Travel مع إمكانية رفع صورة الجواز وإرسال تذكيرات تلقائية.

## ✨ المميزات

- ✅ نموذج تسجيل بيانات العملاء بالكامل
- 📤 رفع صورة الجواز (صور أو PDF)
- 📧 إرسال بيانات العملاء عبر Formspree
- 🔔 نظام تذكيرات تلقائية قبل الموعد بيومين
- 📱 تصميم متجاوب (Responsive) يعمل على جميع الأجهزة
- 🎨 واجهة مستخدم عصرية وجميلة
- 🔒 التحقق من صحة البيانات (Validation)

## 🚀 التشغيل المحلي

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/al-emlaq-travel.git
cd al-emlaq-travel

# 2. Install dependencies
npm install

# 3. Create .env.local file
cp .env.local.example .env.local
# Edit .env.local and add your Formspree form ID

# 4. Run development server
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## 📋 خطوات الإعداد على Formspree

1. سجل حساب على [Formspree](https://formspree.io)
2. أنشئ نموذج جديد (New Form)
3. اضبط بريدك الإلكتروني كمستلم
4. انسخ الـ Form ID (8 أحرف)
5. أضفه في ملف `.env.local`:
   ```
   NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id_here
   ```

## 📤 رفع صورة الجواز

Formspree يدعم رفع الملفات مباشرة! عند إرسال النموذج:
- يتم إرسال جميع البيانات النصية
- يتم رفع صورة الجواز تلقائياً
- تصلك جميع البيانات + رابط الملف على بريدك

## 🔔 نظام التذكيرات (Email Reminders)

### الطريقة 1: Zapier (مجاني)
1. ربط Formspree بـ [Zapier](https://zapier.com)
2. إنشاء Zap: Formspree → Delay → Email
3. Delay = تاريخ الموعد - 2 أيام
4. إرسال إيميل تذكير للعميل

### الطريقة 2: Make (Integromat)
1. ربط Formspree بـ [Make](https://make.com)
2. جدولة إرسال الإيميل قبل الموعد بيومين

### الطريقة 3: Google Apps Script (مجاني بالكامل)
1. ربط Formspree بـ Google Sheets
2. كتابة Google Apps Script لإرسال الإيميلات التلقائية
3. يعمل 24/7 مجاناً

## 🚀 النشر على Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

أو اضغط على زر Deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📁 هيكل المشروع

```
al-emlaq-travel/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ClientForm.tsx
│   └── StatsCards.tsx
├── public/
├── .env.local.example
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

## 🛠️ التقنيات المستخدمة

- [Next.js 14](https://nextjs.org/) - إطار العمل
- [React](https://react.dev/) - مكتبة UI
- [Tailwind CSS](https://tailwindcss.com/) - التصميم
- [Formspree](https://formspree.io/) - إرسال النماذج
- [Lucide React](https://lucide.dev/) - الأيقونات

## 📄 الترخيص

MIT License - حر الاستخدام.

---

**تم التطوير لـ Al EmlaQ Travel © 2026**
