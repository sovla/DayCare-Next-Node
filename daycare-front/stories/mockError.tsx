import useError from '@src/CustomHook/useError';

const MockError = () => {
  const { ErrorModal } = useError();
  return <ErrorModal />;
};

export default MockError;
