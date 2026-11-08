export function getConsultantReply(message: string): string {
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


return reply;
}