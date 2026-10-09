import { Component, Prop, Event, EventEmitter, h, Host, Watch } from '@stencil/core';

@Component({
  tag: 'example-input',
  styleUrl: 'example-input.css',
  shadow: true,
})
export class ExampleInput {
  /** The current value of the input */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /** Placeholder text for the input */
  @Prop() placeholder: string = '';

  /** Whether the input is disabled */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Emitted when the value changes */
  @Event() exampleChange!: EventEmitter<string>;

  /** Emitted when the input receives focus */
  @Event() exampleFocus!: EventEmitter<void>;

  /** Emitted when the input loses focus */
  @Event() exampleBlur!: EventEmitter<void>;

  @Watch('value')
  handleValueChange(newValue: string) {
    this.exampleChange.emit(newValue);
  }

  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  };

  private handleFocus = () => {
    this.exampleFocus.emit();
  };

  private handleBlur = () => {
    this.exampleBlur.emit();
  };

  render() {
    return (
      <Host>
        <label class="input-wrapper">
          <span class="label">
            <slot name="label">Label</slot>
          </span>
          <input
            type="text"
            class="input"
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          <span class="helper">
            <slot name="helper"></slot>
          </span>
        </label>
      </Host>
    );
  }
}
