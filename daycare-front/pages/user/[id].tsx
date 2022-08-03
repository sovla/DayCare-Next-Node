import API from '@src/API';
import UserUpdate from '@src/Container/Page/UserUpdate';
import { getUserInformationType } from '@src/Type/API/user';
import { AxiosResponse } from 'axios';
import type { NextPage, NextPageContext } from 'next';

const UserUpdatePage: NextPage<{
  user: getUserInformationType['response']['user'];
}> = ({ user }) => <UserUpdate user={user} />;

export async function getServerSideProps(context: NextPageContext) {
  const response = (await API.get(
    `/user/${context.query.id}`
  )) as AxiosResponse<
    getUserInformationType['response'],
    getUserInformationType['request']
  >;
  return { props: { user: response.data.user } };
}

export default UserUpdatePage;
