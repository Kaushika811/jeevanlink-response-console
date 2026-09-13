# JeevanLink Emergency Operations Dashboard

## Goal
Build a polished, desktop-first responder command center at `/` that demonstrates JeevanLink’s offline emergency workflow with realistic, clearly labeled mock data.

## Experience
- Establish a dark command-center visual system using charcoal surfaces, warm amber brand accents, restrained emergency red, clear typography, soft borders, and subtle depth.
- Add a fixed desktop navigation rail and compact mobile navigation for Overview, Incidents, Live Map, Network, Activity, and Settings.
- Build a high-signal overview with the active-alert total emphasized, supporting emergency counts, network health, and a live-looking response timeline.
- Create an operational incident map mockup with terrain/road structure, emergency markers, legend, zoom, locate, and filter controls. Label the map as simulated data.
- Add a searchable and filterable incident registry with unique `JL-YYYYMMDD-XXXX` IDs, priority/type/status indicators, locations, times, and device sources.
- Open a responsive incident detail drawer on row or map-marker selection. Include copyable IDs and coordinates, location accuracy/fix data, device/network details, and status actions.
- Implement the full demo state sequence: Active → Acknowledged → Responding → Resolved. Keep the selected map marker synchronized and append each change to the activity timeline.
- Make notifications interactive and keep all transitions controlled, accessible, and reduced-motion aware.

## Data and Component Structure
- Store typed incidents, device nodes, activities, priorities, and filter definitions in a dedicated mock-data module so a future API can replace them cleanly.
- Split the interface into focused components for navigation, header, overview metrics, incident map, filters/table, detail drawer, network health, and activity timeline.
- Keep all state local to the dashboard; add no authentication, database, or real-time service.

## Responsive Behavior
- Preserve the dense operations layout on wide screens.
- Reflow panels for laptops and tablets, collapse navigation on smaller screens, keep map controls reachable, make the table horizontally scrollable, and present incident details as a full-height mobile sheet.

## Technical Details
- Use React, TypeScript, TanStack Router, Tailwind CSS v4, existing shadcn primitives, and Lucide icons.
- Define all palette, typography, surface, shadow, and motion values as semantic tokens in `src/styles.css`.
- Add page-specific metadata and replace the starter title/description.
- Keep the UI explicit that incident and map information is simulated prototype data.

## Validation
- Verify the current build diagnostics after implementation.
- Exercise search, filters, incident selection, map-marker synchronization, notifications, and every response status transition in the browser.
- Check desktop and mobile screenshots for readability, overflow, overlap, and accessible control states.
