export type Project = {
  content: string;
  currentAmount: number;
  expiredDate: string;
  imageUrl: string;
  memberId: number;
  price: number;
  projectId: number;
  summary: string;
  targetAmount: number;
  title: string;
  categoryId: number;
  createdAt: string;
  likeCount: number;
  likedProject: number;
  location: string | null;
  view: number;
  tags: string[];
};

export type Projects = Project[];
