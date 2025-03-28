import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Home from './components/main/Home';
import { BrowserRouter, Route, Routes } from 'react-router';
import ProtectedRoute from './components/protected/ProtectedRoute';
import Layout from './components/main/Layout';
import GetShareLink from './components/GetShareLink';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>
        <Route path="/content/:shareLink" element={<GetShareLink />}></Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
