
import './globals.css';
import { MeshProvider } from '@meshsdk/react';

export const metadata = {
  title: 'Cardano Savings Vault',
  description: 'Save ADA towards your target',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MeshProvider>
          {children}
        </MeshProvider>
      </body>
    </html>
  );
}