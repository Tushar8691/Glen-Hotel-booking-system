// ResizableNavbar.jsx
import React, { useState } from "react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "./ui/navbar-menu"; // Your navbar components
import { useNavigate } from "react-router-dom";
import { FollowerPointerCard } from "./ui/following-pointer";

const ResizableNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);

  const { openSignUp, openSignIn } = useClerk();
  const { user } = useUser();

  // Base nav items (always visible)
  const baseNavItems = [
    { name: "Hotels", link: "/hotel" },
    { name: "Experiences", link: "/experiences" },
    { name: "About Us", link: "/about" },
  ];

  // Additional nav items for logged-in users
  const loggedInNavItems = [
    { name: "Bookings", link: "/my-bookings" },
  ];

  // Combine nav items based on user status
  const navItems = user 
    ? [...baseNavItems, ...loggedInNavItems]
    : baseNavItems;

  const handleSignUp = () => {
    openSignUp();
  };

  const handleSignIn = () => {
    openSignIn();
  };

  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Navbar */}

      <Navbar className={`transition-all duration-300 ${isShrunk ? "py-3" : "py-6"}`}>
        <NavBody>
          <NavbarLogo link="/index" />
          <NavItems 
            items={navItems} 
            className="space-x-7" // Increase spacing between items
            onItemClick={() => console.log("Item clicked")} 
          />
          <div className="flex space-x-3 items-center">
            {user ? (
              // Show only UserButton when user is signed in
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
              />
            ) : (
              // Show login/signup buttons when user is not signed in
              <>
                <NavbarButton onClick={handleSignIn} variant="secondary">
                  Login
                </NavbarButton>
                <NavbarButton onClick={handleSignUp} variant="primary">
                  Sign Up
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>
      </Navbar>


      {/* Mobile Navbar */}
      <MobileNav className="top-2">
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle 
            isOpen={isOpen} 
            onClick={() => setIsOpen(!isOpen)} 
          />
        </MobileNavHeader>
        <MobileNavMenu 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="block px-2 py-1 text-neutral-600 dark:text-neutral-300"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="flex flex-col space-y-2 mt-4">
            {user ? (
              // Show only UserButton in mobile when user is signed in
              <div className="flex justify-center py-2">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10"
                    }
                  }}
                />
              </div>
            ) : (
              // Show login/signup buttons in mobile when user is not signed in
              <>
                <NavbarButton onClick={handleSignIn} variant="secondary">
                  Login
                </NavbarButton>
                <NavbarButton onClick={handleSignUp} variant="primary">
                  Sign Up
                </NavbarButton>
              </>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </>
  );
};

export default ResizableNavbar;
