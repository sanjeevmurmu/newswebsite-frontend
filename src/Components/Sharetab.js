import React, { Component } from 'react'
import { FacebookIcon,WhatsappIcon,TwitterIcon,TelegramIcon,RedditIcon } from 'react-share'
import { FacebookShareButton,WhatsappShareButton,TwitterShareButton,TelegramShareButton,RedditShareButton } from 'react-share'
import { X } from 'lucide-react'

export default class Sharetab extends Component {
  render() {
    const {newsUrl,handler}=this.props
    return (
      <div className='box bg-white border-secondary-subtle shadow-lg rounded'>
        <X className='position-absolute top-0 end-0 m-2' onClick={()=>handler(false)}/>
        <div className='d-flex flex-row gap-3'>
            <FacebookShareButton url={newsUrl}><FacebookIcon size={50} round={true}/><p>Facebook</p></FacebookShareButton>
            <WhatsappShareButton  url={newsUrl}><WhatsappIcon size={50} round={true}/><p>WhatsApp</p></WhatsappShareButton>
            <TwitterShareButton  url={newsUrl}><TwitterIcon size={50} round={true}/><p>Twitter</p></TwitterShareButton>
            <TelegramShareButton  url={newsUrl}><TelegramIcon size={50} round={true}/><p>Telegram</p></TelegramShareButton>
            <RedditShareButton  url={newsUrl}><RedditIcon size={50} round={true}/><p>Reddit</p></RedditShareButton>
        </div>
        <div className='d-flex flex-row bg-light justify-content-center align-items-center border-top'style={{height:"60%"}}>
            <input className='link-box' value={newsUrl} contenteditable="false"></input>
            <div className='position-absolute end-0 me-4 rounded-pill btn btn-dark'onClick={()=>navigator.clipboard.writeText(newsUrl.toString())}>copy</div>
        </div>
      </div>
    )
  }
}
