import API from '@src/API';
import Board from '@src/Container/Page/Board';
import {
  category as categoryType,
  categoryListType,
} from '@src/Type/API/category';
import { AxiosResponse } from 'axios';
import type { NextPage } from 'next';

const BoardPage: NextPage<{
  category: categoryType[];
}> = ({ category }) => <Board category={category} />;

export async function getServerSideProps() {
  // Fetch data from external API
  const response = (await API.get('/category')) as AxiosResponse<
    categoryListType['response'],
    categoryListType['request']
  >;

  // Pass data to the page via props
  return { props: { category: response.data.category } };
}

export default BoardPage;
