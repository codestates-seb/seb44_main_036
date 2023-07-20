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
};

export type Projects = Project[];
