export type  Evento = {
  id: string;
  duration: number;
  timestamp: number;
  title: string;
  description: string;
  vinculo: string;
  active: boolean;
  speaker: string;
  image: string;
  sala: {
    id: number;
    title: string;
    capacity: number;
  };
};