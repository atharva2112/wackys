type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };

export const NAV: NavItem[] = [
  { href: "/menu", label: "Menu", children: [
    { href: "/menu", label: "Food Menu" },
    { href: "/flavours", label: "Wing Flavours" },
    { href: "/drinks", label: "Drinks" },
  ] },
  { href: "/games", label: "Games" },
  { href: "/specials", label: "Specials" },
  { href: "/parties", label: "Parties" },
  { href: "/locations", label: "Locations" },
];

export const MOBILE_NAV = [
  ...NAV.flatMap((n) => n.children ?? [n]),
  { href: "/vip", label: "VIP Club" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_NAV = {
  explore: [
    { href: "/menu", label: "Food Menu" },
    { href: "/flavours", label: "Wing Flavours" },
    { href: "/drinks", label: "Drinks" },
    { href: "/games", label: "Games & Entertainment" },
    { href: "/specials", label: "Specials & Events" },
    { href: "/parties", label: "Parties" },
  ],
  company: [
    { href: "/about", label: "About Wacky's" },
    { href: "/locations", label: "Locations" },
    { href: "/vip", label: "VIP Club" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact Us" },
  ],
  legal: [
    { href: "/accessibility", label: "Accessibility" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
};
