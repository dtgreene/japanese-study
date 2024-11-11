import { Button } from 'ui/Button';

export const ErrorFallback = ({ error }) => {
  let errorMessage = 'Unknown error';

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <div className="border bg-accent rounded-md p-8 w-[400px]">
      <div className="text-4xl mb-2">Oops...</div>
      <div className="mb-8">{errorMessage}</div>
      <Button
        variant="outline"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload
      </Button>
    </div>
  );
};
