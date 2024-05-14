// import React, { useState } from "react";

// const StyleSelect = ({ combinedStylesWithModels }) => {
//   const [selectedStyle, setSelectedStyle] = useState("");

//   const handleStyleChange = (e) => {
//     setSelectedStyle(e.target.value);
//   };

//   return (
//     <div>
//       <label htmlFor="styleSelect">Select a style:</label>
//       <select
//         id="styleSelect"
//         value={selectedStyle}
//         onChange={handleStyleChange}
//       >
//         <option value="" disabled>
//           Select a style
//         </option>
//         {combinedStylesWithModels.map((style) => (
//           <option key={style.value} value={style.value}>
//             {style.label}
//           </option>
//         ))}
//       </select>

//       <div id="modelInfo">
//         {selectedStyle && (
//           <>
//             <p>For the {selectedStyle} style, below are the details of model</p>
//             {combinedStylesWithModels.map((style) => {
//               if (style.value === selectedStyle) {
//                 return (
//                   <p key={style.modelId}>
//                     Model Name: {style.modelName}
//                     <br />
//                     Model ID: {style.modelId}
//                     <br />
//                     Model Description: {style.modelDescription}
//                   </p>
//                 );
//               }
//               return null;
//             })}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StyleSelect;

import React from "react";

const StyleSelect = ({ combinedStylesWithModels, onSelect }) => {
  return (
    <div>
      <label htmlFor="style">Select a style:</label>
      <select
        id="style"
        name="style"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select Style</option>
        {combinedStylesWithModels.map((style) => (
          <option key={style.value} value={style.value}>
            {style.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StyleSelect;
