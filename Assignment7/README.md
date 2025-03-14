# Travel Explorer Website

A responsive multi-page travel website featuring a home page, destinations listing page, and individual destination detail pages. This website demonstrates the use of CSS Grid, Flexbox, and advanced SASS/SCSS features.

## SASS/SCSS Features Implemented

### Core Features

1. **Variables** - Used for colors, fonts, spacing, and other consistent values in _variables.scss

2. **Custom Properties** - Implemented CSS custom properties alongside SASS variables for theme options

3. **Nesting** - Used throughout to organize styles hierarchically, especially in component styles

4. **Interpolation** - Used for dynamic selectors and property values in animations and loops

5. **Placeholder Selectors** - Created reusable styles with % syntax for cards, containers, and transitions

6. **Mixins** - Created reusable style blocks with parameters for flexbox, grid, buttons, and responsive design

7. **Functions** - Created utility functions for calculations and transformations (rem conversion, color handling)

### Additional SASS/SCSS Features

1. **Maps** - Used for breakpoints, z-index levels, and other collections of related values

2. **Control Directives** - Used @if, @else if, @else for conditional styles and @for loops for animations

3. **Parent Selector** - Used extensively for modifying elements based on states and context

4. **@import and Partials** - Organized code into separate files with specific responsibilities

5. **@extend** - Inherited styles from placeholders for consistent component styling

6. **Built-in Functions** - Used darken(), rgba(), map-get() throughout the stylesheet

7. **@at-root** - Used to break out of nesting when needed for global styles

## CSS Layout Features

### CSS Grid Layouts
- Main responsive grid system with various column configurations
- Destinations grid for cards that changes from 1-3 columns based on screen size
- Travel tips section with 4-column grid on the homepage
- Footer content using grid layout for responsive organization

### Flexbox Layouts
- Navigation menu using flexbox for horizontal alignment
- Featured cards section with flexible card layout
- Filter controls with responsive placement
- Newsletter section combining content and form elements

## File Organization
Organized SCSS files into abstracts/, base/, components/, layout/, and pages/ folders for modular structure

## Interactive Features
- Interactive buttons with hover and active states
- Destination filtering by region, theme, and budget
- Individual destination detail pages with related content

## Setup Instructions
Simple npm-based setup with SASS compilation and local development server

## Browser Support
Modern browser support (Chrome, Firefox, Safari, Edge)