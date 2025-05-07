export interface Case {
  id: string;
  title: string;
  image: string;
  category: string;
  client: string;
  description: string;
  role: string;
  year: number;
  technologies: string[];
  detailImages: string[];
  created_at: string;
  isLiked?: boolean; // Adicionado campo para indicar se foi curtido
  likesCount?: number; // Renomeado e adicionado campo para contagem de curtidas
  video?: string; // Adicionado campo opcional para vídeo
}
