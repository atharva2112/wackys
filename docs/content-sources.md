# Content sources & verification

_Research date: October 2026._

## Research limitations (read first)

- **wackys.com could not be fetched from the build environment** (its network policy denied the host). Facts from the official site were taken from the **Wacky's Design System canvas** (which records content captured from wackys.com: locations, phones, features, VIP perks, package prices, copy) and from search-engine snippets of wackys.com pages.
- **Instagram and Facebook were not accessible**, so no posts, captions or photos were used. The social section links to the four official accounts only; `site.json → socialPosts` is empty until the business approves specific posts.
- **No photography was downloaded.** Reuse rights for wackys.com and social imagery were not confirmed, so photo positions use labelled slots and original illustration.
- Third-party delivery and review listings were used only to cross-check and are flagged `needs-confirmation`. **No third-party prices are shown.**

## Verification key

| Value | Meaning |
|---|---|
| `yes` | Confirmed from official Wacky's material |
| `partial` | Core facts official; some fields (hours, amenities, address detail) unconfirmed |
| `name` | Name confirmed; description/heat/details written or inferred for the site |
| `needs-confirmation` | From third-party or dated sources — confirm before launch |

## Sources by area

| Area | Data | Source | Status |
|---|---|---|---|
| Brand | Opened Dec 2007, Sault Ste. Marie; cedar-log cabin interior; 100+ wing flavours; 20+ fry flavours; "Eat, Drink, Game On!" | Design System (Main, Type, Voice boards, from wackys.com) | yes |
| Locations | 5 open + Sudbury "We'll be back, so stay tuned"; addresses & phones | Design System homepage/location card (wackys.com) | yes |
| Locations | Sudbury street address (187 Shaughnessy St.) | Tripadvisor / DoorDash listings | needs-confirmation |
| Hours | Thunder Bay takeout: Sun–Thu 11 AM–1 AM, Fri–Sat 11 AM–2 AM | Design System location card | yes |
| Hours | All other locations | Not published → site says "call to confirm" | pending |
| Map | Coordinates are city-level approximations used only to place pins | — | approximate |
| Amenities | Thunder Bay arcade, tabletop, air hockey, VR, billiards | wackys.com Half Price Games feature | yes |
| Amenities | Game line-ups at other locations | Unknown → shown as "call to ask" | pending |
| Promotions | AYCE Wings Wednesdays from 3 PM, beverage purchase, prices vary; takeout 24 wings/2 flavours/side **$27.99** | wackys.com/features, wackys.com/AYCE | yes |
| Promotions | Kids Eat Free Sundays (10 & under, one per adult entrée, participating locations) | wackys.com/features | yes |
| Promotions | Half Price Games Tuesdays — Thunder Bay only | wackys.com/features | yes |
| Promotions | Eat 'N Game On! combos $25 · $33 · $41 | Design System menu-list component | needs-confirmation (tier inclusions) |
| Parties | Kids Eat 'N Play Combo: Get in the Game $29.99; Gettin' Spoiled $39.99; fine print | wackys.com/party-packages via Design System | Gettin' Spoiled inclusions unconfirmed |
| Parties | Occasions: kids, sports, friends, team building, graduation | Design System homepage | yes |
| VIP | Free appetizer for signing up; 4-Cheese Spinach Dip on birthday; chance to win free wings for a year; mailing-list note | wackys.com/vip via Design System | yes |
| Flavours | Cheddar, Cool Ranch, Maple Bacon, Maple Bacon Cheddar, Garlic Parmesan, Dill Pickle, Parmesan & Herb, Roasted Red Pepper N' Garlic (dry); Mild to Wild, Sriracha Buffalo, Sauce Boss | wackys.com/wackyeats/?mid=566 (search snippet) | name |
| Flavours | Smokey BBQ, Buffalo (dry); Jalapeño Dill, Chili Lime, Medium Louisiana, Spicy Garlic, Habanero Thai | Older Sault Ste. Marie menu (search snippet) | needs-confirmation |
| Flavours | Heat levels and flavour profiles | Inferred from names for the explorer | needs kitchen sign-off |
| Menu | 7 Wing Meal, Build Your Own Smashburger, 3 Jumbo Chicken Tenders, Large Bacon Cheddar Poutine, 4-Cheese Spinach Dip | Design System / wackys.com | name |
| Menu | Bone-in sizes, boneless, plant-based 20 pc, Wing Sampler, Old-Fashioned / Boneless Wing / Butter Chicken Poutine, Big Wack Burger, Tater Tots | DoorDash, Uber Eats, SkipTheDishes, Restaurantji listings | needs-confirmation |
| Drinks | "Classic and specialty cocktails, from martinis to MEGAS — plus plenty of beer, craft included" | Design System homepage (wackys.com Drink header) | yes (no item list) |
| Careers | No postings found | — | business to supply |
| Social | @wackys_canada, @wackys_tbay (Instagram); wackyscanada, WackyWingsNorthBay (Facebook) | Project brief | yes |
| Links | Order: wackys.com/onlineordering · Reserve: wackys.com/make-a-reservation/ · VIP: wackys.com/vip/ · Menus: /eat/main-menu/, /dinein/, /AYCE/ | wackys.com navigation (search index) | yes |

## Design system

All visual decisions come from the **Wacky's Design System** canvas (claude.ai artifact, "Northern Lodge × Neo-Arcade"):
Char #1B1512, Birch #F5EEE2, Maple Red #D52B1E, Cedar #8C5A35, Spruce #1E3A2B, accents Sauce Orange #F5821F, Scoreboard Amber #FFC23D, Aurora #3EF0A6, Maple Deep #B3221A, neutrals Smoke/Ember/Lichen/Pine Ash/Bark; heat scale Mild→Wacky; Alfa Slab One / Barlow Condensed / Barlow / Silkscreen; Red Rule, ticket tag, stamped edge, star flanks, buffalo plaid, cedar log stack, CRT scanlines, scoreboard grid; stamped (Eat) vs glowing (Game On) depth; 2 px borders; radii 4/6/12/pill.
