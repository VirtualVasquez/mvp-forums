import React from 'react';
import './Pagination.scss';

function PageTurningButton ({direction, turnPage}) {
  //function to handle clicks
  function handleOnClick(){
    if(direction == "previous"){
      //decrease currentPage by 1
      //additional logic
      console.log("Decrease pageNumber by 1")
    }
    if(direction == "next"){
      //increase currentPage by 1
      //additional logic
      console.log("Increase pageNumber by 1")
    }
  }

  if(direction == "previous"){
    return(
      <a 
        className="previous"
        onClick={handleOnClick}
      >PREVIOUS</a>
    )
  }

  if(direction == "next"){
    return(
      <a 
        className="next"
        onClick={handleOnClick}
      >NEXT</a>
    )
  }

  if(!direction){
    null;
  }

}

function EndPagesButton ({toFirstPage}){
  
  function goToAnEnd(){
      if(toFirstPage){
        console.log("Take the user the first page");
        //additional logic
      } else{
        console.log("Take the user the last page");
        //additional logic
      }
  }

  if(toFirstPage){
    return(
      <a 
        className='toFirstPage'
        onClick={goToAnEnd}
      >
        <i></i>
      </a>
    )

  } else{
    return(
      <a 
        className='toLastPage'
        onClick={goToAnEnd}
      >
        <i></i>
      </a>
    )
  }
}

function Pagination ({currentPage, setCurrentPage, totalPages}) {

  const renderNumbers = () => {
    const links = [];
    let startingNumber = totalPages < 5 ? 1 : currentPage;
    let endingNumber = totalPages < 5 ? totalPages : startingNumber + 4;

    for (let i = startingNumber; i <= endingNumber; i++){
      links.push(
        <a 
          key={i}           
          className={i == currentPage ? "active" : null}
        >
          {i}
        </a>
      );
    }
    return links
  } 

    return (
      <div className="pagination">
        <div className="page-numbers">
            {currentPage == 1 ? 
            null :
            <div>
              <EndPagesButton 
                toFirstPage={true}
              />
              <PageTurningButton 
                direction="previous"
                turnPage={setCurrentPage}                          
              />
            </div>
            }
            {renderNumbers()}            
            {currentPage == totalPages ? 
            null :
            <div>
            <PageTurningButton 
              direction="next"
              turnPage= {setCurrentPage}  
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