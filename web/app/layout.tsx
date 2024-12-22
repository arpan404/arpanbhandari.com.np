import './globals.css';
import getTheme from '@/actions/getTheme';
import Header from '@/components/navs/Header';
import Footer from '@/components/navs/Footer';
import getMusic from '@/actions/getMusic';
// import { CSPostHogProvider } from '@/components/common/CSPostHogProvider';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme] = await Promise.all([getTheme()]);
  const currentThemeMode = theme === 'system' ? 'dark' : theme;
  return (
    <html lang="en" className={`${currentThemeMode}`} data-theme={theme}>
      {/* <CSPostHogProvider> */}
      <body className="custom_page_scroll">
        <Header />
        {children}
        <Footer />
      </body>
      {/* </CSPostHogProvider> */}
    </html>
  );
}
