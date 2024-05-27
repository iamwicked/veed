"use client";

import React, { useState, useRef } from 'react';
import { Modal, Button, Text, useMantineTheme, Center, Divider, Anchor, Input, Group, Stack } from '@mantine/core';
import { Upload, Link as LinkIcon } from 'tabler-icons-react';
import { Dropzone } from '@mantine/dropzone';

interface DropboxPopupProps {
  onFileUploaded: (file: File) => void;
  isOpen: boolean;
  onClose: () => void;
}

const DropboxPopup: React.FC<DropboxPopupProps> = ({ onFileUploaded, isOpen, onClose }) => {
  const theme = useMantineTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleImport = () => {
    // Add your import logic here (fetch file from URL, etc.)
    console.log('Importing from URL:', inputValue);
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Add Audio to Video" centered size="lg">
      <Stack spacing="md">
        <Dropzone onDrop={(files) => onFileUploaded(files[0])} multiple={false}>
          <Stack align="center" spacing="xs" style={{ pointerEvents: 'none' }}>
            <Upload size={50} color={theme.colors.blue[6]} />
            <Text align="center" size="xl" mt="md">
              Drag & drop a file
            </Text>
            <Text align="center" size="sm" color="dimmed" mt={7}>
              or
            </Text>
          </Stack>
        </Dropzone>
        <Center>
          <Button variant="outline" onClick={handleButtonClick}>
            Upload a File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,video/*"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                onFileUploaded(file);
              }
            }}
          />
        </Center>
        <Divider label="Or" labelPosition="center" my="xs" />
        <Group spacing="md">
          <Input
            icon={<LinkIcon size={16} />}
            placeholder="Paste a link to import"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button onClick={handleImport} disabled={!inputValue.trim()}>
            Import
          </Button>
        </Group>
        <Group position="apart" mt="md">
          <Anchor color="dimmed" size="xs">
            Learn more about supported formats
          </Anchor>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DropboxPopup;
