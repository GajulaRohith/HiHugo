import React, {useState,useEffect,useRef} from "react"
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from "./components/NewsCards/NewsCards";

import logo from './hugo2.jpg';
import wordsToNumbers from 'words-to-numbers'
import useStyles from "./styles.js"

const App = () => {
  
 const alanBtnRef = useRef({}).current;

  const [newsArticles,setNewsArticles]=useState([]);
  const [activeArticle,setActiveArticle]=useState(-1);

 const classes=useStyles();
  useEffect(() => {
    if(!alanBtnRef.btnInstance) {
          alanBtnRef.btnInstance=alanBtn({
            key: '24907a13c94d8601924e30ce5d65bee22e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, articles, number }) => {
              if(command==='newHeadlines'){
                setNewsArticles(articles);
                setActiveArticle(-1);
              }
              else if(command==='highlight'){
                  setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
              }
              else if (command === 'open') {
                const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                const article = articles[parsedNumber - 1];
      
                if (parsedNumber > articles.length) {
                  alanBtnRef.btnInstance.playText('Please try that again...');
                } else if (article) {
                  window.open(article.url, '_blank');
                  alanBtnRef.btnInstance.playText('Opening...');
                } else {
                  alanBtnRef.btnInstance.playText('Please try that again...');
                }
              }
            }
              } );
    }
  }, [alanBtnRef]);
     return(
        <div>
            <div className={classes.logoContainer}>
              <img src={logo} className={classes.alanLogo}></img> 
              <h1>HI HUGO NEWS READER APPLICATION</h1>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}
export default App;