// app/layout.js
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script 
          src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}