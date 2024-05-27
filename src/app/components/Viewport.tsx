import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Dropzone } from '@mantine/dropzone';
import { ActionIcon, Text, Group } from '@mantine/core';
import { PlayerPlay, ZoomIn, ZoomOut } from 'tabler-icons-react';
import { useDisclosure } from '@mantine/hooks';

interface ViewportProps {
  onFileUploaded: (file: File) => void;
  videoSrc?: string | null;
  audioSrc?: string | null;
}

export interface ViewportHandle {
  getVideoElement: () => HTMLVideoElement | null;
}

const Viewport = forwardRef<ViewportHandle, ViewportProps>(
  ({ videoSrc, audioSrc, onFileUploaded }, ref) => {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [showPlayIcon, setShowPlayIcon] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [opened, { open, close }] = useDisclosure(false);

    useImperativeHandle(ref, () => ({
      getVideoElement: () => videoRef.current,
    }));

    useEffect(() => {
      const videoElement = videoRef.current;

      if (videoElement) {
        const handlePlay = () => setShowPlayIcon(false);
        const handlePause = () => setShowPlayIcon(true);

        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);

        return () => {
          videoElement.removeEventListener('play', handlePlay);
          videoElement.removeEventListener('pause', handlePause);
        };
      }
    }, []);

    const handleZoomOut = () => {
      setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 0.1, 0.1));
    };

    const handleZoomIn = () => {
      setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.1);
    };

    return (
      <Dropzone onDrop={(files) => onFileUploaded(files[0])} multiple={false}>
        <div className="relative flex items-center justify-center w-full h-full">
          {videoSrc && (
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              style={{
                width: `${zoomLevel * 100}%`,
                height: 'auto', 
              }}
            />
          )}
          {audioSrc && (
            <audio ref={audioRef} src={audioSrc} controls style={{ width: '100%' }} />
          )}
          {showPlayIcon && (
            <ActionIcon size="xl" onClick={() => videoRef.current?.play()} className="absolute">
              <PlayerPlay size={50} />
            </ActionIcon>
          )}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <ActionIcon size="lg" onClick={handleZoomIn}>
              <ZoomIn size={24} />
            </ActionIcon>
            <ActionIcon size="lg" onClick={handleZoomOut}>
              <ZoomOut size={24} />
            </ActionIcon>
          </div>
        </div>
      </Dropzone>
    );
  }
);

export default Viewport;
