import { Tabs, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import EasyIcon from 'react-native-easy-icon';

export default function Layout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <Pressable onPress={() => router.dismissAll()} hitSlop={8}>
            <Text className='text-[#2e78b7] font-semibold pr-2'>Sign Out</Text>
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen 
      name="index"
        options={{
          title: 'Dashboard', tabBarIcon: ({ color }) => <EasyIcon
            type="antdesign"
            name="home"
            size={20}
            color={color}
          />
        }}
      />
      <Tabs.Screen
        name="what-if"
        options={{
          title: 'What-If',
          tabBarIcon: ({ color }) => (
            <EasyIcon
              type="antdesign"
              name="questioncircleo"
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => (
            <EasyIcon
              type="material-community"
              name="cash-sync"
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => (
            <EasyIcon
              type="material-community"
              name="shape-outline"
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="income"
        options={{
          title: 'Income',
          tabBarIcon: ({ color }) => (
            <EasyIcon
              type="ionicon"
              name="wallet-outline"
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: 'Goals',
          tabBarIcon: ({ color }) => (
            <EasyIcon
              type="font-awesome5"
              name="bullseye"
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
