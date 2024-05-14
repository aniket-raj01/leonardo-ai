import React, { useState } from "react";
import StyleSelect from "./components/StyleSelect";
import ImageGallery from "./components/ImageGallery";
import api from "./actions/api";
import { combinedStylesWithModels } from "./generalHelpers";

const App = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [generationParams, setGenerationParams] = useState({
    alchemy: true,
    height: 768,
    num_images: 2,
    prompt: "",
    width: 512,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGenerationParams((prevState) => ({
      ...prevState,
      [name]:
        name === "height" || name === "width"
          ? parseInt(value) || 0
          : name === "num_images"
          ? parseInt(value) || 1 // Ensure a minimum value of 1 for num_images
          : value,
    }));
  };

  const generateAndDisplayImages = async () => {
    try {
      setIsGenerating(true);
      const generationId = await api.generateImages(
        generationParams,
        selectedStyle,
        combinedStylesWithModels
      );
      await api.waitForGenerationCompletion(generationId);
      const generatedUrls = await api.getImageUrls(generationId);
      setImageUrls(generatedUrls);
    } catch (error) {
      console.error("Error generating and displaying images:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderInputField = (name, label, type = "text") => (
    <div>
      <label>
        {label}:
        <input
          type={type}
          name={name}
          value={generationParams[name]}
          onChange={handleChange}
        />
      </label>
    </div>
  );

  return (
    <div>
      <StyleSelect
        combinedStylesWithModels={combinedStylesWithModels}
        onSelect={setSelectedStyle}
      />
      {renderInputField("prompt", "Prompt", "textarea")}
      {renderInputField("height", "Height", "number")}
      {renderInputField("width", "Width", "number")}
      {renderInputField("num_images", "Number of Images", "number")}
      <button onClick={generateAndDisplayImages} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate Images"}
      </button>
      <ImageGallery imageUrls={imageUrls} />
    </div>
  );
};

export default App;
