# JeevanLink Response Console

Build a premium, modern Emergency Response Dashboard for a project called "JeevanLink".

JeevanLink is an offline emergency communication system that allows people to send emergency SOS alerts to nearby devices without relying on internet connectivity.

This dashboard represents the RESPONDER / EMERGENCY OPERATIONS side of JeevanLink.

IMPORTANT:

This should NOT look like a generic admin dashboard, CRM, analytics dashboard, or template.

It should feel like a real emergency-response command center product:

- premium

- modern

- highly visual

- trustworthy

- operational

- clean

- sophisticated

- designed for quick decision-making during emergencies

==================================================

CORE VISUAL DIRECTION

==================================================

Create a dark, premium command-center interface.

Visual style:

- deep charcoal / near-black background

- off-white text

- restrained emergency red

- warm amber/gold accent inspired by the JeevanLink mobile app

- subtle glass / layered surfaces

- soft borders

- subtle shadows

- large but controlled typography

- generous spacing

- refined rounded corners

- minimal visual noise

Do NOT make it:

- a basic Bootstrap dashboard

- a generic SaaS admin panel

- overly colorful

- filled with random charts

- overly futuristic/neon

- cyberpunk

- cluttered

The design should look like a product that could realistically be used by emergency responders.

==================================================

BRANDING

==================================================

Brand:

JeevanLink

Use a simple JeevanLink emergency/lifeline + location visual identity.

Header should contain:

- JeevanLink logo/mark

- "Emergency Operations"

- network status indicator

Primary tagline:

"Offline Emergency Response Network"

Use consistent JeevanLink branding throughout.

==================================================

MAIN DASHBOARD STRUCTURE

==================================================

Create a sophisticated command-center layout.

TOP HEADER:

Left:

JeevanLink logo

"Emergency Operations"

Center or secondary area:

"Live Response Center"

Right:

- "OFFLINE NETWORK" status badge

- current date/time

- responder profile/avatar

- notification icon

==================================================

1. LIVE OVERVIEW

==================================================

Instead of boring standard statistic cards, create visually polished metric panels.

Show:

ACTIVE ALERTS

3

CRITICAL

1

MEDICAL

1

TRAPPED

1

NEARBY DEVICES

4

Each metric should have:

- meaningful icon

- number

- short label

- subtle status indicator

- restrained visual hierarchy

Make the ACTIVE ALERTS metric the primary focus.

==================================================

2. LIVE EMERGENCY MAP

==================================================

This should be one of the most important sections.

Create a large interactive-looking map panel.

For now, use a realistic map-style visual/mock map if no map API is configured.

Show several emergency markers.

Markers should represent:

- Medical

- Trapped

- Food/Water

- Shelter

The map should feel like a real emergency operations map, not a decorative image.

Include a small legend.

Map header:

"LIVE INCIDENT MAP"

Subtext:

"Nearby emergency activity"

Include controls such as:

- zoom in

- zoom out

- locate

- filter

These controls should visually work where practical.

IMPORTANT:

Do not claim that real GPS/map data is connected if it is currently mock data.

==================================================

3. ACTIVE INCIDENTS

==================================================

Create a premium incident list/table.

Title:

"ACTIVE INCIDENTS"

Each incident must display:

Alert ID

Emergency Type

Priority

Location

Time

Status

Source Device

Example:

JL-20260913-0017

MEDICAL HELP

CRITICAL

13.1649232, 80.2992745

10:11 PM

ACTIVE

Device JL-042

JL-20260913-0018

TRAPPED

HIGH

13.1650124, 80.299306

10:14 PM

ACTIVE

Device JL-057

IMPORTANT:

Every emergency alert MUST have a unique Alert ID.

Use this format:

JL-YYYYMMDD-XXXX

Example:

JL-20260913-0017

Make the ID visually easy to identify and copy.

Do NOT use generic IDs like:

1

2

3

==================================================

4. INCIDENT DETAIL PANEL

==================================================

When an incident is clicked, open a polished detail panel or side drawer.

Show:

EMERGENCY ALERT

Alert ID

JL-20260913-0017

Type

MEDICAL HELP

Priority

CRITICAL

Sent At

13 Sep 2026, 10:11 PM

Location

13.1649232

80.2992745

Location Accuracy

46.8 m

Location Fix

10:11:00 PM

Source Device

JL-042

Network Status

Offline / Nearby

Response Status

ACTIVE

Include action buttons:

ACKNOWLEDGE

MARK RESPONDING

RESOLVE

These should have realistic UI state changes.

For example:

ACTIVE

→ ACKNOWLEDGED

→ RESPONDING

→ RESOLVED

Do not actually connect these actions to a backend unless one exists.

Use mock state for now.

==================================================

5. NETWORK STATUS

==================================================

Create a visually interesting "Network Health" section.

Show:

Nearby Devices

4

Connected

3

Offline

1

Network Mode

OFFLINE

Communication

ACTIVE

Make this section reinforce JeevanLink's core concept:

communication can continue without internet.

Include a small visual representation of nearby devices/nodes.

For example:

        Device A

        /      \

   Device B   Device C

        \      /

        Device D

But make it polished and subtle rather than a technical diagram.

==================================================

6. RESPONSE ACTIVITY

==================================================

Add a compact live activity timeline.

Example:

10:14 PM

New TRAPPED alert

JL-20260913-0018

10:11 PM

MEDICAL alert received

JL-20260913-0017

10:08 PM

Device JL-057 connected

10:05 PM

Offline network established

Make it feel live.

Add subtle status indicators and timestamps.

==================================================

7. PRIORITY SYSTEM

==================================================

Use a clear emergency priority hierarchy.

CRITICAL

Medical emergency / immediate danger

HIGH

Trapped / urgent assistance

MEDIUM

Food / water

LOW

Shelter

Use color sparingly:

- critical → red

- high → amber/orange

- medium → muted yellow

- low → neutral/soft accent

Do not make the entire dashboard red.

==================================================

8. FILTERS

==================================================

Add useful incident filtering.

Filters:

- All

- Critical

- Medical

- Trapped

- Food / Water

- Shelter

- Active

- Responding

- Resolved

Also add:

- Search Alert ID

- Search location/device

Filtering should actually work with the mock data.

==================================================

9. PREMIUM INTERACTIONS

==================================================

The dashboard must NOT feel static.

Add tasteful interactions:

- hover states

- smooth card transitions

- incident selection

- detail drawer

- filter transitions

- status badge changes

- subtle map marker animations

- notification interaction

- responsive sidebar

- live-looking activity updates

Keep animations subtle and professional.

Do NOT add excessive animations.

==================================================

10. RESPONSIVE DESIGN

==================================================

Desktop is the primary target because this is an emergency operations dashboard.

Also make it responsive for:

- laptop

- tablet

- smaller screens

On smaller screens:

- collapse sidebar

- stack metric panels

- make incident list horizontally scrollable or responsive

- keep incident details accessible

==================================================

11. NAVIGATION

==================================================

Create a polished sidebar/navigation.

Items:

Overview

Incidents

Live Map

Network

Activity

Settings

The Overview page is the main dashboard.

Navigation should actually switch views or sections.

Do not create empty pages just for decoration. If a section is not fully implemented, keep it minimal and clearly part of the prototype.

==================================================

12. MOCK DATA

==================================================

Use realistic mock emergency data based on the JeevanLink concept.

Create multiple incidents with:

- unique Alert ID

- emergency type

- priority

- latitude

- longitude

- timestamp

- location accuracy

- source device ID

- status

Example device IDs:

JL-042

JL-057

JL-063

JL-081

Example alert IDs:

JL-20260913-0017

JL-20260913-0018

JL-20260913-0019

JL-20260913-0020

Keep the data internally consistent.

IMPORTANT:

Clearly structure mock data so it can later be replaced by a real backend/API.

==================================================

13. DEMO-FRIENDLY FEATURES

==================================================

This dashboard will be shown to hackathon judges.

Make the demo flow impressive:

1. Dashboard opens on Overview.

2. Active alerts are immediately visible.

3. Click an incident.

4. Detail drawer opens.

5. Show Alert ID, emergency, timestamp and location.

6. Change status from ACTIVE → ACKNOWLEDGED → RESPONDING → RESOLVED.

7. Map marker corresponds to the selected incident.

8. Activity timeline updates.

9. Network status reinforces offline communication.

The experience should tell the story visually without requiring a presenter to explain every element.

==================================================

14. TECHNICAL REQUIREMENTS

==================================================

Use a modern frontend stack supported by Lovable.

Prefer:

- React

- TypeScript

- Tailwind CSS

- modern component architecture

Use reusable components.

Keep mock data separate from UI components.

Do not add unnecessary backend infrastructure yet.

Do not require authentication yet.

Do not require real-time backend yet.

Do not pretend mock data is live data.

==================================================

15. MOST IMPORTANT DESIGN REQUIREMENT

==================================================

The final result should look like:

"Emergency Operations Center"

NOT:

"Student CRUD Dashboard"

NOT:

"Generic Admin Panel"

NOT:

"Simple dashboard with 4 cards and a table"

The first impression should be:

premium emergency-response technology.

The dashboard should visually communicate:

EMERGENCY

LOCATION

NETWORK

RESPONSE

OFFLINE COMMUNICATION

without becoming visually cluttered.

Build the complete polished dashboard, not just a wireframe.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0c294f06-cd81-4b30-9c53-7e6bb1b492ac).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
