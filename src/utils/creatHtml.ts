import { title } from "./index";

export const createHtml = (html: string, articleTitle: string) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${articleTitle || title}</title>
      </head>
      <body>
        ${html}
      </body>
    </html>
    `;
};

export const createMDHtml = (html: string, articleTitle: string) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${articleTitle || title}</title>
        <style type="text/css">
        .yeo-editor {
          font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          color: #2c3e50;
          line-height: 2;
        }
        
        .yeo-editor ul, ol, li {
          margin: 0;
          padding: 0;
        }
        
        .yeo-editor p, blockquote, ul, ol, dl, pre {
          margin-top: 0;
          margin-bottom: 0.6em;
        }
        
        .yeo-editor h1, h2 {
          border-bottom: 1px solid #e2e2e2;
        }
        
        .yeo-editor h1, h2, h3, h4, h5, h6 {
          padding: 0;
          margin: 0 0 0.6em;
          font-weight: 600;
        
          text-indent: 0;
        }
        
        .yeo-editor h1:target, h2:target, h3:target, h4:target, h5:target, h6:target {
          padding-top: 4.5rem;
        }
        
        .yeo-editor a {
          color: #0366d6;
          text-decoration: none;
        }
        
        .yeo-editor a:hover {
          text-decoration: underline;
        }
        
        .yeo-editor ul, ol {
          padding: 0.2em 0.8em;
        }
        
        .yeo-editor ul > li, ol > li {
          line-height: 2;
          padding-left: 0.2em;
          margin-left: 0.2em;
          list-style-type: disc;
        }
        
        .yeo-editor ul > li > p, ol > li > p {
          text-indent: 0;
        }
        
        .yeo-editor ul > li > ul:last-child, ol > li > ul:last-child {
          margin-bottom: 0;
        }
        
        .yeo-editor ul > li > ul li, ol > li > ul li {
          list-style-type: circle;
        }
        
        .yeo-editor ul > li > ul li > ul li, ol > li > ul li > ul li {
          list-style-type: square;
        }
        
        .yeo-editor > ul, ol {
          padding: 0 20px;
        }
        
        .yeo-editor ol > li {
          list-style-type: decimal;
        }
        
        .yeo-editor blockquote {
          margin: 0;
          margin-bottom: 0.6em;
          padding: 0 1em;
          color: #6a737d;
          border-left: 0.25em solid #dfe2e5;
        }
        
        .yeo-editor blockquote p {
          text-indent: 0;
        }
        
        .yeo-editor blockquote p:first-child {
          margin-top: 0;
        }
        
        .yeo-editor blockquote p:last-child {
          margin-bottom: 0;
        }
        
        .yeo-editor pre {
          padding: 0.6em;
          overflow: auto;
          line-height: 1.6;
          background-color: #f0f0f0;
          border-radius: 3px;
        }
        
        .yeo-editor pre code {
          padding: 0;
          margin: 0;
          font-size: 100%;
          background: transparent;
        }
        
        .yeo-editor code {
          padding: 0.2em 0.4em;
          margin: 0;
          background-color: #f0f0f0;
          border-radius: 3px;
        }
        
        .yeo-editor hr {
          margin-bottom: 0.6em;
          height: 1px;
          background: #dadada;
          border: none;
        }
        
        .yeo-editor table {
          width: 100%;
          border: 1px solid #ddd;
          margin-bottom: 0.6em;
          border-collapse: collapse;
          text-align: left;
        }
        
        .yeo-editor table thead {
          background: #eee;
        }
        
        .yeo-editor th, td {
          padding: 0.1em 0.4em;
          border: 1px solid #ddd;
        }
        
        .yeo-editor img {
          display: block;
          margin: 0 auto;
          max-width: 100%;
          margin-bottom: 0.6em;
        }
        .hljs-comment,
        .hljs-quote {
          color: #8e908c;
        }

        .hljs-variable,
        .hljs-template-variable,
        .hljs-tag,
        .hljs-name,
        .hljs-selector-id,
        .hljs-selector-class,
        .hljs-regexp,
        .hljs-deletion {
          color: #c82829;
        }

        .hljs-number,
        .hljs-built_in,
        .hljs-builtin-name,
        .hljs-literal,
        .hljs-type,
        .hljs-params,
        .hljs-meta,
        .hljs-link {
          color: #f5871f;
        }

        .hljs-attribute {
          color: #eab700;
        }

        .hljs-string,
        .hljs-symbol,
        .hljs-bullet,
        .hljs-addition {
          color: #718c00;
        }

        .hljs-title,
        .hljs-section {
          color: #4271ae;
        }

        .hljs-keyword,
        .hljs-selector-tag {
          color: #8959a8;
        }

        .hljs {
          display: block;
          overflow-x: auto;
          background: white;
          color: #4d4d4c;
          padding: 0.5em;
        }

        .hljs-emphasis {
          font-style: italic;
        }

        .hljs-strong {
          font-weight: bold;
        }
        </style>
      </head>
      <body>
        <div class="yeo-editor">
          ${html}
        </div>
      </body>
    </html>
    `;
};
