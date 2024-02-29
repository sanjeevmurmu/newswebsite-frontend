import React, { Component } from 'react'
import axios from 'axios'
import { Share2 } from 'lucide-react';

import Sharetab from './Sharetab';



export class NewsItem extends Component {
    constructor() {
        super();
        this.state = {
            shareModal: false,
            shortUrl:''
        }
        this.handler = this.handler.bind(this)
    }

    handler=(newValue) =>{
        this.setState({
          shareModal: newValue
        });
       
      }
  
      shortenNewsUrl=async(title,newsUrl)=>{
        const response= await axios.post('https://newswebsite-backend.onrender.com/shortUrl',
            {
              title:title.substring(0,10).replace(" ",''),
              full:newsUrl,
          })
          console.log(response)
          this.setState({shortUrl:`https://newswebsite-backend.onrender.com/${response.data.short}`})
          this.handler(true)
      }

    render() {
        let {title,description,imageUrl,newsUrl}=this.props;

        return (
            <>
            {this.state.shareModal && <Sharetab newsUrl={newsUrl} handler={this.handler} shortUrl={this.state.shortUrl}/>}
            <div className='my-3'>
                <div className="card position-relative news-card" >
                    <img src={!imageUrl ? imageUrl="https://thumbs.dreamstime.com/b/house-not-available-white-background-sign-label-flat-style-201430826.jpg":imageUrl } className="card-img-top card-image" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title z-1">{`${title.substring(0,30)}`}...</h5>
                            {description && <p className="card-text z-1">{`${description?.substring(0,100)}`}...</p>}
                            </div>
                            <div className='d-flex flex-row justify-content-between cus-btn position-absolute bottom-0 m-2 align-items-center'>
                            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Load More</a>
                            <Share2 size={20} strokeWidth={3} onClick={()=>{
                                this.shortenNewsUrl(title,newsUrl)
                                console.log(this.state)          
                            }}/>
                            </div>

                           
                </div>
            </div>
        </>
        )
    }
}

export default NewsItem
