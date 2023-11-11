import React, { createContext } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Components
import CreateProductScreen from "./screens/farmer/CreateProductScreen";
import ProductDetailScreen from "./screens/farmer/ProductDetailScreen";
import ProductsList from "./screens/farmer/ProductsList";
import ProductDetailBuyer from "./screens/buyer/ProductDetailBuyer.js";
import ShoppingCart from "./screens/buyer/ShoppingCart";
import ProductListBuyer from "./screens/buyer/ProductListBuyer";
import ProductFavorite from "./screens/buyer/ProductFavorite";
import MyAccount from "./screens/buyer/MyAccount";

//Styles Tailwind
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const ShoppingCartContext = createContext({
  cart: [],
});


function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{

        headerStyle: {
          backgroundColor: "#2510a3",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#2510a3",
      }}

    >
      <Tab.Screen name="INICIO" component={ProductListBuyer}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon type='material' name='home' size={22} color={color} />)
        }}
      />
      <Tab.Screen name="FAVORITOS" component={ProductFavorite}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon type='material' name='favorite' size={22} color={color} />)
        }}
      />
      <Tab.Screen name="MI CUENTA" component={MyAccount}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon type='material' name='account-circle' size={22} color={color} />)
        }}
      />
      <Tab.Screen name="CARRITO" component={ShoppingCart}
        options={{
          tabBarBadge: null,
          tabBarIcon: ({ color }) => (
            <Icon type='material' name='shopping-cart' size={22} color={color} />)
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <TailwindProvider utilities={utilities} colorScheme="dark">
      <ShoppingCartContext.Provider value={{ cart: [] }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#2510a3",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen
              name="MyTabs"
              component={MyTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductsList"
              component={ProductsList}
              options={{ title: "Lista De Productos" }}
            />

            <Stack.Screen
              name="CreateProductScreen"
              component={CreateProductScreen}
              options={{ title: "Crear Un Nuevo Producto" }}
            />
            <Stack.Screen
              name="ProductDetailScreen"
              component={ProductDetailScreen}
              options={{ title: "Detalles Del Producto" }}
            />
            <Stack.Screen
              name="ProductDetailBuyer"
              component={ProductDetailBuyer}
              options={{ title: "Detalles Del Producto" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ShoppingCartContext.Provider>
    </TailwindProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});