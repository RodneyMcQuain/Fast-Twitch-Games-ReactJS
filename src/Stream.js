import React, { Component } from 'react';
import './App.css';

function Stream(props) {
    return (
      <a href = { props.url } target = "_blank">
        <div className="divToRemove">
          <img src = { props.thumbnail }></img>
          <h1>{ props.displayName }</h1>
          <p>{ props.title }</p>
          <p>&nbsp;- { props.viewers } viewers</p>
        </div>
      </a>
    );
}

export default Stream;
