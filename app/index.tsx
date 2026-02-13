import { useState } from 'react';
import { Text, View } from 'react-native';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import EasyIcon from 'react-native-easy-icon';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className={styles.screen}>
      <Container className={styles.container}>
        <Text className={styles.signInText}>Sign in to your account to continue</Text>
        <View className={styles.buttonContainer}>
          <Button
            className='mb-2 rounded-md'
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
            className='rounded-md'
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
        <View className={styles.dividerContainer}>
          <View className={styles.dividerLine} />
          <Text className={styles.dividerText}>Or with email</Text>
          <View className={styles.dividerLine} />
        </View>
        <View className={styles.inputContainer}>
          <Input
            label='Email Address'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            leftIcon={
              <EasyIcon
                type="material-community"
                name="email-outline"
                size={18}
                color="#8c97a1"
              />
            }
          />
          <Input
            label='Password'
            secureTextEntry={!isPasswordVisible}
            containerClassName={styles.passwordInput}
            leftIcon={
              <EasyIcon
                type="feather"
                name="lock"
                size={18}
                color="#8c97a1"
              />
            }
            rightIcon={
              <EasyIcon
                type="feather"
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={18}
                color="#8c97a1"
              />
            }
            rightIconPressableProps={{
              onPress: () => setIsPasswordVisible((prev) => !prev),
              accessibilityRole: 'button',
              accessibilityLabel: isPasswordVisible ? 'Hide password' : 'Show password'
            }}
          />
          <Button
            className={styles.signInButton}
            title='Sign In'
          />
          <Text className={styles.createAccountText}>Don't have an account? Create one</Text>
        </View>
      </Container>
    </View>
  );
};

export default Login;

const styles = {
  screen: 'flex-1 p-12 justify-center',
  container: 'flex h-[75%] p-8',
  signInText: 'text-lg text-[#abb3ba]',
  buttonContainer: 'mt-4',
  dividerContainer: 'mt-6 flex-row items-center',
  dividerLine: 'h-[1px] flex-1 bg-[#d3d9df]',
  dividerText: 'mx-3 text-lg text-[#8c97a1]',
  inputContainer: 'mt-6',
  passwordInput: 'mt-4',
  signInButton: 'mt-6 rounded-md',
  createAccountText: 'mt-4 text-center text-[#8c97a1]',
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
