import React from 'react';
import './Pagination.scss';


function Pagination ({currentPage, totalPages, pageType, id, slug}) {

  const renderNumbers = () => {
    const links = [];
    let startingNumber = totalPages < 5 ? 1 : parseInt(currentPage);
    let endingNumber = totalPages < 5 ? totalPages : startingNumber + 4;

    for (let i = startingNumber; i <= endingNumber; i++){
      links.push(
        <a 
          key={i}           
          href={i === 1 ? `/${pageType}/${id}/${slug}` : `/${pageType}/${id}/${slug}/page/${i}`}
          data-value={i}
          className={i === currentPage ? "active" : null}
        >
          {i}
        </a>
      );
    }
    return links
  } 
  
  function PageTurningButton ({direction}) {

    if(direction === "previous"){
      return(
        <a 
          className="previous"
          href={`/${pageType}/${id}/${slug}/page/${parseInt(currentPage)-1}`}
        >PREVIOUS</a>
      )
    }

    if(direction === "next"){
      return(
        <a 
          className="next"
          href={`/${pageType}/${id}/${slug}/page/${parseInt(currentPage)+1}`}
        >NEXT</a>
      )
    }

    if(!direction){
      return null;
    }

  }
  function EndPagesButton ({toFirstPage}){
  
    if(toFirstPage){
      return(
        <a 
          className='toFirstPage'
          href={`/${pageType}/${id}/${slug}`}
        >
          <i></i>
        </a>
      )
  
    } else{
      return(
        <a 
          className='toLastPage'
          href={`/${pageType}/${id}/${slug}/page/${totalPages}`}
        >
          <i></i>
        </a>
      )
    }
  }

    return (
      <div className="pagination box-shadow">
        <div className="page-numbers">
            {currentPage === 1 ? 
            null :
            <div>
              <EndPagesButton 
                toFirstPage={true}
              />
              <PageTurningButton 
                direction="previous"
              />
            </div>
            }
            {renderNumbers()}            
            {currentPage === totalPages ? 
            null :
            <div>
            <PageTurningButton 
              direction="next"
            />
            <EndPagesButton 
              toFirstPage={false}
            />
            </div>
            }          

        </div>
      </div>
    );
}

export default Pagination;