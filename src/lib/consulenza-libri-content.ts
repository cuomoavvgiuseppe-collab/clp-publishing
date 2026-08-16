// REVIEW: consulenza preventiva — non ancora validato da Avv. Cuomo

export interface ConsulenzaLibroContent {
  headline: string
  perchePrima: [string, string]
  esempiDomande: [string, string, string, string]
  ambitoSi: string[]
  ambitoNo: string[]
  disclaimer: string
}

export const CONSULENZA_LIBRI: Record<string, ConsulenzaLibroContent> = {

  'ai-act-gdpr-compliance-toolkit-2026': {
    headline: 'La mia PMI usa strumenti AI per la gestione clienti e preventivi — devo fare qualcosa prima che entri in vigore l\'AI Act, e da dove comincio?',
    perchePrima: [
      'L\'AI Act è in vigore dal 2 agosto 2024 e si applica progressivamente: le prime scadenze operative hanno già riguardato i sistemi AI vietati, e quelle sui sistemi ad alto rischio seguiranno nei prossimi mesi. Le PMI italiane che usano strumenti AI — anche solo un CRM con funzionalità predittive, un chatbot per l\'assistenza clienti, o un software di analisi dei dati — non sempre sono consapevoli di quali obblighi si applicano loro e se il loro caso ricade in una categoria soggetta a requisiti specifici.',
      'Un parere preventivo permette di capire, prima di investire in un progetto di compliance completo, se il vostro uso attuale degli strumenti AI è già in regola, quali sono i rischi concreti legati alla vostra specifica attività, e quali adempimenti prioritari dovete affrontare. Molte PMI scoprono solo in questa fase che i loro sistemi non rientrano nelle categorie ad alto rischio e che gli adempimenti sono meno gravosi del temuto — un\'informazione che vale già il costo della consulenza preventiva.',
    ],
    esempiDomande: [
      'Uso un software gestionale con funzionalità AI per la previsione delle vendite: rientra nell\'AI Act e devo fare qualcosa?',
      'Il mio e-commerce usa un sistema di raccomandazione dei prodotti basato su algoritmi: quali sono i miei obblighi GDPR e AI Act?',
      'Ho un chatbot sul sito che risponde ai clienti usando GPT: devo segnalare all\'utente che parla con un\'AI e in che modo?',
      'Il mio fornitore di software mi ha detto che il suo prodotto è "AI Act compliant" — come verifico che sia vero e che copra anche le mie responsabilità come utilizzatore?',
    ],
    ambitoSi: [
      'Parere scritto sulla classificazione del vostro caso AI Act (uso a basso/alto rischio)',
      'Indicazioni sugli obblighi prioritari per una PMI nella vostra situazione specifica',
      'Chiarimento sul rapporto fra obblighi GDPR preesistenti e nuovi obblighi AI Act',
      'Preventivo scritto prima dell\'inizio della consulenza — nessun impegno prima',
    ],
    ambitoNo: [
      'Redazione del piano di conformità completo o della documentazione tecnica richiesta dall\'AI Act',
      'Analisi dei sistemi AI del fornitore o dei contratti con provider tecnologici',
      'Assistenza in caso di procedimento dell\'Autorità di vigilanza già avviato',
      'Cessione o accesso al volume commerciale completo',
    ],
    disclaimer: 'Questa consulenza riguarda l\'applicazione dell\'AI Act e del GDPR alle attività della vostra organizzazione e non costituisce parere tecnico sui sistemi informatici né un programma di compliance completo. L\'Avv. Giuseppe Cuomo è iscritto all\'Ordine degli Avvocati di Salerno ed è autore del volume AI Act & GDPR Compliance Toolkit 2026.',
  },

  'ai-act-gdpr-sanita-2026': {
    headline: 'La nostra clinica vuole introdurre un software AI per il supporto alla diagnosi radiologica — quali obblighi abbiamo come utilizzatori prima di metterlo in uso sui pazienti?',
    perchePrima: [
      'I dispositivi medici con funzionalità AI e i software di supporto alla diagnosi rientrano fra i sistemi AI ad alto rischio secondo l\'AI Act (Allegato III), con obblighi specifici per chi li utilizza — non solo per chi li produce. Cliniche, studi medici e strutture sanitarie che acquistano o adottano questi strumenti sono soggetti a obblighi di verifica, documentazione e supervisione umana che scattano prima che il sistema venga messo in funzione.',
      'La sovrapposizione fra AI Act, GDPR (dati sanitari come dati particolari ex art. 9) e normativa sui dispositivi medici (MDR) crea un quadro complesso che varia a seconda del tipo di software, della sua classificazione come dispositivo medico, e del ruolo della struttura sanitaria nel ciclo di vita del sistema. Un parere preventivo permette di chiarire in anticipo quale regime si applica al vostro caso specifico, prima di firmare contratti o avviare sperimentazioni che creerebbero obblighi difficili da ritrattare.',
    ],
    esempiDomande: [
      'Stiamo valutando un software AI per la lettura delle TAC: come verifichiamo che soddisfi i requisiti AI Act prima di acquistarlo?',
      'Il nostro ospedale usa un sistema di triage automatizzato in pronto soccorso: è classificato ad alto rischio AI Act e cosa significa per noi?',
      'Vogliamo raccogliere dati dei pazienti per addestrare un modello AI interno: qual è il regime di consenso GDPR applicabile?',
      'Dobbiamo fare una DPIA per l\'introduzione di un sistema AI che gestisce le cartelle cliniche digitali, e chi deve redigerla?',
    ],
    ambitoSi: [
      'Parere scritto sulla classificazione del sistema AI sanitario e gli obblighi per l\'utilizzatore',
      'Indicazioni sul rapporto fra AI Act, GDPR sanitario e normativa MDR nel vostro caso',
      'Chiarimento sugli adempimenti prioritari prima dell\'introduzione di un sistema AI in struttura',
      'Preventivo scritto prima dell\'inizio della consulenza — nessun impegno prima',
    ],
    ambitoNo: [
      'Redazione della documentazione tecnica richiesta dal fabbricante del dispositivo AI',
      'Valutazione tecnica del software o dei suoi algoritmi',
      'Assistenza in caso di procedimento del Garante o dell\'Autorità AI già avviato',
      'Gestione del rapporto contrattuale con il fornitore del software',
      'Cessione o accesso al volume commerciale completo',
    ],
    disclaimer: 'Questa consulenza riguarda gli aspetti giuridici dell\'introduzione di sistemi AI in contesto sanitario e non costituisce parere medico, tecnico sui dispositivi, né valutazione di conformità MDR. L\'Avv. Giuseppe Cuomo è iscritto all\'Ordine degli Avvocati di Salerno ed è autore del volume AI Act & GDPR in Sanità 2026.',
  },

  'ai-act-gdpr-lavoro-2026': {
    headline: 'Stiamo usando un software AI per lo screening dei CV — dobbiamo informare i candidati, e se sì, come e quando?',
    perchePrima: [
      'L\'uso di sistemi AI nei processi di selezione del personale è espressamente menzionato nell\'AI Act fra i sistemi ad alto rischio (Allegato III, punto 4), con obblighi di trasparenza verso i candidati, supervisione umana obbligatoria e limitazioni all\'uso di sistemi completamente automatizzati. Allo stesso tempo, il GDPR impone obblighi di informativa e limiti al processo decisionale automatizzato che si applicano indipendentemente dall\'AI Act. Molte aziende che usano questi strumenti non sono consapevoli di avere già obblighi attivi.',
      'Un parere preventivo permette di capire quali obblighi si applicano al vostro processo HR specifico, prima che un candidato o un dipendente presenti un reclamo al Garante o un ricorso. La fase preventiva è anche quella in cui è più facile adeguare le procedure — modificare l\'informativa, introdurre il passaggio di verifica umana, o rivalutare quale software usare — senza i vincoli di un procedimento già aperto.',
    ],
    esempiDomande: [
      'Usiamo un ATS con funzionalità di ranking automatico dei CV: dobbiamo comunicarlo ai candidati nell\'informativa privacy e in che termini?',
      'Il nostro sistema di valutazione delle performance usa metriche algoritmiche: i dipendenti hanno il diritto di contestarlo e come gestiamo questa richiesta?',
      'Vogliamo introdurre un software di analisi della produttività basato su AI per i lavoratori da remoto: quali limiti pone il GDPR al monitoraggio?',
      'Un candidato ci ha chiesto di sapere se la sua candidatura è stata valutata da un sistema automatizzato: siamo obbligati a rispondergli e cosa dobbiamo dirgli?',
    ],
    ambitoSi: [
      'Parere scritto sugli obblighi AI Act e GDPR applicabili ai vostri processi HR',
      'Indicazioni su informativa, supervisione umana e diritti dei candidati/dipendenti nel vostro caso',
      'Chiarimento su quali sistemi HR rientrano nella categoria ad alto rischio AI Act',
      'Preventivo scritto prima dell\'inizio della consulenza — nessun impegno prima',
    ],
    ambitoNo: [
      'Redazione dell\'informativa privacy o dei documenti HR della vostra azienda',
      'Valutazione tecnica del software di selezione o monitoraggio',
      'Assistenza in un procedimento del Garante o in una controversia lavorativa già in corso',
      'Parere di merito su un singolo rapporto di lavoro o una specifica vertenza',
      'Cessione o accesso al volume commerciale completo',
    ],
    disclaimer: 'Questa consulenza riguarda gli aspetti giuridici dell\'uso di sistemi AI nei processi HR e non costituisce parere su singoli rapporti di lavoro o vertenze. L\'Avv. Giuseppe Cuomo è iscritto all\'Ordine degli Avvocati di Salerno ed è autore del volume AI Act & GDPR nel Lavoro 2026.',
  },

  'ai-act-gdpr-nelle-scuole-2026': {
    headline: 'La nostra scuola vuole adottare una piattaforma EdTech con funzionalità AI per il monitoraggio dell\'apprendimento degli studenti — abbiamo bisogno di un DPO e quali consensi dobbiamo raccogliere?',
    perchePrima: [
      'Le scuole che adottano piattaforme digitali con funzionalità di analisi comportamentale, monitoraggio dell\'attenzione o valutazione algoritmica degli studenti trattano dati di minori — una categoria che riceve protezione rafforzata sia dal GDPR (art. 8 e considerando 38) sia dall\'AI Act, che classifica i sistemi AI per la valutazione degli studenti fra quelli ad alto rischio. La combinazione dei due regimi crea obblighi specifici che molte istituzioni scolastiche non hanno ancora censito.',
      'Le scuole si trovano spesso in una posizione particolare: sono titolari del trattamento ma usano piattaforme fornite da terzi, il che crea responsabilità divise che devono essere regolate contrattualmente prima dell\'adozione dello strumento. Un parere preventivo permette di capire cosa deve essere verificato prima di firmare il contratto con il fornitore EdTech, quali consensi sono necessari e quali no, e se la vostra struttura ha bisogno di un DPO obbligatorio.',
    ],
    esempiDomande: [
      'Vogliamo usare un\'app di apprendimento adattivo per la matematica: è classificata ad alto rischio AI Act e cosa significa per la scuola come istituzione che la adotta?',
      'Il MIUR usa già piattaforme come Classroom di Google — dobbiamo fare una DPIA aggiuntiva per ogni nuova piattaforma EdTech che adottiamo?',
      'Come regoliamo il trattamento dei dati degli studenti minorenni quando la piattaforma EdTech ha sede fuori dall\'UE?',
      'La nostra scuola vuole usare un sistema AI per il rilevamento automatico delle assenze basato sul riconoscimento facciale — è legale?',
    ],
    ambitoSi: [
      'Parere scritto sugli obblighi GDPR e AI Act per la vostra istituzione scolastica',
      'Indicazioni su cosa verificare prima di adottare una piattaforma EdTech con funzionalità AI',
      'Chiarimento su DPO, DPIA e trattamento dati minori nel contesto scolastico',
      'Preventivo scritto prima dell\'inizio della consulenza — nessun impegno prima',
    ],
    ambitoNo: [
      'Redazione della DPIA, dell\'informativa o dei contratti con i fornitori EdTech',
      'Valutazione tecnica delle piattaforme o dei loro sistemi AI',
      'Assistenza in un procedimento del Garante già avviato',
      'Parere sulla normativa scolastica o sui regolamenti ministeriali',
      'Cessione o accesso al volume commerciale completo',
    ],
    disclaimer: 'Questa consulenza riguarda gli aspetti giuridici dell\'adozione di sistemi AI in contesto scolastico e non costituisce parere su normativa scolastica ministeriale o valutazione tecnica delle piattaforme. L\'Avv. Giuseppe Cuomo è iscritto all\'Ordine degli Avvocati di Salerno ed è autore del volume AI Act & GDPR nelle Scuole 2026.',
  },

  'formulario-ai-act-gdpr-2026': {
    headline: 'Il Garante ha avviato un\'ispezione sulla nostra azienda per il trattamento dati legato all\'uso di strumenti AI — da dove cominciamo per capire cosa preparare?',
    perchePrima: [
      'Un\'ispezione del Garante Privacy o un reclamo di un interessato è uno dei momenti in cui avere la documentazione AI/GDPR in ordine fa la differenza fra un procedimento che si chiude rapidamente e uno che si protrae per anni. La documentazione non è solo un adempimento formale — è la prova che l\'organizzazione ha esercitato la supervisione richiesta dalla normativa e che eventuali violazioni non sono il risultato di comportamenti sistematici.',
      'Anche al di fuori di un procedimento attivo, molte organizzazioni non sanno da dove cominciare per costruire un set documentale coerente con i requisiti AI Act e GDPR: registro dei trattamenti, DPIA, informative, accordi con responsabili del trattamento, politiche di supervisione umana. Un parere preventivo permette di capire quali documenti sono obbligatori nel vostro caso specifico e in quale ordine è più urgente produrli — senza partire da zero né acquistare sistemi costosi prima di aver capito cosa vi serve davvero.',
    ],
    esempiDomande: [
      'Abbiamo ricevuto una richiesta di accesso agli atti del Garante sui nostri sistemi AI: quali documenti dobbiamo avere pronti e quali siamo obbligati a fornire?',
      'Il nostro registro dei trattamenti non copre ancora i sistemi AI introdotti negli ultimi due anni: come integriamo rapidamente senza sbagliare la classificazione del rischio?',
      'Dobbiamo stipulare accordi di responsabile del trattamento con tutti i nostri fornitori di software AI o solo con alcuni?',
      'Abbiamo un dipendente che ha presentato un reclamo al Garante per una decisione automatizzata che lo riguarda: quali sono le tempistiche e come ci dobbiamo comportare in questa fase?',
    ],
    ambitoSi: [
      'Parere scritto su quali documenti AI Act/GDPR sono obbligatori nel vostro caso',
      'Indicazioni sulle priorità documentali e sull\'ordine in cui intervenire',
      'Chiarimento su cosa fare nelle prime fasi di un procedimento del Garante o di un reclamo',
      'Preventivo scritto prima dell\'inizio della consulenza — nessun impegno prima',
    ],
    ambitoNo: [
      'Redazione dei documenti di compliance (DPIA, registro, informative, accordi DPA)',
      'Gestione attiva del procedimento del Garante o del contenzioso',
      'Valutazione tecnica dei sistemi AI o dei loro algoritmi',
      'Parere su settori specifici (sanità, scuola, HR) senza riferimento al vostro caso concreto',
      'Cessione o accesso al volume commerciale completo',
    ],
    disclaimer: 'Questa consulenza riguarda la strategia documentale AI Act/GDPR e non costituisce assistenza in un procedimento del Garante già avviato, per il quale è richiesto un incarico professionale dedicato. L\'Avv. Giuseppe Cuomo è iscritto all\'Ordine degli Avvocati di Salerno ed è autore del Formulario AI Act & GDPR 2026.',
  },

}
