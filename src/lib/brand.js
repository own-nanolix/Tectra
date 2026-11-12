// Brand facts read from the case study. Every figure, name and line on the site comes from here or from
// SOURCE.md. Do not add facts that are not in the case study.

export const BRAND = 'Tectra';
export const DESIGNER = 'Stan D., Rondesignlab and team';
export const FONT_NAME = 'Urbanist';

export const HEX = {
  blue: '#4093EC', yellow: '#FFB83D', sky: '#90C0F3', black: '#000000', white: '#FFFFFF',
  field: '#53A2F7', deep: '#006BEE', ink: '#2F2F2F', paper: '#FAFAFA', tile: '#F5F5F5', chip: '#F0F0F0',
  card: '#E9E9E9', app: '#DDDDDD', track: '#DFDFDF', red: '#E2383B',
  blueInk: '#145CB8', navy: '#0A2E63', muted: '#5E5E5E', redInk: '#B81F24', yellowInk: '#7A5000',
};

export const NAV = ['Dashboard', 'Progress', 'Timeline', 'Work areas'];
export const NAV_LINKS = [
  { label: 'Dashboard', id: 'lp-dashboard' },
  { label: 'Progress', id: 'lp-progress' },
  { label: 'Timeline', id: 'lp-timeline' },
  { label: 'Work areas', id: 'lp-work-areas' },
];

export const HERO = {
  title: ['Smart', 'Construction'],
  sub: 'Smart construction uses technology like AI and IoT to improve efficiency, safety, and sustainability.',
  cta: ["Let's try", 'Learn more'],
  login: 'Log in',
};

export const POSTER = {
  title: 'Build Smarter, Build Faster with Tectra',
  sub: 'Streamline project tracking, enhance collaboration, and minimize delays — all in one mobile app for construction teams.',
};

export const BILLBOARD = {
  title: 'Empowering Construction Teams with Real-Time Data and Collaboration',
  sub: 'Streamline your project management, enhance team efficiency, and reduce delays with Tectra — the mobile-first solution for modern construction.',
};

export const OVERVIEW = 'A smart construction app for tracking project completion, real-time updates, and on-site collaboration, helping teams manage tasks, specs, notes, and progress to reduce delays.';
export const ABOUT = [['Project', 'Tectra'], ['Category', 'B2B SaaS'], ['Location', 'USA'], ['Year', '2024']];

// Work card on the site view
export const KOMATSU = { name: 'Komatsu', dates: '10 - 14 Jan, 2025', value: '32%' };

// App figures
export const KPI = {
  overall: { label: 'Overall Completion', value: '66%', trend: '+2.4%', dir: 'up' },
  cross: { label: '2D Cross Section Z (ft)', value: '76%', trend: '+2.4%', dir: 'up', legend: 'Z (ft)' },
  progress: { label: 'Progres', value: '24%', trend: '-1.9%', dir: 'down', legend: 'Distance', date: '17 Dec' },
  details: { label: 'Details', value: '76%', trend: '+2.4%', dir: 'up', tone: 'blue' },
  notes: { label: 'Notes', value: '64%', trend: '-1.9%', dir: 'down', tone: 'yellow' },
  material: { label: 'Material', value: '32%', trend: '+8.1%', dir: 'up', tone: 'blue', legend: 'Normal' },
};
export const VOLUME = { from: '15.837 cu yd', to: '75.484 cu yd', segments: 8, filled: 4 };
export const CUT_FILL = {
  title: 'Cut and Fill',
  date: 'Date: 17 Dec, 2025 11:59PM',
  top: ['-15 ft', '-4.88 ft', '14 ft'],
  bottom: ['-20 ft', '-9.77 ft', '00 ft'],
  indicators: [['Cut:', '250,395 cu yd'], ['Fill:', '23,995 cu yd'], ['Net:', '226,400 cu yd']],
};

// Research (User Insights). from / to place the coloured band on the tick-bar chart (0..1).
export const INSIGHTS = [
  { value: '72%', label: 'teams struggle with fragmented data', tone: 'blue', from: 0.33, to: 0.6 },
  { value: '59%', label: 'Teams struggle with real-time updates', tone: 'blue', from: 0.19, to: 0.29 },
  { value: '64%', label: 'Workers say multiple tools slow down their progress', tone: 'yellow', from: 0.27, to: 0.41 },
];

// Results (the first card is printed twice in the case study)
export const RESULTS = [
  { label: 'Task completion rates', value: '32%', tone: 'blue' },
  { label: 'Task completion rates', value: '32%', tone: 'blue' },
  { label: 'Teams meet deadlines 25% faster', value: '25%', tone: 'yellow' },
];
export const EFFICIENCY = { value: '40%', label: 'By using Tectra, teams increased task efficiency and reduced delays significantly' };

export const PROBLEM = 'Fragmented data, slow task flow, and lack of real-time updates hindered productivity and caused project delays.';
export const SOLUTION = 'Real-time project updates, simplified task management, and centralized notes.';

// Quotes. `hl` is the phrase the designer set in blue. Quotes open with a quote mark and do not close.
export const QUOTES = {
  brief: { text: '"We need a smart construction app for tracking projects, real-time updates, and on-site collaboration, streamlining tasks, specs', hl: 'smart construction app for tracking projects,', name: 'John Taylor', role: 'CEO Tectra Construction', initials: 'JT' },
  fragmented: { text: '"Teams struggled with fragmented data. We created an intuitive app to simplify tracking and enhance collaboration.', hl: 'struggled with fragmented data.', name: 'Vitalii B.', role: 'UX Architect', initials: 'VB', steps: 2 },
  modular: { text: '"Previous tools were outdated. We redesigned them with a flexible, modular approach for better task prioritization.', hl: 'modular approach for better task prioritization.', name: 'Stan D.', role: 'CIO', initials: 'SD', steps: 1 },
  live: { text: '"Real-time updates were missing. We integrated live data for immediate access to relevant information.', hl: 'integrated live data', name: 'Mari S.', role: 'CX Designer', initials: 'MS', steps: 3 },
  research: { text: '"Through research, we identified that streamlining data access and simplifying navigation were crucial to improving project visibility and team efficiency.', hl: 'were crucial to improving project visibility', name: 'Vitalii B.', role: 'UX Architect', initials: 'VB' },
  palette: { text: "We decided to use a modern, minimalistic color palette that combines calming blues, energetic yellows, and sleek neutrals to highlight important data and guide the user's attention effectively.", hl: 'a modern, minimalistic color palette', name: 'Vitalii B.', role: 'UX Architect', initials: 'VB' },
  result: { text: '"Tectra helped us streamline project tracking and improve communication. Teams now complete tasks faster and with higher accuracy', hl: 'helped us streamline project tracking and improve communication.', name: 'John Taylor', role: 'CEO Tectra Construction', initials: 'JT' },
  next: { text: '"We plan to expand Tectra with adaptive tablet and desktop versions, ensuring teams can seamlessly transition between devices', hl: 'with adaptive tablet and desktop versions,', name: 'John Taylor', role: 'CEO Tectra Construction', initials: 'JT' },
};

// Section headings of the case study. `hl` is the blue phrase.
export const HEADINGS = {
  strategic: { chip: 'Strategic plan', text: 'Crafting a Smarter Future with Strategic Solutions for Every Challenge', hl: 'Every Challenge' },
  insights: { chip: 'User Insights', text: 'Identifying Key Pain Points in Construction Management for Success', hl: 'Pain Points' },
  problem: { chip: 'Problem and solution', text: 'Overcoming Key Obstacles in Project Management', hl: 'Key Obstacles' },
  mobile: { chip: 'Mobile app', text: 'Optimized for Every Device Access Projects Anytime', hl: 'Anytime' },
  landing: { chip: 'Landing page', text: "Creating a Seamless User Experience for Tectra's Web Interface", hl: 'Seamless' },
  web: { chip: 'Web version', text: 'Crafting a Smarter Future with Strategic Solutions for Every Challenge', hl: 'a Smarter Future' },
  result: { chip: 'Result' },
  next: { chip: 'Next step' },
};
export const STRATEGY_CHIPS = ['10 design strategies', '3 people', '3 design concepts'];
export const SCOPE_CHIPS = ['Research', 'Logo design', 'UI design', 'Branding'];
export const ROADMAP = { done: ['Branding', 'Desktop app', 'Mobile app', 'Landing page'], next: ['Responsive', 'Localiztion'], here: "You're here" };

export const MOBILE_SCREENS = [
  { title: 'Dashboard Overview', text: "This screen provides a high-level overview of the project's progress. It includes key data points like overall completion, material usage, and current work progress." },
  { title: 'Task & Progress Monitoring', text: 'Focused on tracking specific project tasks and progress, this screen displays detailed metrics such as completion percentage, work area' },
  { title: 'Cut and Fill Management', text: 'Here, users can view data on material cuts and fills, along with key indicators such as volume. The progress bar shows task completion.' },
];

// Landing page
export const FEATURES = {
  heading: 'Key Features for Efficient Project Management', hl: 'for Efficient Project Management',
  sub: 'Choose the best option for your creative journey.',
  rows: [
    ['Real-time progress tracking', 'Track every stage of construction in real-time.'],
    ['Mobile data access', 'Get updated information on the go.'],
    ['Task management system', 'Delegate tasks and monitor completion'],
  ],
  note: 'Enhance communication between team members and reduce miscommunication, ensuring that every task is tracked and completed on time',
  demo: 'Demo our dashboard',
};
export const PLANS = {
  heading: 'Choose the perfect plan for your construction project management needs', hl: 'perfect plan',
  sub: "Select the best option for your team's success",
  toggle: ['Monthly', 'Annually'],
  list: [
    { name: 'Basic Plan', text: 'Perfect for small teams or those just starting out, providing essential features to streamline your workflow.', price: null, cta: 'Register now', bullets: ['Track up to 20 tasks per month', 'Basic AI project assistant features', 'Basic cloud storage (5GB)', 'Community support'] },
    { name: 'Standard Plan', text: 'Designed for growing teams who want advanced features to improve efficiency', price: '$19', per: '/ month', cta: 'Get started', bullets: ['Track up to 200 tasks per month', 'Advanced AI project assistant features', 'Full template library access', '10GB cloud storage'] },
    { name: 'Premium Plan', text: 'Tailored for large teams needing unlimited task tracking, advanced features', price: '$39', per: '/ month', cta: 'Get started', bullets: ['Unlimited task tracking', 'Premium AI project assistant features', 'Exclusive template library access', '100GB cloud storage'] },
  ],
};
export const EMPOWER = ['We empower construction teams with tools', 'that improve', 'efficiency,', 'enhance collaboration'];
export const PALM = { heading: 'Construction Management in the Palm of Your Hand', sub: "Access your project's data, track tasks, and collaborate in real-time with our fully optimized mobile app, available anywhere, anytime" };
export const FAQ = {
  heading: 'Frequently Asked Questions',
  rows: ['What is the Basic plan for?', 'How does real-time progress tracking work?', 'Can I access the app on mobile devices?', 'What is the difference between Standard and Premium plans?', 'Is there customer support available?'],
  // Only the first answer is written in the case study. The others reuse lines the case study prints elsewhere.
  answers: [
    'the basic plan is designed for small teams or those just starting out, providing essential features for tracking tasks and basic project management.',
    'Track every stage of construction in real-time.',
    "Access your project's data, track tasks, and collaborate in real-time with our fully optimized mobile app, available anywhere, anytime",
    'Standard Plan: Designed for growing teams who want advanced features to improve efficiency. Premium Plan: Tailored for large teams needing unlimited task tracking, advanced features',
    'Community support',
  ],
};
// Footer columns as printed. The source's address and copyright lines were another company's placeholder
// text; they are replaced here with neutral placeholders.
export const FOOTER = {
  columns: [
    ['Product', ['Overview', 'Workplace Search', 'Assistant', 'Platform', 'Knowledge Management', 'Work Hub', 'Connectors', 'Security']],
    ['Solutions', ['All Teams', 'Engineering', 'Sales', 'Support', 'People', 'Knowledge Management']],
    ['Resources', ['Resources Center', 'Product Videos', 'Guides', 'Customer Stories', 'Blog', 'Webinars', 'Developers', 'Help Center']],
    ['Company', ['About', 'Careers', 'Press']],
  ],
  address: ['Street address', 'Suite', 'City, postcode', 'Country'],
  copyright: '© Tectra',
  legal: ['Terms', 'Privacy'],
};

// Type specimen as printed (including the designer's letter order)
export const CHARSET = ['ABCDEFGHIGKLMNOPQRSTUVWXYZabc', 'defghigklmopqrstuvwxyz1234567890.?!'];
export const WEIGHTS = [['Light', 300], ['Regular', 400], ['Medium', 500]];

// Badges in the case study
export const BADGES = [{ name: 'Emma Doe', role: 'Product Manager', tone: 'blue' }, { name: 'William John', role: 'Product Manager', tone: 'yellow' }];
