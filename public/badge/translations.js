export const translations = {
  en: {
    verifiedStore: "Verified Official Store by",
    checkStore: "Review Store"
  },
  es: {
    verifiedStore: "Tienda Oficial Verificada por",
    checkStore: "Revisar Tienda"
  },
  fr: {
    verifiedStore: "Boutique Officielle Vérifiée par",
    checkStore: "Examiner la Boutique"
  },
  de: {
    verifiedStore: "Verifizierter Offizieller Shop von",
    checkStore: "Shop Überprüfen"
  }
};

export async function detectLanguage() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const countryCode = data.country_code;
    
    const COUNTRY_TO_LANGUAGE = {
      US: "en", GB: "en",
      ES: "es", MX: "es", AR: "es",
      FR: "fr",
      DE: "de", AT: "de", CH: "de"
    };
    
    return COUNTRY_TO_LANGUAGE[countryCode] || "en";
  } catch (error) {
    console.error('Error detecting language:', error);
    return "en";
  }
}