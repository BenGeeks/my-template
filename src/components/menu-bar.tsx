import { NavigationMenu, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import React from 'react';

const NavMenu = () => {
  return (
    <NavigationMenu>
      <Link href="/" legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
      </Link>

      <Link href="/dashboard" legacyBehavior passHref className="mr-2">
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
      </Link>
    </NavigationMenu>
  );
};

export default NavMenu;
