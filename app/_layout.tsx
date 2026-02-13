import { View, StyleSheet } from 'react-native';
import '../global.css';
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <View style={styles.root}>
      <LinearGradient
        style={styles.linearGradient}
        colors={['#648971', '#344b3a']}
        locations={[0, .5]}
        start={{ x: 0, y: .1 }}
        end={{ x: 1, y: 1.1 }}
      >
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: 'transparent' },
            animation: 'none',
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        </Stack>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  }
});
