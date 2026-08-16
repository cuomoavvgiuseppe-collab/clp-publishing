---
name: clp-publishing-nuovo-volume
description: "Usare questa skill ogni volta che l'utente vuole aggiungere un nuovo volume al catalogo di CLP Publishing (Cuomo Legal Platform — vetrina editoriale collegata ad Amazon KDP). Triggers: 'aggiungi un volume', 'nuovo libro su CLP Publishing', 'inserisci questo libro nel catalogo', qualunque richiesta di pubblicare un manuale/guida/formulario nella sezione editoriale. Copre raccolta dati, recupero link Amazon, gestione copertina, verifica coerenza collana/numerazione, e generazione del prompt per Claude Code."
---

# CLP Publishing — Inserimento di un Nuovo Volume

## 0. Principio architetturale non negoziabile

CLP Publishing è **solo una vetrina**, mai un e-commerce. Non gestisce pagamenti, non gestisce ordini, non ha account cliente. Ogni volume ha una scheda con descrizione dettagliata e due bottoni ("Acquista Cartaceo su Amazon" / "Acquista eBook su Amazon") che portano l'utente su Amazon, dove avviene l'intera transazione. Amazon non offre un'API che permetta al sito di creare un ordine a suo nome — questo non va mai tentato, ipotizzato o implementato in nessuna forma.

## 1. Dati da raccogliere per ogni volume

| Campo | Note |
|---|---|
| `titolo` | |
| `sottotitolo` | |
| `collana` | Vedi §3 — verificare sempre coerenza con i volumi già inseriti |
| `numero_volume` | Posizione nella collana — vedi §3 |
| `anno` | |
| `numero_pagine_circa` | Se non fornito dall'utente, chiederlo o lasciare esplicitamente vuoto — mai stimarlo |
| `prezzo_ebook` | |
| `prezzo_cartaceo` | |
| `disponibile_ebook` / `disponibile_cartaceo` | bool — dipende da quali formati sono realmente pubblicati su Amazon |
| `link_amazon_ebook` | Vedi §2 |
| `link_amazon_cartaceo` | Vedi §2 |
| `stato` | `bozza` finché non è tutto confermato, poi `pubblicato` |
| Descrizione breve | 1-2 frasi per la card del catalogo — se non fornita, sintetizzarla dalla descrizione estesa |
| Descrizione estesa | Testo completo per la scheda di dettaglio — riusare il testo KDP esistente dell'autore, non riscriverlo da zero |
| Copertina | Vedi §4 |

## 2. Come recuperare i link Amazon

1. L'utente accede alla propria **KDP Bookshelf** (kdp.amazon.com → Libreria/Bookshelf) — è un'azione che deve fare l'utente stesso, loggato con le proprie credenziali. Non tentare mai di automatizzare l'accesso a KDP o Amazon: l'accesso automatizzato con credenziali reali è un rischio di sicurezza ed è quasi certamente contro i termini di servizio di Amazon. Verificato inoltre che Amazon blocca l'accesso automatizzato anche alle sole pagine pubbliche dei prodotti (robots.txt) — nessuno scraping, nemmeno di pagine pubbliche.
2. Cartaceo ed eBook sono **due prodotti Amazon distinti**, con due URL diversi (`amazon.it/dp/XXXXXXXXXX`) — servono entrambi separatamente, non uno solo.
3. **Se Amazon Associates non è ancora attivo**: usare il link diretto al prodotto, e segnalare esplicitamente nel prompt a Claude Code che è un link provvisorio, da sostituire quando Associates sarà attivato — così è facile trovarli tutti insieme in futuro.
4. **Se Amazon Associates è attivo**: generare il link tracciato via SiteStripe (barra che compare sulla pagina prodotto quando si è loggati come Associate), non il link diretto.

## 3. Collana e numero_volume — verifica di coerenza obbligatoria

Prima di assegnare `collana` e `numero_volume` a un nuovo volume:

1. Controllare quali volumi sono già stati inseriti nella stessa collana e la loro numerazione, per evitare buchi o numeri duplicati nella sequenza.
2. Se l'utente non specifica esplicitamente il nome della collana, **non assumerlo silenziosamente** — proporre l'ipotesi più coerente (es. stesso formato di titolo, stesso tema) ma segnalarla esplicitamente come assunzione da confermare, sia all'utente sia nel prompt inviato a Claude Code.
3. Se emerge un'incongruenza tra come l'utente descrive la collana in momenti diversi (es. nomi diversi per la stessa collana), segnalarla esplicitamente invece di scegliere una delle due versioni a caso.

## 4. Copertina

- Usare sempre la copertina **già esistente**, quella caricata su Amazon KDP per la pubblicazione — non generarne una nuova (a differenza dei pack del Prompt Pack Store, qui la copertina "ufficiale" del libro esiste già e deve coincidere con quella su Amazon).
- Se la copertina non è ancora stata fornita al momento dell'inserimento, impostare `copertina_url` a vuoto/null e segnalarlo esplicitamente nel prompt — mai lasciare un campo mancante senza dirlo.
- Il file va caricato nel bucket storage pubblico dedicato alle copertine (stesso pattern già in uso per gli altri progetti CLP), poi l'URL risultante collegato al campo `copertina_url`.

## 5. Quando un dato non è certo o è parziale

Non completare mai un dato mancante o incerto con un'invenzione plausibile. Esempi già incontrati:
- Descrizione KDP fornita solo parzialmente (troncata): inserire il testo disponibile, segnalare esplicitamente che è incompleto, aggiornare quando arriva il testo integrale.
- Titolo/sottotitolo ricostruiti per coerenza con lo schema degli altri volumi ma non confermati da una fonte diretta: inserire comunque (è la lettura più ragionevole disponibile) ma marcare chiaramente come non definitivo.

## 6. Formato del prompt per Claude Code

Ogni inserimento (o gruppo di inserimenti) va consegnato a Claude Code come un blocco Markdown con:
1. Titolo del task ("Inserimento volume: [Titolo]")
2. Blocco dati strutturato (tutti i campi di §1, in formato `campo: valore`)
3. Eventuali note di attenzione (assunzioni da verificare, dati mancanti, link provvisori) — sempre in un blocco evidenziato, mai nascoste nel mezzo del testo
4. Descrizione breve e descrizione estesa, in blocchi di testo separati e chiaramente etichettati
5. Istruzioni sulla copertina (allegata, o da recuperare, o assente)
6. Richiesta finale di conferma: il volume compare nel catalogo pubblico, ordinato correttamente nella sua collana

Quando ci sono più volumi da inserire insieme, usare sezioni chiaramente separate per ciascuno nello stesso documento, con una nota comune finale (es. link Amazon provvisori, stato della sequenza collana) se si applica a tutti.

## 7. Checklist finale prima di inviare il prompt

- [ ] Entrambi i link Amazon (cartaceo + eBook) verificati e corretti, non invertiti tra loro
- [ ] Collana e numero_volume coerenti con i volumi già presenti, o assunzione segnalata esplicitamente
- [ ] Descrizione completa o, se parziale, segnalata come tale
- [ ] Copertina allegata, o esplicitamente segnalata come mancante
- [ ] Nessun tentativo di automatizzare l'acquisto, l'accesso a KDP, o lo scraping di pagine Amazon
- [ ] Se link Amazon Associates non ancora attivo, segnalato come provvisorio
