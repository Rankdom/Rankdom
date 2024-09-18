import './App.css';

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
    <div className="app">
      <header className="topbar">
        <div className="container">
          <h1>Rankdom</h1>
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
          <h2>Categories</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <a key={category.name} href={category.href} className="category-button">
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Rankdom. Vi har ikke nogen rettigheder xD.</p>
          <nav>
            <ul>

            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;