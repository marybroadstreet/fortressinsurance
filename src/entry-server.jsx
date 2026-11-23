import { renderToString } from 'react-dom/server';
import Document from './Document.jsx';
import { ROUTES } from './routes.jsx';

export { ROUTES };

export function render(path, assets) {
  return '<!DOCTYPE html>' + renderToString(<Document path={path} assets={assets} />);
}
