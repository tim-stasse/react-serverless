/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component as ServerlessComponent } from '@serverless/core';

export type Input = Record<keyof any, any>;
export type Output = Record<keyof any, any>;

export type Component = ServerlessComponent<any, any> & Record<keyof any, any>;

export class Container {
  private component: Component;
  private children: Promise<[Component, Input]>[];
  private resolved: Promise<void>;

  public method: string;
  public resolve!: () => void;

  public constructor(component: Component, method = 'default') {
    this.component = component;
    this.method = method;
    this.children = [];
    this.resolved = new Promise((resolve): void => {
      this.resolve = resolve;
    });
  }

  load = <TComponent extends Component>(
    nameOrPath: string,
    input: Input,
    componentAlias?: string
  ): Promise<Output> => {
    const promise = this.component
      .load<TComponent>(nameOrPath, componentAlias)
      .then((component) =>
        this.method in component && typeof component[this.method] === 'function'
          ? component[this.method](input)
          : null
      );

    this.children.push(promise);

    return promise;
  };

  output = (): Promise<Output> =>
    this.resolved.then(() => Promise.all(this.children));
}
