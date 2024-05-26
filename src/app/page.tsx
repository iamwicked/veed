import DropboxPopup from '../components/DropboxPopup';
import Showcase from '../components/Showcase';

export default function HomePage() {
  return (
    <main className="flex flex-col h-screen">
      <DropboxPopup />
      <Showcase />
    </main>
  );
}
