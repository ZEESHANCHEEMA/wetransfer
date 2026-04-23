import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { styles } from '../styles';

type CardProps = {
  children: ReactNode;
};

export const Card = ({ children }: CardProps) => {
  return <View style={styles.card}>{children}</View>;
};

