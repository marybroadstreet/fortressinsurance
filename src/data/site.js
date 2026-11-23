// Single source of truth for business details and site content.
// Content carried over from the current fortressinsurancesolutions.com.

export const SITE_URL = 'https://fortressinsurancesolutions.com';

export const BUSINESS = {
  name: 'Fortress Insurance Solutions',
  tagline: 'Protecting Futures, Building Relationships',
  phoneDisplay: '(803) 272-4585',
  phoneHref: 'tel:+18032724585',
  phoneE164: '+1-803-272-4585',
  email: 'info@fortressinsurancesolutions.com',
  street: '708 Lafayette Avenue, Suite 2',
  city: 'Camden',
  region: 'SC',
  postalCode: '29020',
  hoursDisplay: [
    ['Monday – Friday', '9:00 AM – 5:00 PM'],
    ['Saturday & Sunday', 'Closed'],
  ],
  geo: { lat: 34.2480775, lng: -80.6099676 },
  mapUrl: 'https://g.page/fortress-insurance-solutions?share',
  portalUrl: 'https://customerservice.agentinsure.com/EzlynxCustomerService/fortressinssol/Account/LogIn',
  chatUrl: 'https://m.me/FortressInsuranceSolutions',
  facebook: 'https://www.facebook.com/FortressInsuranceSolutions',
  linkedin: 'https://www.linkedin.com/in/tana-marshall-9315b19a/',
  travelUrl: 'https://tmetravelinsurance.com/?referrer=rmw115',
};

/* ---------- Coverage (product) pages ---------- */
export const PRODUCTS = [
  {
    key: 'auto',
    name: 'Auto Insurance',
    short: 'Auto',
    path: '/products/auto-insurance',
    quotePath: '/form/auto-insurance-quote',
    icon: 'auto',
    image: 'product-auto',
    imageAlt: 'A smiling driver buckled in behind the wheel',
    title: 'Auto Insurance in Camden, SC | Fortress Insurance',
    description:
      'Auto insurance in Camden, SC from an independent agency. We compare many carriers to tailor car, truck, SUV and business auto coverage at a good price.',
    summary:
      'As an independent agency, Fortress Insurance Solutions has access to many different insurance carriers so that we can tailor the right protection plan for your unique auto insurance needs.',
    body: [
      'As an independent agency, Fortress Insurance Solutions has access to many different insurance carriers so that we can tailor the right protection plan for your unique auto insurance needs. Whether you live in your car because it’s your mobile office and kid taxi cab, or you bring your most prized possession out of the garage for a Sunday drive, Fortress Insurance Solutions has you covered!',
      'Your car, truck, or SUV is more than just your transportation from place to place. Many of us spend excessive time in our vehicles doing business, traveling for work and pleasure, or carting kids from one activity to another. And let’s admit it, we love our ride! Protect one of the most important parts of your life with auto insurance from Fortress Insurance Solutions.',
      'While protecting your own property may be your priority before an accident, there’s more to auto insurance than replacing or repairing your car, truck, or SUV. A good auto insurance policy also protects you if you cause an accident. Don’t risk losing everything you’ve worked for in a lawsuit because you caused an auto accident. If you are faulted in an accident, a good auto insurance policy will pay for your medical bills and the other driver’s medical bills. It will also pay for other expenses like a rental car and any repairs to the other driver’s car. Fortress Insurance understands the risks of vehicle ownership and will help you find the right amount of insurance to protect you.',
      { heading: 'Why Fortress?' },
      'Fortress Insurance Solutions works hard to form relationships with the top auto insurance carriers in the industry for YOU. We’re not a one size fits all company, but a company that works to find YOU the auto insurance which best fits your needs and budget — good auto insurance at a good price.',
    ],
    listTitle: 'We specialize in auto insurance including:',
    list: ['Commercial / Business Auto', 'Trucks', 'SUVs', 'Cars', 'Farm Auto', 'Liability'],
  },
  {
    key: 'home',
    name: 'Homeowners Insurance',
    short: 'Homeowners',
    path: '/products/homeowners-insurance',
    quotePath: '/homeowners-insurance-request-quote',
    icon: 'home',
    image: 'product-home',
    imageAlt: 'A two-story family home at dusk with a green front lawn',
    title: 'Homeowners Insurance in Camden, SC | Fortress Insurance',
    description:
      'Homeowners insurance tailored to your home. Fortress Insurance compares carriers, covers replacement value, and helps you choose the right liability protection.',
    summary:
      'Did you know, on average, a home is the most expensive purchase most Americans make in their lifetime? We have access to many homeowners insurance carriers to provide the right protection for your unique needs.',
    body: [
      'Did you know, on average, a home is the most expensive purchase most Americans make in their lifetime? As an independent agency, Fortress Insurance Solutions has access to many different homeowners insurance carriers to provide the right protection for your unique needs. No two homes are alike, and, therefore, no two risk protection plans should be alike either. Let Fortress Insurance Solutions tailor a homeowner’s insurance plan for you today!',
      'At Fortress Insurance Solutions, we make sure your homeowner’s policy covers your home’s replacement value in the event of damage or the total loss of your home. It can be difficult to understand the difference between the replacement value and your home’s market value. The market value of your home is what another buyer is willing to pay for it. The replacement value is what it will actually cost to rebuild or restore your home to its condition before the loss or damage occurred. Replacement value can be higher than market value due to many factors such as the cost of building materials and labor.',
      { heading: 'Personal Liability' },
      'One of the most important protections offered in your homeowner’s insurance is personal liability coverage. This coverage protects you and your loved ones against lawsuits for injury or property damage you may cause to another person away from home. It also pays for injuries or damages to another person or their property caused by your pets. In addition, personal liability protection pays for the cost of defending you or your loved ones in court should a lawsuit be filed against you. There is no deductible for personal liability claims before the policy begins paying in the event of a claim.',
      'It’s very important to buy enough personal liability coverage to protect your hard-won assets like your home, business, investments, and retirement accounts. At Fortress, we assess your risk and recommend the right amount of personal liability coverage needed. If you own property or have investment accounts (including retirement savings) worth a great deal more than the amount your personal liability will pay, we recommend an umbrella policy to protect you against losing what you’ve worked so hard to build.',
      { heading: 'Valuables & Guests' },
      'Other important things to consider when purchasing homeowner’s insurance are the valuables in your home and possible injury to guests visiting your home. Protect the valuables in your home, such as jewelry, computer equipment, and antiques, from theft or damage. Your homeowner’s insurance also protects you financially if a guest is injured in your home, or if you own a pool, hot tub, trampoline, or anything else where guests could be hurt.',
      'Keep in mind that if you don’t have insurance to pay for these types of losses, very often you end up having to sell what you own or taking money out of investment or retirement accounts to pay if you are found at fault.',
    ],
    listTitle: 'We specialize in homeowners insurance:',
    list: ['Personal Liability', 'Umbrella Liability', 'Valuables', 'Other structures: workshops, fences, etc.'],
  },
  {
    key: 'recreational',
    name: 'Boat, Motorcycle & RV Insurance',
    h1: 'Insurance for Your Boat, Motorcycle, RV, and More',
    short: 'Recreational',
    path: '/products/insurance-your-boat-motorcycle-rv-and-more',
    quotePath: '/recreational-insurance',
    icon: 'recreational',
    image: 'product-recreational',
    imageAlt: 'A family enjoying a day out on their boat',
    title: 'Boat, Motorcycle & RV Insurance | Fortress Insurance',
    description:
      'Specialty vehicle insurance for boats, motorcycles, RVs, ATVs, campers and horse trailers. Protect your toys, your passengers and your friends with Fortress.',
    summary:
      'You work hard so you can play hard! If your fun involves “toys” like a boat, motorcycle, RV, or other specialty vehicles, we have the coverage you need.',
    body: [
      { heading: 'Specialty Vehicle Insurance' },
      'You work hard so you can play hard! At Fortress Insurance Solutions, we do too! If your fun involves “toys” like a boat, motorcycle, RV, or other specialty vehicles, we have the coverage you need! You might not know that these types of vehicles aren’t like your car or truck when it comes to insurance. Why? Using those recreational vehicles is considered a high-risk activity, and you need a different insurance policy to protect yourself and others when enjoying them.',
      'Let Fortress Insurance Solutions help you find the right insurance to ensure the toys you love are covered. Make sure they can be replaced or repaired in the event of theft, damage, or worse. In addition to coverage for theft or damage, insurance to cover medical bills in the event of an accident is a must-have.',
      'One of the quickest ways to ruin a weekend (and a friendship) is to have a friend get hurt while enjoying your boat, motorcycle, or RV. Without insurance, you may end up having to pay their medical bills out of your own pocket! Or worse, you could find yourself in a lawsuit and possibly lose much more than your friendship. Don’t take that risk! Let Fortress Insurance Solutions find the specialty vehicle insurance you need to protect you, your toys, and your friends.',
    ],
    listTitle: 'Specialty vehicles we cover:',
    list: ['Motorcycles', 'Boats', 'RVs', 'ATVs', 'Campers', 'Horse trailers, including living-quarters trailers'],
  },
  {
    key: 'farm',
    name: 'Farm Insurance',
    short: 'Farm',
    path: '/products/farm-insurance',
    quotePath: '/farm-insurance',
    icon: 'farm',
    image: 'product-farm',
    imageAlt: 'A horse standing at a white wooden rail fence',
    title: 'Farm Insurance in South Carolina | Fortress Insurance',
    description:
      'Farm insurance for hobby farms, family ranches and commercial agriculture. Protect livestock, equipment, barns and structures with Fortress Insurance Solutions.',
    summary:
      'Whether you live on a farm or own a hobby farm, family ranch, or manage commercial agriculture, Fortress Insurance Solutions has the farm insurance you need.',
    body: [
      'Whether you live on a farm or own a hobby farm, family ranch, or manage commercial agriculture, Fortress Insurance Solutions has the farm insurance you need. Protect the livestock, equipment, and structures that keep your farm running. At Fortress Insurance Solutions, we work with you to assess your risk and find you the best policy to protect YOU.',
      'Farmers know nothing is more frustrating, time-consuming, or costly than catastrophic damage to the farm equipment that helps them make a living or enjoy the living they have made. When damages occur, you want the right coverage to replace your equipment and a claims service that will not leave you waiting for days or weeks. We can even help protect you against damage to your farm due to flood, fire, wind, or hurricanes — losses that can be devastating to an agri-business or homestead farm. Fortress Insurance Solutions is here to give you peace of mind before a loss and stellar customer service after a loss.',
      'At Fortress Insurance, we understand the unique needs of farmers, horsemen, and hobby farmers. Our rural farm upbringing and current hobbies include time spent outdoors showing and competing with our horses. You can trust Fortress Insurance Solutions with your agri-insurance needs.',
    ],
    listTitle: 'We specialize in farm insurance:',
    list: ['Property', 'Barns, Stables, Grain Bins, Milk Parlours', 'Tractors, Combines, Backhoes & other farm equipment', 'Livestock', 'Farm Umbrella', 'Farm & Agri-businesses'],
  },
  {
    key: 'commercial',
    name: 'Commercial Insurance',
    short: 'Commercial',
    path: '/insurance-solutions/commercial',
    quotePath: '/commercial-insurance',
    icon: 'commercial',
    image: 'product-commercial',
    imageAlt: 'A café owner holding a tablet in the doorway of her restaurant',
    title: 'Commercial Insurance in Camden, SC | Fortress Insurance',
    description:
      'Business insurance built around your company: general liability, commercial auto, workers’ comp, business owners packages and more from Fortress Insurance.',
    summary:
      'You’ve worked your whole life building a business. Commercial insurance protects your people, your property, and your business operations.',
    body: [
      'You’ve worked your whole life building a business. Make sure to protect everything you’ve worked for with the right kind and amount of insurance. Commercial insurance protects your people, your property, and your business operations. It is as unique as the business it protects. At Fortress Insurance Solutions, we will analyze your unique business situation to determine the coverage you need. We will then work with you to build a solution to keep you and your business protected from unforeseen losses, accidents, or damages to third parties such as customers or suppliers.',
      { heading: 'General Liability' },
      'A commercial general liability policy protects your business from financial loss if you are found responsible for property damage, personal, or advertising injury to a third party such as a customer or supplier. It also protects in the event a business is found liable for a non-professional act of negligence.',
      { heading: 'Commercial Auto' },
      'Commercial auto insurance covers cars, trucks, motorcycles, and other road vehicles owned by or operated within a business. It provides financial protection against physical damages or injuries from traffic accidents and may offer protection in the event your commercial vehicles are lost, stolen, or damaged in some other way besides a traffic accident.',
      { heading: 'Workers’ Compensation' },
      'Workers’ compensation protects your business in the event one of your employees gets hurt on the job. In most states, including South Carolina, workers’ compensation insurance is required by law.',
      { heading: 'Business Owners Package' },
      'A Business Owner’s Package (BOP) is an insurance policy that combines protection from all major property and liability risks in one package. It typically combines all the basic coverages required by a business owner into one bundle and is sold at a premium less than the total cost of buying these coverages individually. Business Owner Policies usually target small to medium-sized businesses and typically contain business interruption coverage, which provides reimbursement for up to one year of lost revenues resulting from an insured property loss.',
    ],
    listTitle: 'Other types of business insurance:',
    list: ['Commercial Umbrella', 'Errors and Omissions (Professional Liability)'],
  },
  {
    key: 'life',
    name: 'Life Insurance',
    short: 'Life',
    path: '/products/life-insurance',
    quotePath: '/life-insurance',
    icon: 'life',
    image: 'product-life',
    imageAlt: 'A smiling mom and dad, each carrying one of their children on their back',
    title: 'Life Insurance in Camden, SC | Fortress Insurance',
    description:
      'Term and permanent life insurance tailored to your family’s needs and budget. Fortress Insurance Solutions guides you to the right coverage with personal service.',
    summary:
      'Life insurance protects your family should something tragic happen to you — the grief of losing a loved one is heavy enough without worry about losing one’s home or way of life.',
    body: [
      'At Fortress Insurance Solutions we understand the importance of safeguarding your loved ones’ future. Our life insurance offerings are designed to provide comprehensive coverage, ensuring that you and your family have the financial protection you deserve.',
      'We offer a range of life insurance products tailored to meet your specific needs. Whether you’re looking for term life insurance for affordable coverage over a set period or permanent life insurance with lifelong protection and potential cash value accumulation, we have the right solution for you. Our experienced team of insurance professionals is dedicated to guiding you through the process, helping you make informed decisions that align with your financial goals.',
      'What sets Fortress Insurance Solutions apart is our commitment to personalized service and customer satisfaction. We take the time to understand your unique circumstances, ensuring that the life insurance coverage you choose reflects your current situation and future aspirations. With competitive premiums and flexible policy options, we strive to make life insurance accessible to individuals and families from all walks of life. Contact Fortress Insurance Solutions today to discuss your options.',
    ],
    listTitle: 'Life insurance options:',
    list: ['Term life insurance', 'Permanent life insurance'],
  },
  {
    key: 'pet',
    name: 'Pet Insurance',
    short: 'Pet',
    path: '/products/pet-insurance',
    quotePath: '/pet-insurance',
    icon: 'pet',
    image: 'product-pet',
    imageAlt: 'A woman sitting with a small dog on her lap',
    title: 'Pet Insurance for Dogs & Cats | Fortress Insurance',
    description:
      'Pet insurance that fits your budget. Fortress Insurance compares accident-and-illness and accident-only plans so surprise vet bills never stand in the way of care.',
    summary:
      'You treat your pet like family. At Fortress Insurance, we believe you should protect your pet like family, too.',
    body: [
      'You treat your pet like family. At Fortress Insurance, we believe you should protect your pet like family, too. Out of pocket vet expenses are rarely planned for and are often costly, making an already stressful event even more difficult. With pet insurance from Fortress Insurance, you can trust that your whole family is protected — even the furry members!',
      'Rather than pay out of pocket for costly veterinarian bills when they arise suddenly, many pet owners are choosing to pay a monthly rate that fits their budget. By doing so, you can ensure that when those surprise vet bills come up, you are able to afford the care that your pet deserves.',
      'There are several insurance options for pet owners to consider. Accident and illness policies cover treatment for pets in case of emergency procedures in addition to regular illnesses and prescription medication for your animal. In contrast, accident-only policies only cover treatment in case of emergency incidents for your pet. At Fortress Insurance, we will discuss your pet’s needs and your budget in order to find the plan that works best for your family.',
      'It’s no surprise that the cost of veterinary care is expensive. That’s why Fortress Insurance is proud to assist pet parents in affording the care that their pets deserve. Let us help you give your pet the care they deserve.',
    ],
    listTitle: 'Plan types we compare:',
    list: ['Accident & illness', 'Accident only'],
  },
];

export const productByKey = Object.fromEntries(PRODUCTS.map((p) => [p.key, p]));

/* ---------- Home page coverage cards (order from current site) ---------- */
export const COVERAGE_CARDS = [
  { icon: 'travel', name: 'Travel Insurance', href: BUSINESS.travelUrl, external: true,
    text: 'Travel insurance offers peace of mind and financial protection against unforeseen circumstances — from medical emergencies to trip cancellations, lost luggage and flight delays.' },
  { icon: 'auto', name: 'Auto Insurance', href: '/products/auto-insurance', text: productByKey.auto.summary },
  { icon: 'home', name: 'Homeowners Insurance', href: '/products/homeowners-insurance',
    text: 'On average, a home is the most expensive purchase most Americans make. We compare many homeowners carriers to provide the right protection for your unique needs.' },
  { icon: 'farm', name: 'Farm Insurance', href: '/products/farm-insurance',
    text: 'Hobby farm, family ranch, or commercial agriculture — protect the livestock, equipment, and structures that keep your farm running.' },
  { icon: 'commercial', name: 'Commercial Insurance', href: '/insurance-solutions/commercial',
    text: 'Commercial insurance protects your people, your property, and your business operations — built as uniquely as the business it protects.' },
  { icon: 'recreational', name: 'Recreational Insurance', href: '/products/insurance-your-boat-motorcycle-rv-and-more',
    text: 'You work hard so you can play hard! Boats, motorcycles, RVs and other “toys” need their own coverage — and we have it.' },
  { icon: 'life', name: 'Life Insurance', href: '/products/life-insurance', text: productByKey.life.summary },
  { icon: 'pet', name: 'Pet Insurance', href: '/products/pet-insurance',
    text: 'You treat your pet like family. Protect them like family, too — without surprise vet bills standing in the way of care.' },
];

/* ---------- Hero slides (from current site's scrolling header) ---------- */
export const SLIDES = [
  { key: 'home', label: 'Home', title: 'Home Insurance', image: 'hero-home', alt: 'A family standing in front of their house',
    text: 'A home is often a family’s biggest and most significant investment. You build a life and memories in your home, and it protects you and all that you value. We can help you create a home insurance package to protect that investment.',
    href: '/products/homeowners-insurance', quote: '/homeowners-insurance-request-quote' },
  { key: 'auto', label: 'Auto', title: 'Auto Insurance', image: 'hero-auto', alt: 'A smiling woman leaning out the driver’s window of her car',
    text: 'New car? New driver? Better rates? The right auto insurance protection makes sure that no matter what the road ahead brings, you can keep rolling. We’ll help you find the best package to meet your needs.',
    href: '/products/auto-insurance', quote: '/form/auto-insurance-quote' },
  { key: 'commercial', label: 'Commercial', title: 'Commercial Insurance', image: 'hero-commercial', alt: 'A smiling bakery owner holding an Open sign at the shop door',
    text: 'You’ve built your business — protect it with the right insurance.',
    href: '/insurance-solutions/commercial', quote: '/commercial-insurance' },
  { key: 'farm', label: 'Farm', title: 'Farm Insurance', image: 'hero-farm', alt: 'Horses running in a green pasture beside a wooden rail fence',
    text: 'Farms are often generational investments of money, time, and sacrifice. Let us help you build a package to protect that investment, no matter the storms that may come.',
    href: '/products/farm-insurance', quote: '/farm-insurance' },
  { key: 'boat', label: 'Boat', title: 'Boat Insurance', image: 'hero-boat', alt: 'A family relaxing aboard their boat on the lake',
    text: 'Set sail with peace of mind. Whether you’re cruising the open waters or anchored at your favorite spot, we offer tailored coverage to protect your boat and your adventures.',
    href: '/products/insurance-your-boat-motorcycle-rv-and-more', quote: '/boat-insurance' },
  { key: 'motorcycle', label: 'Motorcycle', title: 'Motorcycle Insurance', image: 'hero-motorcycle', alt: 'A motorcyclist pulled over on an open road at sunset',
    text: 'From weekend cruises to long road trips, we provide the coverage you need to keep you protected on every ride — no matter where the road leads.',
    href: '/products/insurance-your-boat-motorcycle-rv-and-more', quote: '/motorcycle-insurance' },
  { key: 'rv', label: 'RV', title: 'RV Insurance', image: 'hero-rv', alt: 'A family playing guitar and picnicking beside their RV',
    text: 'Whether you’re hitting the open road or parked for a weekend getaway, we offer comprehensive coverage to keep you and your RV safe, wherever the journey takes you.',
    href: '/products/insurance-your-boat-motorcycle-rv-and-more', quote: '/rv-and-atv-insurance' },
  { key: 'classic-car', label: 'Classic Car', title: 'Classic Car Insurance', image: 'hero-classic-car', alt: 'A restored red classic coupe',
    text: 'We love the classics — and we know you do too. Let us help you protect your investment.',
    href: '/classic-car-insurance', quote: '/classic-car-insurance' },
];

/* ---------- Quote request pages (existing URLs kept) ---------- */
export const QUOTES = [
  { key: 'auto', name: 'Auto', h1: 'Auto Insurance Quote', path: '/form/auto-insurance-quote', form: 'auto', product: 'auto',
    intro: 'Tell us about your drivers and vehicles and we’ll shop our carriers for the right coverage at a good price. It takes about five minutes.' },
  { key: 'home', name: 'Home', h1: 'Homeowners Insurance – Request a Quote', path: '/homeowners-insurance-request-quote', product: 'home',
    intro: 'Protect your investment in your home. Damages from storms, fire, or other disasters can create havoc and damage the most important investment you have. Homeowners insurance will help you recover, replace, and get back to normal quickly. Let us help you make sure you are covered.' },
  { key: 'farm', name: 'Farm', h1: 'Farm Insurance Quote', path: '/farm-insurance', product: 'farm',
    intro: 'From hobby farms to commercial agriculture, tell us about your property, livestock, and equipment and we’ll build a farm package around it.' },
  { key: 'commercial', name: 'Commercial', h1: 'Commercial Insurance Quote', path: '/commercial-insurance', product: 'commercial',
    intro: 'Tell us about your business — what you do, your vehicles, and your employees — and we’ll analyze your situation to find the coverage you need.' },
  { key: 'recreational', name: 'Recreational', h1: 'Recreational Insurance Quote', path: '/recreational-insurance', product: 'recreational',
    intro: 'Boats, motorcycles, RVs, ATVs, campers and horse trailers each need their own coverage. Tell us about your toys and we’ll take it from there.' },
  { key: 'life', name: 'Life', h1: 'Life Insurance Quote', path: '/life-insurance', product: 'life',
    intro: 'Whether you’re considering term or permanent life insurance, tell us a little about what you’d like to protect and we’ll guide you through your options.' },
  { key: 'classic-car', name: 'Classic Car', h1: 'Classic Car Insurance Quote', path: '/classic-car-insurance', product: 'auto',
    intro: 'We love the classics — and we know you do too. Tell us about your vehicle and how you use it, and we’ll help you protect your investment.' },
  { key: 'renters', name: 'Renter’s', h1: 'Renter’s Insurance Quote', path: '/renters-insurance', product: 'home',
    intro: 'If you rent your home, renter’s insurance replaces your personal belongings in the event of a fire or other loss. Tell us about your rental and we’ll find the right policy.' },
  { key: 'motorcycle', name: 'Motorcycle', h1: 'Motorcycle Insurance Quote', path: '/motorcycle-insurance', product: 'recreational',
    intro: 'From weekend cruises to long road trips, tell us about your bike and riding habits and we’ll find coverage that keeps you protected on every ride.' },
  { key: 'rv-atv', name: 'RV and ATV', h1: 'RV and ATV Insurance Quote', path: '/rv-and-atv-insurance', product: 'recreational',
    intro: 'Hitting the open road or the trail? Tell us about your RV or ATV and we’ll find coverage for the vehicle and the people enjoying it with you.' },
  { key: 'umbrella', name: 'Liability Umbrella', h1: 'Liability Umbrella Insurance Quote', path: '/liability-umbrella-insurance', product: 'home',
    intro: 'If your property or investments are worth more than your home or auto liability limits, an umbrella policy adds protection so a lawsuit doesn’t cost you what you’ve worked hard to build.' },
  { key: 'flood', name: 'Flood', h1: 'Flood Insurance Quote', path: '/flood-insurance', product: 'home',
    intro: 'Most homeowners policies don’t cover flood damage. Tell us about your property and we’ll help you find flood protection that fits.' },
  { key: 'boat', name: 'Boat', h1: 'Boat Insurance Quote', path: '/boat-insurance', product: 'recreational',
    intro: 'Set sail with peace of mind. Tell us about your boat and how you use it, and we’ll tailor coverage for your boat and your adventures.' },
  { key: 'pet', name: 'Pet', h1: 'Pet Insurance Quote', path: '/pet-insurance', product: 'pet',
    intro: 'Tell us about your pet and your budget and we’ll compare accident-and-illness and accident-only plans to find the one that works for your family.' },
];

/* ---------- Learn-more link list on the home page ---------- */
export const INSURANCE_LINKS = [
  ['Auto Insurance', '/products/auto-insurance'],
  ['Homeowners Insurance', '/products/homeowners-insurance'],
  ['Life Insurance', '/products/life-insurance'],
  ['Commercial Insurance', '/insurance-solutions/commercial'],
  ['Renter’s Insurance', '/renters-insurance'],
  ['Classic Car Insurance', '/classic-car-insurance'],
  ['Flood Insurance', '/flood-insurance'],
  ['Liability Umbrella Insurance', '/liability-umbrella-insurance'],
  ['Farm Insurance', '/products/farm-insurance'],
  ['Pet Insurance', '/products/pet-insurance'],
];

/* ---------- Carriers ---------- */
export const CARRIERS = [
  { key: 'progressive', name: 'Progressive', url: 'https://www.progressive.com/' },
  { key: 'nationwide', name: 'Nationwide', url: 'https://www.nationwide.com/' },
  { key: 'travelers', name: 'Travelers', url: 'https://www.travelers.com/' },
  { key: 'aegis', name: 'Aegis General', url: 'https://www.aegisgeneral.com/' },
  { key: 'geico', name: 'GEICO', url: 'https://www.geico.com/' },
  { key: 'american-modern', name: 'American Modern', url: 'https://www.amig.com/' },
  { key: 'hartford', name: 'The Hartford', url: 'https://www.thehartford.com/' },
  { key: 'slide', name: 'Slide Insurance', url: 'https://www.slideinsurance.com/' },
  { key: 'liberty-mutual', name: 'Liberty Mutual', url: 'https://www.libertymutual.com/' },
  { key: 'foremost', name: 'Foremost', url: 'https://www.foremost.com/' },
  { key: 'us-assure', name: 'US Assure', url: 'https://www.usassure.com/' },
  { key: 'hagerty', name: 'Hagerty', url: 'https://www.hagerty.com/' },
  { key: 'national-general', name: 'National General', url: 'https://www.nationalgeneral.com/' },
  { key: 'universal', name: 'Universal Property & Casualty', url: 'https://universalproperty.com/' },
];

/* ---------- Reviews (verbatim from current site) ---------- */
export const REVIEWS = [
  ['Tracy M.', 'I couldn’t get my old auto insurance policy to come down on their premium. They said that was the going rate for where I lived. Fortress was able to find me a policy that met or exceeded my old policy for almost $200 less per year. They’ve been fast to respond and very helpful. Highly recommended!'],
  ['Patty R.', 'Fortress Insurance Solutions saved me thousands on my car insurance last year while offering me the same coverage. I’m so glad I called them! When my renewal came due this year, I actually saved overall on my homeowner’s and auto insurance combined. Not only have they saved me money, they really care about me. I was in an auto accident where I was not at fault, and Fortress called to check on me even though I wasn’t filing a claim through their office. I highly recommend Fortress Insurance Solutions.'],
  ['Becky M.', 'My sister referred me to Fortress Insurance after they saved her money on her home and auto insurance. They are great to work with, really care about finding the coverage you need and that you can afford, and go the extra mile to make everything easy!'],
  ['Donna D.', 'I had a wonderful experience and saved $1300 total on my home and car insurance! Fran went above and beyond to secure me the best available rate! I’m recommending Fortress Insurance to everyone I know! You won’t be disappointed!'],
  ['Jake M.', 'Very professional! Highly recommend.'],
  ['Hubert K.', 'Awesome service and saved us $1000 every year on our home cars and toys. Thank you Tana!'],
  ['Katharine S.', 'Friendly, helpful staff! Courteous and very responsive.'],
  ['Elaine M.', 'Tana is a stellar agent who always looks out for her clients. You can get insurance on most any online platform but there is no replacing a knowledgeable agent who cares about her clients.'],
  ['Alan B.', 'Tana was thorough and responded quickly! I will definitely be continuing to recommend her!'],
  ['Wendy W.', 'Prompt to answer questions, excellent customer service!'],
  ['Barbara N.', 'When I could not get my insurance card you handled this problem for me with no trouble.'],
  ['Molly M.', 'Needed car insurance asap when another insurance company dropped us unexpectedly. Tana took care of us that very day. Since then, she has been extremely helpful in researching and letting us know what we need. She keeps our budget in mind, which we appreciate.'],
  ['Todd M.', 'Tana Marshall is the best of the best. Need exceptional service and great insurance coverage? Call Tana. She outshines them all.'],
  ['Ray D.', 'We are very satisfied with Fortress and Tana Marshall. She is very responsive and promptly handles our insurance needs.'],
  ['Marie S.', 'Have used Tana Marshall for several years for my own insurance coverages but I have referred her company to my client’s (Stokes Realty) as well. Have had nothing but positive feedback from them. I prefer seeing the person face to face rather on a 800 number that I know nothing about and being able to speak to the same person on a permanent basis.'],
  ['Beth W.', 'Very personal and professional staff!'],
  ['Annette B.', 'Communication is key and Tana let me know of the different policies that were available to me for insuring my home and which were most cost effective. Always answered my emails, calls and texts promptly and put me at ease with my decision. She is very knowledgeable and I recommend her and her Agency to everyone I know.'],
  ['Shawn K.', 'The service I received was amazing! They made me feel comfortable and went above and beyond to make sure all my needs were met.'],
  ['Jennifer W.', 'Great service, fast and very helpful.'],
  ['Marie P.', 'This lady is amazing! My parents and I have purchased insurance from Tana the last 8 years. She is honest and will get you the best price possible.'],
  ['Steve M.', 'Came highly recommended to me and I can see why. Tana and her team were awesome to work with. Now it’s time to pay it forward…thanks for your help!'],
  ['Amy S.', 'Tana saved me a bunch of money — and made it easy!'],
  ['Ramona B.', 'Tana and her staff really know all of the ins and outs of insurance. I gave Tana copies of my current insurance policies. She was able to evaluate the insurance I had and give me several quotes with better coverage than my current policies. I also added a much needed “umbrella” policy. Best of all the staff at Fortress is there to assist you with all of your insurance needs and answer any questions.'],
  ['Colby C.', 'Amazing and quick service!'],
  ['Natalie R.', 'Excellent company! All of the staff is patient, professional and so knowledgeable. Highly recommend giving them a call.'],
  ['T. Byrd', 'Tana and her staff are some of the warmest, most knowledgeable professionals in the business! Their care, attention to detail, and quality of service are second to none! Use Fortress Insurance Solutions for all your insurance needs — you’ll be happy you did!'],
  ['Katelyn R.', 'Tana was great to work with, she was able to find a better rate for us even though we had already called numerous insurance companies ourselves. She is very knowledgeable and answered all of our questions quickly. Highly Recommend!'],
].map(([author, text]) => ({ author, text }));

export const FEATURED_REVIEWS = ['Tracy M.', 'Donna D.', 'Ramona B.', 'Molly M.', 'Patty R.', 'Katelyn R.']
  .map((a) => REVIEWS.find((r) => r.author === a));

/* ---------- Home page FAQ (visible on page; marked up as FAQPage) ---------- */
export const FAQS = [
  { q: 'How do I log in to my client portal?',
    a: 'Select “Client Portal” at the top of any page. It opens our secure customer service portal, where you can sign in to view your policy information. If you need help getting access, call us at (803) 272-4585.' },
  { q: 'What is an independent insurance agency?',
    a: 'An independent agency like Fortress Insurance Solutions works with many different insurance carriers rather than just one. That lets us compare options and tailor coverage to your needs and your budget.' },
  { q: 'What types of insurance does Fortress offer?',
    a: 'We offer auto, homeowners, renter’s, farm, commercial, life, pet, flood, liability umbrella, classic car, and recreational coverage for boats, motorcycles, RVs and ATVs, plus travel insurance through our partner.' },
  { q: 'Where is your office and when are you open?',
    a: 'Our office is at 708 Lafayette Avenue, Suite 2, in Camden, SC 29020. We’re open Monday through Friday from 9 AM to 5 PM, and closed Saturday and Sunday.' },
  { q: 'How do I get a quote?',
    a: 'Choose “Get a Quote” and pick the type of coverage you need, call us at (803) 272-4585, or send us a message. We’ll shop our carriers and follow up with options.' },
];

export const ABOUT_TEXT = [
  'Fortress Insurance Solutions is a full-service insurance agency that specializes in helping you protect what matters most to you — your loved ones, home, autos, farm, business, and recreational toys! We work to build a relationship with you so that we can guide you to the insurance solutions that best fit your needs and your budget.',
  'Collectively, our agents bring many years of experience to Fortress Insurance Solutions, which means we know the ins and outs of the different types of insurance you may need, the right amounts of coverage to protect your risk, and which carriers are best suited to cover those risks. We love helping you create a comprehensive insurance program that gives you peace of mind knowing the people and things you love most are protected in the event of a loss.',
];

export const LEARN_TEXT = [
  'Simply put, insurance provides money in the event of a loss to return you to the place you were before the loss occurred. Most understand property insurance replaces damaged homes or autos; however, insurance also protects your business, the “toys” you’ve worked so hard to enjoy, as well as other unforeseen losses should they occur. If a guest is seriously injured on your property requiring medical care, you may be responsible for paying for their care. If you own a business, theft can be a catastrophic loss that, without insurance to replace key equipment, may cause you to have to close your business. And if you rent your home, renter’s insurance replaces your personal belongings in the event of a fire or other loss.',
  'It’s important to partner with an experienced insurance agency that understands the many potential risks we all face and how to protect against them. Fortress Insurance Solutions is that agency. Reach out today and let us help you create an insurance program to protect you, your loved ones, and the things you’ve worked so hard to acquire so you can get busy enjoying life!',
];
