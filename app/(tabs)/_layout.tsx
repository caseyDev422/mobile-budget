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
    </Tabs>
  )
}
