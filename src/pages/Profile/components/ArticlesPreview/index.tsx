import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { favoritedArticles, myArticles } from "../../apis";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import ArticlePreview from "../../../Home/components/ArticlePreview";
import { Article } from "../../../../interfaces";
import { RootState } from "../../../..";

export default function ArticlesPreview() {
  const [articles, setArticles] = useState<Article[]>([]);
  const token = window.localStorage.getItem("jwtToken");
  const user = useSelector((state: RootState) => state.user.data);
  const { url } = useRouteMatch();

  const handleClickYourFeed = () => {
    myArticles(user?.username, token).then((res) => {
      setArticles(res.data.articles);
    });
  };

  const handleClickGlobalFeed = () => {
    favoritedArticles(user?.username, token).then((res) => {
      setArticles(res.data.articles);
    });
  };

  useEffect(() => {
    myArticles(user?.username, token).then((res) => {
      setArticles(res.data.articles);
    });
  }, [user?.username]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <div className="articles-toggle">
            <ul className="nav nav-pills outline-active">
              {
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={url}
                    activeClassName="selected"
                    onClick={handleClickYourFeed}
                  >
                    My articles
                  </NavLink>
                </li>
              }
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={url}
                  activeClassName="selected"
                  onClick={handleClickGlobalFeed}
                >
                  Favorited articles
                </NavLink>
              </li>
            </ul>
          </div>
          <ArticlePreview feeds={articles} />
        </div>
      </div>
    </div>
  );
}
