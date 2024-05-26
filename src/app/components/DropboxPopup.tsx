import { useState } from 'react';
import { Modal, Button, Text, useMantineTheme, FileButton, Box } from '@mantine/core';
import * as TablerIcons from 'tabler-icons-react';
const { Upload } = TablerIcons;

function DropboxPopup() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Audio to Video"
        centered
        styles={{
          title: {
            fontWeight: 700,
            fontSize: 20,
          },
        }}
      >
        <Box p="md">
          <FileButton onChange={handleFileChange} accept="audio/*">
            {(props) => (
              <Button
                leftIcon={<Upload size={14} />} // Adjusted size for Mantine
                variant="outline"
                color={theme.primaryColor}
                fullWidth
                {...props} // Spread props for proper button behavior
              >
                Upload a File
              </Button>
            )}
          </FileButton>

          <Text color="dimmed" size="sm" ta="center" mt="xs">
            or drag and drop a file or import from a link
          </Text>

          {/* Display uploaded file name if available */}
          {file && <Text mt="md">Selected file: {file.name}</Text>}
        </Box>
      </Modal>

      <Button onClick={() => setOpened(true)} variant="filled" fullWidth size="xl" radius="xl" color="blue">
        Add Audio to Video
      </Button>
    </>
  );
}

export default DropboxPopup;
