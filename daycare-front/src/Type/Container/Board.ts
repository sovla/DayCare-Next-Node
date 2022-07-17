import { category as categoryType } from '../API/category';
import { reviewDetailType } from '../API/review';

export interface BoardWriteProps {
  category: categoryType[];
}

export interface BoardDetailProps {
  review: reviewDetailType;
}
