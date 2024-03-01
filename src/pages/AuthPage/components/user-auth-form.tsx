/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { useCallback, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import Input from '@/pages/AuthPage/components/input';
// import axios from '@/lib/axios';
import axios from 'axios';
// import * as Yup from 'yup';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<errorProps>({});
  const [variant, setVariant] = useState('login');

  // const validationSchema = Yup.object({
  //   name: Yup.string().required('Full name is required'),
  //   email: Yup.string()
  //     .required('Email is required')
  //     .email('Invalid email format'),
  //   password: Yup.string()
  //     .required('the password field is required')
  //     .min(8, 'The password field must be at least 8 characters')
  //     .matches(
  //       /[!@#$%^&*(),.?":{}|<>]/,
  //       'The password field must contain at least one symbol.'
  //     )
  //     .matches(/[0-9]/, 'The password field must contain at least one number')
  //     .matches(
  //       /[ A-Za-z]/,
  //       'The password field must contain at least one uppercase and one lowercase letter.'
  //     ),
  //   passwordConfirm: Yup.string()
  //     .oneOf(
  //       [Yup.ref('password')],
  //       'The confirm password field must match password.'
  //     )
  //     .required('The confirm password field is required'),
  // });

  const navigate = useNavigate();
  type errorProps = {
    message?: string;
    email?: string;
    password?: string;
    name?: string;
    error?: string;
    confirm_password?: string;
  };

  const toggleVariant = useCallback(() => {
    setVariant((currenVariant) =>
      currenVariant == 'login' ? 'register' : 'login'
    );
  }, []);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response.status === 422 || error.response.status === 401) {
        setErrors(error.response.data.errors);
      }
    }
  };
  console.log(errors);
  const handleRegister = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
        confirm_password: passwordConfirm,
      });
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const handleSubmit = async (event: any) => {
    await onSubmit(event);
    if (variant === 'login') {
      await handleLogin(event);
    } else {
      await handleRegister(event);
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {variant === 'login' ? 'Login to your account' : 'Create an account'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {variant === 'login'
            ? `Don't have and account yet? `
            : `Already have an account? `}
          <span
            onClick={toggleVariant}
            className="text-primary hover:underline cursor-pointer"
          >
            {variant === 'login' ? `Sign up` : `Login`}
          </span>
        </p>
      </div>
      <div className={cn('grid gap-6', className)} {...props}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="grid gap-4">
              {variant === 'register' && (
                <div className="grid gap-0">
                  <Input
                    id="name"
                    type="text"
                    label="Full name"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <span className="text-destructive text-xs">
                      {[errors.name[0]]}
                    </span>
                  )}
                </div>
              )}
              <div className="grid gap-0">
                <Input
                  id="email"
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
                {errors && (
                  <span className="text-destructive text-xs">
                    {errors?.error ?? errors?.email}
                  </span>
                )}
              </div>
              <div>
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <span className="text-destructive text-xs">
                    {[errors.password[0]]}
                  </span>
                )}
              </div>
              {variant === 'register' && (
                <div>
                  <Input
                    id="passwordConfirmed"
                    type="password"
                    label="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e: any) => setPasswordConfirm(e.target.value)}
                  />
                  {errors.confirm_password && (
                    <span className="text-destructive text-xs">
                      {[errors.confirm_password[0]]}
                    </span>
                  )}
                </div>
              )}
            </div>
            <Button
              type="submit"
              //  onClick={variant === 'login' ? handleLogin : handleRegister}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {variant === 'login' ? 'Login' : 'Register'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
