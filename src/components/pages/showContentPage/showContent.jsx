import React, { useCallback, useEffect, useState } from "react";
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
import "./showContent.css";
import ThreeDEngine from "../../3DEngine/3dengine";
import CloseIcon from "@material-ui/icons/Close";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import SmsIcon from "@material-ui/icons/Sms";

function ShowContent() {
  const [loading, setLoading] = useState(false);
  const [userMarkdown, setUserMarkdown] = useState("");
  const [openUserContent, setOpenUserContent] = useState(false);
  const history = useHistory();
  const { popupdata } = useLocation();

  let timestamp = new Date();

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

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const escFunction = useCallback((e) => {
    if (e.keyCode === 27) {
      e.stopPropagation();
      history.goBack();
      setUserMarkdown("");
      setLoading(false);
      setOpenUserContent(false);
    }
  });

  const handleGoBack = (e) => {
    e.stopPropagation();
    history.goBack();
    setUserMarkdown("");
    setLoading(false);
    setOpenUserContent(false);
  };

  const RenderOverlayButton = (
    <>
      <div className="popup-overlay-close" onClick={handleGoBack}>
        <CloseIcon className="popup-overlay-closeicon" />
      </div>

      <div className="popup-overlay-linkleft">
        <div className="popup-overlay-linkcycle">
          <ChevronLeftIcon style={{ color: "whitesmoke", fontSize: "30" }} />
        </div>
        <p className="popup-overlay-link-p">上一页</p>
      </div>

      <div className="popup-overlay-linkright">
        <div className="popup-overlay-linkcycle">
          <ChevronRightIcon style={{ color: "whitesmoke", fontSize: "30" }} />
        </div>
        <p className="popup-overlay-link-p">下一页</p>
      </div>
    </>
  );

  const RenderProjectHeader = (
    <div className="popup-overlay-project-authorheader">
      <img className="authorheader-avatar" src={popupdata.user.avatar} />
      <div>
        <p className="authorheader-name">{popupdata.user.username}</p>
        <p className="authorheader-time">
          {timestamp.toLocaleDateString()}
          {timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );

  const RenderSiderBar = (
    <div className="popup-sidebar">
      <div className="popup-sidebar-sticky">
        <div className="popup-sider-container">
          <div className="popup-sidebar-avatar">
            <img src={popupdata.user.avatar} alt="" />
          </div>
          <p className="popup-overlay-link-p">关注</p>
        </div>
        <div className="popup-sider-container">
          <div className="popup-sidebar-iconbackground">
            <EmailOutlinedIcon style={{ color: "whitesmoke" }} />
          </div>
          <p className="popup-overlay-link-p">消息</p>
        </div>
        <div className="popup-sider-container">
          <div className="popup-sidebar-iconbackground">
            <FavoriteOutlinedIcon style={{ color: "gray" }} />
          </div>
          <p className="popup-overlay-link-p">喜欢</p>
        </div>
        <div className="popup-sider-container">
          <div className="popup-sidebar-iconbackground">
            <i
              className="fa fa-folder-open icon-collection"
              aria-hidden="true"
            ></i>
          </div>
          <p className="popup-overlay-link-p">收藏</p>
        </div>
        {/* <div className="popup-sider-container">
          <div className="popup-sidebar-iconbackground">
            <i
              class="fa fa-linkedin-square icon-collection"
              aria-hidden="true"
            ></i>
          </div>
          <p className="popup-overlay-link-p">领英</p>
        </div> */}
      </div>
    </div>
  );

  return (
    <div className="popup-root">
      {RenderOverlayButton}
      <div className="popup-background" />
      <div className="popup-overlay">
        <div className="popup-overlay-project">
          {/* <ThreeDEngine /> */}
          {RenderProjectHeader}
          {RenderSiderBar}
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
  );
}

export default ShowContent;
