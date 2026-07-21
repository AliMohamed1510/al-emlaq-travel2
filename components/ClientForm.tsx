'use client';

import { useState } from 'react';
import { useForm } from '@formspree/react';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Globe,
  Briefcase,
  X,
  Loader2
} from 'lucide-react';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  nationality: string;
  passportNumber: string;
  serviceType: string;
  appointmentDate: string;
  notes: string;
}

const serviceTypes = [
  { value: '', label: 'اختر نوع الخدمة' },
  { value: 'visa', label: 'تأشيرة سفر' },
  { value: 'hajj', label: 'حج' },
  { value: 'umrah', label: 'عمرة' },
  { value: 'flight', label: 'حجز طيران' },
  { value: 'hotel', label: 'حجز فندق' },
  { value: 'package', label: 'باقة سياحية' },
  { value: 'other', label: 'أخرى' },
];

export default function ClientForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || '');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    nationality: '',
    passportNumber: '',
    serviceType: '',
    appointmentDate: '',
    notes: '',
  });

  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      newErrors.fullName = 'الاسم الكامل مطلوب (3 أحرف على الأقل)';
    }
    if (!formData.phone.trim() || !/^\+?[0-9\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'رقم الجوال مطلوب ويجب أن يكون صحيحاً';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني مطلوب ويجب أن يكون صحيحاً';
    }
    if (!formData.nationality.trim()) {
      newErrors.nationality = 'الجنسية مطلوبة';
    }
    if (!formData.passportNumber.trim()) {
      newErrors.passportNumber = 'رقم الجواز مطلوب';
    }
    if (!formData.serviceType) {
      newErrors.serviceType = 'نوع الخدمة مطلوب';
    }
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'تاريخ الموعد مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت');
        return;
      }
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        alert('يجب أن يكون الملف صورة أو PDF');
        return;
      }
      setPassportFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPassportPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPassportPreview(null);
      }
    }
  };

  const removeFile = () => {
    setPassportFile(null);
    setPassportPreview(null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    if (passportFile) {
      submitData.append('passport', passportFile);
    }
    submitData.append('_subject', `تسجيل عميل جديد - ${formData.fullName}`);
    submitData.append('_replyto', formData.email);
    await handleSubmit(submitData);
  };

  if (state.succeeded) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center shadow-lg">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-800 mb-3">تم التسجيل بنجاح!</h2>
          <p className="text-emerald-700 mb-2">
            تم إرسال بياناتك بنجاح. سنقوم بالتواصل معك قريباً.
          </p>
          <p className="text-emerald-600 text-sm mb-6">
            سيتم إرسال تذكير على بريدك الإلكتروني قبل موعدك بيومين.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            تسجيل عميل جديد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-gold-50 to-gold-100 border border-gold-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle size={20} className="text-gold-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gold-800">
          <p className="font-semibold mb-1">تذكير مهم:</p>
          <p>سيتم إرسال تذكير تلقائي على بريدك الإلكتروني قبل تاريخ الموعد بيومين. تأكد من صحة بريدك الإلكتروني.</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-l from-primary-600 to-primary-700 px-8 py-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User size={24} />
            نموذج تسجيل بيانات العميل
          </h2>
          <p className="text-primary-100 text-sm mt-1">يرجى ملء جميع البيانات المطلوبة بدقة</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 pb-2 border-b-2 border-primary-100">
              <User size={20} className="text-primary-600" />
              البيانات الشخصية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="أدخل الاسم الكامل"
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                      errors.fullName 
                        ? 'border-red-300 bg-red-50 focus:border-red-400' 
                        : 'border-slate-200 bg-slate-50 focus:border-primary-400 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  رقم الجوال <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="مثال: +20 123 456 7890"
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                      errors.phone 
                        ? 'border-red-300 bg-red-50 focus:border-red-400' 
                        : 'border-slate-200 bg-slate-50 focus:border-primary-400 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  البريد الإلكتروني <span className="text-red-500">*</span>
                  <span className="text-xs text-slate-400 font-normal mr-1">(لإرسال التذكير)</span>
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                      errors.email 
                        ? 'border-red-300 bg-red-50 focus:border-red-400' 
                        : 'border-slate-200 bg-slate-50 focus:border-primary-400 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  الجنسية <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Globe size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="مثال: مصري"
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                      errors.nationality 
                        ? 'border-red-300 bg-red-50 focus:border-red-400' 
                        : 'border-slate-200 bg-slate-50 focus:border-primary-400 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.nationality && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.nationality}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 pb-2 border-b-2 border-primary-100">
              <FileText size={20} className="text-primary-600" />
              بيانات الجواز
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  رقم الجواز <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleChange}
                    placeholder="أدخل رقم الجواز"
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                      errors.passportNumber 
                        ? 'border-red-300 bg-red-50 focus:border-red-400' 
                        : 'border-slate-200 bg-slate-50 focus:border-primary-400 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.passportNumber && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.passportNumber}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700">
                  صورة الجواز <span className="text-slate-400 font-normal">(اختياري - صورة أو PDF)</span>
                </label>

                {!passportFile ? (
                  <div className="relative">
                    <input
                      type="file"
                      name="passport"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="passport-upload"
                    />
                    <label
                      htmlFor="passport-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 group"
                    >
                      <Upload size={28} className="text-slate-400 group-hover:text-primary-500 mb-2 transition-colors" />
                      <span className="text-sm text-slate-500 group-hover:text-primary-600">اضغط لرفع صورة الجواز</span>
                      <span className="text-xs text-slate-400 mt-1">PNG, JPG, PDF (الحد الأقصى 5MB)</span>
                    </label>
                  </div>
                ) : (
                  <div className="relative bg-slate-50 rounded-xl p-4 border-2 border-primary-200">
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute top-2 left-2 p-1 bg-red-100 hover:bg-red-200 rounded-lg text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                    <div className="flex items-center gap-4">
                      {passportPreview ? (
                        <img 
                          src={passportPreview} 
                          alt="Passport preview" 
                          className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-primary-100 rounded-lg flex items-center justify-center">
                          <FileText size={28} className="text-primary-600" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-slate-700 text-sm">{passportFile.name}</p>
                        <p className="text-xs text-slate-500">{(passportFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 pb-2 border-b-2 border-primary-100">
              <Briefcase size={20} className="text-primary-600" />
              الخدمة والموعد
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  نوع الخدمة <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none bg-white ${
                      errors.serviceType 
                        ? 'border-red-300 bg-red-50 focus:border-red-400' 
                        : 'border-slate-200 bg-slate-50 focus:border-primary-400 focus:bg-white'
                    }`}
                  >
                    {serviceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                {errors.serviceType && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.serviceType}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  تاريخ الموعد <span className="text-red-500">*</span>
                  <span className="text-xs text-slate-400 font-normal mr-1">(سيتم التذكير قبله بيومين)</span>
                </label>
                <div className="relative">
                  <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                      errors.appointmentDate 
                        ? 'border-red-300 bg-red-50 focus:border-red-400' 
                        : 'border-slate-200 bg-slate-50 focus:border-primary-400 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.appointmentDate && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.appointmentDate}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">
                ملاحظات إضافية <span className="text-slate-400 font-normal">(اختياري)</span>
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="أي ملاحظات أو تفاصيل إضافية..."
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200 resize-none"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-gradient-to-l from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              {state.submitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  تسجيل البيانات
                </>
              )}
            </button>

            {state.errors && Object.keys(state.errors).length > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}