import { LitElement } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/screens/Home.ts';

describe('<bs3-home>', () => {
  let element: LitElement;

  beforeEach(async () => {
    element = await fixture('<bs3-home></bs3-home>');
  });

  it('should display welcome to message', () => {
    const p = element.shadowRoot!.querySelector('p')!;
    expect(p).to.exist;
    expect(p.textContent).to.equal('Welcome to');
  });

  it('should display heading message', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('Banking Service Support System');
  });

  it('should display login button', () => {
    const btn = element.shadowRoot!.querySelector('a.btn')!;
    expect(btn).to.exist;
    expect(btn.textContent).to.equal('Login');
  });
});
