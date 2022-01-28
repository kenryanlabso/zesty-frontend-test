import { HOME_PAGE_CONTENT_API } from '../../utils/endpoints';
import HomeStyles from './styles';
import Loader from '../../components/loader';
import { useEffect, useState } from 'react';

const { Container, Heading, Item, Content } = HomeStyles;

const Home = () => {
  // State variables
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageContents, setPageContents] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // Fetch the JSON API
    fetch(HOME_PAGE_CONTENT_API).then(response => response.json())
      .then(results => {
        // Check if the API returned page content
        if (results && Array.isArray(results) && results.length > 0) {
          const contents = results.map(({ text_content, title }) => ({
            text_content,
            title,
          }));
          setPageContents(contents);
          setError('');
        } else {
          // Show an warning if the API didn't return content for the page
          setPageContents([]);
          setError('No data found.');
        }
        setIsLoading(false);
      }).catch(() => {
        // Show error message if fetching of data failed
        setPageContents([]);
        setError('Unable to fetch data. Refresh the browser to try again.');
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      {isLoading && <Loader />}
      {error && <Heading>{error}</Heading>}
      {pageContents.map(({ text_content, title }, i) => (
        <Item key={`home-content-${i}`}>
          <Heading>{title}</Heading>
          <Content
            dangerouslySetInnerHTML={{
              __html: text_content,
            }}
          />
        </Item>
      ))}
    </Container>
  );
};

export default Home;
