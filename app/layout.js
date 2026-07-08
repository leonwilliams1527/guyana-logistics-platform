import "./globals.css";
 
export const metadata = {
  title: "Shop2GY",
  description: "Shop the World. Delivered to Guyana."
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
