import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  eqi?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentCustomiserCustomOption = {
  __typename?: 'ComponentCustomiserCustomOption';
  id: Scalars['ID'];
  models?: Maybe<Array<Maybe<ComponentCustomiserCustomOptionModel>>>;
  name?: Maybe<Scalars['String']>;
};


export type ComponentCustomiserCustomOptionModelsArgs = {
  filters?: InputMaybe<ComponentCustomiserCustomOptionModelFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentCustomiserCustomOptionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCustomiserCustomOptionFiltersInput>>>;
  models?: InputMaybe<ComponentCustomiserCustomOptionModelFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentCustomiserCustomOptionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCustomiserCustomOptionFiltersInput>>>;
};

export type ComponentCustomiserCustomOptionInput = {
  id?: InputMaybe<Scalars['ID']>;
  models?: InputMaybe<Array<InputMaybe<ComponentCustomiserCustomOptionModelInput>>>;
  name?: InputMaybe<Scalars['String']>;
};

export type ComponentCustomiserCustomOptionModel = {
  __typename?: 'ComponentCustomiserCustomOptionModel';
  id: Scalars['ID'];
  model?: Maybe<ModelEntityResponse>;
};

export type ComponentCustomiserCustomOptionModelFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCustomiserCustomOptionModelFiltersInput>>>;
  model?: InputMaybe<ModelFiltersInput>;
  not?: InputMaybe<ComponentCustomiserCustomOptionModelFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCustomiserCustomOptionModelFiltersInput>>>;
};

export type ComponentCustomiserCustomOptionModelInput = {
  id?: InputMaybe<Scalars['ID']>;
  model?: InputMaybe<Scalars['ID']>;
};

export type ComponentCustomiserCustomParts = {
  __typename?: 'ComponentCustomiserCustomParts';
  areaSize?: Maybe<MaterialAreaSizeEntityResponse>;
  id: Scalars['ID'];
  materialGroup?: Maybe<MaterialGroupEntityResponse>;
  modelParts?: Maybe<ModelPartRelationResponseCollection>;
  name?: Maybe<Scalars['String']>;
};


export type ComponentCustomiserCustomPartsModelPartsArgs = {
  filters?: InputMaybe<ModelPartFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentCustomiserCustomPartsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCustomiserCustomPartsFiltersInput>>>;
  areaSize?: InputMaybe<MaterialAreaSizeFiltersInput>;
  materialGroup?: InputMaybe<MaterialGroupFiltersInput>;
  modelParts?: InputMaybe<ModelPartFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentCustomiserCustomPartsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCustomiserCustomPartsFiltersInput>>>;
};

export type ComponentCustomiserCustomPartsInput = {
  areaSize?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  materialGroup?: InputMaybe<Scalars['ID']>;
  modelParts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
};

export type ComponentMaterialMaterialMap = {
  __typename?: 'ComponentMaterialMaterialMap';
  id: Scalars['ID'];
  image: UploadFileEntityResponse;
  mapType?: Maybe<Scalars['String']>;
};

export type ComponentMaterialMaterialMapFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMaterialMaterialMapFiltersInput>>>;
  mapType?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentMaterialMaterialMapFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentMaterialMaterialMapFiltersInput>>>;
};

export type ComponentMaterialMaterialMapInput = {
  id?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<Scalars['ID']>;
  mapType?: InputMaybe<Scalars['String']>;
};

export type CustomDesign = {
  __typename?: 'CustomDesign';
  createdAt?: Maybe<Scalars['DateTime']>;
  customProduct?: Maybe<CustomProductEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CustomDesignEntity = {
  __typename?: 'CustomDesignEntity';
  attributes?: Maybe<CustomDesign>;
  id?: Maybe<Scalars['ID']>;
};

export type CustomDesignEntityResponse = {
  __typename?: 'CustomDesignEntityResponse';
  data?: Maybe<CustomDesignEntity>;
};

export type CustomDesignEntityResponseCollection = {
  __typename?: 'CustomDesignEntityResponseCollection';
  data: Array<CustomDesignEntity>;
  meta: ResponseCollectionMeta;
};

export type CustomDesignFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CustomDesignFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customProduct?: InputMaybe<CustomProductFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CustomDesignFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CustomDesignFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CustomDesignInput = {
  customProduct?: InputMaybe<Scalars['ID']>;
};

export type CustomProduct = {
  __typename?: 'CustomProduct';
  createdAt?: Maybe<Scalars['DateTime']>;
  initPrice?: Maybe<Scalars['String']>;
  initSku?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  options?: Maybe<Array<Maybe<ComponentCustomiserCustomOption>>>;
  parts?: Maybe<Array<Maybe<ComponentCustomiserCustomParts>>>;
  shopifyProductId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type CustomProductOptionsArgs = {
  filters?: InputMaybe<ComponentCustomiserCustomOptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CustomProductPartsArgs = {
  filters?: InputMaybe<ComponentCustomiserCustomPartsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CustomProductEntity = {
  __typename?: 'CustomProductEntity';
  attributes?: Maybe<CustomProduct>;
  id?: Maybe<Scalars['ID']>;
};

export type CustomProductEntityResponse = {
  __typename?: 'CustomProductEntityResponse';
  data?: Maybe<CustomProductEntity>;
};

export type CustomProductEntityResponseCollection = {
  __typename?: 'CustomProductEntityResponseCollection';
  data: Array<CustomProductEntity>;
  meta: ResponseCollectionMeta;
};

export type CustomProductFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CustomProductFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  initPrice?: InputMaybe<StringFilterInput>;
  initSku?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CustomProductFiltersInput>;
  options?: InputMaybe<ComponentCustomiserCustomOptionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CustomProductFiltersInput>>>;
  parts?: InputMaybe<ComponentCustomiserCustomPartsFiltersInput>;
  shopifyProductId?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CustomProductInput = {
  initPrice?: InputMaybe<Scalars['String']>;
  initSku?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<InputMaybe<ComponentCustomiserCustomOptionInput>>>;
  parts?: InputMaybe<Array<InputMaybe<ComponentCustomiserCustomPartsInput>>>;
  shopifyProductId?: InputMaybe<Scalars['String']>;
};

export type CustomProductStyle = {
  __typename?: 'CustomProductStyle';
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CustomProductStyleEntity = {
  __typename?: 'CustomProductStyleEntity';
  attributes?: Maybe<CustomProductStyle>;
  id?: Maybe<Scalars['ID']>;
};

export type CustomProductStyleEntityResponse = {
  __typename?: 'CustomProductStyleEntityResponse';
  data?: Maybe<CustomProductStyleEntity>;
};

export type CustomProductStyleEntityResponseCollection = {
  __typename?: 'CustomProductStyleEntityResponseCollection';
  data: Array<CustomProductStyleEntity>;
  meta: ResponseCollectionMeta;
};

export type CustomProductStyleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CustomProductStyleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CustomProductStyleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CustomProductStyleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CustomProductStyleInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CustomProductType = {
  __typename?: 'CustomProductType';
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CustomProductTypeEntity = {
  __typename?: 'CustomProductTypeEntity';
  attributes?: Maybe<CustomProductType>;
  id?: Maybe<Scalars['ID']>;
};

export type CustomProductTypeEntityResponse = {
  __typename?: 'CustomProductTypeEntityResponse';
  data?: Maybe<CustomProductTypeEntity>;
};

export type CustomProductTypeEntityResponseCollection = {
  __typename?: 'CustomProductTypeEntityResponseCollection';
  data: Array<CustomProductTypeEntity>;
  meta: ResponseCollectionMeta;
};

export type CustomProductTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CustomProductTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CustomProductTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CustomProductTypeFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CustomProductTypeInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  eqi?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  eqi?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type GenericMorph = ComponentCustomiserCustomOption | ComponentCustomiserCustomOptionModel | ComponentCustomiserCustomParts | ComponentMaterialMaterialMap | CustomDesign | CustomProduct | CustomProductStyle | CustomProductType | I18NLocale | Material | MaterialAreaSize | MaterialColourGroup | MaterialGroup | MaterialPrice | MaterialProduct | MaterialType | Model | ModelPart | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  eqi?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  eqi?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  eqi?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Material = {
  __typename?: 'Material';
  colourGroups?: Maybe<MaterialColourGroupRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  images?: Maybe<Array<Maybe<ComponentMaterialMaterialMap>>>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<MaterialPriceEntityResponse>;
  type?: Maybe<MaterialTypeEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type MaterialColourGroupsArgs = {
  filters?: InputMaybe<MaterialColourGroupFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MaterialImagesArgs = {
  filters?: InputMaybe<ComponentMaterialMaterialMapFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MaterialAreaSize = {
  __typename?: 'MaterialAreaSize';
  createdAt?: Maybe<Scalars['DateTime']>;
  materialProducts?: Maybe<MaterialProductRelationResponseCollection>;
  name: Scalars['String'];
  priceAdjust: Scalars['Float'];
  sku: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type MaterialAreaSizeMaterialProductsArgs = {
  filters?: InputMaybe<MaterialProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MaterialAreaSizeEntity = {
  __typename?: 'MaterialAreaSizeEntity';
  attributes?: Maybe<MaterialAreaSize>;
  id?: Maybe<Scalars['ID']>;
};

export type MaterialAreaSizeEntityResponse = {
  __typename?: 'MaterialAreaSizeEntityResponse';
  data?: Maybe<MaterialAreaSizeEntity>;
};

export type MaterialAreaSizeEntityResponseCollection = {
  __typename?: 'MaterialAreaSizeEntityResponseCollection';
  data: Array<MaterialAreaSizeEntity>;
  meta: ResponseCollectionMeta;
};

export type MaterialAreaSizeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MaterialAreaSizeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  materialProducts?: InputMaybe<MaterialProductFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<MaterialAreaSizeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MaterialAreaSizeFiltersInput>>>;
  priceAdjust?: InputMaybe<FloatFilterInput>;
  sku?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MaterialAreaSizeInput = {
  materialProducts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  priceAdjust?: InputMaybe<Scalars['Float']>;
  sku?: InputMaybe<Scalars['String']>;
};

export type MaterialColourGroup = {
  __typename?: 'MaterialColourGroup';
  colour: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MaterialColourGroupEntity = {
  __typename?: 'MaterialColourGroupEntity';
  attributes?: Maybe<MaterialColourGroup>;
  id?: Maybe<Scalars['ID']>;
};

export type MaterialColourGroupEntityResponse = {
  __typename?: 'MaterialColourGroupEntityResponse';
  data?: Maybe<MaterialColourGroupEntity>;
};

export type MaterialColourGroupEntityResponseCollection = {
  __typename?: 'MaterialColourGroupEntityResponseCollection';
  data: Array<MaterialColourGroupEntity>;
  meta: ResponseCollectionMeta;
};

export type MaterialColourGroupFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MaterialColourGroupFiltersInput>>>;
  colour?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<MaterialColourGroupFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MaterialColourGroupFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MaterialColourGroupInput = {
  colour?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type MaterialColourGroupRelationResponseCollection = {
  __typename?: 'MaterialColourGroupRelationResponseCollection';
  data: Array<MaterialColourGroupEntity>;
};

export type MaterialEntity = {
  __typename?: 'MaterialEntity';
  attributes?: Maybe<Material>;
  id?: Maybe<Scalars['ID']>;
};

export type MaterialEntityResponse = {
  __typename?: 'MaterialEntityResponse';
  data?: Maybe<MaterialEntity>;
};

export type MaterialEntityResponseCollection = {
  __typename?: 'MaterialEntityResponseCollection';
  data: Array<MaterialEntity>;
  meta: ResponseCollectionMeta;
};

export type MaterialFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MaterialFiltersInput>>>;
  colourGroups?: InputMaybe<MaterialColourGroupFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  images?: InputMaybe<ComponentMaterialMaterialMapFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<MaterialFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MaterialFiltersInput>>>;
  price?: InputMaybe<MaterialPriceFiltersInput>;
  type?: InputMaybe<MaterialTypeFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MaterialGroup = {
  __typename?: 'MaterialGroup';
  createdAt?: Maybe<Scalars['DateTime']>;
  materialTypes?: Maybe<MaterialTypeRelationResponseCollection>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type MaterialGroupMaterialTypesArgs = {
  filters?: InputMaybe<MaterialTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MaterialGroupEntity = {
  __typename?: 'MaterialGroupEntity';
  attributes?: Maybe<MaterialGroup>;
  id?: Maybe<Scalars['ID']>;
};

export type MaterialGroupEntityResponse = {
  __typename?: 'MaterialGroupEntityResponse';
  data?: Maybe<MaterialGroupEntity>;
};

export type MaterialGroupEntityResponseCollection = {
  __typename?: 'MaterialGroupEntityResponseCollection';
  data: Array<MaterialGroupEntity>;
  meta: ResponseCollectionMeta;
};

export type MaterialGroupFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MaterialGroupFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  materialTypes?: InputMaybe<MaterialTypeFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<MaterialGroupFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MaterialGroupFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MaterialGroupInput = {
  materialTypes?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
};

export type MaterialInput = {
  colourGroups?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  images?: InputMaybe<Array<InputMaybe<ComponentMaterialMaterialMapInput>>>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<Scalars['ID']>;
};

export type MaterialPrice = {
  __typename?: 'MaterialPrice';
  createdAt?: Maybe<Scalars['DateTime']>;
  materialProducts?: Maybe<MaterialProductRelationResponseCollection>;
  name: Scalars['String'];
  price: Scalars['Float'];
  priceValue: Scalars['Int'];
  sku: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type MaterialPriceMaterialProductsArgs = {
  filters?: InputMaybe<MaterialProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MaterialPriceEntity = {
  __typename?: 'MaterialPriceEntity';
  attributes?: Maybe<MaterialPrice>;
  id?: Maybe<Scalars['ID']>;
};

export type MaterialPriceEntityResponse = {
  __typename?: 'MaterialPriceEntityResponse';
  data?: Maybe<MaterialPriceEntity>;
};

export type MaterialPriceEntityResponseCollection = {
  __typename?: 'MaterialPriceEntityResponseCollection';
  data: Array<MaterialPriceEntity>;
  meta: ResponseCollectionMeta;
};

export type MaterialPriceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MaterialPriceFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  materialProducts?: InputMaybe<MaterialProductFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<MaterialPriceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MaterialPriceFiltersInput>>>;
  priceValue?: InputMaybe<IntFilterInput>;
  sku?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MaterialPriceInput = {
  materialProducts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  price: Scalars['Float'];
  priceValue?: InputMaybe<Scalars['Int']>;
  sku?: InputMaybe<Scalars['String']>;
};

export type MaterialProduct = {
  __typename?: 'MaterialProduct';
  createdAt?: Maybe<Scalars['DateTime']>;
  materialAreaSize?: Maybe<MaterialAreaSizeEntityResponse>;
  materialPrice?: Maybe<MaterialPriceEntityResponse>;
  shopifyProductId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MaterialProductEntity = {
  __typename?: 'MaterialProductEntity';
  attributes?: Maybe<MaterialProduct>;
  id?: Maybe<Scalars['ID']>;
};

export type MaterialProductEntityResponse = {
  __typename?: 'MaterialProductEntityResponse';
  data?: Maybe<MaterialProductEntity>;
};

export type MaterialProductEntityResponseCollection = {
  __typename?: 'MaterialProductEntityResponseCollection';
  data: Array<MaterialProductEntity>;
  meta: ResponseCollectionMeta;
};

export type MaterialProductFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MaterialProductFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  materialAreaSize?: InputMaybe<MaterialAreaSizeFiltersInput>;
  materialPrice?: InputMaybe<MaterialPriceFiltersInput>;
  not?: InputMaybe<MaterialProductFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MaterialProductFiltersInput>>>;
  shopifyProductId?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MaterialProductInput = {
  materialAreaSize?: InputMaybe<Scalars['ID']>;
  materialPrice?: InputMaybe<Scalars['ID']>;
  shopifyProductId?: InputMaybe<Scalars['String']>;
};

export type MaterialProductRelationResponseCollection = {
  __typename?: 'MaterialProductRelationResponseCollection';
  data: Array<MaterialProductEntity>;
};

export type MaterialType = {
  __typename?: 'MaterialType';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MaterialTypeEntity = {
  __typename?: 'MaterialTypeEntity';
  attributes?: Maybe<MaterialType>;
  id?: Maybe<Scalars['ID']>;
};

export type MaterialTypeEntityResponse = {
  __typename?: 'MaterialTypeEntityResponse';
  data?: Maybe<MaterialTypeEntity>;
};

export type MaterialTypeEntityResponseCollection = {
  __typename?: 'MaterialTypeEntityResponseCollection';
  data: Array<MaterialTypeEntity>;
  meta: ResponseCollectionMeta;
};

export type MaterialTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MaterialTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<MaterialTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MaterialTypeFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MaterialTypeInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type MaterialTypeRelationResponseCollection = {
  __typename?: 'MaterialTypeRelationResponseCollection';
  data: Array<MaterialTypeEntity>;
};

export type Model = {
  __typename?: 'Model';
  createdAt?: Maybe<Scalars['DateTime']>;
  model?: Maybe<UploadFileEntityResponse>;
  name?: Maybe<Scalars['String']>;
  parts?: Maybe<ModelPartRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ModelPartsArgs = {
  filters?: InputMaybe<ModelPartFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ModelEntity = {
  __typename?: 'ModelEntity';
  attributes?: Maybe<Model>;
  id?: Maybe<Scalars['ID']>;
};

export type ModelEntityResponse = {
  __typename?: 'ModelEntityResponse';
  data?: Maybe<ModelEntity>;
};

export type ModelEntityResponseCollection = {
  __typename?: 'ModelEntityResponseCollection';
  data: Array<ModelEntity>;
  meta: ResponseCollectionMeta;
};

export type ModelFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ModelFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ModelFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ModelFiltersInput>>>;
  parts?: InputMaybe<ModelPartFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ModelInput = {
  model?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  parts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type ModelPart = {
  __typename?: 'ModelPart';
  createdAt?: Maybe<Scalars['DateTime']>;
  model?: Maybe<ModelEntityResponse>;
  nodeId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ModelPartEntity = {
  __typename?: 'ModelPartEntity';
  attributes?: Maybe<ModelPart>;
  id?: Maybe<Scalars['ID']>;
};

export type ModelPartEntityResponse = {
  __typename?: 'ModelPartEntityResponse';
  data?: Maybe<ModelPartEntity>;
};

export type ModelPartEntityResponseCollection = {
  __typename?: 'ModelPartEntityResponseCollection';
  data: Array<ModelPartEntity>;
  meta: ResponseCollectionMeta;
};

export type ModelPartFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ModelPartFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  model?: InputMaybe<ModelFiltersInput>;
  nodeId?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ModelPartFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ModelPartFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ModelPartInput = {
  model?: InputMaybe<Scalars['ID']>;
  nodeId?: InputMaybe<Scalars['String']>;
};

export type ModelPartRelationResponseCollection = {
  __typename?: 'ModelPartRelationResponseCollection';
  data: Array<ModelPartEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createCustomDesign?: Maybe<CustomDesignEntityResponse>;
  createCustomProduct?: Maybe<CustomProductEntityResponse>;
  createCustomProductStyle?: Maybe<CustomProductStyleEntityResponse>;
  createCustomProductType?: Maybe<CustomProductTypeEntityResponse>;
  createMaterial?: Maybe<MaterialEntityResponse>;
  createMaterialAreaSize?: Maybe<MaterialAreaSizeEntityResponse>;
  createMaterialColourGroup?: Maybe<MaterialColourGroupEntityResponse>;
  createMaterialGroup?: Maybe<MaterialGroupEntityResponse>;
  createMaterialPrice?: Maybe<MaterialPriceEntityResponse>;
  createMaterialProduct?: Maybe<MaterialProductEntityResponse>;
  createMaterialType?: Maybe<MaterialTypeEntityResponse>;
  createModel?: Maybe<ModelEntityResponse>;
  createModelPart?: Maybe<ModelPartEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteCustomDesign?: Maybe<CustomDesignEntityResponse>;
  deleteCustomProduct?: Maybe<CustomProductEntityResponse>;
  deleteCustomProductStyle?: Maybe<CustomProductStyleEntityResponse>;
  deleteCustomProductType?: Maybe<CustomProductTypeEntityResponse>;
  deleteMaterial?: Maybe<MaterialEntityResponse>;
  deleteMaterialAreaSize?: Maybe<MaterialAreaSizeEntityResponse>;
  deleteMaterialColourGroup?: Maybe<MaterialColourGroupEntityResponse>;
  deleteMaterialGroup?: Maybe<MaterialGroupEntityResponse>;
  deleteMaterialPrice?: Maybe<MaterialPriceEntityResponse>;
  deleteMaterialProduct?: Maybe<MaterialProductEntityResponse>;
  deleteMaterialType?: Maybe<MaterialTypeEntityResponse>;
  deleteModel?: Maybe<ModelEntityResponse>;
  deleteModelPart?: Maybe<ModelPartEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateCustomDesign?: Maybe<CustomDesignEntityResponse>;
  updateCustomProduct?: Maybe<CustomProductEntityResponse>;
  updateCustomProductStyle?: Maybe<CustomProductStyleEntityResponse>;
  updateCustomProductType?: Maybe<CustomProductTypeEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateMaterial?: Maybe<MaterialEntityResponse>;
  updateMaterialAreaSize?: Maybe<MaterialAreaSizeEntityResponse>;
  updateMaterialColourGroup?: Maybe<MaterialColourGroupEntityResponse>;
  updateMaterialGroup?: Maybe<MaterialGroupEntityResponse>;
  updateMaterialPrice?: Maybe<MaterialPriceEntityResponse>;
  updateMaterialProduct?: Maybe<MaterialProductEntityResponse>;
  updateMaterialType?: Maybe<MaterialTypeEntityResponse>;
  updateModel?: Maybe<ModelEntityResponse>;
  updateModelPart?: Maybe<ModelPartEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationCreateCustomDesignArgs = {
  data: CustomDesignInput;
};


export type MutationCreateCustomProductArgs = {
  data: CustomProductInput;
};


export type MutationCreateCustomProductStyleArgs = {
  data: CustomProductStyleInput;
};


export type MutationCreateCustomProductTypeArgs = {
  data: CustomProductTypeInput;
};


export type MutationCreateMaterialArgs = {
  data: MaterialInput;
};


export type MutationCreateMaterialAreaSizeArgs = {
  data: MaterialAreaSizeInput;
};


export type MutationCreateMaterialColourGroupArgs = {
  data: MaterialColourGroupInput;
};


export type MutationCreateMaterialGroupArgs = {
  data: MaterialGroupInput;
};


export type MutationCreateMaterialPriceArgs = {
  data: MaterialPriceInput;
};


export type MutationCreateMaterialProductArgs = {
  data: MaterialProductInput;
};


export type MutationCreateMaterialTypeArgs = {
  data: MaterialTypeInput;
};


export type MutationCreateModelArgs = {
  data: ModelInput;
};


export type MutationCreateModelPartArgs = {
  data: ModelPartInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteCustomDesignArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCustomProductArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCustomProductStyleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCustomProductTypeArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMaterialArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMaterialAreaSizeArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMaterialColourGroupArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMaterialGroupArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMaterialPriceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMaterialProductArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMaterialTypeArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteModelArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteModelPartArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateCustomDesignArgs = {
  data: CustomDesignInput;
  id: Scalars['ID'];
};


export type MutationUpdateCustomProductArgs = {
  data: CustomProductInput;
  id: Scalars['ID'];
};


export type MutationUpdateCustomProductStyleArgs = {
  data: CustomProductStyleInput;
  id: Scalars['ID'];
};


export type MutationUpdateCustomProductTypeArgs = {
  data: CustomProductTypeInput;
  id: Scalars['ID'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateMaterialArgs = {
  data: MaterialInput;
  id: Scalars['ID'];
};


export type MutationUpdateMaterialAreaSizeArgs = {
  data: MaterialAreaSizeInput;
  id: Scalars['ID'];
};


export type MutationUpdateMaterialColourGroupArgs = {
  data: MaterialColourGroupInput;
  id: Scalars['ID'];
};


export type MutationUpdateMaterialGroupArgs = {
  data: MaterialGroupInput;
  id: Scalars['ID'];
};


export type MutationUpdateMaterialPriceArgs = {
  data: MaterialPriceInput;
  id: Scalars['ID'];
};


export type MutationUpdateMaterialProductArgs = {
  data: MaterialProductInput;
  id: Scalars['ID'];
};


export type MutationUpdateMaterialTypeArgs = {
  data: MaterialTypeInput;
  id: Scalars['ID'];
};


export type MutationUpdateModelArgs = {
  data: ModelInput;
  id: Scalars['ID'];
};


export type MutationUpdateModelPartArgs = {
  data: ModelPartInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  customDesign?: Maybe<CustomDesignEntityResponse>;
  customDesigns?: Maybe<CustomDesignEntityResponseCollection>;
  customProduct?: Maybe<CustomProductEntityResponse>;
  customProductByShopifyId?: Maybe<CustomProductEntityResponse>;
  customProductStyle?: Maybe<CustomProductStyleEntityResponse>;
  customProductStyles?: Maybe<CustomProductStyleEntityResponseCollection>;
  customProductType?: Maybe<CustomProductTypeEntityResponse>;
  customProductTypes?: Maybe<CustomProductTypeEntityResponseCollection>;
  customProducts?: Maybe<CustomProductEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  material?: Maybe<MaterialEntityResponse>;
  materialAreaSize?: Maybe<MaterialAreaSizeEntityResponse>;
  materialAreaSizes?: Maybe<MaterialAreaSizeEntityResponseCollection>;
  materialColourGroup?: Maybe<MaterialColourGroupEntityResponse>;
  materialColourGroups?: Maybe<MaterialColourGroupEntityResponseCollection>;
  materialGroup?: Maybe<MaterialGroupEntityResponse>;
  materialGroups?: Maybe<MaterialGroupEntityResponseCollection>;
  materialPrice?: Maybe<MaterialPriceEntityResponse>;
  materialPrices?: Maybe<MaterialPriceEntityResponseCollection>;
  materialProduct?: Maybe<MaterialProductEntityResponse>;
  materialProducts?: Maybe<MaterialProductEntityResponseCollection>;
  materialType?: Maybe<MaterialTypeEntityResponse>;
  materialTypes?: Maybe<MaterialTypeEntityResponseCollection>;
  materials?: Maybe<MaterialEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  model?: Maybe<ModelEntityResponse>;
  modelPart?: Maybe<ModelPartEntityResponse>;
  modelParts?: Maybe<ModelPartEntityResponseCollection>;
  models?: Maybe<ModelEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryCustomDesignArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryCustomDesignsArgs = {
  filters?: InputMaybe<CustomDesignFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCustomProductArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryCustomProductByShopifyIdArgs = {
  id: Scalars['String'];
};


export type QueryCustomProductStyleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryCustomProductStylesArgs = {
  filters?: InputMaybe<CustomProductStyleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCustomProductTypeArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryCustomProductTypesArgs = {
  filters?: InputMaybe<CustomProductTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCustomProductsArgs = {
  filters?: InputMaybe<CustomProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMaterialArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMaterialAreaSizeArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMaterialAreaSizesArgs = {
  filters?: InputMaybe<MaterialAreaSizeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMaterialColourGroupArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMaterialColourGroupsArgs = {
  filters?: InputMaybe<MaterialColourGroupFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMaterialGroupArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMaterialGroupsArgs = {
  filters?: InputMaybe<MaterialGroupFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMaterialPriceArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMaterialPricesArgs = {
  filters?: InputMaybe<MaterialPriceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMaterialProductArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMaterialProductsArgs = {
  filters?: InputMaybe<MaterialProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMaterialTypeArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMaterialTypesArgs = {
  filters?: InputMaybe<MaterialTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMaterialsArgs = {
  filters?: InputMaybe<MaterialFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryModelArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryModelPartArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryModelPartsArgs = {
  filters?: InputMaybe<ModelPartFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryModelsArgs = {
  filters?: InputMaybe<ModelFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  eqi?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Scalars['ID']>;
  folderPath?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String'];
  pathId: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  pathId?: InputMaybe<Scalars['Int']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type CustomProductFragmentFragment = { __typename?: 'CustomProductEntityResponse', data?: { __typename?: 'CustomProductEntity', id?: string | null, attributes?: { __typename?: 'CustomProduct', name: string, shopifyProductId?: string | null, initPrice?: string | null, initSku?: string | null, options?: Array<{ __typename?: 'ComponentCustomiserCustomOption', id: string, name?: string | null, models?: Array<{ __typename?: 'ComponentCustomiserCustomOptionModel', id: string, model?: { __typename?: 'ModelEntityResponse', data?: { __typename?: 'ModelEntity', id?: string | null, attributes?: { __typename?: 'Model', name?: string | null, model?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, mime: string, name: string } | null } | null } | null, parts?: { __typename?: 'ModelPartRelationResponseCollection', data: Array<{ __typename?: 'ModelPartEntity', id?: string | null, attributes?: { __typename?: 'ModelPart', nodeId: string } | null }> } | null } | null } | null } | null } | null> | null } | null> | null, parts?: Array<{ __typename?: 'ComponentCustomiserCustomParts', id: string, name?: string | null, areaSize?: { __typename?: 'MaterialAreaSizeEntityResponse', data?: { __typename?: 'MaterialAreaSizeEntity', id?: string | null, attributes?: { __typename?: 'MaterialAreaSize', name: string, priceAdjust: number, sku: string } | null } | null } | null, materialGroup?: { __typename?: 'MaterialGroupEntityResponse', data?: { __typename?: 'MaterialGroupEntity', id?: string | null, attributes?: { __typename?: 'MaterialGroup', name?: string | null, materialTypes?: { __typename?: 'MaterialTypeRelationResponseCollection', data: Array<{ __typename?: 'MaterialTypeEntity', id?: string | null, attributes?: { __typename?: 'MaterialType', name?: string | null } | null }> } | null } | null } | null } | null, modelParts?: { __typename?: 'ModelPartRelationResponseCollection', data: Array<{ __typename?: 'ModelPartEntity', id?: string | null, attributes?: { __typename?: 'ModelPart', nodeId: string } | null }> } | null } | null> | null } | null } | null };

export type FileFragmentFragment = { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, mime: string, name: string } | null };

export type ImageFragmentFragment = { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, width?: number | null, height?: number | null, ext?: string | null, mime: string, name: string, formats?: any | null } | null };

export type MaterialAreaSizeFragmentFragment = { __typename?: 'MaterialAreaSizeEntity', id?: string | null, attributes?: { __typename?: 'MaterialAreaSize', name: string, priceAdjust: number, sku: string } | null };

export type MaterialColourGroupFragmentFragment = { __typename?: 'MaterialColourGroupEntity', id?: string | null, attributes?: { __typename?: 'MaterialColourGroup', name: string, colour: string } | null };

export type MaterialFragmentFragment = { __typename?: 'MaterialEntity', id?: string | null, attributes?: { __typename?: 'Material', name?: string | null, type?: { __typename?: 'MaterialTypeEntityResponse', data?: { __typename?: 'MaterialTypeEntity', id?: string | null, attributes?: { __typename?: 'MaterialType', name?: string | null } | null } | null } | null, colourGroups?: { __typename?: 'MaterialColourGroupRelationResponseCollection', data: Array<{ __typename?: 'MaterialColourGroupEntity', id?: string | null, attributes?: { __typename?: 'MaterialColourGroup', name: string, colour: string } | null }> } | null, price?: { __typename?: 'MaterialPriceEntityResponse', data?: { __typename?: 'MaterialPriceEntity', id?: string | null, attributes?: { __typename?: 'MaterialPrice', name: string, price: number, sku: string } | null } | null } | null, images?: Array<{ __typename?: 'ComponentMaterialMaterialMap', mapType?: string | null, image: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, width?: number | null, height?: number | null, ext?: string | null, mime: string, name: string, formats?: any | null } | null } | null } } | null> | null } | null };

export type MaterialGroupFragmentFragment = { __typename?: 'MaterialGroupEntity', id?: string | null, attributes?: { __typename?: 'MaterialGroup', name?: string | null, materialTypes?: { __typename?: 'MaterialTypeRelationResponseCollection', data: Array<{ __typename?: 'MaterialTypeEntity', id?: string | null, attributes?: { __typename?: 'MaterialType', name?: string | null } | null }> } | null } | null };

export type MaterialPriceFragmentFragment = { __typename?: 'MaterialPriceEntity', id?: string | null, attributes?: { __typename?: 'MaterialPrice', name: string, price: number, sku: string } | null };

export type MaterialTypeFragmentFragment = { __typename?: 'MaterialTypeEntity', id?: string | null, attributes?: { __typename?: 'MaterialType', name?: string | null } | null };

export type ModelFragmentFragment = { __typename?: 'ModelEntity', id?: string | null, attributes?: { __typename?: 'Model', name?: string | null, model?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, mime: string, name: string } | null } | null } | null, parts?: { __typename?: 'ModelPartRelationResponseCollection', data: Array<{ __typename?: 'ModelPartEntity', id?: string | null, attributes?: { __typename?: 'ModelPart', nodeId: string } | null }> } | null } | null };

export type ModelPartFragmentFragment = { __typename?: 'ModelPartEntity', id?: string | null, attributes?: { __typename?: 'ModelPart', nodeId: string } | null };

export type GetCustomProductByShopifyIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCustomProductByShopifyIdQuery = { __typename?: 'Query', customProductByShopifyId?: { __typename?: 'CustomProductEntityResponse', data?: { __typename?: 'CustomProductEntity', id?: string | null, attributes?: { __typename?: 'CustomProduct', name: string, shopifyProductId?: string | null, initPrice?: string | null, initSku?: string | null, options?: Array<{ __typename?: 'ComponentCustomiserCustomOption', id: string, name?: string | null, models?: Array<{ __typename?: 'ComponentCustomiserCustomOptionModel', id: string, model?: { __typename?: 'ModelEntityResponse', data?: { __typename?: 'ModelEntity', id?: string | null, attributes?: { __typename?: 'Model', name?: string | null, model?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, mime: string, name: string } | null } | null } | null, parts?: { __typename?: 'ModelPartRelationResponseCollection', data: Array<{ __typename?: 'ModelPartEntity', id?: string | null, attributes?: { __typename?: 'ModelPart', nodeId: string } | null }> } | null } | null } | null } | null } | null> | null } | null> | null, parts?: Array<{ __typename?: 'ComponentCustomiserCustomParts', id: string, name?: string | null, areaSize?: { __typename?: 'MaterialAreaSizeEntityResponse', data?: { __typename?: 'MaterialAreaSizeEntity', id?: string | null, attributes?: { __typename?: 'MaterialAreaSize', name: string, priceAdjust: number, sku: string } | null } | null } | null, materialGroup?: { __typename?: 'MaterialGroupEntityResponse', data?: { __typename?: 'MaterialGroupEntity', id?: string | null, attributes?: { __typename?: 'MaterialGroup', name?: string | null, materialTypes?: { __typename?: 'MaterialTypeRelationResponseCollection', data: Array<{ __typename?: 'MaterialTypeEntity', id?: string | null, attributes?: { __typename?: 'MaterialType', name?: string | null } | null }> } | null } | null } | null } | null, modelParts?: { __typename?: 'ModelPartRelationResponseCollection', data: Array<{ __typename?: 'ModelPartEntity', id?: string | null, attributes?: { __typename?: 'ModelPart', nodeId: string } | null }> } | null } | null> | null } | null } | null } | null };

export type GetMaterialsQueryVariables = Exact<{
  filters?: InputMaybe<MaterialFiltersInput>;
}>;


export type GetMaterialsQuery = { __typename?: 'Query', materials?: { __typename?: 'MaterialEntityResponseCollection', data: Array<{ __typename?: 'MaterialEntity', id?: string | null, attributes?: { __typename?: 'Material', name?: string | null, type?: { __typename?: 'MaterialTypeEntityResponse', data?: { __typename?: 'MaterialTypeEntity', id?: string | null, attributes?: { __typename?: 'MaterialType', name?: string | null } | null } | null } | null, colourGroups?: { __typename?: 'MaterialColourGroupRelationResponseCollection', data: Array<{ __typename?: 'MaterialColourGroupEntity', id?: string | null, attributes?: { __typename?: 'MaterialColourGroup', name: string, colour: string } | null }> } | null, price?: { __typename?: 'MaterialPriceEntityResponse', data?: { __typename?: 'MaterialPriceEntity', id?: string | null, attributes?: { __typename?: 'MaterialPrice', name: string, price: number, sku: string } | null } | null } | null, images?: Array<{ __typename?: 'ComponentMaterialMaterialMap', mapType?: string | null, image: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, width?: number | null, height?: number | null, ext?: string | null, mime: string, name: string, formats?: any | null } | null } | null } } | null> | null } | null }> } | null };

export const FileFragmentFragmentDoc = /*#__PURE__*/ `
    fragment FileFragment on UploadFileEntity {
  id
  attributes {
    url
    size
    ext
    mime
    name
  }
}
    `;
export const ModelPartFragmentFragmentDoc = /*#__PURE__*/ `
    fragment ModelPartFragment on ModelPartEntity {
  id
  attributes {
    nodeId
  }
}
    `;
export const ModelFragmentFragmentDoc = /*#__PURE__*/ `
    fragment ModelFragment on ModelEntity {
  id
  attributes {
    name
    model {
      data {
        ...FileFragment
      }
    }
    parts {
      data {
        ...ModelPartFragment
      }
    }
  }
}
    `;
export const MaterialAreaSizeFragmentFragmentDoc = /*#__PURE__*/ `
    fragment MaterialAreaSizeFragment on MaterialAreaSizeEntity {
  id
  attributes {
    name
    priceAdjust
    sku
  }
}
    `;
export const MaterialTypeFragmentFragmentDoc = /*#__PURE__*/ `
    fragment MaterialTypeFragment on MaterialTypeEntity {
  id
  attributes {
    name
  }
}
    `;
export const MaterialGroupFragmentFragmentDoc = /*#__PURE__*/ `
    fragment MaterialGroupFragment on MaterialGroupEntity {
  id
  attributes {
    name
    materialTypes {
      data {
        ...MaterialTypeFragment
      }
    }
  }
}
    `;
export const CustomProductFragmentFragmentDoc = /*#__PURE__*/ `
    fragment CustomProductFragment on CustomProductEntityResponse {
  data {
    id
    attributes {
      name
      shopifyProductId
      initPrice
      initSku
      options {
        id
        name
        models {
          id
          model {
            data {
              ...ModelFragment
            }
          }
        }
      }
      parts {
        id
        name
        areaSize {
          data {
            ...MaterialAreaSizeFragment
          }
        }
        materialGroup {
          data {
            ...MaterialGroupFragment
          }
        }
        modelParts {
          data {
            ...ModelPartFragment
          }
        }
      }
    }
  }
}
    `;
export const MaterialColourGroupFragmentFragmentDoc = /*#__PURE__*/ `
    fragment MaterialColourGroupFragment on MaterialColourGroupEntity {
  id
  attributes {
    name
    colour
  }
}
    `;
export const MaterialPriceFragmentFragmentDoc = /*#__PURE__*/ `
    fragment MaterialPriceFragment on MaterialPriceEntity {
  id
  attributes {
    name
    price
    sku
  }
}
    `;
export const ImageFragmentFragmentDoc = /*#__PURE__*/ `
    fragment ImageFragment on UploadFileEntity {
  id
  attributes {
    url
    size
    width
    height
    ext
    mime
    name
    formats
  }
}
    `;
export const MaterialFragmentFragmentDoc = /*#__PURE__*/ `
    fragment MaterialFragment on MaterialEntity {
  id
  attributes {
    name
    type {
      data {
        ...MaterialTypeFragment
      }
    }
    colourGroups {
      data {
        ...MaterialColourGroupFragment
      }
    }
    price {
      data {
        ...MaterialPriceFragment
      }
    }
    images {
      mapType
      image {
        data {
          ...ImageFragment
        }
      }
    }
  }
}
    `;
export const GetCustomProductByShopifyIdDocument = /*#__PURE__*/ `
    query GetCustomProductByShopifyId($id: String!) {
  customProductByShopifyId(id: $id) {
    ...CustomProductFragment
  }
}
    ${CustomProductFragmentFragmentDoc}
${ModelFragmentFragmentDoc}
${FileFragmentFragmentDoc}
${ModelPartFragmentFragmentDoc}
${MaterialAreaSizeFragmentFragmentDoc}
${MaterialGroupFragmentFragmentDoc}
${MaterialTypeFragmentFragmentDoc}`;
export const useGetCustomProductByShopifyIdQuery = <
      TData = GetCustomProductByShopifyIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCustomProductByShopifyIdQueryVariables,
      options?: UseQueryOptions<GetCustomProductByShopifyIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCustomProductByShopifyIdQuery, TError, TData>(
      ['GetCustomProductByShopifyId', variables],
      fetcher<GetCustomProductByShopifyIdQuery, GetCustomProductByShopifyIdQueryVariables>(client, GetCustomProductByShopifyIdDocument, variables, headers),
      options
    );

useGetCustomProductByShopifyIdQuery.getKey = (variables: GetCustomProductByShopifyIdQueryVariables) => ['GetCustomProductByShopifyId', variables];
;

export const GetMaterialsDocument = /*#__PURE__*/ `
    query GetMaterials($filters: MaterialFiltersInput) {
  materials(filters: $filters) {
    data {
      ...MaterialFragment
    }
  }
}
    ${MaterialFragmentFragmentDoc}
${MaterialTypeFragmentFragmentDoc}
${MaterialColourGroupFragmentFragmentDoc}
${MaterialPriceFragmentFragmentDoc}
${ImageFragmentFragmentDoc}`;
export const useGetMaterialsQuery = <
      TData = GetMaterialsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetMaterialsQueryVariables,
      options?: UseQueryOptions<GetMaterialsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetMaterialsQuery, TError, TData>(
      variables === undefined ? ['GetMaterials'] : ['GetMaterials', variables],
      fetcher<GetMaterialsQuery, GetMaterialsQueryVariables>(client, GetMaterialsDocument, variables, headers),
      options
    );

useGetMaterialsQuery.getKey = (variables?: GetMaterialsQueryVariables) => variables === undefined ? ['GetMaterials'] : ['GetMaterials', variables];
;
