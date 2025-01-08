'use client';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
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
import useContact from '@/hooks/useContact';

export default function ContactModal() {
   const {
      values,
      setValues,
      errors,
      setErrors,
      setTouched,
      isSubmitting,
      closeRef,
      handleChange,
      handleBlur,
      handleSubmit,
   } = useContact();

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               className="text-xs md:text-sm font-medium rounded-full px-6 py-3 hover:scale-110 transition-all ease-in delay-75 select-none"
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
                     Fill out the form below and I&apos;ll get back to you as
                     soon as possible.
                  </DialogDescription>
               </DialogHeader>
               <div className="grid sm:grid-cols-2 gap-4 py-4">
                  <div>
                     <Label
                        htmlFor="name"
                        className="text-right px-2 text-primary/70"
                     >
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
                  <div>
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
                  <div>
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
               <div>
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
                  <Button
                     type="submit"
                     disabled={isSubmitting}
                     className="rounded-xl sm:px-6 h-10"
                  >
                     {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
               </DialogFooter>
               <DialogClose
                  className="hidden sm:hidden md:hidden lg:hidden"
                  ref={closeRef}
               />
            </form>
         </DialogContent>
      </Dialog>
   );
}
