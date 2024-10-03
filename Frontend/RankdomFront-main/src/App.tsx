import './App.css';
import './Register.tsx';
import './Profile.tsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import Sport from './components/Sport';
import Movies from './components/Movies';
import Food from './components/Food';
import Politics from './components/Politics';
import Jobs from './components/Jobs';
import Nature from './components/Nature';
import News from './components/News';
import History from './components/History';
import Register from "./Register.tsx";
import Profile from "./Profile.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Login from "./Login.tsx";


interface Category {
  name: string;
  href: string;
  icon: string;
  component: React.ComponentType;
}
/* Her bruges en : react.Component, vigtigt fordi her bruges en React.FC = () component under hver component.TSX fil :) */
const categories: Category[] = [
  { name: 'Sport', href: '/sport', icon: '🏅', component: Sport },
  { name: 'Movies', href: '/movies', icon: '🎬', component: Movies },
  { name: 'Food', href: '/food', icon: '🍔', component: Food },
  { name: 'Politics', href: '/politics', icon: '🏛️', component: Politics },
  { name: 'Jobs', href: '/jobs', icon: '💼', component: Jobs },
  { name: 'Nature', href: '/nature', icon: '🌿', component: Nature },
  { name: 'News', href: '/news', icon: '📰', component: News },
  { name: 'History', href: '/history', icon: '🏺', component: History },
];

function App() {
  return (
    <Router>
      <div className="app">
        <header className="topbar">
          <div className="container">
            <a href="/"><h1>Rankdom</h1></a>
            <nav>
              <ul>
                <li><Link to="/Profile">Your Profile🐒</Link></li>
                <li><Link to="/LoginPath">LoginPath?</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage/>} />
              {categories.map((category) => (
                <Route
                  key={category.name}
                  path={category.href}
                  element={<category.component />}
                />
              ))}
              <Route
                  path="/Register"
                  element={<Register name={"Register"}  />}
              />
              <Route
                  path="/Login"
                  element={<Login/>}
              />
              <Route
                  path="/Profile"
                  element={<Profile/>}
              />
               {/* Protect the /dashboard route */}
      <Route
        path="/LoginPath"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

            </Routes>


          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 Rankdom.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div>
      <h2>Welcome to Rankdom!</h2>
      <CategoryGrid />
    </div>
  );
}

function CategoryGrid() {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <Link key={category.name} to={category.href} className="category-button">
          <span className="category-icon">{category.icon}</span>
          <span className="category-name">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default App;