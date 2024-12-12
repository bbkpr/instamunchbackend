import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateItemInput = {
  basePrice?: InputMaybe<Scalars['Float']['input']>;
  expirationPeriod?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateItemMutationResponse = MutationResponse & {
  __typename?: 'CreateItemMutationResponse';
  code: Scalars['String']['output'];
  item: Item;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateLocationInput = {
  address1: Scalars['String']['input'];
  address2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  stateOrProvince: Scalars['String']['input'];
};

export type CreateLocationMutationResponse = MutationResponse & {
  __typename?: 'CreateLocationMutationResponse';
  code: Scalars['String']['output'];
  location: Location;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateMachineInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMachineItemInput = {
  itemId: Scalars['ID']['input'];
  machineId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMachineItemMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineItemMutationResponse';
  code: Scalars['String']['output'];
  machineItem: MachineItem;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateMachineLocationInput = {
  locationId: Scalars['ID']['input'];
  machineId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CreateMachineLocationMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineLocationMutationResponse';
  code: Scalars['String']['output'];
  machineLocation: MachineLocation;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateMachineMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineMutationResponse';
  code: Scalars['String']['output'];
  machine: Machine;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteItemMutationResponse = MutationResponse & {
  __typename?: 'DeleteItemMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteLocationMutationResponse = MutationResponse & {
  __typename?: 'DeleteLocationMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineItemMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineItemMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineLocationMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineLocationMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Item = {
  __typename?: 'Item';
  basePrice?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  expirationPeriod?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  machineItems?: Maybe<Array<Maybe<MachineItem>>>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Location = {
  __typename?: 'Location';
  address1: Scalars['String']['output'];
  address2?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  machineLocations?: Maybe<Array<Maybe<MachineLocation>>>;
  stateOrProvince: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Machine = {
  __typename?: 'Machine';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  machineItems?: Maybe<Array<Maybe<MachineItem>>>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type MachineItem = {
  __typename?: 'MachineItem';
  id: Scalars['ID']['output'];
  item?: Maybe<Item>;
  itemId: Scalars['ID']['output'];
  machine?: Maybe<Machine>;
  machineId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type MachineLocation = {
  __typename?: 'MachineLocation';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Location;
  locationId: Scalars['ID']['output'];
  machine: Machine;
  machineId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: CreateItemMutationResponse;
  createLocation: CreateLocationMutationResponse;
  createMachine: CreateMachineMutationResponse;
  createMachineItem: CreateMachineItemMutationResponse;
  createMachineLocation: CreateMachineLocationMutationResponse;
  deleteItem: DeleteItemMutationResponse;
  deleteLocation: DeleteLocationMutationResponse;
  deleteMachine: DeleteMachineMutationResponse;
  deleteMachineItem: DeleteMachineItemMutationResponse;
  deleteMachineLocation: DeleteMachineLocationMutationResponse;
  updateItem: UpdateItemMutationResponse;
  updateLocation: UpdateLocationMutationResponse;
  updateMachine: CreateMachineMutationResponse;
  updateMachineItems: UpdateMachineItemsMutationResponse;
  updateMachineLocation: UpdateMachineLocationMutationResponse;
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationCreateLocationArgs = {
  input: CreateLocationInput;
};


export type MutationCreateMachineArgs = {
  input: CreateMachineInput;
};


export type MutationCreateMachineItemArgs = {
  input: CreateMachineItemInput;
};


export type MutationCreateMachineLocationArgs = {
  input: CreateMachineLocationInput;
};


export type MutationDeleteItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLocationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMachineArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMachineItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMachineLocationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
};


export type MutationUpdateLocationArgs = {
  input: UpdateLocationInput;
};


export type MutationUpdateMachineArgs = {
  input: UpdateMachineInput;
};


export type MutationUpdateMachineItemsArgs = {
  input: UpdateMachineItemsInput;
};


export type MutationUpdateMachineLocationArgs = {
  input: UpdateMachineLocationInput;
};

export type MutationResponse = {
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  getItems?: Maybe<Array<Maybe<Item>>>;
  getLocations?: Maybe<Array<Maybe<Location>>>;
  getMachineItems?: Maybe<Array<Maybe<MachineItem>>>;
  getMachines?: Maybe<Array<Maybe<Machine>>>;
};

export type UpdateItemInput = {
  basePrice?: InputMaybe<Scalars['Float']['input']>;
  expirationPeriod?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateItemMutationResponse = MutationResponse & {
  __typename?: 'UpdateItemMutationResponse';
  code: Scalars['String']['output'];
  item: Item;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type UpdateLocationInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  stateOrProvince?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLocationMutationResponse = MutationResponse & {
  __typename?: 'UpdateLocationMutationResponse';
  code: Scalars['String']['output'];
  location: Location;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type UpdateMachineInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMachineItemsInput = {
  itemIds: Array<Scalars['ID']['input']>;
  machineId: Scalars['ID']['input'];
};

export type UpdateMachineItemsMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineItemsMutationResponse';
  code: Scalars['String']['output'];
  machineItems?: Maybe<Array<Maybe<MachineItem>>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type UpdateMachineLocationInput = {
  id: Scalars['ID']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  machineId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMachineLocationMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineLocationMutationResponse';
  code: Scalars['String']['output'];
  machineLocation: MachineLocation;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type UpdateMachineMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineMutationResponse';
  code: Scalars['String']['output'];
  machine: Machine;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  MutationResponse: ( CreateItemMutationResponse ) | ( CreateLocationMutationResponse ) | ( CreateMachineItemMutationResponse ) | ( CreateMachineLocationMutationResponse ) | ( CreateMachineMutationResponse ) | ( DeleteItemMutationResponse ) | ( DeleteLocationMutationResponse ) | ( DeleteMachineItemMutationResponse ) | ( DeleteMachineLocationMutationResponse ) | ( DeleteMachineMutationResponse ) | ( UpdateItemMutationResponse ) | ( UpdateLocationMutationResponse ) | ( UpdateMachineItemsMutationResponse ) | ( UpdateMachineLocationMutationResponse ) | ( UpdateMachineMutationResponse );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateItemInput: CreateItemInput;
  CreateItemMutationResponse: ResolverTypeWrapper<CreateItemMutationResponse>;
  CreateLocationInput: CreateLocationInput;
  CreateLocationMutationResponse: ResolverTypeWrapper<CreateLocationMutationResponse>;
  CreateMachineInput: CreateMachineInput;
  CreateMachineItemInput: CreateMachineItemInput;
  CreateMachineItemMutationResponse: ResolverTypeWrapper<CreateMachineItemMutationResponse>;
  CreateMachineLocationInput: CreateMachineLocationInput;
  CreateMachineLocationMutationResponse: ResolverTypeWrapper<CreateMachineLocationMutationResponse>;
  CreateMachineMutationResponse: ResolverTypeWrapper<CreateMachineMutationResponse>;
  DeleteItemMutationResponse: ResolverTypeWrapper<DeleteItemMutationResponse>;
  DeleteLocationMutationResponse: ResolverTypeWrapper<DeleteLocationMutationResponse>;
  DeleteMachineItemMutationResponse: ResolverTypeWrapper<DeleteMachineItemMutationResponse>;
  DeleteMachineLocationMutationResponse: ResolverTypeWrapper<DeleteMachineLocationMutationResponse>;
  DeleteMachineMutationResponse: ResolverTypeWrapper<DeleteMachineMutationResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Item: ResolverTypeWrapper<Item>;
  Location: ResolverTypeWrapper<Location>;
  Machine: ResolverTypeWrapper<Machine>;
  MachineItem: ResolverTypeWrapper<MachineItem>;
  MachineLocation: ResolverTypeWrapper<MachineLocation>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationResponse']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateItemInput: UpdateItemInput;
  UpdateItemMutationResponse: ResolverTypeWrapper<UpdateItemMutationResponse>;
  UpdateLocationInput: UpdateLocationInput;
  UpdateLocationMutationResponse: ResolverTypeWrapper<UpdateLocationMutationResponse>;
  UpdateMachineInput: UpdateMachineInput;
  UpdateMachineItemsInput: UpdateMachineItemsInput;
  UpdateMachineItemsMutationResponse: ResolverTypeWrapper<UpdateMachineItemsMutationResponse>;
  UpdateMachineLocationInput: UpdateMachineLocationInput;
  UpdateMachineLocationMutationResponse: ResolverTypeWrapper<UpdateMachineLocationMutationResponse>;
  UpdateMachineMutationResponse: ResolverTypeWrapper<UpdateMachineMutationResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateItemInput: CreateItemInput;
  CreateItemMutationResponse: CreateItemMutationResponse;
  CreateLocationInput: CreateLocationInput;
  CreateLocationMutationResponse: CreateLocationMutationResponse;
  CreateMachineInput: CreateMachineInput;
  CreateMachineItemInput: CreateMachineItemInput;
  CreateMachineItemMutationResponse: CreateMachineItemMutationResponse;
  CreateMachineLocationInput: CreateMachineLocationInput;
  CreateMachineLocationMutationResponse: CreateMachineLocationMutationResponse;
  CreateMachineMutationResponse: CreateMachineMutationResponse;
  DeleteItemMutationResponse: DeleteItemMutationResponse;
  DeleteLocationMutationResponse: DeleteLocationMutationResponse;
  DeleteMachineItemMutationResponse: DeleteMachineItemMutationResponse;
  DeleteMachineLocationMutationResponse: DeleteMachineLocationMutationResponse;
  DeleteMachineMutationResponse: DeleteMachineMutationResponse;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Item: Item;
  Location: Location;
  Machine: Machine;
  MachineItem: MachineItem;
  MachineLocation: MachineLocation;
  Mutation: {};
  MutationResponse: ResolversInterfaceTypes<ResolversParentTypes>['MutationResponse'];
  Query: {};
  String: Scalars['String']['output'];
  UpdateItemInput: UpdateItemInput;
  UpdateItemMutationResponse: UpdateItemMutationResponse;
  UpdateLocationInput: UpdateLocationInput;
  UpdateLocationMutationResponse: UpdateLocationMutationResponse;
  UpdateMachineInput: UpdateMachineInput;
  UpdateMachineItemsInput: UpdateMachineItemsInput;
  UpdateMachineItemsMutationResponse: UpdateMachineItemsMutationResponse;
  UpdateMachineLocationInput: UpdateMachineLocationInput;
  UpdateMachineLocationMutationResponse: UpdateMachineLocationMutationResponse;
  UpdateMachineMutationResponse: UpdateMachineMutationResponse;
};

export type CreateItemMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateItemMutationResponse'] = ResolversParentTypes['CreateItemMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateLocationMutationResponse'] = ResolversParentTypes['CreateLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineItemMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMachineItemMutationResponse'] = ResolversParentTypes['CreateMachineItemMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineItem?: Resolver<ResolversTypes['MachineItem'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMachineLocationMutationResponse'] = ResolversParentTypes['CreateMachineLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineLocation?: Resolver<ResolversTypes['MachineLocation'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMachineMutationResponse'] = ResolversParentTypes['CreateMachineMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machine?: Resolver<ResolversTypes['Machine'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteItemMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteItemMutationResponse'] = ResolversParentTypes['DeleteItemMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteLocationMutationResponse'] = ResolversParentTypes['DeleteLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineItemMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMachineItemMutationResponse'] = ResolversParentTypes['DeleteMachineItemMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMachineLocationMutationResponse'] = ResolversParentTypes['DeleteMachineLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMachineMutationResponse'] = ResolversParentTypes['DeleteMachineMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  basePrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationPeriod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineItem']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  address1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineLocations?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineLocation']>>>, ParentType, ContextType>;
  stateOrProvince?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineResolvers<ContextType = any, ParentType extends ResolversParentTypes['Machine'] = ResolversParentTypes['Machine']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineItem']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineItem'] = ResolversParentTypes['MachineItem']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  machineId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineLocation'] = ResolversParentTypes['MachineLocation']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  locationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machine?: Resolver<ResolversTypes['Machine'], ParentType, ContextType>;
  machineId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createItem?: Resolver<ResolversTypes['CreateItemMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateItemArgs, 'input'>>;
  createLocation?: Resolver<ResolversTypes['CreateLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateLocationArgs, 'input'>>;
  createMachine?: Resolver<ResolversTypes['CreateMachineMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateMachineArgs, 'input'>>;
  createMachineItem?: Resolver<ResolversTypes['CreateMachineItemMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateMachineItemArgs, 'input'>>;
  createMachineLocation?: Resolver<ResolversTypes['CreateMachineLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateMachineLocationArgs, 'input'>>;
  deleteItem?: Resolver<ResolversTypes['DeleteItemMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteItemArgs, 'id'>>;
  deleteLocation?: Resolver<ResolversTypes['DeleteLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteLocationArgs, 'id'>>;
  deleteMachine?: Resolver<ResolversTypes['DeleteMachineMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteMachineArgs, 'id'>>;
  deleteMachineItem?: Resolver<ResolversTypes['DeleteMachineItemMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteMachineItemArgs, 'id'>>;
  deleteMachineLocation?: Resolver<ResolversTypes['DeleteMachineLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteMachineLocationArgs, 'id'>>;
  updateItem?: Resolver<ResolversTypes['UpdateItemMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'input'>>;
  updateLocation?: Resolver<ResolversTypes['UpdateLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateLocationArgs, 'input'>>;
  updateMachine?: Resolver<ResolversTypes['CreateMachineMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateMachineArgs, 'input'>>;
  updateMachineItems?: Resolver<ResolversTypes['UpdateMachineItemsMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateMachineItemsArgs, 'input'>>;
  updateMachineLocation?: Resolver<ResolversTypes['UpdateMachineLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateMachineLocationArgs, 'input'>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'CreateItemMutationResponse' | 'CreateLocationMutationResponse' | 'CreateMachineItemMutationResponse' | 'CreateMachineLocationMutationResponse' | 'CreateMachineMutationResponse' | 'DeleteItemMutationResponse' | 'DeleteLocationMutationResponse' | 'DeleteMachineItemMutationResponse' | 'DeleteMachineLocationMutationResponse' | 'DeleteMachineMutationResponse' | 'UpdateItemMutationResponse' | 'UpdateLocationMutationResponse' | 'UpdateMachineItemsMutationResponse' | 'UpdateMachineLocationMutationResponse' | 'UpdateMachineMutationResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  getLocations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Location']>>>, ParentType, ContextType>;
  getMachineItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineItem']>>>, ParentType, ContextType>;
  getMachines?: Resolver<Maybe<Array<Maybe<ResolversTypes['Machine']>>>, ParentType, ContextType>;
};

export type UpdateItemMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateItemMutationResponse'] = ResolversParentTypes['UpdateItemMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateLocationMutationResponse'] = ResolversParentTypes['UpdateLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineItemsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMachineItemsMutationResponse'] = ResolversParentTypes['UpdateMachineItemsMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineItem']>>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMachineLocationMutationResponse'] = ResolversParentTypes['UpdateMachineLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineLocation?: Resolver<ResolversTypes['MachineLocation'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMachineMutationResponse'] = ResolversParentTypes['UpdateMachineMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machine?: Resolver<ResolversTypes['Machine'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CreateItemMutationResponse?: CreateItemMutationResponseResolvers<ContextType>;
  CreateLocationMutationResponse?: CreateLocationMutationResponseResolvers<ContextType>;
  CreateMachineItemMutationResponse?: CreateMachineItemMutationResponseResolvers<ContextType>;
  CreateMachineLocationMutationResponse?: CreateMachineLocationMutationResponseResolvers<ContextType>;
  CreateMachineMutationResponse?: CreateMachineMutationResponseResolvers<ContextType>;
  DeleteItemMutationResponse?: DeleteItemMutationResponseResolvers<ContextType>;
  DeleteLocationMutationResponse?: DeleteLocationMutationResponseResolvers<ContextType>;
  DeleteMachineItemMutationResponse?: DeleteMachineItemMutationResponseResolvers<ContextType>;
  DeleteMachineLocationMutationResponse?: DeleteMachineLocationMutationResponseResolvers<ContextType>;
  DeleteMachineMutationResponse?: DeleteMachineMutationResponseResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Machine?: MachineResolvers<ContextType>;
  MachineItem?: MachineItemResolvers<ContextType>;
  MachineLocation?: MachineLocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdateItemMutationResponse?: UpdateItemMutationResponseResolvers<ContextType>;
  UpdateLocationMutationResponse?: UpdateLocationMutationResponseResolvers<ContextType>;
  UpdateMachineItemsMutationResponse?: UpdateMachineItemsMutationResponseResolvers<ContextType>;
  UpdateMachineLocationMutationResponse?: UpdateMachineLocationMutationResponseResolvers<ContextType>;
  UpdateMachineMutationResponse?: UpdateMachineMutationResponseResolvers<ContextType>;
};

