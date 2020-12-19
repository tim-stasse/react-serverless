/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@serverless/core' {
  export type ContextConfig = {
    credentials?: string;
    debug?: boolean;
    stateRoot?: string;
  };

  export type BaseState = { id: string };

  export type IContext<TState extends BaseState = BaseState> = {
    credentials: NonNullable<ContextConfig['credentials']>;
    debugMode: NonNullable<ContextConfig['debug']>;
    stateRoot: NonNullable<ContextConfig['stateRoot']>;
    state: TState;
    id: TState['id'];

    init(): Promise<void>;
    resourceId(): string;
    readState(id: string): Promise<Partial<TState>>;
    writeState(id: string, state: TState): Promise<TState>;
    log(msg: any): void;
    debug(msg: any): void;
    status(msg: any): void;
  }

  export class Context<TState extends BaseState = BaseState>
    implements IContext<TState> {
    constructor(config?: ContextConfig);

    credentials: IContext<TState>['credentials'];
    debugMode: IContext<TState>['debugMode'];
    stateRoot: IContext<TState>['stateRoot'];
    state: IContext<TState>['state'];
    id: IContext<TState>['id'];

    init: IContext<TState>['init'];
    resourceId: IContext<TState>['resourceId'];
    readState: IContext<TState>['readState'];
    writeState: IContext<TState>['writeState'];
    log: IContext<TState>['log'];
    debug: IContext<TState>['debug'];
    status: IContext<TState>['status'];
  }

  export type ComponentContext<
    TState extends BaseState = BaseState,
    TContext extends IContext<TState> = Context<TState>
  > = {
    instance: TContext;
    credentials: TContext['credentials'];
    resourceId: TContext['resourceId'];
    log: TContext['log'];
    debug: TContext['debug'];
    status: TContext['status'];
  };

  type DefaultFunction<
    TInput extends {},
    TOutput extends {} | undefined
  > = {
    (input?: TInput): Promise<TOutput>;
  }

  export class Component<
    TInput extends {},
    TOutput extends {} | undefined,
    TState extends BaseState = BaseState,
    TContext extends IContext<TState> = Context<TState>
  > extends DefaultFunction<TInput, TOutput> {
    constructor(id?: string, context?: TContext);

    default: DefaultFunction<TInput, TOutput>;

    id: string;
    context: ComponentContext<TState, TContext>;
    state: TState;

    init(): Promise<void>;
    save(): Promise<void>;
    load<TComponent extends Component<any, any>>(
      nameOrPath: string,
      componentAlias?: string
    ): Promise<TComponent>;
  }
}
