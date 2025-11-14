import React from "react";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBrandTiktok,
  IconHome,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";

export function Dock() {
  const links = [
    
    {
      title: "Email",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "mailto:support@theglen.in",
    },
    
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.instagram.com/soumya_shekhar8/",
    },
    
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/soumya-shekhar-973039287/",
    },
    
    
  ];

  return (
    <div className="flex mt-5 items-center justify-center h-[5rem] w-full bottom-10 z-50 dark:bg-gray-800">
      <p>
        <span className="text-3xl font-bold text-gray-800 dark:text-gray-200 ml-5">
          The Glen
        </span>
        <span className="text-2xl text-sm font-bold text-gray-400"> © 2025</span>
      </p>
      <FloatingDock
        // only for demo, remove for production
        mobileClassName="translate-y-20"
        items={links}
      />
    </div>
  );
}
