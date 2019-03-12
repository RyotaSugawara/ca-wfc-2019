import {LitElement, html, css} from 'lit-element';

class WfcPhotoImage extends LitElement {
  static get properties() {
    return {
      color: {type: String},
      width: {type: String},
      height: {type: String},
      src: {type: String},
      alt: {type: String},
      inviewed: {type: Boolean},
      loaded: {type: Boolean},
    };
  }

  static get styles() {
    return css`
      .content {
        position: relative;
      }
      .placeholder {
        width: 100%;
      }
      .image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: all 0.5s ease;
      }
      [data-loaded='true'] {
        opacity: 1;
      }
    `;
  }

  constructor() {
    super();
    this.loaded = false;
    this.inviewed = false;
    this.unobserve = null;
  }

  handleLoad() {
    this.loaded = true;
  }

  connectedCallback() {
    super.connectedCallback();
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.inviewed = true;
        this.unobserve && this.unobserve();
      }
    });
    observer.observe(this);
    this.unobserve = () => {
      observer.disconnect();
      this.unobserve = null;
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unobserve && this.unobserve();
  }

  render() {
    return html`
      <div class="content" style="width:${this.width};">
        <div
          class="placeholder"
          style="background-color: ${this.color};padding-top:${
            this.height
          };width:${this.width};"
        ></div>
        ${
          this.inviewed
            ? html`
                <img
                  class="image"
                  width="100%"
                  data-loaded="${this.loaded}"
                  src="${this.src}"
                  alt="${this.alt}"
                  @load="${this.handleLoad}"
                />
              `
            : null
        }
      </div>
    `;
  }
}
window.customElements.define('wfc-photo-image', WfcPhotoImage);
