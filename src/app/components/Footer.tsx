import { useState } from 'react';
import { Slider, Group, ActionIcon, Text } from '@mantine/core';
import { 
  SplitHorizontal, 
  Voiceover, 
  Volume2, 
  ArrowsMaximize, 
  LetterC, 
  LetterT, 
  BrandYoutube 
} from '@tabler/icons-react';

function Footer() {
  const [sliderValue, setSliderValue] = useState(0);

  const marks = [
    { value: 0, label: '00:00' },
    { value: 100, label: '01:00' }, // Example duration; replace with actual values
  ];

  return (
    <Group position="apart" p="xs">
      <Group spacing="xs">
        <ActionIcon variant="subtle">
          <SplitHorizontal size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle">
          <Voiceover size={18} />
        </ActionIcon>
      </Group>

      <Slider
        value={sliderValue}
        onChange={setSliderValue}
        size="xl"
        marks={marks}
        label={marks[sliderValue / 100].label} // Show time label
        styles={{ markLabel: { display: 'none' } }} // Hide percentage labels
      />

      <Group spacing="xs">
        <ActionIcon variant="subtle">
          <Volume2 size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle">
          <ArrowsMaximize size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle">
          <LetterC size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle">
          <LetterT size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle" color="red">
          <BrandYoutube size={18} />
        </ActionIcon>
      </Group>
    </Group>
  );
}

export default Footer;
