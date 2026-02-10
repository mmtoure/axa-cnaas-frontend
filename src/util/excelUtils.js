export const cleanRow = (row)=>({
    firstName: row["prenom"]?.trim(),
    lastName: row["nom"]?.trim(),
    dateOfBirth: row["date_naissance"]?.toString()?.trim(),
    phoneNumber: row["telephone"]?.toString().trim(),
   

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
 
    if (isNaN(new Date(row.dateOfBirth))) {
      errors.push("Date de nais. Ass invalide");
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
  return null;
};
