import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // 进度条插件
import { getToken } from "@/utils/auth";
import getPageTitle from "@/utils/get-page-title"; //浏览器标签卡名字拼接工具
NProgress.configure({ showSpinner: false }); // NProgress配置

const whiteList = ["/login", "/404"]; // 白名单

let isRefresh = true // 解决动态路由刷新白屏

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);// 标签卡title拼接
  let token = getToken();


  if (token) {

    if (to.path === "/login") {
      next({ path: "/" });      // 已登录 跳转主页
      NProgress.done();
    } else {

      try {
        await store.dispatch("user/getInfo");

        let role = store.getters.role;

        //  await store.dispatch("permission/generateRoutes", { routes: routeList[role] });

        //   if (isRefresh) {

        //     router.addRoutes(routeList[role]);// 关键步骤！！注意版本 建议vue-router使用4以下版本
        //     isRefresh = false               //解决动态路由刷新问题
        //     next({ ...to, replace: true });// replace: true, 导航中将留下 history 记录
        //   } else {
        //     next()
        //   }
        if (role == 1) {
          next()
        } else {
          await store.dispatch("user/resetToken");
          next(`/login?redirect=${to.path}`);
        }
      } catch (error) {
        // 删除token，跳转登录页面
        console.log(error);
        await store.dispatch("user/resetToken");
        Message.error("请登录");
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {

    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});