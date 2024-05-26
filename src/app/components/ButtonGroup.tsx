import React from 'react';
import { Group, ActionIcon } from '@mantine/core';
import { PlayerPause, PlayerPlay, Volume2, Cut, Trash } from 'tabler-icons-react';

interface ButtonGroupProps {
  selectedElement: string | null;
  onElementSelect: (elementType: string | null) => void;
  onMuteToggle: () => void;
  onSplit: () => void;
  onDelete: () => void;
  onPlayPause: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  selectedElement,
  onElementSelect,
  onMuteToggle,
  onSplit,
  onDelete,
  onPlayPause,
}) => (
  <Group position="apart" className="absolute bottom-4 left-4 right-4">
    <Group>
      <ActionIcon onClick={() => onElementSelect('video')}>
        <PlayerPlay />
      </ActionIcon>
      <ActionIcon onClick={() => onElementSelect('audio')}>
        <Volume2 />
      </ActionIcon>
    </Group>
    <Group>
      <ActionIcon onClick={onPlayPause}>
        {selectedElement === 'video' ? <PlayerPause /> : <PlayerPlay />}
      </ActionIcon>
      <ActionIcon onClick={onMuteToggle}>
        <Volume2 />
      </ActionIcon>
      <ActionIcon onClick={onSplit}>
        <Cut />
      </ActionIcon>
      <ActionIcon onClick={onDelete}>
        <Trash />
      </ActionIcon>
    </Group>
  </Group>
);

export default ButtonGroup;
