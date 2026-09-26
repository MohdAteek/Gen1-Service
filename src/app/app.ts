import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ServiceItem {
  id: string;
  category: 'repair' | 'cleaning' | 'install' | 'amc';
  title: string;
  shortDesc: string;
  fullDesc: string;
  priceStart: number;
  badge?: string;
  features: string[];
  icon: string;
}

interface DiagnosticProblem {
  id: string;
  title: string;
  symptom: string;
  possibleCause: string;
  urgency: 'HIGH' | 'MEDIUM' | 'EMERGENCY';
  recommendation: string;
  safetyTip: string;
  icon: string;
}

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  appliance: string;
}

interface FaqItem {
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
}

interface BrandCompany {
  id: string;
  name: string;
  tagline: string;
  specialty: string;
  accentColor: string;
  badge: string;
  logoClass: string;
}

interface Technician {
  name: string;
  role: string;
  experience: string;
  image: string;
  rating: number;
  jobsCompleted: number;
  specialties: string[];
  status: string;
  badge: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Application Information
  readonly appName = 'Saroj Gas Stove Repair Service Center';
  readonly appShortName = 'Saroj Service Center';

  // Certified Field Technicians
  readonly technicians: Technician[] = [
    {
      name: 'Rahul Sharma',
      role: 'Lead Gas Hob & Ignition Specialist',
      experience: '8+ Years Exp',
      image: '/technicians/tech-lead.jpg',
      rating: 4.95,
      jobsCompleted: 1840,
      specialties: ['Siemens StepFlame Hobs', 'Bosch FlameSelect', 'Faber Pulse Ignition', 'Manifold Pressure Testing'],
      status: 'On Standby in Anand Vihar',
      badge: 'Verified & Police Checked'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Master Burner & Valve Engineer',
      experience: '10+ Years Exp',
      image: '/technicians/tech-repair.jpg',
      rating: 4.98,
      jobsCompleted: 2420,
      specialties: ['Hafele & Elica Hobs', 'Brass Burner Descaling', 'Gas Valve Microswitches', 'PNG/LPG Jet Conversion'],
      status: 'Available in Ghaziabad',
      badge: 'Master Gas Technician'
    },
    {
      name: 'Amit Verma',
      role: 'Gas Leakage & Safety Inspector',
      experience: '7+ Years Exp',
      image: '/technicians/tech-safety.jpg',
      rating: 4.92,
      jobsCompleted: 1210,
      specialties: ['Electronic Gas Sniffer Testing', 'Crompton DuraHobs', 'Hindware Auto-Ignition', 'Kitchen Safety Audit'],
      status: '24/7 Rapid Response',
      badge: 'Safety Certified'
    }
  ];

  // Brand & Location State
  readonly primaryPhone = '7042121052';
  readonly secondaryPhone = '';
  readonly supportEmail = 'gullu123@gmail.com';

  selectedCity = signal('Ghaziabad');
  selectedLocality = signal('Anand Vihar');
  selectedBrand = signal('Siemens');
  
  isMobileMenuOpen = signal(false);
  isBookingModalOpen = signal(false);
  isSuccessModalOpen = signal(false);
  activeTab = signal<'all' | 'repair' | 'cleaning' | 'install' | 'amc'>('all');
  selectedProblemIndex = signal<number>(0);
  
  // Booking Form State
  bookingForm = {
    name: '',
    phone: '',
    serviceType: 'Siemens Hob Auto-Ignition Repair',
    date: 'Today',
    timeSlot: 'Within 60 Mins (Emergency)',
    address: 'Anand Vihar, Ghaziabad',
    problemNotes: '',
    couponCode: 'SAROJFIRST'
  };

  confirmedBookingId = signal<string>('');

  // Cities List
  readonly cities = [
    { name: 'Ghaziabad', active: true },
    { name: 'Noida', active: false },
    { name: 'Greater Noida', active: false },
    { name: 'Delhi', active: false },
    { name: 'Gurgaon', active: false },
    { name: 'Faridabad', active: false },
    { name: 'Meerut', active: false },
    { name: 'Muzaffarnagar', active: false },
    { name: 'Khatauli', active: false },
    { name: 'Roorkee-Haridwar', active: false }
  ];

  // Ghaziabad Localities
  readonly localities = [
    'Anand Vihar',
    'Kaushambi',
    'Vaishali (Sector 1-9)',
    'Vasundhara',
    'Indirapuram',
    'Surya Nagar',
    'Chander Nagar',
    'Ramprastha',
    'Brij Vihar',
    'Sahibabad',
    'Raj Nagar Extension',
    'Crossings Republik'
  ];

  // Supported Brands (9 Leading Companies with Dedicated Logos)
  readonly brands = [
    'Siemens',
    'Bosch',
    'Faber',
    'Glen',
    'Elica',
    'Hafele',
    'Gilma',
    'Crompton',
    'Hindware'
  ];

  readonly brandCompanies: BrandCompany[] = [
    {
      id: 'siemens',
      name: 'Siemens',
      tagline: 'German Engineering & iQ700 Gas Hobs',
      specialty: 'StepFlame technology, electronic pulse spark & gas valves',
      accentColor: '#00646E',
      badge: 'German Precision',
      logoClass: 'logo-siemens'
    },
    {
      id: 'bosch',
      name: 'Bosch',
      tagline: 'FlameSelect & Serie Built-in Hobs',
      specialty: 'Dual wok burners, flame failure safety & microswitch repair',
      accentColor: '#EA1B23',
      badge: 'Certified Parts',
      logoClass: 'logo-bosch'
    },
    {
      id: 'faber',
      name: 'Faber',
      tagline: 'Italian High-Flame Brass Stoves',
      specialty: 'Heavy brass burners, pulse generators & manifold seals',
      accentColor: '#E30613',
      badge: 'Original Spares',
      logoClass: 'logo-faber'
    },
    {
      id: 'glen',
      name: 'Glen',
      tagline: 'Modern Italian Styling & Toughened Glass Hobs',
      specialty: 'Forged brass multi-spark burners, ergonomic knobs & thermal glass hobs',
      accentColor: '#D9232E',
      badge: 'Innovative Tech',
      logoClass: 'logo-glen'
    },
    {
      id: 'elica',
      name: 'Elica',
      tagline: 'Designer Glass Cooktops & Hobs',
      specialty: 'Multi-flame crown calibration & sealed burner cups',
      accentColor: '#18181b',
      badge: 'Italian Design',
      logoClass: 'logo-elica'
    },
    {
      id: 'hafele',
      name: 'Hafele',
      tagline: 'Altius & Vortex Heavy Brass Ranges',
      specialty: 'Direct flame injection & flame-failure thermopile safety',
      accentColor: '#D40028',
      badge: 'Premium Luxury',
      logoClass: 'logo-hafele'
    },
    {
      id: 'gilma',
      name: 'Gilma',
      tagline: 'High Thermal Glass Stoves & Cooktops',
      specialty: 'Forged brass jets, simmer tuning & anti-leak valve assemblies',
      accentColor: '#E63946',
      badge: 'High Fuel Savings',
      logoClass: 'logo-gilma'
    },
    {
      id: 'crompton',
      name: 'Crompton',
      tagline: 'DuraHobs & Tri-Ring Brass Stoves',
      specialty: 'Thermal shock resistance & durable continuous spark igniters',
      accentColor: '#005A9C',
      badge: 'Trusted Quality',
      logoClass: 'logo-crompton'
    },
    {
      id: 'hindware',
      name: 'Hindware',
      tagline: 'Enliven & Italian Flame Technology',
      specialty: 'High-torque knobs, spark electrodes & LPG-PNG nozzle conversions',
      accentColor: '#C8102E',
      badge: 'Expert Service',
      logoClass: 'logo-hindware'
    }
  ];

  // Diagnostic Problems List
  readonly problems: DiagnosticProblem[] = [
    {
      id: 'ignition',
      title: 'Auto-Ignition Not Sparking / Continuous Clicking',
      symptom: 'Continuous clicking sound without fire, or no spark generated when pressing the knob.',
      possibleCause: 'Damp spark electrode, broken ceramic body, weak battery, or faulty pulse generator module.',
      urgency: 'HIGH',
      recommendation: 'Requires ignition electrode calibration or module replacement with OEM genuine spare parts.',
      safetyTip: 'Do not hold gas knob pressed if spark is not catching to prevent flammable gas accumulation.',
      icon: 'spark'
    },
    {
      id: 'flame',
      title: 'Uneven, Yellow or Flickering Weak Flame',
      symptom: 'Burner shows yellow sooty flame instead of crisp blue, taking 3x longer to cook food.',
      possibleCause: 'Air-to-gas ratio misalignment, grease choke in burner holes, or carbon in internal venturi.',
      urgency: 'MEDIUM',
      recommendation: 'Burner jet de-scaling and oxygen-shutter alignment for high thermal efficiency.',
      safetyTip: 'Yellow flame releases soot and carbon monoxide. Ensure ventilation and service promptly.',
      icon: 'flame'
    },
    {
      id: 'leakage',
      title: 'Gas Smell / Pipe or Joint Leakage',
      symptom: 'Sulfur or rotten egg smell near the hob counter, sizzling sound near the gas pipe joint.',
      possibleCause: 'Perished rubber washer, deteriorated flexible hose, cracked internal manifold pipe.',
      urgency: 'EMERGENCY',
      recommendation: 'Immediate safety shut-off & professional ultrasonic leak test with pressure testing.',
      safetyTip: 'DANGER: Turn off cylinder regulator immediately! Do NOT turn electrical switches on/off. Open windows.',
      icon: 'alert'
    },
    {
      id: 'knob',
      title: 'Jammed, Stiff, or Loose Gas Knob',
      symptom: 'Knob is hard to turn, does not push down for auto-spark, or slips off the valve stem.',
      possibleCause: 'Hardened cooking grease inside the brass valve core or broken inner D-ring spindle.',
      urgency: 'MEDIUM',
      recommendation: 'Valve core lubrication with high-temp grease or spindle stem replacement.',
      safetyTip: 'Do not use pliers to force rotate the knob as the internal gas spindle may snap and leak.',
      icon: 'gear'
    },
    {
      id: 'carbon',
      title: 'Heavy Carbon, Oil & Burnt Spill Buildup',
      symptom: 'Black crust around burner rings, sticky glass surface, clogged secondary air holes.',
      possibleCause: 'Daily cooking spills, milk boil-overs, and lack of professional deep degreasing.',
      urgency: 'MEDIUM',
      recommendation: 'Chemical-free ultrasonic deep degreasing and brass ring chemical polish.',
      safetyTip: 'Avoid harsh wire brushes on glass tops to prevent micro-fissures and sudden shattering.',
      icon: 'clean'
    }
  ];

  // Core Services
  readonly services: ServiceItem[] = [
    {
      id: 'hob-repair',
      category: 'repair',
      title: 'Multi-Brand Gas Stove & Hob Repair',
      shortDesc: 'Certified doorstep repair for ignition failure, gas leaks, weak flame, and burner choking with 100% genuine spare parts.',
      fullDesc: 'Expert doorstep diagnosis for Siemens, Bosch, Faber, Elica, Hafele, Gilma, Crompton, and Hindware built-in hobs and glass top gas stoves. We address faulty ignition modules, damaged flame valves, clogged gas jets, and loose knobs. Includes 90-day warranty on all replaced components.',
      priceStart: 299,
      badge: 'Most Popular',
      features: ['Same-day doorstep visit in 60 mins', '100% genuine OEM spare parts', '90-Day post-repair warranty', 'Full gas pressure & safety check'],
      icon: 'tool'
    },
    {
      id: 'electric-hob',
      category: 'repair',
      title: 'Electric & Induction Hob Repair',
      shortDesc: 'Specialized electronic repair for touch panels, power modules, heating coils, and induction error codes.',
      fullDesc: 'Facing heating drop or error codes on your Siemens, Bosch, or Faber electric hob? Certified technicians diagnose circuit boards, thermostat sensors, and heating coils to restore optimal thermal performance safely.',
      priceStart: 499,
      badge: 'Electronics Safe',
      features: ['PCB board component testing', 'Sensor calibration', 'Overheat protection check', 'Safe electrical load validation'],
      icon: 'zap'
    },
    {
      id: 'installation',
      category: 'install',
      title: 'Safe Gas Stove & Hob Installation',
      shortDesc: 'Precision countertop cutout alignment, leak-proof copper/braided pipeline fitting, and flame calibration.',
      fullDesc: 'Get your new built-in hob installed with millimeter precision. We verify granite countertop cutouts for Siemens, Bosch, Faber, Hafele, and all major brands, ensure airtight pipeline fittings, connect regulator hoses, and run complete burner flame tests.',
      priceStart: 399,
      badge: 'Certified Safe',
      features: ['Laser level countertop fitment', 'Pressure leak testing on joints', 'Regulator & hose setup', 'Burner ignition flame balancing'],
      icon: 'box'
    },
    {
      id: 'deep-cleaning',
      category: 'cleaning',
      title: 'Deep Cleaning & Carbon Degreasing',
      shortDesc: 'Restores your hob like new: removes stubborn oil, grease, carbon crust, and unchokes blocked jet holes.',
      fullDesc: 'Heavy cooking causes severe carbon buildup in burner ports and under the drip tray. Our deep cleaning strips away grime using appliance-safe degreasers, polishing brass burners and restoring sparkling blue flame.',
      priceStart: 499,
      badge: 'Efficiency Booster',
      features: ['Ultra-clean brass burner descaling', 'Glass top sparkle polishing', 'Under-counter grease removal', '30% improved gas fuel efficiency'],
      icon: 'sparkles'
    },
    {
      id: 'burner-repair',
      category: 'repair',
      title: 'Gas Hob Burner Repair & Replacement',
      shortDesc: 'Solves uneven flame, sputtering sound, and blackened cookware by repairing or replacing burner crowns.',
      fullDesc: 'Uneven flames waste LPG and blacken your utensils. We unclog burner ports, replace warped flame spreader rings, and calibrate internal nozzles for a steady, powerful cooking flame.',
      priceStart: 249,
      features: ['Heavy brass burner replacement', 'Nozzle orifice re-sizing', 'Venturi tube carbon cleanout', 'Uniform heat distribution guaranteed'],
      icon: 'flame'
    },
    {
      id: 'leakage-repair',
      category: 'repair',
      title: 'Emergency Gas Leakage Detection & Fix',
      shortDesc: '24/7 rapid emergency dispatch to detect and eliminate dangerous LPG/PNG pipeline and valve leaks.',
      fullDesc: 'Gas odor is a critical hazard. Our technicians arrive with sensitive electronic gas detectors, replace perished O-rings, re-seal joints, and certify your kitchen as 100% safe before leaving.',
      priceStart: 349,
      badge: '24/7 Priority',
      features: ['Electronic leak sniffing sensor', 'High-pressure rubber/SS pipe repair', 'Valve manifold joint resealing', 'Kitchen safety certificate issued'],
      icon: 'shield-alert'
    },
    {
      id: 'auto-ignition',
      category: 'repair',
      title: 'Auto-Ignition Spark Repair Service',
      shortDesc: 'Fixes clicking without fire, broken spark plugs, pulse generator units, and AC/battery power feeds.',
      fullDesc: 'Stop using matchsticks on modern hobs. We replace faulty ceramic spark pins, microswitches, pulse transformers, and battery enclosures to restore instant, effortless 1-click ignition.',
      priceStart: 349,
      features: ['Instant single-spark guarantee', 'Ceramic pin alignment', 'Pulse generator replacement', 'Wiring insulation protection'],
      icon: 'spark'
    },
    {
      id: 'uninstallation',
      category: 'install',
      title: 'Safe Hob Uninstallation & Relocation',
      shortDesc: 'Careful removal, pipeline sealing, and damage-free packing for home renovations or shifting.',
      fullDesc: 'Moving house or remodeling modular kitchen? We safely isolate gas supply, detach built-in clamps without cracking the granite, pack fragile glass tops, and cap pipes securely.',
      priceStart: 299,
      features: ['Zero damage to kitchen granite', 'Gas supply safe cap-off', 'Protective bubble wrap packing', 'Guidance for new cutout sizes'],
      icon: 'truck'
    },
    {
      id: 'amc-lifetime',
      category: 'amc',
      title: 'Lifetime Warranty Plan (LTW) & AMC',
      shortDesc: 'All-inclusive annual maintenance with 2 scheduled deep services, priority breakdown calls, and free parts.',
      fullDesc: 'Protect your kitchen investment with Saroj Gas Stove Repair Service Center. Enjoy uninterrupted cooking with periodic health checks, ultrasonic cleaning, zero-labor emergency breakdown visits, and heavily discounted genuine spare parts.',
      priceStart: 1299,
      badge: 'Best Value',
      features: ['2 Comprehensive yearly services', 'Unlimited emergency breakdown visits', 'Zero labor charges all year', 'Priority VIP technician dispatch'],
      icon: 'award'
    },
    {
      id: 'commercial-bhatti',
      category: 'repair',
      title: 'Gas Chulha & Commercial Bhatti Repair',
      shortDesc: 'Heavy-duty maintenance for restaurant kitchens, cloud kitchens, dhabas, hostels, and canteens.',
      fullDesc: 'High-flame commercial bhattis and multi-burner ranges demand rugged, dependable maintenance. We service high-pressure regulators, cast iron burners, and industrial manifold lines for commercial kitchens.',
      priceStart: 599,
      badge: 'Commercial Grade',
      features: ['Commercial high-pressure tuning', 'Heavy cast iron burner servicing', 'Bulk pipeline compliance check', 'Fast commercial downtime support'],
      icon: 'chef'
    }
  ];

  // Testimonials
  readonly testimonials: Testimonial[] = [
    {
      name: 'Dr. Alok Verma',
      location: 'Sector 31, Anand Vihar, Ghaziabad',
      rating: 5,
      date: '3 days ago',
      review: 'My 4-burner Siemens glass hob auto-ignition failed right before our anniversary dinner party. Called Saroj Gas Stove Repair Service Center at 5 PM, technician Rahul reached in 45 minutes, replaced the ignition module, cleaned all nozzles, and it was working like brand new by 6:15 PM. Super impressed!',
      appliance: 'Siemens 4-Burner Glass Hob'
    },
    {
      name: 'Pooja Sharma',
      location: 'Kaushambi, Near Anand Vihar Border',
      rating: 5,
      date: '1 week ago',
      review: 'Had a slight gas smell near the knob of our Bosch built-in hob. The Saroj Gas Stove Repair technician arrived with a digital gas sensor, immediately located a damaged manifold seal, and fixed it safely. Great professionalism and reasonable rates.',
      appliance: 'Bosch 3-Burner Built-in Hob'
    },
    {
      name: 'Rajat Singhal',
      location: 'Vaishali Sector 4, Ghaziabad',
      rating: 5,
      date: '2 weeks ago',
      review: 'Booked the Deep Cleaning + Burner Tune-up service for our Faber cooktop. The yellow lazy flame got converted into a roaring blue flame! Utensils are no longer turning black. Highly recommend their AMC plan too.',
      appliance: 'Faber Cooktop 3 Burner'
    }
  ];

  // Frequently Asked Questions
  readonly faqs: FaqItem[] = [
    {
      question: 'What are the common problems found in Gas Stoves & Kitchen Hobs?',
      answer: 'Common issues include: (1) Auto-ignition continuous clicking without lighting, (2) Yellow, weak, or uneven flickering flame due to clogged burner jets, (3) Pungent gas smell indicating deteriorated seals or pipe cracks, (4) Jammed or slipping control knobs, and (5) Carbon crust choking secondary air holes. Saroj Gas Stove Repair Service Center certified technicians safely resolve these at your doorstep within 60-90 minutes.',
      category: 'General',
      isOpen: true
    },
    {
      question: 'How much does Gas Stove or Hob servicing cost in Anand Vihar, Ghaziabad?',
      answer: 'Our transparent pricing starts with a nominal inspection charge of ₹199 (adjusted against repair bill). Basic tune-ups start at ₹299, auto-ignition module repairs start around ₹349, and complete chemical-free deep degreasing is ₹499. You receive an upfront written estimate before any work begins, with zero hidden charges.',
      category: 'Pricing',
      isOpen: false
    },
    {
      question: 'Do you offer same-day service for Siemens, Bosch, Faber, Elica, Hafele & other brands?',
      answer: 'Yes! We maintain dedicated local mobile service vans across Anand Vihar, Kaushambi, Vaishali, Indirapuram, and surrounding Ghaziabad areas for Siemens, Bosch, Faber, Elica, Hafele, Gilma, Crompton, and Hindware. In emergency cases (such as gas leaks or cooking disruptions), our certified technician reaches your doorstep within 60 minutes.',
      category: 'Service',
      isOpen: false
    },
    {
      question: 'Are the replacement spare parts 100% genuine OEM?',
      answer: 'Absolutely. We only use 100% brand-authentic, high-grade brass burners, OEM ignition modules, heavy-duty spark electrodes, and certified high-pressure gas valves for all supported brands. Every spare part replaced comes with an official 90-day Saroj Gas Stove Repair Service Center replacement warranty.',
      category: 'Parts & Warranty',
      isOpen: false
    },
    {
      question: 'Does Saroj Gas Stove Repair Service Center provide Annual Maintenance Contracts (AMC)?',
      answer: 'Yes, our popular Lifetime Warranty Plan (LTW) and AMC packages cover 2 comprehensive scheduled deep services per year, unlimited free breakdown visits, and free labor throughout the year. It keeps your appliance operating at peak efficiency and prevents expensive sudden breakdowns.',
      category: 'Plans',
      isOpen: false
    },
    {
      question: 'My stove has an uneven flame or a gas smell — what should I do right now?',
      answer: 'If you smell gas: Immediately turn off the main cylinder regulator / PNG gas valve. Do NOT turn any electrical switch ON or OFF. Do NOT use matches or lighters. Open all kitchen doors and windows for rapid ventilation. Then step outside the kitchen and immediately call our 24/7 emergency dispatch helpline at 7042121052.',
      category: 'Emergency',
      isOpen: false
    }
  ];

  // Long-tail SEO search queries retained for search indexing & local discoverability
  readonly seoKeywords = [
    'Saroj Gas Stove Repair Service Center Anand Vihar Ghaziabad',
    'Siemens Gas Stove & Hob repair service in Anand Vihar, Ghaziabad',
    'Bosch Kitchen Hob service center in Anand Vihar, Ghaziabad',
    'Faber Gas Stove & Gas hob service center in Anand Vihar, Ghaziabad (NCR)',
    'Glen Gas Stove & Kitchen Hob repair service in Anand Vihar, Ghaziabad',
    'Elica kitchen hob repair service center in Anand Vihar, Ghaziabad',
    'Hafele built-in hob repair and service in Anand Vihar, Ghaziabad',
    'Gilma gas stove repair service center in Anand Vihar, Ghaziabad',
    'Crompton kitchen hob and stove service in Anand Vihar, Ghaziabad',
    'Hindware gas hob repair service center in Anand Vihar, Ghaziabad',
    'Kitchen hob auto ignition repair in Anand Vihar, Ghaziabad',
    'Gas stove gas leaking problem solution in Anand Vihar, Ghaziabad',
    'Multi-brand gas stove & hob replacement in Anand Vihar, Ghaziabad',
    'Gas stove top keeps clicking repair in Anand Vihar, Ghaziabad',
    'Hob not working problem repairing services in Anand Vihar, Ghaziabad',
    'Gas burner won\'t light repairing in Anand Vihar, Ghaziabad',
    'Gas stove & hob gas smell problem repairing center in Anand Vihar, Ghaziabad',
    'Gas stove weak burner flames issue repairing in Anand Vihar, Ghaziabad'
  ];

  // Filtered Services computed signal
  filteredServices = computed(() => {
    const tab = this.activeTab();
    if (tab === 'all') return this.services;
    return this.services.filter(s => s.category === tab);
  });

  // Current active problem
  selectedProblem = computed(() => {
    return this.problems[this.selectedProblemIndex()] || this.problems[0];
  });

  // Actions
  setCity(cityName: string) {
    this.selectedCity.set(cityName);
  }

  setLocality(localityName: string) {
    this.selectedLocality.set(localityName);
    this.bookingForm.address = `${localityName}, ${this.selectedCity()}`;
  }

  setBrand(brandName: string) {
    this.selectedBrand.set(brandName);
    this.bookingForm.serviceType = `${brandName} Hob Auto-Ignition Repair`;
  }

  setTab(tab: 'all' | 'repair' | 'cleaning' | 'install' | 'amc') {
    this.activeTab.set(tab);
  }

  selectProblem(index: number) {
    this.selectedProblemIndex.set(index);
  }

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  openBookingModal(prefilledService?: string) {
    if (prefilledService) {
      this.bookingForm.serviceType = prefilledService;
    }
    this.isBookingModalOpen.set(true);
  }

  closeBookingModal() {
    this.isBookingModalOpen.set(false);
  }

  closeSuccessModal() {
    this.isSuccessModalOpen.set(false);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  handleBookingSubmit() {
    if (!this.bookingForm.phone || this.bookingForm.phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number so our technician can contact you.');
      return;
    }

    // Generate random booking reference ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    this.confirmedBookingId.set(`SGSR-${randomNum}`);
    
    this.isBookingModalOpen.set(false);
    this.isSuccessModalOpen.set(true);
  }

  callNow() {
    window.location.href = `tel:${this.primaryPhone}`;
  }

  openWhatsApp() {
    const text = encodeURIComponent(`Hi Saroj Gas Stove Repair Service Center, I need urgent service for my ${this.selectedBrand()} Hob/Gas Stove in ${this.selectedLocality()}, ${this.selectedCity()}. Please share details.`);
    window.open(`https://wa.me/91${this.primaryPhone}?text=${text}`, '_blank');
  }
}
