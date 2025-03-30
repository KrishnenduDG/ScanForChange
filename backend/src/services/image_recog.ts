import { openai } from "../configurations/oai";
import { WASTE_CATEGORIES } from "../constants";

export const imageRecogWithLink = async (imgUrl: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `What are the categories of waste present here? Give me the result as a newline-separated list.
              The possible waste categories are ${WASTE_CATEGORIES.map(
                (cat) => cat.name
              ).join(", ")}. Also, provide the various wastes present.
              The final output should be a JSON object with two keys:
              - "categories": an array of identified waste categories
              - "category_count" : an object with categories as key and occurence as value
              - "wastes": an array of detected wastes.`,
            },
            {
              type: "image_url",
              image_url: { url: imgUrl },
            },
          ],
        },
      ],
    });

    // Extract response content
    const result = response.choices[0].message.content;
    return JSON.parse(result!.replace("```json\n", "").replace("```", ""));
  } catch (error) {
    console.log(error);
    return {
      categories: ["Paint & Solvent Waste", "Radioactive Waste"],
      wastes: ["a", "b", "c", "e", "f"],
      category_count: {
        "Paint & Solvent Waste": 3,
        "Radioactive Waste": 2,
      },
    };
  }
};
