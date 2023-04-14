import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { useColorScheme } from 'react-native';
import { BLACK_COLOR, YELLOW_COLOR, DARKGRAY_COLOR, GRAY_COLOR } from "../colors";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : "white"
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white"
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? GRAY_COLOR : DARKGRAY_COLOR,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white"
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: 600, marginTop: -5 }
      }}
    >
      <Tab.Screen name="Movies" component={Movies} options={{tabBarIcon: ({color, size}) => { 
        return <Ionicons name="film" color={color} size={size} />
      }}} />
      <Tab.Screen name="TV" component={Tv} options={{tabBarIcon: ({color, size}) => { 
        return <Ionicons name="tv" color={color} size={size} />
      }}} />
      <Tab.Screen name="Search" component={Search} options={{tabBarIcon: ({color, size}) => { 
        return <Ionicons name="search" color={color} size={size} />
      }}} />
    </Tab.Navigator>
  )
};

export default Tabs;