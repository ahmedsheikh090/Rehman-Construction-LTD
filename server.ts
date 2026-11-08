import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

interface Inquiry {
  id: string;
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
}

const inquiries: Inquiry[] = [
  {
    id: 'inq-initial-1',
    referenceId: 'RC-F10-2026-0812',
    name: 'National Highway Infrastructure Liaison',
    email: 'inquiries.liaison@nha.gov.pk',
    phone: '+92 51 9032800',
    subject: 'Civil Works & Sub-Contracting Package',
    message: 'Pre-qualification inquiry for specialized mountain rock excavation and heavy earthwork sub-contracting packages.',
    timestamp: '09:30 AM PKT'
  }
];

// Inquiries Endpoints
app.get('/api/inquiries', (_req: Request, res: Response) => {
  res.json({ inquiries });
});

app.post('/api/inquiries', (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const referenceId = `RC-F10-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    referenceId,
    name,
    email,
    phone: phone || '0311-7771414',
    subject: subject || 'Civil Works & Sub-Contracting Package',
    message,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' PKT'
  };

  inquiries.unshift(newInquiry);
  console.log(`[Tender Inquiry Logged] Ref: ${referenceId} from ${name} (${email})`);

  res.json({
    success: true,
    referenceId,
    inquiry: newInquiry,
    mailRecipient: 'mandokhailahmedkhan74@gmail.com',
    whatsappRecipient: '923117771414',
    message: 'Inquiry registered at Sector F-10 Executive Desk.'
  });
});

// AI Construction Consultant Endpoint
app.post('/api/consultant', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const companyContext = `
You are the senior AI Engineering Desk Consultant for Rehman Construction (Pvt) Ltd.
Rehman Construction is a premier civil engineering, highways, underpasses, and infrastructure contractor in Pakistan, inspired by giants like Habib Construction Services (HCS).

CRITICAL SCOPE ACCURACY:
- DO NOT claim that Rehman Construction built the "whole CPEC" or "all of CPEC". Whole CPEC is a massive multi-billion dollar national initiative. Clarify humbly and truthfully: Rehman Construction executed specific localized civil engineering packages, mountain rock blasting, and roadbed sections along the N-50 corridor in Balochistan alongside sovereign authorities.
- Do NOT claim sole credit for entire national projects. Rehman Construction executes specialized civil engineering packages, earthworks, heavy equipment operations, structural concrete columns, and sub-contracts in joint ventures and consortiums alongside lead authorities (CDA, NHA, PCB, C&W Balochistan/Punjab).
- Leadership:
  * Sheikh Munawar Mandokhail – Co-Founder & Executive Chairman (30+ years mountain highway earthworks & CPEC packages).
  * Sheikh Ali Mandokhail – Managing Director & CEO (Frontline civil execution, heavy fleet deployment, Gaddafi rain tank civil columns, T-Chowk flyover works).
  * Ahmed Khan Mandokhail – Corporate Liaison & Executive Communications (mandokhailahmedkhan74@gmail.com, Insta: @ahmed_mandokhail10).
- Corporate Office: Sector F-10, Islamabad, Pakistan.
- Contact: Phone/WhatsApp: 0311-7771414 / +92 311 7771414, Email: mandokhailahmedkhan74@gmail.com, Instagram: @ahmed_mandokhail10.
- Licensure: Pakistan Engineering Council (PEC) Category C-A (No-Limit License).
- Major Work Packages:
  1. CPEC Mountain Roadbed & Rock Cut Packages (N-50 Balochistan): Localized rock cutting, box underpasses, and earthworks in joint venture.
  2. D-Chowk Grade-Separated Underpass (Jinnah Avenue Islamabad): Retaining walls, underpass conduits, and subterranean drainage.
  3. Canal Bank Road Modernization (Lahore): Divided roadway widening and concrete canal lining revetments.
  4. Quetta Liaquat Bazaar & City Road Networks (Balochistan): Heavy-duty asphalt wearing courses and storm drainage.
  5. High-Rises in Blue Area (Islamabad): Multi-level basements, deep foundations, and structural reinforced concrete frames.
  6. 4-Million Gallon Rain Tank at Gaddafi Stadium (Lahore for PCB): Specialized subterranean concrete works and load-bearing column matrices.
  7. T-Chowk Flyover & Trumpet Interchange (Rawat Islamabad): Structural civil sub-contracting packages and elevated girder placements.
  8. 3,400-Seating Landscape Stadium Enclosure (Islamabad): Stepped reinforced concrete seating bowl integrated into natural hillside earthworks.
  9. Islamabad Convention Center Access Boulevards: Heavy-duty ceremonial transit boulevards.

Tone: Humble, technically knowledgeable, helpful, respectful, and proud of Pakistani civil craftsmanship.
`;

    if (ai) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 4000)
        );
        const apiPromise = ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents: `${companyContext}\n\nUser Question: ${message}`,
        });

        const response: any = await Promise.race([apiPromise, timeoutPromise]);
        const replyText = response.text;
        if (replyText) {
          return res.json({ reply: replyText });
        }
      } catch (geminiErr) {
        console.warn('Gemini API call timed out or failed, utilizing local knowledge engine:', geminiErr);
      }
    }

    // Comprehensive Fallback Knowledge Engine for Rehman Construction
    const lower = message.toLowerCase().trim();
    let reply = "Welcome to Rehman Construction (Pvt) Ltd. Headquartered in Sector F-10, Islamabad under the leadership of Chairman Sheikh Munawar Mandokhail, Managing Director Sheikh Ali Mandokhail, and Corporate Liaison Ahmed Khan Mandokhail. We are licensed by the Pakistan Engineering Council (PEC Category C-A No-Limit) to execute specialized civil engineering packages, heavy earthworks, highways, and infrastructure across Pakistan.";

    // 1. CPEC queries (Specific clarification that we did NOT do the whole CPEC)
    if (lower.includes('cpec') || lower.includes('cpac') || lower.includes('china pakistan')) {
      reply = "Important Scope Clarification on CPEC:\n\nRehman Construction did NOT build the entire CPEC. The China-Pakistan Economic Corridor is a massive multi-billion dollar national initiative with dozens of international and sovereign stakeholders.\n\nOur role was executing specialized civil engineering packages, mountain cut-and-fill stabilization, heavy rock excavation, and reinforced box underpasses along localized mountain sections of the N-50 corridor in northern Balochistan (Zhob – Qila Saifullah – Kuchlak – Quetta) in joint venture with lead authorities.";
    }
    // 2. Who are you / What is this company / General intro
    else if (
      lower.includes('who are you') ||
      lower.includes('what is rehman') ||
      lower.includes('about company') ||
      lower.includes('about you') ||
      lower.includes('tell me about') ||
      lower.includes('introduction') ||
      lower.includes('aap kon') ||
      lower.includes('company kya hai')
    ) {
      reply = "Rehman Construction (Pvt) Ltd is a premier Pakistani civil engineering and heavy infrastructure contracting firm headquartered in Sector F-10, Islamabad. We specialize in heavy earthworks, highway construction, flyover and underpass structural packages, and large-scale water retention reservoirs under PEC Category C-A (No-Limit).\n\nKey Leadership:\n• Sheikh Munawar Mandokhail – Co-Founder & Executive Chairman\n• Sheikh Ali Mandokhail – Managing Director & CEO\n• Ahmed Khan Mandokhail – Corporate Liaison Desk (mandokhailahmedkhan74@gmail.com / 0311-7771414)";
    }
    // 3. What have you done / Projects / Work done
    else if (
      lower.includes('what have you done') ||
      lower.includes('what did you do') ||
      lower.includes('work') ||
      lower.includes('project') ||
      lower.includes('road') ||
      lower.includes('kya kaam kiya') ||
      lower.includes('kya banaya') ||
      lower.includes('portfolio') ||
      lower.includes('completed')
    ) {
      reply = "Rehman Construction has executed specialized civil engineering packages across Pakistan's most prominent infrastructure developments:\n\n1. CPEC Mountain Roadbed Packages (N-50 Balochistan) – Heavy rock cuts, earthworks, and box underpasses.\n2. D-Chowk Grade-Separated Underpass (Jinnah Avenue, Islamabad) – Retaining walls and subterranean stormwater drainage.\n3. Canal Bank Road Modernization (Lahore) – 6-lane divided roadway civil works and concrete canal lining revetments.\n4. Quetta Liaquat Bazaar & City Road Networks (Balochistan) – Heavy-duty asphalt wearing courses and storm drainage.\n5. High-Rises in Blue Area (Islamabad) – Multi-level basement excavation, deep foundations, and structural concrete frames.\n6. 4-Million Gallon Rain Tank at Gaddafi Stadium (Lahore for PCB) – Subterranean reinforced concrete columns and pump sumps.\n7. T-Chowk Flyover & Trumpet Interchange (Rawat, Islamabad) – Structural girder placement and approach earthworks.\n8. 3,400-Seating Landscape Stadium Enclosure (Islamabad) – Stepped grandstand bowl contoured into natural hillside contours.\n9. Islamabad Convention Center Access Boulevards – Protocol transit avenues.";
    }
    // 4. Owners / Founders / Leadership
    else if (
      lower.includes('owner') ||
      lower.includes('founder') ||
      lower.includes('sheikh') ||
      lower.includes('munawar') ||
      lower.includes('ali') ||
      lower.includes('ahmed') ||
      lower.includes('mandokhail') ||
      lower.includes('malik') ||
      lower.includes('ceo') ||
      lower.includes('chairman')
    ) {
      reply = "Rehman Construction is directed by our founding leadership:\n\n1. Sheikh Munawar Mandokhail – Co-Founder & Executive Chairman, bringing over 30 years of high-altitude mountain highway earthworks and CPEC civil packages.\n2. Sheikh Ali Mandokhail – Managing Director & CEO, directing frontline civil engineering execution, heavy fleet deployment, and specialized structural packages (including the Gaddafi Stadium rain tank and T-Chowk flyover).\n3. Ahmed Khan Mandokhail – Executive Liaison & Communications Desk (Email: mandokhailahmedkhan74@gmail.com | Phone: 0311-7771414 | Insta: @ahmed_mandokhail10).";
    }
    // 5. Office, Location, Address, Phone, Email, Contact
    else if (
      lower.includes('office') ||
      lower.includes('f-10') ||
      lower.includes('address') ||
      lower.includes('location') ||
      lower.includes('phone') ||
      lower.includes('number') ||
      lower.includes('contact') ||
      lower.includes('email') ||
      lower.includes('mail') ||
      lower.includes('whatsapp') ||
      lower.includes('kahan hai') ||
      lower.includes('rabta')
    ) {
      reply = "Rehman Construction Corporate Office & Direct Contacts:\n\n• Location: Sector F-10, Islamabad, Pakistan\n• Direct Executive Phone: 0311-7771414 / +92 311 7771414\n• WhatsApp Direct: https://wa.me/923117771414\n• Official Email: mandokhailahmedkhan74@gmail.com\n• Official Instagram: @ahmed_mandokhail10 (https://instagram.com/ahmed_mandokhail10)\n• Corporate Liaison: Ahmed Khan Mandokhail\n• Office Working Hours: Monday – Saturday, 8:30 AM – 6:00 PM PKT.";
    }
    // 6. Underpasses and Flyovers
    else if (lower.includes('flyover') || lower.includes('underpass') || lower.includes('t-chowk') || lower.includes('d-chowk') || lower.includes('rawat')) {
      reply = "Rehman Construction's grade separation and flyover civil works include:\n\n• T-Chowk Flyover & Interchange (Rawat, Islamabad): Specialized structural sub-contracting packages, pre-stressed girder placement, and ramp earthworks eliminating gridlock at the confluence of GT Road (N-5) and Islamabad Expressway.\n• D-Chowk Underpass (Jinnah Avenue, Islamabad): Capital signal-free underpass with reinforced retaining diaphragm walls and automated stormwater pumping.\n• Shah Underpass: Deep-cut vehicular conduit.";
    }
    // 7. Gaddafi Stadium Rain Tank
    else if (lower.includes('gaddafi') || lower.includes('tank') || lower.includes('rain') || lower.includes('water') || lower.includes('pcb')) {
      reply = "The Gaddafi Stadium Rainwater Retention Tank was engineered for the Pakistan Cricket Board (PCB):\n\n• Capacity: 4,000,000 Imperial Gallons\n• Engineering Design: Subterranean reinforced concrete matrix with 84 heavy load-bearing columns and 28-foot depth\n• Rehman Construction's Civil Role: Heavy excavation, cast-in-place reinforced column framing, and pump station sumps.";
    }
    // 8. High-Rises & Blue Area
    else if (lower.includes('blue area') || lower.includes('tower') || lower.includes('high rise') || lower.includes('building')) {
      reply = "In high-rise vertical engineering, Rehman Construction executed specialized civil foundation packages for High-Rises in Blue Area, Islamabad:\n\n• Scope: Heavy foundation packages, multi-level basements, and structural reinforced concrete shear frames\n• Seismic Design: Category-4 earthquake expansion cores\n• Location: New Blue Area commercial zone.";
    }
    // 9. Quetta / Balochistan Roadways
    else if (lower.includes('quetta') || lower.includes('balochistan') || lower.includes('liaquat')) {
      reply = "In our home province of Balochistan, Rehman Construction has delivered pivotal roadbed and civil packages:\n\n• Quetta City Road Networks & Liaquat Bazaar: Heavy-duty Dense Bituminous Macadam (DBM) asphalt and subterranean RCC storm drainage.\n• CPEC Mountain Roadbed Packages: Heavy rock blasting and sub-base preparation along the northern Balochistan mountain corridor.";
    }

    return res.json({ reply });
  } catch (error: any) {
    console.error('Error generating consultant response:', error);
    return res.json({
      reply: "Rehman Construction (Pvt) Ltd is ready to assist your inquiry. Our corporate office in Sector F-10, Islamabad is available via mandokhailahmedkhan74@gmail.com or 0311-7771414."
    });
  }
});

// Setup Vite middlewares in development or static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rehman Construction Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
