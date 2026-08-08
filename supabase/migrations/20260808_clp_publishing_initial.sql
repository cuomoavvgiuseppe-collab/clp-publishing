-- CLP Publishing: tabella principale volumi (prefisso pub_ per coesistenza con PromptPack e CAP)
CREATE TABLE pub_publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  titolo text NOT NULL,
  sottotitolo text,
  collana text NOT NULL CHECK (collana IN ('Previdenza Sociale', 'Diritto delle Nuove Tecnologie')),
  anno integer NOT NULL,
  numero_pagine_circa integer,
  descrizione text,
  descrizione_estesa text,
  copertina_url text,
  link_amazon_cartaceo text,
  link_amazon_ebook text,
  disponibile_cartaceo boolean NOT NULL DEFAULT true,
  disponibile_ebook boolean NOT NULL DEFAULT true,
  stato text NOT NULL DEFAULT 'bozza' CHECK (stato IN ('bozza', 'pubblicato')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION pub_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pub_publications_updated_at
  BEFORE UPDATE ON pub_publications
  FOR EACH ROW EXECUTE FUNCTION pub_set_updated_at();

ALTER TABLE pub_publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pub_public_read_published" ON pub_publications
  FOR SELECT USING (stato = 'pubblicato');

-- Storage bucket pub-covers (public)
INSERT INTO storage.buckets (id, name, public) VALUES ('pub-covers', 'pub-covers', true)
ON CONFLICT (id) DO NOTHING;
