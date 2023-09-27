'use client'
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';
import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';
import Cookies from 'js-cookie';
import { LIGHT_TOKENS, DARK_TOKENS, THEME_COOKIE } from '@/constants';


import styles from './Header.module.css';

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme)
  function toggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    Cookies.set(THEME_COOKIE, nextTheme, { expires: 1000 })

    const THEME_TOKENS = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS
    const $html = document.documentElement

    $html.setAttribute('data-color-theme', nextTheme)
    Object.entries(THEME_TOKENS).forEach(([k, v]) => {
      $html.style.setProperty(k, v)
    })
  }
  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <a className={styles.action} href='/rss.xml'>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </a>
        <button className={styles.action} onClick={toggleTheme}>
          {theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
