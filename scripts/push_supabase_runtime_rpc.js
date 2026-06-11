const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const RPC_PATH = path.join(ROOT, "database", "supabase", "runtime_rpc.sql");
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF;
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const API_BASE = "https://api.supabase.com/v1";

if (!PROJECT_REF) {
  console.error("Missing SUPABASE_PROJECT_REF");
  process.exit(1);
}

if (!ACCESS_TOKEN) {
  console.error("Missing SUPABASE_ACCESS_TOKEN");
  process.exit(1);
}

async function main() {
  const query = fs.readFileSync(RPC_PATH, "utf8");
  const response = await fetch(`${API_BASE}/projects/${PROJECT_REF}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, read_only: false })
  });
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (_) {
    data = text;
  }
  if (!response.ok) {
    console.error("Runtime RPC upload failed.");
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }
  console.log("Supabase runtime RPC upload complete.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});

