"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/">MAIN</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/course">COURSE</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/about">ABOUT</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
       <NavigationMenuItem>
         <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
           <Link href="/product">PRODUCTS</Link>
         </NavigationMenuLink>
       </NavigationMenuItem>
       <NavigationMenuItem>
         <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
           <Link href="/contact">CONTACT</Link>
         </NavigationMenuLink>
       </NavigationMenuItem>

    </NavigationMenuList>
  </NavigationMenu>
);
