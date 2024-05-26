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
        videoElement.addEventListener('play', () => {
          setShowPlayIcon(false);
        });

        videoElement.addEventListener('pause', () => {
          setShowPlayIcon(true);
        });
      }
    }, []);

    const handleZoomOut = () => {
      if (videoRef.current) {
        const videoElement = videoRef.current;
        const currentWidth = videoElement.style.width;

        const newWidth = currentWidth ? parseInt(currentWidth, 10) - 10 + "%" : "90%";

        videoElement.style.width = newWidth;
        videoElement.style.height = "auto"; // Maintain aspect ratio
        setZoomLevel(zoomLevel - 0.1); // Update the zoom level state
      }
    };

    const handleZoomIn = () => {
      if (videoRef.current) {
        const videoElement = videoRef.current;
        const currentWidth = videoElement.style.width;

        const newWidth = currentWidth ? parseInt(currentWidth, 10) + 10 + "%" : "110%";

        videoElement.style.width = newWidth;
        videoElement.style.height = "auto"; // Maintain aspect ratio
        setZoomLevel(zoomLevel + 0.1); // Update the zoom level state
      }
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
                height: 'auto', // Maintain aspect ratio
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
