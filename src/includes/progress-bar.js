import NProgress from 'nprogress';

// adding progress bar when page is loading
export default (router) => {
  // initialising progress bar
  router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });

  router.afterEach(NProgress.done);
};
