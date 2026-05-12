---
name: ClinicalMind Design System
colors:
  surface: '#11131b'
  surface-dim: '#11131b'
  surface-bright: '#373942'
  surface-container-lowest: '#0c0e16'
  surface-container-low: '#191b23'
  surface-container: '#1d1f27'
  surface-container-high: '#282a32'
  surface-container-highest: '#32343d'
  on-surface: '#e1e2ed'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#e1e2ed'
  inverse-on-surface: '#2e3039'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#bdc7d9'
  on-secondary: '#27313f'
  secondary-container: '#404a59'
  on-secondary-container: '#afb9cb'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d9e3f6'
  secondary-fixed-dim: '#bdc7d9'
  on-secondary-fixed: '#121c2a'
  on-secondary-fixed-variant: '#3d4756'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#11131b'
  on-background: '#e1e2ed'
  surface-variant: '#32343d'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.5'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
  arabic-headline:
    fontFamily: Cairo
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.6'
  arabic-body:
    fontFamily: Cairo
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.8'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar-width: 260px
  topbar-height: 64px
  gutter: 16px
  margin-desktop: 24px
  margin-mobile: 16px
  panel-padding: 20px
---

## Brand & Style

The brand personality for this design system is authoritative yet visionary—a bridge between rigorous medical science and advanced artificial intelligence. It targets clinicians and researchers who require an environment that minimizes cognitive load while maintaining a sense of cutting-edge precision.

The visual style is a hybrid of **Minimalism** and **Glassmorphism**. It utilizes clear architectural boundaries and generous whitespace to ensure data integrity, while subtle translucent layers and "frozen glass" effects convey a futuristic, high-tech aesthetic. The interface is designed to feel like a high-end medical instrument: cold enough to be professional, but vibrant enough to guide the eye through complex diagnostic workflows.

## Colors

This design system uses a dual-mode palette optimized for long-duration clinical use. 

### Dark Mode (Primary)
The dark palette uses a deep navy base (#0D1117) to reduce eye strain in low-light hospital environments. Highlights are executed in a vibrant Electric Blue (#2563EB), while success states utilize a Clinical Green (#10B981). Glassmorphism effects are achieved using semi-transparent surface layers with backdrop blurs.

### Light Mode
The light palette shifts to a sterile, airy aesthetic using cool grays (#F8FAFC) and pure whites. Accent colors remain consistent but are paired with soft indigo-tinted shadows rather than glows to maintain depth and professionalism.

## Typography

The typography system is dual-language by design. **Inter** provides a highly legible, utilitarian frame for English data and UI labels. **Cairo** is paired for Arabic text, chosen for its modern geometric structure that harmonizes with the technical feel of Inter.

For RTL layouts, line-heights for Cairo are increased by approximately 15% to accommodate the visual complexity of Arabic script. Font weights are kept consistent across both languages to maintain visual hierarchy. For mobile devices, `display-lg` scales down to 24px, while body sizes remain constant to ensure accessibility.

## Layout & Spacing

This design system employs a **Fluid Grid** approach with a fixed sidebar. The layout is structured around a 12-column system for the main content area.

- **Desktop:** 260px fixed sidebar with a fluid content area. Content is housed in "Panels" that use a 16px gutter.
- **Tablet:** Sidebar collapses into a narrow icon-only rail (64px).
- **Mobile:** Sidebar becomes a bottom navigation bar or a hidden drawer. Padding scales down to 16px.

The spacing rhythm follows an 8px base unit. All internal panel padding is set to 20px (2.5 units) to provide a premium, spacious feel that avoids information density overload.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and **Tonal Layers**. 

In Dark Mode, panels use a `backdrop-filter: blur(20px)` and a subtle 1px border with a 10% white opacity to define edges against the deep navy background. No heavy shadows are used; instead, "inner glows" (subtle top-edge borders) suggest light coming from above.

In Light Mode, elevation is achieved through **Ambient Shadows**. Surfaces are pure white with a very soft, diffused 0 4px 20px rgba(0,0,0,0.05) shadow. This creates a "floated" effect that feels clean and clinical without the high-contrast drama of the dark mode.

## Shapes

The shape language is consistently **Rounded**. A radius of 12px (0.75rem) is the standard for primary containers and dashboard panels. This softens the technical nature of the AI data and makes the software feel more approachable and modern. 

Interactive elements like buttons use a slightly smaller radius (8px) to appear more "clickable" and distinct from the structural containers they sit within. Empty states and upload zones use dashed borders with the same 12px radius.

## Components

### Buttons & Inputs
Buttons feature a solid primary fill for main actions and a "Ghost" style (transparent with border) for secondary actions. In Dark Mode, primary buttons have a subtle outer glow. Input fields use a 1px border that brightens on focus, paired with a subtle background tint.

### Empty States (Image Upload)
The upload area is a primary focus. It features a large, centered plus icon, a dashed border (2px stroke), and a subtle gradient background. Text instructions are centered, using `body-md` for the main call-to-action and `label-sm` for file constraints (e.g., "DICOM, PNG").

### AI Result Areas
Results are housed in "Analysis Panels." These panels use a distinct top-border color (Primary Blue) to signify they are AI-generated. The "link for LLM" is styled as a text-link with a trailing "external-link" icon.

### Navigation (Bilingual)
The sidebar navigation icons are placed to the left of the text for LTR and automatically flip to the right for RTL. Active states are indicated by a vertical "pill" indicator and a subtle background highlight.

### Chips & Badges
Used for status (e.g., "Pending," "Analyzed"). These are small, pill-shaped elements with low-opacity background tints of the status color (e.g., 10% green background with 100% green text).