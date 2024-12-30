'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { z } from 'zod';
import { useState, ChangeEvent, FocusEvent, FormEvent } from 'react';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, "Name can't be more than 30 characters"),
  email: z.string().email('Please enter a valid email address'),
  contact: z
    .string()
    .max(200, 'Contact detail cannot exceed 200 characters.')
    .optional(),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(160, "Subject can't be more than 160 characters"),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(10000, 'Message can not be more than 10000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormErrors = {
  [K in keyof ContactFormData]?: string;
};

type TouchedFields = {
  [K in keyof ContactFormData]?: boolean;
};

export default function ContactModal() {
  const [values, setValues] = useState<ContactFormData>({
    name: '',
    email: '',
    contact: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof ContactFormData, value: string) => {
    try {
      const fieldSchema = contactSchema.shape[name];
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.issues[0].message }));
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    if (touched[name as keyof ContactFormData]) {
      validateField(name as keyof ContactFormData, value);
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof ContactFormData, value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validatedData = contactSchema.parse(values);
      setErrors({});
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach(issue => {
          newErrors[issue.path[0] as keyof ContactFormData] = issue.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-xs md:text-sm font-medium rounded-full px-6 py-3 hover:scale-110 transition-all ease-in delay-75"
          onClick={() => {
            setValues({
              name: '',
              email: '',
              contact: '',
              subject: '',
              message: '',
            });
            setErrors({});
            setTouched({});
          }}
        >
          Send Me Message
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-full md:max-w-[700px] rounded-2xl sm:rounded-3xl md:rounded-3xl lg:rounded-3xl max-h-[90dvh] overflow-y-scroll">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Contact Me</DialogTitle>
            <DialogDescription>
              Fill out the form below and I&apos;ll get back to you as soon as
              possible.
            </DialogDescription>
          </DialogHeader>
          <div className="grid sm:grid-cols-2 gap-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-right px-2 text-primary/70">
                Name<sup>*</sup>
              </Label>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="What should I call you?"
                className="w-full sm:max-w-[250px] md:max-w-[300px] rounded-xl px-4 h-10"
              />
              {errors.name && (
                <p className="text-[0.65rem] text-red-500 font-medium px-2">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="">
              <Label
                htmlFor="email"
                className="text-right px-2 text-primary/70"
              >
                Email
                <sup>*</sup>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Where should I reply?"
                className="w-full sm:max-w-[250px] md:max-w-[300px] rounded-xl px-4 h-10"
              />
              {errors.email && (
                <p className="text-[0.65rem] text-red-500 font-medium px-2">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="contact"
                className="text-right px-2 text-primary/70"
              >
                Contact
              </Label>
              <Input
                id="contact"
                name="contact"
                value={values.contact}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Any other contact info?"
                className="w-full sm:max-w-[250px] md:max-w-[300px] rounded-xl px-4 h-10"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="subject"
                className="text-right px-2 text-primary/70"
              >
                Subject<sup>*</sup>
              </Label>
              <Input
                id="subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="What do you want to talk about?"
                className="w-full sm:max-w-[250px] md:max-w-[300px] rounded-xl px-4 h-10"
              />
              {errors.subject && (
                <p className="text-[0.65rem] text-red-500 font-medium px-2">
                  {errors.subject}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <Label
              htmlFor="message"
              className="text-right px-2 text-primary/70"
            >
              Message<sup>*</sup>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="What do you want to talk about?"
              className="w-full h-32 max-h-52"
            />
            {errors.message && (
              <p className="text-[0.65rem] text-red-500 font-medium px-2">
                {errors.message}
              </p>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
