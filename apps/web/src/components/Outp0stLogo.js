import useThemeContext from '@theme/hooks/useThemeContext';
import React from 'react';

export function Outp0stLogo(props) {
  const { isDarkTheme } = useThemeContext();
  return (
    <img
      {...props}
      src={
        isDarkTheme
          ? '/outpost/hatchful/logo_short_inv.svg'
          : '/outpost/hatchful/logo_short.svg'
      }
      className="docsearch-logo"
    />
  );
}
