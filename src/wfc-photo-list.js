import {LitElement, html, css} from 'lit-element';
import './wfc-loading.js';
import './wfc-photo-item.js';

const API_ORIGIN = 'https://wfc-2019.firebaseapp.com';

const fetchImagesByOffset = async offset => {
  const response = await fetch(`${API_ORIGIN}/images?offset=${offset}`, {
    mode: 'cors',
  });
  if (response.ok) {
    const {data} = await response.json();
    return data;
  } else {
    throw new Error('Failed to fetch api');
  }
};

class WfcPhotoList extends LitElement {
  static get styles() {
    return css`
      .LoadMore {
        height: 44px;
        margin: 8px 0;
        text-align: center;
      }
      button {
        display: inline-block;
        border-radius: 50%;
        width: 44px;
        border: none;
        padding: 0;
        margin: 0;
        line-height: 44px;
        background: #fff;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
      }
    `;
  }

  static get properties() {
    return {
      images: {type: Array},
      loading: {type: Boolean},
      end: {type: Boolean},
      error: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.images = [];
    this.loading = false;
    this.error = false;
    this.end = false;
    this.init();
  }

  async init() {
    this.fetchOffset();
  }

  async fetchOffset() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    let offset = this.images.length;
    if (offset) {
      offset += 1;
    }
    try {
      const {images} = await fetchImagesByOffset(offset);
      if (!images.length) {
        this.end = true;
      } else {
        this.images.push(...images);
      }
    } catch (e) {
      this.error = true;
    }
    this.loading = false;
  }

  handleClick() {
    console.info('click');
    this.fetchOffset();
  }

  render() {
    if (this.error) {
      return html`
        <p align="center">
          Sorry. Something went wrong. ;D<br />
          Please reload this page.
        </p>
      `;
    }

    return html`
      <section>
        ${
          !this.images.length
            ? null
            : this.images.map(
                item => html`
                  <wfc-photo-item
                    title="${item.title}"
                    description="${item.description}"
                    postDatetime="${item.postDatetime}"
                    url="${item.url}"
                    width="${item.width}"
                    height="${item.height}"
                    author="${item.author}"
                  ></wfc-photo-item>
                `,
              )
        }
      </section>
      ${
        this.end
          ? null
          : html`
              <div class="LoadMore">
                ${
                  this.loading
                    ? html`
                        <wfc-loading></wfc-loading>
                      `
                    : html`
                        <button @click="${this.handleClick}">↓</button>
                      `
                }
              </div>
            `
      }
    `;
  }
}

window.customElements.define('wfc-photo-list', WfcPhotoList);
