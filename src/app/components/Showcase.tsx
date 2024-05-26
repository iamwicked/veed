import React, { useRef, useState, useCallback } from 'react';
import { Paper } from '@mantine/core';
import Viewport, { ViewportHandle } from './Viewport';
import ButtonGroup from './ButtonGroup';

interface ShowcaseProps {
  videoSrc: string | null;
  audioSrc: string | null;
  onFileUploaded: (file: File) => void;
}

const Showcase: React.FC<ShowcaseProps> = ({ videoSrc, audioSrc, onFileUploaded }) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const viewportRef = useRef<ViewportHandle | null>(null);

  const handleElementSelect = (elementType: string | null) => {
    setSelectedElement(elementType);
  };

  const handleMuteToggle = () => {
    const videoElement = viewportRef.current?.getVideoElement();
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
    }
  };

  const handleSplit = () => {
    // Add split logic here
  };

  const handleDelete = () => {
    setSelectedElement(null);
  };

  const handlePlayPause = () => {
    const videoElement = viewportRef.current?.getVideoElement();
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  };

  return (
    <Paper p="sm" shadow="md" radius="md" withBorder className="h-full relative">
      <Viewport
        ref={viewportRef}
        videoSrc={videoSrc}
        audioSrc={audioSrc}
        onFileUploaded={onFileUploaded}
      />
      <ButtonGroup
        selectedElement={selectedElement}
        onElementSelect={handleElementSelect}
        onMuteToggle={handleMuteToggle}
        onSplit={handleSplit}
        onDelete={handleDelete}
        onPlayPause={handlePlayPause}
      />
    </Paper>
  );
};

export default Showcase;
