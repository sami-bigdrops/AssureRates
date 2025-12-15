'use client'

import React from 'react';
import { CONTACT_PAGE } from '@/lib/constant';
import Image from 'next/image';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useState, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import TrustedForm from '@/components/TrustedForm';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState('');
  const [subid1, setSubid1] = useState('');
  const [subid2, setSubid2] = useState('');
  const [subid3, setSubid3] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
    },
    mode: 'onChange',
  });

  // Handle TrustedForm certificate data
  const handleTrustedFormReady = (certUrl: string) => {
    setTrustedFormCertUrl(certUrl);
  };

  // UTM Parameter Detection with Cookie Fallback
  useEffect(() => {
    // Helper function to get cookie value
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
      return '';
    };

    // Helper function to set cookie
    const setCookie = (name: string, value: string, days: number = 30) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const urlParams = new URLSearchParams(window.location.search);
    let utmSource = urlParams.get('utm_source') || '';
    let utmId = urlParams.get('utm_id') || '';
    let utmS1 = urlParams.get('utm_s1') || '';

    // If URL parameters exist, use them and save to cookies
    if (utmSource || utmId || utmS1) {
      if (utmSource) setCookie('subid1', utmSource);
      if (utmId) setCookie('subid2', utmId);
      if (utmS1) setCookie('subid3', utmS1);

      // Clean the URL by removing UTM parameters
      const cleanUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      // If no URL parameters, try to read from cookies
      utmSource = getCookie('subid1') || '';
      utmId = getCookie('subid2') || '';
      utmS1 = getCookie('subid3') || '';
    }

    setSubid1(utmSource);
    setSubid2(utmId);
    setSubid3(utmS1);
  }, []);


  const onSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);

    try {
      const submissionData = {
        fullName: data.fullName,
        email: data.email,
        subject: data.subject,
        message: data.message,
        subid1,
        subid2,
        subid3,
        trustedformCertUrl: trustedFormCertUrl,
      };

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await response.json();

      form.reset();

      // Show success popup
      setShowSuccessPopup(true);

      // Auto-dismiss popup after 4 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 4000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred';

      // Show error to user (you could add error state if needed)
      alert(`Submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = form.getValues();

    // Check if any field is empty
    const hasErrors =
      !formData.fullName ||
      !formData.email ||
      !formData.subject ||
      !formData.message;

    if (hasErrors) {
      // Trigger validation to show errors
      form.trigger();
    } else {
      // Submit the form
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <React.Fragment>
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 md:pt-12 pointer-events-none">
          <div className="bg-white rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-6 md:p-8 max-w-md w-full mx-4 pointer-events-auto transition-all duration-300 ease-in-out opacity-100">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-heading-gradient flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-heading-color font-poppins-util">
                  Thank You!
                </h3>
                <p className="text-sm md:text-base text-description-color font-roboto-util">
                  Thank you for submitting the form. We will contact you within 24 to 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div 
        className="contact-page w-full h-full py-6 px-6 pb-135 min-[425px]:pb-145  md:px-8  md:py-8 md:pb-58 lg:px-12 lg:py-12 lg:pb-65 xl:py-16 xl:px-38 xl:pb-80  2xl:px-42"
        style={{ background: 'linear-gradient(180deg, #E8F4FC 0%, #FFF 15%)' }}
      >
        <div className="container mx-auto">
        <div className="content w-full h-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-20">
          <div className="title-container flex flex-col items-center justify-center gap-3 xl:gap-4 text-center">
            <div className="title">
              <h1 className="text-[2.1rem] md:text-[2.3rem] lg:text-[2.5rem] xl:text-[2.8rem] max-w-[280px] md:max-w-full font-bold text-heading-color text-center font-poppins-util ">
                {CONTACT_PAGE.MAIN_HEADING.part1}{' '}
                <span className="heading-gradient display-inline">
                  {CONTACT_PAGE.MAIN_HEADING.part2}
                </span>
              </h1>
            </div>
          </div>
          <div className="contact-container w-full h-full flex flex-col items-center justify-center md:flex-row gap-8 md:gap-12 lg:gap-14 xl:gap-22">
            <div className="w-full h-full md:w-[50%]  flex flex-col md:flex-col-reverse items-center justify-center ronded-[10px] gap-5 md:gap-10 lg:gap-14 xl:gap-14 ">
              <div className="contact-left-container w-full md:h-[330px] lg:h-[390px] xl:h-[430px] flex flex-col gap-3 md:gap-5 lg:gap-6 xl:gap-7 text-left">
                    <Image
                  src={`/${CONTACT_PAGE.IMAGE}`}
                  alt={CONTACT_PAGE.IMAGE_ALT}
                  width={1000}
                  height={1000}
                    className="w-full h-full object-cover rounded-[10px]"
                    />
              </div>
              <div className="left-content">
                <div className="left-title-container flex flex-col items-center justify-center  md:items-start gap-3 xl:gap-4 text-center">
                  <div className="title">
                    <h1
                      className="text-[1.9rem] md:text-[2.05rem] lg:text-[2.2rem] xl:text-[2.3rem] text-center  font-bold text-heading-color font-poppins-util"
                      style={{ lineHeight: 1.2 }}
                    >
                      {CONTACT_PAGE.LEFT_SECTION.HEADING.part1}{' '}
                      <span className="heading-gradient display-inline">
                        {CONTACT_PAGE.LEFT_SECTION.HEADING.part2}
                      </span>
                    </h1>
                  </div>
                  <div className="description">
                    <p className="text-sm lg:text-base xl:text-lg text-description-color text-center font-roboto-util max-w-3xl md:text-left md:max-w-full">
                      {CONTACT_PAGE.LEFT_SECTION.DESCRIPTION}
                    </p>
                  </div>
                  <div className="left-svg mt-1 md:mt-3 flex items-center justify-center">
                    <a
                      href="https://www.linkedin.com/company/assurerates"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <div
                        className="w-10 h-10  lg:w-11 lg:h-11  rounded-full bg-heading-gradient flex items-center justify-center"
                        
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none" className="w-5 h-5 lg:w-6 lg:h-6 ">
                          <path d="M21.1399 20.5325C19.8274 20.5012 18.5462 20.5012 17.2337 20.5325C16.9524 20.5325 16.8899 20.47 16.8899 20.1887C16.8899 17.8762 16.8899 15.5325 16.8899 13.22C16.8899 12.6887 16.8587 12.1575 16.7024 11.6575C16.2337 10.0325 14.3587 9.43874 13.0149 10.5325C12.2962 11.095 12.0149 11.8762 12.0149 12.8137C12.0149 15.0012 12.0149 17.1887 12.0149 19.3762C12.0149 19.6575 11.9837 19.9387 12.0149 20.2512C12.0462 20.5012 11.9212 20.5637 11.7024 20.5325C10.3587 20.5325 9.04618 20.5325 7.70243 20.5325C7.45243 20.5325 7.38993 20.47 7.38993 20.22C7.42118 18.2512 7.42118 16.2825 7.42118 14.2825C7.42118 11.845 7.42118 9.40749 7.38993 7.00124C7.38993 6.71999 7.45243 6.65749 7.70243 6.65749C9.04618 6.65749 10.3587 6.65749 11.7024 6.65749C11.9524 6.65749 12.0149 6.71999 12.0149 6.96999C12.0149 7.46999 12.0149 7.96999 12.0149 8.56374C12.1087 8.46999 12.1399 8.43874 12.1712 8.40749C13.3899 6.62624 15.1087 6.12624 17.1399 6.43874C19.4837 6.81374 20.9837 8.43874 21.3587 10.9387C21.4524 11.5325 21.4837 12.1262 21.4837 12.72C21.4837 15.22 21.4837 17.6887 21.4837 20.1887C21.4837 20.4387 21.4212 20.5325 21.1399 20.5325ZM4.88993 13.595C4.88993 15.7825 4.88993 17.97 4.88993 20.1575C4.88993 20.4387 4.82743 20.5325 4.54618 20.5325C3.23368 20.5012 1.92118 20.5325 0.608678 20.5325C0.358678 20.5325 0.296178 20.47 0.296178 20.22C0.296178 15.8137 0.296178 11.3762 0.296178 6.96999C0.296178 6.75124 0.358678 6.65749 0.608678 6.65749C1.95243 6.65749 3.29618 6.65749 4.63993 6.65749C4.92118 6.65749 4.95243 6.75124 4.95243 7.00124C4.88993 9.18874 4.88993 11.3762 4.88993 13.595ZM5.10868 3.03249C4.79618 4.28249 3.51493 5.00124 2.04618 4.75124C0.483679 4.50124 -0.391321 2.96999 0.171179 1.46999C0.546179 0.532487 1.45243 -0.0300124 2.60868 0.00123757C4.35868 -0.0300124 5.51493 1.37624 5.10868 3.03249Z" fill="white"/>
                        </svg>
                      </div>
                    </a>
                  </div>
                    </div>
                </div>
            </div>

            <div className="contact-form-container w-full md:w-[50%]  ">
              <div className="hero-form w-full bg-[#E8F4FC] rounded-[10px] shadow-[4px_4px_4px_0_rgba(52,118,219,0.25)] flex flex-col items-center justify-center gap-2 lg:gap-3">
                <Form {...form}>
                  <form onSubmit={handleFormSubmit} className="w-full px-[25px] pt-[40px] pb-[30px] md:px-[30px] md:pt-[45px] md:pb-[35px] xl:px-[40px] xl:pt-[48px] xl:pb-[40px] ">
                    <TrustedForm onCertUrlReady={handleTrustedFormReady} />

                    <div className="mb-2 ">
                      <label
                        className="block text-left text-[0.8rem] lg:text-[0.9rem] xl:text-[1rem] font-semibold font-roboto-util text-black-700 mb-1"
                        htmlFor="fullName"
                      >
                        {CONTACT_PAGE.FORM.FIELDS[0].label}
                      </label>
                    </div>

                    <FormField
                      control={form.control}
                      name="fullName"
                      rules={{ required: 'First name is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-3 top-3 lg:top-3 xl:top-3.5 z-10">
                                <Image
                                  src={`/${CONTACT_PAGE.FORM.FIELDS[0].icon}`}
                                  alt={CONTACT_PAGE.FORM.FIELDS[0].label}
                                  width={20}
                                  height={20}
                                  className="w-4.5 h-4.5 lg:w-5 lg:h-5 xl:w-5.5 xl:h-5.5"
                                />
                              </div>
                              <input
                                {...field}
                                type="text"
                                className={`w-full text-xs font-roboto-util pl-10 xl:pl-11 pr-3 py-3 lg:text-sm xl:text-base mb-3 lg:mb-4  rounded-[5px] border border-[#AFCAEF] bg-white placeholder:text-[#999999] transition-colors duration-200 ${
                                  form.formState.errors.fullName
                                    ? 'border-red-400'
                                    : 'border-[#AFCAEF]'
                                }`}
                                style={{
                                  border: form.formState.errors.fullName
                                    ? '1px solid #dc2626'
                                    : '1px solid #AFCAEF',
                                  outline: 'none',
                                }}
                                onFocus={e => {
                                  e.target.style.borderColor = '#5294E2';
                                  e.target.style.boxShadow = '0 0 0 1px rgba(82, 148, 226, 0.25)';
                                }}
                                onBlur={e => {
                                  e.target.style.borderColor =
                                    form.formState.errors.fullName
                                      ? '#dc2626'
                                      : '#AFCAEF';
                                  e.target.style.boxShadow = 'none';
                                }}
                                placeholder={CONTACT_PAGE.FORM.FIELDS[0].placeholder}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="mb-2 ">
                      <label
                        className="block text-left text-[0.8rem] lg:text-[0.9rem] xl:text-[1rem] font-semibold font-roboto-util text-black-700 mb-1"
                        htmlFor="email"
                      >
                        {CONTACT_PAGE.FORM.FIELDS[1].label}
                      </label>
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-3 top-3 lg:top-3.5 xl:top-3.5 z-10">
                                <Image
                                  src={`/${CONTACT_PAGE.FORM.FIELDS[1].icon}`}
                                  alt={CONTACT_PAGE.FORM.FIELDS[1].label}
                                  width={20}
                                  height={20}
                                  className="w-4.5 h-4.5 lg:w-5 lg:h-5 xl:w-5.5 xl:h-5.5"
                                />
                              </div>
                              <input
                                {...field}
                                type="email"
                                className={`w-full text-xs bg-white font-roboto-util pl-10 xl:pl-11 pr-3 py-3 lg:text-sm xl:text-base mb-3 lg:mb-4  rounded-[5px] border border-[#AFCAEF] placeholder:text-[#999999] transition-colors duration-200 ${
                                  form.formState.errors.email
                                    ? 'border-red-400'
                                    : 'border-[#AFCAEF]'
                                }`}
                                style={{
                                  border: form.formState.errors.email
                                    ? '1px solid #dc2626'
                                    : '1px solid #AFCAEF',
                                  outline: 'none',
                                }}
                                onFocus={e => {
                                  e.target.style.borderColor = '#5294E2';
                                  e.target.style.boxShadow = '0 0 0 1px rgba(82, 148, 226, 0.25)';
                                }}
                                onBlur={e => {
                                  e.target.style.borderColor =
                                    form.formState.errors.email
                                      ? '#dc2626'
                                      : '#AFCAEF';
                                  e.target.style.boxShadow = 'none';
                                }}
                                placeholder={CONTACT_PAGE.FORM.FIELDS[1].placeholder}
                    />
                </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="mb-2 ">
                      <label
                        className="block text-left text-[0.8rem] lg:text-[0.9rem] xl:text-[1rem]  font-semibold  font-roboto-util text-black-700 mb-1"
                        htmlFor="subject"
                      >
                        {CONTACT_PAGE.FORM.FIELDS[2].label}
                      </label>
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      rules={{ required: 'Subject is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-3 top-3 lg:top-3.5 xl:top-3.5 z-10">
                                <Image
                                  src={`/${CONTACT_PAGE.FORM.FIELDS[2].icon}`}
                                  alt={CONTACT_PAGE.FORM.FIELDS[2].label}
                                  width={20}
                                  height={20}
                                  className="w-4.5 h-4.5 lg:w-5 lg:h-5 xl:w-5.5 xl:h-5.5"
                                />
                    </div>
                              <input
                                {...field}
                                type="text"
                                className={`w-full text-xs bg-white font-roboto-util pl-10 xl:pl-11 pr-3 py-3 lg:text-sm xl:text-base mb-3 lg:mb-4  rounded-[5px] border border-[#AFCAEF] placeholder:text-[#999999] transition-colors duration-200 ${
                                  form.formState.errors.subject
                                    ? 'border-red-400'
                                    : 'border-[#AFCAEF]'
                                }`}
                                style={{
                                  border: form.formState.errors.subject
                                    ? '1px solid #dc2626'
                                    : '1px solid #AFCAEF',
                                  outline: 'none',
                                }}
                                onFocus={e => {
                                  e.target.style.borderColor = '#5294E2';
                                  e.target.style.boxShadow = '0 0 0 1px rgba(82, 148, 226, 0.25)';
                                }}
                                onBlur={e => {
                                  e.target.style.borderColor =
                                    form.formState.errors.subject
                                      ? '#dc2626'
                                      : '#AFCAEF';
                                  e.target.style.boxShadow = 'none';
                                }}
                                placeholder={CONTACT_PAGE.FORM.FIELDS[2].placeholder}
                              />
                </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="mb-2 ">
                      <label
                        className="block text-left text-[0.8rem] lg:text-[0.9rem] xl:text-[1rem] font-semibold font-roboto-util text-black-700 mb-1"
                        htmlFor="message"
                      >
                        {CONTACT_PAGE.FORM.FIELDS[3].label}
                      </label>
            </div>

                    <FormField
                      control={form.control}
                      name="message"
                      rules={{ required: 'Message is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-3 top-3 lg:top-3.5 xl:top-3.5 z-10">
                    <Image
                                  src={`/${CONTACT_PAGE.FORM.FIELDS[3].icon}`}
                                  alt={CONTACT_PAGE.FORM.FIELDS[3].label}
                                  width={20}
                                  height={20}
                                  className="w-4.5 h-4.5 lg:w-5 lg:h-5 xl:w-5.5 xl:h-5.5"
                    />
                </div>
                              <textarea
                                {...field}
                                rows={6}
                                className={`w-full text-xs bg-white font-roboto-util pl-10 xl:pl-11 pr-3 py-3 lg:text-sm xl:text-base mb-3 lg:mb-4  border border-[#AFCAEF] rounded-[5px] placeholder:text-[#999999] transition-colors duration-200 resize-none ${
                                  form.formState.errors.message
                                    ? 'border-red-400'
                                    : 'border-[#AFCAEF]'
                                }`}
                                style={{
                                  border: form.formState.errors.message
                                    ? '1px solid #dc2626'
                                    : '1px solid #AFCAEF',
                                  outline: 'none',
                                  lineHeight: 1.5,
                                }}
                                onFocus={e => {
                                  e.target.style.borderColor = '#5294E2';
                                  e.target.style.boxShadow = '0 0 0 1px rgba(82, 148, 226, 0.25)';
                                }}
                                onBlur={e => {
                                  e.target.style.borderColor =
                                    form.formState.errors.message
                                      ? '#dc2626'
                                      : '#AFCAEF';
                                  e.target.style.boxShadow = 'none';
                                }}
                                placeholder={CONTACT_PAGE.FORM.FIELDS[3].placeholder}
                              />
                    </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="submit-btn w-full max-w-[160px] lg:max-w-[200px] xl:max-w-[220px]  mx-auto rounded-[8px] mt-2 xl:mt-4 text-sm md:text-sm lg:text-base xl:text-[1.1rem] font-semibold bg-heading-gradient font-roboto-util flex items-center justify-center text-white px-5 py-6 md:py-5.5 lg:py-6 xl:py-6.6 overflow-hidden transition-all duration-300 ease-in-out z-10 hover:bg-blue cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className=" ">
                        {isSubmitting
                          ? 'Submitting...'
                          : CONTACT_PAGE.FORM.SUBMIT_BUTTON}
                      </span>
                    </Button>
                  </form>
                </Form>
                </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </React.Fragment>
  );
}