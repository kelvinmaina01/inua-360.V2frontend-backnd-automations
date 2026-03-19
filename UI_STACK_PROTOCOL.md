# Inua360 UI Development Guardrails 🇰🇪

This document is a **MANDATORY** reference for all UI-related tasks. If any AI agent (Antigravity/Claude) is asked to modify the UI, they MUST follow these "Golden Rules" to preserve the integrity of the original Figma design.

## 1. The Color Commandment
- **NEVER** use ad-hoc hex codes or standard Tailwind colors (e.g., `bg-blue-500`, `text-purple-600`).
- **ALWAYS** use the project's HSL variables defined in `index.css`:
    - **Orange**: `hsl(var(--inua-orange))` or `bg-primary`
    - **Teal**: `hsl(var(--nairobi-teal))` or `bg-secondary`
    - **Yellow**: `hsl(var(--matatu-yellow))`
- **DEFAULT TO DARK MODE FIRST**: All components must look premium in both modes but prioritize the charcoal background (`--background`).

## 2. The Component Commandment
- **NEVER** use standard HTML tags like `<button>`, `<input>`, or `<a>` directly for primary UI.
- **ALWAYS** use the primitives in `frontend/src/components/ui/` (Shadcn components).
- **VARIANT RULE**: Always check the `ButtonVariants` in `button.tsx` before choosing a style.

## 3. The Mobile-First (393px) Commandment
- **TOUCH TARGETS**: Every interactive element must be at least 48x48px. Use the `.touch-target` class.
- **PWA LAYOUT**: Respect the Bottom Navigation for mobile and the Sidebar for desktop. Do not overlap or hide these.

## 4. The Bilingual & Content Commandment
- **NEVER** hardcode English or Swahili strings in TSX files.
- **ALWAYS** use the `useContent()` hook or the `t()` helper.
- **API-FIRST**: Texts must be fetched from the `content_strings` table in our Postgres database via the Backend API.
- **ILLEGAL PATTERN**: `{language === 'sw' ? '...' : '...'}` is now strictly forbidden and will be flagged as a critical error.

## 5. The Verification Protocol
Before submitting a UI change, the agent must:
1. Run `grep` on `bg-` and `text-` to ensure no non-brand colors were used.
2. Check `index.css` for any new "pollution" (unnecessary new classes).
3. Confirm `.animate-fade-in` or other brand animations were used for transitions.
