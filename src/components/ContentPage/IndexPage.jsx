import React, { useState, useEffect } from 'react';
import { INDEX_PAGE } from '../../constants/contentTypes';
import contentful from '../../utils/contentful';
import ContentPage from './ContentPage';

const IndexPage = ({ content }) => {

  if (!content) return null;

  return <ContentPage content={content} />;
}

export default IndexPage;