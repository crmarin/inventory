import { articleStore } from '@/store/articleStore';

const ArticleItem = ({ article, handleEdit, handleRemove }) => {
  const showModal = articleStore((state) => state.showModal);

  return (
    <tr>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {article.name}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {article.description}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {article.price}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {article.countInStock}
      </td>
      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-center text-xs whitespace-nowrap">
        <button
          className="background-transparent mr-1 mb-1 px-3 py-3 font-bold uppercase text-blue-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
          type="button"
        >
          <i
            className="fas fa-edit"
            onClick={() => {
              handleEdit(article);
              showModal();
            }}
          ></i>
        </button>
        <button
          className="background-transparent mr-1 mb-1 px-3 py-3 font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
          type="button"
        >
          <i
            className="fas fa-trash"
            onClick={() => {
              handleRemove(article._id);
            }}
          ></i>
        </button>
      </td>
    </tr>
  );
};

export default ArticleItem;
