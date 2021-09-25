import './style.css';
import SearchField from '../SearchField';
import githubIconSrc from '../../images/github.png';

const GithubSearchField = () => {
  const icon = {
    src: githubIconSrc,
    alt: 'Github',
  };

  return (
    <SearchField
      placeholder='Search github users'
      icon={icon}
      apiUrl='https://api.github.com/search/users'
    />
  );
};

function App() {
  return (
    <div className='app'>
      <header className='app-header'>
        <h1>welcome</h1>
      </header>
      <main>
        <GithubSearchField />
      </main>
    </div>
  );
}

export default App;
