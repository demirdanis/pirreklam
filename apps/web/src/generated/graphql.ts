import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  GraphQLStringOrFloat: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export enum EventEnum {
  Create = 'create',
  Delete = 'delete',
  Update = 'update'
}

export type Mutation = {
  __typename?: 'Mutation';
  create_main_categories_item?: Maybe<Main_Categories>;
  create_main_categories_items: Array<Main_Categories>;
  create_sub_categories_item?: Maybe<Sub_Categories>;
  create_sub_categories_items: Array<Sub_Categories>;
  delete_main_categories_item?: Maybe<Delete_One>;
  delete_main_categories_items?: Maybe<Delete_Many>;
  delete_sub_categories_item?: Maybe<Delete_One>;
  delete_sub_categories_items?: Maybe<Delete_Many>;
  update_main_categories_batch: Array<Main_Categories>;
  update_main_categories_item?: Maybe<Main_Categories>;
  update_main_categories_items: Array<Main_Categories>;
  update_page__home?: Maybe<Page__Home>;
  update_sub_categories_batch: Array<Sub_Categories>;
  update_sub_categories_item?: Maybe<Sub_Categories>;
  update_sub_categories_items: Array<Sub_Categories>;
};


export type MutationCreate_Main_Categories_ItemArgs = {
  data: Create_Main_Categories_Input;
};


export type MutationCreate_Main_Categories_ItemsArgs = {
  data?: InputMaybe<Array<Create_Main_Categories_Input>>;
  filter?: InputMaybe<Main_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Sub_Categories_ItemArgs = {
  data: Create_Sub_Categories_Input;
};


export type MutationCreate_Sub_Categories_ItemsArgs = {
  data?: InputMaybe<Array<Create_Sub_Categories_Input>>;
  filter?: InputMaybe<Sub_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationDelete_Main_Categories_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Main_Categories_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Sub_Categories_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Sub_Categories_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationUpdate_Main_Categories_BatchArgs = {
  data?: InputMaybe<Array<Update_Main_Categories_Input>>;
  filter?: InputMaybe<Main_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Main_Categories_ItemArgs = {
  data: Update_Main_Categories_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Main_Categories_ItemsArgs = {
  data: Update_Main_Categories_Input;
  filter?: InputMaybe<Main_Categories_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Page__HomeArgs = {
  data: Update_Page__Home_Input;
};


export type MutationUpdate_Sub_Categories_BatchArgs = {
  data?: InputMaybe<Array<Update_Sub_Categories_Input>>;
  filter?: InputMaybe<Sub_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Sub_Categories_ItemArgs = {
  data: Update_Sub_Categories_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Sub_Categories_ItemsArgs = {
  data: Update_Sub_Categories_Input;
  filter?: InputMaybe<Sub_Categories_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Query = {
  __typename?: 'Query';
  main_categories: Array<Main_Categories>;
  main_categories_aggregated: Array<Main_Categories_Aggregated>;
  main_categories_by_id?: Maybe<Main_Categories>;
  main_categories_by_version?: Maybe<Version_Main_Categories>;
  page__home?: Maybe<Page__Home>;
  page__home_by_version?: Maybe<Version_Page__Home>;
  sub_categories: Array<Sub_Categories>;
  sub_categories_aggregated: Array<Sub_Categories_Aggregated>;
  sub_categories_by_id?: Maybe<Sub_Categories>;
  sub_categories_by_version?: Maybe<Version_Sub_Categories>;
};


export type QueryMain_CategoriesArgs = {
  filter?: InputMaybe<Main_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryMain_Categories_AggregatedArgs = {
  filter?: InputMaybe<Main_Categories_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryMain_Categories_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMain_Categories_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryPage__HomeArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPage__Home_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QuerySub_CategoriesArgs = {
  filter?: InputMaybe<Sub_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySub_Categories_AggregatedArgs = {
  filter?: InputMaybe<Sub_Categories_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySub_Categories_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySub_Categories_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  main_categories_mutated?: Maybe<Main_Categories_Mutated>;
  page__home_mutated?: Maybe<Page__Home_Mutated>;
  sub_categories_mutated?: Maybe<Sub_Categories_Mutated>;
};


export type SubscriptionMain_Categories_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPage__Home_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionSub_Categories_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Count_Functions = {
  __typename?: 'count_functions';
  count?: Maybe<Scalars['Int']['output']>;
};

export type Create_Main_Categories_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sub_categories?: InputMaybe<Array<InputMaybe<Create_Sub_Categories_Input>>>;
};

export type Create_Sub_Categories_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  main_categories_id?: InputMaybe<Create_Main_Categories_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type Delete_Many = {
  __typename?: 'delete_many';
  ids: Array<Maybe<Scalars['ID']['output']>>;
};

export type Delete_One = {
  __typename?: 'delete_one';
  id: Scalars['ID']['output'];
};

export type Main_Categories = {
  __typename?: 'main_categories';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sub_categories?: Maybe<Array<Maybe<Sub_Categories>>>;
  sub_categories_func?: Maybe<Count_Functions>;
};


export type Main_CategoriesSub_CategoriesArgs = {
  filter?: InputMaybe<Sub_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Main_Categories_Aggregated = {
  __typename?: 'main_categories_aggregated';
  avg?: Maybe<Main_Categories_Aggregated_Fields>;
  avgDistinct?: Maybe<Main_Categories_Aggregated_Fields>;
  count?: Maybe<Main_Categories_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Main_Categories_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Main_Categories_Aggregated_Fields>;
  min?: Maybe<Main_Categories_Aggregated_Fields>;
  sum?: Maybe<Main_Categories_Aggregated_Fields>;
  sumDistinct?: Maybe<Main_Categories_Aggregated_Fields>;
};

export type Main_Categories_Aggregated_Count = {
  __typename?: 'main_categories_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['Int']['output']>;
  sub_categories?: Maybe<Scalars['Int']['output']>;
};

export type Main_Categories_Aggregated_Fields = {
  __typename?: 'main_categories_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
};

export type Main_Categories_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Main_Categories_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Main_Categories_Filter>>>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
  sub_categories?: InputMaybe<Sub_Categories_Quantifier_Filter>;
  sub_categories_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Main_Categories_Mutated = {
  __typename?: 'main_categories_mutated';
  data?: Maybe<Main_Categories>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Number_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _eq?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _gt?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _gte?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _lt?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _lte?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _neq?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Page__Home = {
  __typename?: 'page__home';
  id: Scalars['ID']['output'];
};

export type Page__Home_Mutated = {
  __typename?: 'page__home_mutated';
  data?: Maybe<Page__Home>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type String_Filter_Operators = {
  _contains?: InputMaybe<Scalars['String']['input']>;
  _empty?: InputMaybe<Scalars['Boolean']['input']>;
  _ends_with?: InputMaybe<Scalars['String']['input']>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _icontains?: InputMaybe<Scalars['String']['input']>;
  _iends_with?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _istarts_with?: InputMaybe<Scalars['String']['input']>;
  _ncontains?: InputMaybe<Scalars['String']['input']>;
  _nempty?: InputMaybe<Scalars['Boolean']['input']>;
  _nends_with?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _niends_with?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _nistarts_with?: InputMaybe<Scalars['String']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _nstarts_with?: InputMaybe<Scalars['String']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
  _starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type Sub_Categories = {
  __typename?: 'sub_categories';
  id: Scalars['ID']['output'];
  main_categories_id?: Maybe<Main_Categories>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};


export type Sub_CategoriesMain_Categories_IdArgs = {
  filter?: InputMaybe<Main_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Sub_Categories_Aggregated = {
  __typename?: 'sub_categories_aggregated';
  avg?: Maybe<Sub_Categories_Aggregated_Fields>;
  avgDistinct?: Maybe<Sub_Categories_Aggregated_Fields>;
  count?: Maybe<Sub_Categories_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Sub_Categories_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Sub_Categories_Aggregated_Fields>;
  min?: Maybe<Sub_Categories_Aggregated_Fields>;
  sum?: Maybe<Sub_Categories_Aggregated_Fields>;
  sumDistinct?: Maybe<Sub_Categories_Aggregated_Fields>;
};

export type Sub_Categories_Aggregated_Count = {
  __typename?: 'sub_categories_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  main_categories_id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['Int']['output']>;
};

export type Sub_Categories_Aggregated_Fields = {
  __typename?: 'sub_categories_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  main_categories_id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
};

export type Sub_Categories_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Sub_Categories_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Sub_Categories_Filter>>>;
  id?: InputMaybe<Number_Filter_Operators>;
  main_categories_id?: InputMaybe<Main_Categories_Filter>;
  name?: InputMaybe<String_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
};

export type Sub_Categories_Mutated = {
  __typename?: 'sub_categories_mutated';
  data?: Maybe<Sub_Categories>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Sub_Categories_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Sub_Categories_Filter>>>;
  _none?: InputMaybe<Sub_Categories_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Sub_Categories_Filter>>>;
  _some?: InputMaybe<Sub_Categories_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  main_categories_id?: InputMaybe<Main_Categories_Filter>;
  name?: InputMaybe<String_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
};

export type Update_Main_Categories_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sub_categories?: InputMaybe<Array<InputMaybe<Update_Sub_Categories_Input>>>;
};

export type Update_Page__Home_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Update_Sub_Categories_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  main_categories_id?: InputMaybe<Update_Main_Categories_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type Version_Main_Categories = {
  __typename?: 'version_main_categories';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sub_categories?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Page__Home = {
  __typename?: 'version_page__home';
  id?: Maybe<Scalars['ID']['output']>;
};

export type Version_Sub_Categories = {
  __typename?: 'version_sub_categories';
  id?: Maybe<Scalars['ID']['output']>;
  main_categories_id?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type GetCategoryBarQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoryBarQuery = { __typename?: 'Query', main_categories: Array<{ __typename?: 'main_categories', id: string, name?: string | null, slug?: string | null, order?: number | null, sub_categories?: Array<{ __typename?: 'sub_categories', name?: string | null, slug?: string | null, order?: number | null } | null> | null }> };


export const GetCategoryBarDocument = gql`
    query GetCategoryBar {
  main_categories {
    id
    name
    slug
    order
    sub_categories {
      name
      slug
      order
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetCategoryBar(variables?: GetCategoryBarQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetCategoryBarQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoryBarQuery>({ document: GetCategoryBarDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetCategoryBar', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;