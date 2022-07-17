import API from '@src/API';
import BoardDetail from '@src/Container/Page/BoardDetail';
import { reviewDetailType, reviewGetType } from '@src/Type/API/review';
import { AxiosResponse } from 'axios';
import type { NextPage, NextPageContext } from 'next';

const BoardDetailPage: NextPage<{
  review: reviewDetailType;
}> = ({ review }) => <BoardDetail review={review} />;

export async function getServerSideProps(context: NextPageContext) {
  const response = (await API.get(
    `/review/review_id=${context.query.id}`
  )) as AxiosResponse<reviewGetType['response'], reviewGetType['request']>;

  return { props: { review: response.data.review } };
}

export default BoardDetailPage;
