import React, { useRef, useState } from 'react';
import { Paper, Button } from '@mantine/core';
import Viewport, { ViewportHandle } from './Viewport';
import ButtonGroup from './ButtonGroup';
import DropboxPopup from './DropboxPopup';
import MediaItem from './MediaItem';

interface ShowcaseProps {
  videoSrc: string | null;
  audioSrc: string | null;
  onFileUploaded: (file: File) => void;
}

const Showcase: React.FC<ShowcaseProps> = ({ videoSrc, audioSrc, onFileUploaded }) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFileUploaded = (file: File) => {
    console.log('File uploaded:', file);
    onFileUploaded(file);
    handleClosePopup();
  };

  // Example media items
  const mediaItems = [
    {
      type: 'video' as const,
      title: 'Sample Video',
      duration: '3:45',
      thumbnail: 'https://via.placeholder.com/48x27.png?text=Video',
    },
    {
      type: 'audio' as const,
      title: 'Sample Audio',
      duration: '2:30',
      thumbnail: 'https://via.placeholder.com/48x27.png?text=Audio',
    },
  ];

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
      <Button onClick={handleOpenPopup} variant="filled" fullWidth size="xl" radius="xl" color="blue" style={{ marginTop: '10px' }}>
        Add Audio to Video
      </Button>
      <DropboxPopup isOpen={isPopupOpen} onClose={handleClosePopup} onFileUploaded={handleFileUploaded} />

      <div style={{ marginTop: '20px' }}>
        {mediaItems.map((item, index) => (
          <MediaItem key={index} type={item.type} title={item.title} duration={item.duration} thumbnail={item.thumbnail} />
        ))}
      </div>
    </Paper>
  );
};

export default Showcase;
