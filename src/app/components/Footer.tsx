import { useState, useEffect } from 'react';
import { Slider, Group, ActionIcon, Text, Tooltip } from '@mantine/core';
import { FlipHorizontal, Microphone, Volume2, ArrowsMaximize, PlayerPlay, PlayerPause } from 'tabler-icons-react';
import { formatTime } from '../utils/timeUtils';
import { ViewportHandle } from './Viewport';

interface FooterProps {
  videoRef: React.RefObject<ViewportHandle>;
}

function Footer({ videoRef }: FooterProps) {
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current?.getVideoElement();
    if (videoElement) {
      const handleLoadedMetadata = () => setDuration(videoElement.duration);
      const handleTimeUpdate = () => {
        setCurrentTime(videoElement.currentTime);
        setSliderValue((videoElement.currentTime / videoElement.duration) * 100);
      };

      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [videoRef]);

  const handleSliderChange = (value: number) => {
    const videoElement = videoRef.current?.getVideoElement();
    if (videoElement) {
      videoElement.currentTime = (value / 100) * duration;
    }
    setSliderValue(value);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value / 100);
    const videoElement = videoRef.current?.getVideoElement();
    if (videoElement) {
      videoElement.volume = value / 100;
    }
  };

  const handlePlayPause = () => {
    const videoElement = videoRef.current?.getVideoElement();
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setIsPlaying(true);
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleFullScreen = () => {
    const videoElement = videoRef.current?.getVideoElement();
    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if ((videoElement as any).webkitRequestFullscreen) {
        (videoElement as any).webkitRequestFullscreen();
      } else if ((videoElement as any).msRequestFullscreen) {
        (videoElement as any).msRequestFullscreen();
      }
    }
  };

  return (
    <Group style={{ padding: '10px', background: '#fff', borderTop: '1px solid #ddd' }}>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        min={0}
        max={100}
        step={1}
        style={{ flex: 1 }}
      />
      <Text size="sm">{formatTime(currentTime)} / {formatTime(duration)}</Text>
      <Group spacing="xs">
        <ActionIcon onClick={handlePlayPause}>
          {isPlaying ? <PlayerPause /> : <PlayerPlay />}
        </ActionIcon>
        <ActionIcon>
          <FlipHorizontal />
        </ActionIcon>
        <ActionIcon>
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
        <ActionIcon>
          <Volume2 />
        </ActionIcon>
        <Tooltip label="Full Screen">
          <ActionIcon onClick={handleFullScreen}>
            <ArrowsMaximize />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
}

export default Footer;
