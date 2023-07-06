//--------------------------------------------------------------------------
// Validate for empty
const isEmpty = data => 
  data === undefined || 
  data === null ||
  (typeof data === 'string' && data === '') ||
  (Array.isArray(data) && data.length === 0) || 
  (typeof data === 'object' && Object.keys(data).length === 0);

//--------------------------------------------------------------------------
// Get the today's date
export const today = () => {
  const currentDate = new Date();
  const dd = String(currentDate.getDate()).padStart(2, '0');
  const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
  const yyyy = currentDate.getFullYear();

  return yyyy + '/' +  mm + '/' + dd;
}

//--------------------------------------------------------------------------
// Validate the form
export const validateCheck = (data) => {
  const { title, content } = data;
  const error = {};
  if (isEmpty(title)) error.title = 'Todo title is required.';
  if (isEmpty(content)) error.content = 'Todo content is required.';
  else if (content.length < 10) error.content = 'Todo content should be longer than 10.';

  return {
    isValid: isEmpty(error),
    error
  };
}

//--------------------------------------------------------------------------