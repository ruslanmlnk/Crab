"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

import type { BlogLocale } from '@/lib/blog-locale'
import type { ContactSocialLinks } from '@/lib/contact'
import { getSiteMessages } from '@/lib/site-locale'

import { SocialLinks } from './SocialLinks'

type ContactFormSectionProps = {
  contactDescription: string
  contactTitle: string
  locale?: BlogLocale
  socialLinks: ContactSocialLinks
}

type ContactFormState = {
  email: string
  fullName: string
  message: string
  phoneNumber: string
}

type SubmitState = 'error' | 'idle' | 'submitting' | 'success'

const INITIAL_FORM_STATE: ContactFormState = {
  email: '',
  fullName: '',
  message: '',
  phoneNumber: '',
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  contactDescription,
  contactTitle,
  locale = 'en',
  socialLinks,
}) => {
  const messages = getSiteMessages(locale)
  const [formState, setFormState] = useState<ContactFormState>(INITIAL_FORM_STATE)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitError, setSubmitError] = useState('')

  const successMessage = 'Thanks! Your request has been sent.'
  const defaultErrorMessage = 'Failed to send request. Please try again.'

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    const fieldName = name as keyof ContactFormState

    setFormState((prev) => ({
      ...prev,
      [fieldName]: value,
    }))

    if (submitState !== 'idle') {
      setSubmitState('idle')
      setSubmitError('')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('submitting')
    setSubmitError('')

    try {
      const sourcePath =
        typeof window !== 'undefined'
          ? `${window.location.pathname}${window.location.search}`
          : '/contact'

      const response = await fetch('/api/contact-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          locale,
          sourcePath,
        }),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string
        }

        throw new Error(payload.error || defaultErrorMessage)
      }

      setFormState(INITIAL_FORM_STATE)
      setSubmitState('success')
    } catch (error) {
      const message = error instanceof Error ? error.message : defaultErrorMessage
      setSubmitError(message)
      setSubmitState('error')
    }
  }

  return (
    <section className="relative w-full h-auto lg:h-[700px] overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/backgrounds/contact.png"
          alt="Contact Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B1F31]/55" />
      </div>

      <div className="container-custom relative z-10 w-full py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-12 text-white max-w-[453px] w-full"
          >
            <div className="flex flex-col gap-1">
              <h1 className="text-5xl md:text-7xl lg:text-[80px] font-semibold leading-[145%]">
                {contactTitle}
              </h1>
              <p className="text-xl md:text-2xl lg:text-[30px] font-medium leading-[145%] opacity-90">
                {contactDescription}
              </p>
            </div>

            <SocialLinks links={socialLinks} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[650px] bg-white/20 backdrop-blur-[22.5px] p-8 md:p-[32px] rounded-sm border border-white/10"
          >
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-[2px]">
                  <label
                    htmlFor="full-name"
                    className="text-[#D9EEFF] text-[12px] font-medium uppercase leading-[145%]"
                  >
                    {messages.getInTouch.form.fullName}
                  </label>
                  <div className="w-full border border-white/20 p-4">
                    <input
                      id="full-name"
                      name="fullName"
                      type="text"
                      placeholder="John Lewis"
                      value={formState.fullName}
                      onChange={handleFieldChange}
                      required
                      className="w-full bg-transparent text-white text-[16px] placeholder:text-white/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-[2px]">
                    <label
                      htmlFor="email"
                      className="text-[#D9EEFF] text-[12px] font-medium uppercase leading-[145%]"
                    >
                      {messages.getInTouch.form.emailAddress}
                    </label>
                    <div className="w-full border border-white/20 p-4">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="info@example.com"
                        value={formState.email}
                        onChange={handleFieldChange}
                        required
                        className="w-full bg-transparent text-white text-[16px] placeholder:text-white/60 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <label
                      htmlFor="phone"
                      className="text-[#D9EEFF] text-[12px] font-medium uppercase leading-[145%]"
                    >
                      {messages.getInTouch.form.phoneNumber}
                    </label>
                    <div className="w-full border border-white/20 p-4">
                      <input
                        id="phone"
                        name="phoneNumber"
                        type="tel"
                        placeholder="+1 (555) 123-45677"
                        value={formState.phoneNumber}
                        onChange={handleFieldChange}
                        className="w-full bg-transparent text-white text-[16px] placeholder:text-white/60 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[2px]">
                  <label
                    htmlFor="message"
                    className="text-[#D9EEFF] text-[12px] font-medium uppercase leading-[145%]"
                  >
                    {messages.getInTouch.form.message}
                  </label>
                  <div className="w-full border border-white/20 p-4">
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Let us know if you have questions or special requests..."
                      value={formState.message}
                      onChange={handleFieldChange}
                      required
                      className="w-full bg-transparent text-white text-[16px] placeholder:text-white/60 h-[93px] resize-none focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="w-full bg-white rounded-[40px] py-3 flex items-center justify-center gap-2 group transition-all hover:bg-white/90"
              >
                <div className="flex flex-col leading-none">
                  <span className="text-[#0B1F31] text-[16px] font-semibold lowercase">
                    {submitState === 'submitting'
                      ? 'sending...'
                      : messages.getInTouch.form.submit}
                  </span>
                  <div className="h-[1px] bg-[#0B1F31] w-full mt-[1px]" />
                </div>
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z"
                      fill="#0B1F31"
                    />
                  </svg>
                </div>
              </button>
              {submitState === 'success' ? (
                <p className="text-[#D9EEFF] text-sm leading-[145%]">{successMessage}</p>
              ) : null}
              {submitState === 'error' ? (
                <p className="text-[#FFD4D4] text-sm leading-[145%]">
                  {submitError || defaultErrorMessage}
                </p>
              ) : null}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
