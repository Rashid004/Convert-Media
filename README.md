<!-- @format -->

# convert-media

A simple React component for converting images to WebP and other formats, with future support for video compression.

## Installation

```bash
npm install convert-media
```

## Usage

### Basic Example

```jsx
import { ConvertMedia } from "convert-media";

function App() {
  return (
    <div>
      <ConvertMedia format="webp" quality={80}>
        <img src="/path/to/image.jpg" alt="My image" />
      </ConvertMedia>
    </div>
  );
}
```

### Available Props

| Prop    | Type                               | Default | Description     |
| ------- | ---------------------------------- | ------- | --------------- |
| format  | 'webp' \| 'png' \| 'jpg' \| 'avif' | 'webp'  | Output format   |
| quality | number                             | 80      | Quality (1-100) |

## API Usage (Node.js)

You can also use the utility functions directly:

```javascript
import { convertImage } from "convert-media";
import fs from "fs/promises";

async function convertMyImage() {
  const imageBuffer = await fs.readFile("input.jpg");
  const webpBuffer = await convertImage(imageBuffer, {
    format: "webp",
    quality: 80,
  });

  await fs.writeFile("output.webp", webpBuffer);
}
```

## Roadmap

- [ ] Add video compression support
- [ ] Support for more image formats
- [ ] Browser-based conversion without API dependency
- [ ] Custom compression options

## License

MIT
