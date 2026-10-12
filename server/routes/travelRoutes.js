const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');
const { calculateTripBudget } = require('../services/budgetCalculator');

/**
 * POST /api/destinations/recommend
 * 
 * Recommends 3-4 destinations based on user's departure city, budget, duration, and interests.
 */
router.post('/destinations/recommend', async (req, res) => {
  try {
    const { departureCity, budgetSEK, days, travelers, interests } = req.body;

    // Basic input validation
    if (!departureCity || !departureCity.trim()) {
      return res.status(400).json({ error: 'Please enter a departure city.' });
    }

    const budget = Number(budgetSEK);
    if (!budget || budget <= 0) {
      return res.status(400).json({ error: 'Please enter a valid positive budget in SEK.' });
    }

    const durationDays = Number(days);
    if (!durationDays || durationDays <= 0 || durationDays > 30) {
      return res.status(400).json({ error: 'Trip duration must be between 1 and 30 days.' });
    }

    const travelerCount = Number(travelers);
    if (!travelerCount || travelerCount <= 0 || travelerCount > 20) {
      return res.status(400).json({ error: 'Number of travelers must be between 1 and 20.' });
    }

    const result = await geminiService.recommendDestinations({
      departureCity: departureCity.trim(),
      budgetSEK: budget,
      days: durationDays,
      travelers: travelerCount,
      interests: interests || 'General sightseeing'
    });

    res.json({
      success: true,
      destinations: result.destinations || [],
      disclaimer: 'All prices are AI-generated estimates in SEK for planning purposes only.'
    });
  } catch (error) {
    // Log sanitized error message without exposing any sensitive tokens
    console.error('Error in /api/destinations/recommend:', error.message);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message || 'Failed to recommend destinations. Please try again.' });
  }
});

/**
 * POST /api/itinerary/generate
 * 
 * Generates day-by-day itinerary with Gemini, and uses deterministic JavaScript
 * to calculate all budget totals, differences, and budget health statuses.
 */
router.post('/itinerary/generate', async (req, res) => {
  try {
    const {
      departureCity,
      destination,
      departureDate,
      returnDate,
      days,
      nights,
      travelers,
      budgetSEK,
      interests,
      excludeTransport,
      excludeAccommodation
    } = req.body;

    // Basic input validation
    if (!departureCity || !departureCity.trim()) {
      return res.status(400).json({ error: 'Please provide a departure city.' });
    }

    if (!destination || !destination.trim()) {
      return res.status(400).json({ error: 'Please provide a destination.' });
    }

    const budget = Number(budgetSEK);
    if (!budget || budget <= 0) {
      return res.status(400).json({ error: 'Please provide a valid positive budget in SEK.' });
    }

    // Date & Duration Calculations (Deterministic JavaScript)
    let durationDays = Number(days);
    let lodgingNights = Number(nights);

    if (departureDate && returnDate) {
      const start = new Date(departureDate);
      const end = new Date(returnDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: 'Please provide valid travel dates.' });
      }

      if (end < start) {
        return res.status(400).json({ error: 'Return date cannot be earlier than departure date.' });
      }

      const diffTime = end.getTime() - start.getTime();
      durationDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1);
      lodgingNights = Math.max(0, durationDays - 1);
    }

    if (!durationDays || durationDays <= 0 || durationDays > 30) {
      return res.status(400).json({ error: 'Trip duration must be between 1 and 30 days.' });
    }

    if (lodgingNights === undefined || lodgingNights === null) {
      lodgingNights = Math.max(0, durationDays - 1);
    }

    const travelerCount = Number(travelers);
    if (!travelerCount || travelerCount <= 0 || travelerCount > 20) {
      return res.status(400).json({ error: 'Number of travelers must be between 1 and 20.' });
    }

    // 1. Call Gemini to generate itinerary and category baseline estimates
    const aiData = await geminiService.generateItinerary({
      departureCity: departureCity.trim(),
      destination: destination.trim(),
      departureDate: departureDate || null,
      returnDate: returnDate || null,
      days: durationDays,
      nights: lodgingNights,
      travelers: travelerCount,
      budgetSEK: budget,
      interests: interests || 'General sightseeing'
    });

    // 2. Compute all math deterministically in JavaScript (NOT with AI)
    const budgetAnalysis = calculateTripBudget(
      aiData.estimatedBaselineCosts || {},
      budget,
      {
        excludeTransport: Boolean(excludeTransport),
        excludeAccommodation: Boolean(excludeAccommodation),
        days: durationDays,
        nights: lodgingNights,
        travelers: travelerCount
      }
    );

    // 3. Assemble complete response
    res.json({
      success: true,
      tripOverview: aiData.tripOverview || { destination },
      localGuide: aiData.localGuide || aiData.tripOverview?.localGuide || null,
      budgetAnalysis, // Pure JavaScript-calculated math
      itinerary: aiData.itinerary || [],
      cheaperAlternatives: aiData.cheaperAlternatives || []
    });
  } catch (error) {
    // Log sanitized error message without exposing any sensitive tokens
    console.error('Error in /api/itinerary/generate:', error.message);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message || 'Failed to generate travel itinerary. Please try again.' });
  }
});

module.exports = router;
