import { Recipe } from "@/app/types";
import { useState } from "react";
import { useTrackAttempts } from "./use-track-attempts";

interface RecipeGeneratorHook {
  isLoading: boolean;
  recipe?: Recipe;
  generateRecipe: (text: string) => Promise<Recipe | null> | Error;
  cleanRecipe: () => void;
}

const useRecipeGenerator = (): RecipeGeneratorHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>();
  const cleanRecipe = () => setRecipe(undefined);
  const { trackAttempt } = useTrackAttempts();

  const generateRecipe = async (text: string) => {
    setIsLoading(true);

    const prompt = `
      Generate a ${text} recipe returning a json with the following structure:
      - description: string | null;
      - difficulty_level: string | null;
      - ingredients: Json | null;
      - instructions: Json | null;
      - prep_time: number | null;
      - serves: number | null;
      - tips_and_variations: string | null;
      - title: string;
      - total_time: number | null;
    `;

    try {
      const error = await trackAttempt();

      if (error) {
        return error;
      }

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      const recipe = JSON.parse(
        data.choices[0].message.content.trim()
      ) as Recipe;

      setRecipe(recipe);
      return null;
    } catch (error) {
      console.error("Error generating recipe:", error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, recipe, generateRecipe, cleanRecipe };
};

export default useRecipeGenerator;
