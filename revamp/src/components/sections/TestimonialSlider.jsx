import React from 'react';
import TestimonialCard from '../cards/TestimonialCard';

// Main component, must be the default export in this single file structure
const TestimonialSlider = () => {
    const items = [
        { 
            id: 1,
            name: "Chizoba Elebiyo",
            testimony: "The quality of these paints is absolutely exceptional. The colors are vibrant, the coverage is perfect, and they last for years. My clients are always amazed by the results.",
            occupation: "Interior Designer",
            rating: 4,
        },
        { 
            id: 2,
            name: "Ebiere Katherine",
            testimony: "I was skeptical about the price at first, but after seeing the results, I can say it's worth every penny. This ONIPTTECH paint transformed my living room completely.",
            occupation: "Homeowner",
            rating: 4,
        },
        { 
            id: 3,
            name: "Abimbola Habeeb",
            testimony: "As a professional, I need paints I can trust. These go on smooth, dry quickly, and the color consistency is outstanding. My go-to brand for all projects",
            occupation: "Professional Painter",
            rating: 4,
        },
        { 
            id: 4,
            name: "Funmilade Mobolaji",
            testimony: "The durability is incredible. Projects I painted 5 years ago still look fresh and vibrant. My customers always ask what brand I use, and I'm proud to recommend these paints.",
            occupation: "Contractor",
            rating: 4,
        },
        { 
            id: 5,
            name: "Augustina Nwogu",
            testimony: "The color accuracy is phenomenal. What I see in the sample is exactly what I get on the wall. Perfect for my art studio where color precision is everything",
            occupation: "Art Studio Owner",
            rating: 4,
        },
        { 
            id: 6,
            name: "Bankole Nwogu",
            testimony: "I've tried many brands over the years, but nothing compares to the ease of application and final finish of these paints. They make my job easier and my clients happier.",
            occupation: "Renovation Specialist",
            rating: 4,
        },
    ];

    return (
        <Marquee items={items} />
    );
};

// Marquee Component
const Marquee = ({ items }) => {
  
  // The Marquee Content Block component renders the original set of items.
  // This component will be duplicated.
  const MarqueeContentBlock = ({ items, keyPrefix }) => (
    <div className="md:gap-8 gap-4 flex shrink-0 py-4" key={keyPrefix}>
      {/* We use px-8 to provide leading/trailing space around the marquee block */}
      <div className="flex md:space-x-8 space-x-4 md:px-4 px-2"> 
        {items.map((item, index) => (
          <TestimonialCard key={`${keyPrefix}-${item.id}-${index+1}`} {...item} />
        ))}
      </div>
    </div>
  );

  return (
    // Outer WrTestimonialSliderer: Creates the viewport and hides overflow
    <div className="marquee-wrapper w-full overflow-hidden">
      
      {/* Inner Wrapper: This is the element that gets animated */}
      {/* Note the use of w-max and flex-nowrap to hold the duplicated content side-by-side */}
      <div className="marquee-inner w-max flex flex-nowrap">
        
        {/* Block 1: Original content */}
        <MarqueeContentBlock items={items} keyPrefix="original" />
        
        {/* Block 2: Duplicated content (The seamless loop source) */}
        <MarqueeContentBlock items={items} keyPrefix="duplicate" />
        
      </div>
    </div>
  );
};

export default TestimonialSlider;
