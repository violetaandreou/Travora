const { GoogleGenAI } = require('@google/genai');

/**
 * Helper to ensure JSON responses are clean and parsed correctly,
 * even if markdown backticks (```json ... ```) are inadvertently returned.
 */
function cleanAndParseJson(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    throw new SyntaxError('Empty JSON response received from AI model');
  }

  let cleaned = rawText.trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (originalError) {
    // Some model responses contain trailing commas or unquoted property names.
    // Make only these conservative repairs, without changing text within JSON strings.
    let outsideString = '';
    let inString = false;
    let escaped = false;
    for (let i = 0; i < cleaned.length; i++) {
      const char = cleaned[i];
      if (inString) {
        outsideString += char;
        if (escaped) escaped = false;
        else if (char === '\\') escaped = true;
        else if (char === '"') inString = false;
      } else if (char === '"') {
        inString = true;
        outsideString += char;
      } else if (char === ',') {
        let j = i + 1;
        while (j < cleaned.length && /\s/.test(cleaned[j])) j++;
        if (cleaned[j] !== '}' && cleaned[j] !== ']') outsideString += char;
      } else {
        outsideString += char;
      }
    }

    // Quote bare JavaScript-style keys at object boundaries only.
    // The replacement is deliberately limited to likely key positions.
    let repaired = '';
    inString = false;
    escaped = false;
    for (let i = 0; i < outsideString.length;) {
      const char = outsideString[i];
      if (inString) {
        repaired += char;
        if (escaped) escaped = false;
        else if (char === '\\') escaped = true;
        else if (char === '"') inString = false;
        i++;
      } else if (char === '"') {
        inString = true;
        repaired += char;
        i++;
      } else if (char === '{' || char === ',') {
        const match = outsideString.slice(i + 1).match(/^(\s*)([A-Za-z_$][\w$]*)(\s*:)/);
        if (match) {
          repaired += char + match[1] + '"' + match[2] + '"' + match[3];
          i += 1 + match[0].length;
        } else {
          repaired += char;
          i++;
        }
      } else {
        repaired += char;
        i++;
      }
    }
    return JSON.parse(repaired);
  }
}

/**
 * Prefer one Gemini request. Retry once only when JSON is malformed.
 * The retry counts against the API's free-tier request limits.
 */
async function generateAndParseJson(ai, model, prompt, systemInstruction) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const contents = attempt === 0
      ? prompt
      : `${prompt}\n\nCRITICAL: Your previous response was not valid JSON. Return one complete, syntactically valid JSON object with all keys double-quoted. No trailing commas, no comments, and no markdown. Keep descriptions concise.`;

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        responseMimeType: 'application/json',
        systemInstruction
      }
    });

    try {
      return cleanAndParseJson(response.text);
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
      if (attempt === 1) {
        const safeError = new Error('Gemini returned invalid JSON twice. Please try generating the trip again.');
        safeError.statusCode = 502;
        throw safeError;
      }
      console.warn('Gemini returned malformed JSON; retrying once.');
    }
  }
}

/**
 * Validates that an API key is configured before making SDK calls.
 */
function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.trim() === '') {
    const error = new Error('Gemini API key is not configured. Please add your GEMINI_API_KEY to the backend .env file.');
    error.statusCode = 500;
    throw error;
  }

  return new GoogleGenAI({ apiKey });
}

/**
 * Retrieves the configured model name, defaulting to gemini-3.5-flash-lite.
 */
function getModelName() {
  return process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
}

/**
 * Asks Gemini to recommend 3-4 destinations based on user preferences.
 */
async function recommendDestinations({ departureCity, budgetSEK, days, travelers, interests }) {
  const ai = getAIClient();
  const model = getModelName();

  const prompt = `You are a helpful travel consultant.
The user is planning a trip with the following preferences:
- Departure City: ${departureCity || 'Stockholm'}
- Trip Duration: ${days || 5} days
- Number of Travelers: ${travelers || 1}
- Total Target Budget: ${budgetSEK || 15000} SEK
- Travel Interests: ${interests || 'Culture, Food, City Exploration'}

Please recommend 3 to 4 DISTINCT destinations that are practical from the departure city and match the user's interests and budget.
- Prioritize places that can realistically fit the TOTAL group budget. Consider travel distance and transport costs from the departure city. Do not suggest unrelated far-away destinations merely to fill the list.
- Each estimatedBallparkCostSEK must be an approximate TOTAL in Swedish Kronor (SEK) for ALL travelers for the ENTIRE trip (not per person or per day).
- Use the SAME cost assumptions for every destination: round-trip transport from the departure city, shared/economy accommodation for (days - 1) nights, meals for all days, activities, and local transport. Do not leave out flights or hotels to make a place seem cheaper.
- Make sensible, consistent rough estimates. Do not treat the user's budget as the cost estimate or simply repeat it; costs may exceed the budget when warranted. Prefer less expensive destinations when the budget is tight.
- Mention the main reason a destination fits the budget in whyRecommended. These amounts are illustrative planning estimates, NOT checked ticket prices or live booking offers.

Return your response strictly as valid JSON adhering to this structure:
{
  "destinations": [
    {
      "name": "City name and Country",
      "country": "Country",
      "whyRecommended": "1-2 sentences explaining why this destination fits their interests and budget",
      "highlights": ["Top attraction 1", "Top attraction 2", "Top attraction 3"],
      "estimatedBallparkCostSEK": 12000,
      "bestTimeToVisit": "Months or season",
      "vibe": "Short vibe descriptor (e.g. Historic & Culinary)"
    }
  ]
}`;

  return generateAndParseJson(ai, model, prompt, 'You are an expert travel advisor. Use one consistent total-trip cost method for every destination, including round-trip travel, accommodation, food, activities, and local transport for every traveler and day. All costs are estimates in SEK, not live quotes. Always output valid JSON.');
}

/**
 * Generates a day-by-day itinerary, component cost estimates,
 * and similar cheaper alternative destinations.
 */
async function generateItinerary({
  departureCity,
  destination,
  departureDate,
  returnDate,
  days,
  nights,
  travelers,
  budgetSEK,
  interests
}) {
  const ai = getAIClient();
  const model = getModelName();

  const prompt = `You are an expert travel planner assistant.
Plan a personalized ${days}-day trip to ${destination} departing from ${departureCity} for ${travelers} traveler(s).
Departure Date: ${departureDate || 'Upcoming'}
Return Date: ${returnDate || 'Upcoming'}
Trip Duration: ${days} travel days, ${nights} hotel nights.
Target Group Budget: ${budgetSEK} SEK (total for all ${travelers} travelers combined).
Travel Interests: ${interests || 'General sightseeing, culture, food'}.

Important Guidelines:
- Provide realistic tourist average price estimates in Swedish Kronor (SEK). Do NOT artificially deflate or suppress estimates to match the budget.
- The estimates must cover ALL ${travelers} travelers for the ENTIRE ${days}-day trip.
- Round-trip transport covers flights, trains, or ferries between ${departureCity} and ${destination}.
- Accommodation covers ${nights} nights of lodging for the group.
- Local transit covers city buses, metro tickets, and airport transfers.
- Add a useful LOCAL TRAVEL GUIDE specific to the destination. Provide 3 traditional dishes, 3 sights/hidden gems, 2 cultural traditions or locally characteristic experiences, and 3 practical tips. Avoid generic suggestions and invented details. Keep everything in English. Provide tips as part of this SAME response, without additional API requests. The guide is informational and does not imply verified availability or live prices.

Include ALL four localGuide arrays with the requested entries. Do not omit localGuide even for long trips. Prioritize the localGuide fields over verbose itinerary descriptions if response length is limited.\n\nReturn your response strictly as valid JSON with this exact schema:
{
  "tripOverview": {
    "destination": "${destination}",
    "summary": "2-3 sentence overview of the trip",
    "bestSeason": "Ideal travel months",
    "localTips": [
      "Tip 1 regarding public transport or customs",
      "Tip 2 regarding dining or reservations"
    ]
  },
  "localGuide": {
    "mustTryFoods": [
      { "name": "Authentic traditional dish 1", "description": "What it is and why it is worth trying" },
      { "name": "Traditional dish 2", "description": "Short useful explanation" },
      { "name": "Traditional dish 3", "description": "Short useful explanation" }
    ],
    "mustSeePlaces": [
      { "name": "Locally important place 1", "description": "Why visit and a useful detail" },
      { "name": "Locally important place 2", "description": "Why visit and a useful detail" },
      { "name": "Local hidden gem", "description": "Why visit and a useful detail" }
    ],
    "localExperiences": [
      { "name": "Local tradition or experience 1", "description": "How a visitor can experience it" },
      { "name": "Local tradition or experience 2", "description": "How a visitor can experience it" }
    ],
    "practicalTips": [
      "Useful local transport tip",
      "Useful dining or social etiquette tip",
      "Useful budgeting, cash, or cultural tip"
    ]
  },
  "estimatedBaselineCosts": {
    "transport": 0,
    "accommodation": 0,
    "food": 0,
    "activities": 0,
    "localTransit": 0
  },
  "itinerary": [
    {
      "day": 1,
      "date": "e.g. Day 1 (${departureDate || 'Arrival Day'})",
      "title": "Theme of Day 1",
      "morning": { "activity": "Activity name", "description": "Brief description", "estimatedCostSEK": 0 },
      "afternoon": { "activity": "Activity name", "description": "Brief description", "estimatedCostSEK": 0 },
      "evening": { "activity": "Activity name", "description": "Brief description", "estimatedCostSEK": 0 }
    }
  ],
  "cheaperAlternatives": [
    {
      "destination": "Alternative City, Country",
      "whyRecommended": "Why it offers a similar experience or culture",
      "whyCheaper": "Specific reason it is more budget-friendly (e.g. lower dining and hotel rates)",
      "estimatedTotalSEK": 0
    }
  ]
}`;

  return generateAndParseJson(ai, model, prompt, 'You are an expert travel planner. Provide realistic travel recommendations and ballpark price estimates in Swedish Kronor (SEK). Always return pure JSON without markdown backticks.');
}

module.exports = {
  recommendDestinations,
  generateItinerary,
  getModelName
};
