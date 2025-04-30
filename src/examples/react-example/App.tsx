/** @format */

import React from "react";
import { OptimizedImage, withImageOptimization } from "convert-media";

const CustomImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <img {...props} className={`custom-image ${props.className || ""}`} />;
};

const OptimizedCustomImage = withImageOptimization(CustomImage);

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Convert Media Examples</h1>

      <section>
        <h2>Basic Usage</h2>
        <OptimizedImage
          src="/sample-image.jpg"
          format="webp"
          quality={85}
          alt="Sample optimized image"
          width={400}
          height={300}
        />
      </section>

      <section>
        <h2>With Custom Dimensions</h2>
        <OptimizedImage
          src="/large-image.jpg"
          format="webp"
          quality={75}
          convertWidth={800}
          alt="Resized large image"
        />
      </section>

      <section>
        <h2>Different Formats</h2>
        <div className="image-grid">
          <div>
            <h3>Original JPG</h3>
            <img src="/original-image.jpg" alt="Original JPG" width={300} />
          </div>

          <div>
            <h3>WebP Format</h3>
            <OptimizedImage
              src="/original-image.jpg"
              format="webp"
              quality={80}
              alt="WebP version"
              width={300}
            />
          </div>

          <div>
            <h3>AVIF Format</h3>
            <OptimizedImage
              src="/original-image.jpg"
              format="avif"
              quality={80}
              alt="AVIF version"
              width={300}
            />
          </div>
        </div>
      </section>

      <section>
        <h2>With Custom Component</h2>
        <OptimizedCustomImage
          src="/profile-pic.jpg"
          format="webp"
          quality={90}
          alt="Profile picture"
          width={200}
          style={{ borderRadius: "50%" }}
        />
      </section>
    </div>
  );
};

export default App;
