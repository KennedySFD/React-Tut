import ThemeProvider from '@/theme/ThemeProvider';
import '@/theme/tokens.css';
import '@/theme/globals.css';

const themeBoot = `(function(){try{var m=localStorage.getItem('ui-theme-mode');if(m==='light'||m==='dark'){document.documentElement.dataset.theme=m;document.documentElement.style.colorScheme=m;}}catch(e){}})();`;

export const metadata = {
  title: 'Component Library',
  description: 'A token-driven React component library built with Next.js and CSS modules.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
