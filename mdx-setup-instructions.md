# Article Writing Guide

A quick reference for writing MDX articles for the portfolio.

---

## Quick Start

1. Open the MDX Editor: **https://mdxeditor.dev/editor/demo**
2. Write your article content
3. Save as `.mdx` file in `/content/articles/your-article-slug.mdx`

---

## Required Frontmatter

Every MDX article **must** start with this frontmatter block:

```mdx
---
title: "Your Article Title"
description: "A brief summary of the article (1-2 sentences). This appears in article listings."
date: "YYYY-MM-DD"
tag: "Category"
---
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The article title displayed on the page |
| `description` | Yes | Short summary for listings and SEO |
| `date` | Yes | Publication date in `YYYY-MM-DD` format |
| `tag` | Yes | Category tag (e.g., "Performance", "React", "TypeScript") |
| `thumbnail` | No | Path to hero image: `/content/images/slug/hero.jpg` |
| `featured` | No | Set to `true` to highlight on homepage |

---

## Article Structure Template

```mdx
---
title: "Your Article Title"
description: "Brief description here."
date: "2024-01-15"
tag: "Category"
thumbnail: "/content/images/article-slug/hero.jpg"
featured: false
---

Opening paragraph that hooks the reader. Explain what problem you're solving or what you'll cover.

## Section Heading

Content for this section...

### Subsection (if needed)

More detailed content...

## Another Section

Continue your article...

## Conclusion

Wrap up with key takeaways or results.
```

---

## Writing Checklist

Before publishing, make sure your article has:

- [ ] Meaningful title that describes the content
- [ ] Clear description (shown in article listings)
- [ ] Correct date format (`YYYY-MM-DD`)
- [ ] Appropriate tag/category
- [ ] Opening paragraph that explains the topic
- [ ] Logical section structure with `##` headings
- [ ] Code examples with proper syntax highlighting
- [ ] Conclusion or key takeaways

---

## MDX Syntax Reference

### Headings

```mdx
## Main Section (H2)
### Subsection (H3)
#### Sub-subsection (H4)
```

### Code Blocks

Use triple backticks with language identifier:

````mdx
```tsx
const MyComponent = () => {
  return <div>Hello World</div>;
};
```
````

Common language identifiers: `tsx`, `ts`, `jsx`, `js`, `css`, `bash`, `json`

### Inline Code

```mdx
Use `backticks` for inline code like `useState` or `npm install`.
```

### Links

```mdx
[Link text](https://example.com)
```

### Images

```mdx
![Alt text](/content/images/article-slug/image.png)
```

### Bold & Italic

```mdx
**bold text**
*italic text*
***bold and italic***
```

### Lists

```mdx
- Bullet point 1
- Bullet point 2
  - Nested item

1. Numbered item
2. Another item
```

### Blockquotes

```mdx
> This is a quote or callout.
```

---

## File Naming

- Use **lowercase** with **hyphens**: `my-article-title.mdx`
- The filename becomes the URL slug: `/writings/my-article-title`
- Keep it short but descriptive

---

## Image Organization

Store article images in: `/content/images/[article-slug]/`

Example:
```
/content/images/optimizing-dashboard/
  hero.jpg
  before-after.png
  code-screenshot.png
```

Reference in article:
```mdx
![Dashboard optimization results](/content/images/optimizing-dashboard/before-after.png)
```

---

## Quick Tips

1. **Start with the problem** - What challenge did you face?
2. **Show, don't just tell** - Include code examples and screenshots
3. **Be specific** - Concrete numbers and results are compelling
4. **Keep sections focused** - One main idea per section
5. **Use code blocks liberally** - Developers love seeing actual code

---

## Useful Links

- **MDX Editor**: https://mdxeditor.dev/editor/demo
- **MDX Documentation**: https://mdxjs.com/docs/
- **CommonMark Spec**: https://commonmark.org/help/
