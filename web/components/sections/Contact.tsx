'use server';

import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import Andy from '../modals/Andy';
import ContactModal from '../modals/ContactModal';

export default async function Contact() {
  return (
    <section className="flex justify-center py-10  sm:py-16 md:py-20 bg-background">
      <div className="container px-2 md:px-8">
        <div className="">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
            Let&apos;s Connect!
          </h2>
        </div>
        <div className="flex justify-center mt-4 md:mt-6">
          <p>
            <span className="text-base md:text-lg font-semibold text-primary opacity-80">
              Want to collaborate or just say hi? Feel free to reach out to me
              at:
            </span>
          </p>
        </div>
        <div className="flex gap-8 sm:gap-12 md:gap-14 lg:gap-16 mt-6 md:mt-8 flex-wrap sm:flex-nowrap w-full overflow-hidden mx-auto justify-center sm:justify-evenly max-w-[800px]">
          <div className="sm:justify-center px-3 py-2">
            <div className="">
              <h3 className="font-medium text-xl text-primary/80 block text-left ">
                Catch Me Here
              </h3>
              <div className="space-y-[6px] mt-2">
                {socials.map(social => (
                  <div
                    className="flex gap-2 items-center text-base font-medium"
                    key={social.url}
                  >
                    <span className="block text-xl text-primary/80">
                      {social.icon}
                    </span>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block hover:underline underline-offset-4 text-primary/80 hover:text-primary transition-all duration-200 ease-in-out"
                    >
                      {social.username}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center px-3 py-2">
            <div className="relative -top-2">
              <h2 className="block text-center">
                Want to discuss or schedule a meeting?
              </h2>
              <div className="flex gap-2 sm:gap-4 mt-2 flex-wrap justify-center">
                <ContactModal />
                <Andy
                  buttonText="Chat with Andy"
                  className="text-xs md:text-sm font-medium rounded-full px-6 py-2 hover:scale-110 transition-all ease-in delay-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const socials = [
  {
    icon: <FaGithub />,
    username: '@arpan404',
    url: 'https://github.com/arpan404',
  },
  {
    icon: <FaLinkedinIn />,
    username: '@arpan404',
    url: 'https://www.linkedin.com/in/arpan404',
  },
  {
    icon: <FaInstagram />,
    username: '@the_d3vs',
    url: 'https://www.instagram.com/the_d3vs',
  },
  {
    icon: <MdMail />,
    username: 'arpanworkmail7@gmail.com',
    url: 'mailto:arpanworkmail7@gmail.com',
  },
];
