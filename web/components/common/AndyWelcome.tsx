import { useState, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AndyAvatar from './AndyAvatar';
import useStore from '@/lib/store';

export default function AndyWelcome() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const setUserDetails = useStore(state => state.setUserDetails);

  const validateName = useCallback((value: string): string => {
    const nameParts = value.trim().split(' ');

    if (!value) return 'Name is required';
    if (value.length > 50) return 'Name must be less than 50 characters';
    if (nameParts.length < 2 || nameParts.length > 4) {
      return 'Name must be 2-4 words';
    }
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return '';
  }, []);

  const validateEmail = useCallback((value: string): string => {
    if (!value) return 'Email is required';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) return 'Invalid email format';
    if (value.length > 254) return 'Email must be less than 254 characters';
    return '';
  }, []);

  const validateInput = useCallback(() => {
    const newNameError = validateName(name);
    const newEmailError = validateEmail(email);

    setNameError(newNameError);
    setEmailError(newEmailError);
    setIsValid(!newNameError && !newEmailError);
  }, [name, email, validateName, validateEmail]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    const error = validateName(e.target.value);
    setNameError(error);
    setIsValid(!error && !emailError);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const error = validateEmail(e.target.value);
    setEmailError(error);
    setIsValid(!error && !nameError);
  };

  const handleSubmit = async () => {
    validateInput();
    if (isValid) {
      try {
        localStorage.setItem('userDetails', JSON.stringify({ name, email }));
        setUserDetails({ name, email });
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full px-3">
      <div className="w-full max-w-md">
        <div className="text-xs mt-2 flex items-center justify-center gap-4 py-8">
          <AndyAvatar />
          <p className="text-left font-semibold text-primary/80">
            Hello, I&apos;m Andy, Mr. Arpan&apos;s assistant. <br />
            May I have your name and email to assist you better?
          </p>
        </div>
        <div className="space-y-3">
          <div>
            <Label
              htmlFor="name"
              className="text-xs font-medium text-primary/70 px-4"
            >
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="What should I call you?"
              className="h-10 rounded-full px-4"
              aria-invalid={!!nameError}
              aria-describedby={nameError ? 'name-error' : undefined}
            />
            {nameError && (
              <p
                id="name-error"
                className="text-red-500 text-[0.6rem] mb-2 mt-1 px-2"
              >
                {nameError}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="email"
              className="text-xs font-medium text-primary/70 px-4"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Where can I contact you, if needed?"
              className="h-10 rounded-full px-4"
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'email-error' : undefined}
            />
            {emailError && (
              <p
                id="email-error"
                className="text-red-500 text-[0.6rem] mb-2 mt-1 px-2"
              >
                {emailError}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              variant="default"
              size="icon"
              className="rounded-full"
              aria-label="Submit form"
            >
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
