import React from "react";

const About = () => {
  return (
    <section id="about" className="mb-20">
      {/* Hero headline with Fraunces font */}
      <h1 className="text-text-primary mb-10 font-(family-name:--font-fraunces) text-[32px] leading-[1.45] font-medium tracking-[-0.01em]">
        I&apos;m a Software Engineer with 1+ year of experience building and
        optimizing production web systems. I work across frontend and backend to
        deliver reliable, maintainable features, using technologies such as
        React, TypeScript, Laravel and modern web APIs.
      </h1>

      {/* Body paragraphs with DM Sans */}
      <div className="text-text-secondary flex flex-col gap-6 text-[15px] leading-[1.75]">
        <p>
          In my first full-time role at Sera Global, I&apos;ve contributed to
          production systems for Japan-based clients, working on purchase and
          reward flows, improving performance for data-heavy interfaces, and
          collaborating cross-functionally to deliver end-to-end functionality.
        </p>
        <p>
          Through this work, I&apos;ve helped improve system performance in
          user-critical flows—boosting React table rendering performance for
          large-scale data views and supporting applications handling
          <b className="font-extrabold"> 2,400+ </b>
          monthly transactions. These experiences reinforced how frontend
          responsiveness, backend efficiency, and overall system design together
          shape real user experience.
        </p>
        <p>
          I strongly value learning by doing. When facing unfamiliar challenges,
          I take initiative to understand the problem deeply, apply the right
          tools, and continuously improve both the product and my engineering
          skills through real-world implementation and feedback.
        </p>
      </div>
    </section>
  );
};

export default About;
