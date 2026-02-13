import { useState } from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Container } from '@/components/Container';
import { Input } from '@/components/Input';
import EasyIcon from 'react-native-easy-icon';

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <View className={styles.screen}>
      <Container className={styles.container}>
        <Text className={styles.headerText}>Join Project Budget to get started</Text>
        <View className={styles.inputContainer}>
          <Input
            label='Full Name'
            leftIcon={
              <EasyIcon
                type='feather'
                name='user'
                size={18}
                color='#8c97a1'
              />
            }
          />
          <Input
            label='Email Address'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            containerClassName={styles.emailInput}
            leftIcon={
              <EasyIcon
                type='material-community'
                name='email-outline'
                size={18}
                color='#8c97a1'
              />
            }
          />
          <Input
            label='Password'
            secureTextEntry={!isPasswordVisible}
            containerClassName={styles.passwordInput}
            leftIcon={
              <EasyIcon
                type='feather'
                name='lock'
                size={18}
                color='#8c97a1'
              />
            }
            rightIcon={
              <EasyIcon
                type='feather'
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={18}
                color='#8c97a1'
              />
            }
            rightIconPressableProps={{
              onPress: () => setIsPasswordVisible((prev) => !prev),
              accessibilityRole: 'button',
              accessibilityLabel: isPasswordVisible ? 'Hide password' : 'Show password'
            }}
          />
          <Input
            label='Confirm Password'
            secureTextEntry={!isConfirmPasswordVisible}
            containerClassName={styles.confirmPasswordInput}
            leftIcon={
              <EasyIcon
                type='feather'
                name='lock'
                size={18}
                color='#8c97a1'
              />
            }
            rightIcon={
              <EasyIcon
                type='feather'
                name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                size={18}
                color='#8c97a1'
              />
            }
            rightIconPressableProps={{
              onPress: () => setIsConfirmPasswordVisible((prev) => !prev),
              accessibilityRole: 'button',
              accessibilityLabel: isConfirmPasswordVisible ? 'Hide password' : 'Show password'
            }}
          />
          <View className={styles.accountPromptRow}>
            <Text className={styles.accountPromptText}>Already have an account? </Text>
            <Link href='/'>
              <Text className={styles.accountLinkText}>Sign in</Text>
            </Link>
          </View>
        </View>
      </Container>
    </View>
  );
};

export default SignUp;

const styles = {
  screen: 'flex-1 p-12 justify-center',
  container: 'flex h-[75%] p-8',
  headerText: 'text-lg text-[#abb3ba]',
  inputContainer: 'mt-6',
  emailInput: 'mt-4',
  passwordInput: 'mt-4',
  confirmPasswordInput: 'mt-4',
  accountPromptRow: 'mt-4 flex-row justify-center',
  accountPromptText: 'text-[#8c97a1]',
  accountLinkText: 'text-[#2e78b7]'
};
