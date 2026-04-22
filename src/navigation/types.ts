import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  SettingsMenu: undefined;
  Settings: undefined;
  Friends: undefined;
  Usage: undefined;
};

export const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
  contentStyle: {
    backgroundColor: '#f5f3f0',
  },
};
