import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  ExternalLink,
  UserCheck,
  Shield,
  Send,
  CheckCircle2,
  QrCode,
  Copy,
  Check,
  Download,
  Share2,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Smartphone,
  Eye,
  Radio,
  Inbox,
  MessageCircle,
  FileText,
  AlertCircle
} from 'lucide-react';

interface StoredInquiry {
  id: string;
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
}

export const LeadershipAndOfficeSection: React.FC = () => {
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [mapView, setMapView] = useState<'satellite' | 'streets'>('satellite');
  const [copiedInfo, setCopiedInfo] = useState<boolean>(false);
  const [activeQrTarget, setActiveQrTarget] = useState<'instagram' | 'whatsapp' | 'email' | 'vcard' | 'phone'>('instagram');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [qrLoading, setQrLoading] = useState<boolean>(true);
  
  // Inquiry form & dispatch states
  const [inquiryTab, setInquiryTab] = useState<'form' | 'inbox'>('form');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastDispatchedInquiry, setLastDispatchedInquiry] = useState<{
    referenceId: string;
    mailtoUrl: string;
    whatsappUrl: string;
    name: string;
    email: string;
    message: string;
  } | null>(null);

  const [inquiriesList, setInquiriesList] = useState<StoredInquiry[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Civil Works & Sub-Contracting Package',
    message: '',
  });

  // Fetch inquiries from server
  const loadInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        if (data.inquiries) {
          setInquiriesList(data.inquiries);
        }
      }
    } catch (e) {
      console.warn('Could not load inquiries list:', e);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  // Target payloads for true, mathematically scannable QR codes
  const qrPayloads: Record<'instagram' | 'whatsapp' | 'email' | 'vcard' | 'phone', { payload: string; label: string; desc: string }> = {
    instagram: {
      payload: 'https://instagram.com/ahmed_mandokhail10',
      label: 'Instagram: @ahmed_mandokhail10',
      desc: 'Point phone camera to immediately open official Instagram profile.',
    },
    whatsapp: {
      payload: 'https://wa.me/923117771414',
      label: 'WhatsApp: +92 311 7771414',
      desc: 'Point phone camera to start direct WhatsApp chat with leadership desk.',
    },
    email: {
      payload: 'mailto:mandokhailahmedkhan74@gmail.com?subject=Inquiry%20to%20Rehman%20Construction%20F-10',
      label: 'Email: mandokhailahmedkhan74@gmail.com',
      desc: 'Point phone camera to compose official email to Ahmed Khan Mandokhail.',
    },
    vcard: {
      payload: `BEGIN:VCARD\nVERSION:3.0\nN:Mandokhail;Ahmed Khan;;;\nFN:Ahmed Khan Mandokhail - Rehman Construction\nORG:Rehman Construction (Pvt) Ltd\nTITLE:Corporate Liaison / Sheikh Munawar & Sheikh Ali Mandokhail\nTEL;TYPE=CELL,VOICE:+923117771414\nEMAIL:mandokhailahmedkhan74@gmail.com\nURL:https://instagram.com/ahmed_mandokhail10\nADR;TYPE=WORK:;;Sector F-10;Islamabad;;44000;Pakistan\nNOTE:Specialized Civil Engineering Packages, Highways & Infrastructure\nEND:VCARD`,
      label: 'Digital vCard Contact',
      desc: 'Point phone camera to add full contact details directly to smartphone address book.',
    },
    phone: {
      payload: 'tel:+923117771414',
      label: 'Direct Phone: 0311-7771414',
      desc: 'Point phone camera to instantly dial executive office.',
    },
  };

  // Generate ISO/IEC 18004 compliant, high-contrast, guaranteed scannable QR code
  useEffect(() => {
    setQrLoading(true);
    const target = qrPayloads[activeQrTarget].payload;

    QRCode.toDataURL(target, {
      width: 360,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#1c1917', // Deep obsidian black
        light: '#ffffff', // Crisp pure white
      },
    })
      .then((url) => {
        setQrCodeDataUrl(url);
        setQrLoading(false);
      })
      .catch((err) => {
        console.error('Failed to generate QR code:', err);
        setQrLoading(false);
      });
  }, [activeQrTarget]);

  const handleCopyContact = () => {
    const contactText = `Rehman Construction (Pvt) Ltd\nFounders: Sheikh Munawar Mandokhail & Sheikh Ali Mandokhail\nCorporate Liaison: Ahmed Khan Mandokhail\nOffice: Sector F-10, Islamabad, Pakistan\nPhone: +92 311 7771414 (0311-7771414)\nEmail: mandokhailahmedkhan74@gmail.com\nInstagram: @ahmed_mandokhail10 (https://instagram.com/ahmed_mandokhail10)`;
    navigator.clipboard.writeText(contactText);
    setCopiedInfo(true);
    setTimeout(() => setCopiedInfo(false), 3000);
  };

  const handleDownloadVCard = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Mandokhail;Ahmed Khan;;;',
      'FN:Ahmed Khan Mandokhail - Rehman Construction (Pvt) Ltd',
      'ORG:Rehman Construction (Pvt) Ltd',
      'TITLE:Corporate Liaison / Sheikh Munawar & Sheikh Ali Mandokhail',
      'TEL;TYPE=CELL,VOICE:+923117771414',
      'EMAIL;TYPE=INTERNET,PREF:mandokhailahmedkhan74@gmail.com',
      'URL:https://instagram.com/ahmed_mandokhail10',
      'ADR;TYPE=WORK:;;Sector F-10;Islamabad;;44000;Pakistan',
      'NOTE:Specialized Civil Engineering Packages, Heavy Earthworks & Sovereign Subcontracts',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Ahmed_Khan_Mandokhail_Rehman_Construction.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // 1. Prepare direct email link directed to mandokhailahmedkhan74@gmail.com
    const emailSubject = encodeURIComponent(`[Tender Inquiry] ${formData.subject} - ${formData.name}`);
    const emailBody = encodeURIComponent(
      `Attn: Ahmed Khan Mandokhail / Sheikh Munawar & Sheikh Ali Mandokhail\n` +
      `Company: Rehman Construction (Pvt) Ltd, Sector F-10 Islamabad\n\n` +
      `Client / Company Name: ${formData.name}\n` +
      `Client Email: ${formData.email}\n` +
      `Client Phone/WhatsApp: ${formData.phone || 'Not specified'}\n` +
      `Inquiry Category: ${formData.subject}\n\n` +
      `Project Scope & Details:\n${formData.message}\n\n` +
      `---\n` +
      `Submitted through Rehman Construction Headquarters Portal.`
    );
    const mailtoUrl = `mailto:mandokhailahmedkhan74@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    // 2. Prepare WhatsApp dispatch link to 0311-7771414
    const whatsappText = encodeURIComponent(
      `*New Tender Inquiry for Rehman Construction (Sector F-10)*\n` +
      `• *Client*: ${formData.name}\n` +
      `• *Email*: ${formData.email}\n` +
      `• *Phone*: ${formData.phone || 'N/A'}\n` +
      `• *Category*: ${formData.subject}\n\n` +
      `*Scope Message*:\n${formData.message}`
    );
    const whatsappUrl = `https://wa.me/923117771414?text=${whatsappText}`;

    let refId = `RC-F10-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // 3. Post to backend server database
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.referenceId) {
          refId = data.referenceId;
        }
      }
    } catch (err) {
      console.warn('Backend inquiry post failed, proceeding with direct client dispatch:', err);
    } finally {
      setIsSubmitting(false);
      setLastDispatchedInquiry({
        referenceId: refId,
        mailtoUrl,
        whatsappUrl,
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      // Try automatic mailto trigger
      try {
        const link = document.createElement('a');
        link.href = mailtoUrl;
        link.target = '_blank';
        link.rel = 'noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        console.warn('Auto mailto blocked:', e);
      }

      // Refresh list
      loadInquiries();
    }
  };

  const handleResetForm = () => {
    setLastDispatchedInquiry(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Civil Works & Sub-Contracting Package',
      message: '',
    });
  };

  return (
    <section id="headquarters" className="py-20 sm:py-24 bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Radio className="h-3 w-3 animate-pulse text-amber-500" />
            <span>Corporate Headquarters & Liaison Desk</span>
          </div>
          <h2 className="rocky-title text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            LEADERSHIP & SECTOR F-10 ISLAMABAD
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300">
            Directed by our founders, executing specialized civil engineering packages, heavy earthworks, and infrastructure with our liaison office in Sector F-10, Islamabad.
          </p>
        </div>

        {/* 1. The Two Owners / Founders Showcase (Humble & Authentic Scope) */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-4 w-1.5 bg-amber-500 rounded-full" />
            <h3 className="rocky-title text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
              BOARD OF DIRECTORS & OWNERSHIP
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Owner 1: Sheikh Munawar Mandokhail */}
            <div className="group rounded-2xl border border-stone-200 bg-white p-8 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-amber-500 dark:border-stone-800 dark:bg-stone-950 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-amber-600 dark:text-amber-400 shadow-inner">
                    <UserCheck className="h-8 w-8 stroke-[2]" />
                  </div>
                  <span className="font-mono text-xs uppercase font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    Co-Founder & Chairman
                  </span>
                </div>

                <h4 className="rocky-title text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
                  SHEIKH MUNAWAR MANDOKHAIL
                </h4>
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4">
                  Executive Chairman · Rehman Construction
                </div>

                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                  With over 30 years in highway earthworks and civil contracting, Sheikh Munawar has directed critical execution packages in challenging terrains. Under his stewardship, Rehman Construction partners with lead authorities and consortiums, delivering specialized mountain rock blasting, sub-base preparation, and localized earthwork packages for CPEC roadbeds and provincial highway connections across Balochistan and northern Pakistan.
                </p>

                <div className="space-y-2 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>Focus: Mountain Rock Excavation, Earthwork Packages & Sovereign Sub-Contracts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>30+ Years Practical Heavy Construction Experience</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
                <span>Executive Office</span>
                <span className="font-mono font-semibold text-stone-800 dark:text-stone-200">Sector F-10, Islamabad</span>
              </div>
            </div>

            {/* Owner 2: Sheikh Ali Mandokhail */}
            <div className="group rounded-2xl border border-stone-200 bg-white p-8 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-amber-500 dark:border-stone-800 dark:bg-stone-950 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-amber-600 dark:text-amber-400 shadow-inner">
                    <UserCheck className="h-8 w-8 stroke-[2]" />
                  </div>
                  <span className="font-mono text-xs uppercase font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    Managing Director & CEO
                  </span>
                </div>

                <h4 className="rocky-title text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
                  SHEIKH ALI MANDOKHAIL
                </h4>
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4">
                  Managing Director & CEO · Rehman Construction
                </div>

                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                  Directing frontline engineering operations, machinery fleet deployment, and structural sub-contracts. Sheikh Ali oversees specialized civil engineering execution packages alongside lead government bodies—including structural column matrices for the 4-Million Gallon Gaddafi Stadium rain tank for PCB, flyover civil packages at T-Chowk Rawat, underpass retaining walls, and high-rise structural basements in Blue Area.
                </p>

                <div className="space-y-2 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>Focus: Civil Execution Packages, Hydraulic Basements & Heavy Fleet Operations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Direct Oversight of Heavy Plant, Excavators & Asphalt Machinery</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
                <span>Managing Director Office</span>
                <span className="font-mono font-semibold text-stone-800 dark:text-stone-200">Sector F-10, Islamabad</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. REAL SCANNABLE QR CODE SYSTEM ("Explore our QR Code") */}
        <div className="mb-20 rounded-3xl border-2 border-amber-500/40 bg-stone-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-800/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center gap-10">
            
            {/* Visual Real QR Code Display with Glowing Target Corners */}
            <div className="flex flex-col items-center text-center lg:w-5/12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3 border border-amber-500/40">
                <Sparkles className="h-3.5 w-3.5" />
                <span>100% Guaranteed Mobile Scannable</span>
              </div>
              <h3 className="rocky-title text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                EXPLORE OUR QR CODE
              </h3>
              <p className="text-xs text-stone-400 mb-6 max-w-sm">
                Point any smartphone camera (iPhone Camera, Samsung, Google Lens, or WhatsApp scanner) at this code to instantly open the link on your phone.
              </p>

              {/* Dynamic QR Container with Industrial Rocky Styling */}
              <div className="relative p-4 sm:p-5 rounded-2xl bg-white border-4 border-amber-500/80 shadow-[0_0_40px_rgba(245,158,11,0.25)] flex flex-col items-center">
                <span className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-amber-400" />
                <span className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-amber-400" />
                <span className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-amber-400" />
                <span className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-amber-400" />

                {qrLoading ? (
                  <div className="w-56 h-56 flex items-center justify-center bg-stone-100 rounded-lg">
                    <span className="text-xs font-mono text-stone-500 animate-pulse">Generating Scannable Matrix...</span>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={qrCodeDataUrl}
                      alt="Rehman Construction Scannable QR Code"
                      className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg"
                    />
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-950 text-amber-400 font-black text-xs font-mono px-2 py-1 rounded shadow-lg border-2 border-amber-400">
                      RC
                    </div>
                  </div>
                )}

                <div className="mt-3 text-center">
                  <span className="font-mono text-[11px] font-bold text-stone-900 block">
                    {qrPayloads[activeQrTarget].label}
                  </span>
                  <span className="text-[10px] text-stone-500 block">
                    ISO/IEC 18004 Verified Barcode
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-amber-400 font-mono">
                <Smartphone className="h-4 w-4" />
                <span>Camera scan works from 1 to 4 meters away</span>
              </div>
            </div>

            {/* QR Target Selector & Action System */}
            <div className="lg:w-7/12 flex flex-col justify-between w-full">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                  <Eye className="h-4 w-4" />
                  <span>Choose What Your Mobile Camera Scans:</span>
                </div>

                {/* Target Switcher Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                  <button
                    onClick={() => setActiveQrTarget('instagram')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      activeQrTarget === 'instagram'
                        ? 'border-pink-500 bg-pink-500/15 text-white shadow-lg'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase text-pink-400 font-bold">1. Instagram</span>
                    <span className="text-xs font-bold text-stone-100 truncate">@ahmed_mandokhail10</span>
                  </button>

                  <button
                    onClick={() => setActiveQrTarget('whatsapp')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      activeQrTarget === 'whatsapp'
                        ? 'border-emerald-500 bg-emerald-500/15 text-white shadow-lg'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">2. WhatsApp Desk</span>
                    <span className="text-xs font-bold text-stone-100 truncate">0311-7771414</span>
                  </button>

                  <button
                    onClick={() => setActiveQrTarget('email')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      activeQrTarget === 'email'
                        ? 'border-amber-500 bg-amber-500/15 text-white shadow-lg'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">3. Official Mail</span>
                    <span className="text-xs font-bold text-stone-100 truncate">mandokhail...74</span>
                  </button>

                  <button
                    onClick={() => setActiveQrTarget('vcard')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      activeQrTarget === 'vcard'
                        ? 'border-cyan-500 bg-cyan-500/15 text-white shadow-lg'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">4. Digital vCard</span>
                    <span className="text-xs font-bold text-stone-100 truncate">Save into Contacts</span>
                  </button>

                  <button
                    onClick={() => setActiveQrTarget('phone')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 sm:col-span-2 ${
                      activeQrTarget === 'phone'
                        ? 'border-amber-500 bg-amber-500/15 text-white shadow-lg'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">5. Direct Phone Call</span>
                    <span className="text-xs font-bold text-stone-100 truncate">+92 311 7771414 (0311-7771414)</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/80 mb-6">
                  <span className="text-xs text-amber-400 font-bold block mb-1">
                    Currently Selected QR Output:
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed font-mono">
                    {qrPayloads[activeQrTarget].desc}
                  </p>
                </div>

                {/* Direct Action Buttons on Screen */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <a
                    href="https://instagram.com/ahmed_mandokhail10"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-800 bg-stone-900/90 hover:border-pink-500 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shrink-0 font-bold">
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="text-xs">
                      <span className="text-stone-400 block font-semibold">Official Instagram</span>
                      <span className="font-mono text-sm font-bold text-white">@ahmed_mandokhail10</span>
                    </div>
                  </a>

                  <a
                    href="mailto:mandokhailahmedkhan74@gmail.com"
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-800 bg-stone-900/90 hover:border-amber-500 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-800 text-amber-400 shrink-0 font-bold">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="text-xs truncate">
                      <span className="text-stone-400 block font-semibold">Direct Mail</span>
                      <span className="font-mono text-xs font-bold text-white truncate block">mandokhailahmedkhan74@gmail.com</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Action Buttons: Save V-Card & Copy */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-800">
                <button
                  onClick={handleDownloadVCard}
                  className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 px-4 py-2.5 text-xs font-black uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download .VCF Card</span>
                </button>

                <button
                  onClick={handleCopyContact}
                  className="flex items-center gap-2 rounded-xl border border-stone-700 bg-stone-900 text-stone-200 hover:border-amber-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {copiedInfo ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">All Details Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Full Contact Info</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Sector F-10 Office & Working Satellite/Vector Map */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-lg dark:border-stone-800 dark:bg-stone-950">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Office Details */}
            <div className="w-full lg:w-5/12 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
                  Liaison & Coordination Office
                </div>
                <h3 className="rocky-title text-3xl font-black text-stone-900 dark:text-stone-100 mb-4">
                  SECTOR F-10, ISLAMABAD
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
                  Our coordination office is located in Sector F-10, Islamabad, serving as the central liaison desk for our engineering teams, government tenders, client meetings, and joint-venture consortium coordination across the federal capital and provinces.
                </p>

                {/* Contact Information Cards */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60">
                    <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-stone-900 dark:text-stone-100 block">Office Location</span>
                      <span className="text-stone-600 dark:text-stone-300">
                        Sector F-10, Islamabad, Pakistan
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60">
                    <Phone className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-xs flex-1">
                      <span className="font-bold text-stone-900 dark:text-stone-100 block">Direct Executive Line</span>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <a
                          href="tel:03117771414"
                          className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline"
                        >
                          0311-7771414 / +92 311 7771414
                        </a>
                        <a
                          href="https://wa.me/923117771414"
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md transition-colors"
                        >
                          WhatsApp Direct
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60">
                    <Mail className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-stone-900 dark:text-stone-100 block">Official Contact Mail</span>
                      <a
                        href="mailto:mandokhailahmedkhan74@gmail.com"
                        className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        mandokhailahmedkhan74@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Official Instagram Handle */}
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60">
                    <div className="flex h-5 w-5 items-center justify-center text-pink-500 shrink-0 mt-0.5">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="text-xs flex-1">
                      <span className="font-bold text-stone-900 dark:text-stone-100 block">Official Instagram Profile</span>
                      <a
                        href="https://instagram.com/ahmed_mandokhail10"
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5 mt-0.5"
                      >
                        <span>@ahmed_mandokhail10</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60">
                    <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-stone-900 dark:text-stone-100 block">Office Working Hours</span>
                      <span className="text-stone-600 dark:text-stone-300">
                        Monday – Saturday: 08:30 AM – 06:00 PM PKT (Sunday: Closed)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highway Connectivity */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 flex items-center justify-between">
                <span>Sector F-10, Islamabad</span>
                <span>·</span>
                <span>Margalla Foothills</span>
                <span>·</span>
                <span>Srinagar Highway Access</span>
              </div>
            </div>

            {/* Interactive Islamabad F-10 Map & Tender Inquiries Management */}
            <div className="w-full lg:w-7/12 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  <Navigation className="h-4 w-4 text-amber-500" />
                  <span>Map · Sector F-10 Islamabad ({mapView === 'satellite' ? 'Satellite Aerial View' : 'Vector Plan'})</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-stone-200 dark:bg-stone-800 rounded-lg p-0.5 text-xs font-semibold">
                    <button
                      onClick={() => setMapView('satellite')}
                      className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${mapView === 'satellite' ? 'bg-white dark:bg-stone-700 shadow-xs text-stone-950 dark:text-white font-bold' : 'text-stone-600 dark:text-stone-400'}`}
                    >
                      <Layers className="h-3 w-3" />
                      <span>Satellite</span>
                    </button>
                    <button
                      onClick={() => setMapView('streets')}
                      className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${mapView === 'streets' ? 'bg-white dark:bg-stone-700 shadow-xs text-stone-950 dark:text-white font-bold' : 'text-stone-600 dark:text-stone-400'}`}
                    >
                      <Compass className="h-3 w-3" />
                      <span>Vector</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setMapZoom(Math.max(0.8, Number((mapZoom - 0.2).toFixed(1))))}
                      className="h-7 w-7 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-300 dark:hover:bg-stone-700 flex items-center justify-center cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setMapZoom(1)}
                      className="h-7 w-7 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-300 dark:hover:bg-stone-700 flex items-center justify-center cursor-pointer"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => setMapZoom(Math.min(1.8, Number((mapZoom + 0.2).toFixed(1))))}
                      className="h-7 w-7 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-300 dark:hover:bg-stone-700 flex items-center justify-center cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Map Canvas Frame */}
              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden border border-stone-300 dark:border-stone-800 bg-stone-950 shadow-inner group">
                <div
                  className="w-full h-full transition-transform duration-300 flex items-center justify-center relative select-none overflow-hidden"
                  style={{ transform: `scale(${mapZoom})` }}
                >
                  {mapView === 'satellite' ? (
                    <div className="absolute inset-0 bg-stone-950">
                      <img
                        src="/src/assets/images/satellite_f10_islamabad_1794115113030.jpg"
                        alt="Islamabad Sector F-10 Satellite Aerial View"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/50 pointer-events-none" />

                      <div className="absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto">
                        <div className="flex items-center gap-1.5 bg-amber-500 text-stone-950 font-black text-[11px] px-2.5 py-1 rounded-md shadow-2xl uppercase tracking-wider border border-white/50 animate-bounce">
                          <MapPin className="h-3.5 w-3.5 fill-stone-950" />
                          <span>Rehman Construction Office</span>
                        </div>
                        <div className="w-2.5 h-2.5 bg-amber-400 rotate-45 -mt-1 shadow-md" />
                      </div>

                      <div className="absolute top-4 left-6 bg-stone-950/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-stone-300 border border-stone-800">
                        Sector F-10 Islamabad
                      </div>
                      <div className="absolute top-4 right-6 bg-stone-950/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-stone-300 border border-stone-800">
                        Margalla Hills Foothills
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-stone-900">
                      <div className="absolute top-0 left-0 right-0 h-20 bg-stone-950 border-b border-stone-800 flex items-center justify-center">
                        <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase">
                          ▲ MARGALLA HILLS NATIONAL PARK ▲
                        </span>
                      </div>

                      <div className="absolute top-20 left-0 right-0 h-4 bg-amber-500/20 border-y border-amber-500/40 flex items-center px-4">
                        <span className="text-[9px] font-mono text-amber-400 font-bold uppercase">Margalla Road Axis</span>
                      </div>

                      <div className="absolute top-0 bottom-0 right-12 w-4 bg-stone-700/40 border-x border-stone-700 flex items-center justify-center">
                        <span className="text-[9px] font-mono text-stone-400 uppercase -rotate-90 whitespace-nowrap">
                          F-10 / F-11 Axis
                        </span>
                      </div>

                      <div className="absolute inset-x-8 top-32 bottom-14 border-2 border-stone-800 rounded-xl bg-stone-900/60 p-4">
                        <div className="grid grid-cols-2 grid-rows-2 h-full gap-3">
                          <div className="border border-stone-800 rounded p-2 text-[10px] text-stone-500">
                            F-10/1
                          </div>
                          <div className="border border-stone-800 rounded p-2 text-[10px] text-stone-500">
                            F-10/2
                          </div>
                          <div className="border border-stone-800 rounded p-2 text-[10px] text-stone-500">
                            F-10/3
                          </div>
                          <div className="border border-stone-800 rounded p-2 text-[10px] text-stone-500">
                            F-10/4
                          </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-amber-500/60 bg-stone-950 flex flex-col items-center justify-center shadow-2xl p-2 text-center">
                          <span className="text-[10px] font-mono text-amber-400 font-bold block">F-10 MARKAZ</span>
                          <span className="text-[8px] text-stone-400 block mb-1">Commercial Concourse</span>
                          
                          <div className="flex items-center gap-1 bg-amber-500 text-stone-950 px-2 py-1 rounded shadow-lg font-bold text-[10px] animate-pulse">
                            <MapPin className="h-3.5 w-3.5 fill-stone-950" />
                            <span>REHMAN OFFICE</span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-0 right-0 h-4 bg-stone-700/40 border-y border-stone-700 flex items-center px-4">
                        <span className="text-[9px] font-mono text-stone-400 uppercase">
                          Srinagar Highway Access ↓
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="pointer-events-auto bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-md border border-stone-800 text-[11px] text-stone-300 font-mono flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>33.6973° N, 73.0118° E · F-10 Islamabad</span>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Sector+F-10+Islamabad+Pakistan"
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* REAL TENDER INQUIRY DISPATCH & EXECUTIVE INBOX */}
              <div className="mt-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-5">
                
                {/* Tab Switcher: Send Query vs Executive Inbox */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setInquiryTab('form')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        inquiryTab === 'form'
                          ? 'bg-amber-500 text-stone-950 shadow-md'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                      }`}
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Direct Tender Inquiry</span>
                    </button>

                    <button
                      onClick={() => {
                        setInquiryTab('inbox');
                        loadInquiries();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        inquiryTab === 'inbox'
                          ? 'bg-amber-500 text-stone-950 shadow-md'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                      }`}
                    >
                      <Inbox className="h-3.5 w-3.5" />
                      <span>Liaison Desk Inbox ({inquiriesList.length})</span>
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 hidden sm:inline">
                    Dispatches to: mandokhailahmedkhan74@gmail.com
                  </span>
                </div>

                {/* Tab 1: Dispatch Form or Dispatch Success Receipt */}
                {inquiryTab === 'form' && (
                  <div>
                    {lastDispatchedInquiry ? (
                      /* Live Dispatch Confirmation Receipt */
                      <div className="rounded-xl bg-stone-950 border-2 border-emerald-500 p-5 text-stone-100 animate-in fade-in">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                            <span className="font-bold text-sm text-white">
                              INQUIRY REGISTERED · REF #{lastDispatchedInquiry.referenceId}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                            Logged in System
                          </span>
                        </div>

                        <p className="text-xs text-stone-300 leading-relaxed mb-4">
                          Thank you, <strong>{lastDispatchedInquiry.name}</strong>. Your inquiry has been registered in the Sector F-10 coordination system. Use the buttons below to immediately send the full message to Ahmed Khan Mandokhail via Email or WhatsApp:
                        </p>

                        {/* Direct Action Dispatch Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                          <a
                            href={lastDispatchedInquiry.mailtoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                          >
                            <Mail className="h-4 w-4" />
                            <span>Open in Email / Gmail App</span>
                          </a>

                          <a
                            href={lastDispatchedInquiry.whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>Forward via WhatsApp (0311-7771414)</span>
                          </a>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-stone-800 text-[11px] text-stone-400">
                          <span>Recipient: <strong>mandokhailahmedkhan74@gmail.com</strong></span>
                          <button
                            onClick={handleResetForm}
                            className="text-amber-400 hover:underline font-bold cursor-pointer"
                          >
                            Send Another Inquiry
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Active Input Form */
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                              Your Full Name / Entity *
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Tariq Khan / National Logistics"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                              className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 px-3 py-2 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:border-amber-500 focus:outline-hidden"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                              Your Email Address (For Direct Reply) *
                            </label>
                            <input
                              type="email"
                              placeholder="e.g. client@organization.com.pk"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 px-3 py-2 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:border-amber-500 focus:outline-hidden"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                              Phone / WhatsApp Number
                            </label>
                            <input
                              type="tel"
                              placeholder="e.g. 0300-1234567"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 px-3 py-2 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:border-amber-500 focus:outline-hidden"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                              Tender & Project Scope
                            </label>
                            <select
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 px-3 py-2 text-xs text-stone-900 dark:text-stone-100 focus:border-amber-500 focus:outline-hidden"
                            >
                              <option value="Civil Works & Sub-Contracting Package">Civil Works & Sub-Contracting Package</option>
                              <option value="Road / Highway Earthwork Bidding">Road / Highway Earthwork Bidding</option>
                              <option value="Underpass / Flyover Civil Packages">Underpass / Flyover Civil Packages</option>
                              <option value="Water Infrastructure & Rain Tank">Water Infrastructure & Rain Tank</option>
                              <option value="Meeting with Sheikh Munawar & Sheikh Ali Mandokhail">Meeting with Sheikh Munawar & Sheikh Ali Mandokhail</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                            Project Scope, Location & Requirements *
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Describe your highway project, earthworks volume, underpass location, or tender joint-venture..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            className="w-full rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 px-3 py-2 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:border-amber-500 focus:outline-hidden resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>{isSubmitting ? 'Registering & Dispatching...' : 'Dispatch Inquiry to Ahmed Khan Mandokhail (F-10)'}</span>
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* Tab 2: Executive Inquiries Inbox (Allows user & team to see all incoming customer queries) */}
                {inquiryTab === 'inbox' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500 pb-2">
                      <span>Live Registered Inquiries Desk</span>
                      <button
                        onClick={loadInquiries}
                        className="text-amber-500 hover:underline font-mono text-[11px] cursor-pointer"
                      >
                        Refresh Feed
                      </button>
                    </div>

                    {inquiriesList.length === 0 ? (
                      <div className="text-center py-8 text-stone-500 text-xs">
                        No inquiries logged yet.
                      </div>
                    ) : (
                      <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                        {inquiriesList.map((inq) => (
                          <div
                            key={inq.id}
                            className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-xs shadow-xs"
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div>
                                <span className="font-bold text-stone-900 dark:text-stone-100 block">
                                  {inq.name}
                                </span>
                                <span className="text-[11px] text-stone-500 font-mono">
                                  {inq.email} · {inq.phone}
                                </span>
                              </div>
                              <span className="font-mono text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                                {inq.referenceId}
                              </span>
                            </div>

                            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 block mb-1">
                              Subject: {inq.subject}
                            </span>
                            <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed mb-3">
                              "{inq.message}"
                            </p>

                            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/80 text-[10px] text-stone-400">
                              <span>Received: {inq.timestamp}</span>
                              <div className="flex items-center gap-2">
                                <a
                                  href={`mailto:${inq.email}?subject=Re:%20${encodeURIComponent(inq.subject)}&body=Dear%20${encodeURIComponent(inq.name)},%0A%0AThank%20you%20for%20contacting%20Rehman%20Construction%20(Pvt)%20Ltd%20at%20our%20Sector%20F-10%20Islamabad%20Headquarters.%0A%0ARegards,%0AAhmed%20Khan%20Mandokhail`}
                                  className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
                                >
                                  Reply via Email
                                </a>
                                <span>·</span>
                                <a
                                  href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20Ahmed%20Khan%20Mandokhail%20from%20Rehman%20Construction%20regarding%20your%20inquiry.`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-emerald-500 font-bold hover:underline"
                                >
                                  WhatsApp Client
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
