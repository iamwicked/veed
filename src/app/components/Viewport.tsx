import { forwardRef, useImperativeHandle, useRef } from 'react';

interface ViewportProps {
  onSelectElement: (elementType: string | null) => void;
}

const Viewport = forwardRef<HTMLDivElement, ViewportProps>((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(ref, () => ({
    getVideoElement: () => videoRef.current,
    getAudioElement: () => audioRef.current,
  }));

  const handleVideoClick = () => props.onSelectElement('video');
  const handleAudioClick = () => props.onSelectElement('audio');

  return (
    <div onClick={() => props.onSelectElement(null)}>
      <video ref={videoRef} onClick={handleVideoClick} /> 
      <audio ref={audioRef} onClick={handleAudioClick} /> 
    </div>
  );
});

Viewport.displayName = 'Viewport'; 

export default Viewport;
