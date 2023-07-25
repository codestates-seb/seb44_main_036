import { ProjectList, ProjectHeader } from '@/components/project';
import { CategoryList } from '@/components/category';
import { Carousel } from '@/components/carousel';
import ScrollUpButton from '@/components/ui/ScrollUpButton';

function MainPage() {
  return (
    <>
      <Carousel />
      <CategoryList />
      <ProjectHeader />
      <ProjectList />
      <ScrollUpButton />
    </>
  );
}

export default MainPage;
