/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

export {}; // Allow module augmentation

declare module 'react-reconciler' {
  interface HostConfig<
    Type,
    Props,
    Container,
    Instance,
    TextInstance,
    HydratableInstance,
    PublicInstance,
    HostContext,
    UpdatePayload,
    ChildSet,
    TimeoutHandle,
    NoTimeout
  > {
    scheduleDeferredCallback?(
      callback: () => any,
      options?: { timeout: number }
    ): any;
    cancelDeferredCallback?(callbackID: any): void;

    setTimeout?(
      handler: (...args: any[]) => void,
      timeout: number
    ): TimeoutHandle | NoTimeout;
    clearTimeout?(handle: TimeoutHandle | NoTimeout): void;
    noTimeout?: NoTimeout;
  }
}
