import React from "react"
import styles from "../styles/paginado.module.css"


export function Paginado ({page, pages,handlePage,handleNext,handlePrev}) {

let pagesArray= []
for(let i=1;i<=pages;i++) {
    pagesArray.push(i)
} 

let first=parseInt(page)!==parseInt(pages)? parseInt(page)!==1? parseInt(page)-2 : 0 : ((parseInt(page)-3)<0? 0 : (parseInt(page)-3) )
let last= parseInt(page)!==parseInt(pages)? parseInt(page)===1? parseInt(page)+2 : parseInt(page)+1 : parseInt(page)  

    return (
        <div className={styles.paginated}> 
            <button 
                disabled={page>1? false: true} 
                className={page>1 ? styles.selections : styles.disabled} 
                onClick={handlePrev}>
                    &#60; Prev
            </button>
            <button 
                disabled={page>2? false : true} 
                className={page>2 ? styles.selections : styles.disabled} 
                onClick={handlePage} 
                value="1">
                    {page>2? 1 : "  "}
            </button>
            <span>  ...  </span>
            {pagesArray.slice(first,last).map(el=>(
                <button 
                    className={el===parseInt(page)? styles.selected : styles.selections} 
                    onClick={handlePage} 
                    key={el} 
                    value={el}>
                         {el} 
                </button>))}
            <span >  ...  </span>            
            <button 
                disabled={page<pages-1? false : true} 
                className={page<pages-1? styles.selections : styles.disabled} 
                onClick={handlePage} 
                value={pages} >
                    {page<pages-1? pages : "  "}
            </button>                       
            <button 
                disabled={page<pages? false : true} 
                className={page<pages ? styles.selections : styles.disabled} 
                onClick={handleNext} >
                    Next &#62;
            </button>
        </div>
    )
}