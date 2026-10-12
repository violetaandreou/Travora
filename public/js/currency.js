/**
 * ==============================================================================
 * AI Smart Travel Companion - Real-Time Currency Conversion Engine
 * ==============================================================================
 * 
 * Supports 6 currencies:
 * - SEK (Swedish Krona) - Default & Internal Backend Base Currency
 * - EUR (Euro)
 * - USD (US Dollar)
 * - GBP (British Pound)
 * - DKK (Danish Krone)
 * - NOK (Norwegian Krone)
 * 
 * Sourced from the European Central Bank (ECB) via the free Frankfurter API:
 * https://api.frankfurter.dev/v1/latest?base=SEK
 */

const CurrencyService = {
  // 1. Supported Currency Metadata
  CURRENCIES: {
    SEK: { code: 'SEK', symbol: 'kr', name: 'Svenska kronor', symbolPosition: 'after' },
    EUR: { code: 'EUR', symbol: '€', name: 'Euro', symbolPosition: 'before' },
    USD: { code: 'USD', symbol: '$', name: 'US Dollar', symbolPosition: 'before' },
    GBP: { code: 'GBP', symbol: '£', name: 'British Pound', symbolPosition: 'before' },
    DKK: { code: 'DKK', symbol: 'kr', name: 'Danske kroner', symbolPosition: 'after' },
    NOK: { code: 'NOK', symbol: 'kr', name: 'Norske kroner', symbolPosition: 'after' }
  },

  // 2. State
  currentCurrency: 'SEK',
  previousCurrency: 'SEK',
  rates: { SEK: 1.0 }, // Base currency is always 1.0
  rateDate: null,
  isRatesAvailable: false,

  /**
   * Initializes currency service:
   * - Loads preference from localStorage
   * - Fetches live ECB exchange rates
   * - Updates DOM selectors and indicators
   */
  async init() {
    const saved = localStorage.getItem('travel_currency');
    if (saved && this.CURRENCIES[saved]) {
      this.currentCurrency = saved;
    } else {
      this.currentCurrency = 'SEK';
    }
    this.previousCurrency = this.currentCurrency;

    // Attach event listener to currency dropdown
    const select = document.getElementById('currency-select');
    if (select) {
      select.value = this.currentCurrency;
      select.addEventListener('change', (e) => {
        this.setCurrency(e.target.value);
      });
    }

    // Update form suffix with initial currency
    this.updateBudgetInputSuffix();

    // Fetch official rates from Frankfurter API
    await this.fetchExchangeRates();
  },

  /**
   * Fetches official ECB exchange rates with SEK as base.
   */
  async fetchExchangeRates() {
    const rateStatusText = document.getElementById('rate-status-text');
    const rateBadge = document.getElementById('exchange-rate-badge');

    try {
      const response = await fetch('https://api.frankfurter.dev/v1/latest?base=SEK');
      
      if (!response.ok) {
        throw new Error(`Exchange rate service returned HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.rates) {
        throw new Error('Invalid rate response received');
      }

      // Store official rates from ECB
      this.rates = {
        SEK: 1.0,
        ...data.rates
      };

      // Store official reference date (e.g., '2026-10-09')
      this.rateDate = data.date;
      this.isRatesAvailable = true;

      // Update header status badge with the actual ECB reference date
      if (rateStatusText) {
        rateStatusText.textContent = `ECB: ${this.rateDate}`;
      }
      if (rateBadge) {
        rateBadge.title = `Official ECB reference rates dated ${this.rateDate}. Base: 1 SEK.`;
      }

      console.log(`[Currency] Live ECB exchange rates loaded (Date: ${this.rateDate})`);

      // Re-render any existing currency amounts in DOM
      this.refreshAllDisplayPrices();
    } catch (err) {
      console.warn('[Currency] Live exchange rates unavailable:', err.message);
      this.isRatesAvailable = false;

      // Safe fallback: Alert user and lock to base currency SEK
      if (rateStatusText) {
        rateStatusText.textContent = 'Rates Offline (SEK)';
      }
      if (rateBadge) {
        rateBadge.title = 'Live rates unavailable. Using Swedish Kronor (SEK) for accuracy.';
      }

      // If user had another currency selected, fall back to SEK to prevent showing inaccurate numbers
      if (this.currentCurrency !== 'SEK') {
        this.fallbackToSEK();
      }
    }
  },

  /**
   * Graceful fallback to SEK if live exchange rates cannot be fetched.
   */
  fallbackToSEK() {
    alert('Live exchange rates are currently unavailable. Switching to base currency (SEK) to ensure 100% price accuracy.');
    this.currentCurrency = 'SEK';
    this.previousCurrency = 'SEK';
    localStorage.setItem('travel_currency', 'SEK');

    const select = document.getElementById('currency-select');
    if (select) {
      select.value = 'SEK';
    }
    this.updateBudgetInputSuffix();
    this.refreshAllDisplayPrices();
  },

  /**
   * Switches the active display currency.
   * Converts the user's budget input field while preserving its real purchasing value.
   */
  setCurrency(newCurrencyCode) {
    if (!this.CURRENCIES[newCurrencyCode]) return;

    // Guard: If rates are offline and user tries to switch away from SEK
    if (!this.isRatesAvailable && newCurrencyCode !== 'SEK') {
      alert('Live exchange rates are currently unavailable. Prices can only be displayed in base currency (SEK).');
      const select = document.getElementById('currency-select');
      if (select) select.value = 'SEK';
      return;
    }

    const oldCurrency = this.previousCurrency;
    this.currentCurrency = newCurrencyCode;
    localStorage.setItem('travel_currency', newCurrencyCode);

    // 1. Convert the budget input amount so its purchasing value is preserved
    this.convertBudgetInputValue(oldCurrency, newCurrencyCode);

    // 2. Update previousCurrency tracker
    this.previousCurrency = newCurrencyCode;

    // 3. Update the budget field suffix (e.g. 'SEK' -> 'EUR')
    this.updateBudgetInputSuffix();

    // 4. Update all price cards and numbers currently visible on the page
    this.refreshAllDisplayPrices();
  },

  /**
   * Converts the user's entered budget amount in the input field
   * from oldCurrency to newCurrency.
   */
  convertBudgetInputValue(oldCurrency, newCurrency) {
    const budgetInput = document.getElementById('budgetSEK');
    if (!budgetInput) return;

    const currentVal = parseFloat(budgetInput.value);
    if (isNaN(currentVal) || currentVal <= 0) return;

    // Step A: Convert old value to base SEK
    const valueInSEK = this.toBaseSEK(currentVal, oldCurrency);

    // Step B: Convert base SEK to new currency
    const valueInNewCurrency = this.fromBaseSEK(valueInSEK, newCurrency);

    // Round nicely: whole numbers for clean UX
    budgetInput.value = Math.round(valueInNewCurrency);
  },

  /**
   * Updates the suffix label next to the budget input field.
   */
  updateBudgetInputSuffix() {
    const suffix = document.getElementById('budget-currency-suffix');
    if (suffix) {
      suffix.textContent = this.currentCurrency;
    }
  },

  /**
   * Converts an amount from base currency (SEK) to the target currency.
   */
  fromBaseSEK(amountSEK, targetCurrency = this.currentCurrency) {
    if (targetCurrency === 'SEK') return amountSEK;
    const rate = this.rates[targetCurrency];
    if (!rate) return amountSEK;
    return amountSEK * rate;
  },

  /**
   * Converts an amount from source currency into base currency (SEK).
   * Used before sending data to the backend API.
   */
  toBaseSEK(amountInCurrency, sourceCurrency = this.currentCurrency) {
    if (sourceCurrency === 'SEK') return amountInCurrency;
    const rate = this.rates[sourceCurrency];
    if (!rate || rate === 0) return amountInCurrency;
    return amountInCurrency / rate;
  },

  /**
   * Formats an amount with its currency symbol and localization.
   * e.g. format(1500, 'SEK') => "1,500 kr"
   * e.g. format(120, 'EUR')  => "€120"
   */
  format(amount, currencyCode = this.currentCurrency) {
    const info = this.CURRENCIES[currencyCode] || this.CURRENCIES.SEK;
    const rounded = Math.round(amount);
    const formattedNum = rounded.toLocaleString();

    if (info.symbolPosition === 'before') {
      return `${info.symbol}${formattedNum}`;
    } else {
      return `${formattedNum} ${info.symbol}`;
    }
  },

  /**
   * Formats an amount that is currently in base SEK into the user's active currency.
   */
  formatSEK(amountSEK) {
    const converted = this.fromBaseSEK(amountSEK, this.currentCurrency);
    return this.format(converted, this.currentCurrency);
  },

  /**
   * Scans all elements in the DOM with [data-sek] and re-renders them in the active currency.
   */
  refreshAllDisplayPrices() {
    document.querySelectorAll('[data-sek]').forEach(el => {
      const sekAmount = parseFloat(el.getAttribute('data-sek'));
      if (isNaN(sekAmount)) return;

      const formatted = this.formatSEK(sekAmount);

      // Check if element has a prefix/suffix requirement or estimate tag
      const isEstimate = el.getAttribute('data-is-estimate') === 'true';
      if (isEstimate) {
        el.textContent = `~ ${formatted} (est.)`;
      } else {
        el.textContent = formatted;
      }
    });

    // Also update any dynamic budget meters and alert text if results are present
    if (window.TravelApp && typeof window.TravelApp.refreshBudgetDisplay === 'function') {
      window.TravelApp.refreshBudgetDisplay();
    }
  }
};

// Export for browser
if (typeof window !== 'undefined') {
  window.CurrencyService = CurrencyService;
}
