/**
 * Pure JavaScript Budget Calculation Engine
 * 
 * To ensure 100% mathematical accuracy and avoid AI arithmetic hallucinations,
 * all category sums, exclusions, contingency buffers, differences, and statuses
 * are calculated deterministically in JavaScript.
 */

/**
 * Calculates a comprehensive budget analysis for all travelers across the whole trip.
 * 
 * @param {Object} costs - Category costs in SEK (AI-estimated baseline averages)
 * @param {number} costs.transport - Estimated round-trip long-distance transport (flights/trains) for ALL travelers
 * @param {number} costs.accommodation - Estimated total lodging for ALL nights
 * @param {number} costs.food - Estimated total meals and dining across all travel days for ALL travelers
 * @param {number} costs.activities - Estimated total sightseeing, museums, and attraction tickets
 * @param {number} costs.localTransit - Estimated local public transport, metro, buses, and airport transfers
 * @param {number} userBudgetSEK - Total trip budget entered by the user in SEK
 * @param {Object} options - User exclusion toggles
 * @param {boolean} options.excludeTransport - If true, transport has already been paid and is excluded from active budget check
 * @param {boolean} options.excludeAccommodation - If true, lodging has already been paid and is excluded from active budget check
 * @param {number} options.days - Total trip duration in days
 * @param {number} options.nights - Total accommodation nights (days - 1)
 * @param {number} options.travelers - Number of travelers
 * @returns {Object} Deterministic budget analysis
 */
function calculateTripBudget(costs = {}, userBudgetSEK = 0, options = {}) {
  // 1. Sanitize category amounts (all non-negative rounded numbers)
  const transport = Math.max(0, Math.round(Number(costs.transport) || 0));
  const accommodation = Math.max(0, Math.round(Number(costs.accommodation) || 0));
  const food = Math.max(0, Math.round(Number(costs.food) || 0));
  const activities = Math.max(0, Math.round(Number(costs.activities) || 0));
  const localTransit = Math.max(0, Math.round(Number(costs.localTransit) || 0));
  const userBudget = Math.max(0, Math.round(Number(userBudgetSEK) || 0));

  const excludeTransport = Boolean(options.excludeTransport);
  const excludeAccommodation = Boolean(options.excludeAccommodation);
  const days = Math.max(1, Number(options.days) || 1);
  const nights = Math.max(0, Number(options.nights) !== undefined ? Number(options.nights) : (days - 1));
  const travelers = Math.max(1, Number(options.travelers) || 1);

  // 2. Full Trip Subtotal (all categories regardless of exclusion)
  const fullSubtotal = transport + accommodation + food + activities + localTransit;
  const fullContingencyBuffer = Math.round(fullSubtotal * 0.10);
  const fullTripEstimatedTotal = fullSubtotal + fullContingencyBuffer;

  // 3. Active Subtotal (respecting user-excluded already-paid expenses)
  const activeTransport = excludeTransport ? 0 : transport;
  const activeAccommodation = excludeAccommodation ? 0 : accommodation;
  const activeSubtotal = activeTransport + activeAccommodation + food + activities + localTransit;

  // 4. Active 10% Safety Buffer on the expenses the user still needs to pay
  const contingencyBuffer = Math.round(activeSubtotal * 0.10);

  // 5. Active Total Estimated Cost (the amount tested against user's budget)
  const totalEstimated = activeSubtotal + contingencyBuffer;

  // 6. Budget Evaluation
  const budgetDifference = userBudget - totalEstimated;
  const isWithinBudget = budgetDifference >= 0;
  const shortfall = isWithinBudget ? 0 : Math.abs(budgetDifference);
  const surplus = isWithinBudget ? budgetDifference : 0;

  // 7. Per-Person and Per-Day Baseline Metrics (for transparency)
  const activePerPerson = Math.round(totalEstimated / travelers);
  const activePerDay = Math.round(totalEstimated / days);

  return {
    categoryBreakdown: {
      transport: {
        amount: transport,
        isExcluded: excludeTransport,
        activeAmount: activeTransport,
        label: 'Round-Trip Long-Distance Transport (Flights/Trains)'
      },
      accommodation: {
        amount: accommodation,
        isExcluded: excludeAccommodation,
        activeAmount: activeAccommodation,
        nights,
        label: `Accommodation (${nights} nights)`
      },
      food: {
        amount: food,
        isExcluded: false,
        activeAmount: food,
        label: `Food & Dining (${days} days for ${travelers} travelers)`
      },
      activities: {
        amount: activities,
        isExcluded: false,
        activeAmount: activities,
        label: 'Sightseeing & Attraction Tickets'
      },
      localTransit: {
        amount: localTransit,
        isExcluded: false,
        activeAmount: localTransit,
        label: 'Local Transit & Airport Transfers'
      },
      contingencyBuffer: {
        amount: contingencyBuffer,
        percentage: 10,
        label: '10% Safety Contingency Buffer'
      }
    },
    metrics: {
      days,
      nights,
      travelers,
      activePerPerson,
      activePerDay
    },
    // Illustrative uncertainty band (+/- 20% around model-provided estimates).
    // This is NOT a statistical confidence interval or a live market quote.
    estimatedRange: (() => {
      // Explicit budget-conscious scenario assumptions, NOT verified market discounts.
      // No service can guarantee any of these cheaper options are available.
      const budgetSubtotal = Math.round(
        activeTransport * 0.75 + activeAccommodation * 0.70 +
        food * 0.75 + activities * 0.50 + localTransit * 0.80
      );
      return {
        low: budgetSubtotal + Math.round(budgetSubtotal * 0.10),
        typical: totalEstimated,
        high: Math.round(totalEstimated * 1.20),
        basis: 'Illustrative budget-conscious choices (transport -25%, lodging -30%, food -25%, activities -50%, local transit -20%), versus AI typical estimate, and +20% higher-cost illustration. These are assumptions, not observed discounts, quotes, or a confidence interval.'
      };
    })(),
    fullTripEstimatedTotal, // Total value of the entire holiday
    totalEstimated,          // Active amount compared to budget
    userBudget,
    isWithinBudget,
    budgetDifference,
    shortfall,
    surplus,
    disclaimer: 'All prices are AI-generated baseline planning estimates in SEK, not live or confirmed booking prices. Accommodation is calculated as (days − 1) nights; actual lodging requirements may vary depending on flight arrival and departure times.'
  };
}

module.exports = { calculateTripBudget };
