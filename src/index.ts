/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component as ServerlessComponent } from '@serverless/core';
import React from 'react';
import Reconciler from 'react-reconciler';
import { Container, Output } from './container';
import * as hostConfig from './host-config';

const reconciler = Reconciler(hostConfig);

export const deploy = (
  element: JSX.Element,
  component: ServerlessComponent<any, any>
): Promise<any> =>
  new Promise<Output>((resolve, reject): void => {
    const container = new Container(component);

    reconciler.updateContainer(
      React.cloneElement(element),
      reconciler.createContainer(container, false, false),
      null,
      () => {
        container.output().then(resolve).catch(reject);
      }
    );
  });
