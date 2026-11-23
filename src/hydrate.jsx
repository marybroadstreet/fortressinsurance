import { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Document from './Document.jsx';

const el = document.getElementById('__fis');
if (el) {
  const props = JSON.parse(el.textContent);
  // Transition-priority hydration is time-sliced, so it never blocks input for long.
  startTransition(() => {
    hydrateRoot(document, <Document {...props} />);
  });
}
