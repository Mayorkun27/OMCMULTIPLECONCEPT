import React from 'react';
import ColorCard from '../cards/ColorCard';

const Marquee = ({ items, direction, rowId }) => {
  const MarqueeContentBlock = ({ items, keyPrefix }) => (
    <div className="flex md:gap-4 gap-4 flex-nowrap py-4" key={keyPrefix}>
      <div className="flex md:space-x-4 space-x-4 md:px-4 px-2"> 
        {items.map((item, index) => (
          <ColorCard key={`${keyPrefix}-${item.id}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="marquee-wrapper w-full overflow-hidden">
      <div className={`marquee-inner w-max flex flex-nowrap ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}
           style={{ animationName: `marquee-scroll-${direction}-${rowId}` }}>
        <MarqueeContentBlock items={items} keyPrefix="original" />
        <MarqueeContentBlock items={items} keyPrefix="duplicate" />
        {/* Add more duplicates for very long screens or very few items to ensure seamless loop */}
        <MarqueeContentBlock items={items} keyPrefix="duplicate2" /> 
        <MarqueeContentBlock items={items} keyPrefix="duplicate3" />
      </div>
    </div>
  );
};

// Main component, must be the default export in this single file structure
const ColorPaletteSlider = () => {
  // Define your color data for each row
  // Ensure at least 10 colors per row for a good loop effect
  // Data for Row 1: Whites, Creams, Yellows (Scrolling Left)
    const row1Colors = [
        { id: 1, name: "Hot White (3046)", hex: "#F5E8E8" },
        { id: 2, name: "Pale Blue (3091)", hex: "#D5E8F3" },
        { id: 3, name: "Silver Grey (3093)", hex: "#E1E2E4" },
        { id: 4, name: "Sunflower (3029)", hex: "#F8D832" },
        { id: 5, name: "Golden Yellow (3031)", hex: "#DDAE3A" },
        { id: 6, name: "Warm White (3033)", hex: "#F8D69A" },
        { id: 7, name: "Sand (1703)", hex: "#BC8D67" },
        { id: 8, name: "Cream (3040)", hex: "#E7C693" },
        { id: 9, name: "Bluff Puff (3041)", hex: "#B08B69" },
        { id: 10, name: "Chocolate (3048)", hex: "#745037" },
    ];

    // Data for Row 2: Greens, Blues, Aquas (Scrolling Right)
    const row2Colors = [
        { id: 1, name: "Light Green (9070)", hex: "#A9E198" },
        { id: 2, name: "Leaf Green (9071)", hex: "#40A75B" },
        { id: 3, name: "Aquamarine (7079)", hex: "#008B8B" },
        { id: 4, name: "Ice Grey (8087)", hex: "#C2D1D1" },
        { id: 5, name: "Nursery Blue (7083)", hex: "#2072A5" },
        { id: 6, name: "Pacific Blue (7084)", hex: "#2A578D" },
        { id: 7, name: "National Green (010)", hex: "#00504B" },
        { id: 8, name: "Romeo Green (021)", hex: "#007D4F" },
        { id: 9, name: "Midnight Blue (006)", hex: "#003366" },
        { id: 10, name: "Brilliant Blue (1710)", hex: "#191970" },
    ];

    // Data for Row 3: Pinks, Purples, Reds (Scrolling Left)
    const row3Colors = [
        { id: 1, name: "Rose Pink (1020)", hex: "#F3A9A3" },
        { id: 2, name: "Rose (1021)", hex: "#D44747" },
        { id: 3, name: "Tile Red (1023)", hex: "#8B2519" },
        { id: 4, name: "Red Oxide (1024)", hex: "#8D3636" },
        { id: 5, name: "Laterite Red (1710)", hex: "#B05436" },
        { id: 6, name: "Rich Brown (3044)", hex: "#693D17" },
        { id: 7, name: "Romantic", hex: "#CC33CC" },
        { id: 8, name: "Carnival E49", hex: "#F9A4C0" },
        { id: 9, name: "Lilac", hex: "#C5A5C7" },
        { id: 10, name: "Wild Purple", hex: "#E183B7" },
    ];

    // Data for Row 4: Neutrals, Browns, Earth Tones (Scrolling Right)
    const row4Colors = [
        { id: 1, name: "Gage Grey (013)", hex: "#4D565C" },
        { id: 2, name: "Dark Grey (9097)", hex: "#353B41" },
        { id: 3, name: "Ash Grey (9096)", hex: "#5D6469" },
        { id: 4, name: "Mustard (4056)", hex: "#9E6E2D" },
        { id: 5, name: "Pale Mushroom (3035)", hex: "#AF836D" },
        { id: 6, name: "Sienna", hex: "#925838" },
        { id: 7, name: "Ambush Brown", hex: "#9B6843" },
        { id: 8, name: "Tawny 640", hex: "#B78864" },
        { id: 9, name: "Hazel Brown", hex: "#79614E" },
        { id: 10, name: "Russet", hex: "#975B46" },
    ];

  const handleDownload = () => {
    const imagePath1 = '/pallette1.jpg';
    const imagePath2 = '/pallette2.jpg';

    const downloadFile = (path, filename) => {
      const link = document.createElement('a');
      link.href = path;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    downloadFile(imagePath1, 'ONIPTECH_Palette_Part1.jpg');

    setTimeout(() => {
        downloadFile(imagePath2, 'ONIPTECH_Palette_Part2.jpg');
    }, 500); // 500ms delay helps ensure both downloads start

    console.log("Downloading full color palette in two parts...");
    // You might show a toast notification here instead of an alert:
    toast.info("Downloading color palette...");
  };

  return (
    <div className="flex flex-col items-center py-12 bg-gray-50">
      <div className="w-full space-y-2 mt-12">
        <Marquee items={row1Colors} direction="left" rowId="row1" />
        <Marquee items={row2Colors} direction="right" rowId="row2" />
        <Marquee items={row3Colors} direction="left" rowId="row3" />
        <Marquee items={row4Colors} direction="right" rowId="row4" />
      </div>

      <button
        onClick={handleDownload}
        className="my-12 px-8 py-4 bg-primary text-white cursor-pointer font-semibold rounded-md shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
    >
        Download Full Palette
      </button>
    </div>
  );
};

export default ColorPaletteSlider;