export type Collana = 'Previdenza Sociale' | 'Diritto delle Nuove Tecnologie' | 'CLP Compliance Toolkit' | 'Diritto di Famiglia' | 'Cuomo Legal Platform — Collana Diritto di Famiglia' | 'Diritto del Lavoro e della Previdenza Sociale';
export type Stato = 'bozza' | 'pubblicato';

export interface Publication {
  id: string;
  slug: string;
  titolo: string;
  sottotitolo: string | null;
  collana: Collana;
  anno: number;
  numero_pagine_circa: number | null;
  descrizione: string | null;
  descrizione_estesa: string | null;
  copertina_url: string | null;
  link_amazon_cartaceo: string | null;
  link_amazon_ebook: string | null;
  disponibile_cartaceo: boolean;
  disponibile_ebook: boolean;
  numero_volume: number | null;
  prezzo_cartaceo: number | null;
  prezzo_ebook: number | null;
  stato: Stato;
  created_at: string;
  updated_at: string;
}

export interface Stats {
  volumi_pubblicati: number;
  collane_attive: number;
}
