import type { TextWriter } from './text-writer.js';

export class HtmlWriter {
  oneLevelIndentation = '  ';
  private indentation: string[] = [''];

  constructor(private textWriter: TextWriter) {}

  public end(): void {
    this.textWriter.end();
  }

  private raw(chunk: string): void {
    this.textWriter.write(chunk);
  }

  private indent(): void {
    this.raw(this.indentation.at(-1)!);
  }

  private withIndentation(contents: () => void): void {
    this.indentation.push(this.indentation.at(-1)! + this.oneLevelIndentation);
    contents();
    this.indentation.pop();
  }

  public text(chunk: string): void {
    this.indent();
    // https://stackoverflow.com/questions/9187946/escaping-inside-html-tag-attribute-value
    this.raw(
      chunk
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('\n', `\n${this.indentation.at(-1)}`)
        .trim(),
    );
    this.raw('\n');
  }

  private selfClosingTag(
    tag: string,
    attributes: Record<string, string> = {},
  ): void {
    this.indent();
    this.raw('<');
    this.raw(tag);
    this.writeAttributes(attributes);
    this.raw(' />\n');
  }

  private openTag(tag: string, attributes: Record<string, string> = {}): void {
    this.indent();
    this.raw('<');
    this.raw(tag);
    this.writeAttributes(attributes);
    this.raw('>\n');
  }

  private closeTag(tag: string): void {
    this.indent();
    this.raw('</');
    this.raw(tag);
    this.raw('>\n');
  }

  private tag(
    tag: string,
    attributes: Record<string, string> = {},
    contents: () => void,
  ): void {
    this.openTag(tag, attributes);
    this.withIndentation(contents);
    this.closeTag(tag);
  }

  private writeAttributes(attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([key, value]) => {
      this.raw(' ');
      this.raw(key);
      this.raw('="');
      // https://stackoverflow.com/questions/9187946/escaping-inside-html-tag-attribute-value
      this.raw(
        value
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('"', '&quot;'),
      );
      this.raw('"');
    });
  }

  public button(
    attributes: Record<string, string>,
    contents: () => void,
  ): void {
    this.tag('button', attributes, contents);
  }

  public checkbox(attributes: Record<string, string>): void {
    this.input({ type: 'checkbox', ...attributes });
  }

  public doctype(): void {
    this.indent();
    this.raw('<!DOCTYPE html>\n');
  }

  public form(attributes: Record<string, string>, contents: () => void): void {
    this.tag('form', attributes, contents);
  }

  public h1(attributes: Record<string, string>, contents: () => void): void {
    this.tag('h1', attributes, contents);
  }

  public h2(attributes: Record<string, string>, contents: () => void): void {
    this.tag('h2', attributes, contents);
  }

  public html(head: () => void, body: () => void): void {
    this.doctype();
    this.tag('html', {}, () => {
      this.tag('head', {}, head);
      this.tag('body', {}, body);
    });
  }

  public input(attributes: Record<string, string>): void {
    this.selfClosingTag('input', attributes);
  }

  public label(attributes: Record<string, string>, contents: () => void): void {
    this.tag('label', attributes, contents);
  }

  public p(attributes: Record<string, string>, contents: () => void): void {
    this.tag('p', attributes, contents);
  }

  public submit(
    attributes: Record<string, string>,
    contents: () => void,
  ): void {
    this.button({ type: 'submit', ...attributes }, contents);
  }

  public table(attributes: Record<string, string>, contents: () => void): void {
    this.tag('table', attributes, contents);
  }

  public tbody(attributes: Record<string, string>, contents: () => void): void {
    this.tag('tbody', attributes, contents);
  }

  public td(attributes: Record<string, string>, contents: () => void): void {
    this.tag('td', attributes, contents);
  }

  public textbox(attributes: Record<string, string>): void {
    this.input({ type: 'text', ...attributes });
  }

  public th(attributes: Record<string, string>, contents: () => void): void {
    this.tag('th', attributes, contents);
  }

  public thead(attributes: Record<string, string>, contents: () => void): void {
    this.tag('thead', attributes, contents);
  }

  public title(titleText: string): void {
    this.tag('title', {}, () => {
      this.text(titleText);
    });
  }

  public tr(attributes: Record<string, string>, contents: () => void): void {
    this.tag('tr', attributes, contents);
  }
}
