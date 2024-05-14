import apiConfig from "./apiConfig";

const api = {
  generateImages: async (
    generationParams,
    selectedStyle,
    combinedStylesWithModels
  ) => {
    try {
      const generationResponse = await apiConfig.post("/generations", {
        ...generationParams,
        modelId: combinedStylesWithModels.find(
          (style) => style.value === selectedStyle
        ).modelId,
        presetStyle: selectedStyle,
      });

      return generationResponse.data.sdGenerationJob.generationId;
    } catch (error) {
      console.error("Error generating images:", error);
      throw error;
    }
  },

  waitForGenerationCompletion: async (generationId, attempt = 1) => {
    const maxAttempts = 10;
    const delay = Math.pow(2, attempt) * 1000; // Exponential backoff 2

    try {
      const response = await apiConfig.get(`/generations/${generationId}`);

      const generationStatus = response.data.generations_by_pk.status;

      if (generationStatus === "COMPLETE") {
        return; // Generation completed successfully
      } else if (generationStatus === "ERROR") {
        throw new Error("Generation failed or encountered an error.");
      } else if (attempt < maxAttempts) {
        // Retry with exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
        await api.waitForGenerationCompletion(generationId, attempt + 1);
      } else {
        throw new Error("Maximum retry attempts exceeded.");
      }
    } catch (error) {
      console.error("Error waiting for generation completion:", error);
      throw error;
    }
  },

  getImageUrls: async (generationId) => {
    try {
      const imageResponse = await apiConfig.get(`/generations/${generationId}`);

      const generatedImages =
        imageResponse.data.generations_by_pk.generated_images;

      return generatedImages.map((image) => image.url);
    } catch (error) {
      console.error("Error getting generated images:", error);
      throw error;
    }
  },
};

export default api;
