# The Juggling Company Dashboard

A web application for tracking juggling progress and learning technical skills.

## Features

- Track juggling practice sessions
- Learn technical skills through guided projects
- Reflect on your learning journey
- Earn achievements
- Stay updated with news and blog posts

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/the-juggling-company-dashboard.git
cd the-juggling-company-dashboard/webapp
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Page components
- `/src/context` - React context providers
- `/src/data` - Mock data for development
- `/src/utils` - Utility functions

## 🖌 Colour palette & theming

The application uses a custom color palette themed around the three main juggling topics:

- **Juggling & Technology**: Blue (`#2f6398`)
- **Juggling & Change**: Green (`#3ea075`)
- **Juggling & Your Brain**: Red (`#b74047`)
- **Neutral highlights**: Sand (`#e2c293`)

### How to use the colors

#### In Tailwind CSS

The colors are available as Tailwind classes:

```jsx
<div className="bg-tj-blue text-white">Juggling & Technology</div>
<div className="bg-tj-green text-white">Juggling & Change</div>
<div className="bg-tj-red text-white">Juggling & Your Brain</div>
<div className="bg-tj-sand text-gray-800">Neutral highlight</div>
```

#### In CSS

The colors are also available as CSS variables:

```css
.my-element {
  background-color: var(--tj-blue);
  color: white;
}
```

#### In Material UI

The colors are mapped to Material UI's theme:

- `primary.main` = tj-blue
- `secondary.main` = tj-green
- `error.main` = tj-red
- `background.sand` = tj-sand

```jsx
<Button color="primary">Blue Button</Button>
<Button color="secondary">Green Button</Button>
<Button color="error">Red Button</Button>
```

### Adding new categories

To add a new category with its own color:

1. Add the color to `src/index.css`:
```css
:root {
  /* Existing colors */
  --tj-purple: #8a4fff; /* New category */
}
```

2. Add the color to `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      tj: {
        // Existing colors
        purple: '#8a4fff', // New category
      },
    },
  },
},
```

3. Update the `getCategoryColor` function in `NewsCard.js` to include the new category.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
