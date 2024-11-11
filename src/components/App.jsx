import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from './ErrorFallback';
import { Study } from './Study';

export const App = () => (
  <div className="flex justify-center p-8">
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Study />
    </ErrorBoundary>
  </div>
);
