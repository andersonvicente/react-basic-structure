import 'react-native-gesture-handler';
import React from 'react';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './pages/SignIn';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DeliveryNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Deliveries"
      screenOptions={({ navigation }) => ({
        headerTransparent: true,
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontSize: 16,
          paddingLeft: 20,
        },
        headerLeftContainerStyle: {
          marginLeft: 5,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="chevron-left" size={30} color="#FFF" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen name="Deliveries" options={{ headerShown: false }} />
      <Stack.Screen
        name="Detail"
        options={{ title: 'Detalhes da encomenda' }}
      />
      <Stack.Screen
        name="ReportProblem"
        options={{ title: 'Informar problema' }}
      />
      <Stack.Screen
        name="Problems"
        options={{ title: 'Visualizar problemas' }}
      />
      <Stack.Screen name="Confirm" options={{ title: 'Confirmar entrega' }} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  // const signed = useSelector((state) => state.auth.signed);
  const signed = false;

  return (
    <NavigationContainer>
      {signed === true ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Deliveries':
                  iconName = 'view-headline';
                  break;
                case 'Profile':
                  iconName = 'account-circle';
                  break;
                default:
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#7D40E7',
            inactiveTintColor: '#999',
          }}
        >
          <Tab.Screen
            name="Deliveries"
            component={DeliveryNavigation}
            options={{ title: 'Entregas' }}
          />
          <Tab.Screen name="Profile" options={{ title: 'Meu Perfil' }} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Sign"
            component={SignIn}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
