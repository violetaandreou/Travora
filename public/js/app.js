/**
 * ==============================================================================
 * AI Smart Travel Companion - Main Application Controller
 * ==============================================================================
 * 
 * Handles:
 * 1. Date selection, duration calculations, and validation
 * 2. Budget exclusions (already-paid flights and hotel)
 * 3. AI Destination Recommendations ("Inspire Me")
 * 4. AI Itinerary Generation and Dynamic UI Rendering
 * 5. Budget Health analysis with pure JavaScript math
 */

const TravelApp = {
  // Current state of active itinerary for dynamic currency re-calculation
  currentPlan: null,

  onCurrencyChanged() {
    if (this.currentPlan) this.renderItineraryResults(this.currentPlan, false);
  },

  onLanguageChanged() {
    this.updateTripDuration();
    if (this.currentPlan) this.renderItineraryResults(this.currentPlan, false);
  },

  /**
   * Initializes date defaults, event listeners, and services on page load.
   */
  init() {
    this.setupDatePickers();
    this.setupCitySuggestions();
    this.setupEventListeners();
  },

  /**
   * Configures departure and return date pickers with sensible defaults:
   * - Departure: Tomorrow
   * - Return: Tomorrow + 4 days (5 days trip, 4 nights)
   */
  setupDatePickers() {
    const depInput = document.getElementById('departureDate');
    const retInput = document.getElementById('returnDate');
    if (!depInput || !retInput) return;

    const today = new Date();
    
    // Departure defaults to tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // Return defaults to 4 days after tomorrow
    const defaultReturn = new Date(tomorrow);
    defaultReturn.setDate(tomorrow.getDate() + 4);

    const toDateString = (d) => d.toISOString().split('T')[0];

    // Set minimum date to today (prevent past dates)
    depInput.min = toDateString(today);
    retInput.min = toDateString(tomorrow);

    depInput.value = toDateString(tomorrow);
    retInput.value = toDateString(defaultReturn);

    // Initial duration calculation
    this.updateTripDuration();

    // Listeners for date changes
    depInput.addEventListener('change', () => {
      // Return date cannot be earlier than departure
      if (retInput.value < depInput.value) {
        retInput.value = depInput.value;
      }
      retInput.min = depInput.value;
      this.updateTripDuration();
    });

    retInput.addEventListener('change', () => {
      if (retInput.value < depInput.value) {
        alert('Return date cannot be earlier than departure date.');
        retInput.value = depInput.value;
      }
      this.updateTripDuration();
    });
  },

  /**
   * Calculates travel days and accommodation nights deterministically.
   * Days = (Return - Departure) + 1
   * Nights = Days - 1
   */
  getTripDates() {
    const depInput = document.getElementById('departureDate');
    const retInput = document.getElementById('returnDate');

    const depDate = new Date(depInput.value);
    const retDate = new Date(retInput.value);

    let days = 1;
    let nights = 0;

    if (!isNaN(depDate) && !isNaN(retDate) && retDate >= depDate) {
      const diffTime = retDate.getTime() - depDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      days = diffDays + 1;
      nights = Math.max(0, days - 1);
    }

    return {
      departureDate: depInput.value,
      returnDate: retInput.value,
      days,
      nights
    };
  },

  /**
   * Updates the UI badge displaying calculated days and nights.
   */
  updateTripDuration() {
    const { days, nights } = this.getTripDates();
    const durationText = document.getElementById('calc-duration-text');
    if (durationText) {
      durationText.textContent = window.I18nService ? window.I18nService.t('planner.durationBadge', {days, nights}) : `${days} travel days (${nights} hotel nights)`;
    }
  },

  /**
   * A deliberately small offline city list. No external API, key or charge.
   * Native datalist supports typing, arrow keys and selection.
   * Both text fields still accept other destinations freely.
   */
  setupCitySuggestions() {
    const cities = [
      'Athens, Greece', 'Thessaloniki, Greece', 'Katerini, Greece', 'Kavala, Greece',
      'Volos, Greece', 'Patras, Greece', 'Ioannina, Greece', 'Larissa, Greece',
      'Heraklion, Greece', 'Chania, Greece', 'Rhodes, Greece', 'Corfu, Greece',
      'Stockholm, Sweden', 'Gothenburg, Sweden', 'Malmo, Sweden', 'Uppsala, Sweden',
      'Vasteras, Sweden', 'Orebro, Sweden', 'Linkoping, Sweden', 'Norrkoping, Sweden',
      'Copenhagen, Denmark', 'Aarhus, Denmark', 'Odense, Denmark',
      'Oslo, Norway', 'Bergen, Norway', 'Trondheim, Norway', 'Tromso, Norway',
      'Helsinki, Finland', 'Turku, Finland', 'Tampere, Finland',
      'Reykjavik, Iceland', 'London, United Kingdom', 'Manchester, United Kingdom',
      'Edinburgh, United Kingdom', 'Glasgow, United Kingdom', 'Birmingham, United Kingdom',
      'Dublin, Ireland', 'Cork, Ireland', 'Paris, France', 'Lyon, France',
      'Marseille, France', 'Nice, France', 'Bordeaux, France',
      'Rome, Italy', 'Milan, Italy', 'Bergamo, Italy', 'Venice, Italy',
      'Florence, Italy', 'Naples, Italy', 'Bologna, Italy', 'Pisa, Italy',
      'Turin, Italy', 'Palermo, Italy', 'Catania, Italy',
      'Madrid, Spain', 'Barcelona, Spain', 'Valencia, Spain', 'Seville, Spain',
      'Malaga, Spain', 'Granada, Spain', 'Bilbao, Spain',
      'Lisbon, Portugal', 'Porto, Portugal', 'Faro, Portugal',
      'Berlin, Germany', 'Munich, Germany', 'Hamburg, Germany', 'Frankfurt, Germany',
      'Cologne, Germany', 'Dusseldorf, Germany', 'Stuttgart, Germany',
      'Vienna, Austria', 'Salzburg, Austria', 'Innsbruck, Austria',
      'Zurich, Switzerland', 'Geneva, Switzerland', 'Basel, Switzerland',
      'Amsterdam, Netherlands', 'Rotterdam, Netherlands', 'Utrecht, Netherlands',
      'Brussels, Belgium', 'Bruges, Belgium', 'Antwerp, Belgium',
      'Luxembourg City, Luxembourg', 'Prague, Czechia', 'Brno, Czechia',
      'Warsaw, Poland', 'Krakow, Poland', 'Gdansk, Poland', 'Wroclaw, Poland',
      'Poznan, Poland', 'Budapest, Hungary', 'Debrecen, Hungary',
      'Bratislava, Slovakia', 'Ljubljana, Slovenia', 'Zagreb, Croatia',
      'Split, Croatia', 'Dubrovnik, Croatia', 'Zadar, Croatia',
      'Belgrade, Serbia', 'Novi Sad, Serbia', 'Sarajevo, Bosnia and Herzegovina',
      'Mostar, Bosnia and Herzegovina', 'Podgorica, Montenegro', 'Kotor, Montenegro',
      'Tirana, Albania', 'Durres, Albania', 'Skopje, North Macedonia',
      'Sofia, Bulgaria', 'Plovdiv, Bulgaria', 'Bucharest, Romania',
      'Cluj-Napoca, Romania', 'Brasov, Romania', 'Iasi, Romania',
      'Riga, Latvia', 'Tallinn, Estonia', 'Vilnius, Lithuania', 'Kaunas, Lithuania',
      'Istanbul, Turkey', 'Ankara, Turkey', 'Izmir, Turkey', 'Antalya, Turkey',
      'Larnaca, Cyprus', 'Nicosia, Cyprus', 'Paphos, Cyprus',
      'Valletta, Malta', 'New York, United States', 'Los Angeles, United States',
      'Chicago, United States', 'San Francisco, United States',
      'Toronto, Canada', 'Vancouver, Canada', 'Montreal, Canada',
      'Tokyo, Japan', 'Kyoto, Japan', 'Osaka, Japan', 'Seoul, South Korea',
      'Bangkok, Thailand', 'Singapore, Singapore', 'Dubai, United Arab Emirates',
      'Cairo, Egypt', 'Marrakesh, Morocco', 'Cape Town, South Africa',
      'Sydney, Australia', 'Melbourne, Australia'
    ];
    const list = document.getElementById('city-suggestions');
    if (!list) return;
    const fragment = document.createDocumentFragment();
    for (const city of cities) {
      const option = document.createElement('option');
      option.value = city;
      fragment.appendChild(option);
    }
    list.replaceChildren(fragment);
  },

  /** Select a city without sending a Gemini request. */
  chooseDestination(name) {
    const input = document.getElementById('destination');
    const planner = document.getElementById('planner');
    if (!input || !name) return;
    input.value = name.trim();
    input.dispatchEvent(new Event('input', { bubbles: true }));
    if (planner) planner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    input.focus({ preventScroll: true });
  },

  /**
   * Attaches event listeners to buttons and forms.
   */
  setupEventListeners() {
    // "Inspire Me" Button
    const btnInspire = document.getElementById('btn-inspire-me');
    if (btnInspire) {
      btnInspire.addEventListener('click', () => this.handleInspireMe());
    }

    // The initial recommendation cards are static demos: wire their Select buttons too.
    const demoGrid = document.getElementById('destinations-grid');
    if (demoGrid) {
      demoGrid.addEventListener('click', (event) => {
        const button = event.target.closest('.btn-select');
        if (!button || !demoGrid.contains(button)) return;
        const card = button.closest('.destination-card');
        const name = button.dataset.destination || card?.querySelector('.card-city')?.textContent;
        this.chooseDestination(name);
      });
    }
    // Demo itinerary alternative buttons are present until real results are generated.
    const results = document.getElementById('results');
    if (results) {
      results.addEventListener('click', (event) => {
        const button = event.target.closest('.btn-switch-alt, .alt-card .btn-select');
        if (!button || !results.contains(button)) return;
        const city = button.dataset.dest || button.closest('.alt-card')?.querySelector('.alt-title')?.textContent;
        if (city) this.chooseDestination(city);
      });
    }

    // "Generate Travel Plan" Button
    const btnGenerate = document.getElementById('btn-generate-plan');
    if (btnGenerate) {
      btnGenerate.addEventListener('click', () => this.handleGeneratePlan());
    }
  },

  /**
   * Shows or hides the loading state card with custom text.
   */
  setLoading(isLoading, titleKey = 'loading.title', subKey = 'loading.sub') {
    const loadingCard = document.getElementById('ai-loading');
    const titleEl = document.getElementById('loading-title');
    const subEl = document.getElementById('loading-sub');

    if (!loadingCard) return;

    if (isLoading) {
      if (titleEl && window.I18nService) titleEl.textContent = window.I18nService.t(titleKey);
      if (subEl && window.I18nService) subEl.textContent = window.I18nService.t(subKey);
      loadingCard.style.display = 'flex';
      loadingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      loadingCard.style.display = 'none';
    }
  },

  /**
   * Gathers selected travel interests as a comma-separated string.
   */
  getSelectedInterests() {
    const checkboxes = document.querySelectorAll('input[name="interests"]:checked');
    const selected = Array.from(checkboxes).map(cb => cb.value);
    return selected.length > 0 ? selected.join(', ') : 'Culture, Food, Sightseeing';
  },

  /**
   * Handles "Inspire Me" click: fetches 3-4 destination ideas from Gemini.
   */
  async handleInspireMe() {
    const departureCity = document.getElementById('departureCity').value.trim();
    if (!departureCity) {
      alert('Please enter your departure city first so AI can suggest realistic destinations.');
      document.getElementById('departureCity').focus();
      return;
    }

    const { days } = this.getTripDates();
    const travelers = parseInt(document.getElementById('travelers').value) || 2;
    const rawBudget = parseFloat(document.getElementById('budgetSEK').value) || 10000;

    // Convert user entered budget into Base SEK for the backend
    const budgetSEK = window.CurrencyService ? window.CurrencyService.toBaseSEK(rawBudget) : rawBudget;
    const interests = this.getSelectedInterests();

    this.setLoading(true, 'loading.titleInspire', 'loading.subInspire');

    try {
      const response = await window.ApiClient.recommendDestinations({
        departureCity,
        budgetSEK: Math.round(budgetSEK),
        days,
        travelers,
        interests
      });

      if (response && response.destinations) {
        this.renderDestinationRecommendations(response.destinations);
        
        // Scroll to recommendations
        const recSection = document.getElementById('recommendations');
        if (recSection) {
          recSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (err) {
      alert(`Could not load destination ideas: ${err.message}`);
    } finally {
      this.setLoading(false);
    }
  },

  /**
   * Renders AI-generated destination cards dynamically into the grid.
   */
  renderDestinationRecommendations(destinations) {
    const grid = document.getElementById('destinations-grid');
    if (!grid) return;

    grid.innerHTML = '';

    destinations.forEach(dest => {
      const card = document.createElement('article');
      card.className = 'destination-card';

      const highlightsHtml = (dest.highlights || [])
        .map(h => `<span class="highlight-pill">${h}</span>`)
        .join('');

      card.innerHTML = `
        <div class="card-top">
          <div class="card-location">
            <h3 class="card-city">${dest.name}</h3>
            <span class="card-vibe">${dest.vibe || dest.bestTimeToVisit || 'Recommended'}</span>
          </div>
          <p class="card-desc">${dest.whyRecommended}</p>
          <div class="card-highlights">
            <h4 data-i18n="rec.highlights">Highlights</h4>
            <div class="highlights-pills">${highlightsHtml}</div>
          </div>
        </div>
        <div class="card-footer">
          <div class="price-estimate">
            <span class="price-label" data-i18n="rec.ballpark">Estimated Ballpark</span>
            <span class="price-amount" data-sek="${dest.estimatedBallparkCostSEK}" data-is-estimate="true">
              ${window.CurrencyService ? window.CurrencyService.formatSEK(dest.estimatedBallparkCostSEK) : dest.estimatedBallparkCostSEK + ' SEK'}
            </span>
            <span class="price-tag-est" data-i18n="rec.estimateNote">Planning estimate for group</span>
          </div>
          <button type="button" class="btn-select" data-destination="${dest.name}">Select</button>
        </div>
      `;

      grid.appendChild(card);
    });

    // Apply translations and active currency
    if (window.I18nService) window.I18nService.apply();
    if (window.CurrencyService) window.CurrencyService.refreshAllDisplayPrices();
  },

  /**
   * Handles "Generate Travel Plan" click: calls backend and renders complete itinerary.
   */
  async handleGeneratePlan() {
    const departureCity = document.getElementById('departureCity').value.trim();
    const destination = document.getElementById('destination').value.trim();

    if (!departureCity) {
      alert('Please enter a departure city.');
      document.getElementById('departureCity').focus();
      return;
    }

    if (!destination) {
      alert('Please enter a destination city, or click "Inspire Me" to get ideas.');
      document.getElementById('destination').focus();
      return;
    }

    const { departureDate, returnDate, days, nights } = this.getTripDates();
    const travelers = parseInt(document.getElementById('travelers').value) || 2;
    const rawBudget = parseFloat(document.getElementById('budgetSEK').value);

    if (isNaN(rawBudget) || rawBudget <= 0) {
      alert('Please enter a valid total travel budget.');
      document.getElementById('budgetSEK').focus();
      return;
    }

    // Convert user's budget from their active currency to Base SEK
    const budgetSEK = window.CurrencyService ? window.CurrencyService.toBaseSEK(rawBudget) : rawBudget;

    const excludeTransport = document.getElementById('excludeTransport').checked;
    const excludeAccommodation = document.getElementById('excludeAccommodation').checked;
    const interests = this.getSelectedInterests();

    this.setLoading(true, 'loading.title', 'loading.sub');

    try {
      const response = await window.ApiClient.generateItinerary({
        departureCity,
        destination,
        departureDate,
        returnDate,
        days,
        nights,
        travelers,
        budgetSEK: Math.round(budgetSEK),
        interests,
        excludeTransport,
        excludeAccommodation
      });

      if (response && response.success) {
        this.currentPlan = response;
        this.renderItineraryResults(response);
      }
    } catch (err) {
      alert(`Could not generate itinerary: ${err.message}`);
    } finally {
      this.setLoading(false);
    }
  },

  /**
   * Renders the complete results dashboard dynamically.
   */
  async loadCityCoverPhoto(destination) {
    const banner = document.querySelector('#results-content .trip-overview-banner');
    if (!banner || !destination) return;
    banner.classList.add('city-photo-banner');
    const city = String(destination).split(',')[0].trim().slice(0, 100);
    if (!city) return;
    // Wikipedia Action API serves thumbnail URLs and supports browser CORS with origin=*.
    const url = new URL('https://en.wikipedia.org/w/api.php');
    url.search = new URLSearchParams({
      action: 'query', format: 'json', origin: '*',
      prop: 'pageimages', piprop: 'thumbnail', pithumbsize: '1400',
      redirects: '1', titles: city
    }).toString();
    try {
      const response = await fetch(url.toString(), { signal: AbortSignal.timeout(6500) });
      if (!response.ok) return;
      const payload = await response.json();
      const pages = Object.values(payload?.query?.pages || {});
      const imagePage = pages.find(page => page.thumbnail?.source);
      const imageURL = imagePage?.thumbnail?.source;
      if (!imageURL || !imageURL.startsWith('https://')) return;
      // Guard against rendering a late response into a different trip's overview.
      if (document.querySelector('#results-content .trip-overview-banner') !== banner) return;
      const img = document.createElement('img');
      img.className = 'city-cover-image';
      img.alt = `City photograph of ${city}`;
      img.loading = 'lazy';
      img.referrerPolicy = 'no-referrer';
      img.onerror = () => img.remove();
      img.src = imageURL;
      banner.prepend(img);
      const credit = document.createElement('a');
      credit.className = 'city-photo-credit';
      credit.href = imagePage?.pageimage ? `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(imagePage.pageimage.replace(/ /g, '_'))}` : `https://en.wikipedia.org/wiki/${encodeURIComponent(city.replace(/ /g, '_'))}`;
      credit.target = '_blank';
      credit.rel = 'noopener noreferrer';
      credit.textContent = 'Photo details & license (Wikimedia)';
      banner.append(credit);
    } catch (error) {
      // Offline, blocked, missing or timed-out photo: keep graceful gradient fallback.
      console.debug('[City Photo] Wikipedia image unavailable:', error?.message || error);
    }
  },

  renderItineraryResults(data, shouldScroll = true) {
    const demoNote = document.getElementById('sample-results-note');
    if (demoNote) demoNote.style.display = 'none';
    const resultsContainer = document.getElementById('results-content');
    if (!resultsContainer) return;

    const { tripOverview, budgetAnalysis, itinerary, cheaperAlternatives } = data;
    const { departureDate, returnDate, days, nights } = this.getTripDates();
    const t = (key, params = {}) => window.I18nService ? window.I18nService.t(key, params) : key;
    const price = (n) => `<span data-sek="${Number(n)||0}" data-is-estimate="true">~ ${window.CurrencyService ? window.CurrencyService.formatSEK(Number(n)||0) : (Number(n)||0) + ' SEK'} (est.)</span>`;

    // 1. Build Overview Banner HTML
    const overviewHtml = `
      <div class="trip-overview-banner">
        <div class="overview-content">
          <h2>${tripOverview.destination} Itinerary</h2>
          <p>${tripOverview.summary || 'A personalized journey tailored to your interests.'}</p>
          <div class="overview-meta">
            <span class="meta-pill">📅 ${departureDate} to ${returnDate} (${days} ${t('itin.day')})</span>
            <span class="meta-pill">🏨 ${t('tag.hotelNights', {nights})}</span>
            <span class="meta-pill">👥 ${t('tag.travelersCount', {count: budgetAnalysis.metrics.travelers})}</span>
            <span class="meta-pill">🍂 ${t('results.season')}: ${tripOverview.bestSeason || 'Spring / Autumn'}</span>
          </div>
        </div>
      </div>
    `;

    // Live-price verification is deliberately an external search, not an unsupported API claim.
    const verificationHtml = `
      <section class="price-verification" style="margin:18px 0;padding:18px;border:1px solid #b8ddd4;border-radius:14px;background:#f2faf8;">
        <h3 style="margin:0 0 8px;">Check real travel prices / Έλεγχος πραγματικών τιμών</h3>
        <p style="margin:0 0 12px;">AI estimates are not live offers. Compare round-trip flights and accommodation for your dates. The final cost may be lower or higher.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="https://www.google.com/travel/flights" target="_blank" rel="noopener noreferrer" style="padding:9px 14px;border:1px solid #0d887b;border-radius:9px;">Google Flights ↗</a>
          <a href="https://www.google.com/travel/hotels" target="_blank" rel="noopener noreferrer" style="padding:9px 14px;border:1px solid #0d887b;border-radius:9px;">Google Hotels ↗</a>
        </div>
        <p style="margin:10px 0 0;font-size:.85rem;">Search manually for your destination, dates, and number of travelers. These links are not live-price integrations.</p>
      </section>`;
    const scenarioRange = budgetAnalysis.estimatedRange;
    const scenarioTranslations = {
      en: ['Budget-conscious scenario', 'Typical AI estimate', 'Higher-cost illustration', 'The budget-conscious scenario assumes cheaper transport, shared/economy accommodation, simpler meals and fewer paid activities. These are NOT observed prices or confirmed offers. Your actual costs can be outside this range.', 'Your budget may be possible with economy choices, but prices need checking.', 'The typical AI estimate exceeds your budget. The illustrative budget-conscious scenario may fit. Check real flights and hotels before deciding.'],
      el: ['Οικονομικό σενάριο', 'Συνηθισμένη εκτίμηση AI', 'Ακριβότερο σενάριο', 'Το οικονομικό σενάριο υποθέτει φθηνότερες μεταφορές, οικονομική διαμονή, απλούστερο φαγητό και λιγότερες πληρωμένες δραστηριότητες. ΔΕΝ είναι πραγματικές προσφορές. Το πραγματικό κόστος μπορεί να διαφέρει.', 'Το ταξίδι ίσως γίνεται με οικονομικές επιλογές. Χρειάζεται έλεγχος τιμών.', 'Η συνηθισμένη εκτίμηση AI υπερβαίνει το budget, αλλά το ενδεικτικό οικονομικό σενάριο ίσως ταιριάζει. Ελέγξτε πραγματικές πτήσεις και ξενοδοχεία.'],
      sv: ['Budgetscenario', 'Normal AI-uppskattning', 'Dyrare scenario', 'Budgetscenariot antar billigare transport, ekonomiskt boende, enklare mat och färre betalda aktiviteter. Detta är INTE verkliga erbjudanden. Faktiska kostnader kan avvika.', 'Resan kan vara möjlig med budgetval, men priserna måste kontrolleras.', 'Den vanliga AI-uppskattningen överstiger budgeten, men budgetscenariot kan fungera. Kontrollera verkliga flyg- och hotellpriser.'],
      de: ['Sparsames Szenario', 'Übliche KI-Schätzung', 'Teureres Szenario', 'Das Sparszenario nimmt günstigeren Transport, preiswerte Unterkünfte, einfachere Mahlzeiten und weniger kostenpflichtige Aktivitäten an. Dies sind KEINE echten Angebote.', 'Die Reise könnte mit günstigen Optionen möglich sein. Bitte Preise prüfen.', 'Die übliche KI-Schätzung liegt über dem Budget, das Sparszenario könnte passen. Prüfen Sie echte Flug- und Hotelpreise.'],
      es: ['Escenario económico', 'Estimación típica de IA', 'Escenario más caro', 'El escenario económico supone transporte y alojamiento más baratos, comidas sencillas y menos actividades de pago. NO son ofertas reales.', 'El viaje podría ser posible con opciones económicas. Comprueba los precios.', 'La estimación típica de IA supera el presupuesto, pero el escenario económico podría encajar. Comprueba vuelos y hoteles reales.']
    };
    const activeLang = window.I18nService?.currentLanguage || localStorage.getItem('travel_language') || 'en';
    const scenarioCopy = scenarioTranslations[activeLang] || scenarioTranslations.en;
    const rangeHtml = scenarioRange ? `<div style="margin:14px 0;padding:16px;border:1px solid #b8ddd4;border-radius:12px;background:#f2faf8"><strong>${scenarioCopy[0]}: ${price(scenarioRange.low)}</strong><div>${scenarioCopy[1]}: ${price(scenarioRange.typical || budgetAnalysis.totalEstimated)}</div><div>${scenarioCopy[2]}: ${price(scenarioRange.high)}</div><p style="margin:8px 0 0;font-size:.85rem">${scenarioCopy[3]}</p></div>` : '';

    const fullTotal = Number(budgetAnalysis.fullTripEstimatedTotal) || budgetAnalysis.totalEstimated;
    const excludedAmount = fullTotal - budgetAnalysis.totalEstimated;
    const fullComparison = `<div class="budget-value-comparison" style="margin: 12px 0; display: flex; flex-wrap: wrap; gap: 18px;"><div><strong>${t('budget.fullTripCostLabel')}</strong> ${price(fullTotal)}</div><div><strong>${t('budget.remainingCostLabel')}</strong> ${price(budgetAnalysis.totalEstimated)}</div></div>`;

    // 2. Build Budget Alert Box HTML
    let alertHtml = '';
    const formattedBudget = window.CurrencyService ? window.CurrencyService.formatSEK(budgetAnalysis.userBudget) : `${budgetAnalysis.userBudget} SEK`;
    const formattedTotal = window.CurrencyService ? window.CurrencyService.formatSEK(budgetAnalysis.totalEstimated) : `${budgetAnalysis.totalEstimated} SEK`;

    if (!budgetAnalysis.isWithinBudget) {
      const couldFitEconomy = scenarioRange && scenarioRange.low <= budgetAnalysis.userBudget;
      const formattedShortfall = window.CurrencyService ? window.CurrencyService.formatSEK(budgetAnalysis.shortfall) : `${budgetAnalysis.shortfall} SEK`;
      alertHtml = `
        <div class="budget-alert-box">
          <div class="alert-icon">⚠️</div>
          <div class="alert-body">
            <h4 ${couldFitEconomy ? '' : 'data-i18n="budget.alertTitleExceeded"'}>${couldFitEconomy ? scenarioCopy[4] : 'Estimated Trip Cost Exceeds Your Budget!'}</h4>
            <p>
              ${couldFitEconomy ? scenarioCopy[5] : t('budget.alertBodyExceeded', {budget: formattedBudget, total: formattedTotal, shortfall: formattedShortfall})}
            </p>
            <div class="alert-actions">
              <a href="#affordable-alternatives" class="btn-outline-danger" data-i18n="budget.alertViewAlt">View More Affordable Destinations Below ↓</a>
              <a href="#planner" class="btn-outline-danger" data-i18n="budget.alertAdjust">Adjust Trip Parameters ↑</a>
            </div>
          </div>
        </div>
      `;
    } else {
      const formattedSurplus = window.CurrencyService ? window.CurrencyService.formatSEK(budgetAnalysis.surplus) : `${budgetAnalysis.surplus} SEK`;
      alertHtml = `
        <div class="budget-alert-box" style="background-color: var(--status-success-bg); border-color: var(--status-success-border);">
          <div class="alert-icon">🎉</div>
          <div class="alert-body">
            <h4 style="color: var(--status-success-badge);" data-i18n="budget.alertTitleWithin">Great News! Your Trip is Within Budget!</h4>
            <p style="color: var(--status-success-text);">
              ${t('budget.alertBodyWithin', {budget: formattedBudget, total: formattedTotal, surplus: formattedSurplus})}
            </p>
          </div>
        </div>
      `;
    }

    // 3. Category Breakdown Grid
    const cats = budgetAnalysis.categoryBreakdown;
    const breakdownHtml = `
      <div class="breakdown-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
        <!-- Transport -->
        <div class="breakdown-item">
          <div class="cat-icon">✈️</div>
          <div class="cat-name" data-i18n="cat.transport">Transport</div>
          <div class="cat-amount" data-sek="${cats.transport.amount}" data-is-estimate="true">
            ~ ${window.CurrencyService ? window.CurrencyService.formatSEK(cats.transport.amount) : cats.transport.amount + ' SEK'} (est.)
          </div>
          <div class="cat-tag">${cats.transport.isExcluded ? `<span class="excluded-pill">${t('tag.alreadyPaidExcluded')}</span>` : t('tag.roundTripFlights')}</div>
        </div>

        <!-- Accommodation -->
        <div class="breakdown-item">
          <div class="cat-icon">🏨</div>
          <div class="cat-name" data-i18n="cat.lodging">Lodging</div>
          <div class="cat-amount" data-sek="${cats.accommodation.amount}" data-is-estimate="true">
            ~ ${window.CurrencyService ? window.CurrencyService.formatSEK(cats.accommodation.amount) : cats.accommodation.amount + ' SEK'} (est.)
          </div>
          <div class="cat-tag">${cats.accommodation.isExcluded ? `<span class="excluded-pill">${t('tag.alreadyPaidExcluded')}</span>` : t('tag.hotelNights', {nights: cats.accommodation.nights})}</div>
        </div>

        <!-- Food -->
        <div class="breakdown-item">
          <div class="cat-icon">🍽️</div>
          <div class="cat-name" data-i18n="cat.food">Food & Dining</div>
          <div class="cat-amount" data-sek="${cats.food.amount}" data-is-estimate="true">
            ~ ${window.CurrencyService ? window.CurrencyService.formatSEK(cats.food.amount) : cats.food.amount + ' SEK'} (est.)
          </div>
          <div class="cat-tag">${t('tag.daysForGroup', {days})}</div>
        </div>

        <!-- Activities -->
        <div class="breakdown-item">
          <div class="cat-icon">🎟️</div>
          <div class="cat-name" data-i18n="cat.activities">Activities</div>
          <div class="cat-amount" data-sek="${cats.activities.amount}" data-is-estimate="true">
            ~ ${window.CurrencyService ? window.CurrencyService.formatSEK(cats.activities.amount) : cats.activities.amount + ' SEK'} (est.)
          </div>
          <div class="cat-tag">${t('tag.attractionTickets')}</div>
        </div>

        <!-- Local Transit -->
        <div class="breakdown-item">
          <div class="cat-icon">🚇</div>
          <div class="cat-name" data-i18n="cat.localTransit">Local Transit</div>
          <div class="cat-amount" data-sek="${cats.localTransit.amount}" data-is-estimate="true">
            ~ ${window.CurrencyService ? window.CurrencyService.formatSEK(cats.localTransit.amount) : cats.localTransit.amount + ' SEK'} (est.)
          </div>
          <div class="cat-tag">${t('tag.metroTransfers')}</div>
        </div>

        <!-- 10% Contingency Buffer -->
        <div class="breakdown-item">
          <div class="cat-icon">🛡️</div>
          <div class="cat-name" data-i18n="cat.buffer">10% Safety Buffer</div>
          <div class="cat-amount" data-sek="${cats.contingencyBuffer.amount}" data-is-estimate="true">
            ~ ${window.CurrencyService ? window.CurrencyService.formatSEK(cats.contingencyBuffer.amount) : cats.contingencyBuffer.amount + ' SEK'} (est.)
          </div>
          <div class="cat-tag">${t('tag.emergencyReserve')}</div>
        </div>
      </div>
    `;

    // 4. Cheaper Alternatives HTML (if any)
    let alternativesHtml = '';
    if (cheaperAlternatives && cheaperAlternatives.length > 0) {
      const altCards = cheaperAlternatives.map(alt => `
        <div class="alt-card">
          <div>
            <h5 class="alt-title">${alt.destination}</h5>
            <p class="alt-match">${alt.whyRecommended}</p>
            <p style="font-size: 0.8rem; color: var(--teal-primary); margin-bottom: 8px;">${alt.whyCheaper}</p>
          </div>
          <div>
            <p class="alt-cost">${t('rec.ballpark')}: <span data-sek="${alt.estimatedTotalSEK}" data-is-estimate="true">~ ${window.CurrencyService ? window.CurrencyService.formatSEK(alt.estimatedTotalSEK) : alt.estimatedTotalSEK + ' SEK'} (est.)</span></p>
            <button type="button" class="btn-select btn-switch-alt" data-dest="${alt.destination.split(',')[0].trim()}" style="width: 100%; margin-top: 8px;" data-i18n="alt.switchBtn">Switch to this City</button>
          </div>
        </div>
      `).join('');

      alternativesHtml = `
        <div id="affordable-alternatives" class="affordable-alternatives-container">
          <div class="alternatives-header">
            <span style="font-size: 1.5rem;">💡</span>
            <div>
              <h4 data-i18n="alt.boxTitle">Special Feature: Similar Destinations That Fit Your Budget</h4>
              <p data-i18n="alt.boxSubtitle" style="font-size: 0.9rem; color: var(--text-muted);">
                Love the vibe of this destination? These similar spots offer a comparable experience at lower costs:
              </p>
            </div>
          </div>
          <div class="alternatives-grid">${altCards}</div>
        </div>
      `;
    }

    // 5. Day-by-Day Itinerary HTML
    const daysHtml = (itinerary || []).map(day => `
      <article class="day-card">
        <div class="day-header">
          <span class="day-number-badge"><span data-i18n="itin.day">Day</span> ${day.day}</span>
          <h4 class="day-title">${day.date || ('Day ' + day.day)}: ${day.title}</h4>
        </div>
        <div class="timeline-slots">
          <!-- Morning -->
          <div class="slot">
            <div class="slot-label" data-i18n="itin.morning">🌅 Morning</div>
            <div class="slot-activity">${day.morning ? day.morning.activity : 'Morning Activity'}</div>
            <div class="slot-desc">${day.morning ? day.morning.description : ''}</div>
            <span class="slot-est-cost" data-sek="${day.morning ? day.morning.estimatedCostSEK : 0}" data-is-estimate="true">
              ~ ${window.CurrencyService ? window.CurrencyService.formatSEK(day.morning ? day.morning.estimatedCostSEK : 0) : '0 SEK'} (est.)
            </span>
          </div>

          <!-- Afternoon -->
          <div class="slot">
            <div class="slot-label" data-i18n="itin.afternoon">☀️ Afternoon</div>
            <div class="slot-activity">${day.afternoon ? day.afternoon.activity : 'Afternoon Activity'}</div>
            <div class="slot-desc">${day.afternoon ? day.afternoon.description : ''}</div>
            <span class="slot-est-cost" data-sek="${day.afternoon ? day.afternoon.estimatedCostSEK : 0}" data-is-estimate="true">
              ~ ${window.CurrencyService ? window.CurrencyService.formatSEK(day.afternoon ? day.afternoon.estimatedCostSEK : 0) : '0 SEK'} (est.)
            </span>
          </div>

          <!-- Evening -->
          <div class="slot">
            <div class="slot-label" data-i18n="itin.evening">🌙 Evening</div>
            <div class="slot-activity">${day.evening ? day.evening.activity : 'Evening Activity'}</div>
            <div class="slot-desc">${day.evening ? day.evening.description : ''}</div>
            <span class="slot-est-cost" data-sek="${day.evening ? day.evening.estimatedCostSEK : 0}" data-is-estimate="true">
              ~ ${window.CurrencyService ? window.CurrencyService.formatSEK(day.evening ? day.evening.estimatedCostSEK : 0) : '0 SEK'} (est.)
            </span>
          </div>
        </div>
      </article>
    `).join('');

    // Optional local guide uses content returned by the SAME Gemini itinerary request.
    // Older responses without localGuide still work via the legacy localTips array.
    const safeGuideText = (value) => String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const guideTranslations = {
      en: ['Local Tips & Must-Try Experiences', 'Traditional Food', 'Places to Discover', 'Local Culture & Experiences', 'Practical Travel Tips'],
      el: ['Τοπικές συμβουλές & εμπειρίες', 'Παραδοσιακό φαγητό', 'Μέρη που αξίζει να δεις', 'Τοπική κουλτούρα & εμπειρίες', 'Πρακτικές συμβουλές'],
      sv: ['Lokala tips och upplevelser', 'Traditionell mat', 'Platser att upptäcka', 'Lokal kultur och upplevelser', 'Praktiska restips'],
      de: ['Lokale Tipps und Erlebnisse', 'Traditionelles Essen', 'Sehenswerte Orte', 'Lokale Kultur und Erlebnisse', 'Praktische Reisetipps'],
      es: ['Consejos locales y experiencias', 'Comida tradicional', 'Lugares para descubrir', 'Cultura local y experiencias', 'Consejos prácticos']
    };
    const guideLang = (window.I18nService && (window.I18nService.currentLanguage || window.I18nService.language)) || localStorage.getItem('travel_language') || 'en';
    const guideLabels = guideTranslations[guideLang] || guideTranslations.en;
    // Some Gemini responses omit optional JSON fields despite the prompt.
    // A small, curated offline fallback keeps the guide useful without another API call.
    // These are general cultural recommendations, not live availability claims.
    const offlineGuides = {
      stockholm: {
        mustTryFoods: [
          {name: 'Köttbullar', description: 'Swedish meatballs, often served with potatoes and lingonberry jam.'},
          {name: 'Kanelbulle', description: 'A cinnamon bun, especially popular during a Swedish fika.'},
          {name: 'Toast Skagen', description: 'A classic Swedish shrimp toast, commonly enjoyed as a starter.'}
        ],
        mustSeePlaces: [
          {name: 'Gamla Stan', description: 'Walk through the historic old town and its colorful streets.'},
          {name: 'Vasa Museum', description: 'See the preserved seventeenth-century warship; check tickets and hours.'},
          {name: 'Monteliusvägen', description: 'A scenic viewpoint over Stockholm, weather and path conditions permitting.'}
        ],
        localExperiences: [
          {name: 'Fika', description: 'Take a relaxed coffee break with a pastry at a local café.'},
          {name: 'Explore metro station art', description: 'Several Stockholm metro stations feature public artworks; a valid ticket may be required.'}
        ],
        practicalTips: [
          'Card payments are widely accepted; check payment options before visiting.',
          'Use the official SL website or app to verify current public transport tickets and routes.',
          'In winter, dress in layers and check opening hours for seasonal attractions.'
        ]
      },
      thessaloniki: {
        mustTryFoods: [
          {name: 'Bougatsa', description: 'A Thessaloniki specialty: flaky pastry with sweet custard or savory filling.'},
          {name: 'Souvlaki', description: 'Grilled meat on skewers or served in pita, a popular Greek street food.'},
          {name: 'Trigona Panoramatos', description: 'Crisp syrup-soaked pastry cones filled with cream.'}
        ],
        mustSeePlaces: [
          {name: 'White Tower', description: 'A landmark on the waterfront; check museum opening hours.'},
          {name: 'Ano Poli', description: 'Explore the traditional upper town and its panoramic viewpoints.'},
          {name: 'Rotunda', description: 'A historic monument reflecting the city’s layered history.'}
        ],
        localExperiences: [
          {name: 'Waterfront evening walk', description: 'Join locals along the seafront promenade.'},
          {name: 'Markets and cafés', description: 'Visit central markets and stop for Greek coffee or a snack.'}
        ],
        practicalTips: [
          'Check current local transport routes and ticket rules before traveling.',
          'Many restaurants serve dinner later in the evening than in northern Europe.',
          'Wear comfortable shoes for the hills and cobbled streets of Ano Poli.'
        ]
      }
    };
    const destinationKey = String(tripOverview.destination || data.destination || '').toLowerCase();
    const fallbackKey = Object.keys(offlineGuides).find(key => destinationKey.includes(key));
    const fallback = fallbackKey ? offlineGuides[fallbackKey] : {};
    const providedGuide = tripOverview.localGuide || data.localGuide || {};
    const localGuide = { ...providedGuide };
    for (const category of ['mustTryFoods', 'mustSeePlaces', 'localExperiences', 'practicalTips']) {
      if (!Array.isArray(localGuide[category]) || localGuide[category].length === 0) {
        if (Array.isArray(fallback[category])) localGuide[category] = fallback[category];
      }
    }

    const guideSections = [
      [localGuide.mustTryFoods, guideLabels[1], '🍽️'],
      [localGuide.mustSeePlaces, guideLabels[2], '📍'],
      [localGuide.localExperiences, guideLabels[3], '🎭'],
      [localGuide.practicalTips || tripOverview.localTips, guideLabels[4], '💡']
    ];
    const guideItemsHtml = (entries, title, icon) => {
      if (!Array.isArray(entries) || entries.length === 0) return '';
      const cards = entries.slice(0, 5).map(item => {
        const name = typeof item === 'string' ? item : item.name || '';
        const description = typeof item === 'object' && item ? item.description || '' : '';
        return `<li class="guide-tip-item"><strong>${safeGuideText(name)}</strong>${description ? `<p>${safeGuideText(description)}</p>` : ''}</li>`;
      }).join('');
      return `<div class="guide-category"><h4>${icon} ${safeGuideText(title)}</h4><ul>${cards}</ul></div>`;
    };
    const guideCategoriesHtml = guideSections.map(section => guideItemsHtml(...section)).join('');
    const localGuideHtml = guideCategoriesHtml ? `
      <section class="local-guide-section" aria-label="Local travel guide">
        <h3>${safeGuideText(guideLabels[0])}: ${safeGuideText(tripOverview.destination || '')}</h3>
        <div class="local-guide-grid">${guideCategoriesHtml}</div>
      </section>` : '';

    // 6. Assemble Full Dashboard HTML
    resultsContainer.innerHTML = `
      ${overviewHtml}

      <div class="budget-health-card">
        <div class="budget-header">
          <h3 data-i18n="budget.healthTitle">📊 Budget Health & Estimated Cost Analysis</h3>
          <span class="currency-badge" data-i18n="budget.jsBadge">Calculated via Deterministic JavaScript</span>
        </div>

        ${alertHtml}
        ${fullComparison}
        ${rangeHtml}
        ${verificationHtml}

        <div class="budget-meter-container">
          <div class="meter-labels">
            <span><span data-i18n="budget.userBudgetLabel">Your Budget:</span> <strong data-sek="${budgetAnalysis.userBudget}">${formattedBudget}</strong></span>
            <span style="color: ${budgetAnalysis.isWithinBudget ? 'var(--status-success-badge)' : 'var(--status-warning-badge)'};">
              <span data-i18n="budget.estimatedTotalLabel">Estimated Total:</span> <strong data-sek="${budgetAnalysis.totalEstimated}" data-is-estimate="true">~ ${formattedTotal} (est.)</strong>
            </span>
          </div>
          <div class="meter-track">
            <div class="meter-fill ${budgetAnalysis.isWithinBudget ? 'within' : 'exceeded'}" style="width: 100%;"></div>
          </div>
        </div>

        ${breakdownHtml}
        <p data-i18n="budget.doubleCountingNote" style="margin: 16px 0; font-size: 0.88rem; color: var(--text-muted);">${t('budget.doubleCountingNote')}</p>
        ${alternativesHtml}
      </div>

      <div class="itinerary-section">
        <h3 data-i18n="itin.scheduleTitle">🗓️ Day-by-Day Travel Schedule</h3>
        <div class="days-container">${daysHtml}</div>
      </div>

      ${localGuideHtml}

      <div class="trip-actions-bar">
        <a href="#planner" class="btn-secondary" data-i18n="action.adjust">🔄 Adjust Trip Parameters</a>
        <button type="button" class="btn-save" id="btn-save-plan" data-i18n="action.save">💾 Save Trip to Browser</button>
        <button type="button" class="btn-secondary" onclick="window.print()" data-i18n="action.print">🖨️ Print / Export Itinerary</button>
      </div>
    `;

    // Free Wikipedia city cover photo. No API key, no added Gemini calls.
    // If Wikipedia is inaccessible or has no photo, the existing banner stays visible.
    this.loadCityCoverPhoto(tripOverview.destination);

    // Apply translations and re-render currency formatted numbers
    if (window.I18nService) window.I18nService.apply();
    if (window.CurrencyService) window.CurrencyService.refreshAllDisplayPrices();

    // Scroll smoothly to results
    if (shouldScroll) document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
  }
};

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('[App] Initializing AI Smart Travel Companion frontend...');

  // 1. Initialize Multilingual Support
  if (window.I18nService) {
    window.I18nService.init();
  }

  // 2. Initialize Currency Service
  if (window.CurrencyService) {
    await window.CurrencyService.init();
  }

  // 3. Initialize Travel App Controller
  TravelApp.init();
  window.TravelApp = TravelApp;
});
