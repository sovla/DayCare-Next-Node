import API from '@src/API';
import { reviewDetailType, reviewGetType } from '@src/Type/API/review';
import { AxiosResponse } from 'axios';
import type { NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';

const DynamicEditor = dynamic(
  () => import('../../src/Container/Page/BoardDetail'),
  { ssr: false }
);

const BoardDetailPage: NextPage<{
  review: reviewDetailType;
}> = ({ review }) => <DynamicEditor review={review} />;

export async function getServerSideProps(context: NextPageContext) {
  const response = (await API.get(
    `/review/review_id=${context.query.id}`
  )) as AxiosResponse<reviewGetType['response'], reviewGetType['request']>;

  return { props: { review: response.data.review } };
}

export default BoardDetailPage;
