export const INVESTOR = "INVESTOR";
export const CONSULTANT = "CONSULTANT";
export const ENTREPRISE = "ENTREPRISE";
export const TYPE_USERS = [INVESTOR, CONSULTANT, ENTREPRISE]

//error messages
export const MISSING_REQUIRED_FIELDS = "MISSING_REQUIRED_FIELDS"


//ML messages
export const EMAIL_EXISTING_ML_MESSAGE = {
    en: "This email or phone has been used",
    fr: "Cet e-mail ou telephone a été utilisé",
    ar: "تم استخدام هذا الرقم او البريد الإلكتروني",
};

export const EMAIL_NOT_EXISTING_ML_MESSAGE = {
    en: "This email not exist",
    fr: "Cet e-mail n'existe pas",
    ar: "هذا البريد الإلكتروني غير موجود",
};

export const UNAUTHORIZED_ACCEESS_ML_MESSAGE = {
    en: "Unauthorized access",
    fr: "accès non autorisé",
    ar: "دخول غير مسموح",
};
