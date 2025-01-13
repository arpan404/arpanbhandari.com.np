import { z } from 'zod';
import axios from 'axios';
import { useState, ChangeEvent, FocusEvent, FormEvent, useRef } from 'react';

import { toast } from '@/hooks/useToast';
import sendContactMessage from '@/actions/sendContactMessage';

export const contactSchema = z.object({
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

export default function useContact() {
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
   const closeRef = useRef(null);

   const validateField = (name: keyof ContactFormData, value: string) => {
      try {
         const fieldSchema = contactSchema.shape[name];
         fieldSchema.parse(value);
         setErrors(prev => ({ ...prev, [name]: undefined }));
      } catch (error) {
         if (error instanceof z.ZodError) {
            setErrors(prev => ({
               ...prev,
               [name]: error.issues[0].message,
            }));
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
      setIsSubmitting(true);
      try {
         const validatedData = {
            ...contactSchema.parse(values),
            user_details: 'Could not get ip Address',
         };
         setErrors({});

         try {
            const ipResponse = await axios.get(
               'https://api.ipify.org?format=json'
            );
            const ipAddress = ipResponse.data.ip;
            if (ipAddress) {
               validatedData.user_details = `IP Address: ${ipAddress}`;
            }
         } catch (error: unknown) {
            console.error(error);
         }
         if (closeRef && closeRef.current) {
            const closeBtn = closeRef.current as HTMLButtonElement;
            closeBtn.click();
         }
         const isSuccess = await sendContactMessage(validatedData);
         setTimeout(() => {
            if (isSuccess) {
               toast({
                  title: 'Message Sent Successfully!',
                  description:
                     "I've received your message. I'll get back to you as soon as possible.",
                  duration: 2000,
               });
            } else {
               toast({
                  title: 'Failed To Send Message!',
                  description:
                     'Oops! Something went wrong. Please try again later.',
                  duration: 2000,
               });
            }
         }, 500);
      } catch (error: unknown) {
         if (error instanceof z.ZodError) {
            const newErrors: FormErrors = {};
            error.issues.forEach(issue => {
               newErrors[issue.path[0] as keyof ContactFormData] =
                  issue.message;
            });
            setErrors(newErrors);
         }
      } finally {
         setIsSubmitting(false);
      }
   };

   return {
      values,
      errors,
      closeRef,
      setErrors,
      setValues,
      handleBlur,
      setTouched,
      handleSubmit,
      isSubmitting,
      handleChange,
      validateField,
      setIsSubmitting,
   };
}
