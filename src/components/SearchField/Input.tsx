import { InputProps } from './index';

const Input = ({
  placeholder,
  icon,
  searchTerm,
  totalCount,
  handleChange,
}: InputProps) => {
  return (
    <div className='input-field'>
      <img src={icon.src} width='20px' height='20px' alt={icon.alt} />
      <input
        type='text'
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm.length > 0 && (
        <small
          className='search-count'
          data-testid='search-count'
        >{`${totalCount} found`}</small>
      )}
    </div>
  );
};

export default Input;
