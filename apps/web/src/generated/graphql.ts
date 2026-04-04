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
  Date: { input: any; output: any; }
  GraphQLStringOrFloat: { input: any; output: any; }
  Hash: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export enum EventEnum {
  Create = 'create',
  Delete = 'delete',
  Update = 'update'
}

export type Mutation = {
  __typename?: 'Mutation';
  create_about_us_features_item?: Maybe<About_Us_Features>;
  create_about_us_features_items: Array<About_Us_Features>;
  create_about_us_specs_item?: Maybe<About_Us_Specs>;
  create_about_us_specs_items: Array<About_Us_Specs>;
  create_bank_accounts_item?: Maybe<Bank_Accounts>;
  create_bank_accounts_items: Array<Bank_Accounts>;
  create_home_banners_item?: Maybe<Home_Banners>;
  create_home_banners_items: Array<Home_Banners>;
  create_main_categories_item?: Maybe<Main_Categories>;
  create_main_categories_items: Array<Main_Categories>;
  create_product_colors_item?: Maybe<Product_Colors>;
  create_product_colors_items: Array<Product_Colors>;
  create_product_option_categories_item?: Maybe<Product_Option_Categories>;
  create_product_option_categories_items: Array<Product_Option_Categories>;
  create_product_options_item?: Maybe<Product_Options>;
  create_product_options_items: Array<Product_Options>;
  create_product_variation_images_item?: Maybe<Product_Variation_Images>;
  create_product_variation_images_items: Array<Product_Variation_Images>;
  create_product_variations_item?: Maybe<Product_Variations>;
  create_product_variations_items: Array<Product_Variations>;
  create_products_item?: Maybe<Products>;
  create_products_items: Array<Products>;
  create_purchases_counts_item?: Maybe<Purchases_Counts>;
  create_purchases_counts_items: Array<Purchases_Counts>;
  create_sectors_item?: Maybe<Sectors>;
  create_sectors_items: Array<Sectors>;
  create_social_medias_item?: Maybe<Social_Medias>;
  create_social_medias_items: Array<Social_Medias>;
  create_sub_categories_item?: Maybe<Sub_Categories>;
  create_sub_categories_items: Array<Sub_Categories>;
  create_sub_categories_sectors_item?: Maybe<Sub_Categories_Sectors>;
  create_sub_categories_sectors_items: Array<Sub_Categories_Sectors>;
  create_sub_category_variations_item?: Maybe<Sub_Category_Variations>;
  create_sub_category_variations_items: Array<Sub_Category_Variations>;
  delete_about_us_features_item?: Maybe<Delete_One>;
  delete_about_us_features_items?: Maybe<Delete_Many>;
  delete_about_us_specs_item?: Maybe<Delete_One>;
  delete_about_us_specs_items?: Maybe<Delete_Many>;
  delete_bank_accounts_item?: Maybe<Delete_One>;
  delete_bank_accounts_items?: Maybe<Delete_Many>;
  delete_home_banners_item?: Maybe<Delete_One>;
  delete_home_banners_items?: Maybe<Delete_Many>;
  delete_main_categories_item?: Maybe<Delete_One>;
  delete_main_categories_items?: Maybe<Delete_Many>;
  delete_product_colors_item?: Maybe<Delete_One>;
  delete_product_colors_items?: Maybe<Delete_Many>;
  delete_product_option_categories_item?: Maybe<Delete_One>;
  delete_product_option_categories_items?: Maybe<Delete_Many>;
  delete_product_options_item?: Maybe<Delete_One>;
  delete_product_options_items?: Maybe<Delete_Many>;
  delete_product_variation_images_item?: Maybe<Delete_One>;
  delete_product_variation_images_items?: Maybe<Delete_Many>;
  delete_product_variations_item?: Maybe<Delete_One>;
  delete_product_variations_items?: Maybe<Delete_Many>;
  delete_products_item?: Maybe<Delete_One>;
  delete_products_items?: Maybe<Delete_Many>;
  delete_purchases_counts_item?: Maybe<Delete_One>;
  delete_purchases_counts_items?: Maybe<Delete_Many>;
  delete_sectors_item?: Maybe<Delete_One>;
  delete_sectors_items?: Maybe<Delete_Many>;
  delete_social_medias_item?: Maybe<Delete_One>;
  delete_social_medias_items?: Maybe<Delete_Many>;
  delete_sub_categories_item?: Maybe<Delete_One>;
  delete_sub_categories_items?: Maybe<Delete_Many>;
  delete_sub_categories_sectors_item?: Maybe<Delete_One>;
  delete_sub_categories_sectors_items?: Maybe<Delete_Many>;
  delete_sub_category_variations_item?: Maybe<Delete_One>;
  delete_sub_category_variations_items?: Maybe<Delete_Many>;
  update_about_us?: Maybe<About_Us>;
  update_about_us_features_batch: Array<About_Us_Features>;
  update_about_us_features_item?: Maybe<About_Us_Features>;
  update_about_us_features_items: Array<About_Us_Features>;
  update_about_us_specs_batch: Array<About_Us_Specs>;
  update_about_us_specs_item?: Maybe<About_Us_Specs>;
  update_about_us_specs_items: Array<About_Us_Specs>;
  update_bank_accounts_batch: Array<Bank_Accounts>;
  update_bank_accounts_item?: Maybe<Bank_Accounts>;
  update_bank_accounts_items: Array<Bank_Accounts>;
  update_contact?: Maybe<Contact>;
  update_footer?: Maybe<Footer>;
  update_header?: Maybe<Header>;
  update_home_banners_batch: Array<Home_Banners>;
  update_home_banners_item?: Maybe<Home_Banners>;
  update_home_banners_items: Array<Home_Banners>;
  update_main_categories_batch: Array<Main_Categories>;
  update_main_categories_item?: Maybe<Main_Categories>;
  update_main_categories_items: Array<Main_Categories>;
  update_page__bank_account?: Maybe<Page__Bank_Account>;
  update_page__distance_selling_agreement?: Maybe<Page__Distance_Selling_Agreement>;
  update_page__home?: Maybe<Page__Home>;
  update_page__membership_agreement?: Maybe<Page__Membership_Agreement>;
  update_page__personal_data_protection_law?: Maybe<Page__Personal_Data_Protection_Law>;
  update_page__privacy_agreement?: Maybe<Page__Privacy_Agreement>;
  update_page__terms_of_use?: Maybe<Page__Terms_Of_Use>;
  update_product_colors_batch: Array<Product_Colors>;
  update_product_colors_item?: Maybe<Product_Colors>;
  update_product_colors_items: Array<Product_Colors>;
  update_product_option_categories_batch: Array<Product_Option_Categories>;
  update_product_option_categories_item?: Maybe<Product_Option_Categories>;
  update_product_option_categories_items: Array<Product_Option_Categories>;
  update_product_options_batch: Array<Product_Options>;
  update_product_options_item?: Maybe<Product_Options>;
  update_product_options_items: Array<Product_Options>;
  update_product_variation_images_batch: Array<Product_Variation_Images>;
  update_product_variation_images_item?: Maybe<Product_Variation_Images>;
  update_product_variation_images_items: Array<Product_Variation_Images>;
  update_product_variations_batch: Array<Product_Variations>;
  update_product_variations_item?: Maybe<Product_Variations>;
  update_product_variations_items: Array<Product_Variations>;
  update_products_batch: Array<Products>;
  update_products_item?: Maybe<Products>;
  update_products_items: Array<Products>;
  update_purchases_counts_batch: Array<Purchases_Counts>;
  update_purchases_counts_item?: Maybe<Purchases_Counts>;
  update_purchases_counts_items: Array<Purchases_Counts>;
  update_sectors_batch: Array<Sectors>;
  update_sectors_item?: Maybe<Sectors>;
  update_sectors_items: Array<Sectors>;
  update_social_medias_batch: Array<Social_Medias>;
  update_social_medias_item?: Maybe<Social_Medias>;
  update_social_medias_items: Array<Social_Medias>;
  update_sub_categories_batch: Array<Sub_Categories>;
  update_sub_categories_item?: Maybe<Sub_Categories>;
  update_sub_categories_items: Array<Sub_Categories>;
  update_sub_categories_sectors_batch: Array<Sub_Categories_Sectors>;
  update_sub_categories_sectors_item?: Maybe<Sub_Categories_Sectors>;
  update_sub_categories_sectors_items: Array<Sub_Categories_Sectors>;
  update_sub_category_variations_batch: Array<Sub_Category_Variations>;
  update_sub_category_variations_item?: Maybe<Sub_Category_Variations>;
  update_sub_category_variations_items: Array<Sub_Category_Variations>;
};


export type MutationCreate_About_Us_Features_ItemArgs = {
  data: Create_About_Us_Features_Input;
};


export type MutationCreate_About_Us_Features_ItemsArgs = {
  data?: InputMaybe<Array<Create_About_Us_Features_Input>>;
  filter?: InputMaybe<About_Us_Features_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_About_Us_Specs_ItemArgs = {
  data: Create_About_Us_Specs_Input;
};


export type MutationCreate_About_Us_Specs_ItemsArgs = {
  data?: InputMaybe<Array<Create_About_Us_Specs_Input>>;
  filter?: InputMaybe<About_Us_Specs_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Bank_Accounts_ItemArgs = {
  data: Create_Bank_Accounts_Input;
};


export type MutationCreate_Bank_Accounts_ItemsArgs = {
  data?: InputMaybe<Array<Create_Bank_Accounts_Input>>;
  filter?: InputMaybe<Bank_Accounts_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Home_Banners_ItemArgs = {
  data: Create_Home_Banners_Input;
};


export type MutationCreate_Home_Banners_ItemsArgs = {
  data?: InputMaybe<Array<Create_Home_Banners_Input>>;
  filter?: InputMaybe<Home_Banners_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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


export type MutationCreate_Product_Colors_ItemArgs = {
  data: Create_Product_Colors_Input;
};


export type MutationCreate_Product_Colors_ItemsArgs = {
  data?: InputMaybe<Array<Create_Product_Colors_Input>>;
  filter?: InputMaybe<Product_Colors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Product_Option_Categories_ItemArgs = {
  data: Create_Product_Option_Categories_Input;
};


export type MutationCreate_Product_Option_Categories_ItemsArgs = {
  data?: InputMaybe<Array<Create_Product_Option_Categories_Input>>;
  filter?: InputMaybe<Product_Option_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Product_Options_ItemArgs = {
  data: Create_Product_Options_Input;
};


export type MutationCreate_Product_Options_ItemsArgs = {
  data?: InputMaybe<Array<Create_Product_Options_Input>>;
  filter?: InputMaybe<Product_Options_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Product_Variation_Images_ItemArgs = {
  data: Create_Product_Variation_Images_Input;
};


export type MutationCreate_Product_Variation_Images_ItemsArgs = {
  data?: InputMaybe<Array<Create_Product_Variation_Images_Input>>;
  filter?: InputMaybe<Product_Variation_Images_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Product_Variations_ItemArgs = {
  data: Create_Product_Variations_Input;
};


export type MutationCreate_Product_Variations_ItemsArgs = {
  data?: InputMaybe<Array<Create_Product_Variations_Input>>;
  filter?: InputMaybe<Product_Variations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Products_ItemArgs = {
  data: Create_Products_Input;
};


export type MutationCreate_Products_ItemsArgs = {
  data?: InputMaybe<Array<Create_Products_Input>>;
  filter?: InputMaybe<Products_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Purchases_Counts_ItemArgs = {
  data: Create_Purchases_Counts_Input;
};


export type MutationCreate_Purchases_Counts_ItemsArgs = {
  data?: InputMaybe<Array<Create_Purchases_Counts_Input>>;
  filter?: InputMaybe<Purchases_Counts_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Sectors_ItemArgs = {
  data: Create_Sectors_Input;
};


export type MutationCreate_Sectors_ItemsArgs = {
  data?: InputMaybe<Array<Create_Sectors_Input>>;
  filter?: InputMaybe<Sectors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Social_Medias_ItemArgs = {
  data: Create_Social_Medias_Input;
};


export type MutationCreate_Social_Medias_ItemsArgs = {
  data?: InputMaybe<Array<Create_Social_Medias_Input>>;
  filter?: InputMaybe<Social_Medias_Filter>;
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


export type MutationCreate_Sub_Categories_Sectors_ItemArgs = {
  data: Create_Sub_Categories_Sectors_Input;
};


export type MutationCreate_Sub_Categories_Sectors_ItemsArgs = {
  data?: InputMaybe<Array<Create_Sub_Categories_Sectors_Input>>;
  filter?: InputMaybe<Sub_Categories_Sectors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreate_Sub_Category_Variations_ItemArgs = {
  data: Create_Sub_Category_Variations_Input;
};


export type MutationCreate_Sub_Category_Variations_ItemsArgs = {
  data?: InputMaybe<Array<Create_Sub_Category_Variations_Input>>;
  filter?: InputMaybe<Sub_Category_Variations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationDelete_About_Us_Features_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_About_Us_Features_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_About_Us_Specs_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_About_Us_Specs_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Bank_Accounts_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Bank_Accounts_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Home_Banners_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Home_Banners_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Main_Categories_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Main_Categories_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Product_Colors_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Product_Colors_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Product_Option_Categories_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Product_Option_Categories_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Product_Options_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Product_Options_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Product_Variation_Images_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Product_Variation_Images_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Product_Variations_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Product_Variations_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Products_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Products_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Purchases_Counts_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Purchases_Counts_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Sectors_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Sectors_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Social_Medias_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Social_Medias_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Sub_Categories_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Sub_Categories_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Sub_Categories_Sectors_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Sub_Categories_Sectors_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Sub_Category_Variations_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Sub_Category_Variations_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationUpdate_About_UsArgs = {
  data: Update_About_Us_Input;
};


export type MutationUpdate_About_Us_Features_BatchArgs = {
  data?: InputMaybe<Array<Update_About_Us_Features_Input>>;
  filter?: InputMaybe<About_Us_Features_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_About_Us_Features_ItemArgs = {
  data: Update_About_Us_Features_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_About_Us_Features_ItemsArgs = {
  data: Update_About_Us_Features_Input;
  filter?: InputMaybe<About_Us_Features_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_About_Us_Specs_BatchArgs = {
  data?: InputMaybe<Array<Update_About_Us_Specs_Input>>;
  filter?: InputMaybe<About_Us_Specs_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_About_Us_Specs_ItemArgs = {
  data: Update_About_Us_Specs_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_About_Us_Specs_ItemsArgs = {
  data: Update_About_Us_Specs_Input;
  filter?: InputMaybe<About_Us_Specs_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Bank_Accounts_BatchArgs = {
  data?: InputMaybe<Array<Update_Bank_Accounts_Input>>;
  filter?: InputMaybe<Bank_Accounts_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Bank_Accounts_ItemArgs = {
  data: Update_Bank_Accounts_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Bank_Accounts_ItemsArgs = {
  data: Update_Bank_Accounts_Input;
  filter?: InputMaybe<Bank_Accounts_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_ContactArgs = {
  data: Update_Contact_Input;
};


export type MutationUpdate_FooterArgs = {
  data: Update_Footer_Input;
};


export type MutationUpdate_HeaderArgs = {
  data: Update_Header_Input;
};


export type MutationUpdate_Home_Banners_BatchArgs = {
  data?: InputMaybe<Array<Update_Home_Banners_Input>>;
  filter?: InputMaybe<Home_Banners_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Home_Banners_ItemArgs = {
  data: Update_Home_Banners_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Home_Banners_ItemsArgs = {
  data: Update_Home_Banners_Input;
  filter?: InputMaybe<Home_Banners_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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


export type MutationUpdate_Page__Bank_AccountArgs = {
  data: Update_Page__Bank_Account_Input;
};


export type MutationUpdate_Page__Distance_Selling_AgreementArgs = {
  data: Update_Page__Distance_Selling_Agreement_Input;
};


export type MutationUpdate_Page__HomeArgs = {
  data: Update_Page__Home_Input;
};


export type MutationUpdate_Page__Membership_AgreementArgs = {
  data: Update_Page__Membership_Agreement_Input;
};


export type MutationUpdate_Page__Personal_Data_Protection_LawArgs = {
  data: Update_Page__Personal_Data_Protection_Law_Input;
};


export type MutationUpdate_Page__Privacy_AgreementArgs = {
  data: Update_Page__Privacy_Agreement_Input;
};


export type MutationUpdate_Page__Terms_Of_UseArgs = {
  data: Update_Page__Terms_Of_Use_Input;
};


export type MutationUpdate_Product_Colors_BatchArgs = {
  data?: InputMaybe<Array<Update_Product_Colors_Input>>;
  filter?: InputMaybe<Product_Colors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Product_Colors_ItemArgs = {
  data: Update_Product_Colors_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Product_Colors_ItemsArgs = {
  data: Update_Product_Colors_Input;
  filter?: InputMaybe<Product_Colors_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Product_Option_Categories_BatchArgs = {
  data?: InputMaybe<Array<Update_Product_Option_Categories_Input>>;
  filter?: InputMaybe<Product_Option_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Product_Option_Categories_ItemArgs = {
  data: Update_Product_Option_Categories_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Product_Option_Categories_ItemsArgs = {
  data: Update_Product_Option_Categories_Input;
  filter?: InputMaybe<Product_Option_Categories_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Product_Options_BatchArgs = {
  data?: InputMaybe<Array<Update_Product_Options_Input>>;
  filter?: InputMaybe<Product_Options_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Product_Options_ItemArgs = {
  data: Update_Product_Options_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Product_Options_ItemsArgs = {
  data: Update_Product_Options_Input;
  filter?: InputMaybe<Product_Options_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Product_Variation_Images_BatchArgs = {
  data?: InputMaybe<Array<Update_Product_Variation_Images_Input>>;
  filter?: InputMaybe<Product_Variation_Images_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Product_Variation_Images_ItemArgs = {
  data: Update_Product_Variation_Images_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Product_Variation_Images_ItemsArgs = {
  data: Update_Product_Variation_Images_Input;
  filter?: InputMaybe<Product_Variation_Images_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Product_Variations_BatchArgs = {
  data?: InputMaybe<Array<Update_Product_Variations_Input>>;
  filter?: InputMaybe<Product_Variations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Product_Variations_ItemArgs = {
  data: Update_Product_Variations_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Product_Variations_ItemsArgs = {
  data: Update_Product_Variations_Input;
  filter?: InputMaybe<Product_Variations_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Products_BatchArgs = {
  data?: InputMaybe<Array<Update_Products_Input>>;
  filter?: InputMaybe<Products_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Products_ItemArgs = {
  data: Update_Products_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Products_ItemsArgs = {
  data: Update_Products_Input;
  filter?: InputMaybe<Products_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Purchases_Counts_BatchArgs = {
  data?: InputMaybe<Array<Update_Purchases_Counts_Input>>;
  filter?: InputMaybe<Purchases_Counts_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Purchases_Counts_ItemArgs = {
  data: Update_Purchases_Counts_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Purchases_Counts_ItemsArgs = {
  data: Update_Purchases_Counts_Input;
  filter?: InputMaybe<Purchases_Counts_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Sectors_BatchArgs = {
  data?: InputMaybe<Array<Update_Sectors_Input>>;
  filter?: InputMaybe<Sectors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Sectors_ItemArgs = {
  data: Update_Sectors_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Sectors_ItemsArgs = {
  data: Update_Sectors_Input;
  filter?: InputMaybe<Sectors_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Social_Medias_BatchArgs = {
  data?: InputMaybe<Array<Update_Social_Medias_Input>>;
  filter?: InputMaybe<Social_Medias_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Social_Medias_ItemArgs = {
  data: Update_Social_Medias_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Social_Medias_ItemsArgs = {
  data: Update_Social_Medias_Input;
  filter?: InputMaybe<Social_Medias_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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


export type MutationUpdate_Sub_Categories_Sectors_BatchArgs = {
  data?: InputMaybe<Array<Update_Sub_Categories_Sectors_Input>>;
  filter?: InputMaybe<Sub_Categories_Sectors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Sub_Categories_Sectors_ItemArgs = {
  data: Update_Sub_Categories_Sectors_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Sub_Categories_Sectors_ItemsArgs = {
  data: Update_Sub_Categories_Sectors_Input;
  filter?: InputMaybe<Sub_Categories_Sectors_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Sub_Category_Variations_BatchArgs = {
  data?: InputMaybe<Array<Update_Sub_Category_Variations_Input>>;
  filter?: InputMaybe<Sub_Category_Variations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Sub_Category_Variations_ItemArgs = {
  data: Update_Sub_Category_Variations_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Sub_Category_Variations_ItemsArgs = {
  data: Update_Sub_Category_Variations_Input;
  filter?: InputMaybe<Sub_Category_Variations_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Query = {
  __typename?: 'Query';
  about_us?: Maybe<About_Us>;
  about_us_by_version?: Maybe<Version_About_Us>;
  about_us_features: Array<About_Us_Features>;
  about_us_features_aggregated: Array<About_Us_Features_Aggregated>;
  about_us_features_by_id?: Maybe<About_Us_Features>;
  about_us_features_by_version?: Maybe<Version_About_Us_Features>;
  about_us_specs: Array<About_Us_Specs>;
  about_us_specs_aggregated: Array<About_Us_Specs_Aggregated>;
  about_us_specs_by_id?: Maybe<About_Us_Specs>;
  about_us_specs_by_version?: Maybe<Version_About_Us_Specs>;
  bank_accounts: Array<Bank_Accounts>;
  bank_accounts_aggregated: Array<Bank_Accounts_Aggregated>;
  bank_accounts_by_id?: Maybe<Bank_Accounts>;
  bank_accounts_by_version?: Maybe<Version_Bank_Accounts>;
  contact?: Maybe<Contact>;
  contact_by_version?: Maybe<Version_Contact>;
  footer?: Maybe<Footer>;
  footer_by_version?: Maybe<Version_Footer>;
  header?: Maybe<Header>;
  header_by_version?: Maybe<Version_Header>;
  home_banners: Array<Home_Banners>;
  home_banners_aggregated: Array<Home_Banners_Aggregated>;
  home_banners_by_id?: Maybe<Home_Banners>;
  home_banners_by_version?: Maybe<Version_Home_Banners>;
  main_categories: Array<Main_Categories>;
  main_categories_aggregated: Array<Main_Categories_Aggregated>;
  main_categories_by_id?: Maybe<Main_Categories>;
  main_categories_by_version?: Maybe<Version_Main_Categories>;
  page__bank_account?: Maybe<Page__Bank_Account>;
  page__bank_account_by_version?: Maybe<Version_Page__Bank_Account>;
  page__distance_selling_agreement?: Maybe<Page__Distance_Selling_Agreement>;
  page__distance_selling_agreement_by_version?: Maybe<Version_Page__Distance_Selling_Agreement>;
  page__home?: Maybe<Page__Home>;
  page__home_by_version?: Maybe<Version_Page__Home>;
  page__membership_agreement?: Maybe<Page__Membership_Agreement>;
  page__membership_agreement_by_version?: Maybe<Version_Page__Membership_Agreement>;
  page__personal_data_protection_law?: Maybe<Page__Personal_Data_Protection_Law>;
  page__personal_data_protection_law_by_version?: Maybe<Version_Page__Personal_Data_Protection_Law>;
  page__privacy_agreement?: Maybe<Page__Privacy_Agreement>;
  page__privacy_agreement_by_version?: Maybe<Version_Page__Privacy_Agreement>;
  page__terms_of_use?: Maybe<Page__Terms_Of_Use>;
  page__terms_of_use_by_version?: Maybe<Version_Page__Terms_Of_Use>;
  product_colors: Array<Product_Colors>;
  product_colors_aggregated: Array<Product_Colors_Aggregated>;
  product_colors_by_id?: Maybe<Product_Colors>;
  product_colors_by_version?: Maybe<Version_Product_Colors>;
  product_option_categories: Array<Product_Option_Categories>;
  product_option_categories_aggregated: Array<Product_Option_Categories_Aggregated>;
  product_option_categories_by_id?: Maybe<Product_Option_Categories>;
  product_option_categories_by_version?: Maybe<Version_Product_Option_Categories>;
  product_options: Array<Product_Options>;
  product_options_aggregated: Array<Product_Options_Aggregated>;
  product_options_by_id?: Maybe<Product_Options>;
  product_options_by_version?: Maybe<Version_Product_Options>;
  product_variation_images: Array<Product_Variation_Images>;
  product_variation_images_aggregated: Array<Product_Variation_Images_Aggregated>;
  product_variation_images_by_id?: Maybe<Product_Variation_Images>;
  product_variation_images_by_version?: Maybe<Version_Product_Variation_Images>;
  product_variations: Array<Product_Variations>;
  product_variations_aggregated: Array<Product_Variations_Aggregated>;
  product_variations_by_id?: Maybe<Product_Variations>;
  product_variations_by_version?: Maybe<Version_Product_Variations>;
  products: Array<Products>;
  products_aggregated: Array<Products_Aggregated>;
  products_by_id?: Maybe<Products>;
  products_by_version?: Maybe<Version_Products>;
  purchases_counts: Array<Purchases_Counts>;
  purchases_counts_aggregated: Array<Purchases_Counts_Aggregated>;
  purchases_counts_by_id?: Maybe<Purchases_Counts>;
  purchases_counts_by_version?: Maybe<Version_Purchases_Counts>;
  sectors: Array<Sectors>;
  sectors_aggregated: Array<Sectors_Aggregated>;
  sectors_by_id?: Maybe<Sectors>;
  sectors_by_version?: Maybe<Version_Sectors>;
  social_medias: Array<Social_Medias>;
  social_medias_aggregated: Array<Social_Medias_Aggregated>;
  social_medias_by_id?: Maybe<Social_Medias>;
  social_medias_by_version?: Maybe<Version_Social_Medias>;
  sub_categories: Array<Sub_Categories>;
  sub_categories_aggregated: Array<Sub_Categories_Aggregated>;
  sub_categories_by_id?: Maybe<Sub_Categories>;
  sub_categories_by_version?: Maybe<Version_Sub_Categories>;
  sub_categories_sectors: Array<Sub_Categories_Sectors>;
  sub_categories_sectors_aggregated: Array<Sub_Categories_Sectors_Aggregated>;
  sub_categories_sectors_by_id?: Maybe<Sub_Categories_Sectors>;
  sub_categories_sectors_by_version?: Maybe<Version_Sub_Categories_Sectors>;
  sub_category_variations: Array<Sub_Category_Variations>;
  sub_category_variations_aggregated: Array<Sub_Category_Variations_Aggregated>;
  sub_category_variations_by_id?: Maybe<Sub_Category_Variations>;
  sub_category_variations_by_version?: Maybe<Version_Sub_Category_Variations>;
};


export type QueryAbout_UsArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAbout_Us_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryAbout_Us_FeaturesArgs = {
  filter?: InputMaybe<About_Us_Features_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryAbout_Us_Features_AggregatedArgs = {
  filter?: InputMaybe<About_Us_Features_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryAbout_Us_Features_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAbout_Us_Features_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryAbout_Us_SpecsArgs = {
  filter?: InputMaybe<About_Us_Specs_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryAbout_Us_Specs_AggregatedArgs = {
  filter?: InputMaybe<About_Us_Specs_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryAbout_Us_Specs_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAbout_Us_Specs_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryBank_AccountsArgs = {
  filter?: InputMaybe<Bank_Accounts_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryBank_Accounts_AggregatedArgs = {
  filter?: InputMaybe<Bank_Accounts_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryBank_Accounts_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBank_Accounts_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryContactArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryContact_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryFooterArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFooter_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryHeaderArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHeader_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryHome_BannersArgs = {
  filter?: InputMaybe<Home_Banners_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryHome_Banners_AggregatedArgs = {
  filter?: InputMaybe<Home_Banners_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryHome_Banners_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHome_Banners_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
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


export type QueryPage__Bank_AccountArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPage__Bank_Account_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryPage__Distance_Selling_AgreementArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPage__Distance_Selling_Agreement_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryPage__HomeArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPage__Home_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryPage__Membership_AgreementArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPage__Membership_Agreement_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryPage__Personal_Data_Protection_LawArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPage__Personal_Data_Protection_Law_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryPage__Privacy_AgreementArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPage__Privacy_Agreement_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryPage__Terms_Of_UseArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPage__Terms_Of_Use_By_VersionArgs = {
  version: Scalars['String']['input'];
};


export type QueryProduct_ColorsArgs = {
  filter?: InputMaybe<Product_Colors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProduct_Colors_AggregatedArgs = {
  filter?: InputMaybe<Product_Colors_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProduct_Colors_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProduct_Colors_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryProduct_Option_CategoriesArgs = {
  filter?: InputMaybe<Product_Option_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProduct_Option_Categories_AggregatedArgs = {
  filter?: InputMaybe<Product_Option_Categories_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProduct_Option_Categories_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProduct_Option_Categories_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryProduct_OptionsArgs = {
  filter?: InputMaybe<Product_Options_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProduct_Options_AggregatedArgs = {
  filter?: InputMaybe<Product_Options_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProduct_Options_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProduct_Options_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryProduct_Variation_ImagesArgs = {
  filter?: InputMaybe<Product_Variation_Images_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProduct_Variation_Images_AggregatedArgs = {
  filter?: InputMaybe<Product_Variation_Images_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProduct_Variation_Images_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProduct_Variation_Images_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryProduct_VariationsArgs = {
  filter?: InputMaybe<Product_Variations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProduct_Variations_AggregatedArgs = {
  filter?: InputMaybe<Product_Variations_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProduct_Variations_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProduct_Variations_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  filter?: InputMaybe<Products_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProducts_AggregatedArgs = {
  filter?: InputMaybe<Products_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProducts_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProducts_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryPurchases_CountsArgs = {
  filter?: InputMaybe<Purchases_Counts_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPurchases_Counts_AggregatedArgs = {
  filter?: InputMaybe<Purchases_Counts_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPurchases_Counts_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPurchases_Counts_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QuerySectorsArgs = {
  filter?: InputMaybe<Sectors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySectors_AggregatedArgs = {
  filter?: InputMaybe<Sectors_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySectors_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySectors_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QuerySocial_MediasArgs = {
  filter?: InputMaybe<Social_Medias_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySocial_Medias_AggregatedArgs = {
  filter?: InputMaybe<Social_Medias_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySocial_Medias_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySocial_Medias_By_VersionArgs = {
  id: Scalars['ID']['input'];
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


export type QuerySub_Categories_SectorsArgs = {
  filter?: InputMaybe<Sub_Categories_Sectors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySub_Categories_Sectors_AggregatedArgs = {
  filter?: InputMaybe<Sub_Categories_Sectors_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySub_Categories_Sectors_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySub_Categories_Sectors_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QuerySub_Category_VariationsArgs = {
  filter?: InputMaybe<Sub_Category_Variations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySub_Category_Variations_AggregatedArgs = {
  filter?: InputMaybe<Sub_Category_Variations_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySub_Category_Variations_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySub_Category_Variations_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  about_us_features_mutated?: Maybe<About_Us_Features_Mutated>;
  about_us_mutated?: Maybe<About_Us_Mutated>;
  about_us_specs_mutated?: Maybe<About_Us_Specs_Mutated>;
  bank_accounts_mutated?: Maybe<Bank_Accounts_Mutated>;
  contact_mutated?: Maybe<Contact_Mutated>;
  directus_activity_mutated?: Maybe<Directus_Activity_Mutated>;
  directus_comments_mutated?: Maybe<Directus_Comments_Mutated>;
  directus_notifications_mutated?: Maybe<Directus_Notifications_Mutated>;
  directus_presets_mutated?: Maybe<Directus_Presets_Mutated>;
  directus_roles_mutated?: Maybe<Directus_Roles_Mutated>;
  directus_settings_mutated?: Maybe<Directus_Settings_Mutated>;
  directus_shares_mutated?: Maybe<Directus_Shares_Mutated>;
  directus_translations_mutated?: Maybe<Directus_Translations_Mutated>;
  directus_users_mutated?: Maybe<Directus_Users_Mutated>;
  footer_mutated?: Maybe<Footer_Mutated>;
  header_mutated?: Maybe<Header_Mutated>;
  home_banners_mutated?: Maybe<Home_Banners_Mutated>;
  main_categories_mutated?: Maybe<Main_Categories_Mutated>;
  page__bank_account_mutated?: Maybe<Page__Bank_Account_Mutated>;
  page__distance_selling_agreement_mutated?: Maybe<Page__Distance_Selling_Agreement_Mutated>;
  page__home_mutated?: Maybe<Page__Home_Mutated>;
  page__membership_agreement_mutated?: Maybe<Page__Membership_Agreement_Mutated>;
  page__personal_data_protection_law_mutated?: Maybe<Page__Personal_Data_Protection_Law_Mutated>;
  page__privacy_agreement_mutated?: Maybe<Page__Privacy_Agreement_Mutated>;
  page__terms_of_use_mutated?: Maybe<Page__Terms_Of_Use_Mutated>;
  product_colors_mutated?: Maybe<Product_Colors_Mutated>;
  product_option_categories_mutated?: Maybe<Product_Option_Categories_Mutated>;
  product_options_mutated?: Maybe<Product_Options_Mutated>;
  product_variation_images_mutated?: Maybe<Product_Variation_Images_Mutated>;
  product_variations_mutated?: Maybe<Product_Variations_Mutated>;
  products_mutated?: Maybe<Products_Mutated>;
  purchases_counts_mutated?: Maybe<Purchases_Counts_Mutated>;
  sectors_mutated?: Maybe<Sectors_Mutated>;
  social_medias_mutated?: Maybe<Social_Medias_Mutated>;
  sub_categories_mutated?: Maybe<Sub_Categories_Mutated>;
  sub_categories_sectors_mutated?: Maybe<Sub_Categories_Sectors_Mutated>;
  sub_category_variations_mutated?: Maybe<Sub_Category_Variations_Mutated>;
};


export type SubscriptionAbout_Us_Features_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionAbout_Us_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionAbout_Us_Specs_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionBank_Accounts_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionContact_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Activity_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Comments_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Notifications_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Presets_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Roles_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Settings_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Shares_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Translations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Users_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionFooter_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionHeader_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionHome_Banners_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionMain_Categories_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPage__Bank_Account_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPage__Distance_Selling_Agreement_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPage__Home_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPage__Membership_Agreement_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPage__Personal_Data_Protection_Law_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPage__Privacy_Agreement_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPage__Terms_Of_Use_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionProduct_Colors_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionProduct_Option_Categories_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionProduct_Options_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionProduct_Variation_Images_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionProduct_Variations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionProducts_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPurchases_Counts_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionSectors_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionSocial_Medias_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionSub_Categories_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionSub_Categories_Sectors_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionSub_Category_Variations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type About_Us = {
  __typename?: 'about_us';
  content?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Array<Maybe<About_Us_Features>>>;
  features_func?: Maybe<Count_Functions>;
  id: Scalars['ID']['output'];
  specs?: Maybe<Array<Maybe<About_Us_Specs>>>;
  specs_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']['output']>;
};


export type About_UsFeaturesArgs = {
  filter?: InputMaybe<About_Us_Features_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type About_UsSpecsArgs = {
  filter?: InputMaybe<About_Us_Specs_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type About_Us_Features = {
  __typename?: 'about_us_features';
  about_us_id?: Maybe<About_Us>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type About_Us_FeaturesAbout_Us_IdArgs = {
  filter?: InputMaybe<About_Us_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type About_Us_Features_Aggregated = {
  __typename?: 'about_us_features_aggregated';
  avg?: Maybe<About_Us_Features_Aggregated_Fields>;
  avgDistinct?: Maybe<About_Us_Features_Aggregated_Fields>;
  count?: Maybe<About_Us_Features_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<About_Us_Features_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<About_Us_Features_Aggregated_Fields>;
  min?: Maybe<About_Us_Features_Aggregated_Fields>;
  sum?: Maybe<About_Us_Features_Aggregated_Fields>;
  sumDistinct?: Maybe<About_Us_Features_Aggregated_Fields>;
};

export type About_Us_Features_Aggregated_Count = {
  __typename?: 'about_us_features_aggregated_count';
  about_us_id?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['Int']['output']>;
};

export type About_Us_Features_Aggregated_Fields = {
  __typename?: 'about_us_features_aggregated_fields';
  about_us_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
};

export type About_Us_Features_Filter = {
  _and?: InputMaybe<Array<InputMaybe<About_Us_Features_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<About_Us_Features_Filter>>>;
  about_us_id?: InputMaybe<About_Us_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
};

export type About_Us_Features_Mutated = {
  __typename?: 'about_us_features_mutated';
  data?: Maybe<About_Us_Features>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type About_Us_Features_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<About_Us_Features_Filter>>>;
  _none?: InputMaybe<About_Us_Features_Filter>;
  _or?: InputMaybe<Array<InputMaybe<About_Us_Features_Filter>>>;
  _some?: InputMaybe<About_Us_Features_Filter>;
  about_us_id?: InputMaybe<About_Us_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
};

export type About_Us_Filter = {
  _and?: InputMaybe<Array<InputMaybe<About_Us_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<About_Us_Filter>>>;
  content?: InputMaybe<String_Filter_Operators>;
  features?: InputMaybe<About_Us_Features_Quantifier_Filter>;
  features_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  specs?: InputMaybe<About_Us_Specs_Quantifier_Filter>;
  specs_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
};

export type About_Us_Mutated = {
  __typename?: 'about_us_mutated';
  data?: Maybe<About_Us>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type About_Us_Specs = {
  __typename?: 'about_us_specs';
  about_us_id?: Maybe<About_Us>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type About_Us_SpecsAbout_Us_IdArgs = {
  filter?: InputMaybe<About_Us_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type About_Us_Specs_Aggregated = {
  __typename?: 'about_us_specs_aggregated';
  avg?: Maybe<About_Us_Specs_Aggregated_Fields>;
  avgDistinct?: Maybe<About_Us_Specs_Aggregated_Fields>;
  count?: Maybe<About_Us_Specs_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<About_Us_Specs_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<About_Us_Specs_Aggregated_Fields>;
  min?: Maybe<About_Us_Specs_Aggregated_Fields>;
  sum?: Maybe<About_Us_Specs_Aggregated_Fields>;
  sumDistinct?: Maybe<About_Us_Specs_Aggregated_Fields>;
};

export type About_Us_Specs_Aggregated_Count = {
  __typename?: 'about_us_specs_aggregated_count';
  about_us_id?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['Int']['output']>;
  icon?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['Int']['output']>;
};

export type About_Us_Specs_Aggregated_Fields = {
  __typename?: 'about_us_specs_aggregated_fields';
  about_us_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
};

export type About_Us_Specs_Filter = {
  _and?: InputMaybe<Array<InputMaybe<About_Us_Specs_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<About_Us_Specs_Filter>>>;
  about_us_id?: InputMaybe<About_Us_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<Id_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
};

export type About_Us_Specs_Mutated = {
  __typename?: 'about_us_specs_mutated';
  data?: Maybe<About_Us_Specs>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type About_Us_Specs_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<About_Us_Specs_Filter>>>;
  _none?: InputMaybe<About_Us_Specs_Filter>;
  _or?: InputMaybe<Array<InputMaybe<About_Us_Specs_Filter>>>;
  _some?: InputMaybe<About_Us_Specs_Filter>;
  about_us_id?: InputMaybe<About_Us_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<Id_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
};

export type Bank_Accounts = {
  __typename?: 'bank_accounts';
  account_no?: Maybe<Scalars['String']['output']>;
  account_owner?: Maybe<Scalars['String']['output']>;
  bank_branch?: Maybe<Scalars['String']['output']>;
  bank_name?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  iban?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  order?: Maybe<Scalars['Int']['output']>;
};

export type Bank_Accounts_Aggregated = {
  __typename?: 'bank_accounts_aggregated';
  avg?: Maybe<Bank_Accounts_Aggregated_Fields>;
  avgDistinct?: Maybe<Bank_Accounts_Aggregated_Fields>;
  count?: Maybe<Bank_Accounts_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Bank_Accounts_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Bank_Accounts_Aggregated_Fields>;
  min?: Maybe<Bank_Accounts_Aggregated_Fields>;
  sum?: Maybe<Bank_Accounts_Aggregated_Fields>;
  sumDistinct?: Maybe<Bank_Accounts_Aggregated_Fields>;
};

export type Bank_Accounts_Aggregated_Count = {
  __typename?: 'bank_accounts_aggregated_count';
  account_no?: Maybe<Scalars['Int']['output']>;
  account_owner?: Maybe<Scalars['Int']['output']>;
  bank_branch?: Maybe<Scalars['Int']['output']>;
  bank_name?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['Int']['output']>;
  iban?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
};

export type Bank_Accounts_Aggregated_Fields = {
  __typename?: 'bank_accounts_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
};

export type Bank_Accounts_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Bank_Accounts_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Bank_Accounts_Filter>>>;
  account_no?: InputMaybe<String_Filter_Operators>;
  account_owner?: InputMaybe<String_Filter_Operators>;
  bank_branch?: InputMaybe<String_Filter_Operators>;
  bank_name?: InputMaybe<String_Filter_Operators>;
  currency?: InputMaybe<String_Filter_Operators>;
  iban?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
};

export type Bank_Accounts_Mutated = {
  __typename?: 'bank_accounts_mutated';
  data?: Maybe<Bank_Accounts>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Contact = {
  __typename?: 'contact';
  address?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  whatsapp?: Maybe<Scalars['String']['output']>;
  work_hours_mid_week?: Maybe<Scalars['String']['output']>;
  work_hours_saturday?: Maybe<Scalars['String']['output']>;
  work_hours_sunday?: Maybe<Scalars['String']['output']>;
};

export type Contact_Mutated = {
  __typename?: 'contact_mutated';
  data?: Maybe<Contact>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Count_Functions = {
  __typename?: 'count_functions';
  count?: Maybe<Scalars['Int']['output']>;
};

export type Create_About_Us_Features_Input = {
  about_us_id?: InputMaybe<Create_About_Us_Input>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Create_About_Us_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Array<InputMaybe<Create_About_Us_Features_Input>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  specs?: InputMaybe<Array<InputMaybe<Create_About_Us_Specs_Input>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Create_About_Us_Specs_Input = {
  about_us_id?: InputMaybe<Create_About_Us_Input>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Create_Bank_Accounts_Input = {
  account_no?: InputMaybe<Scalars['String']['input']>;
  account_owner?: InputMaybe<Scalars['String']['input']>;
  bank_branch?: InputMaybe<Scalars['String']['input']>;
  bank_name?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type Create_Footer_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  copyright?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  etbis_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  long_description?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  popular_sub_categories?: InputMaybe<Array<InputMaybe<Create_Sub_Categories_Input>>>;
  review_url?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  whatsapp?: InputMaybe<Scalars['String']['input']>;
};

export type Create_Home_Banners_Input = {
  button_text?: InputMaybe<Scalars['String']['input']>;
  button_url?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  mobile_image?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  page__home_id?: InputMaybe<Create_Page__Home_Input>;
  title?: InputMaybe<Scalars['String']['input']>;
  web_image?: InputMaybe<Scalars['ID']['input']>;
};

export type Create_Main_Categories_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sub_categories?: InputMaybe<Array<InputMaybe<Create_Sub_Categories_Input>>>;
};

export type Create_Page__Home_Input = {
  banners?: InputMaybe<Array<InputMaybe<Create_Home_Banners_Input>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  popular_sub_categories?: InputMaybe<Array<InputMaybe<Create_Sub_Categories_Input>>>;
  sectoral_sub_categories?: InputMaybe<Array<InputMaybe<Create_Sub_Categories_Input>>>;
};

export type Create_Product_Colors_Input = {
  color?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Create_Product_Option_Categories_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Create_Product_Options_Input = {
  category?: InputMaybe<Create_Product_Option_Categories_Input>;
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Create_Product_Variation_Images_Input = {
  big_image?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  product_variations_id?: InputMaybe<Create_Product_Variations_Input>;
  small_image?: InputMaybe<Scalars['ID']['input']>;
};

export type Create_Product_Variations_Input = {
  color?: InputMaybe<Create_Product_Colors_Input>;
  id?: InputMaybe<Scalars['ID']['input']>;
  images?: InputMaybe<Array<InputMaybe<Create_Product_Variation_Images_Input>>>;
  main_option?: InputMaybe<Create_Product_Options_Input>;
  piece_price?: InputMaybe<Scalars['Float']['input']>;
  products_id?: InputMaybe<Create_Products_Input>;
  purchase_count_prices?: InputMaybe<Array<InputMaybe<Create_Purchases_Counts_Input>>>;
  secondary_option?: InputMaybe<Create_Product_Options_Input>;
  stock_code?: InputMaybe<Scalars['String']['input']>;
  video_url?: InputMaybe<Scalars['String']['input']>;
};

export type Create_Products_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sub_category_variation?: InputMaybe<Create_Sub_Category_Variations_Input>;
  sub_category_variations_id?: InputMaybe<Create_Sub_Category_Variations_Input>;
  variatins?: InputMaybe<Array<InputMaybe<Create_Product_Variations_Input>>>;
};

export type Create_Purchases_Counts_Input = {
  count?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  product_variations_id?: InputMaybe<Create_Product_Variations_Input>;
};

export type Create_Sectors_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  web_image?: InputMaybe<Scalars['ID']['input']>;
};

export type Create_Social_Medias_Input = {
  icon?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Create_Sub_Categories_Input = {
  card_image?: InputMaybe<Scalars['ID']['input']>;
  footer_id?: InputMaybe<Create_Footer_Input>;
  id?: InputMaybe<Scalars['ID']['input']>;
  main_categories_id?: InputMaybe<Create_Main_Categories_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  page__home_id?: InputMaybe<Create_Page__Home_Input>;
  page__home_sectoral_id?: InputMaybe<Create_Page__Home_Input>;
  sector?: InputMaybe<Array<InputMaybe<Create_Sub_Categories_Sectors_Input>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  variations?: InputMaybe<Array<InputMaybe<Create_Sub_Category_Variations_Input>>>;
};

export type Create_Sub_Categories_Sectors_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  sectors_id?: InputMaybe<Create_Sectors_Input>;
  sub_categories_id?: InputMaybe<Create_Sub_Categories_Input>;
};

export type Create_Sub_Category_Variations_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  products?: InputMaybe<Array<InputMaybe<Create_Products_Input>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sub_categories_id?: InputMaybe<Create_Sub_Categories_Input>;
};

export type Datetime_Functions = {
  __typename?: 'datetime_functions';
  day?: Maybe<Scalars['Int']['output']>;
  hour?: Maybe<Scalars['Int']['output']>;
  minute?: Maybe<Scalars['Int']['output']>;
  month?: Maybe<Scalars['Int']['output']>;
  second?: Maybe<Scalars['Int']['output']>;
  week?: Maybe<Scalars['Int']['output']>;
  weekday?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type Delete_Many = {
  __typename?: 'delete_many';
  ids: Array<Maybe<Scalars['ID']['output']>>;
};

export type Delete_One = {
  __typename?: 'delete_one';
  id: Scalars['ID']['output'];
};

export type Directus_Activity = {
  __typename?: 'directus_activity';
  action: Scalars['String']['output'];
  collection: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ip?: Maybe<Scalars['String']['output']>;
  item: Scalars['String']['output'];
  origin?: Maybe<Scalars['String']['output']>;
  revisions?: Maybe<Scalars['String']['output']>;
  revisions_func?: Maybe<Count_Functions>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  timestamp_func?: Maybe<Datetime_Functions>;
  user?: Maybe<Directus_Users>;
  user_agent?: Maybe<Scalars['String']['output']>;
};


export type Directus_ActivityUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Activity_Mutated = {
  __typename?: 'directus_activity_mutated';
  data?: Maybe<Directus_Activity>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Comments = {
  __typename?: 'directus_comments';
  collection: Scalars['String']['output'];
  comment: Scalars['String']['output'];
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  item: Scalars['String']['output'];
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type Directus_CommentsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_CommentsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Comments_Mutated = {
  __typename?: 'directus_comments_mutated';
  data?: Maybe<Directus_Comments>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Notifications = {
  __typename?: 'directus_notifications';
  collection?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  item?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  recipient?: Maybe<Directus_Users>;
  sender?: Maybe<Directus_Users>;
  status?: Maybe<Scalars['String']['output']>;
  subject: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['Date']['output']>;
  timestamp_func?: Maybe<Datetime_Functions>;
};


export type Directus_NotificationsRecipientArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_NotificationsSenderArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Notifications_Mutated = {
  __typename?: 'directus_notifications_mutated';
  data?: Maybe<Directus_Notifications>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Presets = {
  __typename?: 'directus_presets';
  bookmark?: Maybe<Scalars['String']['output']>;
  collection?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  filter?: Maybe<Scalars['JSON']['output']>;
  filter_func?: Maybe<Count_Functions>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  layout?: Maybe<Scalars['String']['output']>;
  layout_options?: Maybe<Scalars['JSON']['output']>;
  layout_options_func?: Maybe<Count_Functions>;
  layout_query?: Maybe<Scalars['JSON']['output']>;
  layout_query_func?: Maybe<Count_Functions>;
  refresh_interval?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<Directus_Roles>;
  search?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Directus_Users>;
};


export type Directus_PresetsRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_PresetsUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Presets_Mutated = {
  __typename?: 'directus_presets_mutated';
  data?: Maybe<Directus_Presets>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Roles = {
  __typename?: 'directus_roles';
  children?: Maybe<Array<Maybe<Directus_Roles>>>;
  children_func?: Maybe<Count_Functions>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Directus_Roles>;
  policies?: Maybe<Scalars['String']['output']>;
  policies_func?: Maybe<Count_Functions>;
  users?: Maybe<Array<Maybe<Directus_Users>>>;
  users_func?: Maybe<Count_Functions>;
};


export type Directus_RolesChildrenArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_RolesParentArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_RolesUsersArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Roles_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  children?: InputMaybe<Directus_Roles_Quantifier_Filter>;
  children_func?: InputMaybe<Count_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Roles_Filter>;
  policies?: InputMaybe<String_Filter_Operators>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  users?: InputMaybe<Directus_Users_Quantifier_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Roles_Mutated = {
  __typename?: 'directus_roles_mutated';
  data?: Maybe<Directus_Roles>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Roles_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _none?: InputMaybe<Directus_Roles_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _some?: InputMaybe<Directus_Roles_Filter>;
  children?: InputMaybe<Directus_Roles_Quantifier_Filter>;
  children_func?: InputMaybe<Count_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Roles_Filter>;
  policies?: InputMaybe<String_Filter_Operators>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  users?: InputMaybe<Directus_Users_Quantifier_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Settings = {
  __typename?: 'directus_settings';
  ai_anthropic_allowed_models?: Maybe<Scalars['JSON']['output']>;
  ai_anthropic_allowed_models_func?: Maybe<Count_Functions>;
  ai_anthropic_api_key?: Maybe<Scalars['String']['output']>;
  ai_google_allowed_models?: Maybe<Scalars['JSON']['output']>;
  ai_google_allowed_models_func?: Maybe<Count_Functions>;
  ai_google_api_key?: Maybe<Scalars['String']['output']>;
  ai_openai_allowed_models?: Maybe<Scalars['JSON']['output']>;
  ai_openai_allowed_models_func?: Maybe<Count_Functions>;
  ai_openai_api_key?: Maybe<Scalars['String']['output']>;
  ai_openai_compatible_api_key?: Maybe<Scalars['String']['output']>;
  ai_openai_compatible_base_url?: Maybe<Scalars['String']['output']>;
  ai_openai_compatible_headers?: Maybe<Scalars['JSON']['output']>;
  ai_openai_compatible_headers_func?: Maybe<Count_Functions>;
  ai_openai_compatible_models?: Maybe<Scalars['JSON']['output']>;
  ai_openai_compatible_models_func?: Maybe<Count_Functions>;
  ai_openai_compatible_name?: Maybe<Scalars['String']['output']>;
  /** $t:fields.directus_settings.ai_system_prompt_note */
  ai_system_prompt?: Maybe<Scalars['String']['output']>;
  auth_login_attempts?: Maybe<Scalars['Int']['output']>;
  auth_password_policy?: Maybe<Scalars['String']['output']>;
  basemaps?: Maybe<Scalars['JSON']['output']>;
  basemaps_func?: Maybe<Count_Functions>;
  /** $t:fields.directus_settings.collaborative_editing_note */
  collaborative_editing_enabled: Scalars['Boolean']['output'];
  custom_aspect_ratios?: Maybe<Scalars['JSON']['output']>;
  custom_aspect_ratios_func?: Maybe<Count_Functions>;
  custom_css?: Maybe<Scalars['String']['output']>;
  default_appearance?: Maybe<Scalars['String']['output']>;
  default_language?: Maybe<Scalars['String']['output']>;
  default_theme_dark?: Maybe<Scalars['String']['output']>;
  default_theme_light?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mapbox_key?: Maybe<Scalars['String']['output']>;
  /** $t:fields.directus_settings.mcp_allow_deletes_note */
  mcp_allow_deletes: Scalars['Boolean']['output'];
  /** $t:fields.directus_settings.mcp_enabled_note */
  mcp_enabled: Scalars['Boolean']['output'];
  /** $t:fields.directus_settings.mcp_prompts_collection_note */
  mcp_prompts_collection?: Maybe<Scalars['String']['output']>;
  /** $t:fields.directus_settings.mcp_system_prompt_note */
  mcp_system_prompt?: Maybe<Scalars['String']['output']>;
  /** $t:fields.directus_settings.mcp_system_prompt_enabled_note */
  mcp_system_prompt_enabled?: Maybe<Scalars['Boolean']['output']>;
  module_bar?: Maybe<Scalars['JSON']['output']>;
  module_bar_func?: Maybe<Count_Functions>;
  org_name?: Maybe<Scalars['String']['output']>;
  product_updates?: Maybe<Scalars['Boolean']['output']>;
  /** $t:field_options.directus_settings.project_color_note */
  project_color?: Maybe<Scalars['String']['output']>;
  project_descriptor?: Maybe<Scalars['String']['output']>;
  project_id?: Maybe<Scalars['ID']['output']>;
  /** $t:field_options.directus_settings.project_logo_note */
  project_logo?: Maybe<Scalars['ID']['output']>;
  project_name?: Maybe<Scalars['String']['output']>;
  project_owner?: Maybe<Scalars['String']['output']>;
  project_status?: Maybe<Scalars['String']['output']>;
  project_url?: Maybe<Scalars['String']['output']>;
  project_usage?: Maybe<Scalars['String']['output']>;
  public_background?: Maybe<Scalars['ID']['output']>;
  /** $t:field_options.directus_settings.project_favicon_note */
  public_favicon?: Maybe<Scalars['ID']['output']>;
  public_foreground?: Maybe<Scalars['ID']['output']>;
  public_note?: Maybe<Scalars['String']['output']>;
  /** $t:fields.directus_settings.public_registration_note */
  public_registration: Scalars['Boolean']['output'];
  /** $t:fields.directus_settings.public_registration_email_filter_note */
  public_registration_email_filter?: Maybe<Scalars['JSON']['output']>;
  public_registration_email_filter_func?: Maybe<Count_Functions>;
  public_registration_role?: Maybe<Directus_Roles>;
  /** $t:fields.directus_settings.public_registration_verify_email_note */
  public_registration_verify_email?: Maybe<Scalars['Boolean']['output']>;
  report_bug_url?: Maybe<Scalars['String']['output']>;
  report_error_url?: Maybe<Scalars['String']['output']>;
  report_feature_url?: Maybe<Scalars['String']['output']>;
  storage_asset_presets?: Maybe<Scalars['JSON']['output']>;
  storage_asset_presets_func?: Maybe<Count_Functions>;
  storage_asset_transform?: Maybe<Scalars['String']['output']>;
  /** $t:interfaces.system-folder.field_hint */
  storage_default_folder?: Maybe<Scalars['ID']['output']>;
  theme_dark_overrides?: Maybe<Scalars['JSON']['output']>;
  theme_dark_overrides_func?: Maybe<Count_Functions>;
  theme_light_overrides?: Maybe<Scalars['JSON']['output']>;
  theme_light_overrides_func?: Maybe<Count_Functions>;
  visual_editor_urls?: Maybe<Scalars['JSON']['output']>;
  visual_editor_urls_func?: Maybe<Count_Functions>;
};


export type Directus_SettingsPublic_Registration_RoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Settings_Mutated = {
  __typename?: 'directus_settings_mutated';
  data?: Maybe<Directus_Settings>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Shares = {
  __typename?: 'directus_shares';
  collection: Scalars['String']['output'];
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_end?: Maybe<Scalars['Date']['output']>;
  date_end_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_start?: Maybe<Scalars['Date']['output']>;
  date_start_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  item: Scalars['String']['output'];
  /** $t:shared_leave_blank_for_unlimited */
  max_uses?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** $t:shared_leave_blank_for_passwordless_access */
  password?: Maybe<Scalars['Hash']['output']>;
  role?: Maybe<Directus_Roles>;
  times_used?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_SharesRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Directus_SharesUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Shares_Mutated = {
  __typename?: 'directus_shares_mutated';
  data?: Maybe<Directus_Shares>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Translations = {
  __typename?: 'directus_translations';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  language: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Directus_Translations_Mutated = {
  __typename?: 'directus_translations_mutated';
  data?: Maybe<Directus_Translations>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Users = {
  __typename?: 'directus_users';
  appearance?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  last_page?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['Hash']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Directus_Roles>;
  status?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['JSON']['output']>;
  tags_func?: Maybe<Count_Functions>;
  tfa_secret?: Maybe<Scalars['Hash']['output']>;
  theme_dark?: Maybe<Scalars['String']['output']>;
  theme_light?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type Directus_UsersRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Directus_Users_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  appearance?: InputMaybe<String_Filter_Operators>;
  avatar?: InputMaybe<Id_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  first_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  language?: InputMaybe<String_Filter_Operators>;
  last_name?: InputMaybe<String_Filter_Operators>;
  last_page?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<Hash_Filter_Operators>;
  provider?: InputMaybe<String_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  tfa_secret?: InputMaybe<Hash_Filter_Operators>;
  theme_dark?: InputMaybe<String_Filter_Operators>;
  theme_light?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
};

export type Directus_Users_Mutated = {
  __typename?: 'directus_users_mutated';
  data?: Maybe<Directus_Users>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Directus_Users_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _none?: InputMaybe<Directus_Users_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _some?: InputMaybe<Directus_Users_Filter>;
  appearance?: InputMaybe<String_Filter_Operators>;
  avatar?: InputMaybe<Id_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  first_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  language?: InputMaybe<String_Filter_Operators>;
  last_name?: InputMaybe<String_Filter_Operators>;
  last_page?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<Hash_Filter_Operators>;
  provider?: InputMaybe<String_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  tfa_secret?: InputMaybe<Hash_Filter_Operators>;
  theme_dark?: InputMaybe<String_Filter_Operators>;
  theme_light?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
};

export type Footer = {
  __typename?: 'footer';
  address?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  etbis_url?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  long_description?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  popular_sub_categories?: Maybe<Array<Maybe<Sub_Categories>>>;
  popular_sub_categories_func?: Maybe<Count_Functions>;
  review_url?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  whatsapp?: Maybe<Scalars['String']['output']>;
};


export type FooterPopular_Sub_CategoriesArgs = {
  filter?: InputMaybe<Sub_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Footer_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Footer_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Footer_Filter>>>;
  address?: InputMaybe<String_Filter_Operators>;
  copyright?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  etbis_url?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  long_description?: InputMaybe<String_Filter_Operators>;
  phone?: InputMaybe<String_Filter_Operators>;
  popular_sub_categories?: InputMaybe<Sub_Categories_Quantifier_Filter>;
  popular_sub_categories_func?: InputMaybe<Count_Function_Filter_Operators>;
  review_url?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  whatsapp?: InputMaybe<String_Filter_Operators>;
};

export type Footer_Mutated = {
  __typename?: 'footer_mutated';
  data?: Maybe<Footer>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Hash_Filter_Operators = {
  _empty?: InputMaybe<Scalars['Boolean']['input']>;
  _nempty?: InputMaybe<Scalars['Boolean']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Header = {
  __typename?: 'header';
  id: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  phone_text?: Maybe<Scalars['String']['output']>;
  whatsapp?: Maybe<Scalars['String']['output']>;
  whatsapp_text?: Maybe<Scalars['String']['output']>;
};

export type Header_Mutated = {
  __typename?: 'header_mutated';
  data?: Maybe<Header>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Home_Banners = {
  __typename?: 'home_banners';
  button_text?: Maybe<Scalars['String']['output']>;
  button_url?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mobile_image?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  page__home_id?: Maybe<Page__Home>;
  title?: Maybe<Scalars['String']['output']>;
  web_image?: Maybe<Scalars['ID']['output']>;
};


export type Home_BannersPage__Home_IdArgs = {
  filter?: InputMaybe<Page__Home_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Home_Banners_Aggregated = {
  __typename?: 'home_banners_aggregated';
  avg?: Maybe<Home_Banners_Aggregated_Fields>;
  avgDistinct?: Maybe<Home_Banners_Aggregated_Fields>;
  count?: Maybe<Home_Banners_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Home_Banners_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Home_Banners_Aggregated_Fields>;
  min?: Maybe<Home_Banners_Aggregated_Fields>;
  sum?: Maybe<Home_Banners_Aggregated_Fields>;
  sumDistinct?: Maybe<Home_Banners_Aggregated_Fields>;
};

export type Home_Banners_Aggregated_Count = {
  __typename?: 'home_banners_aggregated_count';
  button_text?: Maybe<Scalars['Int']['output']>;
  button_url?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  mobile_image?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  page__home_id?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['Int']['output']>;
  web_image?: Maybe<Scalars['Int']['output']>;
};

export type Home_Banners_Aggregated_Fields = {
  __typename?: 'home_banners_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  page__home_id?: Maybe<Scalars['Float']['output']>;
};

export type Home_Banners_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Home_Banners_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Home_Banners_Filter>>>;
  button_text?: InputMaybe<String_Filter_Operators>;
  button_url?: InputMaybe<String_Filter_Operators>;
  category?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  mobile_image?: InputMaybe<Id_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  page__home_id?: InputMaybe<Page__Home_Filter>;
  title?: InputMaybe<String_Filter_Operators>;
  web_image?: InputMaybe<Id_Filter_Operators>;
};

export type Home_Banners_Mutated = {
  __typename?: 'home_banners_mutated';
  data?: Maybe<Home_Banners>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Home_Banners_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Home_Banners_Filter>>>;
  _none?: InputMaybe<Home_Banners_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Home_Banners_Filter>>>;
  _some?: InputMaybe<Home_Banners_Filter>;
  button_text?: InputMaybe<String_Filter_Operators>;
  button_url?: InputMaybe<String_Filter_Operators>;
  category?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  mobile_image?: InputMaybe<Id_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  page__home_id?: InputMaybe<Page__Home_Filter>;
  title?: InputMaybe<String_Filter_Operators>;
  web_image?: InputMaybe<Id_Filter_Operators>;
};

export type Id_Filter_Operators = {
  _contains?: InputMaybe<Scalars['ID']['input']>;
  _empty?: InputMaybe<Scalars['Boolean']['input']>;
  _ends_with?: InputMaybe<Scalars['ID']['input']>;
  _eq?: InputMaybe<Scalars['ID']['input']>;
  _icontains?: InputMaybe<Scalars['ID']['input']>;
  _iends_with?: InputMaybe<Scalars['ID']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  _istarts_with?: InputMaybe<Scalars['ID']['input']>;
  _ncontains?: InputMaybe<Scalars['ID']['input']>;
  _nempty?: InputMaybe<Scalars['Boolean']['input']>;
  _nends_with?: InputMaybe<Scalars['ID']['input']>;
  _neq?: InputMaybe<Scalars['ID']['input']>;
  _niends_with?: InputMaybe<Scalars['ID']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  _nistarts_with?: InputMaybe<Scalars['ID']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _nstarts_with?: InputMaybe<Scalars['ID']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
  _starts_with?: InputMaybe<Scalars['ID']['input']>;
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

export type Page__Bank_Account = {
  __typename?: 'page__bank_account';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Page__Bank_Account_Mutated = {
  __typename?: 'page__bank_account_mutated';
  data?: Maybe<Page__Bank_Account>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Page__Distance_Selling_Agreement = {
  __typename?: 'page__distance_selling_agreement';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Page__Distance_Selling_Agreement_Mutated = {
  __typename?: 'page__distance_selling_agreement_mutated';
  data?: Maybe<Page__Distance_Selling_Agreement>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Page__Home = {
  __typename?: 'page__home';
  banners?: Maybe<Array<Maybe<Home_Banners>>>;
  banners_func?: Maybe<Count_Functions>;
  id: Scalars['ID']['output'];
  popular_sub_categories?: Maybe<Array<Maybe<Sub_Categories>>>;
  popular_sub_categories_func?: Maybe<Count_Functions>;
  sectoral_sub_categories?: Maybe<Array<Maybe<Sub_Categories>>>;
  sectoral_sub_categories_func?: Maybe<Count_Functions>;
};


export type Page__HomeBannersArgs = {
  filter?: InputMaybe<Home_Banners_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Page__HomePopular_Sub_CategoriesArgs = {
  filter?: InputMaybe<Sub_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Page__HomeSectoral_Sub_CategoriesArgs = {
  filter?: InputMaybe<Sub_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Page__Home_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Page__Home_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Page__Home_Filter>>>;
  banners?: InputMaybe<Home_Banners_Quantifier_Filter>;
  banners_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  popular_sub_categories?: InputMaybe<Sub_Categories_Quantifier_Filter>;
  popular_sub_categories_func?: InputMaybe<Count_Function_Filter_Operators>;
  sectoral_sub_categories?: InputMaybe<Sub_Categories_Quantifier_Filter>;
  sectoral_sub_categories_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Page__Home_Mutated = {
  __typename?: 'page__home_mutated';
  data?: Maybe<Page__Home>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Page__Membership_Agreement = {
  __typename?: 'page__membership_agreement';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Page__Membership_Agreement_Mutated = {
  __typename?: 'page__membership_agreement_mutated';
  data?: Maybe<Page__Membership_Agreement>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Page__Personal_Data_Protection_Law = {
  __typename?: 'page__personal_data_protection_law';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Page__Personal_Data_Protection_Law_Mutated = {
  __typename?: 'page__personal_data_protection_law_mutated';
  data?: Maybe<Page__Personal_Data_Protection_Law>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Page__Privacy_Agreement = {
  __typename?: 'page__privacy_agreement';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Page__Privacy_Agreement_Mutated = {
  __typename?: 'page__privacy_agreement_mutated';
  data?: Maybe<Page__Privacy_Agreement>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Page__Terms_Of_Use = {
  __typename?: 'page__terms_of_use';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type Page__Terms_Of_Use_Mutated = {
  __typename?: 'page__terms_of_use_mutated';
  data?: Maybe<Page__Terms_Of_Use>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Product_Colors = {
  __typename?: 'product_colors';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Product_Colors_Aggregated = {
  __typename?: 'product_colors_aggregated';
  avg?: Maybe<Product_Colors_Aggregated_Fields>;
  avgDistinct?: Maybe<Product_Colors_Aggregated_Fields>;
  count?: Maybe<Product_Colors_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Product_Colors_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Product_Colors_Aggregated_Fields>;
  min?: Maybe<Product_Colors_Aggregated_Fields>;
  sum?: Maybe<Product_Colors_Aggregated_Fields>;
  sumDistinct?: Maybe<Product_Colors_Aggregated_Fields>;
};

export type Product_Colors_Aggregated_Count = {
  __typename?: 'product_colors_aggregated_count';
  color?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
};

export type Product_Colors_Aggregated_Fields = {
  __typename?: 'product_colors_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

export type Product_Colors_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Product_Colors_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Product_Colors_Filter>>>;
  color?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
};

export type Product_Colors_Mutated = {
  __typename?: 'product_colors_mutated';
  data?: Maybe<Product_Colors>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Product_Option_Categories = {
  __typename?: 'product_option_categories';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Product_Option_Categories_Aggregated = {
  __typename?: 'product_option_categories_aggregated';
  avg?: Maybe<Product_Option_Categories_Aggregated_Fields>;
  avgDistinct?: Maybe<Product_Option_Categories_Aggregated_Fields>;
  count?: Maybe<Product_Option_Categories_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Product_Option_Categories_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Product_Option_Categories_Aggregated_Fields>;
  min?: Maybe<Product_Option_Categories_Aggregated_Fields>;
  sum?: Maybe<Product_Option_Categories_Aggregated_Fields>;
  sumDistinct?: Maybe<Product_Option_Categories_Aggregated_Fields>;
};

export type Product_Option_Categories_Aggregated_Count = {
  __typename?: 'product_option_categories_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
};

export type Product_Option_Categories_Aggregated_Fields = {
  __typename?: 'product_option_categories_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

export type Product_Option_Categories_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Product_Option_Categories_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Product_Option_Categories_Filter>>>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
};

export type Product_Option_Categories_Mutated = {
  __typename?: 'product_option_categories_mutated';
  data?: Maybe<Product_Option_Categories>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Product_Options = {
  __typename?: 'product_options';
  category?: Maybe<Product_Option_Categories>;
  code?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};


export type Product_OptionsCategoryArgs = {
  filter?: InputMaybe<Product_Option_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Product_Options_Aggregated = {
  __typename?: 'product_options_aggregated';
  avg?: Maybe<Product_Options_Aggregated_Fields>;
  avgDistinct?: Maybe<Product_Options_Aggregated_Fields>;
  count?: Maybe<Product_Options_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Product_Options_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Product_Options_Aggregated_Fields>;
  min?: Maybe<Product_Options_Aggregated_Fields>;
  sum?: Maybe<Product_Options_Aggregated_Fields>;
  sumDistinct?: Maybe<Product_Options_Aggregated_Fields>;
};

export type Product_Options_Aggregated_Count = {
  __typename?: 'product_options_aggregated_count';
  category?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
};

export type Product_Options_Aggregated_Fields = {
  __typename?: 'product_options_aggregated_fields';
  category?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type Product_Options_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Product_Options_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Product_Options_Filter>>>;
  category?: InputMaybe<Product_Option_Categories_Filter>;
  code?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
};

export type Product_Options_Mutated = {
  __typename?: 'product_options_mutated';
  data?: Maybe<Product_Options>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Product_Variation_Images = {
  __typename?: 'product_variation_images';
  big_image?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  product_variations_id?: Maybe<Product_Variations>;
  small_image?: Maybe<Scalars['ID']['output']>;
};


export type Product_Variation_ImagesProduct_Variations_IdArgs = {
  filter?: InputMaybe<Product_Variations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Product_Variation_Images_Aggregated = {
  __typename?: 'product_variation_images_aggregated';
  avg?: Maybe<Product_Variation_Images_Aggregated_Fields>;
  avgDistinct?: Maybe<Product_Variation_Images_Aggregated_Fields>;
  count?: Maybe<Product_Variation_Images_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Product_Variation_Images_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Product_Variation_Images_Aggregated_Fields>;
  min?: Maybe<Product_Variation_Images_Aggregated_Fields>;
  sum?: Maybe<Product_Variation_Images_Aggregated_Fields>;
  sumDistinct?: Maybe<Product_Variation_Images_Aggregated_Fields>;
};

export type Product_Variation_Images_Aggregated_Count = {
  __typename?: 'product_variation_images_aggregated_count';
  big_image?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  product_variations_id?: Maybe<Scalars['Int']['output']>;
  small_image?: Maybe<Scalars['Int']['output']>;
};

export type Product_Variation_Images_Aggregated_Fields = {
  __typename?: 'product_variation_images_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  product_variations_id?: Maybe<Scalars['Float']['output']>;
};

export type Product_Variation_Images_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Product_Variation_Images_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Product_Variation_Images_Filter>>>;
  big_image?: InputMaybe<Id_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  product_variations_id?: InputMaybe<Product_Variations_Filter>;
  small_image?: InputMaybe<Id_Filter_Operators>;
};

export type Product_Variation_Images_Mutated = {
  __typename?: 'product_variation_images_mutated';
  data?: Maybe<Product_Variation_Images>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Product_Variation_Images_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Product_Variation_Images_Filter>>>;
  _none?: InputMaybe<Product_Variation_Images_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Product_Variation_Images_Filter>>>;
  _some?: InputMaybe<Product_Variation_Images_Filter>;
  big_image?: InputMaybe<Id_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  product_variations_id?: InputMaybe<Product_Variations_Filter>;
  small_image?: InputMaybe<Id_Filter_Operators>;
};

export type Product_Variations = {
  __typename?: 'product_variations';
  color?: Maybe<Product_Colors>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Maybe<Product_Variation_Images>>>;
  images_func?: Maybe<Count_Functions>;
  main_option?: Maybe<Product_Options>;
  piece_price?: Maybe<Scalars['Float']['output']>;
  products_id?: Maybe<Products>;
  purchase_count_prices?: Maybe<Array<Maybe<Purchases_Counts>>>;
  purchase_count_prices_func?: Maybe<Count_Functions>;
  secondary_option?: Maybe<Product_Options>;
  stock_code?: Maybe<Scalars['String']['output']>;
  video_url?: Maybe<Scalars['String']['output']>;
};


export type Product_VariationsColorArgs = {
  filter?: InputMaybe<Product_Colors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Product_VariationsImagesArgs = {
  filter?: InputMaybe<Product_Variation_Images_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Product_VariationsMain_OptionArgs = {
  filter?: InputMaybe<Product_Options_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Product_VariationsProducts_IdArgs = {
  filter?: InputMaybe<Products_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Product_VariationsPurchase_Count_PricesArgs = {
  filter?: InputMaybe<Purchases_Counts_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Product_VariationsSecondary_OptionArgs = {
  filter?: InputMaybe<Product_Options_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Product_Variations_Aggregated = {
  __typename?: 'product_variations_aggregated';
  avg?: Maybe<Product_Variations_Aggregated_Fields>;
  avgDistinct?: Maybe<Product_Variations_Aggregated_Fields>;
  count?: Maybe<Product_Variations_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Product_Variations_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Product_Variations_Aggregated_Fields>;
  min?: Maybe<Product_Variations_Aggregated_Fields>;
  sum?: Maybe<Product_Variations_Aggregated_Fields>;
  sumDistinct?: Maybe<Product_Variations_Aggregated_Fields>;
};

export type Product_Variations_Aggregated_Count = {
  __typename?: 'product_variations_aggregated_count';
  color?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  images?: Maybe<Scalars['Int']['output']>;
  main_option?: Maybe<Scalars['Int']['output']>;
  piece_price?: Maybe<Scalars['Int']['output']>;
  products_id?: Maybe<Scalars['Int']['output']>;
  purchase_count_prices?: Maybe<Scalars['Int']['output']>;
  secondary_option?: Maybe<Scalars['Int']['output']>;
  stock_code?: Maybe<Scalars['Int']['output']>;
  video_url?: Maybe<Scalars['Int']['output']>;
};

export type Product_Variations_Aggregated_Fields = {
  __typename?: 'product_variations_aggregated_fields';
  color?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  main_option?: Maybe<Scalars['Float']['output']>;
  piece_price?: Maybe<Scalars['Float']['output']>;
  products_id?: Maybe<Scalars['Float']['output']>;
  secondary_option?: Maybe<Scalars['Float']['output']>;
};

export type Product_Variations_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Product_Variations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Product_Variations_Filter>>>;
  color?: InputMaybe<Product_Colors_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  images?: InputMaybe<Product_Variation_Images_Quantifier_Filter>;
  images_func?: InputMaybe<Count_Function_Filter_Operators>;
  main_option?: InputMaybe<Product_Options_Filter>;
  piece_price?: InputMaybe<Number_Filter_Operators>;
  products_id?: InputMaybe<Products_Filter>;
  purchase_count_prices?: InputMaybe<Purchases_Counts_Quantifier_Filter>;
  purchase_count_prices_func?: InputMaybe<Count_Function_Filter_Operators>;
  secondary_option?: InputMaybe<Product_Options_Filter>;
  stock_code?: InputMaybe<String_Filter_Operators>;
  video_url?: InputMaybe<String_Filter_Operators>;
};

export type Product_Variations_Mutated = {
  __typename?: 'product_variations_mutated';
  data?: Maybe<Product_Variations>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Product_Variations_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Product_Variations_Filter>>>;
  _none?: InputMaybe<Product_Variations_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Product_Variations_Filter>>>;
  _some?: InputMaybe<Product_Variations_Filter>;
  color?: InputMaybe<Product_Colors_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  images?: InputMaybe<Product_Variation_Images_Quantifier_Filter>;
  images_func?: InputMaybe<Count_Function_Filter_Operators>;
  main_option?: InputMaybe<Product_Options_Filter>;
  piece_price?: InputMaybe<Number_Filter_Operators>;
  products_id?: InputMaybe<Products_Filter>;
  purchase_count_prices?: InputMaybe<Purchases_Counts_Quantifier_Filter>;
  purchase_count_prices_func?: InputMaybe<Count_Function_Filter_Operators>;
  secondary_option?: InputMaybe<Product_Options_Filter>;
  stock_code?: InputMaybe<String_Filter_Operators>;
  video_url?: InputMaybe<String_Filter_Operators>;
};

export type Products = {
  __typename?: 'products';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sub_category_variation?: Maybe<Sub_Category_Variations>;
  sub_category_variations_id?: Maybe<Sub_Category_Variations>;
  variatins?: Maybe<Array<Maybe<Product_Variations>>>;
  variatins_func?: Maybe<Count_Functions>;
};


export type ProductsSub_Category_VariationArgs = {
  filter?: InputMaybe<Sub_Category_Variations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductsSub_Category_Variations_IdArgs = {
  filter?: InputMaybe<Sub_Category_Variations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductsVariatinsArgs = {
  filter?: InputMaybe<Product_Variations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Products_Aggregated = {
  __typename?: 'products_aggregated';
  avg?: Maybe<Products_Aggregated_Fields>;
  avgDistinct?: Maybe<Products_Aggregated_Fields>;
  count?: Maybe<Products_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Products_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Products_Aggregated_Fields>;
  min?: Maybe<Products_Aggregated_Fields>;
  sum?: Maybe<Products_Aggregated_Fields>;
  sumDistinct?: Maybe<Products_Aggregated_Fields>;
};

export type Products_Aggregated_Count = {
  __typename?: 'products_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['Int']['output']>;
  sub_category_variation?: Maybe<Scalars['Int']['output']>;
  sub_category_variations_id?: Maybe<Scalars['Int']['output']>;
  variatins?: Maybe<Scalars['Int']['output']>;
};

export type Products_Aggregated_Fields = {
  __typename?: 'products_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  sub_category_variation?: Maybe<Scalars['Float']['output']>;
  sub_category_variations_id?: Maybe<Scalars['Float']['output']>;
};

export type Products_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Products_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Products_Filter>>>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
  sub_category_variation?: InputMaybe<Sub_Category_Variations_Filter>;
  sub_category_variations_id?: InputMaybe<Sub_Category_Variations_Filter>;
  variatins?: InputMaybe<Product_Variations_Quantifier_Filter>;
  variatins_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Products_Mutated = {
  __typename?: 'products_mutated';
  data?: Maybe<Products>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Products_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Products_Filter>>>;
  _none?: InputMaybe<Products_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Products_Filter>>>;
  _some?: InputMaybe<Products_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
  sub_category_variation?: InputMaybe<Sub_Category_Variations_Filter>;
  sub_category_variations_id?: InputMaybe<Sub_Category_Variations_Filter>;
  variatins?: InputMaybe<Product_Variations_Quantifier_Filter>;
  variatins_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Purchases_Counts = {
  __typename?: 'purchases_counts';
  count?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  product_variations_id?: Maybe<Product_Variations>;
};


export type Purchases_CountsProduct_Variations_IdArgs = {
  filter?: InputMaybe<Product_Variations_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Purchases_Counts_Aggregated = {
  __typename?: 'purchases_counts_aggregated';
  avg?: Maybe<Purchases_Counts_Aggregated_Fields>;
  avgDistinct?: Maybe<Purchases_Counts_Aggregated_Fields>;
  count?: Maybe<Purchases_Counts_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Purchases_Counts_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Purchases_Counts_Aggregated_Fields>;
  min?: Maybe<Purchases_Counts_Aggregated_Fields>;
  sum?: Maybe<Purchases_Counts_Aggregated_Fields>;
  sumDistinct?: Maybe<Purchases_Counts_Aggregated_Fields>;
};

export type Purchases_Counts_Aggregated_Count = {
  __typename?: 'purchases_counts_aggregated_count';
  count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  product_variations_id?: Maybe<Scalars['Int']['output']>;
};

export type Purchases_Counts_Aggregated_Fields = {
  __typename?: 'purchases_counts_aggregated_fields';
  count?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product_variations_id?: Maybe<Scalars['Float']['output']>;
};

export type Purchases_Counts_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Purchases_Counts_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Purchases_Counts_Filter>>>;
  count?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  price?: InputMaybe<Number_Filter_Operators>;
  product_variations_id?: InputMaybe<Product_Variations_Filter>;
};

export type Purchases_Counts_Mutated = {
  __typename?: 'purchases_counts_mutated';
  data?: Maybe<Purchases_Counts>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Purchases_Counts_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Purchases_Counts_Filter>>>;
  _none?: InputMaybe<Purchases_Counts_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Purchases_Counts_Filter>>>;
  _some?: InputMaybe<Purchases_Counts_Filter>;
  count?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  price?: InputMaybe<Number_Filter_Operators>;
  product_variations_id?: InputMaybe<Product_Variations_Filter>;
};

export type Sectors = {
  __typename?: 'sectors';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  web_image?: Maybe<Scalars['ID']['output']>;
};

export type Sectors_Aggregated = {
  __typename?: 'sectors_aggregated';
  avg?: Maybe<Sectors_Aggregated_Fields>;
  avgDistinct?: Maybe<Sectors_Aggregated_Fields>;
  count?: Maybe<Sectors_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Sectors_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Sectors_Aggregated_Fields>;
  min?: Maybe<Sectors_Aggregated_Fields>;
  sum?: Maybe<Sectors_Aggregated_Fields>;
  sumDistinct?: Maybe<Sectors_Aggregated_Fields>;
};

export type Sectors_Aggregated_Count = {
  __typename?: 'sectors_aggregated_count';
  description?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  web_image?: Maybe<Scalars['Int']['output']>;
};

export type Sectors_Aggregated_Fields = {
  __typename?: 'sectors_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

export type Sectors_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Sectors_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Sectors_Filter>>>;
  description?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  web_image?: InputMaybe<Id_Filter_Operators>;
};

export type Sectors_Mutated = {
  __typename?: 'sectors_mutated';
  data?: Maybe<Sectors>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Social_Medias = {
  __typename?: 'social_medias';
  icon?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Social_Medias_Aggregated = {
  __typename?: 'social_medias_aggregated';
  avg?: Maybe<Social_Medias_Aggregated_Fields>;
  avgDistinct?: Maybe<Social_Medias_Aggregated_Fields>;
  count?: Maybe<Social_Medias_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Social_Medias_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Social_Medias_Aggregated_Fields>;
  min?: Maybe<Social_Medias_Aggregated_Fields>;
  sum?: Maybe<Social_Medias_Aggregated_Fields>;
  sumDistinct?: Maybe<Social_Medias_Aggregated_Fields>;
};

export type Social_Medias_Aggregated_Count = {
  __typename?: 'social_medias_aggregated_count';
  icon?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['Int']['output']>;
};

export type Social_Medias_Aggregated_Fields = {
  __typename?: 'social_medias_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
};

export type Social_Medias_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Social_Medias_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Social_Medias_Filter>>>;
  icon?: InputMaybe<Id_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  url?: InputMaybe<String_Filter_Operators>;
};

export type Social_Medias_Mutated = {
  __typename?: 'social_medias_mutated';
  data?: Maybe<Social_Medias>;
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
  card_image?: Maybe<Scalars['ID']['output']>;
  footer_id?: Maybe<Footer>;
  id: Scalars['ID']['output'];
  main_categories_id?: Maybe<Main_Categories>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  page__home_id?: Maybe<Page__Home>;
  page__home_sectoral_id?: Maybe<Page__Home>;
  sector?: Maybe<Array<Maybe<Sub_Categories_Sectors>>>;
  sector_func?: Maybe<Count_Functions>;
  slug?: Maybe<Scalars['String']['output']>;
  variations?: Maybe<Array<Maybe<Sub_Category_Variations>>>;
  variations_func?: Maybe<Count_Functions>;
};


export type Sub_CategoriesFooter_IdArgs = {
  filter?: InputMaybe<Footer_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Sub_CategoriesMain_Categories_IdArgs = {
  filter?: InputMaybe<Main_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Sub_CategoriesPage__Home_IdArgs = {
  filter?: InputMaybe<Page__Home_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Sub_CategoriesPage__Home_Sectoral_IdArgs = {
  filter?: InputMaybe<Page__Home_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Sub_CategoriesSectorArgs = {
  filter?: InputMaybe<Sub_Categories_Sectors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Sub_CategoriesVariationsArgs = {
  filter?: InputMaybe<Sub_Category_Variations_Filter>;
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
  card_image?: Maybe<Scalars['Int']['output']>;
  footer_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  main_categories_id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  page__home_id?: Maybe<Scalars['Int']['output']>;
  page__home_sectoral_id?: Maybe<Scalars['Int']['output']>;
  sector?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['Int']['output']>;
  variations?: Maybe<Scalars['Int']['output']>;
};

export type Sub_Categories_Aggregated_Fields = {
  __typename?: 'sub_categories_aggregated_fields';
  footer_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  main_categories_id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  page__home_id?: Maybe<Scalars['Float']['output']>;
  page__home_sectoral_id?: Maybe<Scalars['Float']['output']>;
};

export type Sub_Categories_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Sub_Categories_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Sub_Categories_Filter>>>;
  card_image?: InputMaybe<Id_Filter_Operators>;
  footer_id?: InputMaybe<Footer_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  main_categories_id?: InputMaybe<Main_Categories_Filter>;
  name?: InputMaybe<String_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  page__home_id?: InputMaybe<Page__Home_Filter>;
  page__home_sectoral_id?: InputMaybe<Page__Home_Filter>;
  sector?: InputMaybe<Sub_Categories_Sectors_Quantifier_Filter>;
  sector_func?: InputMaybe<Count_Function_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
  variations?: InputMaybe<Sub_Category_Variations_Quantifier_Filter>;
  variations_func?: InputMaybe<Count_Function_Filter_Operators>;
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
  card_image?: InputMaybe<Id_Filter_Operators>;
  footer_id?: InputMaybe<Footer_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  main_categories_id?: InputMaybe<Main_Categories_Filter>;
  name?: InputMaybe<String_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  page__home_id?: InputMaybe<Page__Home_Filter>;
  page__home_sectoral_id?: InputMaybe<Page__Home_Filter>;
  sector?: InputMaybe<Sub_Categories_Sectors_Quantifier_Filter>;
  sector_func?: InputMaybe<Count_Function_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
  variations?: InputMaybe<Sub_Category_Variations_Quantifier_Filter>;
  variations_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Sub_Categories_Sectors = {
  __typename?: 'sub_categories_sectors';
  id: Scalars['ID']['output'];
  sectors_id?: Maybe<Sectors>;
  sub_categories_id?: Maybe<Sub_Categories>;
};


export type Sub_Categories_SectorsSectors_IdArgs = {
  filter?: InputMaybe<Sectors_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Sub_Categories_SectorsSub_Categories_IdArgs = {
  filter?: InputMaybe<Sub_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Sub_Categories_Sectors_Aggregated = {
  __typename?: 'sub_categories_sectors_aggregated';
  avg?: Maybe<Sub_Categories_Sectors_Aggregated_Fields>;
  avgDistinct?: Maybe<Sub_Categories_Sectors_Aggregated_Fields>;
  count?: Maybe<Sub_Categories_Sectors_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Sub_Categories_Sectors_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Sub_Categories_Sectors_Aggregated_Fields>;
  min?: Maybe<Sub_Categories_Sectors_Aggregated_Fields>;
  sum?: Maybe<Sub_Categories_Sectors_Aggregated_Fields>;
  sumDistinct?: Maybe<Sub_Categories_Sectors_Aggregated_Fields>;
};

export type Sub_Categories_Sectors_Aggregated_Count = {
  __typename?: 'sub_categories_sectors_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  sectors_id?: Maybe<Scalars['Int']['output']>;
  sub_categories_id?: Maybe<Scalars['Int']['output']>;
};

export type Sub_Categories_Sectors_Aggregated_Fields = {
  __typename?: 'sub_categories_sectors_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sectors_id?: Maybe<Scalars['Float']['output']>;
  sub_categories_id?: Maybe<Scalars['Float']['output']>;
};

export type Sub_Categories_Sectors_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Sub_Categories_Sectors_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Sub_Categories_Sectors_Filter>>>;
  id?: InputMaybe<Number_Filter_Operators>;
  sectors_id?: InputMaybe<Sectors_Filter>;
  sub_categories_id?: InputMaybe<Sub_Categories_Filter>;
};

export type Sub_Categories_Sectors_Mutated = {
  __typename?: 'sub_categories_sectors_mutated';
  data?: Maybe<Sub_Categories_Sectors>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Sub_Categories_Sectors_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Sub_Categories_Sectors_Filter>>>;
  _none?: InputMaybe<Sub_Categories_Sectors_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Sub_Categories_Sectors_Filter>>>;
  _some?: InputMaybe<Sub_Categories_Sectors_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  sectors_id?: InputMaybe<Sectors_Filter>;
  sub_categories_id?: InputMaybe<Sub_Categories_Filter>;
};

export type Sub_Category_Variations = {
  __typename?: 'sub_category_variations';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  products?: Maybe<Array<Maybe<Products>>>;
  products_func?: Maybe<Count_Functions>;
  slug?: Maybe<Scalars['String']['output']>;
  sub_categories_id?: Maybe<Sub_Categories>;
};


export type Sub_Category_VariationsProductsArgs = {
  filter?: InputMaybe<Products_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Sub_Category_VariationsSub_Categories_IdArgs = {
  filter?: InputMaybe<Sub_Categories_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Sub_Category_Variations_Aggregated = {
  __typename?: 'sub_category_variations_aggregated';
  avg?: Maybe<Sub_Category_Variations_Aggregated_Fields>;
  avgDistinct?: Maybe<Sub_Category_Variations_Aggregated_Fields>;
  count?: Maybe<Sub_Category_Variations_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Sub_Category_Variations_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Sub_Category_Variations_Aggregated_Fields>;
  min?: Maybe<Sub_Category_Variations_Aggregated_Fields>;
  sum?: Maybe<Sub_Category_Variations_Aggregated_Fields>;
  sumDistinct?: Maybe<Sub_Category_Variations_Aggregated_Fields>;
};

export type Sub_Category_Variations_Aggregated_Count = {
  __typename?: 'sub_category_variations_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  products?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['Int']['output']>;
  sub_categories_id?: Maybe<Scalars['Int']['output']>;
};

export type Sub_Category_Variations_Aggregated_Fields = {
  __typename?: 'sub_category_variations_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  sub_categories_id?: Maybe<Scalars['Float']['output']>;
};

export type Sub_Category_Variations_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Sub_Category_Variations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Sub_Category_Variations_Filter>>>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  products?: InputMaybe<Products_Quantifier_Filter>;
  products_func?: InputMaybe<Count_Function_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
  sub_categories_id?: InputMaybe<Sub_Categories_Filter>;
};

export type Sub_Category_Variations_Mutated = {
  __typename?: 'sub_category_variations_mutated';
  data?: Maybe<Sub_Category_Variations>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Sub_Category_Variations_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Sub_Category_Variations_Filter>>>;
  _none?: InputMaybe<Sub_Category_Variations_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Sub_Category_Variations_Filter>>>;
  _some?: InputMaybe<Sub_Category_Variations_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  order?: InputMaybe<Number_Filter_Operators>;
  products?: InputMaybe<Products_Quantifier_Filter>;
  products_func?: InputMaybe<Count_Function_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
  sub_categories_id?: InputMaybe<Sub_Categories_Filter>;
};

export type Update_About_Us_Features_Input = {
  about_us_id?: InputMaybe<Update_About_Us_Input>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Update_About_Us_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Array<InputMaybe<Update_About_Us_Features_Input>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  specs?: InputMaybe<Array<InputMaybe<Update_About_Us_Specs_Input>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Update_About_Us_Specs_Input = {
  about_us_id?: InputMaybe<Update_About_Us_Input>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Bank_Accounts_Input = {
  account_no?: InputMaybe<Scalars['String']['input']>;
  account_owner?: InputMaybe<Scalars['String']['input']>;
  bank_branch?: InputMaybe<Scalars['String']['input']>;
  bank_name?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type Update_Contact_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  whatsapp?: InputMaybe<Scalars['String']['input']>;
  work_hours_mid_week?: InputMaybe<Scalars['String']['input']>;
  work_hours_saturday?: InputMaybe<Scalars['String']['input']>;
  work_hours_sunday?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Footer_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  copyright?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  etbis_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  long_description?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  popular_sub_categories?: InputMaybe<Array<InputMaybe<Update_Sub_Categories_Input>>>;
  review_url?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  whatsapp?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Header_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  phone_text?: InputMaybe<Scalars['String']['input']>;
  whatsapp?: InputMaybe<Scalars['String']['input']>;
  whatsapp_text?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Home_Banners_Input = {
  button_text?: InputMaybe<Scalars['String']['input']>;
  button_url?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  mobile_image?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  page__home_id?: InputMaybe<Update_Page__Home_Input>;
  title?: InputMaybe<Scalars['String']['input']>;
  web_image?: InputMaybe<Scalars['ID']['input']>;
};

export type Update_Main_Categories_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sub_categories?: InputMaybe<Array<InputMaybe<Update_Sub_Categories_Input>>>;
};

export type Update_Page__Bank_Account_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Page__Distance_Selling_Agreement_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Page__Home_Input = {
  banners?: InputMaybe<Array<InputMaybe<Update_Home_Banners_Input>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  popular_sub_categories?: InputMaybe<Array<InputMaybe<Update_Sub_Categories_Input>>>;
  sectoral_sub_categories?: InputMaybe<Array<InputMaybe<Update_Sub_Categories_Input>>>;
};

export type Update_Page__Membership_Agreement_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Page__Personal_Data_Protection_Law_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Page__Privacy_Agreement_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Page__Terms_Of_Use_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Product_Colors_Input = {
  color?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Product_Option_Categories_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Product_Options_Input = {
  category?: InputMaybe<Update_Product_Option_Categories_Input>;
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Product_Variation_Images_Input = {
  big_image?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  product_variations_id?: InputMaybe<Update_Product_Variations_Input>;
  small_image?: InputMaybe<Scalars['ID']['input']>;
};

export type Update_Product_Variations_Input = {
  color?: InputMaybe<Update_Product_Colors_Input>;
  id?: InputMaybe<Scalars['ID']['input']>;
  images?: InputMaybe<Array<InputMaybe<Update_Product_Variation_Images_Input>>>;
  main_option?: InputMaybe<Update_Product_Options_Input>;
  piece_price?: InputMaybe<Scalars['Float']['input']>;
  products_id?: InputMaybe<Update_Products_Input>;
  purchase_count_prices?: InputMaybe<Array<InputMaybe<Update_Purchases_Counts_Input>>>;
  secondary_option?: InputMaybe<Update_Product_Options_Input>;
  stock_code?: InputMaybe<Scalars['String']['input']>;
  video_url?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Products_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sub_category_variation?: InputMaybe<Update_Sub_Category_Variations_Input>;
  sub_category_variations_id?: InputMaybe<Update_Sub_Category_Variations_Input>;
  variatins?: InputMaybe<Array<InputMaybe<Update_Product_Variations_Input>>>;
};

export type Update_Purchases_Counts_Input = {
  count?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  product_variations_id?: InputMaybe<Update_Product_Variations_Input>;
};

export type Update_Sectors_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  web_image?: InputMaybe<Scalars['ID']['input']>;
};

export type Update_Social_Medias_Input = {
  icon?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Sub_Categories_Input = {
  card_image?: InputMaybe<Scalars['ID']['input']>;
  footer_id?: InputMaybe<Update_Footer_Input>;
  id?: InputMaybe<Scalars['ID']['input']>;
  main_categories_id?: InputMaybe<Update_Main_Categories_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  page__home_id?: InputMaybe<Update_Page__Home_Input>;
  page__home_sectoral_id?: InputMaybe<Update_Page__Home_Input>;
  sector?: InputMaybe<Array<InputMaybe<Update_Sub_Categories_Sectors_Input>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  variations?: InputMaybe<Array<InputMaybe<Update_Sub_Category_Variations_Input>>>;
};

export type Update_Sub_Categories_Sectors_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  sectors_id?: InputMaybe<Update_Sectors_Input>;
  sub_categories_id?: InputMaybe<Update_Sub_Categories_Input>;
};

export type Update_Sub_Category_Variations_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  products?: InputMaybe<Array<InputMaybe<Update_Products_Input>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sub_categories_id?: InputMaybe<Update_Sub_Categories_Input>;
};

export type Version_About_Us = {
  __typename?: 'version_about_us';
  content?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  specs?: Maybe<Scalars['JSON']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Version_About_Us_Features = {
  __typename?: 'version_about_us_features';
  about_us_id?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Version_About_Us_Specs = {
  __typename?: 'version_about_us_specs';
  about_us_id?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Version_Bank_Accounts = {
  __typename?: 'version_bank_accounts';
  account_no?: Maybe<Scalars['String']['output']>;
  account_owner?: Maybe<Scalars['String']['output']>;
  bank_branch?: Maybe<Scalars['String']['output']>;
  bank_name?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  iban?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
};

export type Version_Contact = {
  __typename?: 'version_contact';
  address?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  latitude?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  whatsapp?: Maybe<Scalars['String']['output']>;
  work_hours_mid_week?: Maybe<Scalars['String']['output']>;
  work_hours_saturday?: Maybe<Scalars['String']['output']>;
  work_hours_sunday?: Maybe<Scalars['String']['output']>;
};

export type Version_Footer = {
  __typename?: 'version_footer';
  address?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  etbis_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  long_description?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  popular_sub_categories?: Maybe<Scalars['JSON']['output']>;
  review_url?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  whatsapp?: Maybe<Scalars['String']['output']>;
};

export type Version_Header = {
  __typename?: 'version_header';
  id?: Maybe<Scalars['ID']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  phone_text?: Maybe<Scalars['String']['output']>;
  whatsapp?: Maybe<Scalars['String']['output']>;
  whatsapp_text?: Maybe<Scalars['String']['output']>;
};

export type Version_Home_Banners = {
  __typename?: 'version_home_banners';
  button_text?: Maybe<Scalars['String']['output']>;
  button_url?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mobile_image?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  page__home_id?: Maybe<Scalars['JSON']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  web_image?: Maybe<Scalars['ID']['output']>;
};

export type Version_Main_Categories = {
  __typename?: 'version_main_categories';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sub_categories?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Page__Bank_Account = {
  __typename?: 'version_page__bank_account';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Version_Page__Distance_Selling_Agreement = {
  __typename?: 'version_page__distance_selling_agreement';
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Version_Page__Home = {
  __typename?: 'version_page__home';
  banners?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  popular_sub_categories?: Maybe<Scalars['JSON']['output']>;
  sectoral_sub_categories?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Page__Membership_Agreement = {
  __typename?: 'version_page__membership_agreement';
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Version_Page__Personal_Data_Protection_Law = {
  __typename?: 'version_page__personal_data_protection_law';
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Version_Page__Privacy_Agreement = {
  __typename?: 'version_page__privacy_agreement';
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Version_Page__Terms_Of_Use = {
  __typename?: 'version_page__terms_of_use';
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Version_Product_Colors = {
  __typename?: 'version_product_colors';
  color?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Version_Product_Option_Categories = {
  __typename?: 'version_product_option_categories';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Version_Product_Options = {
  __typename?: 'version_product_options';
  category?: Maybe<Scalars['JSON']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Version_Product_Variation_Images = {
  __typename?: 'version_product_variation_images';
  big_image?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  product_variations_id?: Maybe<Scalars['JSON']['output']>;
  small_image?: Maybe<Scalars['ID']['output']>;
};

export type Version_Product_Variations = {
  __typename?: 'version_product_variations';
  color?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  images?: Maybe<Scalars['JSON']['output']>;
  main_option?: Maybe<Scalars['JSON']['output']>;
  piece_price?: Maybe<Scalars['Float']['output']>;
  products_id?: Maybe<Scalars['JSON']['output']>;
  purchase_count_prices?: Maybe<Scalars['JSON']['output']>;
  secondary_option?: Maybe<Scalars['JSON']['output']>;
  stock_code?: Maybe<Scalars['String']['output']>;
  video_url?: Maybe<Scalars['String']['output']>;
};

export type Version_Products = {
  __typename?: 'version_products';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sub_category_variation?: Maybe<Scalars['JSON']['output']>;
  sub_category_variations_id?: Maybe<Scalars['JSON']['output']>;
  variatins?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Purchases_Counts = {
  __typename?: 'version_purchases_counts';
  count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product_variations_id?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Sectors = {
  __typename?: 'version_sectors';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  web_image?: Maybe<Scalars['ID']['output']>;
};

export type Version_Social_Medias = {
  __typename?: 'version_social_medias';
  icon?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Version_Sub_Categories = {
  __typename?: 'version_sub_categories';
  card_image?: Maybe<Scalars['ID']['output']>;
  footer_id?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  main_categories_id?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  page__home_id?: Maybe<Scalars['JSON']['output']>;
  page__home_sectoral_id?: Maybe<Scalars['JSON']['output']>;
  sector?: Maybe<Scalars['JSON']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  variations?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Sub_Categories_Sectors = {
  __typename?: 'version_sub_categories_sectors';
  id?: Maybe<Scalars['ID']['output']>;
  sectors_id?: Maybe<Scalars['JSON']['output']>;
  sub_categories_id?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Sub_Category_Variations = {
  __typename?: 'version_sub_category_variations';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  products?: Maybe<Scalars['JSON']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sub_categories_id?: Maybe<Scalars['JSON']['output']>;
};

export type GetBankAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBankAccountsQuery = { __typename?: 'Query', bank_accounts: Array<{ __typename?: 'bank_accounts', id: string, bank_name?: string | null, bank_branch?: string | null, currency?: string | null, account_owner?: string | null, iban?: string | null, account_no?: string | null, order?: number | null }> };

export type GetCategoryBarQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoryBarQuery = { __typename?: 'Query', main_categories: Array<{ __typename?: 'main_categories', id: string, name?: string | null, slug?: string | null, order?: number | null, sub_categories?: Array<{ __typename?: 'sub_categories', name?: string | null, slug?: string | null, order?: number | null } | null> | null }> };

export type GetContactQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContactQuery = { __typename?: 'Query', contact?: { __typename?: 'contact', phone?: string | null, whatsapp?: string | null, email?: string | null, address?: string | null, work_hours_mid_week?: string | null, work_hours_saturday?: string | null, work_hours_sunday?: string | null, latitude?: string | null, longitude?: string | null } | null };

export type GetCorporateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCorporateQuery = { __typename?: 'Query', about_us?: { __typename?: 'about_us', title?: string | null, content?: string | null, specs?: Array<{ __typename?: 'about_us_specs', title?: string | null, description?: string | null } | null> | null, features?: Array<{ __typename?: 'about_us_features', title?: string | null, description?: string | null } | null> | null } | null };

export type GetFooterDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFooterDataQuery = { __typename?: 'Query', footer?: { __typename?: 'footer', title?: string | null, description?: string | null, phone?: string | null, whatsapp?: string | null, email?: string | null, address?: string | null, review_url?: string | null, long_description?: string | null, etbis_url?: string | null, copyright?: string | null, popular_sub_categories?: Array<{ __typename?: 'sub_categories', name?: string | null, slug?: string | null } | null> | null } | null, social_medias: Array<{ __typename?: 'social_medias', icon?: string | null, url?: string | null, order?: number | null }> };

export type GetHeaderDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHeaderDataQuery = { __typename?: 'Query', header?: { __typename?: 'header', phone?: string | null, phone_text?: string | null, whatsapp?: string | null, whatsapp_text?: string | null } | null, social_medias: Array<{ __typename?: 'social_medias', icon?: string | null, url?: string | null, order?: number | null }> };

export type GetHomePageDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomePageDataQuery = { __typename?: 'Query', page__home?: { __typename?: 'page__home', banners?: Array<{ __typename?: 'home_banners', id: string, category?: string | null, title?: string | null, description?: string | null, button_text?: string | null, button_url?: string | null, web_image?: string | null, mobile_image?: string | null, order?: number | null } | null> | null, sectoral_sub_categories?: Array<{ __typename?: 'sub_categories', id: string, name?: string | null, slug?: string | null, order?: number | null, sector?: Array<{ __typename?: 'sub_categories_sectors', sectors_id?: { __typename?: 'sectors', id: string } | null } | null> | null } | null> | null, popular_sub_categories?: Array<{ __typename?: 'sub_categories', id: string, name?: string | null, slug?: string | null, order?: number | null, card_image?: string | null } | null> | null } | null, sectors: Array<{ __typename?: 'sectors', id: string, name?: string | null, description?: string | null, web_image?: string | null }> };

export type GetProductListQueryVariables = Exact<{
  subcategorySlug: Scalars['String']['input'];
  variation?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductListQuery = { __typename?: 'Query', sub_categories: Array<{ __typename?: 'sub_categories', id: string, name?: string | null, slug?: string | null, variations?: Array<{ __typename?: 'sub_category_variations', name?: string | null, slug?: string | null, order?: number | null, products?: Array<{ __typename?: 'products', name?: string | null, slug?: string | null, variatins?: Array<{ __typename?: 'product_variations', main_option?: { __typename?: 'product_options', id: string, name?: string | null, category?: { __typename?: 'product_option_categories', name?: string | null } | null } | null, secondary_option?: { __typename?: 'product_options', id: string, name?: string | null, category?: { __typename?: 'product_option_categories', name?: string | null } | null } | null, color?: { __typename?: 'product_colors', id: string, name?: string | null, color?: string | null } | null, images?: Array<{ __typename?: 'product_variation_images', big_image?: string | null } | null> | null } | null> | null } | null> | null } | null> | null }> };

export type GetProductDataQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductDataQuery = { __typename?: 'Query', products: Array<{ __typename?: 'products', id: string, name?: string | null, slug?: string | null, sub_category_variation?: { __typename?: 'sub_category_variations', name?: string | null, slug?: string | null } | null, variatins?: Array<{ __typename?: 'product_variations', piece_price?: number | null, stock_code?: string | null, video_url?: string | null, main_option?: { __typename?: 'product_options', id: string, name?: string | null, code?: string | null, category?: { __typename?: 'product_option_categories', id: string, name?: string | null } | null } | null, secondary_option?: { __typename?: 'product_options', id: string, name?: string | null, code?: string | null, category?: { __typename?: 'product_option_categories', id: string, name?: string | null } | null } | null, color?: { __typename?: 'product_colors', name?: string | null, color?: string | null } | null, purchase_count_prices?: Array<{ __typename?: 'purchases_counts', id: string, count?: number | null, price?: number | null } | null> | null, images?: Array<{ __typename?: 'product_variation_images', big_image?: string | null, small_image?: string | null } | null> | null } | null> | null }> };


export const GetBankAccountsDocument = gql`
    query GetBankAccounts {
  bank_accounts {
    id
    bank_name
    bank_branch
    currency
    account_owner
    iban
    account_no
    order
  }
}
    `;
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
export const GetContactDocument = gql`
    query GetContact {
  contact {
    phone
    whatsapp
    email
    address
    work_hours_mid_week
    work_hours_saturday
    work_hours_sunday
    latitude
    longitude
  }
}
    `;
export const GetCorporateDocument = gql`
    query GetCorporate {
  about_us {
    title
    content
    specs(sort: ["order"]) {
      title
      description
    }
    features(sort: ["order"]) {
      title
      description
    }
  }
}
    `;
export const GetFooterDataDocument = gql`
    query GetFooterData {
  footer {
    title
    description
    phone
    whatsapp
    email
    address
    review_url
    long_description
    etbis_url
    copyright
    popular_sub_categories {
      name
      slug
    }
  }
  social_medias {
    icon
    url
    order
  }
}
    `;
export const GetHeaderDataDocument = gql`
    query GetHeaderData {
  header {
    phone
    phone_text
    whatsapp
    whatsapp_text
  }
  social_medias {
    icon
    url
    order
  }
}
    `;
export const GetHomePageDataDocument = gql`
    query GetHomePageData {
  page__home {
    banners {
      id
      category
      title
      description
      button_text
      button_url
      web_image
      mobile_image
      order
    }
    sectoral_sub_categories {
      id
      name
      slug
      order
      sector {
        sectors_id {
          id
        }
      }
    }
    popular_sub_categories {
      id
      name
      slug
      order
      card_image
    }
  }
  sectors {
    id
    name
    description
    web_image
  }
}
    `;
export const GetProductListDocument = gql`
    query GetProductList($subcategorySlug: String!, $variation: String) {
  sub_categories(filter: {slug: {_eq: $subcategorySlug}}, limit: 1) {
    id
    name
    slug
    variations(filter: {slug: {_eq: $variation}}) {
      name
      slug
      order
      products {
        name
        slug
        variatins {
          main_option {
            id
            name
            category {
              name
            }
          }
          secondary_option {
            id
            name
            category {
              name
            }
          }
          color {
            id
            name
            color
          }
          images(limit: 1) {
            big_image
          }
        }
      }
    }
  }
}
    `;
export const GetProductDataDocument = gql`
    query GetProductData($slug: String) {
  products(filter: {slug: {_eq: $slug}}, limit: 1) {
    id
    name
    slug
    sub_category_variation {
      name
      slug
    }
    variatins {
      main_option {
        id
        name
        code
        category {
          id
          name
        }
      }
      secondary_option {
        id
        name
        code
        category {
          id
          name
        }
      }
      color {
        name
        color
      }
      piece_price
      stock_code
      purchase_count_prices {
        id
        count
        price
      }
      images {
        big_image
        small_image
      }
      video_url
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetBankAccounts(variables?: GetBankAccountsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetBankAccountsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBankAccountsQuery>({ document: GetBankAccountsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetBankAccounts', 'query', variables);
    },
    GetCategoryBar(variables?: GetCategoryBarQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetCategoryBarQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoryBarQuery>({ document: GetCategoryBarDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetCategoryBar', 'query', variables);
    },
    GetContact(variables?: GetContactQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetContactQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetContactQuery>({ document: GetContactDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetContact', 'query', variables);
    },
    GetCorporate(variables?: GetCorporateQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetCorporateQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCorporateQuery>({ document: GetCorporateDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetCorporate', 'query', variables);
    },
    GetFooterData(variables?: GetFooterDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetFooterDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFooterDataQuery>({ document: GetFooterDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetFooterData', 'query', variables);
    },
    GetHeaderData(variables?: GetHeaderDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetHeaderDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHeaderDataQuery>({ document: GetHeaderDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetHeaderData', 'query', variables);
    },
    GetHomePageData(variables?: GetHomePageDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetHomePageDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHomePageDataQuery>({ document: GetHomePageDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetHomePageData', 'query', variables);
    },
    GetProductList(variables: GetProductListQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetProductListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductListQuery>({ document: GetProductListDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetProductList', 'query', variables);
    },
    GetProductData(variables?: GetProductDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetProductDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductDataQuery>({ document: GetProductDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetProductData', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;