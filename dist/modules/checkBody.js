function checkBody(body, // Utilise `Record` pour représenter un objet clé-valeur
keys) {
    let isValid = true;
    const regex = /^\s*$/; // Pour détecter les chaînes vides ou contenant uniquement des espaces
    for (const field of keys) {
        if (typeof body[field] === "string") {
            body[field] = body[field].replace(/\s+/g, " ").trim(); // Nettoie les espaces superflus
        }
        // Vérifie les champs manquants ou vides
        if (body[field] === undefined || // Champ non défini
            body[field] === null || // Champ nul
            (typeof body[field] === "string" && regex.test(body[field])) // Champ vide
        ) {
            isValid = false;
        }
        // Vérifie les nombres invalides (mais accepte 0)
        if (typeof body[field] === "number" && isNaN(body[field])) {
            isValid = false;
        }
    }
    return isValid;
}
export default checkBody;
