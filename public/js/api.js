/**
 * ==============================================================================
 * AI Smart Travel Companion - Frontend API Client
 * ==============================================================================
 * 
 * Handles all network requests to our Express backend.
 * Never handles or exposes the secret Gemini API key directly.
 */

const ApiClient = {
  /**
   * Requests destination recommendations based on user preferences.
   * 
   * @param {Object} params - User preferences
   * @param {string} params.departureCity - e.g. "Stockholm"
   * @param {number} params.budgetSEK - Budget in Base SEK
   * @param {number} params.days - Number of days
   * @param {number} params.travelers - Number of travelers
   * @param {string} params.interests - e.g. "Culture, Food"
   * @returns {Promise<Object>} Recommendation response
   */
  async recommendDestinations(params) {
    try {
      const response = await fetch('/api/destinations/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('[API] Error fetching destination recommendations:', error.message);
      throw error;
    }
  },

  /**
   * Generates a personalized itinerary and baseline cost analysis.
   * 
   * @param {Object} payload - Complete trip parameters
   * @returns {Promise<Object>} Itinerary & Budget Analysis response
   */
  async generateItinerary(payload) {
    try {
      const response = await fetch('/api/itinerary/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('[API] Error generating travel itinerary:', error.message);
      throw error;
    }
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.ApiClient = ApiClient;
}
