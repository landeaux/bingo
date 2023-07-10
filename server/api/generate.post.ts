import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default defineEventHandler(async (event) => {
  if (!configuration.apiKey) {
    // eslint-disable-next-line no-console
    console.error("OpenAI API key not configured");
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }

  const body = await readBody(event);
  const genre = body.genre || "";

  if (genre.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please enter a valid genre",
    });
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: buildPrompt(genre),
      temperature: 1.0,
    });
    return { result: completion.data.choices[0].text };
  } catch (error: any) {
    if (error.response) {
      // eslint-disable-next-line no-console
      console.error(error.response.status, error.response.data);
      throw createError({
        statusCode: error.response.status,
        statusMessage: error.response.data,
      });
    } else {
      // eslint-disable-next-line no-console
      console.error(`Error with OpenAI API request: ${error.message}`);
      throw createError({
        statusCode: 500,
        statusMessage: "An error occurred during your request.",
      });
    }
  }
});

function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function buildPrompt(genre: string) {
  const titleCasedGenre = toTitleCase(genre);
  return `I will give three examples of genres and band names of existing bands in those genres. Suggest three band names that don't already exist and that sound like band names in the fourth given genre. Band names must be one to four words long.

Examples:
Genre: Indie Rock
Names: Dirty Projectors, Grizzly Bear, Coconut Records
Genre: Electronica
Names: Daft Punk, SBTRKT, Aphex Twin
Genre: Rap
Names: Kendrick Lamar, MF DOOM, A Tribe Called Quest

Genre: ${titleCasedGenre}
Names:`;
}
