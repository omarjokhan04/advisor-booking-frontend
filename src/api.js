const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  console.log("❌ VITE_API_URL is missing. Check your .env file.");
}

export default API_BASE;
