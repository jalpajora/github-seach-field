import { useSearchField } from '../../hooks';
import './style.css';

interface Props {
  placeholder?: string;
  icon: {
    src: string;
    alt: string;
  };
  apiUrl: string;
}

const SearchField = ({ placeholder = 'Search users', icon, apiUrl }: Props) => {
  const [{ items, total_count = 0 }, value, handleChange] = useSearchField(
    '',
    apiUrl
  );

  const List = () => {
    if (!items) {
      return null;
    }

    const ContainerList: React.FC = ({ children }) => (
      <ul className='search-result'>{children}</ul>
    );

    if (total_count === 0) {
      return (
        <ContainerList>
          <li>No results found.</li>
        </ContainerList>
      );
    }

    return (
      <ContainerList>
        {items.map(({ avatar_url, html_url, login, id }, i) => (
          <li key={`userlist-${id}`}>
            <a href={html_url}>
              <img
                src={avatar_url}
                width='34px'
                height='34px'
                alt={`Github user ${login}`}
              />
              {login}
            </a>
          </li>
        ))}
      </ContainerList>
    );
  };

  return (
    <section className='search-field'>
      <div className='input-field'>
        <img src={icon.src} width='20px' height='20px' alt={icon.alt} />
        <input
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {total_count > 0 && (
          <small className='search-count'>{`${total_count} found`}</small>
        )}
      </div>
      <List />
    </section>
  );
};

export default SearchField;
