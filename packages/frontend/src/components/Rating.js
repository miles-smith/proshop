import React from 'react';

const Rating = ({ value, text, colour }) => (
  <div className="rating">
    <span>
      <i style={{ color: colour }} className={
        value >= 1
        ? 'fas fa-star'
        : value >= 0.5
        ? 'fas fa-star-half-alt'
        : 'far fa-star'
      }></i>
    </span>
    <span>
      <i style={{ color: colour }} className={
        value >= 2
        ? 'fas fa-star'
        : value >= 1.5
        ? 'fas fa-star-half-alt'
        : 'far fa-star'
      }></i>
    </span>
    <span>
      <i style={{ color: colour }} className={
        value >= 3
        ? 'fas fa-star'
        : value >= 2.5
        ? 'fas fa-star-half-alt'
        : 'far fa-star'
      }></i>
    </span>
    <span>
      <i style={{ color: colour }} className={
        value >= 4
        ? 'fas fa-star'
        : value >= 3.5
        ? 'fas fa-star-half-alt'
        : 'far fa-star'
      }></i>
    </span>
    <span>
      <i style={{ color: colour }} className={
        value >= 5
        ? 'fas fa-star'
        : value >= 4.5
        ? 'fas fa-star-half-alt'
        : 'far fa-star'
      }></i>
    </span>
    <span className="pl-1">{text && text}</span>
  </div>
);

Rating.defaultProps = {
  colour: '#f8e825'
}

export default Rating;
