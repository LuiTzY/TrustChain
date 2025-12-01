export const decodeJwtPayload = async (token: string) =>  {
  if (!token) {
    return null;
  }
  try {
    // El JWT tiene el formato: header.payload.signature
    // Separamos el token por el punto (.) y tomamos la segunda parte (el payload)
    const base64Url = token.split('.')[1];
    
    // Convertimos de Base64Url a Base64 estándar, reemplazando caracteres
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Decodificamos la cadena Base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const payload = JSON.stringify(jsonPayload)
    console.log("Este es el payload del token decodigcado", payload)
    // Parseamos la cadena JSON para obtener el objeto payload
    return payload;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return { error: 'Token inválido o malformado.' };
  }
};

