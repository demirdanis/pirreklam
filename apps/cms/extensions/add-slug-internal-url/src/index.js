export default ({ filter }, { services, getSchema }) => {
  filter("items.read", async (payload, meta, context) => {
    if (
      meta.collection !== "Page" &&
      meta.collection !== "Header" &&
      meta.collection !== "Footer"
    )
      return payload;

    const items = Array.isArray(payload) ? payload : [payload];

    // Process all items
    for (const item of items) {
      // Recursively find and add slug to all objects with internal_url
      await findAndAddSlugToInternalUrls(item, context, services, getSchema);
    }

    return Array.isArray(payload) ? items : items[0];
  });
};

// Helper function to recursively find objects with internal_url and add slug
async function findAndAddSlugToInternalUrls(obj, context, services, getSchema) {
  if (!obj || typeof obj !== "object") return;

  // Handle arrays
  if (Array.isArray(obj)) {
    for (const item of obj) {
      await findAndAddSlugToInternalUrls(item, context, services, getSchema);
    }
    return;
  }

  // Check if current object has internal_url
  if (obj.internal_url && typeof obj.internal_url === "object") {
    // Get collection and key from internal_url
    const collection = obj.internal_url.collection;
    const key = obj.internal_url.key;

    const { ItemsService } = services;

    const schema = await getSchema();
    const service = new ItemsService(collection, {
      schema,
      accountability: context.accountability,
    });

    if (!service) {
      obj.internal_url.slug = "#";
    } else {
      try {
        const record = await service.readOne(key, {
          fields: ["translations.slug", "yp_translations.slug"],
        });

        if (
          record &&
          (record.translations?.[0]?.slug || record.yp_translations?.[0]?.slug)
        ) {
          obj.internal_url.slug =
            record.translations?.[0]?.slug || record.yp_translations?.[0]?.slug;
          // console.log(
          //   `Added slug '${record.translations[0].slug}' from database record to internal_url`
          // );
        } else {
          // Fallback if no slug found in the record
          obj.internal_url.slug = "#";
          // console.log("Added default slug to internal_url:", obj.internal_url);
        }
      } catch (error) {
        obj.internal_url.slug = "#";
      }
    }
  }

  // Recursively check all properties
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === "object") {
      await findAndAddSlugToInternalUrls(
        obj[key],
        context,
        services,
        getSchema
      );
    }
  }
}
