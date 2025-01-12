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
  basePrice: Scalars['Float']['input'];
  expirationPeriod: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateItemMutationResponse = MutationResponse & {
  __typename?: 'CreateItemMutationResponse';
  code: Scalars['String']['output'];
  item?: Maybe<Item>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateLocationInput = {
  address1: Scalars['String']['input'];
  address2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  stateOrProvince: Scalars['String']['input'];
};

export type CreateLocationMutationResponse = MutationResponse & {
  __typename?: 'CreateLocationMutationResponse';
  code: Scalars['String']['output'];
  location?: Maybe<Location>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMachineInput = {
  machineTypeId: Scalars['ID']['input'];
  manufacturerId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CreateMachineItemInput = {
  itemId: Scalars['ID']['input'];
  machineId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Int']['input'];
  setPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateMachineItemMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineItemMutationResponse';
  code: Scalars['String']['output'];
  machineItem?: Maybe<MachineItem>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
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
  machineLocation?: Maybe<MachineLocation>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMachineManufacturerInput = {
  name: Scalars['String']['input'];
};

export type CreateMachineManufacturerMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineManufacturerMutationResponse';
  code: Scalars['String']['output'];
  manufacturer?: Maybe<MachineManufacturer>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMachineMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineMutationResponse';
  code: Scalars['String']['output'];
  machine?: Maybe<Machine>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateMachineTypeInput = {
  manufacturerId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CreateMachineTypeMutationResponse = MutationResponse & {
  __typename?: 'CreateMachineTypeMutationResponse';
  code: Scalars['String']['output'];
  machineType?: Maybe<MachineType>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteItemMutationResponse = MutationResponse & {
  __typename?: 'DeleteItemMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteLocationMutationResponse = MutationResponse & {
  __typename?: 'DeleteLocationMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineItemMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineItemMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineLocationMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineLocationMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineManufacturerMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineManufacturerMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMachineTypeMutationResponse = MutationResponse & {
  __typename?: 'DeleteMachineTypeMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Item = {
  __typename?: 'Item';
  /** Default price if no specific pricing policy exists */
  basePrice?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Expected shelf life, in days, of newly purchased items */
  expirationPeriod?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  machineItems?: Maybe<Array<Maybe<MachineItem>>>;
  /** Name of the item */
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
  postalCode: Scalars['String']['output'];
  stateOrProvince: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Machine = {
  __typename?: 'Machine';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  machineItems?: Maybe<Array<Maybe<MachineItem>>>;
  machineLocations?: Maybe<Array<Maybe<MachineLocation>>>;
  machineType?: Maybe<MachineType>;
  manufacturer?: Maybe<MachineManufacturer>;
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
  /** Optional override for item name in specific machine */
  name?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
};

export type MachineLocation = {
  __typename?: 'MachineLocation';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Location>;
  locationId: Scalars['ID']['output'];
  machine?: Maybe<Machine>;
  machineId: Scalars['ID']['output'];
  /** Optional display name for this machine-location pairing */
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type MachineManufacturer = {
  __typename?: 'MachineManufacturer';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  machineTypes?: Maybe<Array<Maybe<MachineType>>>;
  machines?: Maybe<Array<Maybe<Machine>>>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type MachineType = {
  __typename?: 'MachineType';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  machines?: Maybe<Array<Maybe<Machine>>>;
  manufacturer: MachineManufacturer;
  manufacturerId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: CreateItemMutationResponse;
  createLocation: CreateLocationMutationResponse;
  createMachine: CreateMachineMutationResponse;
  createMachineItem: CreateMachineItemMutationResponse;
  /** Assign a Machine to a Location */
  createMachineLocation: CreateMachineLocationMutationResponse;
  createMachineManufacturer: CreateMachineManufacturerMutationResponse;
  /** Assign a Machine to a Type */
  createMachineType: CreateMachineTypeMutationResponse;
  deleteItem: DeleteItemMutationResponse;
  deleteLocation: DeleteLocationMutationResponse;
  deleteMachine: DeleteMachineMutationResponse;
  deleteMachineItem: DeleteMachineItemMutationResponse;
  /** Delete a MachineLocation relation */
  deleteMachineLocation: DeleteMachineLocationMutationResponse;
  deleteMachineManufacturer: DeleteMachineManufacturerMutationResponse;
  /** Delete a MachineType relation */
  deleteMachineType: DeleteMachineTypeMutationResponse;
  updateItem: UpdateItemMutationResponse;
  updateLocation: UpdateLocationMutationResponse;
  updateMachine: CreateMachineMutationResponse;
  updateMachineItems: UpdateMachineItemsMutationResponse;
  /** Update a MachineLocation relation */
  updateMachineLocation: UpdateMachineLocationMutationResponse;
  updateMachineManufacturer: UpdateMachineManufacturerMutationResponse;
  /** Update a MachineType relation */
  updateMachineType: UpdateMachineTypeMutationResponse;
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


export type MutationCreateMachineManufacturerArgs = {
  input: CreateMachineManufacturerInput;
};


export type MutationCreateMachineTypeArgs = {
  input: CreateMachineTypeInput;
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


export type MutationDeleteMachineManufacturerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMachineTypeArgs = {
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


export type MutationUpdateMachineManufacturerArgs = {
  input: UpdateMachineManufacturerInput;
};


export type MutationUpdateMachineTypeArgs = {
  input: UpdateMachineTypeInput;
};

export type MutationResponse = {
  /** HTTP-style response code */
  code: Scalars['String']['output'];
  /** Human-readable status message */
  message: Scalars['String']['output'];
  /** If ACL permission was denied for this operation */
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  /** Operation success indicator */
  success: Scalars['Boolean']['output'];
};

export enum Permission {
  CreateItems = 'CREATE_ITEMS',
  CreateMachines = 'CREATE_MACHINES',
  DeleteItems = 'DELETE_ITEMS',
  DeleteMachines = 'DELETE_MACHINES',
  ManageLocations = 'MANAGE_LOCATIONS',
  ManageMachineTypes = 'MANAGE_MACHINE_TYPES',
  ManageManufacturers = 'MANAGE_MANUFACTURERS',
  ReadItems = 'READ_ITEMS',
  ReadLocations = 'READ_LOCATIONS',
  ReadMachines = 'READ_MACHINES',
  UpdateItems = 'UPDATE_ITEMS',
  UpdateMachines = 'UPDATE_MACHINES',
  UpdateMachineItems = 'UPDATE_MACHINE_ITEMS',
  UpdateMachinePrices = 'UPDATE_MACHINE_PRICES'
}

export type Query = {
  __typename?: 'Query';
  /** Get all Items, from everywhere */
  getItems?: Maybe<Array<Maybe<Item>>>;
  /** Get Items in a specific Machine */
  getItemsByMachine?: Maybe<Array<MachineItem>>;
  /** Get all Locations, from everywhere */
  getLocations?: Maybe<Array<Maybe<Location>>>;
  /** Get Locations stocking a specific Item */
  getLocationsByItem?: Maybe<Array<Location>>;
  /** Get Locations with a Machine matching a name (case insensitive) */
  getLocationsByMachineName: Array<Location>;
  getMachine?: Maybe<Machine>;
  /** Get all MachineItems, from everywhere */
  getMachineItems?: Maybe<Array<Maybe<MachineItem>>>;
  /** Get all MachineLocations */
  getMachineLocations?: Maybe<Array<MachineLocation>>;
  /** Get a MachineManufacturer by ID */
  getMachineManufacturer?: Maybe<MachineManufacturer>;
  /** Get all MachineManufacturers */
  getMachineManufacturers: Array<MachineManufacturer>;
  /** Get a MachineType by ID */
  getMachineType?: Maybe<MachineType>;
  /** Get all MachineTypes */
  getMachineTypes: Array<MachineType>;
  /** Get all Machines, from everywhere */
  getMachines?: Maybe<Array<Maybe<Machine>>>;
  /** Get all Machines stocking a specific Item */
  getMachinesByItem?: Maybe<Array<MachineItem>>;
  /** Get Machines at a specific Location */
  getMachinesByLocation?: Maybe<Array<Machine>>;
};


export type QueryGetItemsByMachineArgs = {
  machineId: Scalars['ID']['input'];
};


export type QueryGetLocationsByItemArgs = {
  itemId: Scalars['ID']['input'];
};


export type QueryGetLocationsByMachineNameArgs = {
  machineName: Scalars['String']['input'];
};


export type QueryGetMachineArgs = {
  machineId: Scalars['ID']['input'];
};


export type QueryGetMachineManufacturerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMachineTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMachinesByItemArgs = {
  itemId: Scalars['ID']['input'];
};


export type QueryGetMachinesByLocationArgs = {
  locationId: Scalars['ID']['input'];
};

export enum Role {
  Administrator = 'ADMINISTRATOR',
  Operator = 'OPERATOR',
  Technician = 'TECHNICIAN'
}

export type UpdateItemInput = {
  basePrice?: InputMaybe<Scalars['Float']['input']>;
  expirationPeriod?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateItemMutationResponse = MutationResponse & {
  __typename?: 'UpdateItemMutationResponse';
  code: Scalars['String']['output'];
  item?: Maybe<Item>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateLocationInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  postalCode: Scalars['String']['input'];
  stateOrProvince?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLocationMutationResponse = MutationResponse & {
  __typename?: 'UpdateLocationMutationResponse';
  code: Scalars['String']['output'];
  location?: Maybe<Location>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMachineInput = {
  id: Scalars['ID']['input'];
  machineTypeId?: InputMaybe<Scalars['ID']['input']>;
  manufacturerId?: InputMaybe<Scalars['ID']['input']>;
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
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
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
  machineLocation?: Maybe<MachineLocation>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMachineManufacturerInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateMachineManufacturerMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineManufacturerMutationResponse';
  code: Scalars['String']['output'];
  manufacturer?: Maybe<MachineManufacturer>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMachineMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineMutationResponse';
  code: Scalars['String']['output'];
  machine?: Maybe<Machine>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMachineTypeInput = {
  id: Scalars['ID']['input'];
  manufacturerId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMachineTypeMutationResponse = MutationResponse & {
  __typename?: 'UpdateMachineTypeMutationResponse';
  code: Scalars['String']['output'];
  machineType?: Maybe<MachineType>;
  message: Scalars['String']['output'];
  permissionDenied?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['String']['output'];
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
  MutationResponse: ( CreateItemMutationResponse ) | ( CreateLocationMutationResponse ) | ( CreateMachineItemMutationResponse ) | ( CreateMachineLocationMutationResponse ) | ( CreateMachineManufacturerMutationResponse ) | ( CreateMachineMutationResponse ) | ( CreateMachineTypeMutationResponse ) | ( DeleteItemMutationResponse ) | ( DeleteLocationMutationResponse ) | ( DeleteMachineItemMutationResponse ) | ( DeleteMachineLocationMutationResponse ) | ( DeleteMachineManufacturerMutationResponse ) | ( DeleteMachineMutationResponse ) | ( DeleteMachineTypeMutationResponse ) | ( UpdateItemMutationResponse ) | ( UpdateLocationMutationResponse ) | ( UpdateMachineItemsMutationResponse ) | ( UpdateMachineLocationMutationResponse ) | ( UpdateMachineManufacturerMutationResponse ) | ( UpdateMachineMutationResponse ) | ( UpdateMachineTypeMutationResponse );
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
  CreateMachineManufacturerInput: CreateMachineManufacturerInput;
  CreateMachineManufacturerMutationResponse: ResolverTypeWrapper<CreateMachineManufacturerMutationResponse>;
  CreateMachineMutationResponse: ResolverTypeWrapper<CreateMachineMutationResponse>;
  CreateMachineTypeInput: CreateMachineTypeInput;
  CreateMachineTypeMutationResponse: ResolverTypeWrapper<CreateMachineTypeMutationResponse>;
  DeleteItemMutationResponse: ResolverTypeWrapper<DeleteItemMutationResponse>;
  DeleteLocationMutationResponse: ResolverTypeWrapper<DeleteLocationMutationResponse>;
  DeleteMachineItemMutationResponse: ResolverTypeWrapper<DeleteMachineItemMutationResponse>;
  DeleteMachineLocationMutationResponse: ResolverTypeWrapper<DeleteMachineLocationMutationResponse>;
  DeleteMachineManufacturerMutationResponse: ResolverTypeWrapper<DeleteMachineManufacturerMutationResponse>;
  DeleteMachineMutationResponse: ResolverTypeWrapper<DeleteMachineMutationResponse>;
  DeleteMachineTypeMutationResponse: ResolverTypeWrapper<DeleteMachineTypeMutationResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Item: ResolverTypeWrapper<Item>;
  Location: ResolverTypeWrapper<Location>;
  Machine: ResolverTypeWrapper<Machine>;
  MachineItem: ResolverTypeWrapper<MachineItem>;
  MachineLocation: ResolverTypeWrapper<MachineLocation>;
  MachineManufacturer: ResolverTypeWrapper<MachineManufacturer>;
  MachineType: ResolverTypeWrapper<MachineType>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationResponse']>;
  Permission: Permission;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
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
  UpdateMachineManufacturerInput: UpdateMachineManufacturerInput;
  UpdateMachineManufacturerMutationResponse: ResolverTypeWrapper<UpdateMachineManufacturerMutationResponse>;
  UpdateMachineMutationResponse: ResolverTypeWrapper<UpdateMachineMutationResponse>;
  UpdateMachineTypeInput: UpdateMachineTypeInput;
  UpdateMachineTypeMutationResponse: ResolverTypeWrapper<UpdateMachineTypeMutationResponse>;
  User: ResolverTypeWrapper<User>;
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
  CreateMachineManufacturerInput: CreateMachineManufacturerInput;
  CreateMachineManufacturerMutationResponse: CreateMachineManufacturerMutationResponse;
  CreateMachineMutationResponse: CreateMachineMutationResponse;
  CreateMachineTypeInput: CreateMachineTypeInput;
  CreateMachineTypeMutationResponse: CreateMachineTypeMutationResponse;
  DeleteItemMutationResponse: DeleteItemMutationResponse;
  DeleteLocationMutationResponse: DeleteLocationMutationResponse;
  DeleteMachineItemMutationResponse: DeleteMachineItemMutationResponse;
  DeleteMachineLocationMutationResponse: DeleteMachineLocationMutationResponse;
  DeleteMachineManufacturerMutationResponse: DeleteMachineManufacturerMutationResponse;
  DeleteMachineMutationResponse: DeleteMachineMutationResponse;
  DeleteMachineTypeMutationResponse: DeleteMachineTypeMutationResponse;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Item: Item;
  Location: Location;
  Machine: Machine;
  MachineItem: MachineItem;
  MachineLocation: MachineLocation;
  MachineManufacturer: MachineManufacturer;
  MachineType: MachineType;
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
  UpdateMachineManufacturerInput: UpdateMachineManufacturerInput;
  UpdateMachineManufacturerMutationResponse: UpdateMachineManufacturerMutationResponse;
  UpdateMachineMutationResponse: UpdateMachineMutationResponse;
  UpdateMachineTypeInput: UpdateMachineTypeInput;
  UpdateMachineTypeMutationResponse: UpdateMachineTypeMutationResponse;
  User: User;
};

export type RequirePermissionDirectiveArgs = {
  permission: Permission;
};

export type RequirePermissionDirectiveResolver<Result, Parent, ContextType = any, Args = RequirePermissionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CreateItemMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateItemMutationResponse'] = ResolversParentTypes['CreateItemMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateLocationMutationResponse'] = ResolversParentTypes['CreateLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineItemMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMachineItemMutationResponse'] = ResolversParentTypes['CreateMachineItemMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineItem?: Resolver<Maybe<ResolversTypes['MachineItem']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMachineLocationMutationResponse'] = ResolversParentTypes['CreateMachineLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineLocation?: Resolver<Maybe<ResolversTypes['MachineLocation']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineManufacturerMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMachineManufacturerMutationResponse'] = ResolversParentTypes['CreateMachineManufacturerMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['MachineManufacturer']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMachineMutationResponse'] = ResolversParentTypes['CreateMachineMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMachineTypeMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMachineTypeMutationResponse'] = ResolversParentTypes['CreateMachineTypeMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineType?: Resolver<Maybe<ResolversTypes['MachineType']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteItemMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteItemMutationResponse'] = ResolversParentTypes['DeleteItemMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteLocationMutationResponse'] = ResolversParentTypes['DeleteLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineItemMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMachineItemMutationResponse'] = ResolversParentTypes['DeleteMachineItemMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMachineLocationMutationResponse'] = ResolversParentTypes['DeleteMachineLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineManufacturerMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMachineManufacturerMutationResponse'] = ResolversParentTypes['DeleteMachineManufacturerMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMachineMutationResponse'] = ResolversParentTypes['DeleteMachineMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMachineTypeMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMachineTypeMutationResponse'] = ResolversParentTypes['DeleteMachineTypeMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  basePrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationPeriod?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stateOrProvince?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineResolvers<ContextType = any, ParentType extends ResolversParentTypes['Machine'] = ResolversParentTypes['Machine']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineItem']>>>, ParentType, ContextType>;
  machineLocations?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineLocation']>>>, ParentType, ContextType>;
  machineType?: Resolver<Maybe<ResolversTypes['MachineType']>, ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['MachineManufacturer']>, ParentType, ContextType>;
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
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineLocation'] = ResolversParentTypes['MachineLocation']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  locationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  machineId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineManufacturerResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineManufacturer'] = ResolversParentTypes['MachineManufacturer']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineType']>>>, ParentType, ContextType>;
  machines?: Resolver<Maybe<Array<Maybe<ResolversTypes['Machine']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineType'] = ResolversParentTypes['MachineType']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machines?: Resolver<Maybe<Array<Maybe<ResolversTypes['Machine']>>>, ParentType, ContextType>;
  manufacturer?: Resolver<ResolversTypes['MachineManufacturer'], ParentType, ContextType>;
  manufacturerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createItem?: Resolver<ResolversTypes['CreateItemMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateItemArgs, 'input'>>;
  createLocation?: Resolver<ResolversTypes['CreateLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateLocationArgs, 'input'>>;
  createMachine?: Resolver<ResolversTypes['CreateMachineMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateMachineArgs, 'input'>>;
  createMachineItem?: Resolver<ResolversTypes['CreateMachineItemMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateMachineItemArgs, 'input'>>;
  createMachineLocation?: Resolver<ResolversTypes['CreateMachineLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateMachineLocationArgs, 'input'>>;
  createMachineManufacturer?: Resolver<ResolversTypes['CreateMachineManufacturerMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateMachineManufacturerArgs, 'input'>>;
  createMachineType?: Resolver<ResolversTypes['CreateMachineTypeMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateMachineTypeArgs, 'input'>>;
  deleteItem?: Resolver<ResolversTypes['DeleteItemMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteItemArgs, 'id'>>;
  deleteLocation?: Resolver<ResolversTypes['DeleteLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteLocationArgs, 'id'>>;
  deleteMachine?: Resolver<ResolversTypes['DeleteMachineMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteMachineArgs, 'id'>>;
  deleteMachineItem?: Resolver<ResolversTypes['DeleteMachineItemMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteMachineItemArgs, 'id'>>;
  deleteMachineLocation?: Resolver<ResolversTypes['DeleteMachineLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteMachineLocationArgs, 'id'>>;
  deleteMachineManufacturer?: Resolver<ResolversTypes['DeleteMachineManufacturerMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteMachineManufacturerArgs, 'id'>>;
  deleteMachineType?: Resolver<ResolversTypes['DeleteMachineTypeMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteMachineTypeArgs, 'id'>>;
  updateItem?: Resolver<ResolversTypes['UpdateItemMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'input'>>;
  updateLocation?: Resolver<ResolversTypes['UpdateLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateLocationArgs, 'input'>>;
  updateMachine?: Resolver<ResolversTypes['CreateMachineMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateMachineArgs, 'input'>>;
  updateMachineItems?: Resolver<ResolversTypes['UpdateMachineItemsMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateMachineItemsArgs, 'input'>>;
  updateMachineLocation?: Resolver<ResolversTypes['UpdateMachineLocationMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateMachineLocationArgs, 'input'>>;
  updateMachineManufacturer?: Resolver<ResolversTypes['UpdateMachineManufacturerMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateMachineManufacturerArgs, 'input'>>;
  updateMachineType?: Resolver<ResolversTypes['UpdateMachineTypeMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateMachineTypeArgs, 'input'>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'CreateItemMutationResponse' | 'CreateLocationMutationResponse' | 'CreateMachineItemMutationResponse' | 'CreateMachineLocationMutationResponse' | 'CreateMachineManufacturerMutationResponse' | 'CreateMachineMutationResponse' | 'CreateMachineTypeMutationResponse' | 'DeleteItemMutationResponse' | 'DeleteLocationMutationResponse' | 'DeleteMachineItemMutationResponse' | 'DeleteMachineLocationMutationResponse' | 'DeleteMachineManufacturerMutationResponse' | 'DeleteMachineMutationResponse' | 'DeleteMachineTypeMutationResponse' | 'UpdateItemMutationResponse' | 'UpdateLocationMutationResponse' | 'UpdateMachineItemsMutationResponse' | 'UpdateMachineLocationMutationResponse' | 'UpdateMachineManufacturerMutationResponse' | 'UpdateMachineMutationResponse' | 'UpdateMachineTypeMutationResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  getItemsByMachine?: Resolver<Maybe<Array<ResolversTypes['MachineItem']>>, ParentType, ContextType, RequireFields<QueryGetItemsByMachineArgs, 'machineId'>>;
  getLocations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Location']>>>, ParentType, ContextType>;
  getLocationsByItem?: Resolver<Maybe<Array<ResolversTypes['Location']>>, ParentType, ContextType, RequireFields<QueryGetLocationsByItemArgs, 'itemId'>>;
  getLocationsByMachineName?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<QueryGetLocationsByMachineNameArgs, 'machineName'>>;
  getMachine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType, RequireFields<QueryGetMachineArgs, 'machineId'>>;
  getMachineItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineItem']>>>, ParentType, ContextType>;
  getMachineLocations?: Resolver<Maybe<Array<ResolversTypes['MachineLocation']>>, ParentType, ContextType>;
  getMachineManufacturer?: Resolver<Maybe<ResolversTypes['MachineManufacturer']>, ParentType, ContextType, RequireFields<QueryGetMachineManufacturerArgs, 'id'>>;
  getMachineManufacturers?: Resolver<Array<ResolversTypes['MachineManufacturer']>, ParentType, ContextType>;
  getMachineType?: Resolver<Maybe<ResolversTypes['MachineType']>, ParentType, ContextType, RequireFields<QueryGetMachineTypeArgs, 'id'>>;
  getMachineTypes?: Resolver<Array<ResolversTypes['MachineType']>, ParentType, ContextType>;
  getMachines?: Resolver<Maybe<Array<Maybe<ResolversTypes['Machine']>>>, ParentType, ContextType>;
  getMachinesByItem?: Resolver<Maybe<Array<ResolversTypes['MachineItem']>>, ParentType, ContextType, RequireFields<QueryGetMachinesByItemArgs, 'itemId'>>;
  getMachinesByLocation?: Resolver<Maybe<Array<ResolversTypes['Machine']>>, ParentType, ContextType, RequireFields<QueryGetMachinesByLocationArgs, 'locationId'>>;
};

export type UpdateItemMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateItemMutationResponse'] = ResolversParentTypes['UpdateItemMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateLocationMutationResponse'] = ResolversParentTypes['UpdateLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineItemsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMachineItemsMutationResponse'] = ResolversParentTypes['UpdateMachineItemsMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MachineItem']>>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineLocationMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMachineLocationMutationResponse'] = ResolversParentTypes['UpdateMachineLocationMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineLocation?: Resolver<Maybe<ResolversTypes['MachineLocation']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineManufacturerMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMachineManufacturerMutationResponse'] = ResolversParentTypes['UpdateMachineManufacturerMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  manufacturer?: Resolver<Maybe<ResolversTypes['MachineManufacturer']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMachineMutationResponse'] = ResolversParentTypes['UpdateMachineMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMachineTypeMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMachineTypeMutationResponse'] = ResolversParentTypes['UpdateMachineTypeMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineType?: Resolver<Maybe<ResolversTypes['MachineType']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissionDenied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CreateItemMutationResponse?: CreateItemMutationResponseResolvers<ContextType>;
  CreateLocationMutationResponse?: CreateLocationMutationResponseResolvers<ContextType>;
  CreateMachineItemMutationResponse?: CreateMachineItemMutationResponseResolvers<ContextType>;
  CreateMachineLocationMutationResponse?: CreateMachineLocationMutationResponseResolvers<ContextType>;
  CreateMachineManufacturerMutationResponse?: CreateMachineManufacturerMutationResponseResolvers<ContextType>;
  CreateMachineMutationResponse?: CreateMachineMutationResponseResolvers<ContextType>;
  CreateMachineTypeMutationResponse?: CreateMachineTypeMutationResponseResolvers<ContextType>;
  DeleteItemMutationResponse?: DeleteItemMutationResponseResolvers<ContextType>;
  DeleteLocationMutationResponse?: DeleteLocationMutationResponseResolvers<ContextType>;
  DeleteMachineItemMutationResponse?: DeleteMachineItemMutationResponseResolvers<ContextType>;
  DeleteMachineLocationMutationResponse?: DeleteMachineLocationMutationResponseResolvers<ContextType>;
  DeleteMachineManufacturerMutationResponse?: DeleteMachineManufacturerMutationResponseResolvers<ContextType>;
  DeleteMachineMutationResponse?: DeleteMachineMutationResponseResolvers<ContextType>;
  DeleteMachineTypeMutationResponse?: DeleteMachineTypeMutationResponseResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Machine?: MachineResolvers<ContextType>;
  MachineItem?: MachineItemResolvers<ContextType>;
  MachineLocation?: MachineLocationResolvers<ContextType>;
  MachineManufacturer?: MachineManufacturerResolvers<ContextType>;
  MachineType?: MachineTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdateItemMutationResponse?: UpdateItemMutationResponseResolvers<ContextType>;
  UpdateLocationMutationResponse?: UpdateLocationMutationResponseResolvers<ContextType>;
  UpdateMachineItemsMutationResponse?: UpdateMachineItemsMutationResponseResolvers<ContextType>;
  UpdateMachineLocationMutationResponse?: UpdateMachineLocationMutationResponseResolvers<ContextType>;
  UpdateMachineManufacturerMutationResponse?: UpdateMachineManufacturerMutationResponseResolvers<ContextType>;
  UpdateMachineMutationResponse?: UpdateMachineMutationResponseResolvers<ContextType>;
  UpdateMachineTypeMutationResponse?: UpdateMachineTypeMutationResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  requirePermission?: RequirePermissionDirectiveResolver<any, any, ContextType>;
};
