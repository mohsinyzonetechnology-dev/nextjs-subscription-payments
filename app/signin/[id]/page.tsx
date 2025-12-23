import Logo from '@/components/icons/Logo';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod
} from '@/utils/auth-helpers/settings';
import Card from '@/components/ui/Card';
import PasswordSignIn from '@/components/ui/AuthForms/PasswordSignIn';
import EmailSignIn from '@/components/ui/AuthForms/EmailSignIn';
import Separator from '@/components/ui/AuthForms/Separator';
import OauthSignIn from '@/components/ui/AuthForms/OauthSignIn';
import ForgotPassword from '@/components/ui/AuthForms/ForgotPassword';
import UpdatePassword from '@/components/ui/AuthForms/UpdatePassword';
import SignUp from '@/components/ui/AuthForms/Signup';

export default async function SignIn({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { disable_button: boolean };
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string;

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id;
  } else {
    const preferredSignInView =
      cookies().get('preferredSignInView')?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user && viewProp !== 'update_password') {
    return redirect('/');
  } else if (!user && viewProp === 'update_password') {
    return redirect('/signin');
  }

 return (
  <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden">

    {/* background glow */}
    <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[140px]" />
    <div className="absolute bottom-0 right-0 h-[400px] w-[400px] bg-pink-600/10 blur-[120px]" />

    <div className="relative flex flex-col justify-between max-w-lg w-full px-4">

      {/* Logo */}
      <div className="flex justify-center mb-10">
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-4 border border-white/10 shadow-lg">
          <Logo width="56px" height="56px" />
        </div>
      </div>

      {/* Auth Card */}
      <Card
        title={
          viewProp === 'forgot_password'
            ? 'Reset password'
            : viewProp === 'update_password'
            ? 'Update password'
            : viewProp === 'signup'
            ? 'Create account'
            : 'Welcome back'
        }
      >
        {viewProp === 'password_signin' && (
          <PasswordSignIn
            allowEmail={allowEmail}
            redirectMethod={redirectMethod}
          />
        )}

        {viewProp === 'email_signin' && (
          <EmailSignIn
            allowPassword={allowPassword}
            redirectMethod={redirectMethod}
            disableButton={searchParams.disable_button}
          />
        )}

        {viewProp === 'forgot_password' && (
          <ForgotPassword
            allowEmail={allowEmail}
            redirectMethod={redirectMethod}
            disableButton={searchParams.disable_button}
          />
        )}

        {viewProp === 'update_password' && (
          <UpdatePassword redirectMethod={redirectMethod} />
        )}

        {viewProp === 'signup' && (
          <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
        )}

        {viewProp !== 'update_password' &&
          viewProp !== 'signup' &&
          allowOauth && (
            <>
              <Separator text="Or continue with" />
              <OauthSignIn />
            </>
          )}
      </Card>
    </div>
  </div>
);

}
