import sanitizeHtml from 'sanitize-html';

export default function BlogContent({ html }: { html: string }) {
  const clean = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'iframe',
      'table',
      'thead',
      'tbody',
      'tfoot',
      'tr',
      'th',
      'td',
      'caption',
      'colgroup',
      'col',
      'div',
      'span',
      'p',
      'pre',
      'code',
      'blockquote',
      'ul',
      'ol',
      'li',
      'br',
      'strong',
      'b',
      'em',
      'i',
      'u',
      'sup',
      'sub',
      'mark',
      'font',
      'a'
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ['href', 'name', 'target', 'rel', 'title', 'style'],
      img: ['src', 'alt', 'width', 'height', 'loading', 'style'],
      iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen', 'style'],
      table: ['border', 'cellpadding', 'cellspacing', 'style'],
      th: ['colspan', 'rowspan', 'style'],
      td: ['colspan', 'rowspan', 'style'],
      div: ['style'],
      span: ['style'],
      p: ['style'],
      ul: ['style', 'type'],
      ol: ['style', 'type'],
      li: ['style'],
      font: ['face', 'size', 'color', 'style'],
      code: ['class', 'style'],
    },
    allowedSchemesByTag: {
      a: ['http', 'https', 'mailto', 'tel'],
      img: ['http', 'https', 'data'],
      iframe: ['http', 'https'],
    },
    allowedStyles: {
      '*': {
        color: [/^[\s\S]*$/],
        'background-color': [/^[\s\S]*$/],
        'text-align': [/^[\s\S]*$/],
        'font-size': [/^[\s\S]*$/],
        'font-weight': [/^[\s\S]*$/],
        'font-style': [/^[\s\S]*$/],
        'text-decoration': [/^[\s\S]*$/],
        'font-family': [/^[\s\S]*$/],
        'list-style-type': [/^[\s\S]*$/],
        margin: [/^[\s\S]*$/],
        'margin-left': [/^[\s\S]*$/],
        'margin-right': [/^[\s\S]*$/],
        'margin-top': [/^[\s\S]*$/],
        'margin-bottom': [/^[\s\S]*$/],
        padding: [/^[\s\S]*$/],
        'padding-left': [/^[\s\S]*$/],
        'padding-right': [/^[\s\S]*$/],
        'padding-top': [/^[\s\S]*$/],
        'padding-bottom': [/^[\s\S]*$/],
        'white-space': [/^[\s\S]*$/],
        border: [/^[\s\S]*$/],
        'border-collapse': [/^[\s\S]*$/],
        width: [/^[\s\S]*$/],
        height: [/^[\s\S]*$/],
        display: [/^[\s\S]*$/],
      },
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', {
        target: '_blank',
        rel: 'noopener noreferrer',
      }),
      iframe: (tagName, attribs) => {
        if (attribs.src && attribs.src.startsWith('//')) {
          attribs.src = 'https:' + attribs.src;
        }
        return { tagName, attribs };
      },
    },
    parser: {
      lowerCaseTags: true,
    },
  });

  return <div className="blog-content max-w-none" dangerouslySetInnerHTML={{ __html: clean }} />;
}
