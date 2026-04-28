import{w as Y,b as G,c as X,u as z,r as l,j as s}from"./chunk-EPOLDU6W-TqCdPy6q.js";import{P as J,I as K,T as w,b as Q,c as W}from"./Page-CLSkT67c.js";import{S as Z}from"./HomeIcon.svg-B95a3Sc3.js";import{L as P,M as B}from"./Layout-CEvIyKk-.js";import{C as H}from"./Card-C_ULCztl.js";import{S}from"./Select-gQPYlnFC.js";import"./context-CIMOcSVs.js";import"./index-6YjgjBrM.js";import"./context-ByRp8HP2.js";const a=e=>{if(e==null)return"";const t=String(e);return/^[=+\-@]/.test(t)?`="${t}"`:t},ee={product:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.products},baseHeaders:["resource_id","title","handle"],buildBaseRow:e=>[a(e.id),a(e.title),a(e.handle)]},product_variant:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.productVariants},baseHeaders:["resource_id","sku","title"],buildBaseRow:e=>[a(e.id),a(e.sku),a(e.title)]},collection:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.collections},baseHeaders:["resource_id","title","handle"],buildBaseRow:e=>[a(e.id),a(e.title),a(e.handle)]},customer:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.customers},baseHeaders:["resource_id","first_name","last_name","email"],buildBaseRow:e=>[a(e.id),a(e.firstName),a(e.lastName),a(e.email)]},order:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.orders},baseHeaders:["resource_id","order_name"],buildBaseRow:e=>[a(e.id),a(e.name)]},company:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.companies},baseHeaders:["resource_id","name","external_id"],buildBaseRow:e=>[a(e.id),a(e.name),a(e.externalId)]},company_location:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.companyLocations},baseHeaders:["resource_id","name","external_id"],buildBaseRow:e=>[a(e.id),a(e.name),a(e.externalId)]},location:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.locations},baseHeaders:["resource_id","name"],buildBaseRow:e=>[a(e.id),a(e.name)]},page:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.pages},baseHeaders:["resource_id","title","handle"],buildBaseRow:e=>[a(e.id),a(e.title),a(e.handle)]},blog:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.blogs},baseHeaders:["resource_id","title","handle"],buildBaseRow:e=>[a(e.id),a(e.title),a(e.handle)]},blog_post:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.articles},baseHeaders:["resource_id","title","handle"],buildBaseRow:e=>[a(e.id),a(e.title),a(e.handle)]},market:{query:()=>`
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
    `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.markets},baseHeaders:["resource_id","name"],buildBaseRow:e=>[a(e.id),a(e.name)]},metaobject:{query:({type:e})=>`
    query ($cursor: String) {
      metaobjects(type: "${e}", first: 200, after: $cursor) {
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
  `,getConnection:e=>{var t;return(t=e==null?void 0:e.data)==null?void 0:t.metaobjects},baseHeaders:["resource_id","type","handle","display_name"],buildBaseRow:e=>[a(e.id),a(e.type),a(e.handle),a(e.displayName??"")]}},k=e=>e==null?'""':`"${String(e).replace(/"/g,'""')}"`,ce=Y(function(){const t=G(),L=X(),{metaobjectTypes:p}=z(),[r,M]=l.useState("product"),[h,E]=l.useState(!0),[y,N]=l.useState(!0),[x,_]=l.useState(""),[T,v]=l.useState(!1),[n,j]=l.useState(!1),[D,I]=l.useState([]),[O,R]=l.useState(0);l.useEffect(()=>{E(!0),N(!0),r==="metaobject"&&(p==null?void 0:p.length)>0&&!x&&_(p[0].value)},[r,p]);const A=()=>{j(!0),I([]),R(0);const o=new FormData;o.append("resource",r),r==="metaobject"&&o.append("metaobjectType",x),t.submit(o,{method:"POST"})};l.useEffect(()=>{if(!n||t.state!=="idle"||!t.data)return;if(t.data.error){j(!1);return}const{nodes:o,pageInfo:d}=t.data,i=[...D,...o];if(I(i),R(i.length),d.hasNextPage){const u=new FormData;u.append("resource",r),u.append("cursor",d.endCursor),r==="metaobject"&&u.append("metaobjectType",x),t.submit(u,{method:"POST"})}else V(i)},[t.data,t.state,n]);const V=o=>{const d=ee[r],i=["product","customer","order","blog_post"].includes(r)&&h,u=r!=="metaobject"&&y,C=new Set;u&&o.forEach(m=>{var f;return(f=m.metafields)==null?void 0:f.edges.forEach(g=>C.add(`${g.node.namespace}.${g.node.key}`))});const c=Array.from(C),$=[];$.push([...d.baseHeaders,...i?["tags"]:[],...c].join(",")),o.forEach(m=>{var g,q;const f={};(g=m.metafields)==null||g.edges.forEach(b=>{f[`${b.node.namespace}.${b.node.key}`]=b.node.value}),$.push([...d.buildBaseRow(m).map(k),...i?[k(((q=m.tags)==null?void 0:q.join(", "))||"")]:[],...c.map(b=>k(f[b]||""))].join(","))});const F=$.join(`
`);U(F),j(!1)},U=o=>{const d=new Blob([o],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(d),C=new Date().toISOString().replace(/:/g,"-").replace(/\..+/,""),c=document.createElement("a");c.href=i,c.download=`${r}-export-${C}.csv`,document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(i)};return l.useEffect(()=>{if(!n)return;const o=i=>{i.preventDefault(),i.returnValue=""},d=()=>{window.history.pushState(null,"",window.location.href)};return window.history.pushState(null,"",window.location.href),window.addEventListener("beforeunload",o),window.addEventListener("popstate",d),()=>{window.removeEventListener("beforeunload",o),window.removeEventListener("popstate",d)}},[n]),s.jsxs(J,{children:[s.jsxs("div",{className:"flex flex-col space-y-1.5 mb-5 rounded-sm",children:[s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx("button",{onClick:()=>L("/app"),className:"flex items-center cursor-pointer justify-center text-[#303030] hover:opacity-70 transition-opacity focus:outline-none","aria-label":"Go to Home",children:s.jsx(K,{source:Z})}),s.jsx("span",{className:"h-5 w-px bg-[#D2D2D2]","aria-hidden":"true"}),s.jsx("div",{className:"text-xl font-bold leading-tight",children:"Export Store Data"})]}),s.jsx(w,{as:"p",variant:"bodySm",tone:"subdued",children:"Create CSV backups of your store resources before performing bulk updates.        "})]}),s.jsx(P,{children:s.jsx(P.Section,{children:s.jsx(H,{sectioned:!0,children:s.jsxs(Q,{gap:"400",children:[s.jsx(w,{as:"h2",variant:"headingMd",children:"Select Data to Export"}),s.jsx(S,{label:"Resource",options:[{label:"Products",value:"product"},{label:"Product Variant",value:"product_variant"},{label:"Collections",value:"collection"},{label:"Customers",value:"customer"},{label:"Orders",value:"order"},{label:"Company",value:"company"},{label:"Company Location",value:"company_location"},{label:"Location",value:"location"},{label:"Pages",value:"page"},{label:"Blog",value:"blog"},{label:"Blog Post",value:"blog_post"},{label:"Market",value:"market"},{label:"Metaobject",value:"metaobject"}],value:r,onChange:M,disabled:n}),r==="metaobject"&&s.jsx(S,{label:"Metaobject Type",options:p,value:x,onChange:_,disabled:n}),["product","customer","order","blog_post"].includes(r)&&s.jsx(S,{label:"Include Tags",options:[{label:"Yes",value:"true"},{label:"No",value:"false"}],value:String(h),onChange:o=>E(o==="true"),disabled:n}),r!=="metaobject"&&s.jsx(S,{label:"Include Metafields",options:[{label:"Yes",value:"true"},{label:"No",value:"false"}],value:String(y),onChange:o=>N(o==="true"),disabled:n}),n&&s.jsx(H,{subdued:!0,children:s.jsxs(w,{as:"strong",children:["Exporting… ",O," records fetched so far."]})}),s.jsx(W,{variant:"primary",loading:n,onClick:()=>v(!0),disabled:n,children:n?"Exporting…":"Export CSV"})]})})})}),s.jsx(B,{open:T,onClose:()=>v(!1),title:"Confirm Export",primaryAction:{content:"Yes, Export",onAction:()=>{v(!1),A()}},secondaryActions:[{content:"Cancel",onAction:()=>v(!1)}],children:s.jsx(B.Section,{children:s.jsxs(w,{as:"p",children:["Are you sure you want to export ",r,"'s ",h&&y?"with tags and metafields":h?"with tags":y?"with metafields":"","?"]})})})]})});export{ce as default};
