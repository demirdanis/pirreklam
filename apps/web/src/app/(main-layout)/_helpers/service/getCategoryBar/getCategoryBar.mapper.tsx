import type { CategoryBarData } from '@/components/category-bar/category-bar.types';
import type { GetCategoryBarQuery } from '@/generated/graphql';

export function GetCategoryBarMapper(
  data: GetCategoryBarQuery
): CategoryBarData {
  return {
    categories: data.main_categories
      ? data.main_categories
          .filter((category) => category.name && category.slug)
          .map((category) => ({
            id: category.id,
            label: category.name!,
            href: category.slug!,
            subItems:
              category.sub_categories
                ?.filter(
                  (subcategory) => subcategory?.name && subcategory?.slug
                )
                .map((subcategory) => ({
                  label: subcategory!.name!,
                  href: `${category.slug}/${subcategory!.slug}`,
                })) || [],
          }))
      : [],
  };
}
