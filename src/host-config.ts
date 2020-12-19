/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@serverless/core';
import { Container } from './container';

export type Instance = Promise<Record<keyof any, any>>;
export type TextInstance = string;
export type PublicInstance = Instance | TextInstance;
export type HostContext = {};
export type Type = string;
export type Props = {
  alias?: string;
  await?: Promise<any>;
  path?: string;
  prefix?: string;
} & Record<keyof any, any>;
export type OpaqueHandle = any;
export type UpdatePayload = any;

export const getPublicInstance = (
  instance: Instance | TextInstance
): PublicInstance => instance;

export const getRootHostContext = (
  _rootContainerInstance: Container
): HostContext => ({});

export const getChildHostContext = (
  _parentHostContext: HostContext,
  _type: Type,
  _rootContainerInstance: Container
): HostContext => ({});

export const prepareForCommit = (_containerInfo: Container): void => {};

export const resetAfterCommit = (_containerInfo: Container): void => {};

export const createInstance = (
  type: Type,
  {
    alias,
    await = Promise.resolve({}),
    path,
    prefix = '@serverless',
    ...props
  }: Props,
  rootContainerInstance: Container,
  _hostContext: HostContext,
  _internalInstanceHandle: OpaqueHandle
): Instance =>
  await.then((input) =>
    rootContainerInstance.load<Component<any, any>>(
      type === 'custom' ? path! : `${prefix}/${type}`,
      { ...props, ...input },
      alias
    )
  );

export const appendInitialChild = (
  _parentInstance: Instance,
  _child: Instance | TextInstance
): void => {};

export const finalizeInitialChildren = (
  _parentInstance: Instance,
  _type: Type,
  _props: Props,
  _rootContainerInstance: Container,
  _hostContext: HostContext
): boolean => false;

export const prepareUpdate = (
  _instance: Instance,
  _type: Type,
  _oldProps: Props,
  _newProps: Props,
  _rootContainerInstance: Container,
  _hostContext: HostContext
): null | UpdatePayload => {};

export const shouldSetTextContent = (_type: Type, _props: Props): boolean =>
  false;

export const shouldDeprioritizeSubtree = (
  _type: Type,
  _props: Props
): boolean => false;

export const createTextInstance = (
  text: string,
  _rootContainerInstance: Container,
  _hostContext: HostContext,
  _internalInstanceHandle: OpaqueHandle
): TextInstance => text;

export const now = Date.now;

export const isPrimaryRenderer = true;

export const supportsMutation = true;

export const supportsPersistence = false;

export const supportsHydration = false;

export const appendChild = (
  _parentInstance: Instance,
  _child: Instance | TextInstance
): void => {};

export const appendChildToContainer = (
  container: Container,
  _child: Instance | TextInstance
): void => {
  container.resolve();
};

export const commitTextUpdate = (
  _textInstance: TextInstance,
  _oldText: string,
  _newText: string
): void => {};

export const commitMount = (
  _instance: Instance,
  _type: Type,
  _newProps: Props,
  _internalInstanceHandle: OpaqueHandle
): void => {};

export const commitUpdate = (
  _instance: Instance,
  _updatePayload: UpdatePayload,
  _type: Type,
  _oldProps: Props,
  _newProps: Props,
  _internalInstanceHandle: OpaqueHandle
): void => {};

export const insertBefore = (
  _parentInstance: Instance,
  _child: Instance | TextInstance,
  _beforeChild: Instance | TextInstance
): void => {};

export const insertInContainerBefore = (
  _container: Container,
  _child: Instance | TextInstance,
  _beforeChild: Instance | TextInstance
): void => {};

export const removeChild = (
  _parentInstance: Instance,
  _child: Instance | TextInstance
): void => {};

export const removeChildFromContainer = (
  _container: Container,
  _child: Instance | TextInstance
): void => {};

export const resetTextContent = (_instance: Instance): void => {};
