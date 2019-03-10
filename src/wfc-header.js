import {LitElement, html, css} from 'lit-element';

class WfcHeader extends LitElement {
  static get styles() {
    return css`
      div {
        height: 44px;
      }
      header {
        width: 100%;
        height: 44px;
        line-height: 44px;
        background: #fff;
        border-bottom: 1px solid #00000019;
        position: fixed;
        z-index: 100;
      }
      h1 {
        font-weight: 100;
        text-align: center;
        margin: 0;
        font-size: 18px;
      }
    `;
  }
  render() {
    return html`
      <div>
        <header><h1>CA WFC 2019 - Photo Viewer</h1></header>
      </div>
    `;
  }
}

window.customElements.define('wfc-header', WfcHeader);
