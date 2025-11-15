# 🎨 Theme Quick Reference Guide

## Color Constants

```javascript
import { colors } from "../theme/theme";

// Primary Colors
colors.primary; // #1976D2 - Main brand blue
colors.primaryDark; // #1565C0 - Darker shade
colors.primaryLight; // #BBDEFB - Lighter shade

// Accent Colors
colors.accent; // #FFA500 - Orange highlights
colors.accentDark; // #FF8C00 - Dark orange

// Status Colors
colors.success; // #4CAF50 - Success green
colors.error; // #F44336 - Error red
colors.warning; // #FFC107 - Warning yellow
colors.info; // #2196F3 - Info blue

// Text Colors
colors.textPrimary; // Dark text
colors.textSecondary; // Medium text
colors.textTertiary; // Light text

// Backgrounds
colors.white; // #FFFFFF
colors.bgLight; // #F5F7FA
colors.bgDark; // #E0E0E0

// Borders
colors.border; // Subtle border color
```

---

## Common Patterns

### **Gradient Buttons**

```jsx
<Button
  sx={{
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
    color: colors.white,
    fontWeight: 600,
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 8px 20px rgba(25, 118, 210, 0.3)`,
    },
  }}>
  Click Me
</Button>
```

### **Professional Cards**

```jsx
<Card
  sx={{
    background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.bgLight} 100%)`,
    border: `1px solid ${colors.primary}20`,
    boxShadow: `0 8px 24px rgba(25, 118, 210, 0.08)`,
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: `0 12px 32px rgba(25, 118, 210, 0.12)`,
      transform: "translateY(-2px)",
    },
  }}>
  Card Content
</Card>
```

### **Active Route Indicator**

```jsx
<Button
  sx={{
    position: "relative",
    color: colors.primary,
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: isActive ? 2 : 0,
      backgroundColor: colors.accent,
      transition: "height 0.3s ease",
    },
  }}>
  Navigation Link
</Button>
```

### **Hover Effects**

```jsx
Box: {
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: colors.primary + "15",
    transform: "translateY(-2px)",
    boxShadow: `0 8px 20px rgba(25, 118, 210, 0.2)`
  }
}
```

### **Professional Input Fields**

```jsx
<TextField
  sx={{
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: colors.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.accent,
      },
    },
  }}
/>
```

### **Gradient Backgrounds**

```jsx
Box: {
  background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.accent}15 100%)`,
  border: `1px solid ${colors.primary}30`,
  borderRadius: "16px"
}
```

---

## Spacing Constants

```javascript
// 8px base unit
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
xxl:  48px
```

**Usage:**

```jsx
sx={{
  padding: 3,        // 24px (uses theme.spacing)
  margin: 2,         // 16px
  marginBottom: 4,   // 32px
  gap: 2,            // 16px between children
}}
```

---

## Shadow Constants

```javascript
sm:  0 2px 4px rgba(0, 0, 0, 0.1)
md:  0 4px 8px rgba(0, 0, 0, 0.12)
lg:  0 8px 24px rgba(0, 0, 0, 0.15)
xl:  0 12px 32px rgba(0, 0, 0, 0.2)
```

**Usage:**

```jsx
sx={{
  boxShadow: `0 8px 24px rgba(25, 118, 210, 0.15)`
}}
```

---

## Typography Hierarchy

```javascript
// Headings
h1: { fontSize: "2.5rem", fontWeight: 800 }
h2: { fontSize: "2rem", fontWeight: 800 }
h3: { fontSize: "1.5rem", fontWeight: 700 }
h4: { fontSize: "1.25rem", fontWeight: 700 }
h5: { fontSize: "1rem", fontWeight: 600 }
h6: { fontSize: "0.875rem", fontWeight: 600 }

// Body
body1: { fontSize: "1rem", fontWeight: 400 }
body2: { fontSize: "0.875rem", fontWeight: 400 }

// Special
button: { fontSize: "0.875rem", fontWeight: 600, textTransform: "none" }
caption: { fontSize: "0.75rem", fontWeight: 500 }
```

---

## Common Component Recipes

### **Hero Section**

```jsx
<Box
  sx={{
    background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.accent}15 100%)`,
    borderRadius: "16px",
    p: 4,
    mb: 4,
    border: `1px solid ${colors.primary}30`,
  }}>
  <Typography
    variant="h2"
    sx={{
      fontWeight: 800,
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}>
    Heading with Gradient
  </Typography>
</Box>
```

### **Stat Card**

```jsx
<Card
  sx={{
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
    color: colors.white,
    borderRadius: "12px",
    boxShadow: `0 8px 24px rgba(25, 118, 210, 0.15)`,
  }}>
  <CardContent>
    <Typography sx={{ fontSize: 13, opacity: 0.8 }}>Label</Typography>
    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
      Value
    </Typography>
  </CardContent>
</Card>
```

### **Filter Card**

```jsx
<Card
  sx={{
    background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.bgLight} 100%)`,
    border: `1px solid ${colors.primary}20`,
    boxShadow: `0 4px 12px rgba(25, 118, 210, 0.08)`,
  }}>
  {/* Filter inputs */}
</Card>
```

---

## Icon Integration

### **With Lucide React**

```jsx
import { TrendingUp, Download, Calendar } from "lucide-react";

<Button
  startIcon={<TrendingUp size={18} />}
  endIcon={<Download size={18} />}
>
  Export Report
</Button>

// Colored icons
<TrendingUp size={24} color={colors.primary} />
<Download size={24} color={colors.accent} />
```

---

## Animations

### **Page Entrance**

```jsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.6 }}>
  Content
</motion.div>;
```

### **Staggered List**

```jsx
{
  items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}>
      {item}
    </motion.div>
  ));
}
```

---

## Responsive Breakpoints

```javascript
xs: 0px      // Phone
sm: 600px    // Tablet
md: 960px    // Desktop
lg: 1280px   // Large desktop
xl: 1920px   // Extra large
```

**Usage:**

```jsx
sx={{
  fontSize: { xs: "1.5rem", md: "2rem", lg: "2.5rem" },
  padding: { xs: 2, md: 4 },
  display: { xs: "none", md: "flex" }
}}
```

---

## Best Practices

✅ **DO:**

- Use `colors` from theme system
- Apply consistent spacing (8px units)
- Use professional shadows
- Add hover effects with `transition: "all 0.3s ease"`
- Use gradients for visual interest
- Test on mobile, tablet, desktop
- Keep animations under 0.6s

❌ **DON'T:**

- Hardcode color values
- Mix different spacing systems
- Apply inconsistent shadows
- Create jarring animations
- Forget responsive breakpoints
- Use too many different fonts

---

## Troubleshooting

**Colors not applying?**

- Make sure to import: `import { colors } from "../theme/theme";`
- Check theme is wrapped in `<ThemeProvider>` in App.jsx

**Animations not working?**

- Install framer-motion: `npm install framer-motion`
- Import: `import { motion } from "framer-motion";`

**Icons not showing?**

- Install lucide-react: `npm install lucide-react`
- Import specific icons: `import { TrendingUp } from "lucide-react";`

**Gradients blurry?**

- Use `backgroundClip: "text"` and `WebkitBackgroundClip: "text"` for text gradients
- Use `linear-gradient()` for background gradients

---

## Quick Commands

```bash
# View current theme
# Location: c:\Work\farmer\assured_farming_frontend\src\theme\theme.js

# Test in browser
npm run dev
# Opens at http://localhost:5173/

# Build for production
npm run build

# Lint code
npm run lint
```

---

**Last Updated:** November 14, 2025  
**Theme Version:** 1.0 (Production)  
**Maintained By:** Design System Team
