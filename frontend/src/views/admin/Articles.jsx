import React, { useEffect, useState } from 'react';

import IndexNavbar from '@/components/Navbars/IndexNavbar';
import Footer from '@/components/Footers/Footer';

import ArticlesForm from '@/components/Articles/ArticlesForm';
import ArticlesList from '@/components/Articles/ArticlesList';


import { useParams } from 'react-router';
import useArticles from '../../hooks/useArticles';

function Articles() {
  let { id } = useParams();

  const {
    getCompanyById,
    company,
    articles,
    getAllArticlesByCompany,
    statusModal,
    setError,
    createArticle,
    updateArticle,
    deleteArticle,
    success,
  } = useArticles();

  const initialState = {
    _id: null,
    name: '',
    description: '',
    price: '',
    countInStock: '',
    clientId: id,
  };

  const [formData, setFormData] = useState(initialState);

  const { _id, name, description, price, countInStock } = formData;

  const onDeleteArticle = (id) => {
    deleteArticle(id);
  };

  const onUpdateArticle = (company) => {
    setFormData(company);
  };

  const onSubmit = () => {
    if (name === '') {
      setError('name', 'Name is required');
    }
    if (description === '') {
      setError('description', 'Description is required');
    }
    if (price === '') {
      setError('price', 'Price is required');
    }
    if (countInStock === '') {
      setError('countInStock', 'Stocke number is required');
    }
    if (
      name === '' ||
      description === '' ||
      price === '' ||
      countInStock === ''
    )
      return;

    setFormData({ ...formData, ['clientId']: company._id });

    if (_id) updateArticle(formData);
    else createArticle(formData);
  };

  useEffect(() => {
    if (success) {
      setFormData(initialState);
    }
  }, [success]);

  const clearFormData = () => {
    setFormData(initialState);
  };

  useEffect(() => {
    if (id) {
      getCompanyById(id);
      getAllArticlesByCompany(id);
    }
  }, [id]);

  return (
    <div className="h-screen">
      <IndexNavbar fixed />

      <div className="relative pt-16 pb-16 flex content-center items-center justify-center min-h-screen-75">
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: 'translateZ(0)' }}
        ></div>
      </div>

      {statusModal && (
        <ArticlesForm
          handleSubmit={onSubmit}
          formData={formData}
          setFormData={setFormData}
          clearFormData={clearFormData}
        />
      )}

      <ArticlesList
        articles={articles}
        handleEdit={onUpdateArticle}
        handleRemove={onDeleteArticle}
      />

      <Footer />
    </div>
  );
}

export default Articles;
