import { ListProps } from './index';

const ContainerList: React.FC = ({ children }) => (
  <ul className='search-result'>{children}</ul>
);

const List = ({ items, searchTerm, isSearchDone }: ListProps) => {
  if (!items.length && !searchTerm.length) {
    return null;
  }

  if (searchTerm.length <= 3) {
    return (
      <ContainerList>
        <li>Please input more than 3 letters to search</li>
      </ContainerList>
    );
  }

  if (!isSearchDone) {
    return (
      <ContainerList>
        <li>Searching user...</li>
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

export default List;
