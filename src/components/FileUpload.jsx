import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';

import { cn } from 'src/lib/utils';

export const FileUpload = ({
  currentFileName,
  onDrop,
  accept,
  className,
  multiple = false,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-dashed border rounded-md bg-background px-12 py-8 cursor-pointer',
        className
      )}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="mb-2">Drop the files here...</div>
      ) : (
        <div className="mb-2">Drag & drop files here, or click to select</div>
      )}
      <div className="text-muted">
        <span>Selected file:</span>
        <span className={clsx({ 'text-primary': !!currentFileName })}>
          {' '}
          {currentFileName || 'None'}
        </span>
      </div>
    </div>
  );
};
