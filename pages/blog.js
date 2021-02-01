import {Toolbar} from '../components/toolbar'
import styles from '../styles/Feed.module.css';
import matter from 'gray-matter'
import Link from "next/link";
import { Router } from 'next/router';
import { useRouter } from 'next/router';
var slugify = require('slugify')
import Image from 'next/image'
import LazyLoad from 'react-lazyload';

const Blog  = ({data , pagination}) => {
        const router = useRouter()
        console.log(pagination)
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
                             
                            {!!article.image && 
                                <LazyLoad height={200} offset={10}>
                                <img src={article.image}/>
                             </LazyLoad>
                            }
                        </div>
                    ))}
                </div>

                <div className={styles.paginator}>
                
                
                
                <div><Link href="#" >Previous</Link></div>
               
                <Link href="#">
                      <div>#{pagination.current}
                      </div>                
                </Link>

                <div><Link  href={`/${pagination.current+1}`}>Next</Link></div>

                     

            

        </div>
                

        
        </div>
    )
  }


  export async function getStaticProps() {
    
      const pageSizes = 5

      const fs = require("fs");
      const files = fs.readdirSync(`${process.cwd()}/pages/posts`, "utf-8");
      const blogs = files.filter((fn) => fn.endsWith(".md"));
      const pages = Math.ceil(Number(blogs.length)/Number(pageSizes))
      console.log(pages)

      const pagination = {
        current: 1,
        pages: pages
      };



      const data = blogs.slice(0,Number(pageSizes)).map((blog) => {
      const path = `${process.cwd()}/pages/posts/${blog}`;
      const rawContent = fs.readFileSync(path, {
          encoding: "utf-8",
      });

        return rawContent;

      });

      return {
        props: {
          data:data,
          pagination
          
        },
      };


  }

  
  

 


  export default Blog
