import About from './pages/about';
import AppStyles from './styles';
import Home from './pages/home';
import Menu from './components/menu';
import NotFound from './pages/404';
import { Routes, Route } from 'react-router-dom'

const { Wrapper } = AppStyles;

const App = () => (
  <Wrapper>
    <Menu />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Wrapper>
);

export default App;
