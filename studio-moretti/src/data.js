export const studio = {
  name: "Studio Legale Rossi",
  lawyer: "Avv. Elena Rossi",
  short: "Rossi",
  city: "Milano",
  phone: "02 8901 4420",
  phoneHref: "tel:+390289014420",
  email: "studio@studiolegalerossi.it",
  address: "Via Durini 18",
  cap: "20122",
  hours: [
    ["Lunedì – giovedì", "9:00 – 13:00 · 14:30 – 18:30"],
    ["Venerdì", "9:00 – 13:00 · 14:30 – 17:30"],
    ["Sabato e domenica", "Su appuntamento"],
  ],
  calendly: "https://calendly.com/studiolegalerossi/videocall",
  maps: "https://maps.google.com/maps?q=Via%20Durini%2018%20Milano&z=16&output=embed",
  mapsLink: "https://maps.google.com/?q=Via+Durini+18+Milano",
  rating: 4.9,
  reviews: 86,
  albo: "Ordine degli Avvocati di Milano, n. 48217",
  vat: "IT 10928473651",
}

export const images = {
  portrait:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80",
  office:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80",
  library:
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80",
  desk:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
  meeting:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80",
  books:
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80",
  columns:
    "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1600&q=80",
}

export const nav = [
  { to: "/chi-sono", label: "Lo studio" },
  { to: "/aree-di-pratica", label: "Competenze" },
  { to: "/testimonianze", label: "Storie" },
  { to: "/approfondimenti", label: "Approfondimenti" },
  { to: "/contatti", label: "Contatti" },
]

export const stats = [
  { value: "18", label: "anni di pratica forense" },
  { value: "640+", label: "pratiche seguite" },
  { value: "92%", label: "chiuse senza giudizio" },
  { value: "48h", label: "per il primo riscontro" },
]

export const values = [
  {
    title: "Un solo interlocutore",
    text: "Parli sempre con chi conosce il fascicolo. Nessun passaggio di mano, nessuna sintesi di seconda mano.",
  },
  {
    title: "Lingua chiara",
    text: "Prima della strategia arriva la spiegazione: cosa succede, quanto costa, quanto dura, cosa puoi decidere tu.",
  },
  {
    title: "Riservatezza concreta",
    text: "Lo studio è in un palazzo riservato in centro. I colloqui non si svolgono in open space, e i documenti restano nello studio.",
  },
]

export const method = [
  { n: "01", title: "Ascolto", text: "Un primo colloquio per capire i fatti, i tempi e ciò che per te non è negoziabile." },
  { n: "02", title: "Quadro", text: "Ti consegno una lettura scritta: rischi, leve e strade possibili, in ordine di priorità." },
  { n: "03", title: "Scelta", text: "Decidiamo insieme se trattare, mediare o agire. Il preventivo precede ogni incarico." },
  { n: "04", title: "Conduzione", text: "Seguo io la pratica e ti aggiorno nei passaggi che contano, senza rumore inutile." },
]

export const services = [
  {
    slug: "diritto-civile",
    title: "Diritto civile",
    kicker: "Persone e patrimoni",
    icon: "scale",
    excerpt: "Responsabilità, proprietà, successioni e risarcimenti. Quando un diritto va fatto valere con misura.",
    problems: [
      "Un danno non riconosciuto, o riconosciuto troppo tardi",
      "Confini, comproprietà e vicini che non rispondono",
      "Eredità bloccate da disaccordi o da testamenti poco chiari",
      "Inadempimenti tra privati che si trascinano da mesi",
    ],
    approach:
      "Parto dai documenti e dalle prove che hai già. Ti dico subito se conviene scrivere, mediare o citare — e quanto è realistico ottenere.",
    cases: [
      "Risarcimento da incidente stradale e malpractice sanitaria",
      "Azioni di rivendica e regolamento di confini",
      "Impugnazione di testamenti e divisioni ereditarie",
      "Recupero crediti tra privati",
    ],
    results: [
      { label: "Transazione", detail: "Risarcimento integrale chiuso in quattro mesi, senza udienza." },
      { label: "Divisione", detail: "Tre coeredi allineati su un piano di vendita, con tempi scritti." },
      { label: "Proprietà", detail: "Accesso ripristinato dopo una diffida circostanziata." },
    ],
    faqs: [
      { q: "Devo già avere tutte le prove?", a: "No. Al primo incontro basta raccontare i fatti e portare ciò che hai: messaggi, contratti, referti, foto. Ti indico io cosa manca e se si può acquisire." },
      { q: "Conviene sempre fare causa?", a: "Quasi mai come primo passo. Una lettera ben costruita o una mediazione spesso ottengono lo stesso risultato in meno tempo e con meno esposizione." },
      { q: "Quanto costa un primo parere?", a: "Il primo colloquio di orientamento è gratuito e dura circa 30 minuti. Se serve un parere scritto, il compenso è indicato prima." },
    ],
    quote: { text: "Per la prima volta qualcuno mi ha detto cosa potevo ottenere e cosa no, prima di farmi firmare qualcosa.", author: "Cliente privata, controversia ereditaria" },
    seo: "Avvocato civilista a Milano: responsabilità, proprietà, successioni e recupero crediti. Consulenza legale civile con Avv. Elena Rossi.",
  },
  {
    slug: "diritto-commerciale",
    title: "Diritto commerciale",
    kicker: "Imprese e soci",
    icon: "briefcase",
    excerpt: "Società, contratti d’impresa e crisi tra soci. Per chi guida un’azienda e vuole decidere con un quadro netto.",
    problems: [
      "Un socio che non collabora più, ma resta in società",
      "Fornitori o clienti che non pagano, o pagano a condizioni diverse",
      "Un’acquisizione o una cessione preparata in fretta",
      "Clausole statutarie che nessuno ha riletto da anni",
    ],
    approach:
      "Lavoro con l’amministratore, non al posto suo. Traduco il rischio societario in scelte: restare, rinegoziare, uscire o tutelarsi in giudizio.",
    cases: [
      "Patti parasociali e uscite del socio",
      "Contenzioso tra amministratori e soci di minoranza",
      "Contratti di distribuzione, agenzia e fornitura",
      "Due diligence legale su operazioni straordinarie",
    ],
    results: [
      { label: "Uscita del socio", detail: "Patto di exit chiuso in sessanta giorni, con tutela sul marchio." },
      { label: "Credito", detail: "Piano di rientro garantito, senza decreto ingiuntivo." },
      { label: "Statuto", detail: "Clausole di stallo riscritte prima di un aumento di capitale." },
    ],
    faqs: [
      { q: "Segui anche società piccole?", a: "Sì. La maggior parte dei mandati riguarda srl familiari e professionali, non solo gruppi strutturati." },
      { q: "Puoi coordinarti con il commercialista?", a: "È il modo in cui preferisco lavorare. Il parere legale e quello fiscale vanno letti insieme." },
      { q: "Intervieni anche in urgenza?", a: "Sì, per provvedimenti cautelari e per fermare atti che compromettono la società. Il primo contatto arriva entro 48 ore." },
    ],
    quote: { text: "Abbiamo evitato una causa tra soci che avrebbe fermato l’azienda per due anni.", author: "Amministratore, srl manifatturiera" },
    seo: "Avvocato diritto commerciale a Milano: società, soci, contratti d’impresa e contenzioso. Consulenza per srl e operazioni straordinarie.",
  },
  {
    slug: "diritto-amministrativo",
    title: "Diritto amministrativo",
    kicker: "Pubblica amministrazione",
    icon: "landmark",
    excerpt: "Autorizzazioni, appalti, sanzioni e ricorsi. Quando dall’altra parte c’è un ufficio, non una persona.",
    problems: [
      "Un permesso negato senza una motivazione leggibile",
      "Una gara d’appalto esclusa per un vizio formale",
      "Una sanzione urbanistica o commerciale sproporzionata",
      "Tempi della pubblica amministrazione che bloccano un progetto",
    ],
    approach:
      "Leggo il provvedimento prima di impugnarlo. Spesso la leva giusta è l’autotutela o un ricorso mirato, non un contenzioso lungo.",
    cases: [
      "Ricorsi al TAR Lombardia su autorizzazioni e sanzioni",
      "Accesso agli atti e istanze di riesame",
      "Appalti pubblici sotto soglia e sopra soglia",
      "Convenzioni urbanistiche e titoli edilizi",
    ],
    results: [
      { label: "Autorizzazione", detail: "Titolo rilasciato in autotutela, senza arrivare all’udienza." },
      { label: "Gara", detail: "Riammissione in graduatoria dopo accesso agli atti." },
      { label: "Sanzione", detail: "Importo ridotto di due terzi in sede di contraddittorio." },
    ],
    faqs: [
      { q: "Ho pochi giorni per ricorrere. Si fa in tempo?", a: "I termini amministrativi sono stretti. Scrivimi il giorno in cui ricevi il provvedimento: verifico subito se il termine è ancora aperto." },
      { q: "Il TAR è sempre necessario?", a: "No. Molti esiti si ottengono con un’istanza motivata all’amministrazione, se il vizio è evidente." },
      { q: "Segui enti fuori Milano?", a: "Sì, in Lombardia e, per i ricorsi, presso il TAR competente." },
    ],
    quote: { text: "Ci hanno spiegato il provvedimento riga per riga. Poi hanno scritto loro all’ufficio, e il permesso è arrivato.", author: "Titolare di attività commerciale" },
    seo: "Avvocato amministrativista a Milano: ricorsi TAR, appalti, autorizzazioni e sanzioni. Consulenza verso la pubblica amministrazione.",
  },
  {
    slug: "diritto-del-lavoro",
    title: "Diritto del lavoro",
    kicker: "Persone e imprese",
    icon: "users",
    excerpt: "Licenziamenti, contratti, dirigenti e conciliazioni. Per chi deve chiudere un rapporto senza aprirne un altro, più lungo.",
    problems: [
      "Una lettera di licenziamento arrivata senza preavviso reale",
      "Un ruolo cambiato, uno stipendio no",
      "Un contenzioso interno che il management non vuole in aula",
      "Contratti e politiche aziendali scritti anni fa",
    ],
    approach:
      "Assisto sia la persona sia l’impresa, mai le due parti dello stesso conflitto. L’obiettivo è una chiusura sostenibile, non una vittoria di principio.",
    cases: [
      "Impugnazione e negoziazione di licenziamenti",
      "Contratti dirigenziali, patti di non concorrenza, welfare",
      "Conciliazioni in sede sindacale e giudiziale",
      "Trasferimenti, demansionamento, molestie",
    ],
    results: [
      { label: "Conciliazione", detail: "Uscita concordata con indennità e referenze scritte." },
      { label: "Impugnazione", detail: "Reintegra evitato da entrambe le parti con un accordo in 45 giorni." },
      { label: "Policy", detail: "Regolamento interno aggiornato prima di una riorganizzazione." },
    ],
    faqs: [
      { q: "Ho 60 giorni per impugnare. Da quando partono?", a: "Dalla ricezione del licenziamento. Non aspettare l’ultimo giorno: la trattativa ha bisogno di margine." },
      { q: "L’azienda può contattarti in via riservata?", a: "Sì. I colloqui preliminari restano coperti dal segreto professionale, anche se poi non c’è un incarico." },
      { q: "Ti occupi di lavoro domestico o solo di imprese?", a: "Il focus è lavoro subordinato in azienda, inclusi quadri e dirigenti." },
    ],
    quote: { text: "Sono uscita con un accordo chiaro e senza dover raccontare la storia in tribunale.", author: "Quadro commerciale" },
    seo: "Avvocato del lavoro a Milano: licenziamenti, conciliazioni e contratti dirigenziali. Consulenza per persone e imprese.",
  },
  {
    slug: "diritto-di-famiglia",
    title: "Diritto di famiglia",
    kicker: "Separazioni e tutele",
    icon: "home",
    excerpt: "Separazioni, affidamento, mantenimento. Decisioni delicate, trattate con calma e con un calendario vero.",
    problems: [
      "Una separazione che deve proteggere i figli prima delle ragioni",
      "Un mantenimento che non corrisponde più alla vita reale",
      "La casa familiare e i conti cointestati da districare",
      "Un accordo già tentato, e poi disatteso",
    ],
    approach:
      "Preferisco la negoziazione assistita e gli accordi scritti bene. Il giudizio resta una strada, non un riflesso.",
    cases: [
      "Separazioni consensuali e giudiziali",
      "Affidamento, collocazione e piani genitoriali",
      "Modifica delle condizioni economiche",
      "Tutela del patrimonio familiare",
    ],
    results: [
      { label: "Accordo", detail: "Piano genitoriale firmato senza udienza contenziosa." },
      { label: "Casa", detail: "Assegnazione e tempi di vendita definiti nello stesso atto." },
      { label: "Mantenimento", detail: "Revisione calibrata sul reddito attuale, non su quello di cinque anni fa." },
    ],
    faqs: [
      { q: "Possiamo venire insieme al primo incontro?", a: "Se l’obiettivo è un accordo condiviso, sì. Se c’è già un contrasto netto, è meglio un colloquio separato." },
      { q: "Ti occupi anche della parte patrimoniale?", a: "Sì, insieme al civilista interno allo studio quando ci sono immobili o partecipazioni." },
      { q: "Quanto dura una separazione consensuale?", a: "Con i documenti pronti, l’accordo si costruisce in poche settimane. I tempi del tribunale dipendono dal ruolo." },
    ],
    quote: { text: "Abbiamo trovato un linguaggio che i nostri figli possono reggere. Non era scontato.", author: "Genitore, separazione consensuale" },
    seo: "Avvocato familiarista a Milano: separazioni, affidamento e mantenimento. Consulenza riservata con Avv. Elena Rossi.",
  },
  {
    slug: "contrattualistica",
    title: "Contrattualistica",
    kicker: "Prima della firma",
    icon: "file",
    excerpt: "Contratti che si possono rispettare. Redazione, revisione e negoziazione, prima che il testo diventi un problema.",
    problems: [
      "Un modello scaricato e adattato male",
      "Una controparte che spinge a firmare «la versione standard»",
      "Clausole penali, foro e recesso scritti contro di te",
      "Un contratto in inglese che nessuno ha riletto in italiano",
    ],
    approach:
      "Riscrivo solo ciò che sposta il rischio. Ti segnalo tre livelli: cosa va cambiato, cosa si può trattare, cosa si può accettare.",
    cases: [
      "Locazioni commerciali e affitto di ramo d’azienda",
      "Appalti privati, forniture e servizi continuativi",
      "NDA, collaborazione e cessione di diritti",
      "Condizioni generali di contratto",
    ],
    results: [
      { label: "Locazione", detail: "Recesso e riparti di spesa rinegoziati prima del rogito." },
      { label: "Fornitura", detail: "Penale ridotta e foro riportato a Milano." },
      { label: "NDA", detail: "Perimetro del segreto circoscritto, così il team può lavorare." },
    ],
    faqs: [
      { q: "Rileggi anche contratti già firmati?", a: "Sì. Capire cosa hai firmato è il primo passo se qualcosa si è inceppato." },
      { q: "Lavori in inglese?", a: "Sì. Negozio e redigo in italiano e in inglese." },
      { q: "In quanto tempo ricevo una revisione?", a: "Per un contratto ordinario, una prima nota entro cinque giorni lavorativi. Le urgenze si concordano." },
    ],
    quote: { text: "Tre pagine di note, non trenta. Abbiamo firmato sapendo esattamente dove eravamo esposti.", author: "Founder, società di servizi" },
    seo: "Avvocato contrattualista a Milano: redazione e revisione contratti commerciali, locazioni e NDA. Consulenza prima della firma.",
  },
]

export const testimonials = [
  {
    name: "M. R.",
    role: "Imprenditrice, Milano",
    stars: 5,
    source: "Google",
    text: "Mi aspettavo un linguaggio da tribunale. Ho trovato una persona che ha messo in fila i fatti e mi ha detto, con calma, cosa fare la settimana dopo.",
    area: "Diritto commerciale",
  },
  {
    name: "L. B.",
    role: "Privato",
    stars: 5,
    source: "Google",
    text: "Sulla successione di mio padre c’erano tre versioni in famiglia. Lo studio ha tenuto il punto senza alzare i toni, e l’accordo è arrivato.",
    area: "Diritto civile",
  },
  {
    name: "A. V.",
    role: "Direttore del personale",
    stars: 5,
    source: "Facebook",
    text: "Abbiamo chiuso due uscite delicate senza che diventassero un caso interno. Precisi sui tempi, sobri nelle mail.",
    area: "Diritto del lavoro",
  },
  {
    name: "C. F.",
    role: "Genitore",
    stars: 5,
    source: "Google",
    text: "In un momento in cui tutto sembrava urgente, ci hanno dato un calendario. I bambini non sono mai diventati un argomento di trattativa.",
    area: "Diritto di famiglia",
  },
  {
    name: "S. G.",
    role: "Titolare di negozio",
    stars: 4,
    source: "Google",
    text: "La sanzione del Comune era illeggibile. Dopo il ricorso in autotutela l’importo è sceso e abbiamo potuto riaprire.",
    area: "Diritto amministrativo",
  },
  {
    name: "P. D.",
    role: "Libero professionista",
    stars: 5,
    source: "Facebook",
    text: "Ho mandato un contratto «già pronto». Me lo hanno restituito con le sole clausole che mi esponevano. Ho firmato due giorni dopo.",
    area: "Contrattualistica",
  },
]

export const caseStudies = [
  {
    title: "Uscita da una srl familiare",
    area: "Diritto commerciale",
    time: "11 settimane",
    result: "Quota liquidata e marchio rimasto in società, senza giudizio.",
    text: "Due fratelli non si parlavano più, l’azienda sì. Abbiamo ricostruito i patti, fissato un valore condiviso con il commercialista e chiuso l’uscita prima che il conflitto entrasse in bilancio.",
  },
  {
    title: "Licenziamento di un quadro",
    area: "Diritto del lavoro",
    time: "6 settimane",
    result: "Indennità concordata e lettera di referenze.",
    text: "La lettera era fragile, la relazione no. Invece di impugnare per principio, abbiamo negoziato un’uscita che tutelava la persona e non esponeva l’azienda a un anno di causa.",
  },
  {
    title: "Permesso commerciale fermo in Comune",
    area: "Diritto amministrativo",
    time: "9 settimane",
    result: "Titolo rilasciato in autotutela.",
    text: "Il diniego citava una norma che non si applicava. Accesso agli atti, istanza motivata, nessuna udienza. Il locale ha aperto per la stagione.",
  },
]

export const articles = [
  {
    slug: "causa-civile-tempi-e-alternative",
    title: "Prima della causa civile: tempi, costi e strade che spesso funzionano meglio",
    date: "2026-09-08",
    category: "Diritto civile",
    read: "6 min",
    excerpt: "Citare in giudizio è un diritto. Non è quasi mai il primo gesto utile. Una guida per capire quando scrivere, quando mediare e quando agire.",
    keywords: "consulenza legale civile, avvocato Milano, mediazione civile",
    content: [
      { h: "Il riflesso di «fare causa»", p: "Quando un diritto resta sulla carta, la causa sembra l’unico modo per essere presi sul serio. In molti casi è l’opposto: una citazione prematura irrigidisce l’altra parte, allunga i tempi e sposta l’attenzione dalle prove alla procedura." },
      { h: "Cosa si può fare nelle prime due settimane", p: "Si mettono in ordine i fatti, si raccolgono i documenti che già esistono e si scrive una lettera che dice tre cose: cosa è successo, cosa si chiede, entro quando. Una diffida generica non sposta nulla. Una diffida precisa, spesso sì." },
      { h: "La mediazione non è un compromesso al ribasso", p: "Dal 2010 molte materie civili passano da un incontro di mediazione. Non è un adempimento da subire. È il momento in cui, con un terzo e con i documenti sul tavolo, si verifica se esiste un numero — o una prestazione — che chiude la vicenda senza sentenza." },
      { h: "Quando il giudizio è la strada giusta", p: "Se la controparte è irreperibile, se il diritto sta per prescriversi, se serve un provvedimento urgente del giudice, il ricorso o la citazione non si rimandano. In quel caso il lavoro precedente — prove, quantificazione, strategia — rende l’atto più corto e più forte." },
      { h: "Come decidere", p: "Un colloquio di orientamento serve a questo: uscire con una sequenza, non con un’opinione. Se vuoi un parere sul tuo caso, puoi richiedere una consulenza gratuita allo studio." },
    ],
  },
  {
    slug: "clausole-contratto-commerciale",
    title: "Cinque clausole di un contratto commerciale che vale la pena rileggere",
    date: "2026-08-19",
    category: "Contrattualistica",
    read: "7 min",
    excerpt: "Foro, recesso, penale, rinnovo e responsabilità. Il punto non è il contratto lungo: è il contratto che decide al posto tuo.",
    keywords: "revisione contratto, avvocato contrattualista Milano, consulenza legale impresa",
    content: [
      { h: "Il modello «standard» non è neutro", p: "Ogni modello è stato scritto da qualcuno, di solito da chi lo propone. Firmare «tanto è uguale per tutti» significa accettare il foro, i tempi di recesso e il tetto di responsabilità scelti dall’altra parte." },
      { h: "Foro competente", p: "Una clausola che sposta la causa in un’altra città è un costo, non una formalità. Per un’impresa milanese, discutere a Milano è spesso la prima modifica da chiedere." },
      { h: "Recesso e rinnovo tacito", p: "Molti contratti di servizio si rinnovano da soli se non disdici entro una finestra stretta, a volte di novanta giorni. Va segnata in calendario il giorno della firma, non il giorno in cui vuoi uscire." },
      { h: "Penale e responsabilità", p: "Una penale automatica per ogni giorno di ritardo può valere più del contratto. Un tetto di responsabilità troppo basso, al contrario, lascia te scoperto se il fornitore sbaglia. Le due clausole si leggono insieme." },
      { h: "Come chiedere una modifica senza rompere la trattativa", p: "Si cambia poco, e si spiega perché. Tre note precise valgono più di una riscrittura integrale che l’altra parte non leggerà. Se vuoi una revisione prima di firmare, lo studio lavora con una nota scritta entro pochi giorni." },
    ],
  },
  {
    slug: "separazione-consensuale-documenti",
    title: "Separazione consensuale: i documenti che fanno risparmiare mesi",
    date: "2026-07-28",
    category: "Diritto di famiglia",
    read: "6 min",
    excerpt: "Un accordo regge se i numeri e i tempi dei figli sono già chiari. Ecco cosa preparare prima del primo incontro.",
    keywords: "avvocato separazione Milano, diritto di famiglia, consulenza legale famiglia",
    content: [
      { h: "Consensuale non significa improvvisata", p: "La separazione consensuale è più rapida di quella giudiziale solo se l’accordo è completo. Un testo vago sui figli o sui conti torna in tribunale sotto forma di conflitto, mesi dopo." },
      { h: "Cosa portare", p: "Stato di famiglia, dichiarazioni dei redditi degli ultimi due anni, estratti dei conti cointestati, atto della casa, eventuali scritture su mutui o finanziamenti. Se ci sono figli minorenni, una bozza di calendario settimanale — scuola, sport, vacanze — vale più di una formula generica sull’affidamento condiviso." },
      { h: "La casa e il mantenimento", p: "Sono i due punti che bloccano gli accordi. Vanno trattati con i numeri davanti, non con il principio. Chi resta, per quanto, chi paga il mutuo, cosa succede se la casa si vende: tutto nello stesso documento." },
      { h: "Il tono è parte dell’accordo", p: "Le frasi scritte in un momento di rabbia restano negli atti che i figli, un giorno, potrebbero leggere. Un avvocato familiarista serve anche a togliere dal testo ciò che non serve al giudice e non serve a voi." },
      { h: "Il passo successivo", p: "Se state valutando una separazione consensuale a Milano, un colloquio riservato chiarisce tempi, costi e se ha senso venire insieme o separatamente." },
    ],
  },
  {
    slug: "licenziamento-cosa-fare-subito",
    title: "Ho ricevuto un licenziamento: cosa fare nei primi giorni",
    date: "2026-06-16",
    category: "Diritto del lavoro",
    read: "5 min",
    excerpt: "I termini sono brevi e le mail emotive restano agli atti. Una sequenza semplice per non perdere diritti né lucidità.",
    keywords: "avvocato lavoro Milano, impugnazione licenziamento, consulenza legale lavoro",
    content: [
      { h: "Leggi la lettera, poi fermati", p: "La data di ricezione fa partire i termini per l’impugnazione, in genere sessanta giorni. Non rispondere nel giorno stesso con una mail lunga. Annota come e quando hai ricevuto la comunicazione." },
      { h: "Conserva tutto", p: "Buste paga, contratto, mail sul ruolo, messaggi, eventuali contestazioni disciplinari. Non cancellare la casella aziendale prima di aver salvato ciò che ti riguarda, nel rispetto delle policy." },
      { h: "Valuta la trattativa prima del ricorso", p: "Molti licenziamenti si chiudono con una conciliazione: indennità, tempi, riservatezza, a volte una referenza. Impugnare resta possibile, e spesso è la leva che rende credibile la trattativa. Non sono due strade opposte." },
      { h: "Se sei l’azienda", p: "Una lettera fragile costa più di un accordo ben costruito. Prima di consegnarla, falla leggere. Dopo, muoviti in fretta verso una conciliazione se il rapporto è comunque chiuso." },
      { h: "Un colloquio entro pochi giorni", p: "In questa materia il calendario conta quanto il merito. Puoi prenotare una videocall o un incontro in studio: il primo orientamento è gratuito." },
    ],
  },
]

export const presentation = [
  { t: "Chi sono", d: "Sono Elena Rossi. Da diciotto anni affianco persone e imprese a Milano, soprattutto nel civile e nel commerciale." },
  { t: "Come lavoro", d: "Un solo interlocutore, un preventivo prima dell’incarico, aggiornamenti solo quando spostano una decisione." },
  { t: "Cosa puoi aspettarti", d: "Al primo colloquio esci con un quadro: rischi, strade possibili e un ordine di priorità. La causa, se serve, arriva dopo." },
  { t: "Il passo successivo", d: "Scrivimi o prenota una videocall. Il primo orientamento dura mezz’ora ed è gratuito." },
]

export const searchIndex = [
  { title: "Lo studio", href: "/chi-sono", text: "biografia Elena Rossi formazione filosofia certificazioni" },
  { title: "Contatti e consulenza", href: "/contatti", text: "telefono email indirizzo mappa orari videocall" },
  { title: "Testimonianze", href: "/testimonianze", text: "recensioni google facebook casi" },
  ...services.map((s) => ({ title: s.title, href: `/aree/${s.slug}`, text: `${s.excerpt} ${s.problems.join(" ")}` })),
  ...articles.map((a) => ({ title: a.title, href: `/approfondimenti/${a.slug}`, text: a.excerpt })),
]

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })
}
