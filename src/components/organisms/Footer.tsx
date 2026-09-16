"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const servicesLinks = [
    {
      name: "Weboldal Készítés",
      href: "/szolgaltatasok/weboldal-keszites",
    },
    {
      name: "WordPress Webshop",
      href: "/szolgaltatasok/woocommerce-webshop-keszites",
    },
    {
      name: "Webshop Fejlesztés",
      href: "/szolgaltatasok/webshop-fejlesztes",
    },
    {
      name: "WordPress Kecskemét",
      href: "/szolgaltatasok/wordpress-weboldal-keszites-kecskemet",
    },
    {
      name: "SEO Optimalizálás",
      href: "/szolgaltatasok/seo-optimalizalas",
    },
    {
      name: "Marketing Lead Generálás",
      href: "/szolgaltatasok/marketing-lead-generalas",
    },
    { name: "Grafikai Tervezés", href: "/szolgaltatasok/grafikai-tervezes" },
    {
      name: "Egyedi Arculattervezés",
      href: "/szolgaltatasok/egyedi-arculattervezes-logo",
    },
    {
      name: "AI Workflow Kialakítás",
      href: "/szolgaltatasok/ai-workflow-kialakitas",
    },
    {
      name: "AI Kép és Videó Generálás",
      href: "/szolgaltatasok/ai-kep-es-videogeneralas",
    },
    {
      name: "AI Prompt Engineering",
      href: "/szolgaltatasok/ai-prompt-engineering",
    },
    {
      name: "Vírusirtás & Biztonság",
      href: "/szolgaltatasok/wordpress-virusirtas-es-biztonsag",
    },
  ];

  const quickLinks = [
    { name: "Rólam", href: "/szia-norbi-vagyok" },
    { name: "Munkáim", href: "/munkak" },
    { name: "Hírek", href: "/hirek" },
    { name: "Kapcsolat", href: "/kapcsolat" },
  ];

  return (
    <footer className="public-footer bg-bg-base border-t border-slate-800 mt-0 relative overflow-hidden">
      {/* Laser Effect Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-[#00B5F1]/20 to-transparent animate-pulse" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-linear-to-b from-transparent via-[#00B5F1]/10 to-transparent animate-pulse delay-1000" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-linear-to-b from-transparent via-[#00B5F1]/20 to-transparent animate-pulse delay-500" />
      </div>

      {/* Main Footer Content */}
      <div className="px-6 lg:px-8 py-16 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-4 group">
              <span className="text-2xl font-black font-serif tracking-tighter text-text-primary group-hover:text-[#00B5F1] transition-colors duration-300">
                <span className="text-[#00B5F1]">Web</span>Dude
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Prémium webfejlesztés, grafikai tervezés és AI automatizáció
              Kecskemétről. 26 éves grafikusi és 16 éves webfejlesztési
              tapasztalattal.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.youtube.com/@WebDude-HU"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[#00B5F1] transition-colors hover:scale-110 transform duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/webdudehu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[#00B5F1] transition-colors hover:scale-110 transform duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.behance.net/bnorbert"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[#00B5F1] transition-colors hover:scale-110 transform duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 7h-9v2h9V7zm0 8h-7v2h7v-2zM8.33 11.23c-1.39 0-2.52-1.12-2.52-2.52 0-1.4 1.13-2.52 2.52-2.52 1.4 0 2.52 1.12 2.52 2.52 0 1.4-1.12 2.52-2.52 2.52zM5.5 13.5H11v6H5.5v-6zM0 6h4.52v2H0V6zm0 12h4.52v2H0v-2z" />
                </svg>
              </a>
              <a
                href="https://hu.pinterest.com/awebdude/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[#00B5F1] transition-colors hover:scale-110 transform duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2"
          >
            <h3 className="text-text-primary font-bold mb-4 uppercase tracking-wider text-sm">
              Szolgáltatások
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-[#00B5F1] transition-colors text-sm hover:translate-x-1 transform duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 lg:col-span-1"
          >
            <h3 className="text-text-primary font-bold mb-4 uppercase tracking-wider text-sm">
              Gyorslinkek
            </h3>
            <ul className="grid grid-cols-1 gap-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-[#00B5F1] transition-colors text-sm hover:translate-x-1 transform duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 lg:col-span-1"
          >
            <h3 className="text-text-primary font-bold mb-4 uppercase tracking-wider text-sm">
              Elérhetőség
            </h3>
            <ul className="space-y-3">
              <li className="text-slate-400 text-sm">
                <a
                  href="tel:+36703238003"
                  className="hover:text-[#00B5F1] transition-colors hover:translate-x-1 transform duration-300 inline-block"
                >
                  +36 70 323 8003
                </a>
              </li>
              <li className="text-slate-400 text-sm">
                <a
                  href="mailto:hello@webdude.hu"
                  className="hover:text-[#00B5F1] transition-colors hover:translate-x-1 transform duration-300 inline-block"
                >
                  hello@webdude.hu
                </a>
              </li>
              <li className="text-slate-400 text-sm">
                Kecskemét, Magyarország
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-700">
              <a
                href="https://ai-promt.hu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group"
              >
                <div className="relative w-24 h-8">
                  <Image
                    src="/assets/logos/ai-promt_logo.webp"
                    alt="AI-Prompt.hu"
                    fill
                    className="object-contain transition-all duration-300 group-hover:scale-110"
                  />
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Logó Csík */}
      <div className="border-t border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="relative">
          <div className="flex flex-row flex-nowrap items-center justify-center lg:justify-between lg:max-w-6xl lg:mx-auto overflow-x-auto lg:overflow-x-visible hide-scrollbar gap-3 md:gap-4 px-4 lg:px-0 py-4">
            {[
              {
                name: "Gemini",
                href: "https://gemini.google.com",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                  >
                    <defs>
                      <linearGradient
                        id="gem_g"
                        x1="2"
                        y1="2"
                        x2="22"
                        y2="22"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#1A73E8"></stop>
                        <stop offset="0.5" stopColor="#4285F4"></stop>
                        <stop offset="1" stopColor="#9b72f3"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2c0 5.523-4.477 10-10 10 5.523 0 10 4.477 10 10 0-5.523 4.477-10 10-10-5.523 0-10-4.477-10-10z"
                      fill="url(#gem_g)"
                    ></path>
                  </svg>
                ),
              },
              {
                name: "ChatGPT",
                href: "https://chat.openai.com",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                  >
                    <circle cx="12" cy="12" r="11.5" fill="#10A37F"></circle>
                    <path
                      d="M8.7 9.873V8.04c0-.154.058-.27.193-.347l3.684-2.122c.502-.29 1.1-.424 1.717-.424 2.315 0 3.781 1.794 3.781 3.703 0 .135 0 .29-.019.444l-3.82-2.238a.646.646 0 00-.695 0L8.7 9.873zm8.604 7.137V12.63c0-.27-.116-.462-.348-.598l-4.842-2.817 1.581-.907a.35.35 0 01.386 0l3.684 2.123c1.062.616 1.775 1.928 1.775 3.201 0 1.467-.868 2.816-2.24 3.376zM7.56 13.155L5.98 12.23c-.135-.077-.193-.193-.193-.347V7.64c0-2.064 1.582-3.627 3.723-3.627.81 0 1.563.27 2.2.753L7.907 6.963c-.231.135-.347.328-.347.598v5.594zm3.404 1.967l-2.267-1.273v-2.7h2.267l2.267 1.273v2.7l-2.267 1.273zm1.457 5.864c-.81 0-1.563-.27-2.2-.752l3.8-2.199c.231-.135.347-.328.347-.598v-5.594l1.6 1.026c.135.077.193.193.193.347v4.244c0 2.064-1.6 3.627-3.74 3.627zm-4.572-4.3l-3.684-2.122c-1.061-.617-1.775-1.928-1.775-3.202 0-1.466.868-2.816 2.24-3.376v4.4c0 .27.116.463.347.598l4.823 2.798-1.581.907a.35.35 0 01-.386 0zm-.212 3.163c-2.18 0-3.781-1.64-3.781-3.664 0-.154.019-.308.038-.462l3.8 2.198c.232.135.463.135.695 0l4.842-2.797v1.832c0 .154-.058.27-.193.347l-3.683 2.122c-.502.29-1.1.424-1.718.424z"
                      fill="white"
                    ></path>
                  </svg>
                ),
              },
              {
                name: "Claude",
                href: "https://claude.ai",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                  >
                    <path
                      d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
                      fill="#D97757"
                    ></path>
                  </svg>
                ),
              },
              {
                name: "Copilot",
                href: "https://copilot.microsoft.com",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                  >
                    <defs>
                      <linearGradient
                        id="cp_g"
                        x1="2"
                        y1="4"
                        x2="22"
                        y2="20"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#25D0AB"></stop>
                        <stop offset="0.3" stopColor="#3B82F6"></stop>
                        <stop offset="0.6" stopColor="#8B5CF6"></stop>
                        <stop offset="1" stopColor="#F472B6"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12c0 3.04 1.36 5.77 3.5 7.6V22l2.72-1.5A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
                      fill="url(#cp_g)"
                    ></path>
                    <path
                      d="M8 10.5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-3z"
                      fill="white"
                      fillOpacity="0.9"
                    ></path>
                    <circle
                      cx="10.5"
                      cy="11.5"
                      r="1"
                      fill="url(#cp_g)"
                    ></circle>
                    <circle
                      cx="13.5"
                      cy="11.5"
                      r="1"
                      fill="url(#cp_g)"
                    ></circle>
                  </svg>
                ),
              },
              {
                name: "Perplexity",
                href: "https://perplexity.ai",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                  >
                    <circle cx="12" cy="12" r="11" fill="#1ABFAD"></circle>
                    <path
                      d="M8 7h5.5c2.5 0 4 1.5 4 4s-1.5 4-4 4H10.5V17H8V7zm2.5 5.5h3c1.1 0 1.5-.4 1.5-1.5s-.4-1.5-1.5-1.5h-3v3z"
                      fill="white"
                    ></path>
                  </svg>
                ),
              },
              {
                name: "Meta AI",
                href: "https://meta.ai",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                  >
                    <defs>
                      <linearGradient
                        id="meta_g"
                        x1="2"
                        y1="4"
                        x2="22"
                        y2="20"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#00C6FF"></stop>
                        <stop offset="0.5" stopColor="#0072FF"></stop>
                        <stop offset="1" stopColor="#00D2FF"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M6.897 4c1.915 0 3.516.932 5.43 3.376l.282-.373c.19-.246.383-.484.58-.71l.313-.35C14.588 4.788 15.792 4 17.225 4c1.273 0 2.469.557 3.491 1.516l.218.213c1.73 1.765 2.917 4.71 3.053 8.026l.011.392.002.25c0 1.501-.28 2.759-.818 3.7l-.14.23-.108.153c-.301.42-.664.758-1.086 1.009l-.265.142-.087.04a3.493 3.493 0 01-.302.118 4.117 4.117 0 01-1.33.208c-.524 0-.996-.067-1.438-.215-.614-.204-1.163-.56-1.726-1.116l-.227-.235c-.753-.812-1.534-1.976-2.493-3.586l-1.43-2.41-.544-.895-1.766 3.13-.343.592C7.597 19.156 6.227 20 4.356 20c-1.21 0-2.205-.42-2.936-1.182l-.168-.184c-.484-.573-.837-1.311-1.043-2.189l-.067-.32a8.69 8.69 0 01-.136-1.288L0 14.468c.002-.745.06-1.49.174-2.23l.1-.573c.298-1.53.828-2.958 1.536-4.157l.209-.34c1.177-1.83 2.789-3.053 4.615-3.16L6.897 4zm-.033 2.615l-.201.01c-.83.083-1.606.673-2.252 1.577l-.138.199-.01.018c-.67 1.017-1.185 2.378-1.456 3.845l-.004.022a12.591 12.591 0 00-.207 2.254l.002.188c.004.18.017.36.04.54l.043.291c.092.503.257.908.486 1.208l.117.137c.303.323.698.492 1.17.492 1.1 0 1.796-.676 3.696-3.641l2.175-3.4.454-.701-.139-.198C9.11 7.3 8.084 6.616 6.864 6.616zm10.196-.552l-.176.007c-.635.048-1.223.359-1.82.933l-.196.198c-.439.462-.887 1.064-1.367 1.807l.266.398c.18.274.362.56.55.858l.293.475 1.396 2.335.695 1.114c.583.926 1.03 1.6 1.408 2.082l.213.262c.282.326.529.54.777.673l.102.05c.227.1.457.138.718.138.176.002.35-.023.518-.073.338-.104.61-.32.813-.637l.095-.163.077-.162c.194-.459.29-1.06.29-1.785l-.006-.449c-.08-2.871-.938-5.372-2.2-6.798l-.176-.189c-.67-.683-1.444-1.074-2.27-1.074z"
                      fill="url(#meta_g)"
                    ></path>
                  </svg>
                ),
              },
              {
                name: "Midjourney",
                href: "https://midjourney.com",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                  >
                    <rect width="24" height="24" rx="6" fill="#0F172A"></rect>
                    <path
                      d="M6 18c0-3 2-8 6-13 4 5 6 10 6 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    ></path>
                    <path
                      d="M9 18c0-2 1.5-5 3-8 1.5 3 3 6 3 8"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                    ></path>
                    <line
                      x1="5"
                      y1="18"
                      x2="19"
                      y2="18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></line>
                  </svg>
                ),
              },
              {
                name: "Freepik",
                href: "https://freepik.com",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                  >
                    <rect width="24" height="24" rx="6" fill="#0F172A"></rect>
                    <path
                      d="M12 4L4 20h16L12 4z"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M12 10l-4 8h8l-4-8z"
                      fill="white"
                      fillOpacity="0.3"
                    ></path>
                  </svg>
                ),
              },
              {
                name: "Leonardo",
                href: "https://leonardo.ai",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                  >
                    <rect width="24" height="24" rx="6" fill="#000"></rect>
                    <circle
                      cx="12"
                      cy="12"
                      r="7"
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                    ></circle>
                    <rect
                      x="11"
                      y="7.5"
                      width="2"
                      height="9"
                      rx="1"
                      fill="white"
                    ></rect>
                  </svg>
                ),
              },
              {
                name: "Kling",
                href: "https://klingai.com",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                  >
                    <rect width="24" height="24" rx="6" fill="#000"></rect>
                    <rect
                      x="4"
                      y="4"
                      width="7"
                      height="7"
                      rx="1.5"
                      fill="#10a37f"
                    ></rect>
                    <rect
                      x="13"
                      y="4"
                      width="7"
                      height="7"
                      rx="1.5"
                      fill="#FF6F00"
                    ></rect>
                    <rect
                      x="4"
                      y="13"
                      width="7"
                      height="7"
                      rx="1.5"
                      fill="#FFCA28"
                    ></rect>
                    <rect
                      x="13"
                      y="13"
                      width="7"
                      height="7"
                      rx="1.5"
                      fill="#26A69A"
                    ></rect>
                  </svg>
                ),
              },
              {
                name: "Vidu",
                href: "https://vidu.ai",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-contain"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="11.5"
                      fill="#000"
                      stroke="#334155"
                      strokeWidth="1"
                    ></circle>
                    <path
                      d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l-2.705 1.25c.002.004-.002.008-.002.012"
                      fill="#FFFFFF"
                    ></path>
                  </svg>
                ),
              },
            ].map((ai) => (
              <motion.a
                key={ai.name}
                href={ai.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.4, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.15 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="shrink-0 flex items-center gap-2 transition-all duration-500 group/item grayscale hover:grayscale-0 hover:shadow-[0_0_20px_rgba(0, 181, 241,0.5)]"
              >
                <div className="w-4 h-4 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-500">
                  {ai.icon}
                </div>
                <span className="text-[8px] font-black text-white leading-tight hidden lg:block uppercase tracking-widest">
                  {ai.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border-t border-slate-800 bg-bg-base"
      >
        <div className="px-6 lg:px-8 py-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">
              &copy; {currentYear} WebDude.hu. Minden jog fenntartva.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <Link
                href="/adatvedelmi-szabalyzat"
                className="text-slate-400 hover:text-sky-500 transition-colors hover:translate-x-1 transform duration-300 inline-block"
              >
                Adatvédelmi nyilatkozat
              </Link>
              <Link
                href="/felhasznalasi-feltetelek"
                className="text-slate-400 hover:text-sky-500 transition-colors hover:translate-x-1 transform duration-300 inline-block"
              >
                Felhasználási feltételek
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
