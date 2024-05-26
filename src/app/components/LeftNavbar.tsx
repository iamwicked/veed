import { Navbar, Group, ActionIcon, Text, rem } from '@mantine/core';
import {
  Search,
  Settings,
  CirclePlus,
  Microphone,
  MessageCircle2,
  Speakerphone,
  BrandAirbnb,
  Movie,
  TextToSpeech,
  User,
  Video,
  LetterA,
} from 'tabler-icons-react';

function LeftNavbar() {
  return (
    <Navbar width={{ base: 250 }} p="md">
      <Navbar.Section grow mt="md">
        <Group direction="column" spacing={0}>
          {/* Navigation Items */}
          <ActionIcon variant="subtle" size={36}>
            <Search size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" size={36}>
            <Settings size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" size={36}>
            <CirclePlus size={18} />
          </ActionIcon>

          {/* Media Section */}
          <Group direction="column" spacing={0} mt="md">
            <Text size="sm" weight={500} color="dimmed">
              Media
            </Text>
            <ActionIcon variant="subtle" size={36}>
              <Microphone size={18} />
            </ActionIcon>
            <ActionIcon variant="subtle" size={36}>
              <BrandAirbnb size={18} />
            </ActionIcon>
          </Group>

          {/* AI Section */}
          <Group direction="column" spacing={0} mt="md">
            <Text size="sm" weight={500} color="dimmed">
              AI
            </Text>
            <ActionIcon variant="subtle" size={36}>
              <TextToSpeech size={18} />
            </ActionIcon>
            <ActionIcon variant="subtle" size={36} color="blue">
              <User size={18} />
            </ActionIcon>
          </Group>

          {/* Text Section */}
          <Group direction="column" spacing={0} mt="md">
            <Text size="sm" weight={500} color="dimmed">
              Text
            </Text>
            <ActionIcon variant="subtle" size={36}>
              <LetterA size={18} />
            </ActionIcon>
          </Group>

          {/* Remaining Sections (Video, Elements, Record) */}
          {[Video, Movie, Speakerphone].map((Icon, index) => (
            <ActionIcon key={index} variant="subtle" size={36}>
              <Icon size={18} />
            </ActionIcon>
          ))}
        </Group>
      </Navbar.Section>

      {/* AI Avatars (Bottom Section) */}
      <Navbar.Section>
        {/* Implement AI Avatars section here */}
      </Navbar.Section>
    </Navbar>
  );
}
export default LeftNavbar;