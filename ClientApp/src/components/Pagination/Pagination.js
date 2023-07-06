import React from 'react';
import './Pagination.scss';

function Pagination () {

    return (
      <div className="pagination">
        <div className="page-numbers">
            {/* Produce only 5 links of pages */}
            <a className="active">1</a>
            <a>2</a>
            <a>3</a>
            <a>4</a>
            <a>5</a>
            <a>NEXT</a>
            <a className='toLastPage'>
                <i></i>
            </a>
            
            {/* May not use this, div is a placeholder for reminder */}
            {/* <div className="page-range"></div> */}

        </div>

        {/* May not use this, div is a placeholder for reminder */}
        {/* <div className="conditions"></div> */}
      </div>
    );
}

export default Pagination;