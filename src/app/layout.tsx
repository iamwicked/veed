"use client"; // Top-level Client Component

import { useState, useRef } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import LeftSidebar from './components/LeftNavbar';
import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';
import Viewport, { ViewportHandle } from './components/Viewport';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });
  const viewportRef = useRef<ViewportHandle>(null);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]); // Toggle with keyboard shortcut

  return (
    <html lang="en">
      <body>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <Header />
            <div style={{ display: 'flex', minHeight: '100vh' }}>
              <LeftSidebar />
              <main style={{ flexGrow: 1 }}>{children}</main>
            </div>
            <Footer videoRef={viewportRef} />
          </MantineProvider>
        </ColorSchemeProvider>
      </body>
    </html>
  );
}
