// fonction utilitaire pour comparer deux profils
export const isProfileEqual = (a, b) => {
    if (!a || !b) return false;

    const keys = Object.keys(a);
    for (const key of keys) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
};