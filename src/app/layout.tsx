"use client"; // For client components in Next 13

import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import LeftNavbar from '../components/LeftNavbar';
import Footer from "../components/Footer.tsx";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <html lang="en">
      <body>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <div style={{ display: 'flex', minHeight: '100vh' }}> 
              <LeftNavbar />
              <main style={{ flexGrow: 1 }}>{children}</main> 
            </div>
            <Footer />
          </MantineProvider>
        </ColorSchemeProvider>
      </body>
    </html>
  );
}
