// Form definitions shared by the React forms (rendering + browser checks)
// and the Worker (authoritative server-side validation).

export const HONEYPOT_FIELD = 'fis_hp_7q';

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

const YES_NO = ['Yes', 'No'];
const DISTANCE = ['Less than 5 miles', '5 miles', '10 miles', '15 miles', '20 miles', '30 miles', 'Over 30 miles', 'N/A'];
const DEDUCTIBLE = ['No coverage', '$100', '$250', '$500', '$1,000'];
const MILEAGE = ['5,000', '7,500', '10,000', '12,500', '15,000', '20,000', '25,000', '30,000', '40,000', '50,000+'];
const GENDER = ['Male', 'Female', 'Prefer not to say'];
const STATUS = ['Employed', 'Student', 'Retired', 'Other'];

/** Field helper */
const f = (name, label, type = 'text', opts = {}) => ({ name, label, type, required: false, max: 120, ...opts });
const req = (name, label, type = 'text', opts = {}) => f(name, label, type, { required: true, ...opts });

const contactFields = [
  req('firstName', 'First name', 'text', { autoComplete: 'given-name', max: 60, need: 'Enter your first name.' }),
  req('lastName', 'Last name', 'text', { autoComplete: 'family-name', max: 60, need: 'Enter your last name.' }),
  req('email', 'Email', 'email', { autoComplete: 'email', max: 120, need: 'Enter your email address.' }),
  f('phone', 'Phone', 'tel', { autoComplete: 'tel', max: 30, need: 'Enter your phone number.' }),
];

const addressFields = [
  req('address1', 'Street address', 'text', { autoComplete: 'address-line1' }),
  f('address2', 'Apt, suite, etc.', 'text', { autoComplete: 'address-line2' }),
  req('city', 'City', 'text', { autoComplete: 'address-level2', max: 80 }),
  req('state', 'State', 'select', { options: US_STATES, autoComplete: 'address-level1', defaultValue: 'South Carolina' }),
  req('zip', 'ZIP code', 'zip', { autoComplete: 'postal-code', max: 10 }),
];

const vehicle = (n, required) => {
  const mk = required ? req : f;
  const sfx = n === 1 ? '' : ` (vehicle ${n})`;
  return [
    mk(`v${n}Year`, `Year${sfx}`, 'year', { max: 4, inputMode: 'numeric' }),
    mk(`v${n}Make`, `Make${sfx}`, 'text', { max: 40 }),
    mk(`v${n}Model`, `Model${sfx}`, 'text', { max: 40 }),
    mk(`v${n}Commute`, `Driven to work or school?${sfx}`, 'select', { options: YES_NO }),
    mk(`v${n}Distance`, `Work/school distance (one way)${sfx}`, 'select', { options: DISTANCE }),
    mk(`v${n}Leased`, `Is the vehicle leased?${sfx}`, 'select', { options: YES_NO }),
    mk(`v${n}Mileage`, `Annual mileage${sfx}`, 'select', { options: MILEAGE }),
    mk(`v${n}Collision`, `Collision deductible${sfx}`, 'select', { options: DEDUCTIBLE }),
    mk(`v${n}Comp`, `Comprehensive deductible${sfx}`, 'select', { options: DEDUCTIBLE }),
  ].map((x) => ({ ...x, group: `vehicle${n}` }));
};

const driver = (n, required) => {
  const mk = required ? req : f;
  const sfx = n === 1 ? '' : ` (driver ${n})`;
  return [
    mk(`d${n}Name`, `Full name${sfx}`, 'text', { max: 80 }),
    mk(`d${n}Dob`, `Date of birth${sfx}`, 'date'),
    mk(`d${n}Gender`, `Gender${sfx}`, 'select', { options: GENDER }),
    mk(`d${n}Married`, `Married?${sfx}`, 'select', { options: YES_NO }),
    mk(`d${n}Status`, `Employment status${sfx}`, 'select', { options: STATUS }),
  ].map((x) => ({ ...x, group: `driver${n}` }));
};

export const FORMS = {
  contact: {
    title: 'Contact Form',
    fields: [
      ...contactFields,
      req('message', 'How can we help?', 'textarea', { max: 3000, need: 'Enter your message.' }),
    ],
  },
  quote: {
    title: 'Quote Request',
    fields: [
      ...contactFields.map((x) => (x.name === 'phone' ? { ...x, required: true } : x)),
      ...addressFields,
      req('details', 'Tell us more about your needs', 'textarea', { max: 3000, need: 'Tell us a little about the coverage you need.' }),
    ],
  },
  auto: {
    title: 'Auto Quote Request',
    fields: [
      ...contactFields.map((x) => (x.name === 'phone' ? { ...x, required: true } : x)),
      ...addressFields,
      req('currentCarrier', 'Current or prior insurance company', 'text', { max: 80, group: 'history', hint: 'Enter “None” if you are not currently insured.' }),
      req('continuousCoverage', 'Continuous coverage', 'select', { group: 'history', options: ['3+ years', '2 years', '1 year', '6 months', 'Under 6 months', 'Not currently insured'] }),
      req('policyExpires', 'Current policy expires in', 'select', { group: 'history', options: ['Not sure', 'A few days', '2 weeks', '1 month', '2 months', '3 months', '3–6 months', '6+ months'] }),
      req('claims', 'Claims in the last 3 years', 'select', { group: 'history', options: ['None', '1', '2', '3', '4+'] }),
      req('tickets', 'Tickets in the last 3 years', 'select', { group: 'history', options: ['None', '1', '2', '3', '4', '5', '6+'] }),
      req('coverageDesired', 'Coverage desired', 'select', { group: 'history', options: ['Standard coverage', 'Premium coverage', 'State minimum'] }),
      ...vehicle(1, true), ...vehicle(2, false), ...vehicle(3, false),
      ...driver(1, true), ...driver(2, false), ...driver(3, false),
      f('message', 'Anything else we should know?', 'textarea', { max: 3000, group: 'extra' }),
    ],
  },
};

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

/** Validate a single value. Returns an error message, or '' when valid. */
export function validateField(field, raw) {
  const value = typeof raw === 'string' ? raw.trim() : '';
  if (!value) {
    if (!field.required) return '';
    if (field.need) return field.need;
    const name = field.label.replace(/\s*\(.*\)$/, '').replace(/\?$/, '').toLowerCase();
    return field.type === 'select' ? `Choose an option for ${name}.` : `Enter ${name}.`;
  }
  if (value.length > (field.max || 120)) return `${field.label} must be ${field.max} characters or fewer.`;
  switch (field.type) {
    case 'email':
      return EMAIL_RE.test(value) ? '' : 'Enter an email address like name@example.com.';
    case 'tel': {
      const digits = value.replace(/\D/g, '');
      return digits.length >= 10 && digits.length <= 15 ? '' : 'Enter a phone number with area code, like 803-555-0123.';
    }
    case 'zip':
      return /^\d{5}(-\d{4})?$/.test(value) ? '' : 'Enter a 5-digit ZIP code, like 29020.';
    case 'year': {
      const y = Number(value);
      const max = new Date().getFullYear() + 2;
      return /^\d{4}$/.test(value) && y >= 1900 && y <= max ? '' : `Enter a 4-digit year between 1900 and ${max}.`;
    }
    case 'date': {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Enter the date as MM/DD/YYYY.';
      const d = new Date(value + 'T00:00:00Z');
      return Number.isNaN(d.getTime()) || d > new Date() || d.getUTCFullYear() < 1900 ? 'Enter a valid date of birth.' : '';
    }
    case 'select':
      return field.options.includes(value) ? '' : `Choose an option for ${field.label.toLowerCase()}.`;
    default:
      return '';
  }
}

/** Validate a whole submission. Returns { values, errors } with only known fields kept. */
export function validateForm(formKey, data) {
  const def = FORMS[formKey];
  const values = {};
  const errors = {};
  for (const field of def.fields) {
    const raw = data[field.name];
    const msg = validateField(field, typeof raw === 'string' ? raw : '');
    if (msg) errors[field.name] = msg;
    else if (typeof raw === 'string' && raw.trim()) values[field.name] = raw.trim();
  }
  return { values, errors };
}
