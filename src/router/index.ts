import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const defaultRouter = [
  {
    path: "/code-preview",
    name: "CodePreview",
    component: () => import('@/views/run-code.vue'),
  },
  {
    path: "/code-preview2",
    name: "CodePreview2",
    component: () => import('@/views/run-code2.vue'),
  },
  {
    path: "/app-list",
    name: "CardList",
    component: () => import('@/views/app-list.vue'),
  },
];


const routes: Array<RouteRecordRaw> = [
  ...defaultRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
