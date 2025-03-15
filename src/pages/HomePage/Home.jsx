import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Home() {

  const styles = {
    content: {
      flex: 1,
      justifyContent: 'center',
      width: 'auto',
      height: 'auto',
      margin: '120px 40px 30px 40px',    
    },
    topArticle: {
      display: 'flex',
      maxWidth: '800px',
      margin: 'auto',
      marginBottom: '20px',
    },
    topArticleImage: {
      width: '300px',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '20px',
      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
      marginRight: '30px',
    },
    topArticleContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    topArticleDetails: {
      fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: '#b12e34',
      marginBottom: '10px',
    },
    topArticleAuthor: {
      fontWeight: 'bold',
    },
    topArticleDate: {
      color: '#000000',
      opacity: 0.3,
    },
    topArticleTitle: {
      fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
      fontSize: '24px',
      color: '#000000',
      margin: 0,
    },
    topArticleText: {
      fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
      fontSize: '12px',
      color: '#000000',
      opacity: 0.3,
      lineHeight: 1.5,
    },
    latestArticlesHeading: {
      fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
      fontSize: '24px',
      color: '#000000',
      margin: '20px 0',
    },
    latestArticlesContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)', 
      gap: '50px',
    },
    latestArticle: {
      display: 'flex',
      alignItems: 'stretch',
    },
    latestArticleImage: {
      width: '300px',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '20px',
      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
      marginRight: '30px',
    },
    latestArticleContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    latestArticleDetails: {
      fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '11px',
      color: '#b12e34',
      marginBottom: '10px',
    },
    latestArticleAuthor: {
      fontWeight: 'bold',
    },
    latestArticleDate: {
      color: '#000000',
      opacity: 0.3,
    },
    latestArticleTitle: {
      fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
      fontSize: '18px',
      color: '#000000',
      margin: 0,
    },
    latestArticleText: {
      fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
      fontSize: '11px',
      color: '#000000',
      opacity: 0.3,
      lineHeight: 1.5,
      flexGrow: 1,
    },
    latestArticleReadMore: {
      padding: '9px 13px',
      borderRadius: '10px',
      fontSize: '10px',
    },
    readMoreHover: {
      backgroundColor: 'rgba(177, 46, 52, 0.7)',  
    },    
    videoSection: {
      maxWidth: '800px',
      margin: '60px auto',
      textAlign: 'center',
      marginBottom: '40px',
    },
    videoTitle: {
      fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
      fontSize: '24px',
      color: '#000000',
      marginBottom: '3px',
    },
    videoDescription: {
      fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
      fontSize: '14px',
      color: '#000000',
      opacity: 0.7,
      lineHeight: 1.6,
      marginBottom: '30px',
      textAlign: 'center',
    },
    videoContainer: {
      position: 'relative',
      width: '100%',
      paddingTop: '56.25%', // 16:9 Aspect Ratio
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
      marginTop: '-10px',
    },
    videoFrame: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
     
    },
  };

  return (
    <>
    <Header />
    <div style={styles.content}>
      {/* Top Article */}
      <div style={styles.topArticle}>
        <img src="src/images/article 1.png" alt="Article Image 1" style={styles.topArticleImage}/>
        <div style={styles.topArticleContent}>
          <div style={styles.topArticleDetails}>
            <span style={styles.topArticleAuthor}>Mallika Marshall, MD</span>
            <span style={styles.topArticleDate}>May 27, 2024</span>
          </div>
          <h2 style={styles.topArticleTitle}><b>Skin Cancer</b></h2>
          <p style={styles.topArticleText}>
            Skin cancer is the most common cancer in the United States. An estimated one in five Americans will develop skin cancer in their lifetime. The single most important thing you can do to protect your skin is to reduce sun exposure.
          </p>
          <a href="/art1" style={{ padding: '10px 13px', borderRadius: '10px', fontSize: '12px' }} className="button">
            Read More
          </a>
        </div>
      </div>

      {/* Latest Articles */}
      <h2 style={styles.latestArticlesHeading}><b>Latest Articles:</b></h2>
      <div style={styles.latestArticlesContainer}>
        {/* Article 1 */}
        <div style={styles.latestArticle}>
          <img src="src/images/article 2.png" alt="Article Image 2" style={styles.latestArticleImage}/>
          <div style={styles.latestArticleContent}>
            <div style={styles.latestArticleDetails}>
              <span style={styles.latestArticleAuthor}>Owain T Jones</span>
              <span style={styles.latestArticleDate}>January 7, 2025</span>
            </div>
            <h2 style={styles.latestArticleTitle}>
              <b>Recognising Skin Cancer in Primary Care</b>
            </h2>
            <p style={styles.latestArticleText}>
              Skin cancer, including melanoma and keratinocyte carcinomas has one of the highest global incidences of any form of cancer. Incidence rates of these types of skin cancer are increasing.
            </p>
            <a href="/art2" style={styles.latestArticleReadMore} className="button">
              Read More
            </a>
          </div>
        </div>

        {/* Article 2 */}
        <div style={styles.latestArticle}>
          <img src="src/images/article 3.png" alt="Article Image 3" style={styles.latestArticleImage}/>
          <div style={styles.latestArticleContent}>
            <div style={styles.latestArticleDetails}>
              <span style={styles.latestArticleAuthor}>Uclahealth</span>
              <span style={styles.latestArticleDate}>December 20, 2024</span>
            </div>
            <h2 style={styles.latestArticleTitle}><b>How to Prevent Skin Cancer</b></h2>
            <p style={styles.latestArticleText}>
              By age 70, one in five people in the U.S. will have developed skin cancer — making this disease the most common type of cancer. But despite those scary statistics, you actually have a lot of control over your risk of getting skin cancer.
            </p>
            <a href="/art3" style={styles.latestArticleReadMore} className="button">
              Read More
            </a>
          </div>
        </div>

        {/* Article 3 */}
        <div style={styles.latestArticle}>
          <img src="src/images/article 4.png" alt="Article Image 4" style={styles.latestArticleImage}/>
          <div style={styles.latestArticleContent}>
            <div style={styles.latestArticleDetails}>
              <span style={styles.latestArticleAuthor}>Yvette Brazier</span>
              <span style={styles.latestArticleDate}>December 5, 2024</span>
            </div>
            <h2 style={styles.latestArticleTitle}>
              <b>What are the Different Types of Tumour?</b>
            </h2>
            <p style={styles.latestArticleText}>
              There are three main types of tumor: benign, premalignant, and malignant. If someone has a malignant tumor, it is cancerous. Other types of tumor are not cancerous.
            </p>
            <a href="/art4" style={styles.latestArticleReadMore} className="button">
              Read More
            </a>
          </div>
        </div>

        {/* Article 4 */}
        <div style={styles.latestArticle}>
          <img src="src/images/article 5.png" alt="Article Image 5" style={styles.latestArticleImage}/>
          <div style={styles.latestArticleContent}>
            <div style={styles.latestArticleDetails}>
              <span style={styles.latestArticleAuthor}>Cleveland Clinic</span>
              <span style={styles.latestArticleDate}>November 11, 2024</span>
            </div>
            <h2 style={styles.latestArticleTitle}><b>Skin Lesions</b></h2>
            <p style={styles.latestArticleText}>
              Skin lesions are areas of your skin that are different from the skin around them. Skin lesions are common and may be the result of an injury or damage to your skin, like sunburn. They're sometimes a sign of underlying conditions, like infections or autoimmune diseases.
            </p>
            <a href="/art5" style={styles.latestArticleReadMore} className="button">
              Read More
            </a>
          </div>
        </div>
      </div>

      {/* Understanding Skin Cancer Section - Moved to bottom */}
      <div style={styles.videoSection}>
        <h2 style={styles.videoTitle}><b>Understanding Skin Cancer</b></h2>
        <p style={styles.videoDescription}>
          Watch this video to learn more about skin cancer and the importance of early detection with Skinthesis.
        </p>
        <div style={styles.videoContainer}>
          <iframe
            style={styles.videoFrame}
            src="https://www.youtube.com/embed/XhCOf0UE7i0"
            title="Understanding Skin Cancer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
    
    <Footer />
    </>
  );
}

export default Home;