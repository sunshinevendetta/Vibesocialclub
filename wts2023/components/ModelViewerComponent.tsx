// If you're using TypeScript, include the proper type annotations
import React from 'react';
import '@google/model-viewer';

interface ModelViewerProps {
  glbUrl: string;
  alt: string;
}

const ModelViewerComponent: React.FC<ModelViewerProps> = ({ glbUrl, alt }) => {
  return (
    <model-viewer
      src={glbUrl}
      alt={alt}
      auto-rotate
      camera-controls
      ar
      ar-modes="webxr scene-viewer quick-look"
      environment-image="https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/images/skyenv.hdr"
      shadow-intensity="1"
      exposure="1"
      style={{ width: '100%', height: '400px' }}
    ></model-viewer>
  );
};

export default ModelViewerComponent;
