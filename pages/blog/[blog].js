import matter from 'gray-matter'
import {Toolbar} from '../../components/toolbar'
import styles from '../../styles/Feed.module.css';

const DetailBlog  = ({ content, data }) => {

        return (
            <div className='page-container'>
                <Toolbar/>
                <div  className={styles.main}>
                
                        <div className={styles.post}>
                             
                               <h1>{data.title}</h1>
                               {!!data.image && <img src={data.image} />}
                             <p style={{textAlign:'justify'}}>{data.description}</p>
                            
                        </div>
                 
                </div>

        
        </div>
        )
}


DetailBlog.getInitialProps = async (context) => {
    console.log(context)
    const { blog } = context.query;
    // Import our .md file using the `slug` from the URL
    
    const content = await import(`../../pages/posts/${blog}.md`);
    console.log(content)
    // console.log(content)
    const data = matter(content.default);
    // console.log(data)
    return { ...data };
  };
  

export default DetailBlog