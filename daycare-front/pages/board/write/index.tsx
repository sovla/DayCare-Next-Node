import API from '@src/API';
import {
  category as categoryType,
  categoryListType,
} from '@src/Type/API/category';
import { AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

// import '@toast-ui/editor/dist/toastui-editor.css';
const DynamicEditor = dynamic(() => import('@src/Container/Page/BoardWrite'), {
  ssr: false,
});
const WritePage: NextPage<{
  category: categoryType[];
}> = ({ category }) => <DynamicEditor category={category} />;

export async function getServerSideProps() {
  // Fetch data from external API

  const response = (await API.get('/category')) as AxiosResponse<
    categoryListType['response'],
    categoryListType['request']
  >;

  // Pass data to the page via props
  return { props: { category: response.data.category } };
}

export default WritePage;
