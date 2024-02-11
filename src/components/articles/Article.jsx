import { Link } from "react-router-dom"
import React from "react"
import PropTypes from "prop-types"
import { truncateText } from "../../helpers/helpers"
import clsx from "clsx"
import ReactMarkdown from "react-markdown"
import MDEditor from '@uiw/react-md-editor'
import CodeMermaid from "../ui/CodeMermaid"

const sanitizeText = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  const plainText = doc.body.textContent || "";
  let sanitizedText = plainText.replace(/\*\*(.*?)\*\*/g, "$1");
  sanitizedText = sanitizedText.replace(/#/g, "");
  sanitizedText = sanitizedText.replace(/>/g, "");

  return sanitizedText;
};

export const Article = ({ title, body, slug, listMode = true }) => {
  const content = listMode ? truncateText(body, 210) : body
  const sanitizedContent = listMode ? sanitizeText(content) : body.replace(/&gt;/g, ">")

  return (
    <div className="w-full">
      {listMode ? (
        <>
          <Link to={`/articles/${slug}`}>
            <h1 className="font-black py-2">{title}</h1>
          </Link>
          <ReactMarkdown
            className={clsx({ "line-clamp-3 md:line-clamp-2": listMode })}
            children={sanitizedContent}
            allowedElements={["a", "strong", "em", "p", "h1", "h2", "ul", "ol", "li", "blockquote"]}
          />
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
};
