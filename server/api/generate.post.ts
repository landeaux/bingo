import OpenAI from "openai";

interface RequestBody {
  genre: string
  wordLength: number
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default defineEventHandler(async (event) => {
  if (!openai.apiKey) {
    // eslint-disable-next-line no-console
    console.error("OpenAI API key not configured");
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }

  const body = await readBody<RequestBody>(event);
  const genre = body.genre || "";
  const wordLength = body.wordLength || 2;

  if (genre.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please enter a valid genre",
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: buildPrompt(wordLength) },
        { role: "user", content: buildUserPrompt(genre) },
      ],
      temperature: 1.0,
    });
    return { result: completion.choices[0].message.content };
  } catch (error: any) {
    if (error instanceof OpenAI.APIError) {
      // eslint-disable-next-line no-console
      console.error(error.status); // e.g. 401
      // eslint-disable-next-line no-console
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      // eslint-disable-next-line no-console
      console.error(error.code); // e.g. 'invalid_api_key'
      // eslint-disable-next-line no-console
      console.error(error.type); // e.g. 'invalid_request_error'
      throw createError({
        statusCode: error.status,
        statusMessage: error.message,
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

function buildPrompt(wordLength: number) {
  return `You are a band name generator. The user will give you a genre and you are to respond with three novel band names that fit that genre. Do not suggest band names that already exist. Suggested band names must not be numbered. Each band name should be separated by a comma. Suggested band names must be ${wordLength} words in length.

Here are some example interactions:
User: Indie Rock
You: Ween, Dirty Projectors, The Foo Fighters
User: Electronica
You: Tycho, Daft Punk, Aphex Twin
User: Rap
You: Eminem, MF DOOM, A Tribe Called Quest
`;
}

function buildUserPrompt(genre: string) {
  const titleCasedGenre = toTitleCase(genre);
  return `${titleCasedGenre}`;
}
