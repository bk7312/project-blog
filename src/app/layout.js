import React from 'react';
import {
  Work_Sans,
  Spline_Sans_Mono,
} from 'next/font/google';
import clsx from 'clsx';
import { cookies } from 'next/headers'

import { LIGHT_TOKENS, DARK_TOKENS, BLOG_TITLE, BLOG_DESC, THEME_COOKIE } from '@/constants';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionConfigClient from '@/components/MotionConfigClient';
import './styles.css';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

export const metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESC,
};

function RootLayout({ children }) {
  const savedTheme = cookies().get(THEME_COOKIE)
  const theme = savedTheme?.value || 'light';

  return (
    <MotionConfigClient>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <Header initialTheme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </MotionConfigClient>
  );
}

export default RootLayout;
