import React, { ReactNode, ReactElement } from 'react';
import { ConfigProvider } from 'antd';

import styles from './UIConfigProvider.module.scss';

interface IAntTheme {
  primaryColor?: string;
  infoColor?: string;
  successColor?: string;
  processingColor?: string;
  errorColor?: string;
  warningColor?: string;
}

const UIConfigProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const defaultTheme: IAntTheme = {
    primaryColor: styles.primaryColor,
    // infoColor: '#969696',
    // successColor: styles.clrPaletteSuccess50,
    // processingColor: '#969696',
    // errorColor: styles.clrPaletteError50,
    // warningColor: styles.clrPaletteWarning50,
  };

  ConfigProvider.config({
    theme: defaultTheme,
  });

  return <ConfigProvider>{children}</ConfigProvider>;
};

export default UIConfigProvider;
