// page.tsx
"use client";

import React, { useState } from 'react';
import DropboxPopup from './components/DropboxPopup';
import Showcase from './components/Showcase';
import { useDisclosure } from '@mantine/hooks';
import { Loader } from '@mantine/core';

export default function HomePage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const handleFileUploaded = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (file.type.startsWith('video/')) {
          setVideoFile(file);
          setVideoSrc(reader.result);
        } else if (file.type.startsWith('audio/')) {
          setAudioFile(file);
          setAudioSrc(reader.result);
        }
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
    setLoading(true);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <DropboxPopup onFileUploaded={handleFileUploaded} isOpen={opened} onClose={close} />
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500">
          <Loader size="xl" />
        </div>
      )}
      <Showcase videoSrc={videoSrc} audioSrc={audioSrc} onFileUploaded={handleFileUploaded} />
    </div>
  );
}
