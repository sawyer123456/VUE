import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    meta: {
      //这是左侧导航栏的一级标题的名字和图标
      title: "页面",
      icon: "table"
    },

    children: [{
      path: "dashboard",
      name: "页面",
      component: () => import("@/views/dashboard/index"),
      meta: {
        title: "页面",
        icon: "dashboard"
      }
    }]
  },

  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "客户管理",

    meta: {
      title: "客户管理",
      icon: "example"
    },
    children: [{
        path: "table",
        name: "客户信息",
        component: () => import("@/views/table/index"),
        meta: {
          title: "客户信息",
          icon: "table"
        }
      },
      {
        path: "tree",
        name: "联系人信息",
        component: () => import("@/views/contact/contact"),
        meta: {
          title: "联系人信息",
          icon: "tree"
        }
      },
      {
        name: "swt",
        path: "/swt/index",
        component: () => import("@/views/swt/index"),
        meta: {
          title: "新增联系人",
          icon: "table"
        }
      },
      {
        path: "index",
        name: "新增客户",
        component: () => import("@/views/form/index"),
        meta: {
          title: "新增客户",
          icon: "form"
        }
      }
    ]
  },

  {
    path: "/form",
    component: Layout,
    meta: {
      title: "信息",
      icon: "table"
    },
    children: [{
        path: "index",
        name: "新增信息",
        component: () => import("@/views/form/index"),
        meta: {
          title: "新增信息",
          icon: "form"
        }
      },
      {
        name: "swt",
        path: "/swt",
        component: () => import("@/views/swt"),
        meta: {
          title: "子页面",
          icon: "table"
        }
      }
    ]
  },
  {
    path: "/function",
    component: Layout,
    meta: {
      title: "功能",
      icon: "table"
    },
    children: [{
        path: "spider",
        name: "网页图片下载器",
        component: () => import("@/views/function/spider"),
        meta: {
          title: "网页图片下载器",
          icon: "table"
        }
      },
      {
        name: "网页文字获取器",
        path: "/swt",
        component: () => import("@/views/swt"),
        meta: {
          title: "网页文字获取器",
          icon: "table"
        }
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
