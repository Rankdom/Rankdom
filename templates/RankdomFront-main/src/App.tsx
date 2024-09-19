import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

interface CategoryPageProps {
  name: string;
}

const categories = [
  { name: 'Sport', href: '/sport', icon: '🏅' },
  { name: 'Movies', href: '/movies', icon: '🎬' },
  { name: 'Food', href: '/food', icon: '🍔' },
  { name: 'Politics', href: '/politics', icon: '🏛️' },
  { name: 'Jobs', href: '/jobs', icon: '💼' },
  { name: 'Nature', href: '/nature', icon: '🌿' },
  { name: 'News', href: '/news', icon: '📰' },
  { name: 'History', href: '/history', icon: '🏺' },
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
                    <li><a href="/routeGoogle">Login holder 🥜</a></li>
                    <li><a href="/Support">Support?</a></li>
                  </ul>
                </nav>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {categories.map((category) => (
                <Route
                  key={category.name}
                  path={category.href}
                  element={<CategoryPage name={category.name} />}
                />
              ))}
            </Routes>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 Rankdom. Vi har ikke nogen rettigheder xD.</p>
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

function CategoryPage({ name }: CategoryPageProps) {
  return (
    <div>
      <h2>{name} Page</h2>
      <p>This is the {name} page content.</p>
    </div>
  );
}

export default App;