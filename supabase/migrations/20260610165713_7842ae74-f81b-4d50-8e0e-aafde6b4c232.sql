
CREATE TABLE public.user_groups_mapping (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_login TEXT NOT NULL UNIQUE,
  group_name TEXT NOT NULL CHECK (group_name IN ('General Public', 'Community', 'Students', 'Professionals')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_groups_mapping TO anon, authenticated;
GRANT ALL ON public.user_groups_mapping TO service_role;
ALTER TABLE public.user_groups_mapping ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_all_user_groups" ON public.user_groups_mapping FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE public.rare_species (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scientific_name TEXT NOT NULL UNIQUE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rare_species TO anon, authenticated;
GRANT ALL ON public.rare_species TO service_role;
ALTER TABLE public.rare_species ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_all_rare_species" ON public.rare_species FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE public.taxa_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  iconic_taxon_name TEXT NOT NULL UNIQUE,
  hebrew_label TEXT NOT NULL,
  english_label TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.taxa_categories TO anon, authenticated;
GRANT ALL ON public.taxa_categories TO service_role;
ALTER TABLE public.taxa_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_all_taxa" ON public.taxa_categories FOR ALL USING (true) WITH CHECK (true);

-- Seed taxa
INSERT INTO public.taxa_categories (iconic_taxon_name, hebrew_label, english_label) VALUES
  ('Aves', 'ציפורים', 'Birds'),
  ('Mammalia', 'יונקים', 'Mammals'),
  ('Reptilia', 'זוחלים', 'Reptiles'),
  ('Amphibia', 'דו-חיים', 'Amphibians'),
  ('Insecta', 'חרקים', 'Insects'),
  ('Arachnida', 'עכבישנים', 'Arachnids'),
  ('Plantae', 'צמחים', 'Plants'),
  ('Fungi', 'פטריות', 'Fungi'),
  ('Mollusca', 'רכיכות', 'Molluscs'),
  ('Actinopterygii', 'דגים', 'Fish');
