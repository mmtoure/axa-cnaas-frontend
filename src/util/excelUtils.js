export const cleanRow = (row)=>({
    firstName: row["prenom"]?.trim(),
    lastName: row["nom"]?.trim(),
    dateOfBirth: row["date_naissance"],
    phoneNumber: row["telephone"]?.toString().trim(),
    beneficiary:{
        firstName: row["prenom_beneficiaire"]?.trim(),
        lastName: row["nom_beneficiaire"]?.trim(),
        dateOfBirth: row.date_naissance_beneficiaire,
        phoneNumber:  row["telephone_beneficiaire"]?.toString().trim(),
    }

});

export const validateRow1 =(row, index)=>{
    const errors =[];
    console.log(row.prenom);
    if (!row) {
        errors.push(`Ligne ${index + 2} : ligne vide`);
    }
    
    if (row.firstName===undefined ) errors.push("Prénom Ass manquant");
    if (row.lastName ===undefined) errors.push("Nom Ass manquant");
    if (!row.dateOfBirth) errors.push("Date naiss. Ass manquante");
    if (!row.phoneNumber) errors.push("Téléphone Ass manquant");
    if (row.beneficiary.firstName ===undefined) errors.push("Prénom Bén manquant");
    if (!row.beneficiary.lastName) errors.push("Nom Bén manquant");
    if (!row.beneficiary.dateOfBirth) errors.push("Date de nais. Ass Bén manquante");
    if (!row.beneficiary.phoneNumber) errors.push("Téléphone Bén manquant");
    if (!/^7[05678]\d{7}$/.test(row.telephone)) {
        errors.push("Téléphone Bén invalide");
    }

    if (isNaN(new Date(row.date_naissance))) {
        errors.push("Date de nais. Bén invalide");
    }
    
    return errors.length
    ? { line: index + 2, errors }
    : null;
};

export const validateRow = (row, index) => {
  if (!row) {
    return `Ligne ${index + 2} : ligne vide ou invalide`;
  }

  if (!row.firstName) {
    return `Ligne ${index + 2} : Prénom Ass manquant`;
  }

  if (!row.lastName) {
    return `Ligne ${index + 2} : Nom Ass manquant`;
  }

  if (!row.phoneNumber) {
    return `Ligne ${index + 2} : Téléphone Ass manquant`;
  }

  if (!row.dateOfBirth) {
    return `Ligne ${index + 2} : Date nais. Ass manquante`;
  }

    if (!row.beneficiary.firstName) {
    return `Ligne ${index + 2} : Prénom Bén manquant`;
  }

  if (!row.beneficiary.lastName) {
    return `Ligne ${index + 2} : Nom Bén manquant`;
  }

  if (!row.beneficiary.phoneNumber) {
    return `Ligne ${index + 2} : Téléphone Bén manquant`;
  }
    if (!row.beneficiary.dateOfBirth) {
    return `Ligne ${index + 2} : Date nais. Bén manquant`;
  }

  return null;
};
