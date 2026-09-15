\# Frontend Design Skill

\## Mission

Create a premium, production-quality personal portfolio that feels intentionally designed and professionally art-directed.

The goal is NOT to produce a generic AI-generated website.

\---

\## 1. Design Philosophy

Prioritize:

\- Strong visual hierarchy

\- Clear content structure

\- Intentional typography

\- Consistent spacing

\- Professional color systems

\- Meaningful motion

\- High-quality interactions

\- Responsive behavior

\- Accessibility

\- Performance

Every design decision should support the portfolio's identity as a professional software engineer.

\---

\## 2. Typography

Use a deliberate typography hierarchy.

Maintain consistency between:

\- Display headings

\- Section headings

\- Body text

\- Supporting text

\- Labels

\- Navigation

\- Buttons

Do not use arbitrary font sizes.

Prefer a coherent type scale.

Avoid excessive font-weight variation.

\---

\## 3. Spacing

Use an 8px-based spacing system.

Preferred values:

8px

16px

24px

32px

40px

48px

64px

80px

96px

128px

Avoid arbitrary spacing unless there is a strong visual reason.

\---

\## 4. Color System

Use semantic design tokens.

Define and reuse:

\- Background

\- Surface

\- Elevated surface

\- Primary text

\- Secondary text

\- Muted text

\- Border

\- Primary accent

\- Secondary accent

\- Success

\- Warning

\- Error

Never scatter random hex values throughout components.

\---

\## 5. Components

Build reusable components with consistent:

\- Padding

\- Typography

\- Border radius

\- Borders

\- Shadows

\- Hover states

\- Focus states

\- Disabled states

Do not duplicate UI patterns unnecessarily.

Reuse existing project components whenever possible.

\---

\## 6. Animation

Use Framer Motion for UI animation where appropriate.

Preferred:

\- Scroll-triggered reveals

\- Staggered content entrances

\- Subtle hover transitions

\- Button micro-interactions

\- Card interactions

\- Section transitions

\- Layout transitions

Animation should communicate hierarchy and interaction.

Avoid animation purely for decoration.

Respect:

`prefers-reduced-motion`

Never allow animation to interfere with usability.

\---

\## 7. Premium Visual Quality

The portfolio should feel:

\- Modern

\- Technical

\- Sophisticated

\- Clean

\- Responsive

\- Intentional

Avoid generic AI aesthetics.

Do NOT automatically use:

\- Purple gradients

\- Excessive blue/purple glow

\- Excessive glassmorphism

\- Random floating blobs

\- Giant rounded cards everywhere

\- Excessive shadows

\- Unnecessary gradients

\- Overly animated backgrounds

\- Generic SaaS layouts

Visual effects must have a purpose.

\---

\## 8. Portfolio Identity

This is a developer portfolio.

Prioritize:

\- Technical credibility

\- Projects

\- Engineering skills

\- Experience

\- Problem-solving

\- Architecture

\- Real implementations

\- GitHub/project links

\- Professional presentation

Do not make it look like a generic marketing landing page.

\---

\## 9. Responsive Design

Use mobile-first responsive design.

Test:

\- Mobile

\- Tablet

\- Laptop

\- Desktop

\- Large desktop

Never assume desktop layout will automatically work on mobile.

\---

\## 10. Accessibility

Maintain:

\- Semantic HTML

\- Keyboard navigation

\- Visible focus states

\- Accessible labels

\- Sufficient contrast

\- Reduced-motion support

Do not sacrifice accessibility for visual effects.

\---

\## 11. Performance

Prefer:

\- Efficient animations

\- GPU-friendly transforms

\- Lazy loading

\- Optimized assets

\- Minimal unnecessary JavaScript

\- Code splitting where appropriate

Avoid expensive effects that provide little visual value.

\---

\## 12. Existing Architecture

Before changing anything:

1\. Inspect the existing architecture.

2\. Inspect existing components.

3\. Inspect existing styling.

4\. Inspect existing design tokens.

5\. Inspect existing animations.

6\. Inspect existing 3D/WebGL.

7\. Reuse what already works.

Do not rewrite the application unnecessarily.

\---

\## 13. Safe Modification

When modifying the portfolio:

\- Change only the required files.

\- Preserve existing functionality.

\- Preserve routing.

\- Preserve APIs.

\- Preserve state management.

\- Preserve existing 3D functionality.

\- Avoid unnecessary dependencies.

\- Run validation after changes.

Never perform a full rewrite unless explicitly requested.

\---

\## 14. Development Workflow

Work incrementally.

For each visual phase:

1\. Inspect existing implementation.

2\. Explain intended changes.

3\. Modify only relevant files.

4\. Run lint/type checks.

5\. Run tests if available.

6\. Run production build when appropriate.

7\. Visually inspect the result.

8\. Report files changed and validation results.

Do not redesign the entire application in one operation.
