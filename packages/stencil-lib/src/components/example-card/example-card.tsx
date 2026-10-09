import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'example-card',
  shadow: true,
})
export class ExampleCard {
  render() {
    return (
      <Host>
        <header>
          <slot name="start">fallback:start</slot>
        </header>
        <div class="body">
          <slot />
        </div>
      </Host>
    );
  }
}
