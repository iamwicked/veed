import { Button, Group } from '@mantine/core';
import { 
  DeviceFloppy,
  BrandYoutube,
  Share,
  PlayerPause,
  PlayerPlay,
  LetterS, 
  Trash, 
  ZoomOut,
  ZoomIn,
} from 'tabler-icons-react';

interface ButtonGroupProps {
  selectedElement: string | null;
  viewportRef: React.RefObject<HTMLDivElement>;
}

function ButtonGroup({ selectedElement, viewportRef }: ButtonGroupProps) {
  const handleZoomOut = () => {
    // Add zoom out logic here
  };

  const handleZoomIn = () => {
    // Add zoom in logic here
  };

  return (
    <Group position="right" mt="xs">
      {/* Buttons when no element is selected */}
      {!selectedElement && (
        <>
          <Button leftIcon={<DeviceFloppy size={14} />}>Save</Button>
          <Button leftIcon={<BrandYoutube size={14} />}>Export</Button>
          <Button leftIcon={<Share size={14} />}>Share</Button>
        </>
      )}
      
      {/* Buttons when audio or video is selected */}
      {selectedElement && (
        <>
          {/* Audio Buttons */}
          {selectedElement === 'audio' && (
            <>
              <Button leftIcon={<PlayerPause size={14} />}>Mute</Button>
              <Button leftIcon={<LetterS size={14} />}>Split</Button>
              <Button leftIcon={<Trash size={14} />}>Delete</Button>
            </>
          )}

          {/* Video Buttons */}
          {selectedElement === 'video' && (
            <>
              <Button leftIcon={<PlayerPlay size={14} />}>Play</Button>
              <Button leftIcon={<ZoomOut size={14} />} onClick={handleZoomOut}>Zoom Out</Button>
              <Button leftIcon={<ZoomIn size={14} />} onClick={handleZoomIn}>Zoom In</Button>
            </>
          )}
        </>
      )}
    </Group>
  );
}

export default ButtonGroup;
