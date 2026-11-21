// Apenas criado para ter um arquivo de autenticação, 
// quando tiver o backend pronto, tem que mudar para pegar do token.

const TOKEN_KEY = '@GitCine:token';

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
    