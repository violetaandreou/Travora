/**
 * ==============================================================================
 * Travora - Multilingual Translation Dictionary
 * ==============================================================================
 * 
 * Supports 5 interface languages:
 * - English (en) - Default
 * - Greek (el)
 * - Swedish (sv)
 * - German (de)
 * - Spanish (es)
 * 
 * IMPORTANT: Gemini AI outputs (destinations, itineraries, activities)
 * remain in English. This file translates ALL static and dynamic UI elements,
 * form labels, duration badges, budget breakdowns, exclusions, and demo notices.
 */

const TRANSLATIONS = {
  en: {
    // Brand & Navigation
    'brand.name': 'Travora',
    'nav.plan': 'Plan Trip',
    'nav.destinations': 'Destinations',
    'nav.itinerary': 'Itinerary',

    // Hero Section
    'hero.pill': '✨ Powered by Google Gemini AI',
    'hero.title': 'Smart Travel, Curated by AI, ',
    'hero.titleAccent': 'Tailored to Your Budget',
    'hero.subtitle': 'Plan personalized day-by-day itineraries with realistic cost breakdowns. If your dream destination exceeds your budget, our smart AI finds similar, more affordable gems.',
    'hero.disclaimer': 'Student Project Disclaimer: All travel costs are AI-generated planning estimates, not live booking prices.',

    // Demo / Sample Notice
    'demo.badge': '[SAMPLE DEMO PREVIEW]',
    'demo.bannerText': 'Interactive Demo Preview: The destinations and itinerary below are demonstration samples. Fill out the form above to generate fresh, real AI results tailored to your trip.',

    // Trip Planner Form
    'planner.title': '🌍 Design Your Next Journey',
    'planner.subtitle': 'Tell us where you want to go and your budget. If you are not sure where to go, click "Inspire Me"!',
    'planner.departureLabel': '🛫 Departure City',
    'planner.departurePlaceholder': 'e.g. Stockholm',
    'planner.destinationLabel': '🛬 Destination City',
    'planner.destinationPlaceholder': 'e.g. Rome (or click Inspire Me)',
    'planner.inspireBtn': '💡 Inspire Me',
    'planner.travelersLabel': '👥 Travelers',
    'planner.travelersSuffix': 'people',
    'planner.departureDateLabel': '🛫 Departure Date',
    'planner.returnDateLabel': '🛬 Return Date',
    'planner.durationBadge': '{days} travel days ({nights} hotel nights)',
    'planner.singleDay': '1 travel day (0 hotel nights)',
    'planner.nightsNote': 'ℹ️ Lodging is calculated as (days − 1) nights. Requirements may vary based on arrival and departure flight times.',
    'planner.exclusionsTitle': '💳 Already Paid / Booked Expenses (Optional)',
    'planner.exclusionsSubtitle': 'Exclude pre-paid costs from your remaining budget check:',
    'planner.excludeFlightsLabel': '✈️ Flights / Long-distance transport already paid',
    'planner.excludeHotelLabel': '🏨 Accommodation already paid',
    'planner.budgetLabel': '💰 Total Budget',
    'planner.interestsLabel': '🎨 Travel Interests & Style',
    'planner.submitBtn': '✨ Generate Travel Plan',

    // Loading State Messages
    'loading.title': 'Generating Your AI Travel Plan...',
    'loading.sub': 'Consulting Google Gemini AI for realistic itinerary activities and baseline estimates.',
    'loading.titleInspire': 'Finding Destination Ideas...',
    'loading.subInspire': 'Curating destinations that match your budget and travel preferences.',

    // Travel Interests
    'interest.culture': '🏛️ Culture & History',
    'interest.food': '🍕 Food & Dining',
    'interest.nature': '🌲 Nature & Outdoors',
    'interest.budget': '🎒 Budget Friendly',
    'interest.adventure': '🧗 Adventure',
    'interest.relaxation': '☕ Relaxation',
    'interest.art': '🎨 Art & Museums',

    // Recommendations Section
    'rec.badge': 'AI Recommendations',
    'rec.title': 'Need Ideas? Destinations Matching Your Budget',
    'rec.subtitle': 'Curated destinations matching your travel style and estimated target budget.',
    'rec.highlights': 'Highlights',
    'rec.ballpark': 'Estimated Ballpark',
    'rec.estimateNote': 'Planning estimate for all travelers',
    'rec.selectBtn': 'Select',

    // Results Dashboard & Overview
    'results.season': 'Season',
    'results.season': 'Εποχή',
    'results.season': 'Säsong',
    'results.season': 'Jahreszeit',
    'results.season': 'Temporada',
    'results.overviewTitle': 'Itinerary Overview',
    'budget.healthTitle': '📊 Budget Health & Estimated Cost Analysis',
    'budget.jsBadge': 'Calculated via Deterministic JavaScript',

    // Budget Comparison & Transparency
    'budget.fullTripCostLabel': 'Full Trip Value (All Costs):',
    'budget.remainingCostLabel': 'Active Remaining Costs (To Pay):',
    'budget.userBudgetLabel': 'Your Budget:',
    'budget.estimatedTotalLabel': 'Active Remaining Total:',
    'budget.excludedSavingsNote': '(Excluded {excludedAmount} in already-paid expenses from budget check)',
    'budget.doubleCountingNote': 'ℹ️ Non-Additive Notice: Daily activity and meal amounts shown in the schedule below are detailed illustrations of your days. They are already factored into the main Activities and Food categories above and are NOT added twice.',

    // Dynamic Badges & Tags
    'tag.alreadyPaidExcluded': 'ALREADY PAID (EXCLUDED)',
    'tag.includedInBudget': 'Included in remaining budget',
    'tag.daysForGroup': '{days} Days for Group',
    'tag.hotelNights': '{nights} Hotel Nights',
    'tag.travelersCount': '{count} Travelers',
    'tag.roundTripFlights': 'Round-Trip Flights / Transport',
    'tag.attractionTickets': 'Attraction Tickets',
    'tag.metroTransfers': 'Metro, Buses & Airport Transfers',
    'tag.emergencyReserve': 'Emergency Reserve (10%)',

    // Budget Alerts
    'budget.alertTitleExceeded': 'Estimated Trip Cost Exceeds Your Budget!',
    'budget.alertBodyExceeded': 'Your target budget is {budget}, but the estimated total cost for this trip is {total}. You are currently short by {shortfall}.',
    'budget.alertTitleWithin': 'Great News! Your Trip is Within Budget!',
    'budget.alertBodyWithin': 'Your target budget is {budget}, and the estimated cost is {total}. You have a surplus of {surplus} for shopping and spontaneous adventures!',
    'budget.alertViewAlt': 'View More Affordable Destinations Below ↓',
    'budget.alertAdjust': 'Adjust Trip Parameters ↑',

    // Cost Breakdown Categories
    'cat.transport': 'Transport',
    'cat.transportSub': 'Flights & Long-distance (est.)',
    'cat.lodging': 'Lodging',
    'cat.lodgingSub': 'Hotel / Stay (est.)',
    'cat.food': 'Food & Dining',
    'cat.foodSub': 'Meals & Dining (est.)',
    'cat.activities': 'Activities',
    'cat.activitiesSub': 'Tickets & Sights (est.)',
    'cat.localTransit': 'Local Transit',
    'cat.localTransitSub': 'Buses, Metro & Transfers (est.)',
    'cat.buffer': '10% Safety Buffer',
    'cat.bufferSub': 'Emergency Reserve (est.)',

    // Affordable Alternatives
    'alt.boxTitle': 'Special Feature: Similar Destinations That Fit Your Budget',
    'alt.boxSubtitle': 'Love the vibe of this destination? These similar spots offer a comparable experience at significantly lower costs:',
    'alt.savesPrefix': '💰 Saves approx.',
    'alt.switchBtn': 'Switch to this City',
    'alt.fitsTitle': 'Fits Within Your Budget! (Saves {savings})',
    'alt.closerTitle': 'Closer to Budget (Saves {savings}, shortfall reduced to {shortfall})',

    // Itinerary Timeline
    'itin.scheduleTitle': '🗓️ Day-by-Day Travel Schedule',
    'itin.day': 'Day',
    'itin.morning': '🌅 Morning',
    'itin.afternoon': '☀️ Afternoon',
    'itin.evening': '🌙 Evening',

    // Action Buttons
    'action.adjust': '🔄 Adjust Trip Parameters',
    'action.save': '💾 Save Trip to Browser',
    'action.print': '🖨️ Print / Export Itinerary',

    // Footer
    'footer.schoolNote': 'Created for an IT School Project • Built with Node.js, Express, and Google Gemini AI',
    'footer.disclaimer': 'ℹ️ Planning Disclaimer: All pricing estimates are generated for travel planning and budgetary comparisons only. Actual transportation, lodging, and seasonal flight rates are subject to real-time market fluctuations.'
  },

  el: {
    // Greek / Ελληνικά
    'brand.name': 'AI Έξυπνος Ταξιδιωτικός Σύντροφος',
    'nav.plan': 'Σχεδιασμός',
    'nav.destinations': 'Προορισμοί',
    'nav.itinerary': 'Δρομολόγιο',

    'hero.pill': '✨ Με την υποστήριξη του Google Gemini AI',
    'hero.title': 'Έξυπνα Ταξίδια με AI, ',
    'hero.titleAccent': 'Προσαρμοσμένα στον Προϋπολογισμό σας',
    'hero.subtitle': 'Σχεδιάστε εξατομικευμένα ημερήσια προγράμματα με ρεαλιστικές εκτιμήσεις κόστους. Εάν το ταξίδι υπερβαίνει το ποσό σας, το AI προτείνει παρόμοιους οικονομικούς προορισμούς.',
    'hero.disclaimer': 'Σημείωση Μαθητικού Έργου: Όλες οι τιμές είναι εκτιμήσεις AI για προγραμματισμό και όχι τιμές κρατήσεων.',

    'demo.badge': '[ΔΕΙΓΜΑ / ΠΡΟΕΠΙΣΚΟΠΗΣΗ]',
    'demo.bannerText': 'Διαδραστική Προεπισκόπηση: Οι παρακάτω προορισμοί και το δρομολόγιο είναι παραδείγματα επίδειξης. Συμπληρώστε τη φόρμα παραπάνω για να δημιουργήσετε νέα αποτελέσματα AI προσαρμοσμένα στο ταξίδι σας.',

    'planner.title': '🌍 Σχεδιάστε το Επόμενο Ταξίδι σας',
    'planner.subtitle': 'Εισαγάγετε προορισμό και προϋπολογισμό. Αν δεν έχετε αποφασίσει, πατήστε "Εμπνεύστε με"!',
    'planner.departureLabel': '🛫 Πόλη Αναχώρησης',
    'planner.departurePlaceholder': 'π.χ. Στοκχόλμη ή Αθήνα',
    'planner.destinationLabel': '🛬 Πόλη Προορισμού',
    'planner.destinationPlaceholder': 'π.χ. Ρώμη (ή πατήστε Εμπνεύστε με)',
    'planner.inspireBtn': '💡 Εμπνεύστε με',
    'planner.travelersLabel': '👥 Ταξιδιώτες',
    'planner.travelersSuffix': 'άτομα',
    'planner.departureDateLabel': '🛫 Ημερομηνία Αναχώρησης',
    'planner.returnDateLabel': '🛬 Ημερομηνία Επιστροφής',
    'planner.durationBadge': '{days} ταξιδιωτικές ημέρες ({nights} διανυκτερεύσεις)',
    'planner.singleDay': '1 ταξιδιωτική ημέρα (0 διανυκτερεύσεις)',
    'planner.nightsNote': 'ℹ️ Η διαμονή υπολογίζεται ως (ημέρες − 1) διανυκτερεύσεις. Οι ανάγκες ενδέχεται να διαφέρουν ανάλογα με τις πτήσεις.',
    'planner.exclusionsTitle': '💳 Ήδη Πληρωμένα Έξοδα (Προαιρετικό)',
    'planner.exclusionsSubtitle': 'Εξαιρέστε προπληρωμένα κόστη από τον υπολειπόμενο προϋπολογισμό:',
    'planner.excludeFlightsLabel': '✈️ Πτήσεις / Μεταφορικά ήδη πληρωμένα',
    'planner.excludeHotelLabel': '🏨 Διαμονή ήδη πληρωμένη',
    'planner.budgetLabel': '💰 Συνολικός Προϋπολογισμός',
    'planner.interestsLabel': '🎨 Ενδιαφέροντα & Στιλ Ταξιδιού',
    'planner.submitBtn': '✨ Δημιουργία Ταξιδιωτικού Πλάνου',

    'loading.title': 'Δημιουργία Ταξιδιωτικού Πλάνου...',
    'loading.sub': 'Επικοινωνία με το Google Gemini AI για δραστηριότητες και εκτιμήσεις κόστους.',
    'loading.titleInspire': 'Αναζήτηση Ιδεών Προορισμού...',
    'loading.subInspire': 'Επιλογή προορισμών που ταιριάζουν στον προϋπολογισμό και τις προτιμήσεις σας.',

    'interest.culture': '🏛️ Πολιτισμός & Ιστορία',
    'interest.food': '🍕 Φαγητό & Γαστρονομία',
    'interest.nature': '🌲 Φύση & Ύπαιθρος',
    'interest.budget': '🎒 Οικονομικό / Backpacker',
    'interest.adventure': '🧗 Περιπέτεια',
    'interest.relaxation': '☕ Χαλάρωση',
    'interest.art': '🎨 Τέχνες & Μουσεία',

    'rec.badge': 'Προτάσεις AI',
    'rec.title': 'Χρειάζεστε Ιδέες; Προορισμοί για τον Προϋπολογισμό σας',
    'rec.subtitle': 'Προορισμοί επιλεγμένοι βάσει των ενδιαφερόντων και του διαθέσιμου ποσού σας.',
    'rec.highlights': 'Κύρια Αξιοθέατα',
    'rec.ballpark': 'Εκτιμώμενο Κόστος',
    'rec.estimateNote': 'Εκτίμηση για όλους τους ταξιδιώτες',
    'rec.selectBtn': 'Επιλογή',

    'results.overviewTitle': 'Επισκόπηση Ταξιδιού',
    'budget.healthTitle': '📊 Ανάλυση Προϋπολογισμού & Εκτιμώμενου Κόστους',
    'budget.jsBadge': 'Υπολογισμός μέσω Ντετερμινιστικής JavaScript',

    'budget.fullTripCostLabel': 'Συνολική Αξία Ταξιδιού (Όλα τα Έξοδα):',
    'budget.remainingCostLabel': 'Ενεργό Υπολειπόμενο Κόστος (Προς Πληρωμή):',
    'budget.userBudgetLabel': 'Ο Προϋπολογισμός σας:',
    'budget.estimatedTotalLabel': 'Ενεργό Υπολειπόμενο Σύνολο:',
    'budget.excludedSavingsNote': '(Εξαιρέθηκαν {excludedAmount} ήδη πληρωμένων εξόδων από τον έλεγχο προϋπολογισμού)',
    'budget.doubleCountingNote': 'ℹ️ Σημείωση: Τα ποσά των ημερήσιων δραστηριοτήτων στο παρακάτω πρόγραμμα είναι ενδεικτική κατανομή και περιλαμβάνονται ήδη στις κύριες κατηγορίες Δραστηριότητες και Φαγητό (δεν υπολογίζονται διπλά).',

    'tag.alreadyPaidExcluded': 'ΗΔΗ ΠΛΗΡΩΜΕΝΟ (ΕΞΑΙΡΕΙΤΑΙ)',
    'tag.includedInBudget': 'Συμπεριλαμβάνεται στον υπολειπόμενο προϋπολογισμό',
    'tag.daysForGroup': '{days} Ημέρες για την Ομάδα',
    'tag.hotelNights': '{nights} Διανυκτερεύσεις',
    'tag.travelersCount': '{count} Ταξιδιώτες',
    'tag.roundTripFlights': 'Πτήσεις / Μεταφορές μετ\' επιστροφής',
    'tag.attractionTickets': 'Εισιτήρια Αξιοθεάτων',
    'tag.metroTransfers': 'Μετρό, Λεωφορεία & Μεταφορές Αεροδρομίου',
    'tag.emergencyReserve': 'Αποθεματικό Έκτακτης Ανάγκης (10%)',

    'budget.alertTitleExceeded': 'Το Εκτιμώμενο Κόστος Υπερβαίνει τον Προϋπολογισμό σας!',
    'budget.alertBodyExceeded': 'Ο προϋπολογισμός σας είναι {budget}, αλλά το εκτιμώμενο κόστος είναι {total}. Υπάρχει έλλειμμα κατά {shortfall}.',
    'budget.alertTitleWithin': 'Εξαιρετικά Νέα! Είστε Εντός Προϋπολογισμού!',
    'budget.alertBodyWithin': 'Ο προϋπολογισμός σας είναι {budget} και το κόστος {total}. Σας απομένουν {surplus} για επιπλέον δραστηριότητες!',
    'budget.alertViewAlt': 'Δείτε Πιο Οικονομικούς Προορισμούς Παρακάτω ↓',
    'budget.alertAdjust': 'Προσαρμογή Παραμέτρων Ταξιδιού ↑',

    'cat.transport': 'Μεταφορικά',
    'cat.transportSub': 'Πτήσεις & Μετακινήσεις (εκτ.)',
    'cat.lodging': 'Διαμονή',
    'cat.lodgingSub': 'Ξενοδοχείο / Κατάλυμα (εκτ.)',
    'cat.food': 'Φαγητό & Εστίαση',
    'cat.foodSub': 'Γεύματα & Εστιατόρια (εκτ.)',
    'cat.activities': 'Δραστηριότητες',
    'cat.activitiesSub': 'Εισιτήρια & Αξιοθέατα (εκτ.)',
    'cat.localTransit': 'Τοπικές Μετακινήσεις',
    'cat.localTransitSub': 'Μετρό, Λεωφορεία & Μεταφορές (εκτ.)',
    'cat.buffer': 'Αποθεματικό 10%',
    'cat.bufferSub': 'Έκτακτες Ανάγκες (εκτ.)',

    'alt.boxTitle': 'Ειδική Δυνατότητα: Παρόμοιοι Προορισμοί που Ταιριάζουν στο Ποσό σας',
    'alt.boxSubtitle': 'Σας αρέσει η ατμόσφαιρα αυτής της πόλης; Αυτοί οι προορισμοί προσφέρουν παρόμοια εμπειρία με πολύ χαμηλότερο κόστος:',
    'alt.savesPrefix': '💰 Εξοικονόμηση περίπου',
    'alt.switchBtn': 'Επιλογή Αυτής της Πόλης',
    'alt.fitsTitle': 'Εντός του Προϋπολογισμού σας! (Εξοικονόμηση {savings})',
    'alt.closerTitle': 'Πιο Κοντά στον Προϋπολογισμό (Εξοικονόμηση {savings}, έλλειμμα {shortfall})',

    'itin.scheduleTitle': '🗓️ Ημερήσιο Πρόγραμμα Ταξιδιού',
    'itin.day': 'Ημέρα',
    'itin.morning': '🌅 Πρωί',
    'itin.afternoon': '☀️ Απόγευμα',
    'itin.evening': '🌙 Βράδυ',

    'action.adjust': '🔄 Προσαρμογή Παραμέτρων',
    'action.save': '💾 Αποθήκευση στον Browser',
    'action.print': '🖨️ Εκτύπωση / Εξαγωγή Πλάνου',

    'footer.schoolNote': 'Μαθητικό Έργο Πληροφορικής • Υλοποιημένο με Node.js, Express και Google Gemini AI',
    'footer.disclaimer': 'ℹ️ Αποποίηση Ευθύνης: Όλες οι τιμές είναι εκτιμήσεις για προγραμματισμό. Οι πραγματικές τιμές αεροπορικών εισιτηρίων και διαμονής εξαρτώνται από την αγορά.'
  },

  sv: {
    // Swedish / Svenska
    'brand.name': 'AI Smart Resekompis',
    'nav.plan': 'Planera Resa',
    'nav.destinations': 'Destinationer',
    'nav.itinerary': 'Resplan',

    'hero.pill': '✨ Drivs av Google Gemini AI',
    'hero.title': 'Smart Resande med AI, ',
    'hero.titleAccent': 'Anpassat efter Din Budget',
    'hero.subtitle': 'Planera personliga dagsresplaner med realistiska kostnadsuppskattningar. Om resan överskrider din budget föreslår vår AI liknande, mer prisvärda pärlor.',
    'hero.disclaimer': 'Skolprojekt Disclaimer: Alla reskostnader är AI-genererade uppskattningar för planering, inte faktiska bokningspriser.',

    'demo.badge': '[EXEMPEL / FÖRHANDSVISNING]',
    'demo.bannerText': 'Interaktiv Exempelvisning: Destinationerna och resplanen nedan är demonstrationsexempel. Fyll i formuläret ovan för att generera anpassade AI-resultat för din resa.',

    'planner.title': '🌍 Designa Din Nästa Resa',
    'planner.subtitle': 'Ange var du vill resa och din budget. Om du är osäker, klicka på "Inspirera mig"!',
    'planner.departureLabel': '🛫 Avreseort',
    'planner.departurePlaceholder': 't.ex. Stockholm',
    'planner.destinationLabel': '🛬 Resmål',
    'planner.destinationPlaceholder': 't.ex. Rom (eller klicka Inspirera mig)',
    'planner.inspireBtn': '💡 Inspirera mig',
    'planner.travelersLabel': '👥 Resenärer',
    'planner.travelersSuffix': 'personer',
    'planner.departureDateLabel': '🛫 Avresedatum',
    'planner.returnDateLabel': '🛬 Hemresedatum',
    'planner.durationBadge': '{days} resdagar ({nights} hotellnätter)',
    'planner.singleDay': '1 resdag (0 hotellnätter)',
    'planner.nightsNote': 'ℹ️ Boende beräknas som (dagar − 1) nätter. Behovet kan variera beroende på flygtider.',
    'planner.exclusionsTitle': '💳 Redan Betalda Utgifter (Valfritt)',
    'planner.exclusionsSubtitle': 'Exkludera förbetalda kostnader från din återstående budget:',
    'planner.excludeFlightsLabel': '✈️ Flyg / Transport redan betalt',
    'planner.excludeHotelLabel': '🏨 Boende redan betalt',
    'planner.budgetLabel': '💰 Total Budget',
    'planner.interestsLabel': '🎨 Intressen & Resestil',
    'planner.submitBtn': '✨ Skapa Resplan',

    'loading.title': 'Skapar din AI-Resplan...',
    'loading.sub': 'Konsulterar Google Gemini AI för realistiska aktiviteter och budgetuppskattningar.',
    'loading.titleInspire': 'Söker Resmål...',
    'loading.subInspire': 'Väljer ut destinationer som matchar din budget och resestil.',

    'interest.culture': '🏛️ Kultur & Historia',
    'interest.food': '🍕 Mat & Restauranger',
    'interest.nature': '🌲 Natur & Friluftsliv',
    'interest.budget': '🎒 Budgetvänligt',
    'interest.adventure': '🧗 Äventyr',
    'interest.relaxation': '☕ Avkoppling',
    'interest.art': '🎨 Konst & Museer',

    'rec.badge': 'AI-Rekommendationer',
    'rec.title': 'Behöver du Idéer? Resmål som Matchar din Budget',
    'rec.subtitle': 'Utvalda destinationer baserade på din resestil och uppskattade budget.',
    'rec.highlights': 'Höjdpunkter',
    'rec.ballpark': 'Uppskattat Pris',
    'rec.estimateNote': 'Uppskattning för alla resenärer',
    'rec.selectBtn': 'Välj',

    'results.overviewTitle': 'Översikt över Resan',
    'budget.healthTitle': '📊 Budgetanalys & Uppskattade Kostnader',
    'budget.jsBadge': 'Beräknad via Deterministisk JavaScript',

    'budget.fullTripCostLabel': 'Hela Resans Värde (Alla Kostnader):',
    'budget.remainingCostLabel': 'Återstående Kostnader (Att Betala):',
    'budget.userBudgetLabel': 'Din Budget:',
    'budget.estimatedTotalLabel': 'Återstående Uppskattat Totalt:',
    'budget.excludedSavingsNote': '(Exkluderade {excludedAmount} i redan betalda utgifter från budgetkontrollen)',
    'budget.doubleCountingNote': 'ℹ️ Obs: Dagliga aktivitets- och matkostnader i schemat nedan är illustrativa uppdelningar och ingår redan i huvudkategorierna Aktiviteter och Mat ovan (de räknas inte dubbelt).',

    'tag.alreadyPaidExcluded': 'REDAN BETALT (EXKLUDERAT)',
    'tag.includedInBudget': 'Inkluderat i återstående budget',
    'tag.daysForGroup': '{days} Dagar för gruppen',
    'tag.hotelNights': '{nights} Hotellnätter',
    'tag.travelersCount': '{count} Resenärer',
    'tag.roundTripFlights': 'Flyg / Resa tur och retur',
    'tag.attractionTickets': 'Sevärdhetsbiljetter',
    'tag.metroTransfers': 'Tunnelbana, Buss & Flygtransfer',
    'tag.emergencyReserve': 'Reservfond (10%)',

    'budget.alertTitleExceeded': 'Uppskattad Kostnad Överskrider din Budget!',
    'budget.alertBodyExceeded': 'Din målbudget är {budget}, men beräknad totalkostnad är {total}. Du saknar för närvarande {shortfall}.',
    'budget.alertTitleWithin': 'Goda Nyheter! Din Resa Ligger Inom Budget!',
    'budget.alertBodyWithin': 'Din målbudget är {budget} och beräknad kostnad är {total}. Du har ett överskott på {surplus}!',
    'budget.alertViewAlt': 'Se Mer Prisvärda Resmål Nedan ↓',
    'budget.alertAdjust': 'Justera Reseparametrar ↑',

    'cat.transport': 'Transport',
    'cat.transportSub': 'Flyg & Långdistans (uppsk.)',
    'cat.lodging': 'Boende',
    'cat.lodgingSub': 'Hotell / Vistelse (uppsk.)',
    'cat.food': 'Mat & Dryck',
    'cat.foodSub': 'Måltider (uppsk.)',
    'cat.activities': 'Aktiviteter',
    'cat.activitiesSub': 'Biljetter & Sevärdheter (uppsk.)',
    'cat.localTransit': 'Lokaltrafik',
    'cat.localTransitSub': 'Buss, Tunnelbana & Transfer (uppsk.)',
    'cat.buffer': '10% Säkerhetsbuffert',
    'cat.bufferSub': 'Reservfond (uppsk.)',

    'alt.boxTitle': 'Specialfunktion: Liknande Resmål som Ryms i din Budget',
    'alt.boxSubtitle': 'Gillar du känslan av detta resmål? Dessa liknande städer erbjuder en jämförbar upplevelse till betydligt lägre priser:',
    'alt.savesPrefix': '💰 Sparar ca',
    'alt.switchBtn': 'Byt till denna stad',
    'alt.fitsTitle': 'Ryms inom din budget! (Sparar {savings})',
    'alt.closerTitle': 'Närmare budget (Sparar {savings}, underskott {shortfall})',

    'itin.scheduleTitle': '🗓️ Dag-för-Dag Resplan',
    'itin.day': 'Dag',
    'itin.morning': '🌅 Förmiddag',
    'itin.afternoon': '☀️ Eftermiddag',
    'itin.evening': '🌙 Kväll',

    'action.adjust': '🔄 Justera Parametrar',
    'action.save': '💾 Spara i Webbläsaren',
    'action.print': '🖨️ Skriv ut / Exportera',

    'footer.schoolNote': 'Skapat för ett IT-skolprojekt • Byggt med Node.js, Express och Google Gemini AI',
    'footer.disclaimer': 'ℹ️ Planeringsdisclaimer: Alla prisuppskattningar genereras endast för planering. Faktiska flyg- och hotellpriser styrs av marknaden.'
  },

  de: {
    // German / Deutsch
    'brand.name': 'AI Smarter Reisebegleiter',
    'nav.plan': 'Reise Planen',
    'nav.destinations': 'Reiseziele',
    'nav.itinerary': 'Reiseplan',

    'hero.pill': '✨ Unterstützt durch Google Gemini AI',
    'hero.title': 'Klug Reisen mit KI, ',
    'hero.titleAccent': 'Perfekt Abgestimmt auf Ihr Budget',
    'hero.subtitle': 'Erstellen Sie personalisierte Tagespläne mit realistischen Kostenschätzungen. Übersteigt Ihr Traumziel das Budget, findet unsere KI ähnliche, günstigere Reiseziele.',
    'hero.disclaimer': 'Schulprojekt-Hinweis: Alle Kosten sind KI-generierte Schätzungen zur Reiseplanung, keine Live-Buchungspreise.',

    'demo.badge': '[BEISPIEL-VORSCHAU]',
    'demo.bannerText': 'Interaktive Beispiel-Vorschau: Die folgenden Reiseziele und der Reiseplan sind Demonstrationsbeispiele. Nutzen Sie das Formular oben, um Ihren individuellen KI-Reiseplan zu erstellen.',

    'planner.title': '🌍 Gestalten Sie Ihre Nächste Reise',
    'planner.subtitle': 'Geben Sie Reiseziel und Budget ein. Wenn Sie noch unschlüssig sind, klicken Sie auf "Inspiriere mich"!',
    'planner.departureLabel': '🛫 Abflugort',
    'planner.departurePlaceholder': 'z.B. Stockholm oder Berlin',
    'planner.destinationLabel': '🛬 Reiseziel',
    'planner.destinationPlaceholder': 'z.B. Rom (oder Inspiriere mich)',
    'planner.inspireBtn': '💡 Inspiriere mich',
    'planner.travelersLabel': '👥 Reisende',
    'planner.travelersSuffix': 'Personen',
    'planner.departureDateLabel': '🛫 Abreisedatum',
    'planner.returnDateLabel': '🛬 Rückreisedatum',
    'planner.durationBadge': '{days} Reisetage ({nights} Hotelübernachtungen)',
    'planner.singleDay': '1 Reisetag (0 Hotelübernachtungen)',
    'planner.nightsNote': 'ℹ️ Unterkunft wird als (Tage − 1) Nächte berechnet. Der tatsächliche Bedarf kann je nach Flugzeiten variieren.',
    'planner.exclusionsTitle': '💳 Bereits Bezahlte Ausgaben (Optional)',
    'planner.exclusionsSubtitle': 'Schließen Sie im Voraus bezahlte Kosten vom verbleibenden Budget aus:',
    'planner.excludeFlightsLabel': '✈️ Flüge / Ferntransport bereits bezahlt',
    'planner.excludeHotelLabel': '🏨 Unterkunft bereits bezahlt',
    'planner.budgetLabel': '💰 Gesamtbudget',
    'planner.interestsLabel': '🎨 Interessen & Reisestil',
    'planner.submitBtn': '✨ Reiseplan Erstellen',

    'loading.title': 'Erstelle Ihren KI-Reiseplan...',
    'loading.sub': 'Google Gemini AI ermittelt realistische Aktivitäten und Kostenschätzungen.',
    'loading.titleInspire': 'Suche Reiseziele...',
    'loading.subInspire': 'Ziele passend zu Ihrem Budget und Stil werden ausgewählt.',

    'interest.culture': '🏛️ Kultur & Geschichte',
    'interest.food': '🍕 Essen & Gastronomie',
    'interest.nature': '🌲 Natur & Outdoor',
    'interest.budget': '🎒 Budgetfreundlich',
    'interest.adventure': '🧗 Abenteuer',
    'interest.relaxation': '☕ Entspannung',
    'interest.art': '🎨 Kunst & Museen',

    'rec.badge': 'KI-Empfehlungen',
    'rec.title': 'Ideen Gesucht? Ziele Passend zu Ihrem Budget',
    'rec.subtitle': 'Ausgewählte Reiseziele abgestimmt auf Ihre Vorlieben und Ihr geschätztes Budget.',
    'rec.highlights': 'Highlights',
    'rec.ballpark': 'Geschätzte Kosten',
    'rec.estimateNote': 'Schätzung für alle Reisenden',
    'rec.selectBtn': 'Auswählen',

    'results.overviewTitle': 'Reiseübersicht',
    'budget.healthTitle': '📊 Budget-Gesundheit & Kostenanalyse',
    'budget.jsBadge': 'Berechnet durch Deterministisches JavaScript',

    'budget.fullTripCostLabel': 'Gesamtwert der Reise (Alle Kosten):',
    'budget.remainingCostLabel': 'Verbleibende Kosten (Zu Zahlen):',
    'budget.userBudgetLabel': 'Ihr Budget:',
    'budget.estimatedTotalLabel': 'Verbleibend Geschätzt Gesamt:',
    'budget.excludedSavingsNote': '(Ausgenommen {excludedAmount} an bereits bezahlten Ausgaben von der Budgetprüfung)',
    'budget.doubleCountingNote': 'ℹ️ Hinweis: Die täglichen Aktivitäten- und Verpflegungskosten im Ablaufplan sind anschauliche Aufschlüsselungen und bereits in den Hauptkategorien Aktivitäten und Verpflegung oben enthalten (sie werden nicht doppelt berechnet).',

    'tag.alreadyPaidExcluded': 'BEREITS BEZAHLT (AUSGENOMMEN)',
    'tag.includedInBudget': 'Im verbleibenden Budget enthalten',
    'tag.daysForGroup': '{days} Tage für die Gruppe',
    'tag.hotelNights': '{nights} Übernachtungen',
    'tag.travelersCount': '{count} Reisende',
    'tag.roundTripFlights': 'Hin- und Rückflüge / Transport',
    'tag.attractionTickets': 'Tickets für Attraktionen',
    'tag.metroTransfers': 'U-Bahn, Busse & Flughafentransfer',
    'tag.emergencyReserve': 'Sicherheitsreserve (10%)',

    'budget.alertTitleExceeded': 'Geschätzte Kosten Übersteigen Ihr Budget!',
    'budget.alertBodyExceeded': 'Ihr Zielbudget beträgt {budget}, aber die geschätzten Gesamtkosten liegen bei {total}. Es fehlen aktuell {shortfall}.',
    'budget.alertTitleWithin': 'Tolle Neuigkeiten! Ihre Reise Liegt im Budget!',
    'budget.alertBodyWithin': 'Ihr Zielbudget ist {budget} und die geschätzten Kosten betragen {total}. Sie haben einen Überschuss von {surplus}!',
    'budget.alertViewAlt': 'Günstigere Reiseziele Unten Ansehen ↓',
    'budget.alertAdjust': 'Reiseparameter Anpassen ↑',

    'cat.transport': 'Transport',
    'cat.transportSub': 'Flüge & Ferntransport (geschätzt)',
    'cat.lodging': 'Unterkunft',
    'cat.lodgingSub': 'Hotel / Übernachtung (geschätzt)',
    'cat.food': 'Verpflegung',
    'cat.foodSub': 'Mahlzeiten & Restaurants (geschätzt)',
    'cat.activities': 'Aktivitäten',
    'cat.activitiesSub': 'Tickets & Sehenswürdigkeiten (geschätzt)',
    'cat.localTransit': 'Nahverkehr',
    'cat.localTransitSub': 'Bus, U-Bahn & Transfers (geschätzt)',
    'cat.buffer': '10% Notfallpuffer',
    'cat.bufferSub': 'Sicherheitsreserve (geschätzt)',

    'alt.boxTitle': 'Spezialfunktion: Ähnliche Reiseziele, die in Ihr Budget Passen',
    'alt.boxSubtitle': 'Gefällt Ihnen die Atmosphäre dieses Reiseziels? Diese Städte bieten ein ähnliches Erlebnis zu deutlich geringeren Kosten:',
    'alt.savesPrefix': '💰 Ersparnis ca.',
    'alt.switchBtn': 'Zu dieser Stadt wechseln',
    'alt.fitsTitle': 'Passt in Ihr Budget! (Spart {savings})',
    'alt.closerTitle': 'Näher am Budget (Spart {savings}, Differenz {shortfall})',

    'itin.scheduleTitle': '🗓️ Detaillierter Tagesablauf',
    'itin.day': 'Tag',
    'itin.morning': '🌅 Vormittag',
    'itin.afternoon': '☀️ Nachmittag',
    'itin.evening': '🌙 Abend',

    'action.adjust': '🔄 Parameter Anpassen',
    'action.save': '💾 Im Browser Speichern',
    'action.print': '🖨️ Drucken / Exportieren',

    'footer.schoolNote': 'Erstellt für ein IT-Schulprojekt • Entwickelt mit Node.js, Express und Google Gemini AI',
    'footer.disclaimer': 'ℹ️ Planungshinweis: Alle Kostenschätzungen dienen lediglich der Reiseplanung. Tatsächliche Flug- und Hotelpreise hängen vom aktuellen Markt ab.'
  },

  es: {
    // Spanish / Español
    'brand.name': 'AI Compañero Inteligente de Viaje',
    'nav.plan': 'Planificar Viaje',
    'nav.destinations': 'Destinos',
    'nav.itinerary': 'Itinerario',

    'hero.pill': '✨ Impulsado por Google Gemini AI',
    'hero.title': 'Viajes Inteligentes con IA, ',
    'hero.titleAccent': 'Adaptados a tu Presupuesto',
    'hero.subtitle': 'Planifica itinerarios diarios personalizados con estimaciones de costes realistas. Si tu destino soñado excede tu presupuesto, nuestra IA encuentra alternativas similares y más económicas.',
    'hero.disclaimer': 'Aviso de Proyecto Escolar: Todos los precios son estimaciones de planificación generadas por IA, no tarifas de reserva en vivo.',

    'demo.badge': '[VISTA PREVIA DE EJEMPLO]',
    'demo.bannerText': 'Vista Previa Interactiva de Ejemplo: Los destinos y el itinerario a continuación son ejemplos de muestra. Rellena el formulario arriba para generar un plan real de IA adaptado a tu viaje.',

    'planner.title': '🌍 Diseña tu Próximo Viaje',
    'planner.subtitle': 'Indica tu destino y presupuesto. Si aún no te decides, ¡haz clic en "Inspírame"!',
    'planner.departureLabel': '🛫 Ciudad de Salida',
    'planner.departurePlaceholder': 'ej. Estocolmo o Madrid',
    'planner.destinationLabel': '🛬 Ciudad de Destino',
    'planner.destinationPlaceholder': 'ej. Roma (o haz clic en Inspírame)',
    'planner.inspireBtn': '💡 Inspírame',
    'planner.travelersLabel': '👥 Viajeros',
    'planner.travelersSuffix': 'personas',
    'planner.departureDateLabel': '🛫 Fecha de Salida',
    'planner.returnDateLabel': '🛬 Fecha de Regreso',
    'planner.durationBadge': '{days} días de viaje ({nights} noches de hotel)',
    'planner.singleDay': '1 día de viaje (0 noches de hotel)',
    'planner.nightsNote': 'ℹ️ El alojamiento se calcula como (días − 1) noches. Las necesidades reales pueden variar según los horarios de vuelo.',
    'planner.exclusionsTitle': '💳 Gastos Ya Pagados / Reservados (Opcional)',
    'planner.exclusionsSubtitle': 'Excluye costes prepagados de tu presupuesto restante:',
    'planner.excludeFlightsLabel': '✈️ Vuelos / Transporte ya pagados',
    'planner.excludeHotelLabel': '🏨 Alojamiento ya pagado',
    'planner.budgetLabel': '💰 Presupuesto Total',
    'planner.interestsLabel': '🎨 Intereses y Estilo de Viaje',
    'planner.submitBtn': '✨ Generar Plan de Viaje',

    'loading.title': 'Generando tu Plan de Viaje...',
    'loading.sub': 'Consultando Google Gemini AI para actividades y costes estimados.',
    'loading.titleInspire': 'Buscando Ideas de Destinos...',
    'loading.subInspire': 'Seleccionando destinos según tu presupuesto y estilo.',

    'interest.culture': '🏛️ Cultura e Historia',
    'interest.food': '🍕 Gastronomía y Restaurantes',
    'interest.nature': '🌲 Naturaleza y Aire Libre',
    'interest.budget': '🎒 Económico / Mochilero',
    'interest.adventure': '🧗 Aventura',
    'interest.relaxation': '☕ Relajación',
    'interest.art': '🎨 Arte y Museos',

    'rec.badge': 'Recomendaciones IA',
    'rec.title': '¿Buscas Ideas? Destinos Adaptados a tu Presupuesto',
    'rec.subtitle': 'Destinos seleccionados según tus intereses y presupuesto objetivo.',
    'rec.highlights': 'Puntos Destacados',
    'rec.ballpark': 'Coste Estimado',
    'rec.estimateNote': 'Estimación para todos los viajeros',
    'rec.selectBtn': 'Seleccionar',

    'results.overviewTitle': 'Resumen del Viaje',
    'budget.healthTitle': '📊 Salud del Presupuesto y Análisis de Costes',
    'budget.jsBadge': 'Calculado mediante JavaScript Determinista',

    'budget.fullTripCostLabel': 'Valor Total del Viaje (Todos los Costes):',
    'budget.remainingCostLabel': 'Costes Restantes Activos (Por Pagar):',
    'budget.userBudgetLabel': 'Tu Presupuesto:',
    'budget.estimatedTotalLabel': 'Total Restante Estimado:',
    'budget.excludedSavingsNote': '(Se excluyeron {excludedAmount} en gastos ya pagados del control del presupuesto)',
    'budget.doubleCountingNote': 'ℹ️ Nota: Los costes de actividades y comidas diarias en el itinerario son desgloses ilustrativos y ya están incluidos en las categorías principales de Actividades y Comida (no se suman dos veces).',

    'tag.alreadyPaidExcluded': 'YA PAGADO (EXCLUIDO)',
    'tag.includedInBudget': 'Incluido en el presupuesto restante',
    'tag.daysForGroup': '{days} Días para el grupo',
    'tag.hotelNights': '{nights} Noches de Hotel',
    'tag.travelersCount': '{count} Viajeros',
    'tag.roundTripFlights': 'Vuelos de ida y vuelta / Transporte',
    'tag.attractionTickets': 'Entradas a Atracciones',
    'tag.metroTransfers': 'Metro, Autobuses y Traslados al Aeropuerto',
    'tag.emergencyReserve': 'Reserva de Emergencia (10%)',

    'budget.alertTitleExceeded': '¡El Coste Estimado Supera tu Presupuesto!',
    'budget.alertBodyExceeded': 'Tu presupuesto es {budget}, pero el coste total estimado es {total}. Actualmente te faltan {shortfall}.',
    'budget.alertTitleWithin': '¡Buenas Noticias! ¡Tu Viaje Cabe en el Presupuesto!',
    'budget.alertBodyWithin': 'Tu presupuesto es {budget} y el coste estimado es {total}. ¡Tienes un remanente de {surplus} para extras!',
    'budget.alertViewAlt': 'Ver Destinos Más Asequibles Abajo ↓',
    'budget.alertAdjust': 'Ajustar Parámetros del Viaje ↑',

    'cat.transport': 'Transporte',
    'cat.transportSub': 'Vuelos y Media/Larga distancia (est.)',
    'cat.lodging': 'Alojamiento',
    'cat.lodgingSub': 'Hotel / Estancia (est.)',
    'cat.food': 'Comida y Restaurantes',
    'cat.foodSub': 'Comidas diarias (est.)',
    'cat.activities': 'Actividades',
    'cat.activitiesSub': 'Entradas y Visitas (est.)',
    'cat.localTransit': 'Transporte Local',
    'cat.localTransitSub': 'Metro, Autobuses y Traslados (est.)',
    'cat.buffer': 'Colchón de Seguridad 10%',
    'cat.bufferSub': 'Reserva de Emergencia (est.)',

    'alt.boxTitle': 'Función Especial: Destinos Similares que Encajan en tu Presupuesto',
    'alt.boxSubtitle': '¿Te gusta la vibra de este destino? Estas ciudades similares ofrecen una experiencia comparable a un coste mucho más bajo:',
    'alt.savesPrefix': '💰 Ahorras aprox.',
    'alt.switchBtn': 'Cambiar a esta ciudad',
    'alt.fitsTitle': '¡Encaja en tu presupuesto! (Ahorras {savings})',
    'alt.closerTitle': 'Más cerca del presupuesto (Ahorras {savings}, faltan {shortfall})',

    'itin.scheduleTitle': '🗓️ Itinerario Diario Detallado',
    'itin.day': 'Día',
    'itin.morning': '🌅 Mañana',
    'itin.afternoon': '☀️ Tarde',
    'itin.evening': '🌙 Noche',

    'action.adjust': '🔄 Ajustar Parámetros',
    'action.save': '💾 Guardar en el Navegador',
    'action.print': '🖨️ Imprimir / Exportar',

    'footer.schoolNote': 'Creado para un Proyecto Escolar de TI • Desarrollado con Node.js, Express y Google Gemini AI',
    'footer.disclaimer': 'ℹ️ Aviso de Planificación: Todas las estimaciones son orientativas. Los precios reales de vuelos y alojamientos están sujetos al mercado en tiempo real.'
  }
};

/**
 * Global Translation Service
 */
const I18nService = {
  currentLang: 'en',

  /**
   * Initializes the language from localStorage or defaults to 'en'.
   */
  init() {
    const saved = localStorage.getItem('travel_language');
    if (saved && TRANSLATIONS[saved]) {
      this.currentLang = saved;
    } else {
      this.currentLang = 'en';
    }

    // Set dropdown to current language if it exists in DOM
    const select = document.getElementById('language-select');
    if (select) {
      select.value = this.currentLang;
      select.addEventListener('change', (e) => {
        this.setLanguage(e.target.value);
      });
    }

    this.apply();
  },

  /**
   * Switches language and re-translates DOM.
   */
  setLanguage(langCode) {
    if (!TRANSLATIONS[langCode]) return;
    this.currentLang = langCode;
    localStorage.setItem('travel_language', langCode);
    this.apply();

    // Trigger re-render of dynamic elements in TravelApp if active
    if (window.TravelApp && typeof window.TravelApp.onLanguageChanged === 'function') {
      window.TravelApp.onLanguageChanged();
    }
  },

  /**
   * Returns translated string for a key, optionally interpolating variables.
   */
  t(key, params = {}) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS['en'];
    let text = dict[key] || (TRANSLATIONS['en'] ? TRANSLATIONS['en'][key] : key) || key;

    // Simple variable interpolation: {days} -> "5"
    Object.keys(params).forEach(param => {
      text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
    });

    return text;
  },

  /**
   * Scans the document and applies translations to all elements with data-i18n attributes.
   */
  apply() {
    // 1. Inner Text
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        el.textContent = translation;
      }
    });

    // 2. Placeholders (for form inputs)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation) {
        el.placeholder = translation;
      }
    });

    // 3. Titles / Tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translation = this.t(key);
      if (translation) {
        el.title = translation;
      }
    });
  }
};

// Export for use in browser window
if (typeof window !== 'undefined') {
  window.TRANSLATIONS = TRANSLATIONS;
  window.I18nService = I18nService;
}
