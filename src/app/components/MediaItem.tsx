"use client";
import { Image, Text, Group, Badge, createStyles } from '@mantine/core';
import { PlayCard, Music } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  mediaItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colors.gray[0], // Subtle hover effect
    },
  },
}));

interface MediaItemProps {
  type: 'video' | 'audio';
  title: string;
  duration: string;
  thumbnail: string;
}

function MediaItem({ type, title, duration, thumbnail }: MediaItemProps) {
  const { classes } = useStyles();
  const icon = type === 'video' ? <PlayCard size={16} /> : <Music size={16} />;

  return (
    <Group className={classes.mediaItem} noWrap spacing="xs">
      <Image src={thumbnail} width={48} height={27} radius="sm" />
      <div>
        <Text size="sm" weight={500}>{title}</Text>
        <Group spacing={4} position="apart">
          <Badge variant="light">{duration}</Badge>
          {icon}
        </Group>
      </div>
    </Group>
  );
}

export default MediaItem;
