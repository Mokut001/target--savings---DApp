import { MeshProvider } from '@meshsdk/react';
import './globals.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body className="bg-[#0f172a]"><MeshProvider>{children}</MeshProvider></body></html>
  );
}