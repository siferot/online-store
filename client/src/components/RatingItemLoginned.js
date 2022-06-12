import React, { useContext, useEffect, useState } from 'react'
import { Spinner, Card } from 'react-bootstrap';
import { Context } from '..';
import { useParams } from 'react-router-dom';
import { createRate, fetchRate } from '../http/deviceAPI';

const RatingItemLoginned = () => {
  const [loading, setLoading] = useState(true)
  const [rate, setRate] = useState(0)
  const [ratingTemp, setRatingTemp] = useState(0)
  const {id} = useParams()
  const {user} = useContext(Context)
  const ratings = [1, 2, 3, 4, 5]

  const changeRate = () => {
    createRate(ratingTemp, user.userId, Number(id)).then(data => {
      setRate(data.rate)
    })
  } 

  useEffect(() => {
    fetchRate(user.userId, id).then(data => {
      setRate(data[0]?.rate || 0)
    }).finally(() => setLoading(false))
  }, [])

  const debounce = (func, wait) => {
    let timeout;
  
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
  
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  if (loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
    <Card className="p-3">
                <h3>Please leave a rating</h3>
                <div
                  style={{width: "fit-content"}}
                  onMouseLeave={() => {
                    setRatingTemp(0)
                  }}>
                  {ratings.map(rating =>
                    // <Image 
                    //   width={22} 
                    //   height={22} 
                    //   src={rating <= device.rating ? activeStar : star}
                    //   className='mt-3 me-1'
                    //   style={{cursor: 'pointer'}}
                    //   key={rating}
                    //   onClick={() => {
                    //     device.rating = rating;
                    //   }}
                    // />
                    // <svg version="1.1" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.128 43.128">
                    //   <path style="fill:#BBBBBB;" d="M39.199,15.197H27.668L24.105,4.232c-1.404-4.326-3.68-4.326-5.084,0l-3.563,10.965H3.928c-4.545,0-5.25,2.164-1.571,4.836l9.326,6.775L8.121,37.775c-1.404,4.322,0.438,5.662,4.116,2.988l9.326-6.775l9.328,6.775c3.678,2.674,5.52,1.334,4.116-2.988l-3.564-10.967l9.326-6.775C44.449,17.361,43.744,15.197,39.199,15.197z"/>
                    // </svg>
                      <div
                        className='d-inline-block p-1'
                        style={{cursor: 'pointer'}}
                        onMouseEnter={() => {
                          setRatingTemp(rating)
                        }}
                        onClick={changeRate}
                        key={rating}>
                          <svg 
                          width="22" height="22" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 43 43">
                          <g fill={ratingTemp != 0 ? (rating <= ratingTemp ? "#212529" : (rating <= rate ? "#576069" : "#BBBBBB")) : (rating <= rate ? "#576069" : "#BBBBBB")}>
                            <path d="M39.199,15.197H27.668L24.105,4.232c-1.404-4.326-3.68-4.326-5.084,0l-3.563,10.965H3.928c-4.545,0-5.25,2.164-1.571,4.836l9.326,6.775L8.121,37.775c-1.404,4.322,0.438,5.662,4.116,2.988l9.326-6.775l9.328,6.775c3.678,2.674,5.52,1.334,4.116-2.988l-3.564-10.967l9.326-6.775C44.449,17.361,43.744,15.197,39.199,15.197z"/>
                          </g>
                        </svg>
                      </div>
                  )}
                </div>
                
              </Card>
  )
}

export default RatingItemLoginned