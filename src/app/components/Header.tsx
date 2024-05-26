"use client";
import { Text, Group, Button } from '@mantine/core';
import { Cloud, Settings, Login, Bolt, CloudUpload } from 'tabler-icons-react';

function Header() {
  return (
    <header className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Cloud size={24} className="text-blue-600 mr-2" />
        <Text size="xl" weight={600}>VEED</Text>
      </div>

      {/* Buttons */}
      <Group spacing="sm">
        <Button variant="default" leftIcon={<Settings size={14} />}>Settings</Button>
        <Button variant="default" leftIcon={<Login size={14} />}>Log in</Button>
        <Button leftIcon={<Bolt size={14} />} className="bg-blue-500 hover:bg-blue-600 text-white">
          Upgrade
        </Button>
        <Button variant="outline" leftIcon={<CloudUpload size={14} />}>Save Project</Button>
      </Group>
    </header>
  );
}

export default Header;
