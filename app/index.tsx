import { Text, View } from 'react-native';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import EasyIcon from 'react-native-easy-icon';

const Login = () => {
  return (
    <View className={styles.screen}>
      <Container className={styles.container}>
        <Text className={styles.signInText}>Sign in to your account to continue</Text>
        <View className={styles.buttonContainer}>
          <Button
            title="Continue with Google"
            iconSide='left'
            icon={
              <EasyIcon
                type="antdesign"
                name="google"
                size={20}
                color="#fff"
              />
            }
          />
          <Button
            title="Continue with Microsoft"
            icon={
              <EasyIcon
                type="font-awesome5"
                name="microsoft"
                size={20}
                color="#fff"
              />
            }
          />
        </View>
       
      </Container>
    </View>
  );
};

export default Login;

// bg-card rounded-2xl border border-border shadow-lg p-8 space-y-6

const styles = {
  screen: 'flex-1 p-12 justify-center',
  container: 'flex h-[75%] p-8',
  signInText: 'text-lg text-[#abb3ba]',
  buttonContainer: 'mt-4',
  button: 'p-2',
  secondaryButton: 'mt-3',
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13
  }
};
