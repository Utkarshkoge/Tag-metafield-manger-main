var _a;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter, UNSAFE_withErrorBoundaryProps, Meta, Links, Scripts, UNSAFE_withComponentProps, Outlet, ScrollRestoration, useLoaderData, useActionData, Form, redirect, useRouteError, useFetcher, useNavigate } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import "@shopify/shopify-app-react-router/adapters/node";
import { shopifyApp, AppDistribution, ApiVersion, LoginErrorType, boundary } from "@shopify/shopify-app-react-router/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { AppProvider as AppProvider$1, Modal, BlockStack, InlineStack, Text, Pagination, Box, IndexTable, List, Page, Banner, Button, Layout, LegacyCard, Select, Spinner, Badge, ProgressBar, EmptyState, ResourceList, ResourceItem, ChoiceList, DropZone, Icon, Card, useBreakpoints, TextField, ButtonGroup, FormLayout, Tag, useIndexResourceState, Scrollable, InlineGrid } from "@shopify/polaris";
import { DatabaseIcon, SearchIcon, RefreshIcon, CheckCircleIcon, FileIcon, ImportIcon, DeleteIcon, NoteIcon, HomeIcon, XIcon, PlusIcon, ViewIcon, RotateLeftIcon, AlertTriangleIcon, ClockIcon, QuestionCircleIcon, DiscountIcon } from "@shopify/polaris-icons";
import Papa from "papaparse";
import { HelpCircle, Tag as Tag$1, Database, History, AlertCircle, Download, Clock, RotateCcw, FileText, ChevronDown } from "lucide-react";
if (process.env.NODE_ENV !== "production") {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient();
  }
}
const prisma = global.prismaGlobal ?? new PrismaClient();
const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October25,
  scopes: (_a = process.env.SCOPES) == null ? void 0 : _a.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
});
ApiVersion.October25;
const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
const authenticate = shopify.authenticate;
shopify.unauthenticated;
const login = shopify.login;
shopify.registerWebhooks;
shopify.sessionStorage;
const streamTimeout = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, reactRouterContext) {
  addDocumentResponseHeaders(request, responseHeaders);
  const userAgent = request.headers.get("user-agent");
  const callbackName = isbot(userAgent ?? "") ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        ServerRouter,
        {
          context: reactRouterContext,
          url: request.url
        }
      ),
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          console.error(error);
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const ErrorBoundary$1 = UNSAFE_withErrorBoundaryProps(function ErrorBoundary() {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("title", {
        children: "System Error"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "bg-white text-black antialiased",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-col items-center justify-center h-screen p-6",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "max-w-md w-full border-t-4 border-black pt-8",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-6xl font-black uppercase tracking-tighter mb-6",
            children: "Error 404."
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl font-bold leading-none mb-4",
            children: "Page Not Found."
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium leading-relaxed text-gray-900 mb-10",
            children: "The page you are looking for does not exist or has been moved."
          }), /* @__PURE__ */ jsx("div", {
            className: "pt-6 border-t border-gray-200",
            children: /* @__PURE__ */ jsxs("p", {
              className: "text-sm font-black uppercase tracking-[0.2em]",
              children: ["Please return to the", " ", /* @__PURE__ */ jsx("span", {
                className: "text-red-600",
                children: "home page"
              }), "."]
            })
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "absolute bottom-10 text-[10px] font-mono uppercase tracking-widest opacity-40",
          children: "404 Not Found"
        })]
      }), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width,initial-scale=1"
      }), /* @__PURE__ */ jsx("link", {
        rel: "stylesheet",
        href: "https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
      }), /* @__PURE__ */ jsx("link", {
        rel: "preconnect",
        href: "https://cdn.shopify.com/"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$1,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
const action$b = async ({
  request
}) => {
  const {
    payload,
    session,
    topic,
    shop
  } = await authenticate.webhook(request);
  const current = payload.current;
  if (session) {
    await prisma.session.update({
      where: {
        id: session.id
      },
      data: {
        scope: current.toString()
      }
    });
  }
  return new Response();
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$b
}, Symbol.toStringTag, { value: "Module" }));
const action$a = async ({
  request
}) => {
  const {
    shop,
    session,
    topic
  } = await authenticate.webhook(request);
  if (session) {
    await prisma.session.deleteMany({
      where: {
        shop
      }
    });
  }
  return new Response();
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$a
}, Symbol.toStringTag, { value: "Module" }));
async function action$9({
  request
}) {
  var _a2;
  try {
    const formData = await request.formData();
    const metaobjectId = formData.get("rowId");
    if (!metaobjectId) {
      return {
        success: false,
        message: "Missing metaobject id"
      };
    }
    const {
      admin
    } = await authenticate.admin(request);
    const mutation = `
      mutation UpdateMetaobjectRestore($id: ID!, $metaobject: MetaobjectUpdateInput!) {
  metaobjectUpdate(id: $id, metaobject: $metaobject) {
    metaobject {
      id
      handle
    }
    userErrors {
      field
      message
    }
  }
}
    `;
    const variables = {
      id: metaobjectId,
      metaobject: {
        fields: [{
          key: "restore",
          value: "false"
        }]
      }
    };
    const response = await admin.graphql(mutation, {
      variables
    });
    const data = await response.json();
    return {
      success: true,
      updated: (_a2 = data == null ? void 0 : data.metaobjectUpdate) == null ? void 0 : _a2.metaobject
    };
  } catch (err) {
    return {
      success: false,
      message: "Internal server error",
      error: err.message
    };
  }
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$9
}, Symbol.toStringTag, { value: "Module" }));
const METAOBJECT_TYPE$1 = "__tag_metafield_app_database";
async function action$8({
  request
}) {
  var _a2, _b, _c;
  try {
    const {
      admin
    } = await authenticate.admin(request);
    let hasNextPage = true;
    let cursor = null;
    let exists = false;
    while (hasNextPage) {
      const res = await admin.graphql(`#graphql
        query CheckMetaobjectDefinitions($after: String) {
          metaobjectDefinitions(first: 50, after: $after) {
            edges {
              cursor
              node {
                id
                type
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
        `, {
        variables: {
          after: cursor
        }
      });
      const json = await res.json();
      const defs = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.metaobjectDefinitions;
      if (!defs) break;
      for (const edge of defs.edges) {
        if (edge.node.type === METAOBJECT_TYPE$1) {
          exists = true;
          break;
        }
        cursor = edge.cursor;
      }
      if (exists) break;
      hasNextPage = defs.pageInfo.hasNextPage;
    }
    if (exists) {
      return {
        successdb: true,
        status: "already-exists"
      };
    }
    const createRes = await admin.graphql(`#graphql
      mutation CreateMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {
        metaobjectDefinitionCreate(definition: $definition) {
          metaobjectDefinition {
            id
            type
          }
          userErrors {
            field
            message
          }
        }
      }
      `, {
      variables: {
        definition: {
          type: METAOBJECT_TYPE$1,
          name: "Tag Metafield App Database",
          fieldDefinitions: [{
            key: "unique_id",
            name: "Unique ID",
            type: "single_line_text_field"
          }, {
            key: "username",
            name: "Username",
            type: "single_line_text_field"
          }, {
            key: "operation",
            name: "Operation",
            type: "single_line_text_field"
          }, {
            key: "objecttype",
            name: "Object Type",
            type: "single_line_text_field"
          }, {
            key: "value",
            name: "Value",
            type: "json"
          }, {
            key: "restore",
            name: "Restore",
            type: "boolean"
          }, {
            key: "time",
            name: "Time",
            type: "date_time"
          }]
        }
      }
    });
    const createJson = await createRes.json();
    const errors = ((_c = (_b = createJson == null ? void 0 : createJson.data) == null ? void 0 : _b.metaobjectDefinitionCreate) == null ? void 0 : _c.userErrors) || [];
    if (errors.length) {
      return {
        successdb: false,
        error: errors
      };
    }
    return {
      successdb: true,
      status: "created",
      definition: createJson.data.metaobjectDefinitionCreate.metaobjectDefinition
    };
  } catch (error) {
    return {
      successdb: false,
      error: "Internal server error"
    };
  }
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$8
}, Symbol.toStringTag, { value: "Module" }));
async function action$7({
  request
}) {
  var _a2, _b, _c;
  try {
    const {
      admin
    } = await authenticate.admin(request);
    const METAOBJECT_TYPE2 = "__tag_metafield_app_database";
    const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1e3;
    const now = Date.now();
    let hasNextPage = true;
    let cursor = null;
    let page = 1;
    let checked = 0;
    let deleted = [];
    let skipped = [];
    while (hasNextPage) {
      const query = `
        query FetchMetaobjects($after: String) {
          metaobjects(
            type: "${METAOBJECT_TYPE2}",
            first: 250,
            after: $after
          ) {
            edges {
              cursor
              node {
                id
                fields {
                  key
                  value
                }
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      `;
      const res = await admin.graphql(query, {
        variables: {
          after: cursor
        }
      });
      const json = await res.json();
      const data = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.metaobjects;
      if (!data) {
        break;
      }
      for (const edge of data.edges) {
        checked++;
        cursor = edge.cursor;
        const node = edge.node;
        const timeField = node.fields.find((f) => f.key === "time");
        if (!(timeField == null ? void 0 : timeField.value)) {
          skipped.push({
            id: node.id,
            reason: "Missing time field"
          });
          continue;
        }
        const createdTime = new Date(timeField.value).getTime();
        if (isNaN(createdTime)) {
          skipped.push({
            id: node.id,
            reason: "Invalid time format"
          });
          continue;
        }
        const age = now - createdTime;
        if (age > TWO_DAYS_MS) {
          const deleteRes = await admin.graphql(`
            mutation DeleteMetaobject($id: ID!) {
              metaobjectDelete(id: $id) {
                deletedId
                userErrors {
                  message
                }
              }
            }
            `, {
            variables: {
              id: node.id
            }
          });
          const deleteJson = await deleteRes.json();
          const errors = ((_c = (_b = deleteJson == null ? void 0 : deleteJson.data) == null ? void 0 : _b.metaobjectDelete) == null ? void 0 : _c.userErrors) || [];
          if (errors.length) {
            skipped.push({
              id: node.id,
              reason: errors
            });
          } else {
            deleted.push(node.id);
          }
        } else {
          skipped.push({
            id: node.id,
            reason: "Not expired"
          });
        }
      }
      hasNextPage = data.pageInfo.hasNextPage;
      page++;
    }
    return {
      success: true,
      checked,
      deletedCount: deleted.length,
      deletedIds: deleted,
      skippedCount: skipped.length
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal server error"
    };
  }
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$7
}, Symbol.toStringTag, { value: "Module" }));
const queryMap = {
  product: "products",
  productVariant: "productVariants",
  collection: "collections",
  customer: "customers",
  order: "orders",
  company: "companies",
  companyLocation: "companyLocations",
  location: "locations",
  page: "pages",
  blog: "blog",
  blogPost: "articles",
  market: "markets"
};
function fail(message, error = null) {
  return { ok: false, message, error };
}
function success(data) {
  return { ok: true, ...data };
}
const countQueryMap = {
  products: "productsCount",
  productVariants: "productVariantsCount",
  collections: "collectionsCount",
  customers: "customersCount",
  orders: "ordersCount",
  draftOrder: "draftOrdersCount",
  companies: "companiesCount",
  companyLocations: "companyLocationsCount",
  locations: "locationsCount",
  pages: "pagesCount",
  blog: "blogsCount",
  articles: "articlesCount",
  markets: "marketsCount",
  shop: null
  // shop has no count
};
async function fetchResourceCount(admin, resource) {
  var _a2, _b;
  const countField = countQueryMap[resource];
  if (!countField) {
    return { count: 0 };
  }
  const query = `
    query {
      ${countField} {
        count
      }
    }
  `;
  try {
    const res = await admin.graphql(query);
    if (!res) {
      return { count: 0 };
    }
    const json = await res.json();
    const count = ((_b = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2[countField]) == null ? void 0 : _b.count) ?? 0;
    return { count };
  } catch (error) {
    return { count: 0 };
  }
}
async function fetchAllItemIds(admin, resource, cursor = null) {
  var _a2;
  const count = await fetchResourceCount(admin, resource);
  const query = `
    query ($cursor: String) {
      ${resource}(first: 50, after: $cursor) {
        edges {
          cursor
          node { id }
        }
        pageInfo { hasNextPage }
      }
    }
  `;
  const res = await admin.graphql(query, { variables: { cursor } });
  const json = await res.json();
  const data = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2[resource];
  if (!data) {
    return {
      items: [],
      nextCursor: null,
      hasMore: false
    };
  }
  const edges = data.edges;
  const items = edges.map((e) => e.node);
  const hasMore = data.pageInfo.hasNextPage;
  const nextCursor = hasMore ? edges.at(-1).cursor : null;
  return {
    items,
    nextCursor,
    hasMore,
    count
  };
}
async function removeAllMetafields(admin, resource, namespace, key, cursor = null) {
  var _a2;
  const page = await fetchAllItemIds(admin, resource, cursor);
  const metafields = page.items.map((item) => ({
    ownerId: item.id,
    namespace,
    key
  }));
  const batchResults = await deleteMetafields(admin, metafields);
  return {
    results: batchResults,
    nextCursor: page.nextCursor,
    hasMore: page.hasMore,
    ResourceCount: (_a2 = page == null ? void 0 : page.count) == null ? void 0 : _a2.count
  };
}
async function removeSpecificMetafield(admin, id, namespace, key, value, type, flag, flag1, objectType) {
  var _a2, _b, _c, _d;
  flag = String(flag).toLowerCase() === "true";
  flag1 = String(flag1).toLowerCase() === "true";
  if (isEmptyValue(value) && flag1) {
    return {
      id,
      key,
      value,
      success: false,
      errors: `Value is empty: ${value}`
    };
  }
  let ownerId = id;
  if (!flag) {
    const res = await fetchResourceId$1(admin, objectType, id);
    if (!res) {
      return {
        id,
        success: false,
        errors: `Could not resolve ID for: ${id}`,
        data: null
      };
    }
    ownerId = res;
  }
  if (flag1 && type.startsWith("list.")) {
    if (type === "list.metaobject_reference") {
      const isMetaobjectId = (v) => typeof v === "string" && /^gid:\/\/shopify\/Metaobject\/\d+$/.test(v.trim());
      const resolveRemoveValue = async (raw) => {
        if (!raw) return null;
        if (isMetaobjectId(raw)) return raw;
        return await getMetaobjectIdFromMetafield(admin, {
          namespace,
          key,
          objectType,
          metaobjectHandle: raw
        });
      };
      let removeList;
      if (Array.isArray(value)) {
        removeList = value;
      } else if (typeof value === "string" && value.trim().startsWith("[")) {
        try {
          removeList = JSON.parse(value);
        } catch {
          return {
            id: ownerId,
            success: false,
            errors: "Invalid JSON for remove values",
            data: null
          };
        }
      } else if (typeof value === "string") {
        removeList = value.split(",").map((v) => v.trim()).filter(Boolean);
      }
      if (!Array.isArray(removeList) || removeList.length === 0) {
        return {
          id: ownerId,
          success: false,
          errors: "No valid values provided for removal",
          data: null
        };
      }
      const existingRaw = await fetchExistingMetafield$1(
        admin,
        ownerId,
        namespace,
        key
      );
      if (!existingRaw) {
        return {
          id: ownerId,
          success: false,
          errors: "Metafield does not exist",
          data: null
        };
      }
      let existingList = [];
      try {
        existingList = JSON.parse(existingRaw);
      } catch {
        existingList = [];
      }
      const resolvedRemoveIds = [];
      for (const item of removeList) {
        const resolved = await resolveRemoveValue(item);
        if (!resolved) {
          return {
            id: ownerId,
            success: false,
            errors: `Metaobject not found: ${item}`,
            data: null
          };
        }
        resolvedRemoveIds.push(resolved);
      }
      const filteredList = existingList.filter(
        (v) => !resolvedRemoveIds.includes(v)
      );
      const mutation = `
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id namespace key value type }
        userErrors { field message code }
      }
    }
  `;
      const updateRes = await admin.graphql(mutation, {
        variables: {
          metafields: [
            {
              ownerId,
              namespace,
              key,
              type,
              value: JSON.stringify(filteredList)
            }
          ]
        }
      });
      const json = await updateRes.json();
      const errors = ((_b = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.metafieldsSet) == null ? void 0 : _b.userErrors) || [];
      return {
        id: ownerId,
        success: errors.length === 0,
        key,
        namespace,
        type,
        data: removeList,
        errors: errors.length ? errors.map((e) => e.message).join(", ") : null
      };
    } else if (type === "list.product_reference" || type === "list.variant_reference" || type === "list.collection_reference" || type === "list.order_reference" || type === "list.customer_reference" || type === "list.page_reference" || type === "list.article_reference" || type === "list.company_reference") {
      const isShopifyGid = (value2) => typeof value2 === "string" && value2.trim().startsWith("gid://shopify/");
      let incomingList;
      if (Array.isArray(value)) {
        incomingList = value;
      } else if (typeof value === "string" && value.trim().startsWith("[")) {
        try {
          incomingList = JSON.parse(value);
        } catch {
          return {
            id,
            key,
            value,
            success: false,
            errors: "Invalid JSON array for list reference metafield"
          };
        }
      } else if (typeof value === "string") {
        incomingList = value.split(",").map((v) => v.trim()).filter(Boolean);
      }
      if (!Array.isArray(incomingList)) {
        return {
          id,
          key,
          value,
          success: false,
          errors: "Invalid list reference value"
        };
      }
      let resourceType = type.replace("list.", "").replace("_reference", "");
      if (resourceType === "variant") resourceType = "productvariant";
      if (resourceType === "article") resourceType = "blogpost";
      const resolvedIds = [];
      for (const item of incomingList) {
        let resolvedId = item;
        if (!isShopifyGid(item)) {
          const resolved = await fetchResourceIdResourceReference(
            admin,
            resourceType.toLowerCase(),
            item
          );
          if (!resolved) {
            return {
              id,
              key,
              value,
              success: false,
              errors: `Could not resolve ${resourceType} reference: ${item}`
            };
          }
          resolvedId = resolved;
        }
        resolvedIds.push(resolvedId);
      }
      const uniqueRemoveIds = [...new Set(resolvedIds)];
      const existingRaw = await fetchExistingMetafield$1(
        admin,
        ownerId,
        namespace,
        key
      );
      if (!existingRaw) {
        return {
          id: ownerId,
          success: false,
          key,
          namespace,
          type,
          errors: `Metafield does not exist on ${objectType}`
        };
      }
      let existingList;
      try {
        existingList = JSON.parse(existingRaw);
        if (!Array.isArray(existingList)) throw new Error();
      } catch {
        return {
          id: ownerId,
          success: false,
          key,
          namespace,
          type,
          errors: "Existing metafield value is not a valid list"
        };
      }
      const existingToRemove = uniqueRemoveIds.filter(
        (id2) => existingList.includes(id2)
      );
      if (existingToRemove.length === 0) {
        return {
          id: ownerId,
          success: false,
          key,
          namespace,
          type,
          errors: "None of the provided IDs exist in the metafield"
        };
      }
      const filteredList = existingList.filter(
        (v) => !existingToRemove.includes(v)
      );
      if (filteredList.length === 0) {
        await admin.graphql(
          `
      mutation ($metafields: [MetafieldIdentifierInput!]!) {
        metafieldsDelete(metafields: $metafields) {
          userErrors { message }
        }
      }
      `,
          {
            variables: {
              metafields: [{ ownerId, namespace, key }]
            }
          }
        );
        return {
          id: ownerId,
          success: true,
          key,
          namespace,
          type,
          data: existingToRemove,
          errors: null
        };
      }
      const updateRes = await admin.graphql(
        `
    mutation ($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id namespace key value type }
        userErrors { field message code }
      }
    }
    `,
        {
          variables: {
            metafields: [
              {
                ownerId,
                namespace,
                key,
                type,
                value: JSON.stringify(filteredList)
              }
            ]
          }
        }
      );
      const json = await updateRes.json();
      if (!((_c = json == null ? void 0 : json.data) == null ? void 0 : _c.metafieldsSet)) {
        return {
          id: ownerId,
          success: false,
          key,
          namespace,
          type,
          errors: "Metafield update failed"
        };
      }
      const errors = json.data.metafieldsSet.userErrors || [];
      return {
        id: ownerId,
        success: errors.length === 0,
        key,
        namespace,
        type,
        data: existingToRemove,
        errors: errors.length ? errors.map((e) => e.message).join(", ") : null
      };
    } else {
      const existingRaw = await fetchExistingMetafield$1(
        admin,
        ownerId,
        namespace,
        key
      );
      if (!existingRaw) {
        return {
          id: ownerId,
          success: false,
          key,
          namespace,
          type,
          errors: `Metafield does not exist on ${objectType}`
        };
      }
      let existingList;
      try {
        existingList = JSON.parse(existingRaw);
        if (!Array.isArray(existingList)) throw new Error();
      } catch {
        return {
          id: ownerId,
          success: false,
          key,
          namespace,
          type,
          errors: "Existing metafield value is not a valid list"
        };
      }
      let normalizedValue = value;
      if (typeof normalizedValue === "string" && normalizedValue.trim().startsWith("[")) {
        const parsed = JSON.parse(normalizedValue);
        if (Array.isArray(parsed)) {
          normalizedValue = parsed[0];
        }
      }
      if (Array.isArray(normalizedValue)) {
        normalizedValue = normalizedValue[0];
      }
      if (typeof normalizedValue === "string") {
        normalizedValue = normalizedValue.trim();
      }
      const exists = existingList.includes(normalizedValue);
      if (!exists) {
        return {
          id: ownerId,
          success: false,
          key,
          namespace,
          type,
          errors: "Provided value does not exist in metafield : " + normalizedValue
        };
      }
      const filteredList = existingList.filter(
        (v) => v !== normalizedValue
      );
      if (filteredList.length === 0) {
        await admin.graphql(
          `
      mutation ($metafields: [MetafieldIdentifierInput!]!) {
        metafieldsDelete(metafields: $metafields) {
          userErrors { message }
        }
      }
      `,
          {
            variables: {
              metafields: [{ ownerId, namespace, key }]
            }
          }
        );
        return {
          id: ownerId,
          success: true,
          key,
          namespace,
          type,
          data: [normalizedValue],
          errors: null
        };
      }
      const updateRes = await admin.graphql(
        `
    mutation ($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id namespace key value type }
        userErrors { field message code }
      }
    }
    `,
        {
          variables: {
            metafields: [
              {
                ownerId,
                namespace,
                key,
                type,
                value: JSON.stringify(filteredList)
              }
            ]
          }
        }
      );
      const json = await updateRes.json();
      if (!((_d = json == null ? void 0 : json.data) == null ? void 0 : _d.metafieldsSet)) {
        return {
          id: ownerId,
          success: false,
          key,
          namespace,
          type,
          errors: "Metafield update failed"
        };
      }
      const errors = json.data.metafieldsSet.userErrors || [];
      return {
        id: ownerId,
        success: errors.length === 0,
        key,
        namespace,
        type,
        data: [normalizedValue],
        errors: errors.length ? errors.map((e) => e.message).join(", ") : null
      };
    }
  }
  const result = await deleteMetafields(admin, [{ ownerId, namespace, key }]);
  return {
    id: ownerId,
    success: result[0].success,
    data: result[0].data,
    errors: result[0].errors
  };
}
async function deleteMetafields(admin, metafields) {
  var _a2, _b, _c, _d, _e, _f, _g;
  const results = [];
  const checkQuery = `
    query ($ownerId: ID!, $namespace: String!, $key: String!) {
      node(id: $ownerId) {
        ... on HasMetafields {
          metafield(namespace: $namespace, key: $key) {
            id
            namespace
            key
            type
            value
          }
        }
      }
    }
  `;
  const deleteQuery = `
    mutation ($metafields: [MetafieldIdentifierInput!]!) {
      metafieldsDelete(metafields: $metafields) {
        deletedMetafields { ownerId namespace key }
        userErrors { field message }
      }
    }
  `;
  for (const mf of metafields) {
    const { ownerId, namespace, key } = mf;
    const checkRes = await admin.graphql(checkQuery, {
      variables: { ownerId, namespace, key }
    });
    const checkJson = await checkRes.json();
    const found = ((_b = (_a2 = checkJson == null ? void 0 : checkJson.data) == null ? void 0 : _a2.node) == null ? void 0 : _b.metafield) ?? null;
    if (!found) {
      results.push({
        id: ownerId,
        success: false,
        errors: "Metafield is not present",
        data: null
      });
      continue;
    }
    const data = {
      ownerId,
      namespace,
      key,
      metafieldId: found.id,
      type: found.type,
      value: found.value
    };
    const deleteRes = await admin.graphql(deleteQuery, {
      variables: { metafields: [{ ownerId, namespace, key }] }
    });
    const deleteJson = await deleteRes.json();
    const deleted = ((_d = (_c = deleteJson == null ? void 0 : deleteJson.data) == null ? void 0 : _c.metafieldsDelete) == null ? void 0 : _d.deletedMetafields) ?? [];
    const userErrors = ((_f = (_e = deleteJson == null ? void 0 : deleteJson.data) == null ? void 0 : _e.metafieldsDelete) == null ? void 0 : _f.userErrors) ?? [];
    const success2 = deleted[0] !== null;
    const error = success2 ? null : ((_g = userErrors == null ? void 0 : userErrors[0]) == null ? void 0 : _g.message) || "Failed";
    results.push({
      id: ownerId,
      success: success2,
      errors: error,
      data
    });
  }
  return results;
}
async function fetchDefinitions(admin, resource) {
  if (resource === "blog") return await fetchBlogMeta(admin);
  if (resource === "article") return await fetchBlogPostMeta(admin);
  return await fetchGenericMeta(admin, resource);
}
async function fetchBlogMeta(admin) {
  var _a2, _b, _c, _d, _e, _f, _g;
  const first = await admin.graphql(`
    query {
      blogs(first: 1) {
        edges { node { id } }
      }
    }
  `);
  const b = await first.json();
  const blogId = (_e = (_d = (_c = (_b = (_a2 = b == null ? void 0 : b.data) == null ? void 0 : _a2.blogs) == null ? void 0 : _b.edges) == null ? void 0 : _c[0]) == null ? void 0 : _d.node) == null ? void 0 : _e.id;
  if (!blogId) return fail("No blog found");
  let allMetafields = [];
  let hasNextPage = true;
  let cursor = null;
  while (hasNextPage) {
    const query = `
      query ($blogId: ID!, $cursor: String) {
        blog(id: $blogId) {
          id
          metafieldDefinitions(first: 200, after: $cursor) {
            edges {
              cursor
              node {
                id
                namespace
                key
                name
                description
                type { name }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `;
    const res = await admin.graphql(query, {
      variables: { blogId, cursor }
    });
    const json = await res.json();
    const defs = (_g = (_f = json.data) == null ? void 0 : _f.blog) == null ? void 0 : _g.metafieldDefinitions;
    if (!defs) break;
    allMetafields.push(...defs.edges.map((e) => e.node));
    hasNextPage = defs.pageInfo.hasNextPage;
    cursor = defs.pageInfo.endCursor;
  }
  return success({
    item: { id: blogId },
    metafields: allMetafields
  });
}
async function fetchBlogPostMeta(admin) {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const blogs = await admin.graphql(`
    query {
      blogs(first: 1) {
        edges { node { id } }
      }
    }
  `);
  const b = await blogs.json();
  const blogId = (_e = (_d = (_c = (_b = (_a2 = b == null ? void 0 : b.data) == null ? void 0 : _a2.blogs) == null ? void 0 : _b.edges) == null ? void 0 : _c[0]) == null ? void 0 : _d.node) == null ? void 0 : _e.id;
  if (!blogId) return fail("No blog found");
  const articles = await admin.graphql(
    `
    query ($blogId: ID!) {
      blog(id: $blogId) {
        articles(first: 1) {
          edges { node { id } }
        }
      }
    }
    `,
    { variables: { blogId } }
  );
  const a = await articles.json();
  const articleId = (_k = (_j = (_i = (_h = (_g = (_f = a == null ? void 0 : a.data) == null ? void 0 : _f.blog) == null ? void 0 : _g.articles) == null ? void 0 : _h.edges) == null ? void 0 : _i[0]) == null ? void 0 : _j.node) == null ? void 0 : _k.id;
  if (!articleId) return fail("No article found");
  let allMetafields = [];
  let hasNextPage = true;
  let cursor = null;
  while (hasNextPage) {
    const query = `
      query ($articleId: ID!, $cursor: String) {
        article(id: $articleId) {
          id
          metafieldDefinitions(first: 200, after: $cursor) {
            edges {
              cursor
              node {
                id
                namespace
                key
                name
                description
                type { name }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `;
    const response = await admin.graphql(query, {
      variables: { articleId, cursor }
    });
    const json = await response.json();
    const defs = (_m = (_l = json.data) == null ? void 0 : _l.article) == null ? void 0 : _m.metafieldDefinitions;
    if (!defs) break;
    allMetafields.push(...defs.edges.map((e) => e.node));
    hasNextPage = defs.pageInfo.hasNextPage;
    cursor = defs.pageInfo.endCursor;
  }
  return success({
    item: { id: articleId },
    metafields: allMetafields
  });
}
async function fetchGenericMeta(admin, resource) {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
  const headRes = await admin.graphql(`
    query {
      ${resource}(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  `);
  const headJson = await headRes.json();
  const item = (_d = (_c = (_b = (_a2 = headJson.data) == null ? void 0 : _a2[resource]) == null ? void 0 : _b.edges) == null ? void 0 : _c[0]) == null ? void 0 : _d.node;
  if (!item) return fail("No item found");
  let allMetafields = [];
  let hasNextPage = true;
  let cursor = null;
  while (hasNextPage) {
    const pageQuery = `
      query FetchMetafields($cursor: String) {
        ${resource}(first: 1) {
          edges {
            node {
              metafieldDefinitions(first: 200, after: $cursor) {
                edges {
                  cursor
                  node {
                    id
                    namespace
                    key
                    name
                    description
                    type { name }
                  }
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          }
        }
      }
    `;
    const pageRes = await admin.graphql(pageQuery, { cursor });
    const pageJson = await pageRes.json();
    const defs = (_i = (_h = (_g = (_f = (_e = pageJson.data) == null ? void 0 : _e[resource]) == null ? void 0 : _f.edges) == null ? void 0 : _g[0]) == null ? void 0 : _h.node) == null ? void 0 : _i.metafieldDefinitions;
    if (!defs) break;
    allMetafields.push(...defs.edges.map((e) => e.node));
    hasNextPage = defs.pageInfo.hasNextPage;
    cursor = defs.pageInfo.endCursor;
  }
  return success({
    item,
    metafields: allMetafields
  });
}
function isEmptyValue(value) {
  if (value == null) return true;
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "string") {
    const trimmed = value;
    if (trimmed === "") return true;
    if (trimmed === "[]") return true;
    if (trimmed.startsWith("[") && trimmed.endsWith("]") || trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed) && parsed.length === 0;
      } catch {
        return false;
      }
    }
    return false;
  }
  return false;
}
async function updateSpecificMetafield$1(admin, id, namespace, key, value, type, flag, flag2, objectType) {
  var _a2, _b;
  flag = String(flag).toLowerCase() === "true";
  flag2 = String(flag2).toLowerCase() === "true";
  if (isEmptyValue(value)) {
    return {
      id,
      key,
      value,
      success: false,
      errors: `Value is empty: ${value}`
    };
  }
  let ownerId = id;
  if (!flag) {
    const resolved = await fetchResourceId$1(admin, objectType, id);
    if (!resolved) {
      return {
        id,
        key,
        value,
        success: false,
        errors: `Could not find ${objectType} for: ${id}`
      };
    }
    ownerId = resolved;
  }
  function isMetaobjectId(v) {
    return typeof v === "string" && /^gid:\/\/shopify\/Metaobject\/\d+$/.test(v.trim());
  }
  function isShopifyGid(value2) {
    return typeof value2 === "string" && value2.trim().startsWith("gid://shopify/");
  }
  async function resolveMetaobjectValue(raw) {
    if (!raw) return null;
    if (isMetaobjectId(raw)) return raw;
    const resolved = await getMetaobjectIdFromMetafield(admin, {
      namespace,
      key,
      objectType,
      metaobjectHandle: raw
    });
    return resolved || null;
  }
  let normalizedValue;
  let responseValue = value;
  if (type === "metaobject_reference") {
    const resolvedId = await resolveMetaobjectValue(value);
    if (!resolvedId) {
      return {
        id,
        key,
        value,
        success: false,
        errors: `Could not resolve metaobject reference: ${value}`
      };
    }
    normalizedValue = resolvedId;
    responseValue = resolvedId;
  } else if (type === "list.metaobject_reference") {
    let incomingList;
    if (Array.isArray(value)) {
      incomingList = value;
    } else if (typeof value === "string" && value.trim().startsWith("[")) {
      try {
        incomingList = JSON.parse(value);
      } catch {
        return {
          id,
          key,
          value,
          success: false,
          errors: "Invalid JSON for list.metaobject_reference"
        };
      }
    } else if (typeof value === "string") {
      incomingList = value.split(",").map((v) => v.trim()).filter(Boolean);
    }
    if (!Array.isArray(incomingList)) {
      return {
        id,
        key,
        value,
        success: false,
        errors: "Invalid list.metaobject_reference value"
      };
    }
    const resolvedIds = [];
    for (const item of incomingList) {
      const resolved = await resolveMetaobjectValue(item);
      if (!resolved) {
        return {
          id,
          key,
          value,
          success: false,
          errors: `Could not resolve metaobject reference: ${item}`
        };
      }
      resolvedIds.push(resolved);
    }
    if (flag2) {
      normalizedValue = JSON.stringify(resolvedIds);
      responseValue = JSON.stringify(resolvedIds);
    } else {
      const existingRaw = await fetchExistingMetafield$1(
        admin,
        ownerId,
        namespace,
        key
      );
      let existingList = [];
      try {
        existingList = existingRaw ? JSON.parse(existingRaw) : [];
      } catch {
      }
      const merged = Array.from(/* @__PURE__ */ new Set([...existingList, ...resolvedIds]));
      normalizedValue = JSON.stringify(merged);
      responseValue = JSON.stringify(resolvedIds);
    }
  } else if (type === "product_reference" || type === "variant_reference" || type === "collection_reference" || type === "order_reference" || type === "customer_reference" || type === "page_reference" || type === "article_reference" || type === "company_reference") {
    if (!isShopifyGid(value)) {
      let resourceType = type;
      if (resourceType === "variant_reference") resourceType = "productvariant";
      if (resourceType === "collection_reference") resourceType = "collection";
      if (resourceType === "order_reference") resourceType = "order";
      if (resourceType === "customer_reference") resourceType = "customer";
      if (resourceType === "page_reference") resourceType = "page";
      if (resourceType === "article_reference") resourceType = "blogpost";
      if (resourceType === "company_reference") resourceType = "company";
      const resolved = await fetchResourceIdResourceReference(admin, resourceType == null ? void 0 : resourceType.toLowerCase(), value);
      if (!resolved) {
        return {
          id,
          key,
          value,
          success: false,
          errors: `Could not find ${objectType} for: ${value}`
        };
      }
      ownerId = resolved;
    }
    normalizedValue = ownerId;
    responseValue = ownerId;
  } else if (type === "list.product_reference" || type === "list.variant_reference" || type === "list.collection_reference" || type === "list.order_reference" || type === "list.customer_reference" || type === "list.page_reference" || type === "list.article_reference" || type === "list.company_reference") {
    let incomingList;
    if (Array.isArray(value)) {
      incomingList = value;
    } else if (typeof value === "string" && value.trim().startsWith("[")) {
      try {
        incomingList = JSON.parse(value);
      } catch {
        return {
          id,
          key,
          value,
          success: false,
          errors: "Invalid JSON array for list reference metafield"
        };
      }
    } else if (typeof value === "string") {
      incomingList = value.split(",").map((v) => v.trim()).filter(Boolean);
    }
    if (!Array.isArray(incomingList)) {
      return {
        id,
        key,
        value,
        success: false,
        errors: "Invalid list reference value"
      };
    }
    let resourceType = type.replace("list.", "").replace("_reference", "");
    if (resourceType === "variant") resourceType = "productvariant";
    if (resourceType === "article") resourceType = "blogpost";
    const resolvedIds = [];
    for (const item of incomingList) {
      let resolvedId = item;
      if (!isShopifyGid(item)) {
        const resolved = await fetchResourceIdResourceReference(
          admin,
          resourceType.toLowerCase(),
          item
        );
        if (!resolved) {
          return {
            id,
            key,
            value,
            success: false,
            errors: `Could not resolve ${resourceType} reference: ${item}`
          };
        }
        resolvedId = resolved;
      }
      resolvedIds.push(resolvedId);
    }
    if (flag2) {
      normalizedValue = JSON.stringify(resolvedIds);
      responseValue = JSON.stringify(resolvedIds);
    } else {
      const existingRaw = await fetchExistingMetafield$1(
        admin,
        ownerId,
        namespace,
        key
      );
      let existingList = [];
      try {
        existingList = existingRaw ? JSON.parse(existingRaw) : [];
      } catch {
      }
      const merged = Array.from(/* @__PURE__ */ new Set([...existingList, ...resolvedIds]));
      normalizedValue = JSON.stringify(merged);
      responseValue = JSON.stringify(resolvedIds);
    }
  } else if (type.startsWith("list.")) {
    let incomingList;
    if (Array.isArray(value)) {
      incomingList = value;
    } else if (typeof value === "string" && value.trim().startsWith("[")) {
      try {
        incomingList = JSON.parse(value);
      } catch {
        return {
          id,
          key,
          value,
          success: false,
          errors: `Invalid JSON for ${type}`
        };
      }
    } else if (typeof value === "string") {
      incomingList = value.split(",").map((v) => v.trim()).filter(Boolean);
    }
    if (!Array.isArray(incomingList)) {
      return {
        id,
        key,
        value,
        success: false,
        errors: `Expected list value for ${type}`
      };
    }
    if (flag2) {
      normalizedValue = JSON.stringify(incomingList);
      responseValue = JSON.stringify(incomingList);
    } else {
      const existingRaw = await fetchExistingMetafield$1(
        admin,
        ownerId,
        namespace,
        key
      );
      let existingList = [];
      try {
        existingList = existingRaw ? JSON.parse(existingRaw) : [];
      } catch {
      }
      const merged = Array.from(/* @__PURE__ */ new Set([...existingList, ...incomingList]));
      normalizedValue = JSON.stringify(merged);
      responseValue = JSON.stringify(incomingList);
    }
  } else {
    normalizedValue = value === null || value === void 0 ? "" : String(value);
  }
  const metafieldInput = {
    ownerId,
    namespace,
    key,
    type,
    value: normalizedValue
  };
  const mutation = `
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id namespace key value type }
        userErrors { field message code }
      }
    }
  `;
  const res = await admin.graphql(mutation, {
    variables: { metafields: [metafieldInput] }
  });
  const json = await res.json();
  const errors = ((_b = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.metafieldsSet) == null ? void 0 : _b.userErrors) || [];
  return {
    id,
    key,
    namespace,
    value: responseValue,
    success: errors.length === 0,
    errors: errors.length ? errors.map((e) => e.message).join(", ") : null
  };
}
async function fetchExistingMetafield$1(admin, ownerId, namespace, key) {
  var _a2, _b, _c;
  const query = `
    query getMetafield($id: ID!, $namespace: String!, $key: String!) {
      node(id: $id) {
        ... on HasMetafields {
          metafield(namespace: $namespace, key: $key) {
            value
          }
        }
      }
    }
  `;
  const res = await admin.graphql(query, {
    variables: { id: ownerId, namespace, key }
  });
  const json = await res.json();
  return ((_c = (_b = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.node) == null ? void 0 : _b.metafield) == null ? void 0 : _c.value) ?? null;
}
async function fetchResourceId$1(admin, objectType, value) {
  const queries = {
    customer: {
      query: `query($value: String!) {
        customers(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `email:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.customers) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    order: {
      query: `query($value: String!) {
        orders(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `name:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.orders) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    company: {
      query: `query($value: String!) {
        companies(first: 1, query: $value) {
          edges { node { id  } }
        }
      }`,
      buildQuery: (v) => `external_id:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.companies) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    companyLocation: {
      query: `query($value: String!) {
        companyLocations(first: 1, query: $value) {
          edges { node { id  } }
        }
      }`,
      buildQuery: (v) => `external_id:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.companyLocations) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    location: {
      query: `query($value: String!) {
        locations(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `name:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.locations) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    page: {
      query: `query($value: String!) {
        pages(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `handle:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.pages) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    blogPost: {
      query: `query($value: String!) {
        articles(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `handle:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.articles) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    product: {
      query: `query($value: String!) {
        productByHandle(handle: $value) {
          id
        }
      }`,
      buildQuery: (v) => v,
      path: (res) => {
        var _a2;
        return (_a2 = res == null ? void 0 : res.productByHandle) == null ? void 0 : _a2.id;
      }
    },
    collection: {
      query: `query($value: String!) {
        collectionByHandle(handle: $value) {
          id
        }
      }`,
      buildQuery: (v) => v,
      path: (res) => {
        var _a2;
        return (_a2 = res == null ? void 0 : res.collectionByHandle) == null ? void 0 : _a2.id;
      }
    },
    variant: {
      query: `query($value: String!) {
    productVariants(first: 1, query: $value) {
      edges {
        node {
          id
        }
      }
    }
  }`,
      buildQuery: (v) => `sku:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.productVariants) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    market: {
      query: `
    query ($value: String!) {
      markets(first: 1, query: $value) {
        nodes {
          id
        }
      }
    }
  `,
      buildQuery: (v) => `name:${String(v).trim()}`,
      path: (res) => {
        var _a2, _b, _c;
        return (_c = (_b = (_a2 = res == null ? void 0 : res.markets) == null ? void 0 : _a2.nodes) == null ? void 0 : _b[0]) == null ? void 0 : _c.id;
      }
    }
  };
  const config = queries[objectType];
  if (!config) {
    throw new Error(`Unsupported resource type: ${objectType}`);
  }
  const builtValue = config.buildQuery(value);
  const variables = { value: builtValue };
  const response = await admin.graphql(config.query, { variables });
  const json = await response.json();
  const result = config.path(json.data) || null;
  return result;
}
const metafieldOwnerTypeMap = {
  product: "PRODUCT",
  productVariant: "PRODUCTVARIANT",
  collection: "COLLECTION",
  customer: "CUSTOMER",
  order: "ORDER",
  company: "COMPANY",
  companyLocation: "COMPANY_LOCATION",
  location: "LOCATION",
  page: "PAGE",
  blog: "BLOG",
  blogPost: "ARTICLE",
  market: "MARKET"
};
async function getMetaobjectIdFromMetafield(admin, { namespace, key, objectType, metaobjectHandle }) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const ownerType = metafieldOwnerTypeMap[objectType];
  if (!ownerType) {
    return null;
  }
  const defRes = await admin.graphql(
    `#graphql
    query ($namespace: String!, $key: String!, $ownerType: MetafieldOwnerType!) {
      metafieldDefinition(
        identifier: {
          namespace: $namespace
          key: $key
          ownerType: $ownerType
        }
      ) {
        validations {
          name
          value
        }
      }
    }`,
    { variables: { namespace, key, ownerType } }
  );
  const defJson = await defRes.json();
  const metaobjectDefinitionId = (_d = (_c = (_b = (_a2 = defJson == null ? void 0 : defJson.data) == null ? void 0 : _a2.metafieldDefinition) == null ? void 0 : _b.validations) == null ? void 0 : _c.find(
    (v) => v.name === "metaobject_definition_id"
  )) == null ? void 0 : _d.value;
  if (!metaobjectDefinitionId) {
    return null;
  }
  const typeRes = await admin.graphql(
    `#graphql
    query ($id: ID!) {
      metaobjectDefinition(id: $id) {
        type
      }
    }`,
    { variables: { id: metaobjectDefinitionId } }
  );
  const typeJson = await typeRes.json();
  const metaobjectType = (_f = (_e = typeJson == null ? void 0 : typeJson.data) == null ? void 0 : _e.metaobjectDefinition) == null ? void 0 : _f.type;
  if (!metaobjectType) {
    return null;
  }
  const metaRes = await admin.graphql(
    `#graphql
    query ($type: String!, $handle: String!) {
      metaobjectByHandle(handle: { type: $type, handle: $handle }) {
        id
        handle
      }
    }`,
    {
      variables: {
        type: metaobjectType,
        handle: metaobjectHandle
      }
    }
  );
  const metaJson = await metaRes.json();
  const metaobjectId = (_h = (_g = metaJson == null ? void 0 : metaJson.data) == null ? void 0 : _g.metaobjectByHandle) == null ? void 0 : _h.id;
  if (!metaobjectId) {
    return null;
  }
  return metaobjectId;
}
async function fetchResourceIdResourceReference(admin, objectType, value) {
  const queries = {
    customer: {
      query: `query($value: String!) {
        customers(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `email:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.customers) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    order: {
      query: `query($value: String!) {
        orders(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `name:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.orders) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    company: {
      query: `query($value: String!) {
        companies(first: 1, query: $value) {
          edges { node { id  } }
        }
      }`,
      buildQuery: (v) => `external_id:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.companies) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    page: {
      query: `query($value: String!) {
        pages(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `handle:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.pages) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    blogpost: {
      query: `query($value: String!) {
        articles(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `handle:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.articles) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    product: {
      query: `query($value: String!) {
        productByHandle(handle: $value) {
          id
        }
      }`,
      buildQuery: (v) => v,
      path: (res) => {
        var _a2;
        return (_a2 = res == null ? void 0 : res.productByHandle) == null ? void 0 : _a2.id;
      }
    },
    collection: {
      query: `query($value: String!) {
        collectionByHandle(handle: $value) {
          id
        }
      }`,
      buildQuery: (v) => v,
      path: (res) => {
        var _a2;
        return (_a2 = res == null ? void 0 : res.collectionByHandle) == null ? void 0 : _a2.id;
      }
    },
    productvariant: {
      query: `query($value: String!) {
    productVariants(first: 1, query: $value) {
      edges {
        node {
          id
        }
      }
    }
  }`,
      buildQuery: (v) => `sku:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.productVariants) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    }
  };
  const config = queries[objectType];
  if (!config) {
    throw new Error(`Unsupported resource type: ${objectType}`);
  }
  const builtValue = config.buildQuery(value);
  const variables = { value: builtValue };
  const response = await admin.graphql(config.query, { variables });
  const json = await response.json();
  const result = config.path(json.data) || null;
  return result;
}
async function fetchTagsPage(admin, objectType, cursor = null) {
  if (objectType === "product") {
    const res = await admin.graphql(
      `
      query ($after: String) {
        productTags(first: 1000, after: $after) {
          nodes
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
      `,
      { variables: { after: cursor } }
    );
    const json = await res.json();
    const data = json.data.productTags;
    return {
      tags: data.nodes || [],
      hasNextPage: data.pageInfo.hasNextPage,
      nextCursor: data.pageInfo.endCursor
    };
  }
  if (objectType === "customer") {
    const res = await admin.graphql(
      `
      query ($after: String) {
        customers(first: 200, after: $after) {
          nodes {
            tags
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
      `,
      { variables: { after: cursor } }
    );
    const json = await res.json();
    const customers = json.data.customers.nodes || [];
    return {
      tags: customers.flatMap((c) => c.tags || []),
      hasNextPage: json.data.customers.pageInfo.hasNextPage,
      nextCursor: json.data.customers.pageInfo.endCursor
    };
  }
  if (objectType === "order") {
    const res = await admin.graphql(
      `
      query ($after: String) {
        orders(first: 100, after: $after) {
          nodes {
            tags
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
      `,
      { variables: { after: cursor } }
    );
    const json = await res.json();
    const orders = json.data.orders.nodes || [];
    return {
      tags: orders.flatMap((o) => o.tags || []),
      hasNextPage: json.data.orders.pageInfo.hasNextPage,
      nextCursor: json.data.orders.pageInfo.endCursor
    };
  }
  if (objectType === "article") {
    const res = await admin.graphql(
      `
      query ($after: String) {
        articles(first: 50, after: $after) {
          nodes {
            tags
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
      `,
      { variables: { after: cursor } }
    );
    const json = await res.json();
    const articles = json.data.articles.nodes || [];
    return {
      tags: articles.flatMap((a) => a.tags || []),
      hasNextPage: json.data.articles.pageInfo.hasNextPage,
      nextCursor: json.data.articles.pageInfo.endCursor
    };
  }
  return {
    tags: [],
    hasNextPage: false,
    nextCursor: null
  };
}
async function handleFetch(admin, formData) {
  try {
    const objectType = formData.get("objectType");
    const cursor = formData.get("cursor") || null;
    if (!objectType) {
      return { error: "objectType is required" };
    }
    const page = await fetchTagsPage(admin, objectType, cursor);
    return {
      success: true,
      mode: "fetch",
      tags: page.tags,
      hasNextPage: page.hasNextPage,
      nextCursor: page.nextCursor
    };
  } catch (err) {
    return {
      success: false,
      error: err == null ? void 0 : err.message
    };
  }
}
async function handleRemoveFromAll(admin, formData) {
  var _a2, _b, _c, _d;
  try {
    const objectType = formData.get("objectType");
    const tags = JSON.parse(formData.get("tags") || "[]");
    const cursor = formData.get("cursor") || null;
    if (!tags.length) {
      return { success: false, error: "No tags provided" };
    }
    const tagQuery = tags.map((t) => `tag:${t}`).join(" OR ");
    const query = `
      {
        ${objectType}s(
          first: 20,
          after: ${cursor ? `"${cursor}"` : null},
          query: "${tagQuery}"
        ) {
          edges {
            cursor
            node { id tags }
          }
          pageInfo { hasNextPage }
        }
      }
    `;
    const res = await admin.graphql(query);
    const json = await res.json();
    const data = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2[`${objectType}s`];
    if (!data) {
      return { success: false, error: "No data returned from Shopify." };
    }
    const edges = data.edges || [];
    const items = edges.map((e) => e.node);
    const hasNextPage = data.pageInfo.hasNextPage;
    const nextCursor = hasNextPage ? (_b = edges.at(-1)) == null ? void 0 : _b.cursor : null;
    const results = [];
    const mutation = `
      mutation removeTags($id: ID!, $tags: [String!]!) {
        tagsRemove(id: $id, tags: $tags) {
          userErrors { message }
        }
      }
    `;
    for (const item of items) {
      const existing = item.tags || [];
      const tagsToRemove = tags.filter((t) => existing.includes(t));
      const missingTags = tags.filter((t) => !existing.includes(t));
      if (!tagsToRemove.length) {
        results.push({
          id: item.id,
          removedTags: [],
          success: false,
          error: `Tags not present: ${missingTags.join(", ")}`
        });
        continue;
      }
      try {
        const response = await admin.graphql(mutation, {
          variables: { id: item.id, tags: tagsToRemove }
        });
        const j = await response.json();
        const errors = (_d = (_c = j == null ? void 0 : j.data) == null ? void 0 : _c.tagsRemove) == null ? void 0 : _d.userErrors;
        if (errors == null ? void 0 : errors.length) {
          results.push({
            id: item.id,
            removedTags: [],
            success: false,
            error: errors.map((e) => e.message).join(", ")
          });
        } else {
          results.push({
            id: item.id,
            removedTags: tagsToRemove,
            success: true,
            error: missingTags.length ? `Missing tags: ${missingTags.join(", ")}` : null
          });
        }
      } catch (err) {
        results.push({
          id: item.id,
          removedTags: [],
          success: false,
          error: err == null ? void 0 : err.message
        });
      }
    }
    return {
      mode: "remove-global",
      success: true,
      results,
      hasNextPage,
      nextCursor,
      totalProcessed: results.length
    };
  } catch (err) {
    return { success: false, error: err == null ? void 0 : err.message };
  }
}
async function handleRemoveSpecific(admin, formData) {
  var _a2, _b, _c, _d;
  const tags = JSON.parse(formData.get("tags") || []);
  const row = JSON.parse(formData.get("row") || []);
  const flag = JSON.parse(formData.get("flag") || false);
  const resourceType = JSON.parse(formData.get("resource"));
  let cleanId = "";
  if (!flag) {
    const res = await fetchResourceId(admin, resourceType, row);
    cleanId = res;
  } else {
    cleanId = row;
  }
  if (!cleanId) {
    return {
      mode: "remove-specific",
      success: false,
      results: [
        {
          id: row,
          removedTags: [],
          success: false,
          error: flag ? "Invalid or empty resource ID provided" : `Failed to fetch ${resourceType} ID`
        }
      ]
    };
  }
  const results = [];
  const getTagsQuery = `
    query GetTags($id: ID!) {
      node(id: $id) {
        ... on Product { tags }
        ... on Customer { tags }
        ... on Order { tags }
        ... on Article { tags }
      }
    }
  `;
  const removeMutation = `
    mutation removeTags($id: ID!, $tags: [String!]!) {
      tagsRemove(id: $id, tags: $tags) {
        userErrors { message }
      }
    }
  `;
  try {
    const existingRes = await admin.graphql(getTagsQuery, {
      variables: { id: cleanId }
    });
    const existingJson = await existingRes.json();
    const existingTags = ((_b = (_a2 = existingJson == null ? void 0 : existingJson.data) == null ? void 0 : _a2.node) == null ? void 0 : _b.tags) || [];
    const tagsToRemove = tags.filter((t) => existingTags.includes(t));
    const missingTags = tags.filter((t) => !existingTags.includes(t));
    if (tagsToRemove.length === 0) {
      results.push({
        id: cleanId,
        removedTags: [],
        success: false,
        error: `Tags not present: ${missingTags.join(", ")}`
      });
      return {
        mode: "remove-specific",
        success: false,
        results
      };
    }
    const removeRes = await admin.graphql(removeMutation, {
      variables: { id: cleanId, tags: tagsToRemove }
    });
    const removeJson = await removeRes.json();
    const userErrors = (_d = (_c = removeJson == null ? void 0 : removeJson.data) == null ? void 0 : _c.tagsRemove) == null ? void 0 : _d.userErrors;
    if (userErrors == null ? void 0 : userErrors.length) {
      results.push({
        id: cleanId,
        removedTags: [],
        success: false,
        error: userErrors.map((e) => e.message).join(", ")
      });
    } else {
      results.push({
        id: cleanId,
        removedTags: tagsToRemove,
        success: true,
        error: missingTags.length ? `Missing tags: ${missingTags.join(", ")}` : null
      });
    }
  } catch (err) {
    results.push({
      id: cleanId,
      removedTags: [],
      success: false,
      error: err == null ? void 0 : err.message
    });
  }
  return {
    mode: "remove-specific",
    success: results.every((r) => r.success),
    results
  };
}
async function fetchResourceId(admin, resourceType, value) {
  const queries = {
    customer: {
      query: `query($value: String!) {
        customers(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `email:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.customers) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    order: {
      query: `query($value: String!) {
        orders(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `name:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.orders) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    article: {
      query: `query($value: String!) {
        articles(first: 1, query: $value) {
          edges { node { id } }
        }
      }`,
      buildQuery: (v) => `handle:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d;
        return (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.articles) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
      }
    },
    product: {
      query: `query($value: String!) {
    productVariants(first: 1, query: $value) {
      edges {
        node {
          product { id }
        }
      }
    }
  }`,
      buildQuery: (v) => `sku:${v}`,
      path: (res) => {
        var _a2, _b, _c, _d, _e;
        return (_e = (_d = (_c = (_b = (_a2 = res == null ? void 0 : res.productVariants) == null ? void 0 : _a2.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.product) == null ? void 0 : _e.id;
      }
    }
  };
  let type = resourceType === "blogPost" ? "article" : resourceType;
  const config = queries[type];
  if (!config) {
    throw new Error(`Unsupported resource type: ${resourceType}`);
  }
  const builtValue = config.buildQuery(value);
  const variables = { value: builtValue };
  const response = await admin.graphql(config.query, { variables });
  const json = await response.json();
  const extractedId = config.path(json.data) || null;
  return extractedId;
}
async function action$6({
  request
}) {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
  try {
    const {
      admin
    } = await authenticate.admin(request);
    const formData = await request.formData();
    const rawRows = formData.get("rows");
    const rows = JSON.parse(rawRows ? String(rawRows) : "[]");
    const row = rows[0];
    if (!row) {
      return Response.json({
        success: false,
        errors: [{
          message: "No row data provided"
        }]
      });
    }
    const objectType = row.objectType;
    let resolvedId = row.id;
    const isShopifyGID = typeof resolvedId === "string" && resolvedId.startsWith("gid://shopify/");
    if (!isShopifyGID) {
      try {
        if (row.tags) {
          resolvedId = await fetchResourceId(admin, objectType, resolvedId);
        } else if (row.namespace && row.key) {
          resolvedId = await fetchResourceId$1(admin, objectType, resolvedId);
        }
      } catch (err) {
        return Response.json({
          success: false,
          errors: [{
            message: `ID resolution failed: ${err.message}`
          }]
        });
      }
      if (!resolvedId) {
        return Response.json({
          success: false,
          errors: [{
            message: "Unable to resolve Shopify ID"
          }]
        });
      }
    }
    if ((_a2 = row == null ? void 0 : row.tags) == null ? void 0 : _a2.length) {
      if (row.operation === "Tags-Added") {
        const mutation2 = `
          mutation ($id: ID!, $tags: [String!]!) {
            tagsRemove(id: $id, tags: $tags) {
              userErrors { message }
            }
          }
        `;
        const res2 = await admin.graphql(mutation2, {
          variables: {
            id: resolvedId,
            tags: row.tags
          }
        });
        const json2 = await res2.json();
        const errors2 = ((_c = (_b = json2 == null ? void 0 : json2.data) == null ? void 0 : _b.tagsRemove) == null ? void 0 : _c.userErrors) || [];
        if (errors2.length) return Response.json({
          success: false,
          errors: errors2
        });
        return Response.json({
          success: true
        });
      }
      const mutation = `
        mutation ($id: ID!, $tags: [String!]!) {
          tagsAdd(id: $id, tags: $tags) {
            userErrors { field message }
          }
        }
      `;
      const res = await admin.graphql(mutation, {
        variables: {
          id: resolvedId,
          tags: row.tags
        }
      });
      const json = await res.json();
      const errors = ((_e = (_d = json == null ? void 0 : json.data) == null ? void 0 : _d.tagsAdd) == null ? void 0 : _e.userErrors) || [];
      if (errors.length) return Response.json({
        success: false,
        errors
      });
      return Response.json({
        success: true
      });
    }
    if ((row == null ? void 0 : row.namespace) && (row == null ? void 0 : row.key)) {
      let normalizeListValue = function(input) {
        if (!input) return [];
        if (Array.isArray(input)) {
          return input.map((v) => String(v).trim()).filter(Boolean);
        }
        if (typeof input === "string") {
          const trimmed = input.trim();
          if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
            try {
              const parsed = JSON.parse(trimmed);
              return Array.isArray(parsed) ? parsed.map((v) => String(v).trim()).filter(Boolean) : [];
            } catch {
              return [];
            }
          }
          return trimmed.split(",").map((v) => v.trim()).filter(Boolean);
        }
        return [];
      };
      const {
        namespace,
        key,
        value,
        type
      } = row;
      const metafieldType = typeof type === "string" ? type : type == null ? void 0 : type.name;
      const isListType = metafieldType == null ? void 0 : metafieldType.startsWith("list.");
      if (row.operation === "Metafield-removed") {
        if (isListType) {
          const existingRaw = await fetchExistingMetafield(admin, resolvedId, namespace, key);
          const existingList = normalizeListValue(existingRaw);
          const incomingList = normalizeListValue(value);
          const mergedList = Array.from(/* @__PURE__ */ new Set([...existingList, ...incomingList]));
          const result2 = await updateSpecificMetafield(admin, resolvedId, namespace, key, JSON.stringify(mergedList), metafieldType, objectType);
          return Response.json(result2.success ? {
            success: true
          } : {
            success: false,
            errors: result2.errors
          });
        }
        const result = await updateSpecificMetafield(admin, resolvedId, namespace, key, value, metafieldType, objectType);
        return Response.json(result.success ? {
          success: true
        } : {
          success: false,
          errors: result.errors
        });
      }
      if (row.operation === "Metafield-updated") {
        if (isListType) {
          const existingRaw = await fetchExistingMetafield(admin, resolvedId, namespace, key);
          if (!existingRaw) {
            return Response.json({
              success: true
            });
          }
          const existingList = normalizeListValue(existingRaw);
          const removeList = normalizeListValue(value);
          const isMetaobjectList = metafieldType === "list.metaobject_reference";
          let resolvedRemoveList = removeList;
          if (isMetaobjectList) {
            resolvedRemoveList = [];
            for (const item of removeList) {
              if (typeof item === "string" && item.startsWith("gid://shopify/Metaobject/")) {
                resolvedRemoveList.push(item);
              } else {
                const resolved = await getMetaobjectIdFromMetafield(admin, {
                  namespace,
                  key,
                  objectType,
                  metaobjectHandle: item
                });
                if (!resolved) {
                  return Response.json({
                    success: false,
                    errors: [{
                      message: `Metaobject not found: ${item}`
                    }]
                  });
                }
                resolvedRemoveList.push(resolved);
              }
            }
          }
          const updatedList = existingList.filter((v) => !resolvedRemoveList.includes(v));
          if (updatedList.length === 0) {
            const delRes2 = await admin.graphql(`
        mutation ($metafields: [MetafieldIdentifierInput!]!) {
          metafieldsDelete(metafields: $metafields) {
            userErrors { field message }
          }
        }
        `, {
              variables: {
                metafields: [{
                  ownerId: resolvedId,
                  namespace,
                  key
                }]
              }
            });
            const delJson2 = await delRes2.json();
            const errors2 = ((_g = (_f = delJson2 == null ? void 0 : delJson2.data) == null ? void 0 : _f.metafieldsDelete) == null ? void 0 : _g.userErrors) || [];
            if (errors2.length) {
              return Response.json({
                success: false,
                errors: errors2
              });
            }
            return Response.json({
              success: true
            });
          }
          const result = await updateSpecificMetafield(admin, resolvedId, namespace, key, JSON.stringify(updatedList), metafieldType, objectType);
          return Response.json(result.success ? {
            success: true
          } : {
            success: false,
            errors: result.errors
          });
        }
        const delRes = await admin.graphql(`
    mutation ($metafields: [MetafieldIdentifierInput!]!) {
      metafieldsDelete(metafields: $metafields) {
        userErrors { field message }
      }
    }
    `, {
          variables: {
            metafields: [{
              ownerId: resolvedId,
              namespace,
              key
            }]
          }
        });
        const delJson = await delRes.json();
        const errors = ((_i = (_h = delJson == null ? void 0 : delJson.data) == null ? void 0 : _h.metafieldsDelete) == null ? void 0 : _i.userErrors) || [];
        if (errors.length) {
          return Response.json({
            success: false,
            errors
          });
        }
        return Response.json({
          success: true
        });
      }
    }
  } catch (err) {
    return Response.json({
      success: false,
      errors: [{
        message: err.message || "Unexpected server error"
      }]
    }, {
      status: 500
    });
  }
}
async function updateSpecificMetafield(admin, id, namespace, key, value, metafieldType, objectType) {
  var _a2, _b;
  const type = typeof metafieldType === "string" ? metafieldType : metafieldType == null ? void 0 : metafieldType.name;
  if (!type) {
    return {
      success: false,
      errors: [{
        message: "Missing metafield type"
      }]
    };
  }
  const isMetaobjectId = (v) => typeof v === "string" && /^gid:\/\/shopify\/Metaobject\/\d+$/.test(v.trim());
  async function resolveMetaobjectValue(raw) {
    if (!raw) return null;
    if (isMetaobjectId(raw)) return raw;
    return await getMetaobjectIdFromMetafield(admin, {
      namespace,
      key,
      objectType,
      metaobjectHandle: raw
    });
  }
  let finalValue = value;
  if (type === "metaobject_reference") {
    const resolvedId = await resolveMetaobjectValue(value);
    if (!resolvedId) {
      return {
        success: false,
        errors: [{
          message: `Metaobject not found: ${value}`
        }]
      };
    }
    finalValue = resolvedId;
  } else if (type === "list.metaobject_reference") {
    let list;
    if (Array.isArray(value)) {
      list = value;
    } else if (typeof value === "string" && value.trim().startsWith("[")) {
      try {
        list = JSON.parse(value);
      } catch {
        return {
          success: false,
          errors: [{
            message: "Invalid JSON for list.metaobject_reference"
          }]
        };
      }
    } else if (typeof value === "string") {
      list = value.split(",").map((v) => v.trim()).filter(Boolean);
    }
    if (!Array.isArray(list)) {
      return {
        success: false,
        errors: [{
          message: "Invalid list.metaobject_reference value"
        }]
      };
    }
    const resolvedIds = [];
    for (const item of list) {
      const resolved = await resolveMetaobjectValue(item);
      if (!resolved) {
        return {
          success: false,
          errors: [{
            message: `Metaobject not found: ${item}`
          }]
        };
      }
      resolvedIds.push(resolved);
    }
    finalValue = JSON.stringify(resolvedIds);
  } else if (type.startsWith("list.")) {
    finalValue = typeof value === "string" ? value : JSON.stringify(value);
  } else {
    finalValue = value === null || value === void 0 ? "" : String(value);
  }
  const metafieldInput = {
    ownerId: id,
    namespace,
    key,
    type,
    value: finalValue
  };
  const mutation = `
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id namespace key value type }
        userErrors { field message code }
      }
    }
  `;
  const res = await admin.graphql(mutation, {
    variables: {
      metafields: [metafieldInput]
    }
  });
  const json = await res.json();
  const errors = ((_b = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.metafieldsSet) == null ? void 0 : _b.userErrors) || [];
  return {
    success: errors.length === 0,
    errors
  };
}
async function fetchExistingMetafield(admin, ownerId, namespace, key) {
  var _a2, _b, _c;
  const query = `
    query getMetafield($id: ID!, $namespace: String!, $key: String!) {
      node(id: $id) {
        ... on HasMetafields {
          metafield(namespace: $namespace, key: $key) {
            value
          }
        }
      }
    }
  `;
  const res = await admin.graphql(query, {
    variables: {
      id: ownerId,
      namespace,
      key
    }
  });
  const json = await res.json();
  return ((_c = (_b = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.node) == null ? void 0 : _b.metafield) == null ? void 0 : _c.value) ?? null;
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6
}, Symbol.toStringTag, { value: "Module" }));
const METAOBJECT_TYPE = "__tag_metafield_app_database";
async function loader$b({
  request
}) {
  var _a2, _b, _c, _d, _e;
  try {
    const {
      admin
    } = await authenticate.admin(request);
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor");
    const direction = url.searchParams.get("direction") || "next";
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const definitionQuery = `
      query metaobjectDefinitionExistsByType($type: String!) {
        metaobjectDefinitionByType(type: $type) {
          id
        }
      }
    `;
    const defRes = await admin.graphql(definitionQuery, {
      variables: {
        type: METAOBJECT_TYPE
      }
    });
    const defJson = await defRes.json();
    const definitionExists = !!((_a2 = defJson == null ? void 0 : defJson.data) == null ? void 0 : _a2.metaobjectDefinitionByType);
    if (!definitionExists) {
      return {
        successdb: false,
        database: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false
        },
        error: `Metaobject definition "${METAOBJECT_TYPE}" does not exist`
      };
    }
    let paginationArgs = "";
    if (direction === "prev" && cursor) {
      paginationArgs = `last: ${limit}, before: "${cursor}"`;
    } else if (cursor) {
      paginationArgs = `first: ${limit}, after: "${cursor}"`;
    } else {
      paginationArgs = `first: ${limit}`;
    }
    const query = `
      query GetTagMetafieldDB {
        metaobjects(type: "${METAOBJECT_TYPE}", ${paginationArgs}, reverse: true) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          nodes {
            id
            handle
            fields {
              key
              value
            }
          }
        }
      }
    `;
    const response = await admin.graphql(query);
    const data = await response.json();
    if (data.errors) {
      return {
        successdb: false,
        error: "GraphQL error while fetching metaobjects"
      };
    }
    const nodes = ((_c = (_b = data == null ? void 0 : data.data) == null ? void 0 : _b.metaobjects) == null ? void 0 : _c.nodes) || [];
    const pageInfo = ((_e = (_d = data == null ? void 0 : data.data) == null ? void 0 : _d.metaobjects) == null ? void 0 : _e.pageInfo) || {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null
    };
    const formatted = nodes.map((obj) => {
      const fieldMap = Object.fromEntries(obj.fields.map((f) => [f.key, f.value]));
      return {
        id: obj.id,
        userName: fieldMap.username || "unknown",
        operation: fieldMap.operation || "",
        objectType: fieldMap.objecttype || "",
        value: fieldMap.value ? JSON.parse(fieldMap.value) : [],
        restore: fieldMap.restore === "true",
        time: fieldMap.time || null
      };
    });
    return {
      successdb: true,
      database: formatted,
      pageInfo
    };
  } catch (error) {
    return {
      successdb: false,
      error: "Failed to fetch metaobject database"
    };
  }
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
async function action$5({
  request
}) {
  var _a2, _b, _c, _d, _e, _f;
  let userName = "unknown";
  let myshopifyDomain = "unknown";
  try {
    const {
      admin
    } = await authenticate.admin(request);
    const shopQuery = `
      query {
        shop {
          email
          myshopifyDomain
        }
      }
    `;
    const shopRes = await admin.graphql(shopQuery);
    const shopJson = await shopRes.json();
    userName = ((_b = (_a2 = shopJson == null ? void 0 : shopJson.data) == null ? void 0 : _a2.shop) == null ? void 0 : _b.email) || ((_d = (_c = shopJson == null ? void 0 : shopJson.data) == null ? void 0 : _c.shop) == null ? void 0 : _d.myshopifyDomain) || userName;
    myshopifyDomain = ((_f = (_e = shopJson == null ? void 0 : shopJson.data) == null ? void 0 : _e.shop) == null ? void 0 : _f.myshopifyDomain) || myshopifyDomain;
    const body = await request.json();
    const {
      operation,
      objectType,
      value
    } = body;
    if (!operation || !objectType || !value) {
      return {
        success: false,
        error: "Missing required fields"
      };
    }
    const unique_id = nanoid(8);
    const currentTime = (/* @__PURE__ */ new Date()).toISOString();
    const createResponse = await admin.graphql(`
      mutation CreateTagMetafieldDB($input: MetaobjectCreateInput!) {
        metaobjectCreate(metaobject: $input) {
          metaobject {
            id
            handle
          }
          userErrors {
            field
            message
          }
        }
      }
      `, {
      variables: {
        input: {
          type: "__tag_metafield_app_database",
          fields: [{
            key: "unique_id",
            value: unique_id
          }, {
            key: "username",
            value: userName
          }, {
            key: "operation",
            value: operation
          }, {
            key: "objecttype",
            value: objectType
          }, {
            key: "value",
            value: JSON.stringify(value)
          }, {
            key: "restore",
            value: "true"
          }, {
            key: "time",
            value: currentTime
          }]
        }
      }
    });
    const createData = await createResponse.json();
    const errors = createData.data.metaobjectCreate.userErrors;
    if (errors.length) {
      return {
        success: false,
        error: errors
      };
    }
    const fetchResponse = await admin.graphql(`
      query GetTagMetafieldDB {
        metaobjects(type: "__tag_metafield_app_database", first: 50) {
          nodes {
            id
            handle
            fields {
              key
              value
            }
          }
        }
      }
      `);
    const fetchData = await fetchResponse.json();
    return {
      success: true,
      shop: myshopifyDomain,
      created: createData.data.metaobjectCreate.metaobject,
      database: fetchData.data.metaobjects.nodes
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal server error"
    };
  }
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$5
}, Symbol.toStringTag, { value: "Module" }));
function loginErrorMessage(loginErrors) {
  if ((loginErrors == null ? void 0 : loginErrors.shop) === LoginErrorType.MissingShop) {
    return { shop: "Please enter your shop domain to log in" };
  } else if ((loginErrors == null ? void 0 : loginErrors.shop) === LoginErrorType.InvalidShop) {
    return { shop: "Please enter a valid shop domain to log in" };
  }
  return {};
}
const loader$a = async ({
  request
}) => {
  const errors = loginErrorMessage(await login(request));
  return {
    errors
  };
};
const action$4 = async ({
  request
}) => {
  const errors = loginErrorMessage(await login(request));
  return {
    errors
  };
};
const route$1 = UNSAFE_withComponentProps(function Auth() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [shop, setShop] = useState("");
  const {
    errors
  } = actionData || loaderData;
  return /* @__PURE__ */ jsx(AppProvider, {
    embedded: false,
    children: /* @__PURE__ */ jsx("s-page", {
      children: /* @__PURE__ */ jsx(Form, {
        method: "post",
        children: /* @__PURE__ */ jsxs("s-section", {
          heading: "Log in",
          children: [/* @__PURE__ */ jsx("s-text-field", {
            name: "shop",
            label: "Shop domain",
            details: "example.myshopify.com",
            value: shop,
            onChange: (e) => setShop(e.currentTarget.value),
            autocomplete: "on",
            error: errors.shop
          }), /* @__PURE__ */ jsx("s-button", {
            type: "submit",
            children: "Log in"
          })]
        })
      })
    })
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: route$1,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
const loader$9 = async ({
  request
}) => {
  const url = new URL(request.url);
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }
  return {
    showForm: Boolean(login)
  };
};
const route = UNSAFE_withComponentProps(function App2() {
  const {
    showForm
  } = useLoaderData();
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-white text-black font-sans px-4 py-10",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-5xl space-y-14",
      children: [/* @__PURE__ */ jsxs("header", {
        className: "text-center space-y-5",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-5xl md:text-6xl font-extrabold tracking-tight uppercase",
          children: "Tag Metafield Manager"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl text-gray-600 max-w-2xl mx-auto",
          children: "A professional-grade tool to bulk manage tags and metafields across your Shopify store with safety and control."
        })]
      }), showForm && /* @__PURE__ */ jsx("section", {
        className: "flex justify-center",
        children: /* @__PURE__ */ jsxs(Form, {
          method: "post",
          action: "/auth/login",
          className: "w-full max-w-md space-y-4 border border-gray-200 rounded-2xl p-6 shadow-sm",
          children: [/* @__PURE__ */ jsxs("label", {
            className: "block",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1",
              children: "Shop Domain"
            }), /* @__PURE__ */ jsx("input", {
              type: "text",
              name: "shop",
              placeholder: "my-store.myshopify.com",
              className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            })]
          }), /* @__PURE__ */ jsx("button", {
            type: "submit",
            className: "w-full bg-black text-white py-3 rounded-lg font-semibold uppercase tracking-wide hover:bg-gray-900 transition",
            children: "Log in"
          })]
        })
      }), /* @__PURE__ */ jsxs("section", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-10",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "p-6 border border-gray-200 rounded-xl hover:shadow-sm transition",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-lg font-bold mb-2",
            children: "Bulk Tag Operations"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-gray-600",
            children: "Add or remove tags across thousands of products, customers, and orders using CSV-based processing."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "p-6 border border-gray-200 rounded-xl hover:shadow-sm transition",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-lg font-bold mb-2",
            children: "Metafield Management"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-gray-600",
            children: "View, update, or clean up metafields in bulk with controlled execution and validation."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "p-6 border border-gray-200 rounded-xl hover:shadow-sm transition",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-lg font-bold mb-2",
            children: "History & Undo Safety"
          }), /* @__PURE__ */ jsxs("p", {
            className: "text-sm text-gray-600",
            children: ["Every operation is recorded. You can undo eligible actions within ", /* @__PURE__ */ jsx("strong", {
              children: "2 days"
            }), ". History is automatically cleared after this period."]
          })]
        })]
      })]
    })
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: route,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
const loader$8 = async ({
  request
}) => {
  await authenticate.admin(request);
  return null;
};
const headers$1 = (headersArgs) => {
  return boundary.headers(headersArgs);
};
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  headers: headers$1,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
const Polaris = /* @__PURE__ */ JSON.parse('{"ActionMenu":{"Actions":{"moreActions":"More actions"},"RollupActions":{"rollupButton":"View actions"}},"ActionList":{"SearchField":{"clearButtonLabel":"Clear","search":"Search","placeholder":"Search actions"}},"Avatar":{"label":"Avatar","labelWithInitials":"Avatar with initials {initials}"},"Autocomplete":{"spinnerAccessibilityLabel":"Loading","ellipsis":"{content}…"},"Badge":{"PROGRESS_LABELS":{"incomplete":"Incomplete","partiallyComplete":"Partially complete","complete":"Complete"},"TONE_LABELS":{"info":"Info","success":"Success","warning":"Warning","critical":"Critical","attention":"Attention","new":"New","readOnly":"Read-only","enabled":"Enabled"},"progressAndTone":"{toneLabel} {progressLabel}"},"Banner":{"dismissButton":"Dismiss notification"},"Button":{"spinnerAccessibilityLabel":"Loading"},"Common":{"checkbox":"checkbox","undo":"Undo","cancel":"Cancel","clear":"Clear","close":"Close","submit":"Submit","more":"More"},"ContextualSaveBar":{"save":"Save","discard":"Discard"},"DataTable":{"sortAccessibilityLabel":"sort {direction} by","navAccessibilityLabel":"Scroll table {direction} one column","totalsRowHeading":"Totals","totalRowHeading":"Total"},"DatePicker":{"previousMonth":"Show previous month, {previousMonthName} {showPreviousYear}","nextMonth":"Show next month, {nextMonth} {nextYear}","today":"Today ","start":"Start of range","end":"End of range","months":{"january":"January","february":"February","march":"March","april":"April","may":"May","june":"June","july":"July","august":"August","september":"September","october":"October","november":"November","december":"December"},"days":{"monday":"Monday","tuesday":"Tuesday","wednesday":"Wednesday","thursday":"Thursday","friday":"Friday","saturday":"Saturday","sunday":"Sunday"},"daysAbbreviated":{"monday":"Mo","tuesday":"Tu","wednesday":"We","thursday":"Th","friday":"Fr","saturday":"Sa","sunday":"Su"}},"DiscardConfirmationModal":{"title":"Discard all unsaved changes","message":"If you discard changes, you’ll delete any edits you made since you last saved.","primaryAction":"Discard changes","secondaryAction":"Continue editing"},"DropZone":{"single":{"overlayTextFile":"Drop file to upload","overlayTextImage":"Drop image to upload","overlayTextVideo":"Drop video to upload","actionTitleFile":"Add file","actionTitleImage":"Add image","actionTitleVideo":"Add video","actionHintFile":"or drop file to upload","actionHintImage":"or drop image to upload","actionHintVideo":"or drop video to upload","labelFile":"Upload file","labelImage":"Upload image","labelVideo":"Upload video"},"allowMultiple":{"overlayTextFile":"Drop files to upload","overlayTextImage":"Drop images to upload","overlayTextVideo":"Drop videos to upload","actionTitleFile":"Add files","actionTitleImage":"Add images","actionTitleVideo":"Add videos","actionHintFile":"or drop files to upload","actionHintImage":"or drop images to upload","actionHintVideo":"or drop videos to upload","labelFile":"Upload files","labelImage":"Upload images","labelVideo":"Upload videos"},"errorOverlayTextFile":"File type is not valid","errorOverlayTextImage":"Image type is not valid","errorOverlayTextVideo":"Video type is not valid"},"EmptySearchResult":{"altText":"Empty search results"},"Frame":{"skipToContent":"Skip to content","navigationLabel":"Navigation","Navigation":{"closeMobileNavigationLabel":"Close navigation"}},"FullscreenBar":{"back":"Back","accessibilityLabel":"Exit fullscreen mode"},"Filters":{"moreFilters":"More filters","moreFiltersWithCount":"More filters ({count})","filter":"Filter {resourceName}","noFiltersApplied":"No filters applied","cancel":"Cancel","done":"Done","clearAllFilters":"Clear all filters","clear":"Clear","clearLabel":"Clear {filterName}","addFilter":"Add filter","clearFilters":"Clear all","searchInView":"in:{viewName}"},"FilterPill":{"clear":"Clear","unsavedChanges":"Unsaved changes - {label}"},"IndexFilters":{"searchFilterTooltip":"Search and filter","searchFilterTooltipWithShortcut":"Search and filter (F)","searchFilterAccessibilityLabel":"Search and filter results","sort":"Sort your results","addView":"Add a new view","newView":"Custom search","SortButton":{"ariaLabel":"Sort the results","tooltip":"Sort","title":"Sort by","sorting":{"asc":"Ascending","desc":"Descending","az":"A-Z","za":"Z-A"}},"EditColumnsButton":{"tooltip":"Edit columns","accessibilityLabel":"Customize table column order and visibility"},"UpdateButtons":{"cancel":"Cancel","update":"Update","save":"Save","saveAs":"Save as","modal":{"title":"Save view as","label":"Name","sameName":"A view with this name already exists. Please choose a different name.","save":"Save","cancel":"Cancel"}}},"IndexProvider":{"defaultItemSingular":"Item","defaultItemPlural":"Items","allItemsSelected":"All {itemsLength}+ {resourceNamePlural} are selected","selected":"{selectedItemsCount} selected","a11yCheckboxDeselectAllSingle":"Deselect {resourceNameSingular}","a11yCheckboxSelectAllSingle":"Select {resourceNameSingular}","a11yCheckboxDeselectAllMultiple":"Deselect all {itemsLength} {resourceNamePlural}","a11yCheckboxSelectAllMultiple":"Select all {itemsLength} {resourceNamePlural}"},"IndexTable":{"emptySearchTitle":"No {resourceNamePlural} found","emptySearchDescription":"Try changing the filters or search term","onboardingBadgeText":"New","resourceLoadingAccessibilityLabel":"Loading {resourceNamePlural}…","selectAllLabel":"Select all {resourceNamePlural}","selected":"{selectedItemsCount} selected","undo":"Undo","selectAllItems":"Select all {itemsLength}+ {resourceNamePlural}","selectItem":"Select {resourceName}","selectButtonText":"Select","sortAccessibilityLabel":"sort {direction} by"},"Loading":{"label":"Page loading bar"},"Modal":{"iFrameTitle":"body markup","modalWarning":"These required properties are missing from Modal: {missingProps}"},"Page":{"Header":{"rollupActionsLabel":"View actions for {title}","pageReadyAccessibilityLabel":"{title}. This page is ready"}},"Pagination":{"previous":"Previous","next":"Next","pagination":"Pagination"},"ProgressBar":{"negativeWarningMessage":"Values passed to the progress prop shouldn’t be negative. Resetting {progress} to 0.","exceedWarningMessage":"Values passed to the progress prop shouldn’t exceed 100. Setting {progress} to 100."},"ResourceList":{"sortingLabel":"Sort by","defaultItemSingular":"item","defaultItemPlural":"items","showing":"Showing {itemsCount} {resource}","showingTotalCount":"Showing {itemsCount} of {totalItemsCount} {resource}","loading":"Loading {resource}","selected":"{selectedItemsCount} selected","allItemsSelected":"All {itemsLength}+ {resourceNamePlural} in your store are selected","allFilteredItemsSelected":"All {itemsLength}+ {resourceNamePlural} in this filter are selected","selectAllItems":"Select all {itemsLength}+ {resourceNamePlural} in your store","selectAllFilteredItems":"Select all {itemsLength}+ {resourceNamePlural} in this filter","emptySearchResultTitle":"No {resourceNamePlural} found","emptySearchResultDescription":"Try changing the filters or search term","selectButtonText":"Select","a11yCheckboxDeselectAllSingle":"Deselect {resourceNameSingular}","a11yCheckboxSelectAllSingle":"Select {resourceNameSingular}","a11yCheckboxDeselectAllMultiple":"Deselect all {itemsLength} {resourceNamePlural}","a11yCheckboxSelectAllMultiple":"Select all {itemsLength} {resourceNamePlural}","Item":{"actionsDropdownLabel":"Actions for {accessibilityLabel}","actionsDropdown":"Actions dropdown","viewItem":"View details for {itemName}"},"BulkActions":{"actionsActivatorLabel":"Actions","moreActionsActivatorLabel":"More actions"}},"SkeletonPage":{"loadingLabel":"Page loading"},"Tabs":{"newViewAccessibilityLabel":"Create new view","newViewTooltip":"Create view","toggleTabsLabel":"More views","Tab":{"rename":"Rename view","duplicate":"Duplicate view","edit":"Edit view","editColumns":"Edit columns","delete":"Delete view","copy":"Copy of {name}","deleteModal":{"title":"Delete view?","description":"This can’t be undone. {viewName} view will no longer be available in your admin.","cancel":"Cancel","delete":"Delete view"}},"RenameModal":{"title":"Rename view","label":"Name","cancel":"Cancel","create":"Save","errors":{"sameName":"A view with this name already exists. Please choose a different name."}},"DuplicateModal":{"title":"Duplicate view","label":"Name","cancel":"Cancel","create":"Create view","errors":{"sameName":"A view with this name already exists. Please choose a different name."}},"CreateViewModal":{"title":"Create new view","label":"Name","cancel":"Cancel","create":"Create view","errors":{"sameName":"A view with this name already exists. Please choose a different name."}}},"Tag":{"ariaLabel":"Remove {children}"},"TextField":{"characterCount":"{count} characters","characterCountWithMaxLength":"{count} of {limit} characters used"},"TooltipOverlay":{"accessibilityLabel":"Tooltip: {label}"},"TopBar":{"toggleMenuLabel":"Toggle menu","SearchField":{"clearButtonLabel":"Clear","search":"Search"}},"MediaCard":{"dismissButton":"Dismiss","popoverButton":"Actions"},"VideoThumbnail":{"playButtonA11yLabel":{"default":"Play video","defaultWithDuration":"Play video of length {duration}","duration":{"hours":{"other":{"only":"{hourCount} hours","andMinutes":"{hourCount} hours and {minuteCount} minutes","andMinute":"{hourCount} hours and {minuteCount} minute","minutesAndSeconds":"{hourCount} hours, {minuteCount} minutes, and {secondCount} seconds","minutesAndSecond":"{hourCount} hours, {minuteCount} minutes, and {secondCount} second","minuteAndSeconds":"{hourCount} hours, {minuteCount} minute, and {secondCount} seconds","minuteAndSecond":"{hourCount} hours, {minuteCount} minute, and {secondCount} second","andSeconds":"{hourCount} hours and {secondCount} seconds","andSecond":"{hourCount} hours and {secondCount} second"},"one":{"only":"{hourCount} hour","andMinutes":"{hourCount} hour and {minuteCount} minutes","andMinute":"{hourCount} hour and {minuteCount} minute","minutesAndSeconds":"{hourCount} hour, {minuteCount} minutes, and {secondCount} seconds","minutesAndSecond":"{hourCount} hour, {minuteCount} minutes, and {secondCount} second","minuteAndSeconds":"{hourCount} hour, {minuteCount} minute, and {secondCount} seconds","minuteAndSecond":"{hourCount} hour, {minuteCount} minute, and {secondCount} second","andSeconds":"{hourCount} hour and {secondCount} seconds","andSecond":"{hourCount} hour and {secondCount} second"}},"minutes":{"other":{"only":"{minuteCount} minutes","andSeconds":"{minuteCount} minutes and {secondCount} seconds","andSecond":"{minuteCount} minutes and {secondCount} second"},"one":{"only":"{minuteCount} minute","andSeconds":"{minuteCount} minute and {secondCount} seconds","andSecond":"{minuteCount} minute and {secondCount} second"}},"seconds":{"other":"{secondCount} seconds","one":"{secondCount} second"}}}}}');
const translations = {
  Polaris
};
const loader$7 = async ({
  request
}) => {
  await authenticate.admin(request);
  return {
    apiKey: process.env.SHOPIFY_API_KEY
  };
};
const app = UNSAFE_withComponentProps(function App3() {
  const {
    apiKey
  } = useLoaderData();
  return /* @__PURE__ */ jsx(AppProvider, {
    embedded: true,
    apiKey,
    children: /* @__PURE__ */ jsxs(AppProvider$1, {
      i18n: translations,
      children: [/* @__PURE__ */ jsxs("s-app-nav", {
        children: [/* @__PURE__ */ jsx("s-link", {
          href: "/app/export-data",
          children: "Export Data"
        }), /* @__PURE__ */ jsx("s-link", {
          href: "/app/history",
          children: "History"
        }), /* @__PURE__ */ jsx("s-link", {
          href: "/app/faq",
          children: "FAQ"
        })]
      }), /* @__PURE__ */ jsx(Outlet, {})]
    })
  });
});
const ErrorBoundary2 = UNSAFE_withErrorBoundaryProps(function ErrorBoundary3() {
  return boundary.error(useRouteError());
});
const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary2,
  default: app,
  headers,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
function CsvPreviewModal({
  open,
  onClose,
  onConfirm,
  data,
  title = "Confirm Action",
  confirmText = "Confirm",
  destructive = false,
  confirmationMessage
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;
  useEffect(() => {
    if (open) setCurrentPage(1);
  }, [open]);
  if (!data || data.length === 0) return null;
  const firstRow = data[0];
  let headers2 = [];
  let isArrayOfArrays = false;
  if (Array.isArray(firstRow)) {
    isArrayOfArrays = true;
    headers2 = firstRow.map((_, i) => ({ title: `Column ${i + 1}` }));
  } else if (typeof firstRow === "object" && firstRow !== null) {
    headers2 = Object.keys(firstRow).map((key) => ({ title: key }));
  } else {
    headers2 = [{ title: "Value" }];
  }
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayData = data.slice(startIndex, startIndex + rowsPerPage);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      open,
      onClose,
      title,
      primaryAction: {
        content: confirmText,
        onAction: onConfirm,
        destructive
      },
      secondaryActions: [
        {
          content: "Cancel",
          onAction: onClose
        }
      ],
      size: "large",
      children: /* @__PURE__ */ jsx(Modal.Section, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "400", children: [
        /* @__PURE__ */ jsxs(InlineStack, { align: "space-between", blockAlign: "center", children: [
          /* @__PURE__ */ jsxs(Text, { as: "p", tone: "subdued", children: [
            "Showing ",
            startIndex + 1,
            " to ",
            Math.min(startIndex + rowsPerPage, data.length),
            " of ",
            data.length,
            " records."
          ] }),
          totalPages > 1 && /* @__PURE__ */ jsx(
            Pagination,
            {
              hasPrevious: currentPage > 1,
              onPrevious: () => setCurrentPage((prev) => prev - 1),
              hasNext: currentPage < totalPages,
              onNext: () => setCurrentPage((prev) => prev + 1)
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Box, { paddingBlockStart: "100", children: /* @__PURE__ */ jsx("div", { style: { maxHeight: "400px", overflowY: "auto", overflowX: "auto" }, children: /* @__PURE__ */ jsx(
          IndexTable,
          {
            resourceName: { singular: "row", plural: "rows" },
            itemCount: displayData.length,
            headings: headers2,
            selectable: false,
            children: displayData.map((row, index) => {
              let cells = [];
              if (isArrayOfArrays) {
                cells = row;
              } else if (typeof row === "object" && row !== null) {
                cells = Object.values(row);
              } else {
                cells = [row];
              }
              const globalIndex = startIndex + index;
              return /* @__PURE__ */ jsx(IndexTable.Row, { id: `row-${globalIndex}`, position: index, children: cells.map((cellValue, i) => /* @__PURE__ */ jsx(IndexTable.Cell, { children: typeof cellValue === "object" ? JSON.stringify(cellValue) : String(cellValue) }, i)) }, globalIndex);
            })
          }
        ) }) }),
        confirmationMessage && /* @__PURE__ */ jsx(Box, { paddingBlockStart: "300", children: /* @__PURE__ */ jsx(Text, { as: "p", fontWeight: "medium", children: confirmationMessage }) })
      ] }) })
    }
  );
}
function AddTagsInstructionsModal({ open, onClose }) {
  return /* @__PURE__ */ jsx(
    Modal,
    {
      open,
      onClose,
      title: "How to Add Tags",
      primaryAction: {
        content: "Got it",
        onAction: onClose
      },
      children: /* @__PURE__ */ jsx(Modal.Section, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ jsx(Text, { as: "p", variant: "bodyMd", children: "Follow these steps to add tags to your resources:" }),
        /* @__PURE__ */ jsxs(List, { type: "number", children: [
          /* @__PURE__ */ jsx(List.Item, { children: "Select the resource type you want to update." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Add the tags you want to apply." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Select how you want to match the resources (e.g., by Shopify GID or a specific field matching your CSV)." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Download the sample CSV to see the expected format." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Upload your CSV file, ensuring it perfectly matches the required format." }),
          /* @__PURE__ */ jsx(List.Item, { children: 'Click "Run Bulk Update" to start the process.' }),
          /* @__PURE__ */ jsx(List.Item, { children: "Watch the live progress and results." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Once the operation is complete, download the results to see the outcome for each record." })
        ] })
      ] }) })
    }
  );
}
function RemoveTagsInstructionsModal({ open, onClose }) {
  return /* @__PURE__ */ jsx(
    Modal,
    {
      open,
      onClose,
      title: "How to Remove Tags",
      primaryAction: {
        content: "Got it",
        onAction: onClose
      },
      children: /* @__PURE__ */ jsx(Modal.Section, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ jsx(Text, { as: "p", variant: "bodyMd", children: "Follow these steps to remove tags from your resources:" }),
        /* @__PURE__ */ jsxs(List, { type: "number", children: [
          /* @__PURE__ */ jsx(List.Item, { children: "Select the resource type you want to update." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Search and select the tags you want to remove." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Choose the removal method (Global or Specific via CSV)." }),
          /* @__PURE__ */ jsx(List.Item, { children: "If using CSV, download the sample CSV to see the expected format." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Upload your CSV file, ensuring it perfectly matches the required format." }),
          /* @__PURE__ */ jsx(List.Item, { children: 'Click "Remove Selected Tags" to start the process.' }),
          /* @__PURE__ */ jsx(List.Item, { children: "Watch the live progress and results." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Once the operation is complete, download the results to see the outcome for each record." })
        ] })
      ] }) })
    }
  );
}
function MetafieldManageInstructionsModal({ open, onClose }) {
  return /* @__PURE__ */ jsx(
    Modal,
    {
      open,
      onClose,
      title: "How to Manage Metafields",
      primaryAction: {
        content: "Got it",
        onAction: onClose
      },
      children: /* @__PURE__ */ jsx(Modal.Section, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ jsx(Text, { as: "p", variant: "bodyMd", children: "Follow these steps to manage metafields for your resources:" }),
        /* @__PURE__ */ jsxs(List, { type: "number", children: [
          /* @__PURE__ */ jsx(List.Item, { children: "Select the resource type you want to update and fetch available metafields." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Select the specific metafield you want to manage." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Choose the operation mode (Global Deletion, Targeted Removal, or Bulk Update)." }),
          /* @__PURE__ */ jsx(List.Item, { children: "If using CSV, download the sample CSV to see the expected format." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Upload your CSV file, ensuring it perfectly matches the required format." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Click the action button to start the process." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Watch the live progress and results." }),
          /* @__PURE__ */ jsx(List.Item, { children: "Once the operation is complete, download the results to see the outcome for each record." })
        ] })
      ] }) })
    }
  );
}
const loader$6 = async ({
  request
}) => {
  try {
    await authenticate.admin(request);
    return {
      apiKey: process.env.SHOPIFY_API_KEY || ""
    };
  } catch (error) {
    throw new Response("Unauthorized or Server Error", {
      status: 500
    });
  }
};
async function action$3({
  request
}) {
  try {
    const {
      admin
    } = await authenticate.admin(request);
    const formData = await request.formData();
    const objectType = formData.get("objectType");
    const mode = formData.get("mode");
    const namespace = formData.get("namespace");
    const key = formData.get("key");
    const value = formData.get("value");
    const type = formData.get("type");
    const id = formData.get("id");
    const flag = formData.get("flag");
    const resource = queryMap[objectType];
    if (mode === "removeMetafield") {
      const cursor = formData.get("cursor") || null;
      const payload2 = await removeAllMetafields(admin, resource, namespace, key, cursor);
      return {
        success: true,
        payload: payload2
      };
    }
    if (mode === "removeMetafieldSpecific") {
      if (!id) {
        return {
          success: false,
          message: "No ID provided"
        };
      }
      const flag1 = formData.get("flag1");
      const payload2 = await removeSpecificMetafield(admin, id, namespace, key, value, type, flag, flag1, objectType);
      return {
        success: payload2.success,
        payload: payload2
      };
    }
    if (mode === "updateMetafieldSpecific") {
      if (!id) {
        return {
          success: false,
          message: "No ID provided"
        };
      }
      const flag2 = formData.get("flag2");
      const payload2 = await updateSpecificMetafield$1(admin, id, namespace, key, value, type, flag, flag2, objectType);
      return {
        success: payload2.success,
        payload: payload2
      };
    }
    const payload = await fetchDefinitions(admin, resource);
    return {
      success: true,
      payload
    };
  } catch (err) {
    return {
      success: false,
      message: "Internal server error",
      error: err.message || "Unexpected failure"
    };
  }
}
const app_metafieldManage = UNSAFE_withComponentProps(function MetafieldManage() {
  var _a2, _b, _c;
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [objectType, setObjectType] = useState("product");
  const [metafields, setMetafields] = useState([]);
  const [selectedMetafield, setSelectedMetafield] = useState(null);
  const [removeMode, setRemoveMode] = useState("all");
  const [listUpdateMode, setListUpdateMode] = useState("merge");
  const [listRemoveMode, setListRemoveMode] = useState("full");
  const [csvRows, setCsvRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [rawCsvData, setRawCsvData] = useState([]);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [alert, setAlert] = useState({
    active: false,
    title: "",
    message: ""
  });
  const [isDbCreated, setIsDbCreated] = useState(false);
  const [dbChecked, setDbChecked] = useState(false);
  const [modalOpendb, setModalOpendb] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accumulatedResults, setAccumulatedResults] = useState([]);
  const [csvType, setcsvType] = useState("Id");
  const [specificField, setSpecificField] = useState("Id");
  const [resourceCount, setResourceCount] = useState(0);
  const [csvData, setCsvData] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [manualLoading, setManualLoading] = useState(false);
  const loading = !isSubmitting && (isDeleting || fetcher.state === "submitting" || manualLoading);
  const [showInfo, setshowInfo] = useState("");
  const [showInfoMeta, setshowInfoMeta] = useState(false);
  const lastProcessedRef = useRef(null);
  useEffect(() => {
    if (!isDeleting) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const blockNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", blockNavigation);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", blockNavigation);
    };
  }, [isDeleting]);
  function downloadResultsCSV(results2, removeMode2) {
    if (!results2 || results2.length === 0) {
      setAlert({
        active: true,
        title: "No Results",
        message: "No results to download!",
        tone: "critical"
      });
      return;
    }
    let headers2 = [];
    let rows = [];
    let filename = "";
    if (removeMode2 === "all") {
      headers2 = ["id", "success", "value", "error"];
      rows = results2.map((r) => {
        var _a3;
        return [csvSafe(r.id), csvSafe(r.success ? "true" : "false"), csvSafe((_a3 = r.data) == null ? void 0 : _a3.value), csvSafe(r.errors || r.error)];
      });
      filename = "removeAll_results";
    } else if (removeMode2 === "specific" && listRemoveMode !== "partial") {
      headers2 = [specificField.toLowerCase(), "success", "value", "error"];
      rows = results2.map((r) => {
        var _a3;
        return [csvSafe(r.id), csvSafe(r.success ? "true" : "false"), csvSafe((_a3 = r.data) == null ? void 0 : _a3.value), csvSafe(r.errors || r.error)];
      });
      filename = "remove_results";
    } else if (removeMode2 === "specific" && listRemoveMode === "partial") {
      headers2 = [specificField.toLowerCase(), "key", "value", "success", "error"];
      rows = results2.map((r) => [csvSafe(r.id), csvSafe(r.key), csvSafe(r.value), csvSafe(r.success ? "true" : "false"), csvSafe(r.error || r.errors)]);
      filename = "remove_results";
    } else if (removeMode2 === "update") {
      headers2 = [specificField.toLowerCase(), "key", "value", "success", "error"];
      rows = results2.map((r) => [csvSafe(r.id), csvSafe(r.key), csvSafe(r.value), csvSafe(r.success ? "true" : "false"), csvSafe(r.error)]);
      filename = "update_results";
    }
    const csvArray = [headers2.map(csvSafe).join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvArray], {
      type: "text/csv;charset=utf-8;"
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const pad = (n) => n.toString().padStart(2, "0");
    const d = /* @__PURE__ */ new Date();
    const timeOnly = `${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
    link.href = url;
    link.download = `${filename}-${timeOnly}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  function csvSafe(value) {
    if (value === null || value === void 0) return "";
    const str = String(value);
    const escaped = str.replace(/"/g, '""');
    if (/[",\n]/.test(escaped)) {
      return `"${escaped}"`;
    }
    return escaped;
  }
  const fetchMetafields = () => {
    if (!objectType) return;
    const formData = new FormData();
    formData.append("objectType", objectType);
    fetcher.submit(formData, {
      method: "post"
    });
    setCsvData(0);
    setManualLoading(true);
    setHasSearched(false);
  };
  const handleMetafieldSelection = (m) => {
    setSelectedMetafield(m);
    setCsvRows([]);
    setRawCsvData([]);
    setRemoveMode("all");
    setProgress(0);
    setResults([]);
    setCompleted(false);
    setCurrentIndex(0);
    setAccumulatedResults([]);
    setFileName(null);
  };
  const handleCsvInput = useCallback(async (_dropFiles, acceptedFiles, _rejectedFiles) => {
    const file = acceptedFiles[0];
    if (!file) {
      setCsvRows([]);
      setRawCsvData([]);
      setCsvData(0);
      return;
    }
    setFileName(file.name);
    const isUpdateOrPartial = removeMode === "update" || removeMode === "specific" && listRemoveMode === "partial";
    if (isUpdateOrPartial) {
      const text = await file.text();
      const parsed = parseCSV(text);
      if (!parsed.length) {
        setAlert({
          active: true,
          title: "Empty CSV",
          message: "CSV is empty",
          tone: "critical"
        });
        setCsvRows([]);
        setRawCsvData([]);
        setCsvData(0);
        return;
      }
      const headers2 = parsed[0].map((h) => h.trim().toLowerCase());
      const dataRows = parsed.slice(1);
      if (!headers2.includes(specificField.toLowerCase()) || !headers2.includes("value")) {
        setAlert({
          active: true,
          title: "Missing Columns",
          message: `CSV must contain '${specificField}' and 'value' columns.`,
          tone: "critical"
        });
        setCsvRows([]);
        setRawCsvData([]);
        setCsvData(0);
        return;
      }
      const idIndex = headers2.indexOf(specificField.toLowerCase());
      const valueIndex = headers2.indexOf("value");
      let hasInvalidGid = false;
      const rows = dataRows.map((cols) => {
        const rawId = cols[idIndex];
        const id = typeof rawId === "string" ? rawId.trim() : rawId;
        const value = cols[valueIndex];
        if (!id || value === void 0) return null;
        const gidObjectType = getShopifyObjectTypeFromGid(id);
        const type = objectType.toLowerCase() === "blogpost" ? "article" : objectType.toLowerCase();
        if (gidObjectType && gidObjectType !== type) {
          setAlert({
            active: true,
            title: "Invalid Shopify ID",
            message: `The CSV contains an ID of type "${gidObjectType}", but "${objectType}" was selected.

ID: ${id}`,
            tone: "critical"
          });
          hasInvalidGid = true;
          return null;
        }
        let normalizedValue = null;
        let error = "";
        try {
          const safeValue = value === null || value === void 0 ? "" : String(value).trim();
          normalizedValue = normalizeMetafieldValue(selectedMetafield == null ? void 0 : selectedMetafield.type, safeValue);
        } catch (e) {
          error = e.message;
        }
        const row = {
          id,
          namespace: selectedMetafield == null ? void 0 : selectedMetafield.namespace,
          key: selectedMetafield == null ? void 0 : selectedMetafield.key,
          value: normalizedValue,
          type: selectedMetafield == null ? void 0 : selectedMetafield.type,
          error,
          raw: cols
        };
        return row;
      }).filter((r) => r !== null);
      if (hasInvalidGid) {
        setCsvRows([]);
        setRawCsvData([]);
        setCsvData(0);
        return;
      }
      if (rows.length > 5e3) {
        setAlert({
          active: true,
          title: "Limit Exceeded",
          message: "Only 5000 records will add at a time",
          tone: "critical"
        });
        setCsvRows([]);
        setRawCsvData([]);
        setCsvData(0);
        return;
      }
      if (rows.length === 0) {
        setAlert({
          active: true,
          title: "Valid Record Not Found",
          message: "No valid records found in the CSV file.",
          tone: "critical"
        });
        setCsvRows([]);
        setRawCsvData([]);
        setCsvData(0);
        return;
      }
      const originalHeaders = parsed[0].map((h) => h.trim());
      const rawDataObjects = dataRows.map((cols) => {
        const obj = {};
        originalHeaders.forEach((header, index) => {
          obj[header] = cols[index];
        });
        return obj;
      });
      setCsvRows(rows);
      setCsvData(rows.length);
      setRawCsvData(rawDataObjects);
      setResults([]);
      setProgress(0);
      setCurrentIndex(0);
      setAccumulatedResults([]);
      setAlert({
        ...alert,
        active: false
      });
    } else {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (res) => {
          const normalizedField = specificField.toLowerCase();
          let hasInvalidGid = false;
          const rows = res.data.map((rawRow) => {
            const normalizedRow = Object.keys(rawRow).reduce((acc, key) => {
              acc[key.toLowerCase()] = rawRow[key];
              return acc;
            }, {});
            const rawId = normalizedRow[normalizedField];
            const id = typeof rawId === "string" ? rawId.trim() : rawId;
            if (!id) return null;
            const gidObjectType = getShopifyObjectTypeFromGid(id);
            const type = objectType.toLowerCase() === "blogpost" ? "article" : objectType.toLowerCase();
            if (gidObjectType && gidObjectType !== type) {
              setAlert({
                active: true,
                title: "Invalid Shopify ID",
                message: `The CSV contains an ID of type "${gidObjectType}", but "${objectType}" was selected.

ID: ${id}`,
                tone: "critical"
              });
              hasInvalidGid = true;
              return null;
            }
            const row = {
              id,
              namespace: selectedMetafield == null ? void 0 : selectedMetafield.namespace,
              key: selectedMetafield == null ? void 0 : selectedMetafield.key
            };
            return row;
          }).filter((r) => r !== null);
          if (hasInvalidGid) {
            setCsvRows([]);
            setRawCsvData([]);
            setCsvData(0);
            return;
          }
          if (rows.length > 5e3) {
            setAlert({
              active: true,
              title: "Limit Exceeded",
              message: "Only 5000 records will add at a time",
              tone: "critical"
            });
            setCsvRows([]);
            setRawCsvData([]);
            setCsvData(0);
            return;
          }
          if (rows.length === 0) {
            setAlert({
              active: true,
              title: "Valid Record Not Found",
              message: "No valid records found. Please follow the CSV Format",
              tone: "critical"
            });
            setCsvRows([]);
            setRawCsvData([]);
            setCsvData(0);
            return;
          }
          setCsvData(rows.length);
          setCsvRows(rows);
          setRawCsvData(res.data);
          setResults([]);
          setProgress(0);
          setCurrentIndex(0);
          setAccumulatedResults([]);
          setAlert({
            ...alert,
            active: false
          });
        },
        error: (err) => {
          setAlert({
            active: true,
            title: "Parsing Error",
            message: "Failed to parse CSV file.",
            tone: "critical"
          });
          setCsvRows([]);
          setRawCsvData([]);
          setCsvData(0);
        }
      });
    }
  }, [removeMode, listRemoveMode, listUpdateMode, specificField, objectType, selectedMetafield]);
  function getShopifyObjectTypeFromGid(gid) {
    if (typeof gid !== "string") return null;
    const match = gid.match(/^gid:\/\/shopify\/([^/]+)\/\d+$/);
    return match ? match[1].toLowerCase() : null;
  }
  function normalizeMetafieldValue(typeInput, rawValue) {
    if (rawValue == null) return null;
    const type = typeof typeInput === "string" ? typeInput : typeInput == null ? void 0 : typeInput.name;
    const value = rawValue;
    if ((type == null ? void 0 : type.startsWith("list.")) && type.includes("_reference")) {
      const list = value.trim().startsWith("[") ? JSON.parse(value) : value.split(",").map((v) => v.trim()).filter(Boolean);
      return JSON.stringify(list);
    }
    switch (type) {
      case "single_line_text_field":
        return value;
      case "multi_line_text_field":
        return value.replace(/\\n/g, "\n");
      case "list.single_line_text_field":
        return JSON.stringify(value.trim().startsWith("[") ? JSON.parse(value) : value.split(",").map((v) => v.trim()).filter(Boolean));
      case "number_integer":
        if (!Number.isInteger(Number(value))) throw new Error("Invalid integer");
        return String(value);
      case "boolean":
        if (value.toLowerCase() === "true" || value === true) return "true";
        if (value.toLowerCase() === "false" || value === false) return "false";
        throw new Error("Invalid boolean");
      case "date_time":
        return value.includes("T") ? value : `${value}T00:00:00Z`;
      case "json":
        return typeof value === "string" ? value : JSON.stringify(value);
      case "link": {
        const v = value.trim();
        if (v.startsWith("{")) return v;
        if (/^https?:\/\//i.test(v)) return JSON.stringify({
          text: "View",
          url: v
        });
        if (v.includes("|")) {
          const [t, gid] = v.split("|");
          if (gid == null ? void 0 : gid.startsWith("gid://")) return JSON.stringify({
            type: t.trim(),
            id: gid.trim()
          });
        }
        throw new Error("Invalid link value");
      }
      case "url":
        if (!/^https?:\/\//i.test(value.trim())) throw new Error("Invalid URL");
        return value.trim();
      default:
        return value;
    }
  }
  function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
    return lines.map((line) => {
      const cols = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const next = line[i + 1];
        if (char === '"' && next === '"') {
          current += '"';
          i++;
          continue;
        }
        if (char === '"') {
          inQuotes = !inQuotes;
          continue;
        }
        if (char === "," && !inQuotes) {
          cols.push(current);
          current = "";
          continue;
        }
        current += char;
      }
      cols.push(current);
      return cols;
    });
  }
  const confirmDelete = () => {
    if (!selectedMetafield) {
      setAlert({
        active: true,
        title: "Selection Required",
        message: "Select a metafield!",
        tone: "critical"
      });
      return;
    }
    if (["specific", "update"].includes(removeMode) && !csvRows.length) {
      setAlert({
        active: true,
        title: "Missing CSV",
        message: `Upload a CSV file with ${specificField}'s (and values for update)!`,
        tone: "critical"
      });
      return;
    }
    if (removeMode !== "all" && csvRows.length > 0) {
      setPreviewModalOpen(true);
    } else {
      setModalOpen(true);
    }
  };
  const handleConfirm = () => {
    setModalOpen(false);
    setProgress(0);
    setAccumulatedResults([]);
    setResults([]);
    setCurrentIndex(0);
    setResourceCount(0);
    if (removeMode === "all") {
      setIsDeleting(true);
      const formData = new FormData();
      formData.append("mode", "removeMetafield");
      formData.append("objectType", objectType);
      formData.append("namespace", (selectedMetafield == null ? void 0 : selectedMetafield.namespace) || "");
      formData.append("key", (selectedMetafield == null ? void 0 : selectedMetafield.key) || "");
      fetcher.submit(formData, {
        method: "post"
      });
    } else if (removeMode === "specific") {
      setIsDeleting(true);
    } else if (removeMode === "update") {
      setIsDeleting(true);
    }
  };
  const resetToHome = () => {
    setSelectedMetafield(null);
    setCsvRows([]);
    setRawCsvData([]);
    setRemoveMode("all");
    setListUpdateMode("merge");
    setListRemoveMode("full");
    setProgress(0);
    setResults([]);
    setCompleted(false);
    setMetafields([]);
    setCurrentIndex(0);
    setAccumulatedResults([]);
    setResourceCount(0);
    setHasSearched(false);
    setFileName(null);
    setAlert({
      ...alert,
      active: false
    });
  };
  const backToSelectedFeild = () => {
    setSelectedMetafield(null);
    setCsvRows([]);
    setRawCsvData([]);
    setRemoveMode("all");
    setListUpdateMode("merge");
    setListRemoveMode("full");
    setProgress(0);
    setResults([]);
    setCompleted(false);
    setCurrentIndex(0);
    setAccumulatedResults([]);
    setResourceCount(0);
    setHasSearched(false);
    setFileName(null);
    setAlert({
      ...alert,
      active: false
    });
  };
  const handleClearCSV = () => {
    setCsvRows([]);
    setRawCsvData([]);
    setCsvData(0);
    setFileName(null);
  };
  useEffect(() => {
    fetcher.load("/api/check/db");
  }, []);
  const createDatabase = () => {
    setIsSubmitting(true);
    fetcher.submit({}, {
      method: "post",
      action: "/api/metaCreate/db"
    });
  };
  useEffect(() => {
    var _a3, _b2, _c2, _d, _e, _f, _g, _h, _i, _j;
    if (fetcher.state !== "idle" || !fetcher.data) return;
    if (lastProcessedRef.current === fetcher.data) return;
    lastProcessedRef.current = fetcher.data;
    if (((_a3 = fetcher.data) == null ? void 0 : _a3.successdb) === void 0) {
      const data = fetcher == null ? void 0 : fetcher.data;
      if ((data == null ? void 0 : data.success) && ((_b2 = data == null ? void 0 : data.payload) == null ? void 0 : _b2.metafields)) {
        setMetafields(data.payload.metafields);
      }
      setHasSearched(true);
      setManualLoading(false);
      const isSuccess = data.success ?? false;
      const response = data == null ? void 0 : data.payload;
      const errorMsg = ((_e = (_d = (_c2 = data == null ? void 0 : data.payload) == null ? void 0 : _c2.errors) == null ? void 0 : _d[0]) == null ? void 0 : _e.message) || ((_f = data == null ? void 0 : data.payload) == null ? void 0 : _f.errors) || (data == null ? void 0 : data.error) || "";
      if (removeMode === "specific" && isDeleting && listRemoveMode !== "partial") {
        const row = response;
        const updaterow = {
          ...row,
          id: ((_g = csvRows[currentIndex]) == null ? void 0 : _g.id) ?? ""
        };
        const newResult = {
          ...updaterow,
          success: isSuccess,
          error: errorMsg
        };
        const updated = [...accumulatedResults, newResult];
        setAccumulatedResults(updated);
        setResults(updated);
        setProgress(Math.round((currentIndex + 1) / csvRows.length * 100));
        if (currentIndex + 1 >= csvRows.length) {
          setIsDeleting(false);
          setCompleted(true);
          setSelectedMetafield(null);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }
      if (removeMode === "specific" && isDeleting && listRemoveMode === "partial") {
        const row = response;
        const updaterow = {
          ...row,
          id: ((_h = csvRows[currentIndex]) == null ? void 0 : _h.id) ?? "",
          value: Array.isArray(row.data) ? row.data.join(", ") : row.data,
          key: row.key,
          type: row.type,
          namespace: row.namespace
        };
        const newResult = {
          ...updaterow,
          success: isSuccess,
          errors: errorMsg || null
        };
        const updated = [...accumulatedResults, newResult];
        setAccumulatedResults(updated);
        setResults(updated);
        setProgress(Math.round((currentIndex + 1) / csvRows.length * 100));
        if (currentIndex + 1 >= csvRows.length) {
          setIsDeleting(false);
          setCompleted(true);
          setSelectedMetafield(null);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }
      if (removeMode === "update" && isDeleting) {
        const row = csvRows[currentIndex];
        const newResult = {
          ...row,
          value: row.value || void 0,
          // ensure no null
          success: isSuccess,
          error: errorMsg,
          updatedValue: row.value || void 0,
          type: typeof row.type === "string" ? row.type : (_i = row.type) == null ? void 0 : _i.name
        };
        if (currentIndex + 1 <= csvRows.length) {
          const updated = [...accumulatedResults, newResult];
          setAccumulatedResults(updated);
          setResults(updated);
        }
        setProgress(Math.round((currentIndex + 1) / csvRows.length * 100));
        if (currentIndex + 1 >= csvRows.length) {
          setIsDeleting(false);
          setCompleted(true);
          setSelectedMetafield(null);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }
      if (removeMode === "all" && isDeleting) {
        const payload = data.payload;
        const batch = (payload == null ? void 0 : payload.results) ?? [];
        const nextCursor = (payload == null ? void 0 : payload.nextCursor) ?? null;
        const hasMore = (payload == null ? void 0 : payload.hasMore) ?? false;
        const totalCount = (payload == null ? void 0 : payload.ResourceCount) ?? null;
        if (resourceCount === 0) setResourceCount(totalCount);
        const updatedResults = [...accumulatedResults, ...batch];
        setAccumulatedResults(updatedResults);
        setResults(updatedResults);
        if (totalCount && totalCount > 0) {
          const percent = Math.round(updatedResults.length / totalCount * 100);
          setProgress(percent);
        } else {
          setProgress(10);
        }
        if (hasMore && nextCursor && updatedResults.length < 5e3) {
          const formData = new FormData();
          formData.append("mode", "removeMetafield");
          formData.append("objectType", objectType);
          formData.append("namespace", (selectedMetafield == null ? void 0 : selectedMetafield.namespace) || "");
          formData.append("key", (selectedMetafield == null ? void 0 : selectedMetafield.key) || "");
          formData.append("cursor", nextCursor);
          fetcher.submit(formData, {
            method: "post"
          });
        } else {
          setProgress(100);
          setCompleted(true);
          setIsDeleting(false);
          setSelectedMetafield(null);
        }
      }
    } else {
      const success2 = Boolean((_j = fetcher.data) == null ? void 0 : _j.successdb);
      if ((fetcher.data === void 0 || success2) && !isDbCreated) {
        setIsDbCreated(fetcher.data === void 0 ? true : success2);
      }
      if (!success2 && fetcher.data !== void 0 && isDbCreated) {
        setIsDbCreated(false);
      }
      setDbChecked(true);
      if (isSubmitting && success2) {
        setModalOpendb(false);
        setIsSubmitting(false);
        setShowSuccess(true);
      }
    }
  }, [fetcher.state, fetcher.data]);
  useEffect(() => {
    var _a3;
    if (!isDeleting) return;
    if (removeMode === "all") return;
    if (currentIndex >= csvRows.length) {
      setIsDeleting(false);
      setCompleted(true);
      setSelectedMetafield(null);
      return;
    }
    const row = csvRows[currentIndex];
    const formData = new FormData();
    const typeName = typeof (selectedMetafield == null ? void 0 : selectedMetafield.type) === "string" ? selectedMetafield.type : (_a3 = selectedMetafield == null ? void 0 : selectedMetafield.type) == null ? void 0 : _a3.name;
    if (removeMode === "specific") {
      formData.append("mode", "removeMetafieldSpecific");
      if (listRemoveMode === "partial" && (typeName == null ? void 0 : typeName.startsWith("list."))) {
        formData.append("flag1", "true");
        formData.append("value", row.value || "");
      } else {
        formData.append("flag1", "false");
      }
    }
    if (removeMode === "update") {
      formData.append("mode", "updateMetafieldSpecific");
      formData.append("value", row.value || "");
      if (listUpdateMode === "replace" && (typeName == null ? void 0 : typeName.startsWith("list."))) {
        formData.append("flag2", "true");
      } else {
        formData.append("flag2", "false");
      }
    }
    formData.append("flag", String(specificField === "Id"));
    formData.append("namespace", row.namespace || "");
    formData.append("key", row.key || "");
    formData.append("id", row.id || "");
    const safeTypeName = (row == null ? void 0 : row.type) && typeof row.type === "object" && "name" in row.type ? row.type.name : (row == null ? void 0 : row.type) || typeName || "single_line_text_field";
    formData.append("type", safeTypeName);
    formData.append("objectType", objectType);
    fetcher.submit(formData, {
      method: "post"
    });
  }, [currentIndex, isDeleting, removeMode]);
  useEffect(() => {
    var _a3;
    const typeName = typeof (selectedMetafield == null ? void 0 : selectedMetafield.type) === "string" ? selectedMetafield.type : (_a3 = selectedMetafield == null ? void 0 : selectedMetafield.type) == null ? void 0 : _a3.name;
    setshowInfo("");
    setshowInfoMeta(false);
    if (!typeName) return;
    const isList = typeName.startsWith("list.");
    const normalizedType = isList ? typeName.replace("list.", "") : typeName;
    if (!normalizedType.endsWith("_reference")) return;
    const referenceMessageMap = {
      product: "product handle",
      collection: "collection handle",
      customer: "customer email",
      order: "order name",
      blogpost: "blog post handle",
      variant: "variant SKU",
      company: "company external ID",
      location: "location name",
      metaobject: "metaobject handle"
    };
    const key = normalizedType == null ? void 0 : normalizedType.toLowerCase().replace(/_reference$/, "");
    const referenceLabel = referenceMessageMap[key];
    if (!referenceLabel) return;
    setshowInfo(isList ? `CSV values can be multiple ${referenceLabel}s or Shopify GIDs (comma-separated).` : `CSV value can be a ${referenceLabel} or a Shopify GID.`);
    setshowInfoMeta(true);
  }, [selectedMetafield, objectType]);
  const handleDownloadTemplate = () => {
    var _a3;
    const currentField = specificField;
    const currentType = csvType;
    const currentObjectType = objectType;
    const header = currentField === "Id" ? "Id" : currentType;
    const gidMap = {
      product: "Product",
      customer: "Customer",
      order: "Order",
      articles: "Article",
      blog: "Blog",
      page: "Page",
      productVariant: "ProductVariant",
      company: "Company",
      companyLocation: "CompanyLocation",
      location: "Location",
      market: "Market",
      collection: "Collection"
    };
    const gidType = gidMap[currentObjectType] || "Unknown";
    let sampleIds = [];
    if (header === "Id") {
      sampleIds = [`gid://shopify/${gidType}/123456789`, `gid://shopify/${gidType}/987654321`];
    } else if (header === "Sku") {
      sampleIds = ["SKU-1001", "SKU-1002"];
    } else if (header === "Email") {
      sampleIds = ["user1@example.com", "user2@example.com"];
    } else if (header === "Name") {
      sampleIds = ["#1001", "#1002"];
    } else if (header === "Handle") {
      sampleIds = ["sample-handle-1", "sample-handle-2"];
    } else if (header === "External_ID") {
      sampleIds = ["EXT-1001", "EXT-1002"];
    }
    let csvContent = "";
    if (removeMode === "specific" && listRemoveMode !== "partial") {
      csvContent = [header, ...sampleIds].join("\n");
    } else if (removeMode === "update" || removeMode === "specific") {
      const typeName = typeof (selectedMetafield == null ? void 0 : selectedMetafield.type) === "string" ? selectedMetafield.type : (_a3 = selectedMetafield == null ? void 0 : selectedMetafield.type) == null ? void 0 : _a3.name;
      if (!typeName) return;
      const valueSamples = getMetafieldSampleValues(typeName);
      const rows = [`${header},value`, ...sampleIds.map((id, i) => `${id},${valueSamples[i] || valueSamples[0]}`)];
      csvContent = rows.join("\n");
    }
    if (csvContent) {
      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;"
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sample-${header}-template-${Date.now()}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };
  function getMetafieldSampleValues(typeName) {
    const isList = typeName.startsWith("list.");
    const baseType = isList ? typeName.replace("list.", "") : typeName;
    const csvSafe2 = (value) => `"${String(value).replace(/"/g, '""').replace(/\r?\n/g, "\\n")}"`;
    const richText = (text, boldWord) => csvSafe2(JSON.stringify({
      type: "root",
      children: [{
        type: "paragraph",
        children: boldWord ? [{
          type: "text",
          value: `${text} `
        }, {
          type: "text",
          value: boldWord,
          bold: true
        }] : [{
          type: "text",
          value: text
        }]
      }]
    }));
    const samples = {
      /* ---------------- TEXT ---------------- */
      single_line_text_field: ["Sample text", "Another text"],
      multi_line_text_field: [csvSafe2("Line one\nLine two"), csvSafe2("Second multi-line value")],
      rich_text_field: [richText("This is", "rich text"), richText("Another paragraph")],
      /* ---------------- EMAIL ---------------- */
      email: ["user@example.com", "admin@example.com"],
      /* ---------------- NUMBER ---------------- */
      number_integer: ["10", "25"],
      number_decimal: ["10.5", "25.75"],
      rating: ["4.5", "3.0"],
      /* ---------------- MONEY / DIMENSIONS ---------------- */
      money: [csvSafe2('{"amount":"10.00","currency_code":"USD"}'), csvSafe2('{"amount":"99.99","currency_code":"USD"}')],
      weight: [csvSafe2('{"value":1.5,"unit":"kg"}'), csvSafe2('{"value":3,"unit":"kg"}')],
      volume: [csvSafe2('{"value":2.5,"unit":"l"}'), csvSafe2('{"value":5,"unit":"l"}')],
      dimension: [csvSafe2('{"value":10,"unit":"cm"}'), csvSafe2('{"value":25,"unit":"cm"}')],
      /* ---------------- BOOLEAN ---------------- */
      boolean: ["true", "false"],
      /* ---------------- DATE ---------------- */
      date: ["2025-01-01", "2025-12-31"],
      date_time: ["2025-01-01T10:00:00Z", "2025-12-31T18:30:00Z"],
      /* ---------------- COLOR ---------------- */
      color: ["#FF0000", "#00FF00"],
      /* ---------------- LINK / URL ---------------- */
      url: ["https://example.com", "https://shopify.com"],
      link: [csvSafe2('{"type":"URL","value":"https://example.com"}'), csvSafe2('{"type":"URL","value":"https://shopify.com"}')],
      /* ---------------- JSON ---------------- */
      json: [csvSafe2('{"key":"value"}'), csvSafe2('{"enabled":true,"count":5}')],
      /* ---------------- FILE / MEDIA ---------------- */
      file_reference: ["gid://shopify/MediaImage/123456789", "gid://shopify/MediaImage/987654321"],
      /* ---------------- REFERENCES ---------------- */
      product_reference: ["gid://shopify/Product/123456789", "gid://shopify/Product/987654321"],
      variant_reference: ["gid://shopify/ProductVariant/123456789", "gid://shopify/ProductVariant/987654321"],
      collection_reference: ["gid://shopify/Collection/123456789", "gid://shopify/Collection/987654321"],
      customer_reference: ["gid://shopify/Customer/123456789", "gid://shopify/Customer/987654321"],
      order_reference: ["gid://shopify/Order/123456789", "gid://shopify/Order/987654321"],
      page_reference: ["gid://shopify/Page/123456789", "gid://shopify/Page/987654321"],
      blog_reference: ["gid://shopify/Blog/123456789", "gid://shopify/Blog/987654321"],
      company_reference: ["gid://shopify/Company/123456789", "gid://shopify/Company/987654321"],
      metaobject_reference: ["gid://shopify/Metaobject/123456789", "gid://shopify/Metaobject/987654321"]
    };
    const baseSamples = samples[baseType] || ["sample-1", "sample-2"];
    if (isList) {
      return [csvSafe2(baseSamples.map((v) => v.replace(/^"|"$/g, "")).join(",")), csvSafe2(baseSamples.map((v) => v.replace(/^"|"$/g, "")).reverse().join(","))];
    }
    return baseSamples;
  }
  function toJsonArrayString(value) {
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return JSON.stringify(parsed);
      } catch {
      }
    }
    if (Array.isArray(value)) return JSON.stringify(value);
    return JSON.stringify(String(value).split(",").map((v) => v.trim()).filter(Boolean));
  }
  useEffect(() => {
    if (objectType === "product") setcsvType("Handle");
    if (objectType === "collection") setcsvType("Handle");
    if (objectType === "customer") setcsvType("Email");
    if (objectType === "order") setcsvType("Name");
    if (objectType === "blogPost") setcsvType("Handle");
    if (objectType === "productVariant") setcsvType("Sku");
    if (objectType === "market") setcsvType("Name");
    if (objectType === "company") setcsvType("External_ID");
    if (objectType === "companyLocation") setcsvType("External_ID");
    if (objectType === "location") setcsvType("Name");
    if (objectType === "page") setcsvType("Handle");
    if (objectType === "blog") setcsvType("Handle");
    if (["specific", "all", "update"].includes(removeMode)) {
      setSpecificField("Id");
    }
    setListUpdateMode("merge");
    setListRemoveMode("full");
    setHasSearched(false);
  }, [objectType, removeMode]);
  useEffect(() => {
    setCsvData(0);
    setCsvRows([]);
    setRawCsvData([]);
    setListUpdateMode("merge");
    setListRemoveMode("full");
    setProgress(0);
    setResults([]);
    setCompleted(false);
    setCurrentIndex(0);
    setAccumulatedResults([]);
    setFileName(null);
    setSpecificField("Id");
    setResourceCount(0);
    setAlert((prev) => ({
      ...prev,
      active: false
    }));
  }, [removeMode]);
  useEffect(() => {
    if (progress === 100 && !isDeleting) {
      const TrueResult = results.filter((r) => r == null ? void 0 : r.success);
      if (!TrueResult.length) return;
      let operation = "";
      let formattedResults = TrueResult;
      if (removeMode === "specific" && listRemoveMode === "partial") {
        operation = "Metafield-removed";
        formattedResults = TrueResult.map((r) => ({
          ...r,
          data: {
            namespace: r.namespace,
            key: r.key,
            type: r.type,
            value: toJsonArrayString(r.data)
          }
        }));
      }
      if (removeMode === "update") {
        operation = "Metafield-updated";
        formattedResults = TrueResult.map((r) => ({
          ...r,
          data: {
            namespace: r.namespace,
            key: r.key,
            type: r.type,
            value: r.value
          }
        }));
      }
      if (removeMode === "all" || removeMode === "specific" && listRemoveMode !== "partial") {
        operation = "Metafield-removed";
        formattedResults = TrueResult.map((r) => {
          if (r.data && typeof r.data === "object" && !Array.isArray(r.data)) {
            return {
              ...r,
              namespace: r.data.namespace || r.namespace,
              key: r.data.key || r.key,
              value: r.data.value,
              type: r.data.type || r.type
            };
          }
          return r;
        });
      }
      if (formattedResults.length > 0 && operation) {
        const Data = {
          operation,
          // only operation
          objectType,
          // only objectType
          value: formattedResults
          // only value
        };
        fetch("/api/add/db", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(Data)
        }).catch((err) => console.error("Logging error", err));
      }
    }
  }, [results, isDeleting, progress]);
  useEffect(() => {
    setCsvData(0);
    setCsvRows([]);
    setRawCsvData([]);
    setProgress(0);
    setResults([]);
    setCompleted(false);
    setCurrentIndex(0);
    setAccumulatedResults([]);
    setFileName(null);
    setResourceCount(0);
    setSpecificField("Id");
    setAlert((prev) => ({
      ...prev,
      active: false
    }));
  }, [listRemoveMode, listUpdateMode]);
  useEffect(() => {
    setCsvData(0);
    setCsvRows([]);
    setRawCsvData([]);
    setProgress(0);
    setResults([]);
    setCompleted(false);
    setCurrentIndex(0);
    setAccumulatedResults([]);
    setFileName(null);
    setResourceCount(0);
    setAlert((prev) => ({
      ...prev,
      active: false
    }));
  }, [specificField]);
  function goToHome() {
    if (!isDeleting) navigate("/app");
  }
  return /* @__PURE__ */ jsxs(Page, {
    title: "Metafield Manage",
    subtitle: "Manage and sync custom field data across your store.",
    backAction: {
      content: "Home",
      onAction: goToHome
    },
    secondaryActions: [{
      content: "Instructions",
      onAction: () => setInstructionsOpen(true)
    }],
    children: [/* @__PURE__ */ jsxs(BlockStack, {
      gap: "300",
      children: [dbChecked && !isDbCreated && /* @__PURE__ */ jsx(Box, {
        children: /* @__PURE__ */ jsx(Banner, {
          tone: "warning",
          icon: DatabaseIcon,
          children: /* @__PURE__ */ jsxs(InlineStack, {
            gap: "300",
            align: "space-between",
            children: ["To view activity history and use the one-time restore feature, you’ll need to create the database first.", /* @__PURE__ */ jsx(Button, {
              variant: "secondary",
              onClick: () => setModalOpendb(true),
              disabled: isDeleting,
              children: "Create Database"
            })]
          })
        })
      }), /* @__PURE__ */ jsxs(Layout, {
        children: [/* @__PURE__ */ jsx(Layout.Section, {
          variant: "oneThird",
          children: /* @__PURE__ */ jsx(BlockStack, {
            gap: "400",
            children: /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                gap: "400",
                children: [/* @__PURE__ */ jsx(Select, {
                  label: "Resource Type",
                  options: Object.entries(queryMap).map(([key]) => ({
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                    value: key
                  })),
                  value: objectType,
                  onChange: setObjectType,
                  disabled: loading || isDeleting || metafields.length > 0
                }), metafields.length === 0 ? /* @__PURE__ */ jsx(Button, {
                  variant: "primary",
                  onClick: fetchMetafields,
                  loading,
                  disabled: isDeleting,
                  fullWidth: true,
                  icon: SearchIcon,
                  children: "Fetch Metafields"
                }) : !completed && progress === 0 && !isDeleting && /* @__PURE__ */ jsx(Button, {
                  onClick: resetToHome,
                  fullWidth: true,
                  icon: RefreshIcon,
                  children: "Reset"
                })]
              })
            })
          })
        }), /* @__PURE__ */ jsx(Layout.Section, {
          children: /* @__PURE__ */ jsxs(BlockStack, {
            gap: "500",
            children: [alert.active && /* @__PURE__ */ jsx(Banner, {
              title: alert.title,
              tone: alert.tone || "info",
              onDismiss: () => setAlert({
                ...alert,
                active: false
              }),
              children: /* @__PURE__ */ jsx("p", {
                children: alert.message
              })
            }), loading && !isDeleting && !completed && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                align: "center",
                inlineAlign: "center",
                gap: "400",
                children: [/* @__PURE__ */ jsx(Spinner, {
                  size: "large"
                }), /* @__PURE__ */ jsx(Text, {
                  as: "h3",
                  variant: "headingMd",
                  children: "Scanning Store Metafields"
                }), /* @__PURE__ */ jsxs(Text, {
                  as: "p",
                  tone: "subdued",
                  children: ["Searching through your ", objectType, "s..."]
                })]
              })
            }), completed && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                align: "center",
                inlineAlign: "center",
                gap: "500",
                children: [/* @__PURE__ */ jsx(Badge, {
                  tone: "success",
                  size: "large",
                  icon: CheckCircleIcon,
                  children: "Operation Complete"
                }), /* @__PURE__ */ jsx(Text, {
                  as: "p",
                  variant: "bodyLg",
                  children: "The metafield operation finished successfully."
                }), /* @__PURE__ */ jsxs(BlockStack, {
                  gap: "200",
                  align: "center",
                  inlineAlign: "center",
                  children: [/* @__PURE__ */ jsx("div", {
                    style: {
                      width: "100%",
                      minWidth: "300px"
                    },
                    children: /* @__PURE__ */ jsx(ProgressBar, {
                      progress: 100,
                      tone: "success"
                    })
                  }), /* @__PURE__ */ jsx(Text, {
                    as: "span",
                    variant: "bodyMd",
                    fontWeight: "bold",
                    children: "100%"
                  })]
                }), /* @__PURE__ */ jsxs(InlineStack, {
                  gap: "300",
                  children: [(results == null ? void 0 : results.length) > 0 && /* @__PURE__ */ jsx(Button, {
                    onClick: () => downloadResultsCSV(results, removeMode),
                    variant: "primary",
                    icon: FileIcon,
                    children: "Download Results CSV"
                  }), /* @__PURE__ */ jsx(Button, {
                    onClick: resetToHome,
                    children: "Clear"
                  })]
                })]
              })
            }), !loading && !completed && metafields.length === 0 && !hasSearched && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsx(EmptyState, {
                heading: "Ready to Search",
                image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
                children: /* @__PURE__ */ jsx("p", {
                  children: 'Select a resource type on the left and click "Fetch Metafields".'
                })
              })
            }), !loading && !completed && metafields.length === 0 && hasSearched && /* @__PURE__ */ jsx(Banner, {
              title: "No Metafields Found",
              tone: "info",
              children: /* @__PURE__ */ jsx("p", {
                children: "Try selecting a different resource type."
              })
            }), (!loading || isDeleting) && !completed && metafields.length > 0 && !selectedMetafield && /* @__PURE__ */ jsx(LegacyCard, {
              children: /* @__PURE__ */ jsx("div", {
                style: {
                  maxHeight: "500px",
                  overflowY: "auto"
                },
                children: /* @__PURE__ */ jsx(ResourceList, {
                  resourceName: {
                    singular: "metafield",
                    plural: "metafields"
                  },
                  items: metafields,
                  renderItem: (item) => {
                    const {
                      namespace,
                      key,
                      type
                    } = item;
                    const media = /* @__PURE__ */ jsx(Icon, {
                      source: NoteIcon,
                      tone: "base"
                    });
                    return /* @__PURE__ */ jsx(ResourceItem, {
                      id: `${namespace}-${key}`,
                      url: "#",
                      media,
                      accessibilityLabel: `Select ${namespace}.${key}`,
                      onClick: () => handleMetafieldSelection(item),
                      children: /* @__PURE__ */ jsxs(BlockStack, {
                        gap: "100",
                        children: [/* @__PURE__ */ jsxs(InlineStack, {
                          gap: "200",
                          align: "start",
                          children: [/* @__PURE__ */ jsx(Text, {
                            as: "h3",
                            variant: "headingSm",
                            fontWeight: "bold",
                            children: key
                          }), /* @__PURE__ */ jsx(Badge, {
                            tone: "info",
                            children: namespace
                          })]
                        }), /* @__PURE__ */ jsxs(Text, {
                          as: "span",
                          tone: "subdued",
                          variant: "bodySm",
                          children: ["Type: ", typeof type === "string" ? type : (type == null ? void 0 : type.name) || "Standard"]
                        })]
                      })
                    });
                  }
                })
              })
            }), isDeleting && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                align: "center",
                inlineAlign: "center",
                gap: "500",
                children: [/* @__PURE__ */ jsx(Spinner, {
                  size: "large"
                }), /* @__PURE__ */ jsx(Text, {
                  as: "h3",
                  variant: "headingMd",
                  children: removeMode === "update" ? "Updating Metafields" : removeMode === "specific" ? "Removing Specific Metafields" : "Deleting Metafields Globally"
                }), /* @__PURE__ */ jsx(Text, {
                  as: "p",
                  tone: "subdued",
                  children: removeMode === "update" ? "Updating/Adding based on CSV..." : removeMode === "specific" ? "Removing for CSV items..." : "Removing from ALL resources..."
                }), /* @__PURE__ */ jsxs(BlockStack, {
                  gap: "200",
                  align: "center",
                  inlineAlign: "center",
                  children: [/* @__PURE__ */ jsx("div", {
                    style: {
                      width: "100%",
                      minWidth: "300px"
                    },
                    children: /* @__PURE__ */ jsx(ProgressBar, {
                      progress,
                      tone: "highlight"
                    })
                  }), /* @__PURE__ */ jsxs(Text, {
                    as: "span",
                    variant: "bodyMd",
                    fontWeight: "bold",
                    children: [progress, "%"]
                  })]
                })]
              })
            }), !loading && !isDeleting && !completed && selectedMetafield && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                gap: "500",
                children: [/* @__PURE__ */ jsxs(InlineStack, {
                  align: "space-between",
                  children: [/* @__PURE__ */ jsxs(Text, {
                    as: "p",
                    variant: "headingSm",
                    tone: "subdued",
                    children: ["Target: ", selectedMetafield == null ? void 0 : selectedMetafield.namespace, ".", selectedMetafield == null ? void 0 : selectedMetafield.key]
                  }), /* @__PURE__ */ jsx(Button, {
                    variant: "plain",
                    onClick: backToSelectedFeild,
                    children: "Change Selection"
                  })]
                }), /* @__PURE__ */ jsx(ChoiceList, {
                  title: "Operation Mode",
                  choices: ((_a2 = selectedMetafield == null ? void 0 : selectedMetafield.type) == null ? void 0 : _a2.name) === "file_reference" ? [{
                    label: "Global Deletion (Remove from starting 5000 items)",
                    value: "all"
                  }] : [{
                    label: "Global Deletion (Remove from starting 5000 items)",
                    value: "all"
                  }, {
                    label: "Targeted Removal (Remove from CSV list)",
                    value: "specific"
                  }, {
                    label: "Bulk Update (Update/Add via CSV)",
                    value: "update"
                  }],
                  selected: [removeMode],
                  onChange: (val) => setRemoveMode(val[0]),
                  disabled: isDeleting
                }), removeMode !== "all" && /* @__PURE__ */ jsx(Box, {
                  padding: "400",
                  background: "bg-surface-secondary",
                  borderRadius: "200",
                  children: /* @__PURE__ */ jsxs(BlockStack, {
                    gap: "400",
                    children: [showInfoMeta && /* @__PURE__ */ jsx(Banner, {
                      tone: "info",
                      children: /* @__PURE__ */ jsx("p", {
                        children: showInfo
                      })
                    }), ((_c = typeof (selectedMetafield == null ? void 0 : selectedMetafield.type) === "string" ? selectedMetafield.type : (_b = selectedMetafield == null ? void 0 : selectedMetafield.type) == null ? void 0 : _b.name) == null ? void 0 : _c.startsWith("list.")) && /* @__PURE__ */ jsxs(BlockStack, {
                      gap: "200",
                      children: [/* @__PURE__ */ jsx(Text, {
                        as: "h3",
                        variant: "headingSm",
                        children: "List Strategy"
                      }), removeMode === "specific" ? /* @__PURE__ */ jsx(ChoiceList, {
                        title: "",
                        choices: [{
                          label: "Delete Metafield Completely",
                          value: "full"
                        }, {
                          label: "Remove Specific Values",
                          value: "partial"
                        }],
                        selected: [listRemoveMode],
                        onChange: (val) => setListRemoveMode(val[0])
                      }) : /* @__PURE__ */ jsx(ChoiceList, {
                        title: "",
                        choices: [{
                          label: "Merge/Append Values",
                          value: "merge"
                        }, {
                          label: "Replace Entire List",
                          value: "replace"
                        }],
                        selected: [listUpdateMode],
                        onChange: (val) => setListUpdateMode(val[0])
                      })]
                    }), csvData === 0 ? /* @__PURE__ */ jsxs(BlockStack, {
                      gap: "300",
                      children: [/* @__PURE__ */ jsxs(BlockStack, {
                        gap: "200",
                        children: [/* @__PURE__ */ jsx(ChoiceList, {
                          title: "Match by",
                          choices: [{
                            label: "Shopify GID",
                            value: "Id"
                          }, {
                            label: csvType,
                            value: csvType
                          }],
                          selected: [specificField],
                          onChange: (val) => setSpecificField(val[0])
                        }), /* @__PURE__ */ jsx(Button, {
                          variant: "plain",
                          onClick: handleDownloadTemplate,
                          icon: ImportIcon,
                          children: "Download Sample CSV"
                        })]
                      }), /* @__PURE__ */ jsx(DropZone, {
                        onDrop: handleCsvInput,
                        accept: ".csv",
                        allowMultiple: false,
                        disabled: isDeleting,
                        children: /* @__PURE__ */ jsx(DropZone.FileUpload, {
                          actionTitle: "Add CSV File"
                        })
                      }), /* @__PURE__ */ jsx(Text, {
                        as: "p",
                        tone: "subdued",
                        children: "Only 5000 records will add at a time"
                      })]
                    }) : /* @__PURE__ */ jsx(Banner, {
                      tone: "success",
                      onDismiss: handleClearCSV,
                      children: /* @__PURE__ */ jsx(InlineStack, {
                        align: "space-between",
                        children: /* @__PURE__ */ jsxs(Text, {
                          as: "span",
                          children: [fileName, " — ", csvData, " records loaded."]
                        })
                      })
                    })]
                  })
                }), /* @__PURE__ */ jsx(Button, {
                  variant: "primary",
                  tone: removeMode === "update" ? void 0 : "critical",
                  disabled: isDeleting || loading || removeMode !== "all" && !csvRows.length,
                  onClick: confirmDelete,
                  fullWidth: true,
                  icon: removeMode === "update" ? RefreshIcon : DeleteIcon,
                  children: removeMode === "update" ? "Run Update" : "Delete Metafield"
                })]
              })
            }), (results == null ? void 0 : results.length) > 0 && removeMode !== "all" && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                gap: "400",
                children: [/* @__PURE__ */ jsxs(InlineStack, {
                  align: "space-between",
                  children: [/* @__PURE__ */ jsx(Text, {
                    as: "h3",
                    variant: "headingSm",
                    children: "Activity Log"
                  }), /* @__PURE__ */ jsxs(Badge, {
                    children: [results == null ? void 0 : results.length, " processed"]
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  style: {
                    maxHeight: "250px",
                    overflowY: "auto"
                  },
                  children: /* @__PURE__ */ jsx(IndexTable, {
                    resourceName: {
                      singular: "result",
                      plural: "results"
                    },
                    itemCount: results == null ? void 0 : results.length,
                    headings: [{
                      title: "#"
                    }, {
                      title: "ID"
                    }, {
                      title: "Status"
                    }, {
                      title: "Error"
                    }],
                    selectable: false,
                    children: [...results].reverse().map((r, i) => /* @__PURE__ */ jsxs(IndexTable.Row, {
                      id: i.toString(),
                      position: i,
                      children: [/* @__PURE__ */ jsx(IndexTable.Cell, {
                        children: (results == null ? void 0 : results.length) - i
                      }), /* @__PURE__ */ jsx(IndexTable.Cell, {
                        children: r == null ? void 0 : r.id
                      }), /* @__PURE__ */ jsx(IndexTable.Cell, {
                        children: /* @__PURE__ */ jsx(Badge, {
                          tone: (r == null ? void 0 : r.success) ? "success" : "critical",
                          children: (r == null ? void 0 : r.success) ? "Success" : "Failed"
                        })
                      }), /* @__PURE__ */ jsx(IndexTable.Cell, {
                        children: (r == null ? void 0 : r.error) || (r == null ? void 0 : r.errors) || "-"
                      })]
                    }, i))
                  })
                })]
              })
            })]
          })
        })]
      })]
    }), /* @__PURE__ */ jsx(Modal, {
      open: modalOpendb,
      onClose: () => setModalOpendb(false),
      title: "Create Database",
      primaryAction: {
        content: "Yes, Create",
        onAction: createDatabase,
        loading: isSubmitting
      },
      secondaryActions: [{
        content: "Maybe Later",
        onAction: () => setModalOpendb(false)
      }],
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsxs(Text, {
          as: "p",
          children: ["Creating a metaobject named", " ", /* @__PURE__ */ jsx(Text, {
            as: "span",
            fontWeight: "bold",
            children: "“Tag Metafield App Database”"
          }), " ", "to store your app activity history. Would you like to continue?"]
        })
      })
    }), /* @__PURE__ */ jsx(Modal, {
      open: showSuccess,
      onClose: () => setShowSuccess(false),
      title: "Database Created Successfully",
      primaryAction: {
        content: "Close",
        onAction: () => setShowSuccess(false)
      },
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsx(Text, {
          as: "p",
          children: "Your database has been created successfully. You can now track and view all history."
        })
      })
    }), /* @__PURE__ */ jsx(CsvPreviewModal, {
      open: previewModalOpen,
      onClose: () => setPreviewModalOpen(false),
      onConfirm: () => {
        setPreviewModalOpen(false);
        handleConfirm();
      },
      data: rawCsvData,
      title: removeMode === "update" ? "Confirm Metafield Update" : "Confirm Metafield Deletion",
      confirmText: removeMode === "update" ? "Update" : "Delete",
      destructive: removeMode !== "update",
      confirmationMessage: removeMode === "update" ? `This metafield will be updated/added for the selected ${specificField}'s in the CSV.` : `This metafield will be deleted only for the selected ${specificField}'s in the CSV.`
    }), /* @__PURE__ */ jsx(Modal, {
      open: modalOpen,
      onClose: () => setModalOpen(false),
      title: removeMode === "update" ? "Confirm Metafield Update" : "Confirm Metafield Deletion",
      primaryAction: {
        content: removeMode === "update" ? "Update" : "Delete",
        onAction: handleConfirm,
        destructive: removeMode !== "update"
      },
      secondaryActions: [{
        content: "Cancel",
        onAction: () => setModalOpen(false)
      }],
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsx(Text, {
          as: "p",
          children: removeMode === "all" ? `This metafield will be deleted from starting 5000 ${specificField}'s.` : removeMode === "update" ? `This metafield will be updated/added for the selected ${specificField}'s in the CSV.` : `This metafield will be deleted only for the selected ${specificField}'s in the CSV.`
        })
      })
    }), /* @__PURE__ */ jsx(MetafieldManageInstructionsModal, {
      open: instructionsOpen,
      onClose: () => setInstructionsOpen(false)
    })]
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: app_metafieldManage,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const excelSafe = (value) => {
  if (value === null || value === void 0) return "";
  const str = String(value);
  if (/^[=+\-@]/.test(str)) {
    return `="${str}"`;
  }
  return str;
};
const EXPORT_RESOURCES = {
  /* ---------------- PRODUCTS ---------------- */
  product: {
    query: () => `
      query ($cursor: String) {
        products(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              title
              handle
              tags
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.products;
    },
    baseHeaders: ["resource_id", "title", "handle"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.title),
      excelSafe(r.handle)
    ]
  },
  /* ---------------- PRODUCT VARIANTS ---------------- */
  product_variant: {
    query: () => `
      query ($cursor: String) {
        productVariants(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              sku
              title
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.productVariants;
    },
    baseHeaders: ["resource_id", "sku", "title"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.sku),
      excelSafe(r.title)
    ]
  },
  /* ---------------- COLLECTIONS ---------------- */
  collection: {
    query: () => `
      query ($cursor: String) {
        collections(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              title
              handle
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.collections;
    },
    baseHeaders: ["resource_id", "title", "handle"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.title),
      excelSafe(r.handle)
    ]
  },
  /* ---------------- CUSTOMERS ---------------- */
  customer: {
    query: () => `
      query ($cursor: String) {
        customers(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              firstName
              lastName
              email
              tags
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.customers;
    },
    baseHeaders: ["resource_id", "first_name", "last_name", "email"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.firstName),
      excelSafe(r.lastName),
      excelSafe(r.email)
    ]
  },
  /* ---------------- ORDERS ---------------- */
  order: {
    query: () => `
      query ($cursor: String) {
        orders(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              name
              tags
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.orders;
    },
    baseHeaders: ["resource_id", "order_name"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.name)
    ]
  },
  /* ---------------- COMPANIES (B2B) ---------------- */
  company: {
    query: () => `
      query ($cursor: String) {
        companies(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              name
              externalId
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.companies;
    },
    baseHeaders: ["resource_id", "name", "external_id"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.name),
      excelSafe(r.externalId)
    ]
  },
  /* ---------------- COMPANY LOCATIONS ---------------- */
  company_location: {
    query: () => `
      query ($cursor: String) {
        companyLocations(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              name
              externalId
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.companyLocations;
    },
    baseHeaders: ["resource_id", "name", "external_id"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.name),
      excelSafe(r.externalId)
    ]
  },
  /* ---------------- STORE LOCATIONS ---------------- */
  location: {
    query: () => `
      query ($cursor: String) {
        locations(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              name
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.locations;
    },
    baseHeaders: ["resource_id", "name"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.name)
    ]
  },
  /* ---------------- PAGES ---------------- */
  page: {
    query: () => `
      query ($cursor: String) {
        pages(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              title
              handle
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.pages;
    },
    baseHeaders: ["resource_id", "title", "handle"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.title),
      excelSafe(r.handle)
    ]
  },
  /* ---------------- BLOGS ---------------- */
  blog: {
    query: () => `
      query ($cursor: String) {
        blogs(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              title
              handle
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.blogs;
    },
    baseHeaders: ["resource_id", "title", "handle"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.title),
      excelSafe(r.handle)
    ]
  },
  /* ---------------- BLOG POSTS ---------------- */
  blog_post: {
    query: () => `
      query ($cursor: String) {
        articles(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              title
              handle
              tags
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.articles;
    },
    baseHeaders: ["resource_id", "title", "handle"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.title),
      excelSafe(r.handle)
    ]
  },
  /* ---------------- MARKETS ---------------- */
  market: {
    query: () => `
      query ($cursor: String) {
        markets(first: 200, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              name
              metafields(first: 200) {
                edges { node { namespace key value } }
              }
            }
          }
        }
      }
    `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.markets;
    },
    baseHeaders: ["resource_id", "name"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.name)
    ]
  },
  /* ---------------- METAOBJECTS ---------------- */
  metaobject: {
    query: ({ type }) => `
    query ($cursor: String) {
      metaobjects(type: "${type}", first: 200, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id
            type
            handle
            displayName
            fields {
              key
              value
            }
          }
        }
      }
    }
  `,
    getConnection: (d) => {
      var _a2;
      return (_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.metaobjects;
    },
    baseHeaders: ["resource_id", "type", "handle", "display_name"],
    buildBaseRow: (r) => [
      excelSafe(r.id),
      excelSafe(r.type),
      excelSafe(r.handle),
      excelSafe(r.displayName ?? "")
    ]
  }
};
const loader$5 = async ({
  request
}) => {
  const {
    admin
  } = await authenticate.admin(request);
  const response = await admin.graphql(`
    query {
      metaobjectDefinitions(first: 100) {
        edges {
          node {
            type
            name
          }
        }
      }
    }
  `);
  const data = await response.json();
  const metaobjectTypes = data.data.metaobjectDefinitions.edges.map((e) => ({
    label: e.node.name,
    value: e.node.type
  }));
  return {
    metaobjectTypes
  };
};
const csvEscape = (value) => {
  if (value === null || value === void 0) return '""';
  const str = String(value).replace(/"/g, '""');
  return `"${str}"`;
};
const action$2 = async ({
  request
}) => {
  const {
    admin
  } = await authenticate.admin(request);
  const formData = await request.formData();
  const metaobjectType = formData.get("metaobjectType");
  const resource = formData.get("resource");
  const cursor = formData.get("cursor");
  const config = EXPORT_RESOURCES[resource];
  if (!config) {
    return {
      error: "Unsupported resource"
    };
  }
  if (resource === "metaobject" && !metaobjectType) {
    return {
      error: "Metaobject type is required"
    };
  }
  const gqlQuery = resource === "metaobject" ? config.query({
    type: metaobjectType
  }) : config.query();
  const response = await admin.graphql(gqlQuery, {
    variables: {
      cursor
    }
  });
  const data = await response.json();
  const connection = config.getConnection(data);
  return {
    nodes: connection.edges.map((e) => e.node),
    pageInfo: connection.pageInfo,
    resource,
    metaobjectType
  };
};
const app_exportData = UNSAFE_withComponentProps(function ExportData() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const {
    metaobjectTypes
  } = useLoaderData();
  const [resource, setResource] = useState("product");
  const [includeTags, setIncludeTags] = useState(true);
  const [includeMetafields, setIncludeMetafields] = useState(true);
  const [metaobjectType, setMetaobjectType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [accumulatedRecords, setAccumulatedRecords] = useState([]);
  const [progressCount, setProgressCount] = useState(0);
  useEffect(() => {
    setIncludeTags(true);
    setIncludeMetafields(true);
    if (resource === "metaobject" && (metaobjectTypes == null ? void 0 : metaobjectTypes.length) > 0 && !metaobjectType) {
      setMetaobjectType(metaobjectTypes[0].value);
    }
  }, [resource, metaobjectTypes]);
  const handleExport = () => {
    setIsExporting(true);
    setAccumulatedRecords([]);
    setProgressCount(0);
    const fd = new FormData();
    fd.append("resource", resource);
    if (resource === "metaobject") {
      fd.append("metaobjectType", metaobjectType);
    }
    fetcher.submit(fd, {
      method: "POST"
    });
  };
  useEffect(() => {
    if (!isExporting || fetcher.state !== "idle" || !fetcher.data) return;
    if (fetcher.data.error) {
      setIsExporting(false);
      return;
    }
    const {
      nodes,
      pageInfo
    } = fetcher.data;
    const newRecords = [...accumulatedRecords, ...nodes];
    setAccumulatedRecords(newRecords);
    setProgressCount(newRecords.length);
    if (pageInfo.hasNextPage) {
      const fd = new FormData();
      fd.append("resource", resource);
      fd.append("cursor", pageInfo.endCursor);
      if (resource === "metaobject") {
        fd.append("metaobjectType", metaobjectType);
      }
      fetcher.submit(fd, {
        method: "POST"
      });
    } else {
      finishExport(newRecords);
    }
  }, [fetcher.data, fetcher.state, isExporting]);
  const finishExport = (records) => {
    const config = EXPORT_RESOURCES[resource];
    const useTags = ["product", "customer", "order", "blog_post"].includes(resource) && includeTags;
    const useMetafields = resource !== "metaobject" && includeMetafields;
    const metafieldColumns = /* @__PURE__ */ new Set();
    if (useMetafields) {
      records.forEach((r) => {
        var _a2;
        return (_a2 = r.metafields) == null ? void 0 : _a2.edges.forEach((mf) => metafieldColumns.add(`${mf.node.namespace}.${mf.node.key}`));
      });
    }
    const mfCols = Array.from(metafieldColumns);
    const rows = [];
    rows.push([...config.baseHeaders, ...useTags ? ["tags"] : [], ...mfCols].join(","));
    records.forEach((r) => {
      var _a2, _b;
      const mfMap = {};
      (_a2 = r.metafields) == null ? void 0 : _a2.edges.forEach((mf) => {
        mfMap[`${mf.node.namespace}.${mf.node.key}`] = mf.node.value;
      });
      rows.push([...config.buildBaseRow(r).map(csvEscape), ...useTags ? [csvEscape(((_b = r.tags) == null ? void 0 : _b.join(", ")) || "")] : [], ...mfCols.map((k) => csvEscape(mfMap[k] || ""))].join(","));
    });
    const csvContent = rows.join("\n");
    downloadCSV(csvContent);
    setIsExporting(false);
  };
  const downloadCSV = (csv) => {
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const now = /* @__PURE__ */ new Date();
    const timestamp = now.toISOString().replace(/:/g, "-").replace(/\..+/, "");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resource}-export-${timestamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  useEffect(() => {
    if (!isExporting) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const blockNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", blockNavigation);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", blockNavigation);
    };
  }, [isExporting]);
  return /* @__PURE__ */ jsxs(Page, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col space-y-1.5 mb-5 rounded-sm",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center space-x-2",
        children: [/* @__PURE__ */ jsx("button", {
          onClick: () => navigate("/app"),
          className: "flex items-center cursor-pointer justify-center text-[#303030] hover:opacity-70 transition-opacity focus:outline-none",
          "aria-label": "Go to Home",
          children: /* @__PURE__ */ jsx(Icon, {
            source: HomeIcon
          })
        }), /* @__PURE__ */ jsx("span", {
          className: "h-5 w-px bg-[#D2D2D2]",
          "aria-hidden": "true"
        }), /* @__PURE__ */ jsx("div", {
          className: "text-xl font-bold leading-tight",
          children: "Export Store Data"
        })]
      }), /* @__PURE__ */ jsx(Text, {
        as: "p",
        variant: "bodySm",
        tone: "subdued",
        children: "Create CSV backups of your store resources before performing bulk updates.        "
      })]
    }), /* @__PURE__ */ jsx(Layout, {
      children: /* @__PURE__ */ jsx(Layout.Section, {
        children: /* @__PURE__ */ jsx(Card, {
          sectioned: true,
          children: /* @__PURE__ */ jsxs(BlockStack, {
            gap: "400",
            children: [/* @__PURE__ */ jsx(Text, {
              as: "h2",
              variant: "headingMd",
              children: "Select Data to Export"
            }), /* @__PURE__ */ jsx(Select, {
              label: "Resource",
              options: [{
                label: "Products",
                value: "product"
              }, {
                label: "Product Variant",
                value: "product_variant"
              }, {
                label: "Collections",
                value: "collection"
              }, {
                label: "Customers",
                value: "customer"
              }, {
                label: "Orders",
                value: "order"
              }, {
                label: "Company",
                value: "company"
              }, {
                label: "Company Location",
                value: "company_location"
              }, {
                label: "Location",
                value: "location"
              }, {
                label: "Pages",
                value: "page"
              }, {
                label: "Blog",
                value: "blog"
              }, {
                label: "Blog Post",
                value: "blog_post"
              }, {
                label: "Market",
                value: "market"
              }, {
                label: "Metaobject",
                value: "metaobject"
              }],
              value: resource,
              onChange: setResource,
              disabled: isExporting
            }), resource === "metaobject" && /* @__PURE__ */ jsx(Select, {
              label: "Metaobject Type",
              options: metaobjectTypes,
              value: metaobjectType,
              onChange: setMetaobjectType,
              disabled: isExporting
            }), ["product", "customer", "order", "blog_post"].includes(resource) && /* @__PURE__ */ jsx(Select, {
              label: "Include Tags",
              options: [{
                label: "Yes",
                value: "true"
              }, {
                label: "No",
                value: "false"
              }],
              value: String(includeTags),
              onChange: (v) => setIncludeTags(v === "true"),
              disabled: isExporting
            }), resource !== "metaobject" && /* @__PURE__ */ jsx(Select, {
              label: "Include Metafields",
              options: [{
                label: "Yes",
                value: "true"
              }, {
                label: "No",
                value: "false"
              }],
              value: String(includeMetafields),
              onChange: (v) => setIncludeMetafields(v === "true"),
              disabled: isExporting
            }), isExporting && /* @__PURE__ */ jsx(Card, {
              subdued: true,
              children: /* @__PURE__ */ jsxs(Text, {
                as: "strong",
                children: ["Exporting… ", progressCount, " records fetched so far."]
              })
            }), /* @__PURE__ */ jsx(Button, {
              variant: "primary",
              loading: isExporting,
              onClick: () => setModalOpen(true),
              disabled: isExporting,
              children: isExporting ? "Exporting…" : "Export CSV"
            })]
          })
        })
      })
    }), /* @__PURE__ */ jsx(Modal, {
      open: modalOpen,
      onClose: () => setModalOpen(false),
      title: "Confirm Export",
      primaryAction: {
        content: "Yes, Export",
        onAction: () => {
          setModalOpen(false);
          handleExport();
        }
      },
      secondaryActions: [{
        content: "Cancel",
        onAction: () => setModalOpen(false)
      }],
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsxs(Text, {
          as: "p",
          children: ["Are you sure you want to export ", resource, "'s ", includeTags && includeMetafields ? "with tags and metafields" : includeTags ? "with tags" : includeMetafields ? "with metafields" : "", "?"]
        })
      })
    })]
  });
});
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: app_exportData,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async ({
  request
}) => {
  try {
    await authenticate.admin(request);
    return {
      apiKey: process.env.SHOPIFY_API_KEY || ""
    };
  } catch (error) {
    throw new Response("Unauthorized or Server Error", {
      status: 500
    });
  }
};
const action$1 = async ({
  request
}) => {
  try {
    const {
      admin
    } = await authenticate.admin(request);
    const formData = await request.formData();
    const mode = formData.get("mode");
    if (mode === "fetch") {
      return await handleFetch(admin, formData);
    }
    if (mode === "remove-global") {
      return await handleRemoveFromAll(admin, formData);
    }
    if (mode === "remove-specific") {
      return await handleRemoveSpecific(admin, formData);
    }
    return {
      error: "Invalid mode"
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Something went wrong in the action handler."
    };
  }
};
const app_removeTags = UNSAFE_withComponentProps(function TagManager() {
  var _a2;
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const breakpoints = useBreakpoints();
  const [objectType, setObjectType] = useState("product");
  const [matchType, setMatchType] = useState("contain");
  const [conditions, setConditions] = useState([{
    tag: "",
    operator: "OR"
  }]);
  const [fetchedItems, setFetchedItems] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [removalMode, setRemovalMode] = useState("global");
  const [csvIds, setCsvIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [rawCsvData, setRawCsvData] = useState([]);
  const [alert, setAlert] = useState({
    active: false,
    title: "",
    message: ""
  });
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [noTagsFound, setNoTagsFound] = useState(false);
  const [specificField, setSpecificField] = useState("Id");
  const [csvType, setCsvType] = useState("Id");
  const [currentrow, setcurrentrow] = useState();
  const [allFetchedTags, setAllFetchedTags] = useState([]);
  const [isFetchingTags, setIsFetchingTags] = useState(false);
  const [finalSpecificResults, setFinalSpecificResults] = useState([]);
  const [csvIndex, setCsvIndex] = useState(1);
  const [search, setSearch] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [specificEnd, setSpecificEnd] = useState(false);
  const lastProcessedRef = useRef(null);
  const [globalResult, setGlobalResult] = useState({
    results: [],
    totalProcessed: 0,
    success: true,
    complete: false,
    nextCursor: null
  });
  const emptyGlobalState = {
    results: [],
    totalProcessed: 0,
    success: true,
    complete: false,
    nextCursor: null,
    mode: null
  };
  const [isDbCreated, setIsDbCreated] = useState(false);
  const [dbChecked, setDbChecked] = useState(false);
  const [modalOpendb, setModalOpendb] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const isFetching = fetcher.state !== "idle" && ((_a2 = fetcher.formData) == null ? void 0 : _a2.get("mode")) === "fetch";
  const isActionDisabled = isRemoving;
  useEffect(() => {
    fetcher.load("/api/check/db");
  }, []);
  const createDatabase = () => {
    setIsSubmitting(true);
    fetcher.submit({}, {
      method: "post",
      action: "/api/metaCreate/db"
    });
  };
  function filterTagsBasedOnConditions(allTags, conditions2, matchType2) {
    if (!(conditions2 == null ? void 0 : conditions2.length)) return allTags;
    const match = (tag, cond) => {
      const value = cond.tag.trim().toLowerCase();
      const t = tag.toLowerCase();
      switch (matchType2) {
        case "exact":
          return t === value;
        case "start":
          return t.startsWith(value);
        case "end":
          return t.endsWith(value);
        default:
          return t.includes(value);
      }
    };
    let result = allTags.filter((tag) => match(tag, conditions2[0]));
    for (let i = 1; i < conditions2.length; i++) {
      const cond = conditions2[i];
      if (cond.tag === "") continue;
      if (cond.operator === "AND") {
        result = result.filter((tag) => match(tag, cond));
      } else {
        const matches = allTags.filter((tag) => match(tag, cond));
        result = Array.from(/* @__PURE__ */ new Set([...result, ...matches]));
      }
    }
    return result;
  }
  function startFetchTags() {
    setAllFetchedTags([]);
    setFetchedItems([]);
    setNoTagsFound(false);
    setIsFetchingTags(true);
    setSearch(true);
    setRemovalMode("global");
    if (objectType === "product") setCsvType("Sku");
    else if (objectType === "customer") setCsvType("Email");
    else if (objectType === "order") setCsvType("Name");
    else if (objectType === "article") setCsvType("Handle");
    const last = conditions[conditions.length - 1];
    if (last && last.tag.trim() === "") return;
    const lastTag = last.tag.trim();
    const isDuplicate = conditions.some((c, idx) => idx !== conditions.length - 1 && c.tag.trim().toLowerCase() === lastTag.toLowerCase());
    if (isDuplicate) {
      setAlert({
        active: true,
        title: "Duplicate Tag",
        message: `The tag "${lastTag}" is already added.`,
        tone: "critical"
      });
      return;
    }
    setSpecificField("Id");
    setFileName(null);
    setAlert((prev) => ({
      ...prev,
      active: false
    }));
    const fd = new FormData();
    fd.append("mode", "fetch");
    fd.append("objectType", objectType);
    fetcher.submit(fd, {
      method: "POST"
    });
  }
  useEffect(() => {
    if (!isFetchingTags && allFetchedTags.length > 0) {
      const uniqueTags = Array.from(new Set(allFetchedTags));
      const filtered = filterTagsBasedOnConditions(uniqueTags, conditions, matchType);
      setFetchedItems(filtered);
      setNoTagsFound(filtered.length === 0);
    }
    if (search && allFetchedTags.length === 0) {
      setNoTagsFound(true);
    }
  }, [isFetchingTags]);
  useEffect(() => {
    var _a3, _b, _c;
    if (fetcher.state !== "idle" || !fetcher.data) return;
    if (lastProcessedRef.current === fetcher.data) return;
    lastProcessedRef.current = fetcher.data;
    const data = fetcher.data;
    if (((_a3 = fetcher.data) == null ? void 0 : _a3.successdb) === void 0) {
      if (data.mode === "fetch" && data.success) {
        setAllFetchedTags((prev) => [...prev, ...data.tags]);
        if (data.hasNextPage) {
          const fd = new FormData();
          fd.append("mode", "fetch");
          fd.append("objectType", objectType);
          fd.append("cursor", data.nextCursor);
          fetcher.submit(fd, {
            method: "POST"
          });
        } else {
          setRemovalMode("global");
          setIsFetchingTags(false);
        }
      }
      if (data.mode === "remove-specific") {
        const updatedResults = data.results.map((item) => ({
          ...item,
          row: currentrow
        }));
        setFinalSpecificResults((prev) => [...prev, ...updatedResults]);
        const nextIndex = csvIndex + 1;
        if (nextIndex < csvIds.length) {
          setCsvIndex(nextIndex);
          setcurrentrow(csvIds[nextIndex]);
          const fd = new FormData();
          fd.append("mode", "remove-specific");
          fd.append("tags", JSON.stringify(selectedTags));
          fd.append("row", JSON.stringify(csvIds[nextIndex]));
          fd.append("flag", JSON.stringify(specificField === "Id"));
          fd.append("resource", JSON.stringify(objectType));
          fetcher.submit(fd, {
            method: "POST"
          });
        } else {
          setSpecificEnd(true);
          setIsRemoving(false);
        }
        return;
      }
      if (data.mode === "remove-global") {
        const currentProcessed = globalResult.results.length + (((_b = data.results) == null ? void 0 : _b.length) || 0);
        const limitReached = currentProcessed >= 5e3;
        setGlobalResult((prev) => {
          const merged = [...prev.results, ...data.results || []];
          return {
            ...prev,
            mode: "remove-global",
            results: merged,
            totalProcessed: merged.length,
            success: prev.success && data.success,
            complete: !data.hasNextPage || limitReached,
            nextCursor: data.nextCursor || null
          };
        });
        if (data.hasNextPage && !limitReached) {
          const fd = new FormData();
          fd.append("objectType", objectType);
          fd.append("tags", JSON.stringify(selectedTags));
          fd.append("mode", "remove-global");
          fd.append("cursor", data.nextCursor);
          setTimeout(() => {
            fetcher.submit(fd, {
              method: "POST"
            });
          }, 100);
        } else {
          setIsRemoving(false);
        }
        return;
      }
    } else {
      const success2 = Boolean((_c = fetcher.data) == null ? void 0 : _c.successdb);
      if ((fetcher.data === void 0 || success2) && !isDbCreated) {
        setIsDbCreated(fetcher.data === void 0 ? true : success2);
      }
      if (!success2 && fetcher.data !== void 0 && isDbCreated) {
        setIsDbCreated(false);
      }
      setDbChecked(true);
      if (isSubmitting && success2) {
        setModalOpendb(false);
        setIsSubmitting(false);
        setShowSuccess(true);
      }
    }
  }, [fetcher.state, fetcher.data]);
  useEffect(() => {
    let results = [];
    if (globalResult.complete && globalResult.results.length > 0) {
      results = globalResult.results;
    }
    if (specificEnd && finalSpecificResults.length > 0) {
      const successRows = finalSpecificResults.filter((r) => r.success);
      if (successRows.length > 0) results = successRows;
    }
    if (results.length > 0) {
      const Data = {
        operation: "Tags-removed",
        // only operation
        objectType: objectType === "article" ? "blogPost" : objectType,
        // only objectType
        value: results
        // only value
      };
      fetch("/api/add/db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Data)
      }).catch((err) => console.error("Logging error", err));
    }
  }, [specificEnd, globalResult.results]);
  useEffect(() => {
    if (!isRemoving) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const blockNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", blockNavigation);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", blockNavigation);
    };
  }, [isRemoving]);
  useEffect(() => {
    if (selectedTags.length === 0) {
      setCsvIds([]);
      setFileName(null);
      setAlert((prev) => ({
        ...prev,
        active: false
      }));
    }
  }, [selectedTags]);
  const handleClearCSV = () => {
    setCsvIds([]);
    setRawCsvData([]);
    setFileName(null);
  };
  const handleCsvInput = useCallback((_dropFiles, acceptedFiles, _rejectedFiles) => {
    const file = acceptedFiles[0];
    if (!file) {
      handleClearCSV();
      return;
    }
    setFileName(file.name);
    const normalizedField = specificField.toLowerCase();
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.toLowerCase().trim(),
      complete: (res) => {
        let hasInvalidGid = false;
        const values = res.data.map((row) => {
          const rawValue = row[normalizedField];
          const id = typeof rawValue === "string" ? rawValue.trim() : null;
          if (!id) return null;
          const gidObjectType = getShopifyObjectTypeFromGid(id);
          if (gidObjectType && gidObjectType !== objectType.toLowerCase()) {
            setAlert({
              active: true,
              title: "Invalid Shopify ID",
              message: `The CSV contains an ID of type "${gidObjectType}", but "${objectType}" was selected.

ID: ${id}`,
              tone: "critical"
            });
            hasInvalidGid = true;
            return null;
          }
          return id;
        }).filter(Boolean);
        if (hasInvalidGid) {
          handleClearCSV();
          return;
        }
        if (values.length > 5e3) {
          setAlert({
            active: true,
            title: "Limit Exceeded",
            message: "Only 5000 records will add at a time",
            tone: "critical"
          });
          handleClearCSV();
          return;
        }
        if (values.length === 0) {
          setAlert({
            active: true,
            title: "Valid Record Not Found",
            message: "No valid records found in the CSV file. Please follow the CSV Format",
            tone: "critical"
          });
          handleClearCSV();
          return;
        }
        setCsvIds(values);
        setRawCsvData(res.data);
        setAlert((prev) => ({
          ...prev,
          active: false
        }));
      },
      error: (err) => {
        setAlert({
          active: true,
          title: "Parsing Error",
          message: "Failed to parse CSV file.",
          tone: "critical"
        });
        handleClearCSV();
      }
    });
  }, [specificField, objectType]);
  function getShopifyObjectTypeFromGid(gid) {
    if (typeof gid !== "string") return null;
    const match = gid.match(/^gid:\/\/shopify\/([^/]+)\/\d+$/);
    return match ? match[1].toLowerCase() : null;
  }
  const downloadResultCSV = () => {
    let result = [];
    let header = "";
    let rows = [];
    if (removalMode === "global") {
      result = (globalResult == null ? void 0 : globalResult.results) || [];
      header = ["Id", "Tags", "Success", "Error"].join(",") + "\n";
      rows = result.map((r) => {
        const id = r.id || "";
        const removedTags = Array.isArray(r.removedTags) ? r.removedTags.join(", ") : "";
        const success2 = r.success ? "true" : "false";
        const error = r.error || "";
        return `"${id}","${removedTags}","${success2}","${error}"`;
      });
    } else {
      result = finalSpecificResults;
      header = [specificField, "Tags", "Success", "Error"].join(",") + "\n";
      rows = result.map((r) => {
        const id = r.row || "";
        const removedTags = Array.isArray(r.removedTags) ? r.removedTags.join(", ") : "";
        const success2 = r.success ? "true" : "false";
        const error = r.error || "";
        return `"${id}","${removedTags}","${success2}","${error}"`;
      });
    }
    const csvContent = header + rows.join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tag-removal-results-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const handleDownloadTemplate = () => {
    const header = specificField === "Id" ? "Id" : csvType;
    let sampleValues = [];
    if (header === "Id") {
      const t = objectType.charAt(0).toUpperCase() + objectType.slice(1);
      sampleValues = [`gid://shopify/${t}/123456789`];
    } else if (header === "Sku") sampleValues = ["SKU-1"];
    else if (header === "Email") sampleValues = ["example@mail.com"];
    else if (header === "Name") sampleValues = ["#1001"];
    else if (header === "Handle") sampleValues = ["handle-1"];
    const csvContent = [header, ...sampleValues].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    }));
    link.download = `sample-${header}-template.csv`;
    link.click();
  };
  const handleRemoveConfirm = () => {
    setModalOpen(false);
    if (removalMode === "global") {
      setIsRemoving(true);
      setFinalSpecificResults([]);
      setGlobalResult(emptyGlobalState);
      const fd2 = new FormData();
      fd2.append("objectType", objectType);
      fd2.append("tags", JSON.stringify(selectedTags));
      fd2.append("mode", "remove-global");
      fetcher.submit(fd2, {
        method: "POST"
      });
      return;
    }
    setIsRemoving(true);
    setFinalSpecificResults([]);
    setGlobalResult(emptyGlobalState);
    const fd = new FormData();
    fd.append("objectType", objectType);
    fd.append("tags", JSON.stringify(selectedTags));
    fd.append("mode", "remove-specific");
    setCsvIndex(0);
    setcurrentrow(csvIds[0]);
    fd.append("row", JSON.stringify(csvIds[0]));
    fd.append("flag", JSON.stringify(specificField === "Id"));
    fd.append("resource", JSON.stringify(objectType));
    fetcher.submit(fd, {
      method: "POST"
    });
  };
  const resetAll = () => {
    setConditions([{
      tag: "",
      operator: "OR"
    }]);
    setFetchedItems([]);
    setSelectedTags([]);
    setCsvIds([]);
    setRawCsvData([]);
    setGlobalResult(emptyGlobalState);
    setFinalSpecificResults([]);
    setNoTagsFound(false);
    setIsRemoving(false);
    setSpecificField("Id");
    setRemovalMode("global");
    setSpecificEnd(false);
    setSearch(false);
    setFileName(null);
    setAlert((prev) => ({
      ...prev,
      active: false
    }));
  };
  useEffect(() => {
    if (removalMode === "global") {
      setSpecificField("Id");
      setCsvIds([]);
      setRawCsvData([]);
      setGlobalResult(emptyGlobalState);
      setFinalSpecificResults([]);
      setNoTagsFound(false);
      setIsRemoving(false);
      setSearch(false);
      setFileName(null);
    }
    setCsvIds([]);
    setRawCsvData([]);
    setFileName(null);
    setAlert((prev) => ({
      ...prev,
      active: false
    }));
  }, [removalMode, specificField]);
  const addCondition = () => {
    const last = conditions[conditions.length - 1];
    if (last && last.tag.trim() === "") return;
    const lastTag = last.tag.trim();
    const isDuplicate = conditions.some((c, idx) => idx !== conditions.length - 1 && c.tag.trim().toLowerCase() === lastTag.toLowerCase());
    if (isDuplicate) {
      setAlert({
        active: true,
        title: "Duplicate Tag",
        message: `The tag "${lastTag}" is already added.`,
        tone: "critical"
      });
      return;
    }
    setAlert((prev) => ({
      ...prev,
      active: false
    }));
    setConditions((prev) => [...prev, {
      tag: "",
      operator: "OR"
    }]);
  };
  const updateCondition = (i, field, val) => {
    setConditions((prev) => prev.map((c, idx) => idx === i ? {
      ...c,
      [field]: val
    } : c));
    setGlobalResult(emptyGlobalState);
    setFinalSpecificResults([]);
  };
  const removeCondition = (i) => setConditions((prev) => prev.filter((_, idx) => idx !== i));
  const validTagsEntered = conditions.filter((c) => c.tag.trim().length >= 2);
  const readyToFetch = validTagsEntered.length > 0 && conditions.every((c) => c.tag.trim().length === 0 || c.tag.trim().length >= 2);
  const readyToAdd = conditions.every((c) => c.tag.trim().length === 0 || c.tag.trim().length >= 2);
  function goToHome() {
    if (!isRemoving) navigate("/app");
  }
  return /* @__PURE__ */ jsxs(Page, {
    title: "Remove Tags",
    subtitle: "Search for tags and remove them globally or from specific items.",
    backAction: {
      content: "Home",
      onAction: goToHome
    },
    secondaryActions: [{
      content: "Instructions",
      onAction: () => setInstructionsOpen(true)
    }],
    children: [/* @__PURE__ */ jsxs(BlockStack, {
      gap: "300",
      children: [dbChecked && !isDbCreated && /* @__PURE__ */ jsx(Box, {
        children: /* @__PURE__ */ jsx(Banner, {
          tone: "warning",
          icon: DatabaseIcon,
          children: /* @__PURE__ */ jsxs(InlineStack, {
            gap: "300",
            align: "space-between",
            children: ["To view activity history and use the one-time restore feature, you’ll need to create the database first.", /* @__PURE__ */ jsx(Button, {
              variant: "secondary",
              onClick: () => setModalOpendb(true),
              disabled: isRemoving,
              children: "Create Database"
            })]
          })
        })
      }), /* @__PURE__ */ jsxs(Layout, {
        children: [/* @__PURE__ */ jsx(Layout.Section, {
          variant: breakpoints.mdDown ? "fullWidth" : "oneThird",
          children: /* @__PURE__ */ jsxs(BlockStack, {
            gap: "500",
            children: [/* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                gap: "400",
                children: [/* @__PURE__ */ jsx(Select, {
                  label: "Object Type",
                  options: [{
                    label: "Product",
                    value: "product"
                  }, {
                    label: "Customer",
                    value: "customer"
                  }, {
                    label: "Order",
                    value: "order"
                  }, {
                    label: "BlogPost",
                    value: "article"
                  }],
                  value: objectType,
                  onChange: (val) => {
                    setObjectType(val);
                    resetAll();
                  },
                  disabled: isActionDisabled || fetchedItems.length > 0
                }), /* @__PURE__ */ jsx(Select, {
                  label: "Match Type",
                  options: [{
                    label: "Contains",
                    value: "contain"
                  }, {
                    label: "Starts With",
                    value: "start"
                  }, {
                    label: "Ends With",
                    value: "end"
                  }, {
                    label: "Exact Match",
                    value: "exact"
                  }],
                  value: matchType,
                  onChange: setMatchType,
                  disabled: isActionDisabled || fetchedItems.length > 0
                }), objectType === "product" && /* @__PURE__ */ jsx(Banner, {
                  tone: "warning",
                  children: /* @__PURE__ */ jsx("p", {
                    children: "Updates may take 2-5 minutes to reflect due to Shopify indexing."
                  })
                })]
              })
            }), /* @__PURE__ */ jsx(LegacyCard, {
              title: "Search Conditions",
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                gap: "300",
                children: [conditions.map((c, i) => /* @__PURE__ */ jsx(InlineStack, {
                  gap: "200",
                  align: "center",
                  children: /* @__PURE__ */ jsx("div", {
                    style: {
                      flex: 1
                    },
                    children: /* @__PURE__ */ jsx(TextField, {
                      label: "Tag",
                      labelHidden: true,
                      placeholder: "Enter tag (Min 2 chars)",
                      value: c.tag,
                      onChange: (val) => updateCondition(i, "tag", val),
                      autoComplete: "off",
                      disabled: isActionDisabled || fetchedItems.length > 0,
                      connectedRight: conditions.length > 1 && /* @__PURE__ */ jsx(Button, {
                        icon: XIcon,
                        onClick: () => removeCondition(i),
                        disabled: isActionDisabled || fetchedItems.length > 0
                      })
                    })
                  })
                }, i)), /* @__PURE__ */ jsx(Button, {
                  variant: "plain",
                  icon: PlusIcon,
                  onClick: addCondition,
                  disabled: !readyToAdd || isActionDisabled || fetchedItems.length > 0 || conditions.length > 0 && conditions[conditions.length - 1].tag.trim() === "",
                  children: "Add Another Tag"
                }), /* @__PURE__ */ jsxs(ButtonGroup, {
                  fullWidth: true,
                  children: [/* @__PURE__ */ jsx(Button, {
                    variant: "primary",
                    onClick: startFetchTags,
                    loading: isFetching,
                    disabled: isActionDisabled || !readyToFetch || fetchedItems.length > 0,
                    children: "Fetch Tags"
                  }), fetchedItems.length > 0 && /* @__PURE__ */ jsx(Button, {
                    onClick: resetAll,
                    disabled: isActionDisabled,
                    children: "Reset"
                  })]
                })]
              })
            })]
          })
        }), /* @__PURE__ */ jsx(Layout.Section, {
          children: /* @__PURE__ */ jsxs(BlockStack, {
            gap: "500",
            children: [alert.active && /* @__PURE__ */ jsx(Banner, {
              title: alert.title,
              tone: alert.tone,
              onDismiss: () => setAlert((prev) => ({
                ...prev,
                active: false
              })),
              children: /* @__PURE__ */ jsx("p", {
                children: alert.message
              })
            }), isFetching && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                align: "center",
                inlineAlign: "center",
                gap: "400",
                children: [/* @__PURE__ */ jsx(Spinner, {
                  size: "large"
                }), /* @__PURE__ */ jsx(Text, {
                  as: "h3",
                  variant: "headingMd",
                  children: "Scanning Store Tags"
                }), /* @__PURE__ */ jsxs(Text, {
                  as: "p",
                  tone: "subdued",
                  children: ["Searching through your ", objectType, "s..."]
                })]
              })
            }), !isFetching && !noTagsFound && fetchedItems.length === 0 && !isRemoving && !globalResult.complete && !specificEnd && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsx(EmptyState, {
                heading: "Ready to Search",
                image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
                children: /* @__PURE__ */ jsx("p", {
                  children: "Select an object type on the left, enter tags, and click Fetch Tags."
                })
              })
            }), noTagsFound && !isFetching && fetchedItems.length === 0 && !alert.active && !isFetchingTags && noTagsFound && /* @__PURE__ */ jsxs(Banner, {
              title: "No tags found",
              tone: "info",
              onDismiss: () => setNoTagsFound(false),
              children: [/* @__PURE__ */ jsx("p", {
                children: "Try adjusting your search conditions or Match Type."
              }), /* @__PURE__ */ jsx(Button, {
                variant: "plain",
                onClick: resetAll,
                children: "Reset Search"
              })]
            }), !isFetching && fetchedItems.length > 0 && !isRemoving && !globalResult.complete && !specificEnd && /* @__PURE__ */ jsxs(BlockStack, {
              gap: "400",
              children: [/* @__PURE__ */ jsx(LegacyCard, {
                title: `Select Tags to Remove (${fetchedItems.length} found)`,
                sectioned: true,
                children: /* @__PURE__ */ jsxs(BlockStack, {
                  gap: "200",
                  children: [/* @__PURE__ */ jsx(Box, {
                    padding: "200",
                    background: "bg-surface-secondary",
                    borderRadius: "200",
                    children: /* @__PURE__ */ jsx(InlineStack, {
                      gap: "200",
                      wrap: true,
                      children: fetchedItems.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return /* @__PURE__ */ jsx(Button, {
                          size: "slim",
                          pressed: isSelected,
                          variant: isSelected ? "primary" : "secondary",
                          onClick: () => setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]),
                          children: tag
                        }, tag);
                      })
                    })
                  }), selectedTags.length > 0 && /* @__PURE__ */ jsx(Button, {
                    variant: "plain",
                    tone: "critical",
                    onClick: () => setSelectedTags([]),
                    children: "Clear Selection"
                  })]
                })
              }), selectedTags.length > 0 && /* @__PURE__ */ jsx(LegacyCard, {
                title: "Removal Method",
                sectioned: true,
                children: /* @__PURE__ */ jsxs(BlockStack, {
                  gap: "400",
                  children: [/* @__PURE__ */ jsx(ChoiceList, {
                    title: "",
                    choices: [{
                      label: `Global Removal (From starting 5000 ${objectType}s)`,
                      value: "global"
                    }, {
                      label: "Specific Removal (From CSV)",
                      value: "specific"
                    }],
                    selected: [removalMode],
                    onChange: (val) => setRemovalMode(val[0]),
                    disabled: isActionDisabled
                  }), removalMode === "specific" && /* @__PURE__ */ jsx(Box, {
                    padding: "400",
                    background: "bg-surface-secondary",
                    borderRadius: "200",
                    children: /* @__PURE__ */ jsxs(BlockStack, {
                      gap: "200",
                      children: [/* @__PURE__ */ jsx(ChoiceList, {
                        title: "Match by",
                        choices: [{
                          label: "Shopify GID",
                          value: "Id"
                        }, {
                          label: csvType,
                          value: csvType
                        }],
                        selected: [specificField],
                        onChange: (val) => setSpecificField(val[0])
                      }), /* @__PURE__ */ jsx(Button, {
                        variant: "plain",
                        onClick: handleDownloadTemplate,
                        children: "Download Sample CSV"
                      }), /* @__PURE__ */ jsx(DropZone, {
                        onDrop: handleCsvInput,
                        accept: ".csv",
                        allowMultiple: false,
                        disabled: isActionDisabled,
                        children: fileName ? /* @__PURE__ */ jsx(DropZone.FileUpload, {
                          actionTitle: "Replace file"
                        }) : /* @__PURE__ */ jsx(DropZone.FileUpload, {
                          actionTitle: "Add file"
                        })
                      }), fileName && /* @__PURE__ */ jsxs(Text, {
                        as: "p",
                        tone: "success",
                        children: [fileName, " — ", csvIds.length, " records."]
                      }), /* @__PURE__ */ jsx(Text, {
                        as: "p",
                        tone: "subdued",
                        children: "Only 5000 records will add at a time"
                      })]
                    })
                  }), /* @__PURE__ */ jsx(Button, {
                    variant: "primary",
                    tone: "critical",
                    fullWidth: true,
                    disabled: removalMode === "specific" && csvIds.length === 0,
                    onClick: () => {
                      if (!csvIds.length && removalMode !== "global") {
                        setAlert({
                          active: true,
                          title: "Missing CSV",
                          message: "Upload CSV first",
                          tone: "critical"
                        });
                        return;
                      }
                      if (removalMode !== "global" && csvIds.length > 0) {
                        setPreviewModalOpen(true);
                      } else {
                        setModalOpen(true);
                      }
                    },
                    children: "Remove Selected Tags"
                  })]
                })
              })]
            }), isRemoving && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                gap: "600",
                align: "center",
                inlineAlign: "center",
                children: [/* @__PURE__ */ jsxs(BlockStack, {
                  gap: "200",
                  align: "center",
                  inlineAlign: "center",
                  children: [/* @__PURE__ */ jsx("div", {
                    style: {
                      marginBottom: "8px"
                    },
                    children: /* @__PURE__ */ jsx(Spinner, {
                      size: "large"
                    })
                  }), /* @__PURE__ */ jsx(Text, {
                    as: "h2",
                    variant: "headingLg",
                    children: "Removing tags"
                  }), /* @__PURE__ */ jsx(Text, {
                    as: "p",
                    tone: "subdued",
                    alignment: "center",
                    children: removalMode === "global" ? "We're processing your request. This may take a moment." : "Please keep this browser tab open until the removal is complete."
                  })]
                }), /* @__PURE__ */ jsx(Box, {
                  width: "100%",
                  maxWidth: "400px",
                  children: /* @__PURE__ */ jsxs(BlockStack, {
                    gap: "400",
                    children: [removalMode !== "global" && /* @__PURE__ */ jsxs(BlockStack, {
                      gap: "200",
                      children: [/* @__PURE__ */ jsx(ProgressBar, {
                        progress: Math.round(finalSpecificResults.length / csvIds.length * 100),
                        tone: "highlight",
                        size: "small"
                      }), /* @__PURE__ */ jsxs(InlineStack, {
                        align: "space-between",
                        children: [/* @__PURE__ */ jsx(Text, {
                          as: "span",
                          variant: "bodySm",
                          tone: "subdued",
                          children: finalSpecificResults.length < csvIds.length ? "In progress..." : "Finalizing..."
                        }), /* @__PURE__ */ jsxs(Text, {
                          as: "span",
                          variant: "bodySm",
                          fontWeight: "bold",
                          children: [Math.round(finalSpecificResults.length / csvIds.length * 100), "%"]
                        })]
                      })]
                    }), /* @__PURE__ */ jsx(Box, {
                      background: "bg-surface-secondary",
                      padding: "300",
                      borderRadius: "200",
                      children: /* @__PURE__ */ jsx(InlineStack, {
                        align: "center",
                        children: /* @__PURE__ */ jsxs(Text, {
                          as: "p",
                          variant: "bodySm",
                          tone: "subdued",
                          children: [/* @__PURE__ */ jsx("strong", {
                            children: removalMode === "global" ? globalResult.totalProcessed.toLocaleString() : `${finalSpecificResults.length.toLocaleString()} / ${csvIds.length.toLocaleString()}`
                          }), removalMode === "global" ? " tags removed" : " items processed"]
                        })
                      })
                    })]
                  })
                })]
              })
            }), (globalResult.complete || specificEnd) && !isRemoving && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                align: "center",
                inlineAlign: "center",
                gap: "500",
                children: [/* @__PURE__ */ jsx(Badge, {
                  tone: globalResult.success ? "success" : "critical",
                  children: "Operation Complete"
                }), /* @__PURE__ */ jsx(Text, {
                  as: "h2",
                  variant: "headingLg",
                  children: removalMode === "global" ? `Removed tags from ${globalResult.totalProcessed} items.` : `Processed ${finalSpecificResults.length} items.`
                }), /* @__PURE__ */ jsxs(InlineStack, {
                  gap: "300",
                  children: [/* @__PURE__ */ jsx(Button, {
                    onClick: downloadResultCSV,
                    variant: "primary",
                    children: "Download Results"
                  }), /* @__PURE__ */ jsx(Button, {
                    onClick: resetAll,
                    children: "Clear"
                  })]
                })]
              })
            }), finalSpecificResults.length > 0 && /* @__PURE__ */ jsx(LegacyCard, {
              children: /* @__PURE__ */ jsx("div", {
                style: {
                  maxHeight: "250px",
                  overflowY: "auto",
                  overflowX: "hidden"
                },
                children: /* @__PURE__ */ jsx(IndexTable, {
                  resourceName: {
                    singular: "result",
                    plural: "results"
                  },
                  itemCount: finalSpecificResults.length,
                  headings: [{
                    title: "#"
                  }, {
                    title: "ID"
                  }, {
                    title: "Status"
                  }, {
                    title: "Error"
                  }],
                  selectable: false,
                  condensed: breakpoints.smDown,
                  children: [...finalSpecificResults].reverse().map((r, i) => /* @__PURE__ */ jsxs(IndexTable.Row, {
                    id: i.toString(),
                    position: i,
                    children: [/* @__PURE__ */ jsx(IndexTable.Cell, {
                      children: finalSpecificResults.length - i
                    }), /* @__PURE__ */ jsx(IndexTable.Cell, {
                      children: r.row
                    }), /* @__PURE__ */ jsx(IndexTable.Cell, {
                      children: /* @__PURE__ */ jsx(Badge, {
                        tone: r.success ? "success" : "critical",
                        children: r.success ? "Success" : "Failed"
                      })
                    }), /* @__PURE__ */ jsx(IndexTable.Cell, {
                      children: r.error || "-"
                    })]
                  }, i))
                })
              })
            })]
          })
        })]
      })]
    }), /* @__PURE__ */ jsx(Modal, {
      open: modalOpendb,
      onClose: () => setModalOpendb(false),
      title: "Create Database",
      primaryAction: {
        content: "Yes, Create",
        onAction: createDatabase,
        loading: isSubmitting
      },
      secondaryActions: [{
        content: "Maybe Later",
        onAction: () => setModalOpendb(false)
      }],
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsxs(Text, {
          as: "p",
          children: ["Creating a metaobject named", " ", /* @__PURE__ */ jsx(Text, {
            as: "span",
            fontWeight: "bold",
            children: "“Tag Metafield App Database”"
          }), " ", "to store your app activity history. Would you like to continue?"]
        })
      })
    }), /* @__PURE__ */ jsx(Modal, {
      open: showSuccess,
      onClose: () => setShowSuccess(false),
      title: "Database Created Successfully",
      primaryAction: {
        content: "Close",
        onAction: () => setShowSuccess(false)
      },
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsx(Text, {
          as: "p",
          children: "Your database has been created successfully. You can now track and view all history."
        })
      })
    }), /* @__PURE__ */ jsx(CsvPreviewModal, {
      open: previewModalOpen,
      onClose: () => setPreviewModalOpen(false),
      onConfirm: () => {
        setPreviewModalOpen(false);
        handleRemoveConfirm();
      },
      data: rawCsvData,
      title: "Confirm Removal",
      confirmText: "Yes, Remove Tags",
      destructive: true,
      confirmationMessage: `Are you sure you want to remove ${selectedTags.length === 1 ? "1 tag" : `${selectedTags.length} tag's`} from ${rawCsvData.length} ${rawCsvData.length == 1 ? objectType : `${objectType}'s`} ?`
    }), /* @__PURE__ */ jsx(Modal, {
      open: modalOpen,
      onClose: () => setModalOpen(false),
      title: "Confirm Removal",
      primaryAction: {
        content: "Yes, Remove Tags",
        onAction: handleRemoveConfirm,
        destructive: true
      },
      secondaryActions: [{
        content: "Cancel",
        onAction: () => setModalOpen(false)
      }],
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsxs(Text, {
          as: "p",
          children: ["Are you sure you want to remove ", selectedTags.length === 1 ? "1 tag" : `${selectedTags.length} tag's`, " from starting 5000 ", objectType, "'s ?"]
        })
      })
    }), /* @__PURE__ */ jsx(RemoveTagsInstructionsModal, {
      open: instructionsOpen,
      onClose: () => setInstructionsOpen(false)
    })]
  });
});
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: app_removeTags,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async ({
  request
}) => {
  try {
    await authenticate.admin(request);
    return {
      apiKey: process.env.SHOPIFY_API_KEY || ""
    };
  } catch (error) {
    throw new Response("Unauthorized or Server Error", {
      status: 500
    });
  }
};
async function fetchAllTagsByResource(admin, id) {
  var _a2;
  const query = `
    query getResourceTags($id: ID!) {
      node(id: $id) {
        __typename
        ... on Product { tags }
        ... on Customer { tags }
        ... on Order { tags }
        ... on Article { tags }
      }
    }
  `;
  const res = await admin.graphql(query, {
    variables: {
      id
    }
  });
  const json = await res.json();
  const node = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.node;
  if (!node) return [];
  return Array.isArray(node.tags) ? node.tags : [];
}
const action = async ({
  request
}) => {
  var _a2, _b, _c, _d;
  try {
    const {
      admin
    } = await authenticate.admin(request);
    const formData = await request.formData();
    const rowsRaw = formData.get("rows");
    const resourceType = formData.get("objectType");
    const flagRaw = formData.get("flag");
    let rows = [];
    let flag = false;
    try {
      rows = JSON.parse(rowsRaw || "[]");
      flag = JSON.parse(flagRaw || "false");
    } catch (parseError) {
      return {
        success: false,
        error: "Invalid data format received.",
        results: []
      };
    }
    const results = [];
    const mutation = `
      mutation tagOp($id: ID!, $tags: [String!]!) {
        tagsAdd(id: $id, tags: $tags) {
          userErrors { field message }
        }
      } 
    `;
    const normalizeTag = (tag) => typeof tag === "string" ? tag.trim().toLowerCase() : tag;
    for (const row of rows) {
      let resourceId = row.id;
      if (!flag) {
        const fetchedId = await fetchResourceId(admin, resourceType, resourceId);
        if (!fetchedId) {
          results.push({
            id: row.id,
            success: false,
            errors: [{
              message: `Failed to fetch ${resourceType} ID`
            }]
          });
          continue;
        }
        resourceId = fetchedId;
      }
      const existingTags = await fetchAllTagsByResource(admin, resourceId);
      const normalizedExisting = existingTags.map(normalizeTag);
      const alreadyPresent = (_a2 = row == null ? void 0 : row.tags) == null ? void 0 : _a2.filter((tag) => normalizedExisting.includes(normalizeTag(tag)));
      const missingTags = (_b = row == null ? void 0 : row.tags) == null ? void 0 : _b.filter((tag) => !normalizedExisting.includes(normalizeTag(tag)));
      if (missingTags.length === 0) {
        results.push({
          id: row.id,
          success: false,
          errors: [{
            message: "All tags already exist",
            existingTags: alreadyPresent
          }]
        });
        continue;
      }
      try {
        const res = await admin.graphql(mutation, {
          variables: {
            id: resourceId,
            tags: missingTags.map((t) => t.trim())
          }
        });
        const parsed = await res.json();
        const errors = ((_d = (_c = parsed == null ? void 0 : parsed.data) == null ? void 0 : _c.tagsAdd) == null ? void 0 : _d.userErrors) || [];
        results.push({
          id: row.id,
          success: errors.length === 0,
          errors: alreadyPresent.length ? [{
            message: "Some tags already existed",
            existingTags: alreadyPresent
          }] : errors
        });
      } catch (err) {
        results.push({
          id: row.id,
          success: false,
          errors: [{
            message: err.message || "Unknown error"
          }]
        });
      }
    }
    return {
      results
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Something went wrong in tag add action.",
      results: []
    };
  }
};
const app_addTags = UNSAFE_withComponentProps(function SimpleTagManager() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [objectType, setObjectType] = useState("product");
  const [csvData, setCsvData] = useState([]);
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [csvType, setCsvType] = useState("Id");
  const [specificField, setSpecificField] = useState("Id");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const lastProcessedRef = useRef(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [rawCsvData, setRawCsvData] = useState([]);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [alert, setAlert] = useState({
    active: false,
    title: "",
    message: ""
  });
  const isFinished = progress === 100 && !isRunning;
  const [isDbCreated, setIsDbCreated] = useState(false);
  const [dbChecked, setDbChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    fetcher.load("/api/check/db");
  }, []);
  const createDatabase = () => {
    setIsSubmitting(true);
    fetcher.submit({}, {
      method: "post",
      action: "/api/metaCreate/db"
    });
  };
  useEffect(() => {
    var _a2, _b, _c;
    if (fetcher.state !== "idle" || !fetcher.data) return;
    if (lastProcessedRef.current === fetcher.data) return;
    lastProcessedRef.current = fetcher.data;
    if (((_a2 = fetcher.data) == null ? void 0 : _a2.successdb) === void 0) {
      if (!isRunning) return;
      const result = fetcher.data.results[0];
      const processingIndex = currentIndex;
      const rowId = (_b = csvData[processingIndex]) == null ? void 0 : _b.id;
      if (result.id !== rowId) return;
      setResults((prev) => {
        if (prev.length > processingIndex) return prev;
        return [{
          ...result,
          index: processingIndex
        }, ...prev];
      });
      const nextIndex = processingIndex + 1;
      setProgress(Math.round(nextIndex / csvData.length * 100));
      setCurrentIndex(nextIndex);
      if (nextIndex < csvData.length) {
        sendRow(nextIndex);
      } else {
        setIsRunning(false);
      }
    } else {
      const success2 = Boolean((_c = fetcher.data) == null ? void 0 : _c.successdb);
      if ((fetcher.data === void 0 || success2) && !isDbCreated) {
        setIsDbCreated(fetcher.data === void 0 ? true : success2);
      }
      if (!success2 && fetcher.data !== void 0 && isDbCreated) {
        setIsDbCreated(false);
      }
      setDbChecked(true);
      if (isSubmitting && success2) {
        setModalOpen(false);
        setIsSubmitting(false);
        setShowSuccess(true);
      }
    }
  }, [fetcher.state, fetcher.data, isRunning, results.length, csvData]);
  useEffect(() => {
    if (!isRunning) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const blockNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", blockNavigation);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", blockNavigation);
    };
  }, [isRunning]);
  useEffect(() => {
    setCsvData([]);
    setRawCsvData([]);
    setResults([]);
    setProgress(0);
    setTags([]);
    setTagInput("");
    setSpecificField("Id");
    setFile(null);
    if (objectType === "product") setCsvType("Sku");
    if (objectType === "customer") setCsvType("Email");
    if (objectType === "order") setCsvType("Name");
    if (objectType === "blogPost") setCsvType("Handle");
  }, [objectType]);
  useEffect(() => {
    setCsvData([]);
    setRawCsvData([]);
    setFile(null);
    setAlert((prev) => ({
      ...prev,
      active: false
    }));
  }, [specificField, csvType]);
  useEffect(() => {
    if (!isRunning && progress === 100) {
      const successResults = results.filter((r) => r.success === true);
      if (successResults.length > 0) {
        const rows = successResults.map((r) => ({
          id: r.id ?? "",
          tagList: Array.isArray(tags) ? tags.join(", ") : "",
          success: true,
          error: ""
        }));
        const Data = {
          operation: "Tags-Added",
          // only operation
          objectType,
          // only objectType
          value: rows
          // only value
        };
        fetch("/api/add/db", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(Data)
        }).catch((err) => console.error("Logging error", err));
      }
    }
  }, [progress, isRunning]);
  function getShopifyObjectTypeFromGid(gid) {
    if (typeof gid !== "string") return null;
    const match = gid.match(/^gid:\/\/shopify\/([^/]+)\/\d+$/);
    return match ? match[1].toLowerCase() : null;
  }
  const handleCsvInput = useCallback((_dropFiles, acceptedFiles, _rejectedFiles) => {
    const file2 = acceptedFiles[0];
    if (!file2) return;
    Papa.parse(file2, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const normalizedField = specificField.toLowerCase();
        let hasError = false;
        const rows = res.data.map((row) => {
          const normalizedRow = Object.keys(row).reduce((acc, key) => {
            acc[key.toLowerCase()] = row[key];
            return acc;
          }, {});
          const value = normalizedRow[normalizedField];
          const id = typeof value === "string" ? value.trim() : value;
          if (!id) return null;
          const type = objectType === "blogPost" ? "article" : objectType;
          const gidObjectType = getShopifyObjectTypeFromGid(id);
          if (gidObjectType && gidObjectType !== type.toLowerCase()) {
            setAlert({
              active: true,
              title: "Invalid Shopify ID",
              message: `The CSV contains an ID of type "${gidObjectType}", but "${objectType}" was selected.

ID: ${id}`,
              tone: "critical"
            });
            hasError = true;
            return null;
          }
          return {
            id
          };
        }).filter(Boolean);
        if (hasError) return;
        if (rows.length > 5e3) {
          setAlert({
            active: true,
            title: "Limit Exceeded",
            message: "Only 5000 records will add at a time",
            tone: "critical"
          });
          return;
        }
        if (rows.length === 0) {
          setAlert({
            active: true,
            title: "Valid Record Not Found",
            message: "No valid records found in the CSV file. Please follow the CSV Format",
            tone: "critical"
          });
          return;
        }
        setFile(file2);
        setCsvData(rows);
        setRawCsvData(res.data);
        setProgress(0);
        setResults([]);
        setAlert((prev) => ({
          ...prev,
          active: false
        }));
      }
    });
  }, [specificField, objectType]);
  const handleTagAdd = useCallback(() => {
    const trimmed = tagInput.trim();
    if (trimmed.length < 2) {
      setAlert({
        active: true,
        title: "Minimum Tag Length",
        message: "A tag must contain at least 2 characters.",
        tone: "critical"
      });
      return;
    }
    if (tags.includes(trimmed)) {
      setAlert({
        active: true,
        title: "Duplicate Tag",
        message: `The tag "${trimmed}" is already added.`,
        tone: "critical"
      });
      return;
    }
    setTags((current) => [...current, trimmed]);
    setTagInput("");
    setAlert((prev) => ({
      ...prev,
      active: false
    }));
  }, [tagInput, tags]);
  const handleTagRemove = useCallback((tagToRemove) => {
    setTags((current) => current.filter((t) => t !== tagToRemove));
  }, []);
  const sendRow = (index) => {
    const row = csvData[index];
    if (!row) return;
    const fd = new FormData();
    fd.append("objectType", objectType === "blogPost" ? "article" : objectType);
    fd.append("flag", JSON.stringify(specificField === "Id"));
    fd.append("rows", JSON.stringify([{
      id: row.id,
      tags
    }]));
    fetcher.submit(fd, {
      method: "POST"
    });
  };
  const handleRun = () => {
    setConfirmModalOpen(false);
    if (!csvData.length || !tags.length) return;
    setResults([]);
    setProgress(0);
    setCurrentIndex(0);
    setIsRunning(true);
    sendRow(0);
  };
  const downloadResults = () => {
    if (!results.length) return;
    const header = [specificField, "Tags", "Success", "Error"].join(",") + "\n";
    const escapeCSV = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const rows = results.map((r) => {
      const id = r.id ?? "";
      const tagList = Array.isArray(r.tags) ? r.tags.join(", ") : Array.isArray(tags) ? tags.join(", ") : "";
      const success2 = r.success ? "true" : "false";
      const error = Array.isArray(r.errors) && r.errors.length > 0 ? Array.from(new Set(r.errors.map((e) => {
        if (Array.isArray(e.existingTags) && e.existingTags.length > 0) {
          return `${e.message}: ${e.existingTags.join(", ")}`;
        }
        return e.message;
      }))).join("; ") : "";
      return [escapeCSV(id), escapeCSV(tagList), escapeCSV(success2), escapeCSV(error)].join(",");
    });
    const csvContent = header + rows.join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tag_manager_results-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const handleDownloadTemplate = () => {
    const header = specificField === "Id" ? "Id" : csvType;
    let sampleValues = [];
    if (header === "Id") sampleValues = [`gid://shopify/${objectType === "blogPost" ? "Article" : objectType.charAt(0).toUpperCase() + objectType.slice(1)}/123456789`];
    else if (header === "Sku") sampleValues = ["SKU-1"];
    else if (header === "Email") sampleValues = ["example@mail.com"];
    else if (header === "Name") sampleValues = ["#1001"];
    else if (header === "Handle") sampleValues = ["handle-1"];
    const csvContent = [header, ...sampleValues].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sample-${header}-template.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const resetAll = () => {
    setCsvData([]);
    setRawCsvData([]);
    setResults([]);
    setProgress(0);
    setTags([]);
    setTagInput("");
    setSpecificField("Id");
    setFile(null);
    setAlert((prev) => ({
      ...prev,
      active: false
    }));
  };
  const resourceOptions = [{
    label: "Products",
    value: "product"
  }, {
    label: "Customers",
    value: "customer"
  }, {
    label: "Orders",
    value: "order"
  }, {
    label: "Blog Posts",
    value: "blogPost"
  }];
  const matchOptions = [{
    label: "Shopify GID",
    value: "Id"
  }, {
    label: csvType,
    value: csvType
  }];
  function goToHome() {
    if (!isRunning) navigate("/app");
  }
  return /* @__PURE__ */ jsxs(Page, {
    title: "Add Tags",
    subtitle: "Search for tags and add them from specific items.",
    backAction: {
      content: "Home",
      onAction: goToHome
    },
    secondaryActions: [{
      content: "Instructions",
      onAction: () => setInstructionsOpen(true)
    }],
    children: [/* @__PURE__ */ jsxs(BlockStack, {
      gap: "300",
      children: [dbChecked && !isDbCreated && /* @__PURE__ */ jsx(Box, {
        children: /* @__PURE__ */ jsx(Banner, {
          tone: "warning",
          icon: DatabaseIcon,
          children: /* @__PURE__ */ jsxs(InlineStack, {
            gap: "300",
            align: "space-between",
            children: ["To view activity history and use the one-time restore feature, you’ll need to create the database first.", /* @__PURE__ */ jsx(Button, {
              variant: "secondary",
              onClick: () => setModalOpen(true),
              disabled: isRunning || csvData.length > 0,
              children: "Create Database"
            })]
          })
        })
      }), /* @__PURE__ */ jsxs(Layout, {
        children: [/* @__PURE__ */ jsx(Layout.Section, {
          variant: "oneThird",
          children: /* @__PURE__ */ jsxs(BlockStack, {
            gap: "200",
            children: [/* @__PURE__ */ jsx(LegacyCard, {
              title: "Configuration",
              sectioned: true,
              children: /* @__PURE__ */ jsx(Select, {
                label: "Resource Type",
                options: resourceOptions,
                onChange: setObjectType,
                value: objectType,
                disabled: isRunning || csvData.length > 0
              })
            }), /* @__PURE__ */ jsx(LegacyCard, {
              title: "Add Tags",
              sectioned: true,
              children: /* @__PURE__ */ jsx("form", {
                onSubmit: (e) => {
                  e.preventDefault();
                  handleTagAdd();
                },
                children: /* @__PURE__ */ jsxs(FormLayout, {
                  children: [/* @__PURE__ */ jsx(TextField, {
                    label: "Enter Tags",
                    value: tagInput,
                    onChange: setTagInput,
                    autoComplete: "off",
                    placeholder: "Enter tag (Min 2 chars)",
                    connectedRight: /* @__PURE__ */ jsx(Button, {
                      onClick: handleTagAdd,
                      disabled: !tagInput.trim(),
                      children: "Add"
                    }),
                    disabled: isRunning || csvData.length > 0,
                    helpText: "Press enter or click Add"
                  }), tags.length > 0 && /* @__PURE__ */ jsx(InlineStack, {
                    gap: "200",
                    wrap: true,
                    children: tags.map((tag) => /* @__PURE__ */ jsx("div", {
                      children: /* @__PURE__ */ jsx(Tag, {
                        onRemove: () => !isRunning && handleTagRemove(tag),
                        disabled: isRunning || csvData.length > 0,
                        children: tag
                      })
                    }, tag))
                  }), tags.length > 0 && !isRunning && !isFinished && /* @__PURE__ */ jsx(Button, {
                    variant: "plain",
                    tone: "critical",
                    onClick: resetAll,
                    children: "Clear All Tags"
                  })]
                })
              })
            })]
          })
        }), /* @__PURE__ */ jsx(Layout.Section, {
          children: /* @__PURE__ */ jsxs(BlockStack, {
            gap: "200",
            children: [alert.active && /* @__PURE__ */ jsx(Banner, {
              title: alert.title,
              tone: alert.tone,
              onDismiss: () => setAlert((prev) => ({
                ...prev,
                active: false
              })),
              children: /* @__PURE__ */ jsx("p", {
                children: alert.message
              })
            }), tags.length === 0 && !isFinished && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsx(EmptyState, {
                heading: "Ready to Add Tags",
                image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
                children: /* @__PURE__ */ jsx("p", {
                  children: "Enter tags on the left to begin configuring your bulk update."
                })
              })
            }), tags.length > 0 && !isFinished && /* @__PURE__ */ jsx(LegacyCard, {
              title: "Import Data",
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                gap: "400",
                children: [/* @__PURE__ */ jsxs(BlockStack, {
                  gap: "200",
                  children: [/* @__PURE__ */ jsx(ChoiceList, {
                    title: "Match resources by",
                    choices: matchOptions,
                    selected: [specificField],
                    onChange: (val) => setSpecificField(val[0]),
                    disabled: isRunning
                  }), /* @__PURE__ */ jsx(Button, {
                    variant: "plain",
                    onClick: handleDownloadTemplate,
                    disabled: isRunning,
                    children: "Download Sample CSV"
                  })]
                }), /* @__PURE__ */ jsx(DropZone, {
                  onDrop: handleCsvInput,
                  accept: ".csv",
                  allowMultiple: false,
                  disabled: isRunning,
                  children: file ? /* @__PURE__ */ jsx(DropZone.FileUpload, {
                    actionTitle: "Replace file"
                  }) : /* @__PURE__ */ jsx(DropZone.FileUpload, {
                    actionTitle: "Add file"
                  })
                }), file && /* @__PURE__ */ jsxs(Text, {
                  as: "p",
                  tone: "success",
                  children: [file.name, " — ", csvData.length, " records loaded. ", /* @__PURE__ */ jsx(Button, {
                    variant: "plain",
                    onClick: () => {
                      setFile(null);
                      setCsvData([]);
                    },
                    disabled: isRunning,
                    children: "Remove"
                  })]
                }), /* @__PURE__ */ jsx(Text, {
                  as: "p",
                  tone: "subdued",
                  children: "Only 5000 records will add at a time"
                }), isRunning && /* @__PURE__ */ jsxs(BlockStack, {
                  gap: "200",
                  children: [/* @__PURE__ */ jsx(ProgressBar, {
                    progress,
                    tone: "primary"
                  }), /* @__PURE__ */ jsxs(Text, {
                    as: "p",
                    tone: "subdued",
                    alignment: "center",
                    children: [progress, "%"]
                  })]
                }), /* @__PURE__ */ jsx(Button, {
                  variant: "primary",
                  onClick: () => setPreviewModalOpen(true),
                  disabled: !csvData.length || isRunning,
                  loading: isRunning,
                  fullWidth: true,
                  children: isRunning ? "Processing..." : "Run Bulk Update"
                })]
              })
            }), isFinished && /* @__PURE__ */ jsx(LegacyCard, {
              sectioned: true,
              children: /* @__PURE__ */ jsxs(BlockStack, {
                align: "center",
                inlineAlign: "center",
                gap: "500",
                children: [/* @__PURE__ */ jsx(Badge, {
                  tone: "success",
                  size: "large",
                  children: "Operation Complete"
                }), /* @__PURE__ */ jsxs(Text, {
                  as: "h2",
                  variant: "headingLg",
                  children: ["Successfully processed ", results.length, " items."]
                }), /* @__PURE__ */ jsxs(InlineStack, {
                  gap: "300",
                  children: [/* @__PURE__ */ jsx(Button, {
                    onClick: downloadResults,
                    variant: "primary",
                    children: "Download Results"
                  }), /* @__PURE__ */ jsx(Button, {
                    onClick: resetAll,
                    children: "Clear"
                  })]
                })]
              })
            }), results.length > 0 && /* @__PURE__ */ jsx(LegacyCard, {
              children: /* @__PURE__ */ jsx("div", {
                style: {
                  maxHeight: "250px",
                  overflowY: "auto"
                },
                children: /* @__PURE__ */ jsx(IndexTable, {
                  resourceName: {
                    singular: "result",
                    plural: "results"
                  },
                  itemCount: results.length,
                  headings: [{
                    title: "#"
                  }, {
                    title: "ID"
                  }, {
                    title: "Status"
                  }, {
                    title: "Error"
                  }],
                  selectable: false,
                  children: results.map(({
                    id,
                    success: success2,
                    errors,
                    index
                  }, i) => /* @__PURE__ */ jsxs(IndexTable.Row, {
                    id: id || i.toString(),
                    position: i,
                    children: [/* @__PURE__ */ jsx(IndexTable.Cell, {
                      children: (index ?? 0) + 1
                    }), /* @__PURE__ */ jsx(IndexTable.Cell, {
                      children: id
                    }), /* @__PURE__ */ jsx(IndexTable.Cell, {
                      children: /* @__PURE__ */ jsx(Badge, {
                        tone: success2 ? "success" : "critical",
                        children: success2 ? "Success" : "Failed"
                      })
                    }), /* @__PURE__ */ jsx(IndexTable.Cell, {
                      children: errors && errors.length > 0 ? errors.map((e) => e.message).join(", ") : "-"
                    })]
                  }, i))
                })
              })
            })]
          })
        })]
      })]
    }), /* @__PURE__ */ jsx(CsvPreviewModal, {
      open: previewModalOpen,
      onClose: () => setPreviewModalOpen(false),
      onConfirm: () => {
        setPreviewModalOpen(false);
        handleRun();
      },
      data: rawCsvData,
      title: "Ready to Add Tags?",
      confirmText: "Add Tags",
      destructive: false,
      confirmationMessage: `You are ready to add ${tags.length} tag's to ${csvData.length} ${csvData.length == 1 ? objectType : `${objectType}'s`} from your CSV.`
    }), /* @__PURE__ */ jsx(Modal, {
      open: confirmModalOpen,
      onClose: () => setConfirmModalOpen(false),
      title: "Ready to Add Tags?",
      primaryAction: {
        content: "Add Tags",
        onAction: handleRun
      },
      secondaryActions: [{
        content: "Cancel",
        onAction: () => setConfirmModalOpen(false)
      }],
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsxs(Text, {
          as: "p",
          children: ["You are ready to add ", tags.length, " tag's to ", csvData.length, " resource's from your CSV."]
        })
      })
    }), /* @__PURE__ */ jsx(Modal, {
      open: modalOpen,
      onClose: () => setModalOpen(false),
      title: "Create Database",
      primaryAction: {
        content: "Yes, Create",
        onAction: createDatabase,
        loading: isSubmitting
      },
      secondaryActions: [{
        content: "Maybe Later",
        onAction: () => setModalOpen(false)
      }],
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsxs(Text, {
          as: "p",
          children: ["Creating a metaobject named", " ", /* @__PURE__ */ jsx(Text, {
            as: "span",
            fontWeight: "bold",
            children: "“Tag Metafield App Database”"
          }), " ", "to store your app activity history. Would you like to continue?"]
        })
      })
    }), /* @__PURE__ */ jsx(Modal, {
      open: showSuccess,
      onClose: () => setShowSuccess(false),
      title: "Database Created Successfully",
      primaryAction: {
        content: "Close",
        onAction: () => setShowSuccess(false)
      },
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsx(Text, {
          as: "p",
          children: "Your database has been created successfully. You can now track and view all history."
        })
      })
    }), /* @__PURE__ */ jsx(AddTagsInstructionsModal, {
      open: instructionsOpen,
      onClose: () => setInstructionsOpen(false)
    })]
  });
});
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: app_addTags,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
function LogsTable({ logs, openRow, setOpenRow, handleRestore, isLoading, onNext, onPrev, hasNext, hasPrev, isDbCreated, onCreateDb }) {
  const resourceName = {
    singular: "log",
    plural: "logs"
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(logs);
  if (isLoading) {
    return /* @__PURE__ */ jsx(LegacyCard, { sectioned: true, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
      /* @__PURE__ */ jsx(Spinner, { size: "large" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(Text, { as: "p", variant: "bodyMd", tone: "subdued", children: "Loading History..." }) })
    ] }) });
  }
  if (!isDbCreated) {
    return /* @__PURE__ */ jsx(LegacyCard, { sectioned: true, children: /* @__PURE__ */ jsx(
      EmptyState,
      {
        heading: "Database Required",
        action: {
          content: "Create Database",
          onAction: onCreateDb
        },
        image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
        children: /* @__PURE__ */ jsx("p", { children: "A database is required to track your history and enable restore functionality. Please create one to continue." })
      }
    ) });
  }
  if (!logs || logs.length === 0) {
    return /* @__PURE__ */ jsx(LegacyCard, { sectioned: true, children: /* @__PURE__ */ jsx(
      EmptyState,
      {
        heading: "No activity yet",
        image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
        children: /* @__PURE__ */ jsx("p", { children: "Your bulk operation history and restore points will appear here once you perform some actions." })
      }
    ) });
  }
  const rowMarkup = logs.map(
    (log, index) => /* @__PURE__ */ jsxs(
      IndexTable.Row,
      {
        id: log.id,
        selected: selectedResources.includes(log.id),
        position: index,
        children: [
          /* @__PURE__ */ jsx(IndexTable.Cell, { children: /* @__PURE__ */ jsxs(InlineStack, { gap: "300", align: "start", blockAlign: "center", children: [
            /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodyMd", fontWeight: "bold", children: log.operation }),
            /* @__PURE__ */ jsx(Badge, { tone: "info", progress: "complete", children: log.objectType })
          ] }) }),
          /* @__PURE__ */ jsx(IndexTable.Cell, { children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "plain",
              onClick: () => setOpenRow(index),
              icon: ViewIcon,
              children: "View Details"
            }
          ) }),
          /* @__PURE__ */ jsx(IndexTable.Cell, { children: /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => handleRestore(log),
              disabled: !log.restore,
              icon: RotateLeftIcon,
              variant: "primary",
              children: "Undo"
            }
          ) }),
          /* @__PURE__ */ jsx(IndexTable.Cell, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "050", align: "end", children: [
            /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodySm", alignment: "end", children: new Date(log.time).toLocaleDateString() }),
            /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodyXs", tone: "subdued", alignment: "end", children: new Date(log.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
          ] }) })
        ]
      },
      log.id
    )
  );
  const currentLog = openRow !== null ? logs[openRow] : null;
  return /* @__PURE__ */ jsxs(LegacyCard, { children: [
    /* @__PURE__ */ jsx(
      IndexTable,
      {
        resourceName,
        itemCount: logs.length,
        selectedItemsCount: allResourcesSelected ? "All" : selectedResources.length,
        onSelectionChange: handleSelectionChange,
        headings: [
          // { title: 'User' },
          { title: "Operation" },
          { title: "Details" },
          { title: "Action" },
          { title: "Timestamp", alignment: "end" }
        ],
        selectable: false,
        children: rowMarkup
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-4 border-t border-gray-200", children: /* @__PURE__ */ jsx(
      Pagination,
      {
        hasPrevious: hasPrev,
        onPrevious: onPrev,
        hasNext,
        onNext
      }
    ) }),
    currentLog && /* @__PURE__ */ jsx(
      Modal,
      {
        open: openRow !== null,
        onClose: () => setOpenRow(null),
        title: `Operation Details - Total [${currentLog.value.length}]`,
        size: "large",
        children: /* @__PURE__ */ jsx(Modal.Section, { children: /* @__PURE__ */ jsx(LogDetailsContent, { log: currentLog }) })
      }
    )
  ] });
}
function LogDetailsContent({ log }) {
  return /* @__PURE__ */ jsx(BlockStack, { gap: "200", children: /* @__PURE__ */ jsx(Scrollable, { shadow: true, style: { maxHeight: "400px" }, children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left border-collapse", children: [
    /* @__PURE__ */ jsx("thead", { className: "bg-white sticky top-0 shadow-sm z-10", children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "px-4 py-2 font-semibold text-gray-600 border-b border-gray-200 bg-white", children: "Resource ID" }),
      log.operation === "Tags-removed" || log.operation === "Tags-Added" ? /* @__PURE__ */ jsx("th", { className: "px-4 py-2 font-semibold text-gray-600 border-b border-gray-200 bg-white", children: log.operation === "Tags-Added" ? "Tags Added" : "Tags Removed" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 font-semibold text-gray-600 border-b border-gray-200 bg-white", children: "Key" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 font-semibold text-gray-600 border-b border-gray-200 bg-white", children: "Value" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: log.value.map((v, i) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h;
      return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono text-blue-600 text-xs", children: v.id }),
        log.operation === "Tags-removed" || log.operation === "Tags-Added" ? /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: (_b = log.operation === "Tags-removed" ? v.removedTags : (_a2 = v.tagList) == null ? void 0 : _a2.split(",")) == null ? void 0 : _b.map((tag, idx) => /* @__PURE__ */ jsx(
          Badge,
          {
            tone: log.operation === "Tags-removed" ? "critical" : "success",
            children: tag.trim()
          },
          idx
        )) }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs(BlockStack, { gap: "050", children: [
            /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodySm", fontWeight: "medium", children: (_c = v.data) == null ? void 0 : _c.key }),
            /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodyXs", tone: "subdued", children: typeof ((_d = v.data) == null ? void 0 : _d.type) === "object" ? (_f = (_e = v.data) == null ? void 0 : _e.type) == null ? void 0 : _f.name : (_g = v.data) == null ? void 0 : _g.type })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("pre", { className: "whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded border border-gray-200 text-gray-700 font-mono", children: ((_h = v.data) == null ? void 0 : _h.value) || "—" }) })
        ] })
      ] }, i);
    }) })
  ] }) }) });
}
function Recent({ logs, openRow, setOpenRow, handleRestore, isLoading }) {
  const resourceName = {
    singular: "log",
    plural: "logs"
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(logs);
  if (isLoading) {
    return /* @__PURE__ */ jsx(LegacyCard, { sectioned: true, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
      /* @__PURE__ */ jsx(Spinner, { size: "large" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(Text, { as: "p", variant: "bodyMd", tone: "subdued", children: "Loading Recent activities..." }) })
    ] }) });
  }
  if (!logs || logs.length === 0) {
    return /* @__PURE__ */ jsx(LegacyCard, { sectioned: true, children: /* @__PURE__ */ jsx(
      EmptyState,
      {
        heading: "No activity yet",
        image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
        children: /* @__PURE__ */ jsx("p", { children: "Your bulk operation history and restore points will appear here once you perform some actions." })
      }
    ) });
  }
  const rowMarkup = logs.map(
    (log, index) => /* @__PURE__ */ jsxs(
      IndexTable.Row,
      {
        id: log.id,
        selected: selectedResources.includes(log.id),
        position: index,
        children: [
          /* @__PURE__ */ jsx(IndexTable.Cell, { children: /* @__PURE__ */ jsxs(InlineStack, { gap: "300", align: "start", blockAlign: "center", children: [
            /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodyMd", fontWeight: "bold", children: log.operation }),
            /* @__PURE__ */ jsx(Badge, { tone: "info", progress: "complete", children: log.objectType })
          ] }) }),
          /* @__PURE__ */ jsx(IndexTable.Cell, { children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "plain",
              onClick: () => setOpenRow(index),
              icon: ViewIcon,
              children: "View Details"
            }
          ) }),
          /* @__PURE__ */ jsx(IndexTable.Cell, { children: /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => handleRestore(log),
              disabled: !log.restore,
              icon: RotateLeftIcon,
              variant: "primary",
              children: "Undo"
            }
          ) }),
          /* @__PURE__ */ jsx(IndexTable.Cell, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "050", align: "end", children: [
            /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodySm", alignment: "end", children: new Date(log.time).toLocaleDateString() }),
            /* @__PURE__ */ jsx(Text, { as: "span", variant: "bodyXs", tone: "subdued", alignment: "end", children: new Date(log.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
          ] }) })
        ]
      },
      log.id
    )
  );
  const currentLog = openRow !== null ? logs[openRow] : null;
  return /* @__PURE__ */ jsxs(LegacyCard, { children: [
    /* @__PURE__ */ jsx(
      IndexTable,
      {
        resourceName,
        itemCount: logs.length,
        selectedItemsCount: allResourcesSelected ? "All" : selectedResources.length,
        onSelectionChange: handleSelectionChange,
        headings: [
          // { title: 'User' },
          { title: "Operation" },
          { title: "Details" },
          { title: "Action" },
          { title: "Timestamp", alignment: "end" }
        ],
        selectable: false,
        children: rowMarkup
      }
    ),
    currentLog && /* @__PURE__ */ jsx(
      Modal,
      {
        open: openRow !== null,
        onClose: () => setOpenRow(null),
        title: `Operation Details - Total [${currentLog.value.length}]`,
        size: "large",
        children: /* @__PURE__ */ jsx(Modal.Section, { children: /* @__PURE__ */ jsx(LogDetailsContent, { log: currentLog }) })
      }
    )
  ] });
}
const loader$2 = async ({
  request
}) => {
  await authenticate.admin(request);
  return {
    apiKey: process.env.SHOPIFY_API_KEY || ""
  };
};
const app_history = UNSAFE_withComponentProps(function LogsPage() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [openRow, setOpenRow] = useState(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restoreTotal, setRestoreTotal] = useState(0);
  const [restoreCompleted, setRestoreCompleted] = useState(0);
  const [globalId, setGlobalId] = useState(null);
  const [restore, setRestore] = useState(true);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [iscreateDB, setIscreateDB] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null
  });
  const [lastFetchParams, setLastFetchParams] = useState({
    cursor: null,
    direction: "next"
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    logToRestore: null
  });
  function createDatabase() {
    fetcher.submit(
      {},
      // no body needed
      {
        method: "post",
        action: "/api/metaCreate/db"
      }
    );
  }
  const handleCreateDatabaseClick = () => {
    setModalState({
      isOpen: true,
      title: "Create Database",
      message: /* @__PURE__ */ jsxs("span", {
        children: ["Creating a metaobject named", " ", /* @__PURE__ */ jsx("span", {
          className: "font-bold",
          children: '"Tag Metafield App Database"'
        }), " to store your app activity history. Would you like to continue?"]
      }),
      logToRestore: null
      // Not a restore action
    });
  };
  useEffect(() => {
    if (!restore) return;
    const run = async () => {
      try {
        await fetch("/api/timeout/db", {
          method: "POST"
        });
        const {
          cursor,
          direction
        } = lastFetchParams;
        const url = cursor ? `/api/check/db?cursor=${cursor}&direction=${direction}` : "/api/check/db";
        fetcher.load(url);
      } catch (error) {
        console.error("Restore flow failed:", error);
      }
    };
    run();
  }, [restore, lastFetchParams]);
  useEffect(() => {
    if (!isRestoring) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const blockNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", blockNavigation);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", blockNavigation);
    };
  }, [isRestoring]);
  useEffect(() => {
    const runRestore = async () => {
      const shouldRunRestore = restoreCompleted >= restoreTotal && isRestoring;
      if (!shouldRunRestore) return;
      const formData = new FormData();
      formData.append("rowId", globalId || "");
      const response = await fetch("/api/update-restore/db", {
        method: "POST",
        body: formData
      });
      const res = await response.json();
      if (res.success) {
        setRestore(true);
      }
    };
    runRestore();
  }, [restoreCompleted, restoreTotal]);
  useEffect(() => {
    var _a2, _b, _c;
    if (fetcher.state !== "idle" || !fetcher.data) return;
    if (!((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.successdb)) {
      setIscreateDB(false);
    } else {
      setIscreateDB(true);
    }
    setRestore(false);
    setLogs((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.database);
    if ((_c = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _c.pageInfo) {
      setPageInfo(fetcher.data.pageInfo);
    }
    setIsLoading(false);
    setModalState((prev) => ({
      ...prev,
      isOpen: false
    }));
    setIsSubmitting(false);
  }, [fetcher.state, fetcher.data]);
  const handleNextPage = () => {
    if (pageInfo.hasNextPage) {
      setOpenRow(null);
      setIsLoading(true);
      const params = {
        cursor: pageInfo.endCursor,
        direction: "next"
      };
      setLastFetchParams(params);
      fetcher.load(`/api/check/db?cursor=${params.cursor}&direction=${params.direction}`);
    }
  };
  const handlePrevPage = () => {
    if (pageInfo.hasPreviousPage) {
      setOpenRow(null);
      setIsLoading(true);
      const params = {
        cursor: pageInfo.startCursor,
        direction: "prev"
      };
      setLastFetchParams(params);
      fetcher.load(`/api/check/db?cursor=${params.cursor}&direction=${params.direction}`);
    }
  };
  const handleRestoreClick = (log) => {
    let message = "Are you sure you want to restore the removed data?";
    if (log.operation === "Tags-removed") {
      message = "Are you sure you want to restore the removed tags?";
    } else if (log.operation === "Tags-Added") {
      message = "Are you sure you want to remove the added tags?";
    } else if (log.operation === "Metafield-removed") {
      message = "Are you sure you want to restore the removed metafields?";
    } else if (log.operation === "Metafield-updated") {
      message = "Are you sure you want to revert the metafield updates?";
    }
    setModalState({
      isOpen: true,
      title: "Confirm Restore",
      message,
      logToRestore: log
    });
    setGlobalId(log.id);
  };
  const handleConfirmAction = async () => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    setIsSubmitting(true);
    const {
      title
    } = modalState;
    if (title === "Create Database") {
      createDatabase();
      return;
    }
    const log = modalState.logToRestore;
    if (!log) {
      setIsSubmitting(false);
      setModalState({
        ...modalState,
        isOpen: false
      });
      return;
    }
    const operation = log.operation;
    const objectType = log.objectType;
    const rows = operation === "Tags-removed" ? log.value.filter((v) => {
      var _a3;
      return ((_a3 = v.removedTags) == null ? void 0 : _a3.length) > 0;
    }) : log.value || [];
    if (!rows.length) {
      setIsSubmitting(false);
      return;
    }
    setRestoreCompleted(0);
    setRestoreTotal(rows.length);
    setIsRestoring(true);
    setIsSubmitting(false);
    for (let i = 0; i < rows.length; i++) {
      const v = rows[i];
      let payload = {
        id: v.id,
        objectType,
        operation
      };
      if (operation === "Tags-removed") {
        payload.tags = v.removedTags;
      } else if (operation === "Tags-Added") {
        payload.tags = v.tagList ? v.tagList.split(",").map((t) => t.trim()) : [];
      } else if (operation === "Metafield-removed") {
        payload.namespace = v.namespace || ((_a2 = v.data) == null ? void 0 : _a2.namespace);
        payload.key = v.key || ((_b = v.data) == null ? void 0 : _b.key);
        payload.type = v.type || ((_c = v.data) == null ? void 0 : _c.type);
        payload.value = v.value || ((_d = v.data) == null ? void 0 : _d.value);
      } else if (operation === "Metafield-updated") {
        payload.namespace = v.namespace || ((_e = v.data) == null ? void 0 : _e.namespace);
        payload.key = v.key || ((_f = v.data) == null ? void 0 : _f.key);
        payload.type = v.type || ((_g = v.data) == null ? void 0 : _g.type);
        payload.value = v.value || ((_h = v.data) == null ? void 0 : _h.value);
      }
      const formData = new FormData();
      formData.append("rows", JSON.stringify([payload]));
      const res = await fetch("/api/revert/db", {
        method: "POST",
        body: formData
      }).then((r) => r.json());
      if (res.success) {
        setRestoreCompleted((prev) => prev + 1);
      }
    }
  };
  return /* @__PURE__ */ jsxs(Page, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col space-y-0.5 mb-5 rounded-sm",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center space-x-2",
        children: [/* @__PURE__ */ jsx("button", {
          onClick: () => navigate("/app"),
          className: "flex items-center cursor-pointer justify-center text-[#303030] hover:opacity-70 transition-opacity focus:outline-none",
          "aria-label": "Go to Home",
          children: /* @__PURE__ */ jsx(Icon, {
            source: HomeIcon
          })
        }), /* @__PURE__ */ jsx("span", {
          className: "h-5 w-px bg-[#D2D2D2]",
          "aria-hidden": "true"
        }), /* @__PURE__ */ jsx("div", {
          className: "text-xl font-bold leading-tight",
          children: "Activity History"
        }), /* @__PURE__ */ jsx("div", {
          className: "ml-auto",
          children: /* @__PURE__ */ jsx(Box, {
            padding: "100",
            background: "bg-surface-warning",
            borderRadius: "200",
            width: "fit-content",
            children: /* @__PURE__ */ jsxs(InlineStack, {
              gap: "200",
              align: "start",
              blockAlign: "center",
              children: [/* @__PURE__ */ jsx(Icon, {
                source: AlertTriangleIcon,
                tone: "warning"
              }), /* @__PURE__ */ jsx(Text, {
                as: "span",
                variant: "bodySm",
                tone: "caution",
                fontWeight: "bold",
                children: "History expires in 2 Days"
              })]
            })
          })
        })]
      }), /* @__PURE__ */ jsx(Text, {
        as: "p",
        variant: "bodySm",
        tone: "subdued",
        children: "Review past changes and perform a one-time undo to revert recent actions."
      })]
    }), /* @__PURE__ */ jsx(Layout, {
      children: /* @__PURE__ */ jsx(Layout.Section, {
        children: /* @__PURE__ */ jsx(BlockStack, {
          gap: "400",
          children: /* @__PURE__ */ jsx(LogsTable, {
            logs,
            openRow,
            setOpenRow,
            handleRestore: handleRestoreClick,
            isLoading,
            onNext: handleNextPage,
            onPrev: handlePrevPage,
            hasNext: pageInfo.hasNextPage,
            hasPrev: pageInfo.hasPreviousPage,
            isDbCreated: iscreateDB,
            onCreateDb: handleCreateDatabaseClick
          })
        })
      })
    }), /* @__PURE__ */ jsx(Modal, {
      open: modalState.isOpen || isRestoring,
      onClose: () => {
        if (isRestoring && restoreCompleted < restoreTotal) return;
        if (isRestoring && restoreCompleted >= restoreTotal) {
          setIsRestoring(false);
          setModalState({
            ...modalState,
            isOpen: false
          });
          return;
        }
        setModalState({
          ...modalState,
          isOpen: false
        });
      },
      title: isRestoring ? restoreCompleted < restoreTotal ? "Restoring Data..." : "Restore Complete" : modalState.title || "Confirm Action",
      primaryAction: isRestoring ? restoreCompleted >= restoreTotal ? {
        content: "Done",
        onAction: () => {
          setIsRestoring(false);
          setModalState({
            ...modalState,
            isOpen: false
          });
        }
      } : void 0 : {
        content: modalState.title === "Create Database" ? "Yes, Create" : "Restore",
        onAction: handleConfirmAction,
        destructive: true,
        loading: isSubmitting
      },
      secondaryActions: isRestoring ? [] : [{
        content: modalState.title === "Create Database" ? "Maybe Later" : "Cancel",
        onAction: () => setModalState({
          ...modalState,
          isOpen: false
        })
      }],
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsxs(BlockStack, {
          gap: "400",
          children: [/* @__PURE__ */ jsx(Text, {
            as: "p",
            children: modalState.message
          }), isRestoring && /* @__PURE__ */ jsxs(BlockStack, {
            gap: "200",
            children: [/* @__PURE__ */ jsx(ProgressBar, {
              progress: restoreTotal > 0 ? restoreCompleted / restoreTotal * 100 : 0,
              tone: "highlight"
            }), /* @__PURE__ */ jsx(Text, {
              as: "p",
              tone: "subdued",
              children: restoreCompleted < restoreTotal ? `Restoring item ${restoreCompleted} of ${restoreTotal}` : `Successfully restored ${restoreTotal} items.`
            })]
          })]
        })
      })
    })]
  });
});
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: app_history,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({
  request
}) => {
  await authenticate.admin(request);
  return {
    apiKey: process.env.SHOPIFY_API_KEY || ""
  };
};
const app__index = UNSAFE_withComponentProps(function HomePage() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [openRow, setOpenRow] = useState(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restoreTotal, setRestoreTotal] = useState(0);
  const [restoreCompleted, setRestoreCompleted] = useState(0);
  const [globalId, setGlobalId] = useState(null);
  const [restore, setRestore] = useState(true);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    logToRestore: null
  });
  useEffect(() => {
    if (!restore) return;
    const run = async () => {
      try {
        await fetch("/api/timeout/db", {
          method: "POST"
        });
        const url = "/api/check/db?limit=4";
        fetcher.load(url);
      } catch (error) {
        console.error("Restore flow failed:", error);
      }
    };
    run();
  }, [restore]);
  useEffect(() => {
    const runRestore = async () => {
      const shouldRunRestore = restoreCompleted >= restoreTotal && isRestoring;
      if (!shouldRunRestore) return;
      const formData = new FormData();
      formData.append("rowId", globalId || "");
      const response = await fetch("/api/update-restore/db", {
        method: "POST",
        body: formData
      });
      const res = await response.json();
      if (res.success) {
        setRestore(true);
      }
    };
    runRestore();
  }, [restoreCompleted, restoreTotal]);
  useEffect(() => {
    var _a2;
    if (fetcher.state !== "idle" || !fetcher.data) return;
    setRestore(false);
    setLogs(((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.database) || []);
    setIsLoading(false);
    setModalState((prev) => ({
      ...prev,
      isOpen: false
    }));
    setIsSubmitting(false);
  }, [fetcher.state, fetcher.data]);
  const handleRestoreClick = (log) => {
    let message = "Are you sure you want to restore the removed data?";
    if (log.operation === "Tags-removed") {
      message = "Are you sure you want to restore the removed tags?";
    } else if (log.operation === "Tags-Added") {
      message = "Are you sure you want to remove the added tags?";
    } else if (log.operation === "Metafield-removed") {
      message = "Are you sure you want to restore the removed metafields?";
    } else if (log.operation === "Metafield-updated") {
      message = "Are you sure you want to revert the metafield updates?";
    }
    setModalState({
      isOpen: true,
      title: "Confirm Restore",
      message,
      logToRestore: log
    });
    setGlobalId(log.id);
  };
  const handleConfirmAction = async () => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    setIsSubmitting(true);
    const log = modalState.logToRestore;
    if (!log) {
      setIsSubmitting(false);
      setModalState({
        ...modalState,
        isOpen: false
      });
      return;
    }
    const operation = log.operation;
    const objectType = log.objectType;
    const rows = operation === "Tags-removed" ? log.value.filter((v) => {
      var _a3;
      return ((_a3 = v.removedTags) == null ? void 0 : _a3.length) > 0;
    }) : log.value || [];
    if (!rows.length) {
      setIsSubmitting(false);
      return;
    }
    setRestoreCompleted(0);
    setRestoreTotal(rows.length);
    setIsRestoring(true);
    setIsSubmitting(false);
    for (let i = 0; i < rows.length; i++) {
      const v = rows[i];
      let payload = {
        id: v.id,
        objectType,
        operation
      };
      if (operation === "Tags-removed") {
        payload.tags = v.removedTags;
      } else if (operation === "Tags-Added") {
        payload.tags = v.tagList ? v.tagList.split(",").map((t) => t.trim()) : [];
      } else if (operation === "Metafield-removed") {
        payload.namespace = v.namespace || ((_a2 = v.data) == null ? void 0 : _a2.namespace);
        payload.key = v.key || ((_b = v.data) == null ? void 0 : _b.key);
        payload.type = v.type || ((_c = v.data) == null ? void 0 : _c.type);
        payload.value = v.value || ((_d = v.data) == null ? void 0 : _d.value);
      } else if (operation === "Metafield-updated") {
        payload.namespace = v.namespace || ((_e = v.data) == null ? void 0 : _e.namespace);
        payload.key = v.key || ((_f = v.data) == null ? void 0 : _f.key);
        payload.type = v.type || ((_g = v.data) == null ? void 0 : _g.type);
        payload.value = v.value || ((_h = v.data) == null ? void 0 : _h.value);
      }
      const formData = new FormData();
      formData.append("rows", JSON.stringify([payload]));
      const res = await fetch("/api/revert/db", {
        method: "POST",
        body: formData
      }).then((r) => r.json());
      if (res.success) {
        setRestoreCompleted((prev) => prev + 1);
      }
    }
  };
  const modules = [{
    title: "Add Tags",
    desc: "Quickly append multiple tags to products, customers, blogposts, or orders using a simple CSV identifier list.",
    route: "/app/add-tags",
    icon: DiscountIcon,
    action: "Add Tags",
    tone: "success"
  }, {
    title: "Remove Tags",
    desc: "Search for tags by condition and remove them from your entire store or specific items via CSV upload.",
    route: "/app/remove-tags",
    icon: DeleteIcon,
    action: "Remove Tags",
    tone: "critical"
  }, {
    title: "Metafield Manager",
    desc: "Manage metafield definitions and values. Clear data globally or perform bulk updates using CSV files.",
    route: "/app/metafield-manage",
    icon: DatabaseIcon,
    action: "Manage Metafields",
    tone: "highlight"
  }];
  return /* @__PURE__ */ jsxs(Page, {
    title: "Tag Metafield Manager",
    subtitle: "The all-in-one toolkit for bulk store data manipulation.",
    secondaryActions: [{
      content: "History",
      icon: ClockIcon,
      onAction: () => navigate("/app/history")
    }, {
      content: "FAQ",
      icon: QuestionCircleIcon,
      onAction: () => navigate("/app/faq")
    }],
    children: [/* @__PURE__ */ jsx(BlockStack, {
      gap: "500",
      children: /* @__PURE__ */ jsxs(Layout, {
        children: [/* @__PURE__ */ jsx(Layout.Section, {
          children: /* @__PURE__ */ jsx(InlineGrid, {
            columns: {
              xs: 1,
              md: 3
            },
            gap: "400",
            children: modules.map((module, index) => /* @__PURE__ */ jsx(Card, {
              roundedAbove: "sm",
              children: /* @__PURE__ */ jsxs(BlockStack, {
                gap: "400",
                children: [/* @__PURE__ */ jsx(Box, {
                  background: "bg-surface-secondary",
                  padding: "300",
                  borderRadius: "200",
                  width: "40px",
                  children: /* @__PURE__ */ jsx(Icon, {
                    source: module.icon,
                    tone: module.tone
                  })
                }), /* @__PURE__ */ jsxs(BlockStack, {
                  gap: "200",
                  children: [/* @__PURE__ */ jsx(Text, {
                    as: "h2",
                    variant: "headingMd",
                    children: module.title
                  }), /* @__PURE__ */ jsx(Box, {
                    minHeight: "64px",
                    children: /* @__PURE__ */ jsx(Text, {
                      as: "p",
                      variant: "bodyMd",
                      tone: "subdued",
                      children: module.desc
                    })
                  })]
                }), /* @__PURE__ */ jsx(Button, {
                  fullWidth: true,
                  variant: "primary",
                  onClick: () => navigate(module.route),
                  children: module.action
                })]
              })
            }, index))
          })
        }), /* @__PURE__ */ jsx(Layout.Section, {
          children: /* @__PURE__ */ jsx(Banner, {
            title: "Export your store data",
            tone: "info",
            action: {
              content: "Export Data",
              onAction: () => navigate("/app/export-data")
            },
            children: /* @__PURE__ */ jsx("p", {
              children: "Export your store data as CSV to review and prepare changes before running any operation."
            })
          })
        }), logs.length > 0 && /* @__PURE__ */ jsx(Layout.Section, {
          children: /* @__PURE__ */ jsxs(BlockStack, {
            gap: "400",
            children: [/* @__PURE__ */ jsx(InlineStack, {
              align: "space-between",
              blockAlign: "center",
              children: /* @__PURE__ */ jsxs(InlineStack, {
                gap: "200",
                blockAlign: "center",
                children: [/* @__PURE__ */ jsx(Box, {
                  background: "bg-surface-info-subdued",
                  padding: "200",
                  borderRadius: "200",
                  children: /* @__PURE__ */ jsx(Icon, {
                    source: ClockIcon,
                    tone: "info"
                  })
                }), /* @__PURE__ */ jsxs(BlockStack, {
                  gap: "050",
                  children: [/* @__PURE__ */ jsx(Text, {
                    as: "h2",
                    variant: "headingMd",
                    children: "Recent Activity"
                  }), /* @__PURE__ */ jsx(Text, {
                    as: "p",
                    variant: "bodySm",
                    tone: "subdued",
                    children: "Check what you did recently."
                  })]
                })]
              })
            }), /* @__PURE__ */ jsx(Recent, {
              logs,
              openRow,
              setOpenRow,
              handleRestore: handleRestoreClick,
              isLoading
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx(Modal, {
      open: modalState.isOpen || isRestoring,
      onClose: () => {
        if (isRestoring && restoreCompleted < restoreTotal) return;
        if (isRestoring && restoreCompleted >= restoreTotal) {
          setIsRestoring(false);
          setModalState({
            ...modalState,
            isOpen: false
          });
          return;
        }
        setModalState({
          ...modalState,
          isOpen: false
        });
      },
      title: isRestoring ? restoreCompleted < restoreTotal ? "Restoring Data..." : "Restore Complete" : modalState.title || "Confirm Action",
      primaryAction: isRestoring ? restoreCompleted >= restoreTotal ? {
        content: "Done",
        onAction: () => {
          setIsRestoring(false);
          setModalState({
            ...modalState,
            isOpen: false
          });
        }
      } : void 0 : {
        content: "Restore",
        onAction: handleConfirmAction,
        destructive: true,
        loading: isSubmitting
      },
      children: /* @__PURE__ */ jsx(Modal.Section, {
        children: /* @__PURE__ */ jsxs(BlockStack, {
          gap: "400",
          children: [/* @__PURE__ */ jsx(Text, {
            as: "p",
            children: modalState.message
          }), isRestoring && /* @__PURE__ */ jsxs(BlockStack, {
            gap: "200",
            children: [/* @__PURE__ */ jsx(ProgressBar, {
              progress: restoreTotal > 0 ? restoreCompleted / restoreTotal * 100 : 0,
              tone: "highlight"
            }), /* @__PURE__ */ jsx(Text, {
              as: "p",
              tone: "subdued",
              children: restoreCompleted < restoreTotal ? `Restoring item ${restoreCompleted} of ${restoreTotal}` : `Successfully restored ${restoreTotal} items.`
            })]
          })]
        })
      })
    })]
  });
});
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: app__index,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({
  request
}) => {
  await authenticate.admin(request);
  return {
    apiKey: process.env.SHOPIFY_API_KEY || ""
  };
};
const FaqItem = ({
  question,
  answer,
  icon: Icon2,
  isOpen,
  onClick
}) => {
  return /* @__PURE__ */ jsxs("div", {
    className: `bg-white rounded-lg border transition-all duration-300 overflow-hidden ${isOpen ? "border-black shadow-md ring-1 ring-black/5" : "border-[#e0e2e4] hover:border-black/30 hover:shadow-sm"}`,
    children: [/* @__PURE__ */ jsxs("button", {
      onClick,
      className: "w-full flex items-center justify-between p-3 text-left bg-white transition-colors cursor-pointer group",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-4",
        children: [Icon2 && /* @__PURE__ */ jsx("div", {
          className: `p-2 rounded-md border shrink-0 transition-all ${isOpen ? "bg-black text-white border-black shadow-sm" : "bg-gray-50 border-gray-100 text-gray-500 group-hover:text-black group-hover:border-gray-200"}`,
          children: /* @__PURE__ */ jsx(Icon2, {
            size: 16,
            strokeWidth: 2
          })
        }), /* @__PURE__ */ jsx("span", {
          className: `font-semibold text-[14px] transition-colors ${isOpen ? "text-black" : "text-[#202223] group-hover:text-black"}`,
          children: question
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: `ml-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-black" : "group-hover:text-gray-600"}`,
        children: /* @__PURE__ */ jsx(ChevronDown, {
          size: 18
        })
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: `transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`,
      children: /* @__PURE__ */ jsx("div", {
        className: "px-4 pb-4 pt-0 text-sm text-gray-600 leading-relaxed",
        children: /* @__PURE__ */ jsx("div", {
          className: "pt-4 border-t border-gray-100",
          children: answer
        })
      })
    })]
  });
};
const app_faq = UNSAFE_withComponentProps(function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqs = [{
    question: "What is Tag Metafield Manager?",
    icon: HelpCircle,
    answer: /* @__PURE__ */ jsxs("div", {
      className: "space-y-3",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "text-sm text-gray-800",
        children: [/* @__PURE__ */ jsx("strong", {
          children: "Tag Metafield Manager"
        }), " is a Shopify embedded app that lets you bulk add, remove, and update ", /* @__PURE__ */ jsx("strong", {
          children: "tags and metafields"
        }), " across your store using CSV files."]
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-xs text-gray-600",
        children: ["Data is stored securely using ", /* @__PURE__ */ jsx("strong", {
          children: "Shopify Metaobjects"
        }), ". No personal or sensitive information is stored on external servers."]
      })]
    })
  }, {
    question: "How do Tag & Metafield operations work?",
    icon: Tag$1,
    answer: /* @__PURE__ */ jsxs("div", {
      className: "space-y-3",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-sm text-gray-800",
        children: "Tag and Metafield operations follow a simple and safe workflow:"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-gray-50 p-4 rounded-lg border border-gray-200",
        children: /* @__PURE__ */ jsxs("ol", {
          className: "list-decimal pl-4 space-y-2 text-sm text-gray-700",
          children: [/* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              children: "Identify:"
            }), " Use GID, SKU, Handle, Order name, or Email in your CSV."]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              children: "Action:"
            }), " Add, Remove (Specific or Global), Merge, or Replace values."]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              children: "Review:"
            }), " Download a ", /* @__PURE__ */ jsx("strong", {
              children: "Result Sheet"
            }), " after completion."]
          })]
        })
      })]
    })
  }, {
    question: "How are different Metafield types handled?",
    icon: Database,
    answer: /* @__PURE__ */ jsx("div", {
      className: "space-y-3",
      children: /* @__PURE__ */ jsxs("ul", {
        className: "space-y-2 text-sm text-gray-700",
        children: [/* @__PURE__ */ jsxs("li", {
          children: [/* @__PURE__ */ jsx("strong", {
            children: "Single-Value:"
          }), " Add or remove values via CSV, or remove globally."]
        }), /* @__PURE__ */ jsxs("li", {
          children: [/* @__PURE__ */ jsx("strong", {
            children: "List-Type:"
          }), " Choose to ", /* @__PURE__ */ jsx("strong", {
            children: "Merge"
          }), " (append) new values or", /* @__PURE__ */ jsx("strong", {
            children: " Replace"
          }), " the entire list."]
        }), /* @__PURE__ */ jsxs("li", {
          children: [/* @__PURE__ */ jsx("strong", {
            children: "File References:"
          }), " ", /* @__PURE__ */ jsx("span", {
            className: "text-red-600 font-medium",
            children: "Removal only"
          }), ". Uploads must be handled through Shopify Media."]
        })]
      })
    })
  }, {
    question: "Can I undo an operation?",
    icon: History,
    answer: /* @__PURE__ */ jsxs("div", {
      className: "space-y-3",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "text-sm text-gray-800",
        children: ["Yes. The app includes a secure ", /* @__PURE__ */ jsx("strong", {
          children: "History & Undo"
        }), " system."]
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid gap-2",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-2 text-sm bg-blue-50 p-2 rounded border border-blue-100",
          children: [/* @__PURE__ */ jsx(Clock, {
            className: "w-4 h-4 text-blue-600 shrink-0"
          }), /* @__PURE__ */ jsxs("span", {
            children: ["Operations are stored for ", /* @__PURE__ */ jsx("strong", {
              children: "48 hours"
            }), "."]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-2 text-sm bg-orange-50 p-2 rounded border border-orange-100",
          children: [/* @__PURE__ */ jsx(RotateCcw, {
            className: "w-4 h-4 text-orange-600 shrink-0"
          }), /* @__PURE__ */ jsxs("span", {
            children: ["Each operation can be undone ", /* @__PURE__ */ jsx("strong", {
              children: "only once"
            }), "."]
          })]
        })]
      })]
    })
  }, {
    question: "What are the usage limits?",
    icon: AlertCircle,
    answer: /* @__PURE__ */ jsxs("div", {
      className: "space-y-3",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm",
        children: [/* @__PURE__ */ jsx(FileText, {
          className: "w-5 h-5 text-gray-600 mt-0.5 shrink-0"
        }), /* @__PURE__ */ jsxs("p", {
          children: [/* @__PURE__ */ jsx("strong", {
            children: "CSV Limit:"
          }), " Maximum ", /* @__PURE__ */ jsx("strong", {
            children: "5,000 records"
          }), " per file. Larger datasets must be split."]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-start gap-3 bg-red-50 p-3 rounded-lg border border-red-100 text-sm",
        children: [/* @__PURE__ */ jsx(AlertCircle, {
          className: "w-5 h-5 text-red-600 mt-0.5 shrink-0"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-red-900 font-medium",
          children: [/* @__PURE__ */ jsx("strong", {
            children: "Important:"
          }), " Keep the app tab open. Refreshing, navigating away, or closing the tab will stop the operation."]
        })]
      })]
    })
  }, {
    question: "Can I export data for editing?",
    icon: Download,
    answer: /* @__PURE__ */ jsxs("div", {
      className: "space-y-2",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "text-sm text-gray-800",
        children: ["Yes. You can ", /* @__PURE__ */ jsx("strong", {
          children: "export store data"
        }), " from all Shopify resources, including user-created Metaobjects."]
      }), /* @__PURE__ */ jsx("p", {
        className: "text-xs text-gray-600",
        children: "Use exports to get accurate GIDs or identifiers, edit values in Excel or Sheets, and upload the CSV back for bulk updates."
      })]
    })
  }];
  return /* @__PURE__ */ jsxs(Page, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col space-y-1.5 mb-5 rounded-sm",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center space-x-2",
        children: [/* @__PURE__ */ jsx("button", {
          onClick: () => navigate("/app"),
          className: "flex items-center cursor-pointer justify-center text-[#303030] hover:opacity-70 transition-opacity focus:outline-none",
          "aria-label": "Go to Home",
          children: /* @__PURE__ */ jsx(Icon, {
            source: HomeIcon
          })
        }), /* @__PURE__ */ jsx("span", {
          className: "h-5 w-px bg-[#D2D2D2]",
          "aria-hidden": "true"
        }), /* @__PURE__ */ jsx("div", {
          className: "text-xl font-bold leading-tight",
          children: "Frequently Asked Questions"
        })]
      }), /* @__PURE__ */ jsxs(Text, {
        as: "p",
        variant: "bodySm",
        tone: "subdued",
        children: ["Everything you need to know about managing your store's data with", " ", /* @__PURE__ */ jsx("span", {
          className: "font-semibold text-black",
          children: "Tag MetaField Manager"
        }), "."]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "space-y-4",
      children: faqs.map((faq, index) => /* @__PURE__ */ jsx("div", {
        className: "transition-all duration-200 hover:translate-y-[-1px]",
        children: /* @__PURE__ */ jsx(FaqItem, {
          question: faq.question,
          answer: faq.answer,
          icon: faq.icon,
          isOpen: openIndex === index,
          onClick: () => toggleFaq(index)
        })
      }, index))
    })]
  });
});
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: app_faq,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CDvQ4Kyr.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js", "/assets/index-6YjgjBrM.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-B8KFreFk.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js", "/assets/index-6YjgjBrM.js"], "css": ["/assets/root-BQhtfyAy.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/webhooks.app.scopes_update": { "id": "routes/webhooks.app.scopes_update", "parentId": "root", "path": "webhooks/app/scopes_update", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/webhooks.app.scopes_update-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/webhooks.app.uninstalled": { "id": "routes/webhooks.app.uninstalled", "parentId": "root", "path": "webhooks/app/uninstalled", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/webhooks.app.uninstalled-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/api.update-restore.db": { "id": "routes/api.update-restore.db", "parentId": "root", "path": "api/update-restore/db", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/api.update-restore.db-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/api.metaCreate.db": { "id": "routes/api.metaCreate.db", "parentId": "root", "path": "api/metaCreate/db", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/api.metaCreate.db-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/api.timeout.db": { "id": "routes/api.timeout.db", "parentId": "root", "path": "api/timeout/db", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/api.timeout.db-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/api.revert.db": { "id": "routes/api.revert.db", "parentId": "root", "path": "api/revert/db", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/api.revert.db-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/api.check.db": { "id": "routes/api.check.db", "parentId": "root", "path": "api/check/db", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/api.check.db-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/api.add.db": { "id": "routes/api.add.db", "parentId": "root", "path": "api/add/db", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/api.add.db-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth.login": { "id": "routes/auth.login", "parentId": "root", "path": "auth/login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/route-DfGA-eHG.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js", "/assets/AppProxyProvider-DMlaIqi_.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/route-2KzObdob.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth.$": { "id": "routes/auth.$", "parentId": "root", "path": "auth/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/auth._-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/app": { "id": "routes/app", "parentId": "root", "path": "app", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/app-DBLkgvpF.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js", "/assets/AppProxyProvider-DMlaIqi_.js", "/assets/context-CIMOcSVs.js", "/assets/context-ByRp8HP2.js"], "css": ["/assets/app-x1cbIzLV.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/app.metafield-manage": { "id": "routes/app.metafield-manage", "parentId": "routes/app", "path": "metafield-manage", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/app.metafield-manage-lEMrqFzH.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js", "/assets/InstructionsModal-BL1E7XSj.js", "/assets/Page-CLSkT67c.js", "/assets/Banner-BZQHXGRD.js", "/assets/Layout-CEvIyKk-.js", "/assets/ProgressBar-FgJtLNKp.js", "/assets/Select-gQPYlnFC.js", "/assets/context-CIMOcSVs.js", "/assets/DeleteIcon.svg-BXCa3h_m.js", "/assets/index-6YjgjBrM.js", "/assets/context-ByRp8HP2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/app.export-data": { "id": "routes/app.export-data", "parentId": "routes/app", "path": "export-data", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/app.export-data-UKOCB_rB.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js", "/assets/Page-CLSkT67c.js", "/assets/HomeIcon.svg-B95a3Sc3.js", "/assets/Layout-CEvIyKk-.js", "/assets/Card-C_ULCztl.js", "/assets/Select-gQPYlnFC.js", "/assets/context-CIMOcSVs.js", "/assets/index-6YjgjBrM.js", "/assets/context-ByRp8HP2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/app.remove-tags": { "id": "routes/app.remove-tags", "parentId": "routes/app", "path": "remove-tags", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/app.remove-tags-BXm8nwZn.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js", "/assets/InstructionsModal-BL1E7XSj.js", "/assets/context-CIMOcSVs.js", "/assets/Page-CLSkT67c.js", "/assets/Banner-BZQHXGRD.js", "/assets/Layout-CEvIyKk-.js", "/assets/ProgressBar-FgJtLNKp.js", "/assets/Select-gQPYlnFC.js", "/assets/index-6YjgjBrM.js", "/assets/context-ByRp8HP2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/app.add-tags": { "id": "routes/app.add-tags", "parentId": "routes/app", "path": "add-tags", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/app.add-tags-CsaCBMrO.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js", "/assets/InstructionsModal-BL1E7XSj.js", "/assets/Page-CLSkT67c.js", "/assets/Banner-BZQHXGRD.js", "/assets/Layout-CEvIyKk-.js", "/assets/ProgressBar-FgJtLNKp.js", "/assets/Select-gQPYlnFC.js", "/assets/context-CIMOcSVs.js", "/assets/index-6YjgjBrM.js", "/assets/context-ByRp8HP2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/app.history": { "id": "routes/app.history", "parentId": "routes/app", "path": "history", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/app.history-DlMdNpsM.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js", "/assets/HistoryForm-XBcPJ4fe.js", "/assets/Page-CLSkT67c.js", "/assets/HomeIcon.svg-B95a3Sc3.js", "/assets/ProgressBar-FgJtLNKp.js", "/assets/Layout-CEvIyKk-.js", "/assets/context-CIMOcSVs.js", "/assets/index-6YjgjBrM.js", "/assets/context-ByRp8HP2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/app._index": { "id": "routes/app._index", "parentId": "routes/app", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/app._index-B_2q4ScZ.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js", "/assets/HistoryForm-XBcPJ4fe.js", "/assets/Page-CLSkT67c.js", "/assets/Layout-CEvIyKk-.js", "/assets/DeleteIcon.svg-BXCa3h_m.js", "/assets/Banner-BZQHXGRD.js", "/assets/Card-C_ULCztl.js", "/assets/ProgressBar-FgJtLNKp.js", "/assets/context-CIMOcSVs.js", "/assets/index-6YjgjBrM.js", "/assets/context-ByRp8HP2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/app.faq": { "id": "routes/app.faq", "parentId": "routes/app", "path": "faq", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/app.faq-B1u3yej5.js", "imports": ["/assets/chunk-EPOLDU6W-TqCdPy6q.js", "/assets/Page-CLSkT67c.js", "/assets/HomeIcon.svg-B95a3Sc3.js", "/assets/context-CIMOcSVs.js", "/assets/index-6YjgjBrM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-109c44a8.js", "version": "109c44a8", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/webhooks.app.scopes_update": {
    id: "routes/webhooks.app.scopes_update",
    parentId: "root",
    path: "webhooks/app/scopes_update",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/webhooks.app.uninstalled": {
    id: "routes/webhooks.app.uninstalled",
    parentId: "root",
    path: "webhooks/app/uninstalled",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/api.update-restore.db": {
    id: "routes/api.update-restore.db",
    parentId: "root",
    path: "api/update-restore/db",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/api.metaCreate.db": {
    id: "routes/api.metaCreate.db",
    parentId: "root",
    path: "api/metaCreate/db",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/api.timeout.db": {
    id: "routes/api.timeout.db",
    parentId: "root",
    path: "api/timeout/db",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/api.revert.db": {
    id: "routes/api.revert.db",
    parentId: "root",
    path: "api/revert/db",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/api.check.db": {
    id: "routes/api.check.db",
    parentId: "root",
    path: "api/check/db",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/api.add.db": {
    id: "routes/api.add.db",
    parentId: "root",
    path: "api/add/db",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route10
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/app": {
    id: "routes/app",
    parentId: "root",
    path: "app",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/app.metafield-manage": {
    id: "routes/app.metafield-manage",
    parentId: "routes/app",
    path: "metafield-manage",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/app.export-data": {
    id: "routes/app.export-data",
    parentId: "routes/app",
    path: "export-data",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/app.remove-tags": {
    id: "routes/app.remove-tags",
    parentId: "routes/app",
    path: "remove-tags",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/app.add-tags": {
    id: "routes/app.add-tags",
    parentId: "routes/app",
    path: "add-tags",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/app.history": {
    id: "routes/app.history",
    parentId: "routes/app",
    path: "history",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/app._index": {
    id: "routes/app._index",
    parentId: "routes/app",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route18
  },
  "routes/app.faq": {
    id: "routes/app.faq",
    parentId: "routes/app",
    path: "faq",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
