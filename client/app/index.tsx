import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import EasyIcon from 'react-native-easy-icon';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Input } from '@/components/Input';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ScrollView
      className={styles.scrollView}
      contentContainerClassName={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Container className={styles.container}>
        <View className={styles.logoContainer}>
          <View className={styles.logoBadge}>
            <EasyIcon type="material-community" name="wallet-outline" size={28} color="#fff" />
          </View>
          <Text className={styles.appName}>Mobile Budget</Text>
        </View>

        <View className={styles.header}>
          <Text className={styles.title}>Welcome back</Text>
          <Text className={styles.subtitle}>Sign in to your account to continue</Text>
        </View>

        <View className={styles.buttonContainer}>
          <Button
            className={styles.socialButton}
            title="Continue with Google"
            iconSide="left"
            icon={<EasyIcon type="antdesign" name="google" size={20} color="#fff" />}
          />
          <Button
            className={styles.socialButton}
            title="Continue with Microsoft"
            icon={<EasyIcon type="font-awesome5" name="microsoft" size={20} color="#fff" />}
          />
        </View>

        <View className={styles.dividerContainer}>
          <View className={styles.dividerLine} />
          <Text className={styles.dividerText}>or with email</Text>
          <View className={styles.dividerLine} />
        </View>

        <View className={styles.inputContainer}>
          <Input
            label="Email address"
            placeholder="name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={
              <EasyIcon type="material-community" name="email-outline" size={18} color="#6b7280" />
            }
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            containerClassName={styles.passwordInput}
            leftIcon={<EasyIcon type="feather" name="lock" size={18} color="#6b7280" />}
            rightIcon={
              <EasyIcon
                type="feather"
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={18}
                color="#6b7280"
              />
            }
            rightIconPressableProps={{
              onPress: () => setIsPasswordVisible((previous) => !previous),
              accessibilityRole: 'button',
              accessibilityLabel: isPasswordVisible ? 'Hide password' : 'Show password'
            }}
          />

          <Text className={styles.forgotPassword}>Forgot password?</Text>

          <Button className={styles.signInButton} title="Sign In" />

          <Text className={styles.createAccountText}>
            Don&apos;t have an account? <Text className={styles.createAccountLink}>Create one</Text>
          </Text>
        </View>
      </Container>
    </ScrollView>
  );
};

export default Login;

const styles = {
  scrollView: 'flex-1',
  content: 'flex-grow justify-center px-6 py-10',
  container: 'w-full rounded-[32px] border border-white/20 bg-white/95 p-6 shadow-2xl',
  logoContainer: 'mb-8 items-center',
  logoBadge: 'mb-3 h-16 w-16 items-center justify-center rounded-2xl bg-[#3b6d5b]',
  appName: 'text-xl font-bold text-[#24372f]',
  header: 'mb-6',
  title: 'text-3xl font-bold text-[#18241d]',
  subtitle: 'mt-2 text-base text-[#6b7280]',
  buttonContainer: 'gap-3',
  socialButton: 'rounded-xl bg-[#24372f] shadow-sm',
  dividerContainer: 'my-6 flex-row items-center',
  dividerLine: 'h-px flex-1 bg-[#d1d5db]',
  dividerText: 'mx-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#6b7280]',
  inputContainer: 'gap-4',
  passwordInput: 'mt-0',
  forgotPassword: 'mt-[-4px] self-end text-sm font-semibold text-[#3b6d5b]',
  signInButton: 'mt-2 rounded-xl bg-[#3b6d5b] py-3',
  createAccountText: 'mt-4 text-center text-sm text-[#6b7280]',
  createAccountLink: 'font-semibold text-[#3b6d5b]'
};
