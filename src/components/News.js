import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url = "https://newsapi.org/v2/everything?q=tesla&from=2022-08-11&sortBy=publishedAt&apiKey=cb0dae6f770a49bcbede8b01b16e597b&page=1&pageSize=12";
    let data = await fetch(url);
    let passdata = await data.json();
    this.setState({
        articles: passdata.articles,
        totalResults: passdata.totalResults,
    })
  }

  handleprevclick = async () =>{
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2022-08-11&sortBy=publishedAt&apiKey=cb0dae6f770a49bcbede8b01b16e597b&page=${this.state.page - 1}&pageSize=12`;
    let data = await fetch(url);
    let passdata = await data.json();
    this.setState({
        page : this.state.page - 1,
        articles: passdata.articles
    })
  }
  handlenextclick = async () =>{
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2022-08-11&sortBy=publishedAt&apiKey=cb0dae6f770a49bcbede8b01b16e597b&page=${this.state.page + 1}&pageSize=12`;
    let data = await fetch(url);
    let passdata = await data.json();
    this.setState({
        page : this.state.page + 1,
        articles: passdata.articles
    })
  }

  render() {
    return (
      <div>
        <div className="container my-3">
          <h2 className="text-center my-5">Top Headlines</h2>
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title?element.title.slice(0, 40)+"...":""}
                    description={element.description?element.description.slice(0, 90)+"...":""}
                    imgUrl={element.urlToImage}
                    newsUrl = {element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between my-5">
        <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handleprevclick}>&larr; Previous</button>
        <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} className="btn btn-primary" onClick={this.handlenextclick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
