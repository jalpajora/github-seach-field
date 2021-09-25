import './style.css';
import { useSearchField } from '../../hooks';
import Input from './Input';
import List from './List';

interface GithubAccount {
  avatar_url: string;
  html_url: string;
  login: string;
  id: number;
}

export interface InputProps {
  placeholder?: string;
  icon: {
    src: string;
    alt: string;
  };
  searchTerm: string;
  totalCount: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ListProps {
  items: GithubAccount[];
  searchTerm: string;
  isSearchDone: boolean;
}

interface Props {
  placeholder?: string;
  apiUrl?: string;
  icon: {
    src: string;
    alt: string;
  };
}

const SearchField = ({ placeholder = 'Search users', icon, apiUrl }: Props) => {
  const [
    { items = [], total_count = 0 },
    isSearchDone,
    searchTerm,
    handleChange,
  ] = useSearchField(apiUrl);

  return (
    <section className='search-field'>
      <Input
        icon={icon}
        placeholder={placeholder}
        searchTerm={searchTerm}
        handleChange={handleChange}
        totalCount={total_count}
      />
      <List items={items} isSearchDone={isSearchDone} searchTerm={searchTerm} />
    </section>
  );
};

export default SearchField;
