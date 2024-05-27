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
          { value: 100, label: '01:00' }, 
        ]}
        styles={{ markLabel: { display: 'none' } }} 
      />

    </div>
  );
}
export default Timeline;
