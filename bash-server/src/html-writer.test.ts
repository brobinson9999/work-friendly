import { HtmlWriter } from './html-writer.js';
import { TextWriter } from './text-writer.js';

describe('HtmlWriter', () => {
  let textWriter: TextWriter;
  let htmlWriter: HtmlWriter;
  let html: string;

  beforeEach(() => {
    html = '';
    const write = (chunk: string) => {
      html += chunk;
    };
    textWriter = new TextWriter(write);
    htmlWriter = new HtmlWriter(textWriter);
  });

  it('should write a self-closing tag', () => {
    htmlWriter.input({ type: 'text', id: 'username' });
    htmlWriter.end();

    expect(html).toEqual('<input type="text" id="username" />\n');
  });

  it('should write an open and close tag with contents', () => {
    htmlWriter.p({}, () => {
      htmlWriter.text('Hello, world!');
    });
    htmlWriter.end();

    expect(html).toEqual('<p>\n  Hello, world!\n</p>\n');
  });

  it('should write a doctype and html structure', () => {
    htmlWriter.html(
      () => {
        htmlWriter.title('Test Page');
      },
      () => {
        htmlWriter.p({}, () => {
          htmlWriter.text('Content 1\nContent 2');
        });
      },
    );
    htmlWriter.end();

    expect(html).toEqual(
      `<!DOCTYPE html>
<html>
  <head>
    <title>
      Test Page
    </title>
  </head>
  <body>
    <p>
      Content 1
      Content 2
    </p>
  </body>
</html>
`,
    );
  });

  it('should escape special characters in text', () => {
    htmlWriter.text('<script>alert("XSS & friends")</script>');
    htmlWriter.end();

    expect(html).toEqual('&lt;script>alert("XSS &amp; friends")&lt;/script>\n');
  });

  it('should escape special characters in attribute value', () => {
    htmlWriter.p({ title: '<script>alert("XSS & friends")</script>' }, () => {
      htmlWriter.text('Content');
    });
    htmlWriter.end();

    expect(html).toEqual(
      '<p title="&lt;script>alert(&quot;XSS &amp; friends&quot;)&lt;/script>">\n  Content\n</p>\n',
    );
  });
});
