import { LitElement, html, css } from 'lit-element';
import './wfc-header.js';
import './wfc-photo-list.js';

class WfcApp extends LitElement {
  static get styles() {
    return css`
      main {
        max-width: 600px;
        margin: 0 auto;
        padding-bottom: 24px;
        min-height: 50vh;
      }
      @media (min-width: 640px) {
        main {
          padding-top: 60px;
          padding-bottom: 60px;
        }
      }
      footer {
        color: #999;
        text-align: center;
        padding-bottom: 16px;
      }
    `;
  }

  render() {
    return html`
      <wfc-header></wfc-header>
      <main>
        <wfc-photo-list></wfc-photo-list>
      </main>
      <footer>
        Copyright © RyotaSugawara.github.io. All Rights Reserved.
      </footer>
    `;
  }
}

window.customElements.define('wfc-app', WfcApp);
