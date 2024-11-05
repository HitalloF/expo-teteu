export type User = {
    email: string;
    name: string;
    family_name: string;
    password: string; // Nota: Nunca armazene senhas em texto simples em um aplicativo real
    vinculo: string;
    genero: string;
    cpf: string;
  };