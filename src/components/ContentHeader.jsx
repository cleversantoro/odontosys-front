import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const ContentHeader = ({ title }) => {
  return (
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
    );
 };


export default ContentHeader;
