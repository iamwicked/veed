"use client";
import { Slider, Group } from '@mantine/core';

function Timeline() {
  return (
    <div>
      <Slider
        defaultValue={15}
        label={(value) => `${value}%`}
        marks={[
          { value: 0, label: '00:00' },
          { value: 100, label: '01:00' }, // Replace with actual video duration
        ]}
        styles={{ markLabel: { display: 'none' } }} 
      />
      {/* Additional timeline elements (video/audio tracks, markers) */}
    </div>
  );
}
export default Timeline;
