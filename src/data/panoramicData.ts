import { PanoramicViewItem } from '../types';

export const PANORAMIC_DATA: PanoramicViewItem[] = [
  {
    id: 'pan-cpec-n50',
    title: 'CPEC Western Route N-50 Mountain Corridor',
    location: 'Zhob & Qila Saifullah Pass, Balochistan',
    image: '/src/assets/images/cpec_balochistan_n50_1794113940856.jpg',
    description: '360° panoramic survey of the CPEC Western Route carved through the barren rocky mountains of northern Balochistan with heavy stone cut stabilization.',
    hotspots: [
      { pitch: 42, yaw: 22, label: 'Mountain Rock Cut Slope', detail: 'Stabilized sheer rock face preventing stonefall onto commercial freight lanes.' },
      { pitch: 65, yaw: 50, label: 'Superpave Asphalt Surface', detail: 'Polymer-modified heavy asphalt resisting severe desert heat and axle rutting.' },
      { pitch: 35, yaw: 78, label: 'Zhob – Quetta Transit Axis', detail: 'Primary commercial freight conduit linking Gwadar port to northern provinces.' },
    ],
  },
  {
    id: 'pan-dchowk',
    title: 'D-Chowk Grade-Separated Underpass & Boulevard',
    location: 'Jinnah Avenue / Constitution Avenue, Islamabad',
    image: '/src/assets/images/d_chowk_islamabad_underpass_1794113941201.jpg',
    description: '360° capital view of the signal-free D-Chowk vehicular underpass beneath Jinnah Avenue with sweeping views of the Margalla Hills.',
    hotspots: [
      { pitch: 35, yaw: 18, label: 'Margalla Foothills Backdrop', detail: 'Panoramic scenic alignment designed under strict CDA capital environmental codes.' },
      { pitch: 58, yaw: 48, label: 'Underpass Vehicular Conduit', detail: 'Grade-separated traffic lanes accommodating 90,000+ PCU daily without signal delay.' },
      { pitch: 48, yaw: 82, label: 'Constitution Avenue Access', detail: 'Direct ceremonial link to federal ministries, Parliament House, and Diplomatic Enclave.' },
    ],
  },
  {
    id: 'pan-canal-road',
    title: 'Canal Bank Road Expressway & Embankments',
    location: 'Canal Bank Road, Lahore, Punjab',
    image: '/src/assets/images/canal_road_lahore_1794113941923.jpg',
    description: '360° view of Lahore’s bustling divided 6-lane Canal Bank Road alongside reinforced concrete-lined waterways and lush green tree canopies.',
    hotspots: [
      { pitch: 45, yaw: 25, label: 'Reinforced Concrete Lining', detail: 'Cast-in-situ revetment eliminating soil erosion and canal seepage.' },
      { pitch: 62, yaw: 55, label: 'Divided 6-Lane Carriageway', detail: 'High-speed Superpave asphalt surface with landscaped central medians.' },
      { pitch: 30, yaw: 75, label: 'Orange Line Metro Overpass', detail: 'Grade-separated urban transit integration above canal roadbed.' },
    ],
  },
  {
    id: 'pan-blue-area-tower',
    title: 'High-Rises in Blue Area, Islamabad',
    location: 'Blue Area Commercial Hub, Islamabad',
    image: '/assets/aistudio/PakLand_tower_new_blue_area_Islamabad_9034d2f9.jfif',
    description: '360° architectural view of commercial high-rises in Islamabad’s Blue Area, featuring structural concrete framing and multi-level parking basements.',
    hotspots: [
      { pitch: 20, yaw: 48, label: 'Architectural Crown & Slabs', detail: 'Long-span structural concrete floor plates engineered for earthquake Category-4 resilience.' },
      { pitch: 50, yaw: 52, label: 'Reinforced Shear Core', detail: 'Cast-in-situ reinforced concrete shear walls providing high lateral stiffness.' },
      { pitch: 78, yaw: 45, label: 'Multi-Level Basement Parking', detail: 'Deep-cut basement retention walls and structural vehicle concourses.' },
    ],
  },
  {
    id: 'pan-gaddafi-tank',
    title: 'Gaddafi Stadium 4-Million Gallon Subterranean Reservoir',
    location: 'Gaddafi Stadium, Lahore',
    image: '/src/assets/images/project_gaddafi_rain_tank_1794112648430.jpg',
    description: '360° subterranean view inside the monolithic 4-million gallon rainwater retention facility built for the Pakistan Cricket Board.',
    hotspots: [
      { pitch: 35, yaw: 38, label: '84 Concrete Monolith Pillars', detail: 'Heavy load-bearing columns supporting the stadium outfield and spectator concourses.' },
      { pitch: 72, yaw: 54, label: '120-Cusec Turbine Pump Matrix', detail: 'High-discharge submersible pump array evacuating torrential monsoon water in minutes.' },
      { pitch: 48, yaw: 80, label: 'Dual Sedimentation Chambers', detail: 'Integrated silt-trap filtration system recycling clean stormwater for groundskeeping.' },
    ],
  },
];
