import { ABOUT_PAGE_CONTENT_API } from '../../utils/endpoints';
import AboutStyles from './styles';
import Loader from '../../components/loader';
import { useEffect, useState } from 'react';

const { Container, Content, Heading } = AboutStyles;

const About = () => {
  // State variables
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    setIsLoading(true);
    // Fetch the JSON API
    fetch(ABOUT_PAGE_CONTENT_API).then(response => response.json())
      .then(({ data }) => {
        const hasPageContent = data && Array.isArray(data) && data.length > 0;
        // Check if the API returned page content
        if (hasPageContent) {
          // Save the page content to state
          setPageContent(data[0].content.page_content);
          setError('');
        } else {
          // Show an warning if the API didn't return content for the page
          setPageContent('');
          setError('No data found.');
        }
        setIsLoading(false);
      }).catch(() => {
        // Show error message if fetching of data failed
        setPageContent('');
        setError('Unable to fetch data. Refresh the browser to try again.');
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      {isLoading && <Loader />}
      {error && <Heading>{error}</Heading>}
      {pageContent && (
        <Content
          dangerouslySetInnerHTML={{
            __html: pageContent,
          }}
        />
      )}
    </Container>
  );
};

export default About;
