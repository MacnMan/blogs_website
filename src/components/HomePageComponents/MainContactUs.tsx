'use client'
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import Image from "next/image";
import ContactCard from "./ContactCard";
import emailjs from '@emailjs/browser';
import MobileFooterSection from "./MobileFooterSection";
import { useRef, useState } from 'react';
type propTypes = {
  theme: string;
};

type contactCardProps = {
  theme: string;
  title: string;
  info: string[];
};

// Card Component
const Card = ({ title, info, theme }: contactCardProps) => {
  return (
    <div className="w-1/2">
      <p
        className={`text-2xl font-medium mb-4 ${theme === "dark" && "text-white"
          }`}
      >
        {title}
      </p>
      {info.map((item, index) => {
        return (
          <p
            key={index}
            className={`mb-2 ${theme === "dark"
                ? "text-[#6A6A6A]"
                : "text-[var(--text-color-primary)]"
              }`}
          >
            {item}
          </p>
        );
      })}
    </div>
  );
};

function MainContactUs({ theme }: propTypes) {
  const form = useRef<HTMLFormElement | null>(null);
  const [randomDigit1] = useState(Math.floor(Math.random() * 10));
  const [randomDigit2] = useState(Math.floor(Math.random() * 10));
  const [userAnswer, setUserAnswer] = useState('');

  const puzzleValue = `${randomDigit1} + ${randomDigit2}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Captcha validation
    if (parseInt(userAnswer) !== randomDigit1 + randomDigit2) {
      alert('Captcha is incorrect');
      return;
    }

    if (!form.current) return;

    emailjs
      .sendForm(
        'service_90ohmtt',           // ✅ Your Service ID
        'template_pj77hot',          // ✅ Your Template ID
        form.current,
        'brpwSUKNzVOEpxzeb'          // ✅ Your Public Key
      )
      .then(
        () => {
          alert('Message sent successfully!');
          form.current?.reset();
          setUserAnswer('');
        },
        (error) => {
          console.error('EmailJS Error:', error);
          alert('Failed to send message. Please try again.');
        }
      );
  };


  return (
    <section id='contact' className="scroll-mt-24 min-h-screen mt-10">
      {/* Visible only on Tablets and above width devices */}
      <div className="hidden md:block mb-8">
        <p
          className={`md:text-3xl lg:text-4xl font-bold text-center ${theme === "dark" && "text-white"
            }`}
        >
          Let&lsquo;s make it easy - reach out now!
        </p>
      </div>

      {/* Visible only on mobile width devices */}
      <div className="md:hidden mb-8 text-center font-bold text-[26px]">
        <p
          className={`${theme === "dark" ? "text-white" : "text-[var(--heading-gray-color)]"
            }`}
        >
          Let&lsquo;s Make it Easy
        </p>
        <p
          className={`${theme === "dark" ? "text-white" : "text-[var(--text-color-primary)]"
            }`}
        >
          Reach Out Now
        </p>
      </div>

      {/* Contact Cards */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 md:gap-8">
        <ContactCard
          title="Contact to Sales"
          description="Talk to our friendly team"
          contactInfo="chat@macnman.in"
          src="/blogs/images/contact-us/smile-beam.svg"
          theme={theme ?? "light"}
        />

        <ContactCard
          title="Call Us"
          description="24 X 7 Always On"
          contactInfo="+91 7972856163"
          src="/blogs/images/contact-us/phone-call.svg"
          theme={theme ?? "light"}
        />

        <ContactCard
          title="Contact to Support"
          description="We are here to help"
          contactInfo="support@macnman.in"
          src="/blogs/images/contact-us/question.svg"
          theme={theme ?? "light"}
        />

        <ContactCard
          title="Visit Us"
          description="Visit our office HQ"
          contactInfo="View on Google Map"
          src="/blogs/images/contact-us/marker.svg"
          theme={theme ?? "light"}
        />
      </div>

      {/* Visible on Tablets and above width devices */}
      <div className="hidden max-w-xl lg:max-w-6xl md:flex md:flex-col lg:flex-row lg:justify-between lg:items-start lg:gap-6 mx-auto mt-8 mb-12">
        <div className="lg:w-2/4 p-4">
          <div className="">
            <p
              className={`text-3xl md:text-5xl font-semibold text-center sm:text-start mb-4 ${theme === "dark"
                  ? "text-white"
                  : "text-[var(--heading-gray-color)]"
                }`}
            >
              We are{" "}
              <span
                className={`bg-gradient-to-r ${theme === "dark"
                    ? "from-[var(--dark-gradient-blue)] to-[var(--dark-gradient-white)]"
                    : "from-[var(--gradient-blue)] to-[var(--gradient-pink)]"
                  } bg-clip-text text-transparent `}
              >
                always ready
              </span>
              <br />
              to help and
              <br />
              answer your <br /> questions
            </p>
          </div>

          {/* cards row 1 */}
          <div className="max-w-full flex mt-12">
            <Card
              title="Call"
              theme={theme}
              info={["+91 7972856163", "+91 9096830856"]}
            />

            <Card
              title="Location"
              theme={theme}
              info={["SHOP-15 Bibwewadi, Pune, Maharashtra 411037"]}
            />
          </div>

          {/* cards row 2 */}
          <div className="max-w-full flex mt-12">
            <Card
              title="Email"
              theme={theme}
              info={[
                "chat@macnman.in",
                "support@macnman.in",
                "info@macnman.in",
              ]}
            />

            <div className="w-1/2   ">
              <p
                className={`text-2xl font-bold mb-4 ${theme === "dark" && "text-white"
                  }`}
              >
                Socials
              </p>
              <div className="flex gap-4 text-3xl">
                <a href="https://youtube.com/@macnman_yt?si=uUOFsMQpQ3iGBj2F">
                  <FaYoutube className={`hover:text-[#FF0000] transition-colors duration-200 cursor-pointer ${theme === "dark" && "text-white"}`} />
                </a>
                <a href="https://www.linkedin.com/company/macnman/">
                  <FaSquareXTwitter className={`cursor-pointer ${theme === "dark" && "text-white hover:text-black"}`} />
                </a>
                <a href="https://www.linkedin.com/company/macnman/">
                  <IoLogoLinkedin className={`hover:text-[#0077B5] transition-colors duration-200 cursor-pointer
                  ${theme === "dark" && "text-white"}`} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div
          className={`lg:w-1/2 p-12 rounded-3xl mt-4 lg:mt-0 ${theme === 'dark'
              ? 'bg-[#252525]'
              : 'bg-[var(--secondary-bg-color)]'
            }`}
        >
          <p
            className={`text-3xl md:text-4xl lg:text-5xl font-semibold text-start mb-4 ${theme === 'dark'
                ? 'text-white'
                : 'text-[var(--heading-gray-color)]'
              }`}
          >
            Get in Touch
          </p>

          <p
            className={`text-base mb-4 pl-2 ${theme === 'dark'
                ? 'text-[var(--dark-contact-form)]'
                : 'text-[var(--text-color-primary)]'
              }`}
          >
            Define your goals and all to value your time
          </p>

          <form
            ref={form}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-md mx-auto"
          >
            <input
              suppressHydrationWarning
              type="text"
              name="user_name"
              placeholder="Name"
              required
              className={`border-b-2 p-2 bg-transparent ${theme === 'dark'
                  ? 'text-[var(--dark-contact-form)] border-[var(--text-color-secondary)]'
                  : 'text-[var(--text-color-primary)] border-[#E2E2E2]'
                }`}
            />

            <input
              suppressHydrationWarning
              type="email"
              name="user_email"
              placeholder="Email"
              required
              className={`border-b-2 p-2 bg-transparent ${theme === 'dark'
                  ? 'text-[var(--dark-contact-form)] border-[var(--text-color-secondary)]'
                  : 'text-[var(--text-color-primary)] border-[#E2E2E2]'
                }`}
            />

            <input
              suppressHydrationWarning
              type="text"
              name="product"
              placeholder="Product"
              className={`border-b-2 p-2 bg-transparent ${theme === 'dark'
                  ? 'text-[var(--dark-contact-form)] border-[var(--text-color-secondary)]'
                  : 'text-[var(--text-color-primary)] border-[#E2E2E2]'
                }`}
            />

            <input
              suppressHydrationWarning
              type="text"
              name="company"
              placeholder="Company Name"
              className={`border-b-2 p-2 bg-transparent ${theme === 'dark'
                  ? 'text-[var(--dark-contact-form)] border-[var(--text-color-secondary)]'
                  : 'text-[var(--text-color-primary)] border-[#E2E2E2]'
                }`}
            />

            <textarea
              name="message"
              placeholder="Message *"
              required
              className={`border-b-2 p-2 bg-transparent ${theme === 'dark'
                  ? 'text-[var(--dark-contact-form)] border-[var(--text-color-secondary)]'
                  : 'text-[var(--text-color-primary)] border-[#E2E2E2]'
                }`}
              rows={4}
            ></textarea>

            <div className="flex flex-row justify-end items-center">
              <div className="mr-2 flex gap-2">
                <input
                  suppressHydrationWarning
                  type="text"
                  name="puzzle"
                  value={puzzleValue}
                  readOnly
                  className={`w-12 text-center rounded ${theme === 'dark'
                      ? 'text-white bg-[#52545D]'
                      : 'text-[var(--heading-gray-color)] bg-[#f2f2f2]'
                    }`}
                />

                <input
                  suppressHydrationWarning
                  type="text"
                  name="puzzleAnswer"
                  placeholder="?"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  required
                  className={`w-12 text-center rounded ${theme === 'dark'
                      ? 'text-white bg-[#52545D]'
                      : 'text-[var(--heading-gray-color)] bg-[#f2f2f2]'
                    }`}
                />
              </div>

              <button
                suppressHydrationWarning
                type="submit"
                className="bg-[var(--link-button)] text-white rounded-full self-end py-2 px-4 flex items-center justify-center gap-2"
              >
                Submit{' '}
                <span className="relative w-5 h-5">
                  <Image src="/blogs/images/paper-plane.svg" alt="" fill />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Visible on mobile width devices */}
      <MobileFooterSection />
    </section>
  );
}

export default MainContactUs;
