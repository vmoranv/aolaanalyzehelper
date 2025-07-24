import { ThemeProvider } from './components/theme-provider';
import { Navbar } from './components/Navbar';
import { SkillAttributeViewer } from './components/SkillAttributeViewer';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="w-full bg-background">
          <SkillAttributeViewer />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
