import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Shop2GY | Shop the World. Delivered to Guyana.',
  description: 'Package forwarding, international shopping, air and ocean freight, and delivery to Guyana.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
