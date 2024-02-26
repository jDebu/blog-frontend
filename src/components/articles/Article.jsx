import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { truncateText } from "../../helpers/helpers.jsx"
import clsx from "clsx"
import MDEditor from '@uiw/react-md-editor'
import CodeMermaid from "../ui/CodeMermaid.jsx"

const sanitizeText = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  const plainText = doc.body.textContent || "";
  let sanitizedText = plainText.replace(/\*\*(.*?)\*\*/g, "$1");
  sanitizedText = sanitizedText.replace(/#/g, "");
  sanitizedText = sanitizedText.replace(/>/g, "");

  return sanitizedText;
};

export const Article = ({ title, body, slug, listMode = true, summary = '', coverImage }) => {
  const content = listMode ? truncateText(summary, 210) : body
  const sanitizedContent = listMode ? sanitizeText(content) : body.replace(/&gt;/g, ">")
  const base = import.meta.env.VITE_API_BASE;

  return (
    <div className={clsx('w-full mb-2', { 'inline-flex': listMode })}>
      {listMode ? (
        <>
          <div className="flex flex-col">
            <Link to={`/articles/${slug}`}>
              <h1 className="font-black py-2">{title}</h1>
            </Link>
            <div className="">
              {content}
            </div>
          </div>
          <div className="ml-4 mt-2">
            <img
              src={`${base.replace('/backend', '')}${coverImage}`}
              alt="No image"
              className="min-w-28 min-h-28 h-28 w-28"
            />
          </div>
        </>
      ) : (
        <>
        <h1 className="font-bold py-8 text-3.5 leading-13 text-stone-800">{title}</h1>
        <div className={clsx({ "line-clamp-3 md:line-clamp-2": listMode })} >
          <MDEditor.Markdown
            source={sanitizedContent }
            components={{
              code: CodeMermaid
            }}
          />
        </div>
        </>
      )}
    </div>
  );
};

Article.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  slug: PropTypes.string,
  listMode: PropTypes.bool,
  summary: PropTypes.string,
  coverImage: PropTypes.string
};
