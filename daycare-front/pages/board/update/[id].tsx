import API from '@src/API';
import { reviewDetailType, reviewGetType } from '@src/Type/API/review';
import { AxiosResponse } from 'axios';
import type { NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';

const DynamicEditor = dynamic(
  () => import('../../../src/Container/Page/BoardUpdate'),
  { ssr: false }
);

const BoardUpdatePage: NextPage<{
  review: reviewDetailType;
}> = ({ review }) => <DynamicEditor review={review} />;

export async function getServerSideProps(context: NextPageContext) {
  const reviewResponse = (await API.get(
    `/review/${context.query.id}`
  )) as AxiosResponse<reviewGetType['response'], reviewGetType['request']>;

  return {
    props: {
      review: reviewResponse.data.review,
    },
  };
}

export default BoardUpdatePage;
