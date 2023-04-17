import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import { Ionicons } from '@expo/vector-icons';
import { useAssets } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { dartTheme, lightTheme } from './styled';
import { QueryClient, QueryClientProvider } from "react-query";

const quertClient = new QueryClient();

export default function App() {
  const [assets] = useAssets([require('./ipinCert.png')]);
  const [loaded] = Font.useFonts(Ionicons.font);
  const isDark = useColorScheme() === "dark";

  if(!assets || !loaded){
    return <AppLoading />
  }

  return (
    <QueryClientProvider client={quertClient}>
      <ThemeProvider theme={isDark ? dartTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}