import localImage0 from '../assets/images/road_before_construction_1794113943323.jpg';
import localImage1 from '../assets/images/cpec_balochistan_n50_1794113940856.jpg';
import localImage2 from '../assets/images/canal_road_lahore_1794113941923.jpg';
import localImage3 from '../assets/images/d_chowk_islamabad_underpass_1794113941201.jpg';
import localImage4 from '../assets/images/quetta_liaquat_road_1794113976731.jpg';
import localImage5 from '../assets/images/project_tchowk_flyover_1794112647521.jpg';
import localImage6 from '../assets/images/islamabad_convention_road_1794113942379.jpg';
import { BeforeAfterProject } from '../types';

export const TRANSFORMATIONS_DATA: BeforeAfterProject[] = [
  {
    id: 'cpec-n50-trans',
    title: 'CPEC Western Route N-50 Mountain Corridor, Balochistan',
    location: 'Balochistan (Zhob – Qila Saifullah – Kuchlak)',
    category: 'CPEC Civil Roadbed Package',
    beforeDescription: 'Unpaved dirt and rocky mountain paths, hazardous narrow gravel switchbacks, severe dust storms, landslides during winter rains, and 8-hour transit times for freight convoys.',
    afterDescription: 'Specialized CPEC civil engineering package and localized mountain rock excavation executed alongside sovereign highway authorities: mountain slope cut stabilization, reinforced box underpasses, and durable asphalt roadbed for heavy freight.',
    beforeImage: localImage0,
    afterImage: localImage1,
    metrics: [
      { label: 'Freight Transit Duration', before: '8.5 Hours', after: '2.5 Hours' },
      { label: 'Pavement Structure', before: 'Unpaved Dirt / Gravel', after: 'Superpave Asphaltic Concrete' },
      { label: 'Rock Cut Slope Safety', before: 'Frequent Landslides', after: 'Geo-Reinforced Retaining Walls' },
    ],
  },
  {
    id: 'canal-road-trans',
    title: 'Canal Bank Road Expressway & Embankments, Lahore',
    location: 'Canal Bank Road, Lahore, Punjab',
    category: 'Waterway & Urban Highway Engineering',
    beforeDescription: 'Unlined, severely eroded muddy canal banks causing recurring embankment washouts, stagnant wastewater buildup, foul odor, and crumbling 2-lane road bottlenecks.',
    afterDescription: 'Transformed into a modern 6-lane divided arterial boulevard with reinforced concrete revetment lining along the water canal, automated flood interceptors, and landscaped green medians.',
    beforeImage: localImage0,
    afterImage: localImage2,
    metrics: [
      { label: 'Canal Embankment Life', before: 'Annual Collapses', after: '100-Year Reinforced Concrete' },
      { label: 'Traffic Throughput', before: '40,000 PCU / Day', after: '160,000+ PCU / Day' },
      { label: 'Storm Drainage Outfalls', before: 'Clogged Open Outlets', after: '16 Engineered Concrete Sluices' },
    ],
  },
  {
    id: 'd-chowk-trans',
    title: 'D-Chowk Grade-Separated Underpass, Islamabad',
    location: 'Jinnah Avenue / Constitution Avenue, Islamabad',
    category: 'Capital Grade Separation Transformation',
    beforeDescription: 'Surface bottleneck with heavy peak-hour VIP traffic stoppages, long vehicle queues stretching over 2 kilometers, and high accident incidence during monsoon rainstorms.',
    afterDescription: 'Engineered into a world-class signal-free grade-separated underpass corridor with continuous retaining diaphragm walls, subterranean automatic sump pumps, and Margalla-view aesthetics.',
    beforeImage: localImage0,
    afterImage: localImage3,
    metrics: [
      { label: 'Interchange Wait Delay', before: '25 Mins Peak Delay', after: '0 Seconds (Signal-Free)' },
      { label: 'Underpass Clear Height', before: 'No Grade Separation', after: '5.5m Standard Clearance' },
      { label: 'Drainage Reliability', before: 'Surface Flooding', after: '100% Concealed Sub-drainage' },
    ],
  },
  {
    id: 'quetta-liaquat-trans',
    title: 'Quetta Liaquat Bazaar & City Road Networks, Balochistan',
    location: 'Quetta Commercial Hub, Balochistan',
    category: 'Balochistan Commercial Modernization',
    beforeDescription: 'Narrow, unpaved gravel roads with exposed open sewage trenches, deep wheel ruts, pervasive dust clouds, and constant commercial vehicle gridlock.',
    afterDescription: 'Spearheaded by Rehman Construction founders: heavy-duty Class-A dense bituminous asphalt roadbed, subterranean reinforced concrete box storm sewers, and wide granite pedestrian walkways.',
    beforeImage: localImage0,
    afterImage: localImage4,
    metrics: [
      { label: 'Roadbed Pavement Quality', before: 'Loose Dust & Gravel', after: 'Dense Bituminous Macadam (DBM)' },
      { label: 'Drainage Infrastructure', before: 'Open Sewage Gutters', after: 'Concealed Heavy RCC Box Drains' },
      { label: 'Commercial Mobility', before: 'Complete Choke Point', after: 'Free-Flowing Urban Artery' },
    ],
  },
  {
    id: 'pindi-mall-road-trans',
    title: 'Rawalpindi Mall Road & Murree Highway Modernization',
    location: 'Rawalpindi Commercial / Murree Highway Axis',
    category: 'Twin Cities Arterial Overhaul',
    beforeDescription: 'Aged cracked asphalt with deep sinkholes, overflowing surface drains along the commercial strip, and gridlocked peak military and inter-city transit.',
    afterDescription: 'Reconstructed as a heavy-load 6-lane divided arterial boulevard with polymer-modified bitumen, underground stormwater interceptors, and impact-tested highway barriers.',
    beforeImage: localImage0,
    afterImage: localImage5,
    metrics: [
      { label: 'Rush Hour Congestion', before: '55 Mins Stagnant', after: '12 Mins Fluid Flow' },
      { label: 'Drainage Culverts', before: 'Open Damaged Ditches', after: '100% Subsurface Pipes' },
      { label: 'Structural Axle Rating', before: 'Class B (Failing)', after: 'Class A Super-Heavy' },
    ],
  },
  {
    id: 't-chowk-flyover-trans',
    title: 'T-Chowk Flyover & Trumpet Interchange, Rawat Islamabad',
    location: 'GT Road (N-5) & Islamabad Expressway Confluence',
    category: 'Elevated Highway Grade Separation',
    beforeDescription: 'The most notorious regional bottleneck in the country where Grand Trunk Road traffic collided with capital commuters, causing 3-hour standstills during holidays.',
    afterDescription: 'Completed multi-tier elevated trumpet flyover and grade separator with pre-stressed concrete box girders, seamless acceleration loops, and continuous free-flow merging.',
    beforeImage: localImage0,
    afterImage: localImage5,
    metrics: [
      { label: 'Interchange Capacity', before: '32,000 PCU / Day', after: '110,000+ PCU / Day' },
      { label: 'Elevated Span Length', before: 'Zero Elevation', after: '1.2 km Pre-Stressed Girders' },
      { label: 'Accident Rate', before: 'Frequent Surface Collisions', after: 'Zero Grade Crossings' },
    ],
  },
  {
    id: 'convention-corridor-trans',
    title: 'Islamabad Convention Center & Protocol Avenue',
    location: 'Constitution Avenue / Club Road, Islamabad',
    category: 'Capital Protocol Corridor',
    beforeDescription: 'Unpaved dirt verges, eroding gravel shoulders, and inadequate drainage during intense Margalla cloudbursts.',
    afterDescription: 'Pristine divided diplomatic avenue with concealed security conduits, hydraulic interlocking pavements, and architectural streetscapes facing the Margalla foothills.',
    beforeImage: localImage0,
    afterImage: localImage6,
    metrics: [
      { label: 'Avenue Right-of-Way', before: 'Narrow 2-Lane Track', after: '4-Lane Divided Boulevard' },
      { label: 'Security Ducting', before: 'None (Above Ground)', after: 'Dual Concrete Encasement' },
      { label: 'Drainage Resilience', before: 'Roadbed Inundation', after: 'Engineered Storm Chutes' },
    ],
  },
];
