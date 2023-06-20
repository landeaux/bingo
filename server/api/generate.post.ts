export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const genre = body.genre || "";

  if (genre.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please enter a valid genre",
    });
  }

  return {
    result: "The Doors, The Beatles, The Rolling Stones",
  };
});
