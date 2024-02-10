import React, { useEffect, useState } from "react";
import "./Home.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { SyncLoader } from "react-spinners";
import { Container } from "react-bootstrap";
import Pagination from "../Pagination/Pagination";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Home() {
  let url =
    "https://newsapi.org/v2/everything?q=apple&from=2024-02-09&to=2024-02-09&sortBy=popularity&apiKey=affd9de00814466f8b623c7f56baa795";

  const [currentPage, setCurrentPage] = useState(1);
  let startindex = 0;
  let endindex = 5;
  const newsPerPage = 5;
  const [News, setNews] = useState([]);
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

  const { data, isLoading } = useQuery("Articles", () => getData().then(getnews()));
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
    console.log("current", currentPage);
    console.log("start", startindex);
    console.log("end", endindex);
    getnews();
    console.log(News);
  }, [currentPage]);
  

  return (
    <>
      <Container className="d-flex flex-column align-items-center">
        <h1>Home</h1>
        {isLoading ? (
          <SyncLoader className="mt-5" color="#36d7b7" />
        ) : (
          <>
            {News?.map((item) => (
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
            ))}
            <Pagination
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={paginate}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default Home;
