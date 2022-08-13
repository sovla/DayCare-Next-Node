import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

// import '@toast-ui/editor/dist/toastui-editor.css';
const DynamicEditor = dynamic(
  () => import('@src/Container/Page/BoardCenterWrite'),
  { ssr: false }
);
const WritePage: NextPage = () => <DynamicEditor />;

export default WritePage;
