import { useState } from 'react';
import { Text, View } from 'react-native';
import { Href, Link, useRouter } from 'expo-router';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import EasyIcon from 'react-native-easy-icon';
import { useThemeColors } from '@/theme/colors';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const colors = useThemeColors();

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
                color={colors.onPrimary}
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
                color={colors.onPrimary}
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
                color={colors.textMuted}
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
                color={colors.textMuted}
              />
            }
            rightIcon={
              <EasyIcon
                type="feather"
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={18}
                color={colors.textMuted}
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
            onPress={() => router.push('/(tabs)' as Href)}
          />
          <View className={styles.accountPromptRow}>
            <Text className={styles.createAccountText}>Don't have an account? </Text>
            <Link href='/sign-up'>
              <Text className={styles.accountLinkText}>Create one</Text>
            </Link>
          </View>
        </View>
      </Container>
    </View>
  );
};

export default Login;

const styles = {
  screen: 'flex-1 p-12 justify-center',
  container: 'flex h-[75%] p-8',
  signInText: 'text-lg text-app-light-muted dark:text-app-dark-muted',
  buttonContainer: 'mt-4',
  dividerContainer: 'mt-6 flex-row items-center',
  dividerLine: 'h-[1px] flex-1 bg-app-light-border dark:bg-app-dark-border',
  dividerText: 'mx-3 text-lg text-app-light-muted dark:text-app-dark-muted',
  inputContainer: 'mt-6',
  passwordInput: 'mt-4',
  signInButton: 'mt-6 rounded-md',
  accountPromptRow: 'mt-4 flex-row justify-center',
  createAccountText: 'text-app-light-muted dark:text-app-dark-muted',
  accountLinkText: 'text-app-light-primary dark:text-app-dark-primary'
};
