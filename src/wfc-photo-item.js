import {LitElement, html, css} from 'lit-element';
import './wfc-photo-image.js';

class WfcPhotoItem extends LitElement {
  static get styles() {
    return css`
      article {
        margin: 0 0 16px;
      }
      @media (min-width: 640px) {
        article {
          margin-bottom: 60px;
          padding-bottom: 24px;
        }
      }
      @media (min-width: 640px) {
        article {
          border-radius: 3px;
          border: 1px solid #e6e6e6;
        }
      }
      .author {
        padding: 0 16px;
        line-height: 60px;
        font-size: 14px;
        font-weight: 600;
      }
      .image {
        vertical-align: middle;
        position: relative;
      }
      .title {
        font-size: 14px;
        margin: 16px 0 0;
      }
      .description {
        font-size: 12px;
        margin: 8px 0 0;
      }
      .time {
        font-size: 10px;
        color: #999;
        margin: 8px 0 0;
      }
      .meta {
        padding: 0 16px;
      }
    `;
  }

  static get properties() {
    return {
      url: {type: String},
      color: {type: String},
      title: {type: String},
      description: {type: String},
      author: {type: String},
      width: {type: Number},
      height: {type: Number},
      postDatetime: {type: Number},
    };
  }

  callback() {
    console.log('callbc');
  }

  getDateString() {
    const now = new Date();
    const date = new Date(this.postDatetime);
    const diff = now - date;
    const SEC = 1000;
    const MIN = SEC * 60;
    const HOUR = MIN * 60;
    const DAY = HOUR * 24;
    switch (true) {
      case diff < MIN:
        return `${Math.floor(diff / SEC)}秒前`;
      case diff < HOUR:
        return `${Math.floor(diff / MIN)}分前`;
      case diff < DAY:
        return `${Math.floor(diff / HOUR)}時間前`;
      case diff < DAY * 3:
        return `${Math.floor(diff / DAY)}日前`;
      default:
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}月${day}日`;
    }
  }

  render() {
    const ratio = `${(this.height / this.width) * 100}%`;
    return html`
      <article>
        <header class="author">${this.author}</header>
        <div class="image">
          <wfc-photo-image
            callback="${this.callback}"
            src="${this.url}"
            alt="${this.title}"
            color="${this.color}"
            width="100%"
            height="${ratio}"
          ></wfc-photo-image>
        </div>
        <div class="meta">
          <h3 class="title">${this.title}</h3>
          <p class="description">${this.description}</p>
          <p class="time">${this.getDateString()}</p>
        </div>
      </article>
    `;
  }
}

window.customElements.define('wfc-photo-item', WfcPhotoItem);
