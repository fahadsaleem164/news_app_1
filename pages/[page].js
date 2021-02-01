import {Toolbar} from '../components/toolbar'
import styles from '../styles/Feed.module.css';
import matter from 'gray-matter'
import Link from "next/link";
import { useRouter } from 'next/router';
var slugify = require('slugify')


const Blog  = ({page,data,pagination}) => {
  console.log(pagination)
  const router = useRouter();
        const RealData = data.map((blog) => matter(blog))
        const ListItems = RealData.map((listItem) => listItem.data)
        
         
        return (
            <div className='page-container'>
                <Toolbar/>
                <div className={styles.main}>
                    {ListItems.map((article,index)=>(
                        <div key={index} className={styles.post}>
                             <Link href={'blog/'+slugify(article.title,{lower: true})}>
                               <h1>{article.title}</h1>
                              </Link>
                             <p>{article.description.substring(0,100)}...</p>
                            {!!article.image && <img src={article.image} />}
                        </div>
                    ))}
                </div>

                <div className={styles.paginator}>
                {/* <div
                            onClick={()=>{
                                if(pagination.current < pagination.pages){
                                    router.push(`/${pageNumber+1}`).then(()=> window.scrollTo(0,0));

                                }
                            }} 
                            >
                                  Previous
                      </div> */}
                 
                      
                 <div className = {pagination.current === 2 ?styles.buttonDisplay : styles.buttonDisplayNone }>

                       <Link  href={`/blog`}>Previous</Link>

                </div>
                
                <div className = {pagination.current === 2 ? styles.buttonDisplayNone : styles.buttonDisplay}>

                    <Link  href={`/${pagination.current-1}`}>Previous</Link>

                  </div>

                  
               
                      <div>
                            #{pagination.current}
                      </div>

                    

                  <div className = {pagination.current === pagination.pages ? styles.buttonDisplayNone : styles.buttonDisplay}>
                    <Link href={`/${pagination.current+1}`}>
                      Next
                      </Link>
                  </div>


                  <div className = {pagination.current === pagination.pages ?  styles.buttonDisplay :styles.buttonDisplayNone}>
                    <Link href={`/${pagination.current}`}>
                      Next
                      </Link>
                  </div>

            

        </div>

        
        </div>
    )
  }


  export async function getStaticProps({ params }) {
 
      const page = parseInt(params.page)
      const pageSize = 5

      const fs = require("fs");
      const files = fs.readdirSync(`${process.cwd()}/pages/posts`, "utf-8");
      const blogs = files.filter((fn) => fn.endsWith(".md"));
      
      const pages = Math.ceil(Number(blogs.length)/Number(pageSize))
      var abc = blogs.slice((Number(page - 1)*pageSize),(Number(page)*(Number(pageSize)) )  )


      const data = blogs.slice((Number(page - 1)*pageSize),(Number(page)*(Number(pageSize)) )  ).map((blog) => {
      const path = `${process.cwd()}/pages/posts/${blog}`;
      const rawContent = fs.readFileSync(path, {
          encoding: "utf-8",
      });

        return rawContent;
      });

      const pagination = {
        current: page,
        pages:pages ,
      }

      return {
        props: {
          page,
          data:data , 
          pagination
        },
      };


  }

  export async function getStaticPaths() {

    const pageSize = 2
    const fs = require("fs");
    //get all .md files in the posts dir
    const files = fs.readdirSync(`${process.cwd()}/pages/posts`, "utf-8");
    const totalPage = Math.ceil(Number(files.length)/Number(pageSize))

    const paths = Array.from(Array(totalPage - 1).keys()).map((it) => ({
      params: { page: (it + 2).toString() },
    }));

    return {
      paths: paths,
      fallback: false,
    };

 
  
  }
  

 


  export default Blog
