import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const url = String(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/$/, "");
const anonKey = String(process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
const organizationSlug = String(process.env.SUPABASE_ORGANIZATION_SLUG || "suprimentos-oliveira").trim();

if (!url || !anonKey) {
  throw new Error("SUPABASE_URL e SUPABASE_ANON_KEY precisam estar configuradas na Vercel antes do build.");
}

const config = {
  url,
  anonKey,
  organizationSlug
};

writeFileSync(
  resolve(process.cwd(), "dist", "supabase-config.js"),
  `/* Gerado no build da Vercel. A chave anon é pública e protegida por RLS. */\nwindow.FIELD_OPS_SUPABASE_CONFIG = ${JSON.stringify(config)};\n`,
  "utf8"
);

console.log("Configuração pública do Supabase gerada para o build.");
