import React, { useEffect, useState } from "react";
import "./Home.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { SyncLoader } from "react-spinners";
import { Container } from "react-bootstrap";
import Pagination from "../Pagination/Pagination";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import SideBar from "../SideBar/SideBar";

function Home() {
  let url =
    "https://newsapi.org/v2/everything?q=apple&from=2024-02-09&to=2024-02-09&sortBy=popularity&apiKey=affd9de00814466f8b623c7f56baa795";

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setcategory] = useState("All");
  let startindex = 0;
  let endindex = 5;
  const newsPerPage = 5;
  const [News, setNews] = useState([]);
  let categories = [];
  const getnews = async () => {
    try {
      const x = await setMapped(startindex, endindex);
      setNews(x);
    } catch (error) {}
  };

  const getData = async () => {
    const res = await axios.get(url);
    return res;
  };

  const { data, isLoading } = useQuery("Articles", () =>
    getData().then(getCategories()).then(getnews())
  );
  const getCategories = async () => {
    try {
      for (let index = 0; index < data?.data.articles.length; index++) {
        categories.push(data.data.articles[index].source.name);
      }
      console.log("categories", categories);
      categories = categories.filter(
        (item, index) => categories.indexOf(item) === index
      );
      console.log("categories", categories);
    } catch (error) {}
  };
  getnews();

  const paginate = (page) => {
    if (page !== currentPage) {
      setNews([]);
      setCurrentPage(page);
    }
  };
  const setMapped = async () => {
    return await data?.data?.articles?.slice(startindex, endindex);
  };
  const pages = Math.ceil(data?.data?.articles?.length / newsPerPage);

  useEffect(() => {
    startindex = (currentPage - 1) * newsPerPage;
    endindex = startindex + newsPerPage;
    if (data) {
      getnews();
      getCategories();
    }
  }, [currentPage]);

  return (
    <div className="row">
      <div className="col-2 ">
        <SideBar categories={categories} />
      </div>
      <Container className="d-flex flex-column align-items-center  justify-content-center col-10 ">
        <h1>Home</h1>
        {isLoading ? (
          <SyncLoader className="mt-5" color="#36d7b7" />
        ) : (
          <>
            {category === "All"
              ? News?.map((item) => (
                  <div className="d-flex flex-row mb-5">
                    <img width={250} src={item.urlToImage} />
                    <div>
                      <Card className="text-center">
                        <Card.Header>{item.source.name}</Card.Header>
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text>{item.description}</Card.Text>
                          <Button variant="primary">{item.author}</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                          {item.publishedAt}
                        </Card.Footer>
                      </Card>
                    </div>
                  </div>
                ))
              : News?.map((item) => {
                  if (item.source.name === category) {
                    <div className="d-flex flex-row mb-5">
                      <img width={250} src={item.urlToImage} />
                      <div>
                        <Card className="text-center">
                          <Card.Header>{item.source.name}</Card.Header>
                          <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <Button variant="primary">{item.author}</Button>
                          </Card.Body>
                          <Card.Footer className="text-muted">
                            {item.publishedAt}
                          </Card.Footer>
                        </Card>
                      </div>
                    </div>;
                  }
                })}

            <Pagination
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={paginate}
            />
          </>
        )}
      </Container>
    </div>
  );
}

export default Home;
