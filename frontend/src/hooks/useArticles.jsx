import { useEffect } from 'react';
import { useParams } from 'react-router';

import { articleStore } from '@/store/articleStore';
import { companyStore } from '@/store/companyStore';
import { shallow } from 'zustand/shallow';

export default () => {
  let { id } = useParams();

  const { getCompanyById, company } = companyStore(
    (state) => ({
      getCompanyById: state.getCompanyById,
      company: state.company,
    }),
    shallow
  );

  const {
    articles,
    getAllArticlesByCompany,
    statusModal,
    setError,
    createArticle,
    updateArticle,
    deleteArticle,
    status: success,
  } = articleStore(
    (state) => ({
      articles: state.articles,
      getAllArticlesByCompany: state.getAllArticlesByCompany,
      statusModal: state.statusModal,
      setError: state.setError,
      createArticle: state.createArticle,
      updateArticle: state.updateArticle,
      deleteArticle: state.deleteArticle,
      status: state.status,
    }),
    shallow
  );

  useEffect(() => {
    if (id) {
      getCompanyById(id);
      getAllArticlesByCompany(id);
    }
  }, [id]);

  return {
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
  };
};
