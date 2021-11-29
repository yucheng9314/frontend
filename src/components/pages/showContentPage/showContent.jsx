import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Avatar } from "@material-ui/core";
import "./showContent.css";

function ShowContent() {
  const [loading, setLoading] = useState(false);
  const [userMarkdown, setUserMarkdown] = useState("");
  const [openUserContent, setOpenUserContent] = useState(false);
  const history = useHistory();
  const { popupdata } = useLocation();

  useEffect(() => {
    setOpenUserContent(true);
    setLoading(true);
    setTimeout(() => {
      import(`../../../../public${popupdata.recommed.markdown}`)
        .then((res) => {
          fetch(res.default)
            .then((res) => res.text())
            .then((res) => setUserMarkdown(res));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setOpenUserContent(false);
        });
    }, 500);
  }, []);

  useEffect(() => {
    if (openUserContent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openUserContent]);

  const handleGoBack = (e) => {
    e.stopPropagation();
    history.goBack();
    setUserMarkdown("");
    setLoading(false);
    setOpenUserContent(false);
  };

  return (
    <div className="popup-root" onClick={handleGoBack}>
      <div className="popup-inner">
        <div className="popup-background" />
        <div className="popup-overlay">
          <div className="popup-overlay-project">
            <div className="popup-overlay-project-authorheader">
              <Avatar src={popupdata.user.avatar} />
            </div>
            {loading && (
              <div className="popup-overlay-project-content">
                <ReactMarkdown
                  className="markdown-content"
                  children={userMarkdown}
                  linkTarget="_blank"
                  remarkPlugins={[
                    remarkGfm,
                    remarkParse,
                    remarkRehype,
                    rehypeStringify,
                    remarkToc,
                  ]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, "")}
                          style={prism}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowContent;
