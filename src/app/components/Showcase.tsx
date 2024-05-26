import { useState, useRef } from 'react';
import { Paper, Group } from '@mantine/core';
import Viewport from './Viewport';
import ButtonGroup from './ButtonGroup'; // Assuming you have ButtonGroup component ready

function Showcase() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null); 

  const handleElementSelect = (elementType: string | null) => {
    setSelectedElement(elementType);
  };

  return (
    <Paper p="sm" shadow="md" radius="md" withBorder>
      <Viewport onSelectElement={handleElementSelect} ref={viewportRef} /> 
      <ButtonGroup selectedElement={selectedElement} viewportRef={viewportRef} />
    </Paper>
  );
}

export default Showcase;
