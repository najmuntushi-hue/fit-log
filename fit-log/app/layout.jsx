import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FitLogProvider } from '@/context/FitLogContext';
import ToastHost from '@/components/ToastHost';

export const metadata = { title: 'FitLog — Workout Library', description: 'A dark, no-nonsense workout library and daily plan tracker.' };

export default function RootLayout({ children }) {
  return <html lang="en"><body><FitLogProvider><Navbar /><main>{children}</main><Footer /><ToastHost /></FitLogProvider></body></html>;
}
