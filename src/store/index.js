import tab_view from './modules/tabs_view'


export const storeRegister = function (store, options) {
  //['nested', 'myModule']=`nested/myModule`或者myModule
  const moduleName = (options || {}).moduleName;
  if (!moduleName) {
    throw new Error("a moduleName is needed when registe a store module dynamiclly");
  }
  store.registerModule(moduleName, {
    ...options.module
  });
}

export const registe2Store = function () {
  const options = {
    moduleName: 'tagsView',
    module:{...tab_view}
  }
  return store => {
    storeRegister(store,options)
  }
}
