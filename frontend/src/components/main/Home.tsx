import Main from './Main';
import Sidebar from './Sidebar';

export default function Home() {
  return (
    <div className="h-full w-full flex">
      <Sidebar />
      <Main />
    </div>
  );
}
