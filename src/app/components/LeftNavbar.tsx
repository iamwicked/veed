"use client";

import React, { useState } from 'react';
import { Accordion, ActionIcon, Title, Group, Text, Navbar, Tabs, Button, Stack } from '@mantine/core';
import { Search, Settings, CirclePlus, Microphone, LetterA, Movie, Speakerphone, Video, User, ChevronDown } from 'tabler-icons-react';
import MediaItem from './MediaItem';

const SoundEffectsSection = () => (
  <div>
    <Button variant="subtle" fullWidth leftIcon={<Search size={14} />}>
      Search
    </Button>
    <Tabs defaultValue="effects">
      <Tabs.List grow>
        {['Effects', 'Bells', 'Foley', 'Buzzers'].map((tab) => (
          <Tabs.Tab key={tab} value={tab.toLowerCase()}>
            {tab}
          </Tabs.Tab>
        ))}
        <Tabs.Tab value="more" rightSection={<ChevronDown size={14} />}>
          More
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="effects" pt="xs">
        <div>Sound effect items would go here</div>
      </Tabs.Panel>
      <Tabs.Panel value="bells" pt="xs">
        <div>Bells items would go here</div>
      </Tabs.Panel>
      <Tabs.Panel value="foley" pt="xs">
        <div>Foley items would go here</div>
      </Tabs.Panel>
      <Tabs.Panel value="buzzers" pt="xs">
        <div>Buzzers items would go here</div>
      </Tabs.Panel>
      <Tabs.Panel value="more" pt="xs">
        <div>More items would go here</div>
      </Tabs.Panel>
    </Tabs>
  </div>
);

const MediaSection = () => (
  <div>
    <MediaItem
      type="video"
      title="Large Crowd Medium Ovation -..."
      duration="0:10"
      thumbnail="/path/to/thumbnail1.jpg"
    />
    <MediaItem
      type="audio"
      title="Forest Bird Singing (Natur..."
      duration="2:13"
      thumbnail="/path/to/thumbnail2.jpg"
    />
    {/* ...more MediaItem components ... */}
  </div>
);

function LeftSidebar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    { title: 'Sound Effects', icon: Search, content: <SoundEffectsSection /> },
    { title: 'Media', icon: Video, content: <MediaSection /> },
    { title: 'Audio', icon: Microphone, content: <p>Audio Section Content</p> },
    { title: 'Subtitles', icon: LetterA, content: <p>Subtitles Section Content</p> },
    { title: 'Text', icon: LetterA, content: <p>Text Section Content</p> },
    { title: 'Elements', icon: Movie, content: <p>Elements Section Content</p> },
    { title: 'Record', icon: Speakerphone, content: <p>Record Section Content</p> },
  ];

  return (
    <Navbar width={{ base: 250 }} p="md">
      {/* Settings and Add Button */}
      <Navbar.Section>
        <Group spacing="xs">
          <ActionIcon variant="subtle" size={36}>
            <Settings size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" size={36}>
            <CirclePlus size={18} />
          </ActionIcon>
        </Group>
      </Navbar.Section>

      {/* Main Sections */}
      <Navbar.Section grow mt="md">
        <Accordion
          variant="separated"
          chevronPosition="left"
          value={activeSection}
          onChange={setActiveSection}
        >
          {sections.map((section) => (
            <Accordion.Item key={section.title} value={section.title}>
              <Accordion.Control icon={<section.icon size={16} />}>
                {section.title}
              </Accordion.Control>
              <Accordion.Panel>{section.content}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* AI Avatars Section (to be implemented) */}
        <Stack spacing={0} mt="md">
          <Text size="sm" weight={500} color="dimmed">
            AI
          </Text>
          <ActionIcon variant="subtle" size={36}>
            {/* <TextToSpeech size={18} /> */}
          </ActionIcon>
          <ActionIcon variant="subtle" size={36} color="blue">
            <User size={18} />
          </ActionIcon>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

export default LeftSidebar;
