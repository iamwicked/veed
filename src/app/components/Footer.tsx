import { useState, useEffect } from 'react';
import { Slider, Group, ActionIcon, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { FlipHorizontal, Microphone, Volume2, Volume3, ArrowsMaximize } from 'tabler-icons-react';
import { formatTime } from '../utils/timeUtils';
import { ViewportHandle } from './Viewport';

interface FooterProps {
  videoRef: React.RefObject<ViewportHandle>;
}

function Footer({ videoRef }: FooterProps) {
  const theme = useMantineTheme();
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const videoElement = videoRef.current?.getVideoElement();
    if (videoElement) {
      const handleLoadedMetadata = () => setDuration(videoElement.duration);
      const handleTimeUpdate = () => setCurrentTime(videoElement.currentTime);

      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [videoRef]);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    const videoElement = videoRef.current?.getVideoElement();
    if (videoElement) {
      videoElement.currentTime = (value / 100) * duration;
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value / 100);
    const videoElement = videoRef.current?.getVideoElement();
    if (videoElement) {
      videoElement.volume = value / 100;
    }
  };

  return (
    <Group>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        min={0}
        max={100}
        step={1}
        style={{ width: '60%' }}
      />
      <Text size="sm">{formatTime(currentTime)}</Text>
      <Group position="apart" style={{ width: '40%' }}>
        <Group spacing="xs">
          <ActionIcon>
            <FlipHorizontal />
          </ActionIcon>
          <ActionIcon onClick={() => videoRef.current?.getVideoElement()?.play()}>
            <Microphone />
          </ActionIcon>
          <Slider
            value={volume * 100}
            onChange={handleVolumeChange}
            min={0}
            max={100}
            step={1}
            style={{ width: '100px' }}
          />
        </Group>
        <Group>
          <ActionIcon>
            <Volume2 />
          </ActionIcon>
          <Tooltip label="Full Screen">
            <ActionIcon>
              <ArrowsMaximize />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Group>
  );
}

export default Footer;
