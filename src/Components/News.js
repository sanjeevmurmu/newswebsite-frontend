import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: '9',
        category: 'general'
    }


    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            article: [],
            loading: false,
            page: 1,
            showDiv: false,
            headline: "News Headline",
            style:{"bottom":0,"top":0,"left":0,"right":0}
        }
    }

   
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c2eb919bb061453baaeec05d857b7501&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        //console.log(parsedData);
        this.setState({ article: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

    }

    handleNextClick = async () => {
        if ((this.state.page + 1 > (Math.ceil(this.state.totalResults / this.props.pageSize)))) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c26f485692974687a72b11dcc7ebe448&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            // this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log("diptansu");
            this.setState(
                {
                    page: this.state.page + 1,
                    article: parsedData.articles,
                    loading: false
                })
        }

    }
    handlePrivClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c26f485692974687a72b11dcc7ebe448&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState(
            {
                page: this.state.page - 1,
                article: parsedData.articles,
                loading: false
            })
    }



    handleSelection = async () => {

        if (window.getSelection) {
            const selectedText = window.getSelection().toString()
            if (!window.getSelection().rangeCount) return;
            // this.setState.rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
            // console.log(selectedText)
            // let currentDate = new Date().toJSON().slice(0, 10);
            // var d = new Date();
            // let previousDate= d.setDate(d.getDate() - 7);
            let url = `https://newsapi.org/v2/everything?q=${selectedText}&apiKey=c2eb919bb061453baaeec05d857b7501&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState(
                {
                    article: parsedData.articles,
                    totalResults: parsedData.totalResults,
                    loading: false,
                    showDiv: false,
                    headline: selectedText + " News"
                })
            window.getSelection().empty()
        }
    }

    handleMouseUp = () => {
        if (!window.getSelection().isCollapsed) {
            this.setState({ showDiv: true });
            const rect=window.getSelection().getRangeAt(0).getBoundingClientRect();
            const {bottom,top,left,right}=rect
            const scrollY = window.scrollY;
            this.setState({style:{"bottom":`${rect.height+bottom+scrollY}px`,"top":`${rect.height+top+scrollY}px`,"left":`${rect.width+left}px`,"right":`${rect.width+right}px`}})
         
        }

    };

    handleDivClose = () => {
        this.setState({ showDiv: false })
        window.getSelection().empty()

    }

    handleCopy = () => {
        navigator.clipboard.writeText(window.getSelection().toString())
        this.setState({ showDiv: false })
    }

    render() {

        return (
            <div className='container my-3'>
                <h1 className="text-center">{this.state.headline}</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.article.map((element) => {

                        return <div key={element.url} className="col-md-4" onMouseUp={this.handleMouseUp}>
                            <NewsItem title={element.title} description={element.description}
                                imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>

                    })}


                    
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrivClick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>

                {this.state.showDiv && <div className='bg-light text-primary custom-dialog-box' style={this.state.style}>
                    <div className='d-flex flex-row justify-content-between gap-2 mb-3 align-items-center'>
               
                        <div>What do you want to do with selected text</div>
                        <button id='close' className='btn btn-light btn-close' onClick={this.handleDivClose}></button> </div>

                    <div className='d-flex flex-column gap-1 align-items-center'>
                        <button id="selection" className='btn btn-dark' onClick={() => {
                            this.handleSelection()
                        }}>Search Text</button>
                        <button id="copy" className='btn btn-dark' onClick={this.handleCopy}>Copy text</button>
                    </div>

                </div>}
                
            </div>
        )
    }
}

export default News
